'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const Fs = require('node:fs')
const Path = require('node:path')
const { spawnSync } = require('node:child_process')

const DRIVER = Path.join(__dirname, '..', 'bin', 'validate-sdkgen')

function run(...args) {
  return spawnSync('bash', [DRIVER, ...args], { encoding: 'utf8' })
}

// The usage text is an unquoted heredoc, so it interpolates: a backtick or a
// `$(...)` in it becomes a command the shell runs while printing help.
test('--help prints usage and runs nothing', () => {
  const out = run('--help')
  assert.equal(out.status, 0)
  assert.equal(out.stderr, '')
  assert.match(out.stdout, /^Usage: validate-sdkgen/)
  assert.equal(out.stdout.includes('`'), false, 'help text interpolates a backtick')
})

test('every flag the driver accepts is in the usage text', () => {
  const source = Fs.readFileSync(DRIVER, 'utf8')
  const parse = source.slice(source.indexOf('while [ $# -gt 0 ]; do'))
  const flags = new Set()
  for (const m of parse.slice(0, parse.indexOf('\ndone')).matchAll(/^\s{4}(-[\w|-]+)\)/gm)) {
    for (const flag of m[1].split('|')) flags.add(flag)
  }
  assert.ok(flags.size > 10, 'found only ' + flags.size + ' flags to check')

  const help = run('--help').stdout
  for (const flag of flags) {
    assert.ok(help.includes(flag), flag + ' is accepted but undocumented')
  }
})

test('an unknown flag is rejected', () => {
  const out = run('--no-such-flag')
  assert.equal(out.status, 2)
  assert.match(out.stderr, /Unknown arg: --no-such-flag/)
})
