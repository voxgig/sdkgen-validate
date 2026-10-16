const { test } = require('node:test')
const assert = require('node:assert/strict')
const Fs = require('node:fs')
const Os = require('node:os')
const Path = require('node:path')
const { execFileSync } = require('node:child_process')

test('local overrides resolve source and binaries without changing manifests', () => {
  const root = Fs.mkdtempSync(Path.join(Os.tmpdir(), 'sdkgen-links-'))
  try {
    const source = Path.join(root, 'local package')
    const sdk = Path.join(root, '.sdk')
    Fs.mkdirSync(source)
    Fs.mkdirSync(sdk)
    const manifest = '{"name":"consumer","dependencies":{"@test/local":"1.0.0"}}'
    Fs.writeFileSync(Path.join(sdk, 'package.json'), manifest)
    Fs.writeFileSync(Path.join(sdk, 'package-lock.json'), '{}')
    Fs.writeFileSync(Path.join(source, 'package.json'), JSON.stringify({ name: '@test/local', version: '2.0.0', main: 'main.js', bin: { local: 'main.js' } }))
    Fs.writeFileSync(Path.join(source, 'main.js'), 'module.exports = 42')
    for (let i = 0; i < 2; i++) {
      execFileSync(process.execPath, [Path.join(__dirname, 'bin/link-local.cjs'), sdk, source])
      assert.equal(Fs.realpathSync(Path.join(sdk, 'node_modules/@test/local')), Fs.realpathSync(source))
      assert.equal(Fs.realpathSync(Path.join(sdk, 'node_modules/.bin/local')), Fs.realpathSync(Path.join(source, 'main.js')))
    }
    assert.equal(Fs.readFileSync(Path.join(sdk, 'package.json'), 'utf8'), manifest)
    assert.equal(Fs.readFileSync(Path.join(sdk, 'package-lock.json'), 'utf8'), '{}')
  } finally { Fs.rmSync(root, { recursive: true, force: true }) }
})

test('a linked sdkgen shares its jostraca with the project', () => {
  const root = Fs.mkdtempSync(Path.join(Os.tmpdir(), 'sdkgen-links-'))
  try {
    const sdkgen = Path.join(root, 'sdkgen')
    const theirs = Path.join(sdkgen, 'node_modules', 'jostraca')
    const sdk = Path.join(root, '.sdk')
    const ours = Path.join(sdk, 'node_modules', 'jostraca')
    for (const [dir, json] of [[sdkgen, { name: '@voxgig/sdkgen', version: '4.0.0' }],
      [theirs, { name: 'jostraca', version: '0.40.0' }], [ours, { name: 'jostraca', version: '0.39.0' }],
      [sdk, { name: 'consumer' }]]) {
      Fs.mkdirSync(dir, { recursive: true })
      Fs.writeFileSync(Path.join(dir, 'package.json'), JSON.stringify(json))
    }
    execFileSync(process.execPath, [Path.join(__dirname, 'bin/link-local.cjs'), sdk, sdkgen])
    assert.equal(Fs.realpathSync(ours), Fs.realpathSync(theirs))
  } finally { Fs.rmSync(root, { recursive: true, force: true }) }
})

