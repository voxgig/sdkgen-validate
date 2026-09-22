'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const Fs = require('node:fs')
const Os = require('node:os')
const Path = require('node:path')
const { execFileSync } = require('node:child_process')

const SUMMARIZE = Path.join(__dirname, '..', 'bin', 'summarize')
const DEFS = '/Users/someone/Projects/voxgig/apidef-validate/def'
const OUT = '/Users/someone/Projects/voxgig-sdk'

function summarize(summary, targets = 'ts,go') {
  const dir = Fs.mkdtempSync(Path.join(Os.tmpdir(), 'sdkgen-summarize-'))
  Fs.writeFileSync(Path.join(dir, 'summary.log'), summary)
  execFileSync('python3', [SUMMARIZE, '--run-dir', dir, '--targets', targets],
    { encoding: 'utf8' })
  return {
    dir,
    markdown: Fs.readFileSync(Path.join(dir, 'REPORT.md'), 'utf8'),
    report: JSON.parse(Fs.readFileSync(Path.join(dir, 'report.json'), 'utf8')),
    cleanup: () => Fs.rmSync(dir, { recursive: true, force: true }),
  }
}

function fixture(extra = '') {
  return [
    '=============== STARTED 2026-09-22T00:00:00Z ===============',
    `config defs=${DEFS}`,
    `config out=${OUT}`,
    `config specs=${OUT}/sdkgen-validate/specs/default.txt`,
    'config targets=ts,go',
    'config run_tests=1',
    'config clean_after=1',
    'config scaffold_install=@tabnas/parser@0.10.0',
    'version @voxgig/sdkgen=4.23.0',
    '=== petstore :: petstore.json ===',
    `spec_path=${DEFS}/petstore.json`,
    'scaffold_rc=0',
    'scaffold_install_rc=0',
    'version @voxgig/apidef=8.15.0',
    'target_ts_rc=0',
    'target_go_rc=0',
    'build_rc=0',
    'generate_warmup_rc=0',
    'test_model_rc=0',
    'generate_rc=0',
    'output_ts=1',
    'output_go=1',
    'deps_ts_rc=0',
    'test_ts_rc=0',
    'deps_go_rc=0',
    'test_go_rc=2',
    'duration_seconds=42',
    extra,
    'ALL DONE 2026-09-22T00:10:00Z elapsed=600s',
    '',
  ].filter((l) => l !== '').join('\n')
}

test('a report carries no absolute path from the machine that made it', () => {
  const run = summarize(fixture())
  try {
    for (const [what, text] of [['REPORT.md', run.markdown],
      ['report.json', JSON.stringify(run.report)]]) {
      assert.equal(text.includes('/Users/someone'), false, what + ' leaks a home directory')
      assert.equal(text.includes(DEFS), false, what + ' leaks the defs path')
      assert.equal(text.includes(OUT), false, what + ' leaks the out path')
    }
    assert.match(run.markdown, /`specs` = `\.\.\.\/specs\/default\.txt`/)
    assert.match(run.markdown, /`defs` = `\.\.\.\/apidef-validate\/def`/)
    assert.equal(run.report.runs[0].spec_path, '.../def/petstore.json')
  } finally { run.cleanup() }
})

test('the report names the package versions the run resolved', () => {
  const run = summarize(fixture())
  try {
    assert.match(run.markdown, /## Packages validated/)
    assert.match(run.markdown, /`@voxgig\/sdkgen` \| `4\.23\.0`/)
    assert.match(run.markdown, /`@voxgig\/apidef` \| `8\.15\.0`/)
    assert.deepEqual(run.report.versions['@voxgig/apidef'], ['8.15.0'])
    assert.equal(run.report.runs[0].versions['@voxgig/apidef'], '8.15.0')
  } finally { run.cleanup() }
})

test('a run with no recorded versions gets no versions section', () => {
  const run = summarize(fixture().split('\n')
    .filter((l) => !l.startsWith('version ')).join('\n'))
  try {
    assert.equal(run.markdown.includes('## Packages validated'), false)
    assert.deepEqual(run.report.versions, {})
  } finally { run.cleanup() }
})

test('an ephemeral dependency override is reported, not hidden', () => {
  const run = summarize(fixture())
  try {
    assert.match(run.markdown, /`scaffold_install` = `@tabnas\/parser@0\.10\.0`/)
  } finally { run.cleanup() }
})

// A run that deleted its generated trees must say so: the report is the only
// record left of what could still be inspected.
test('a run that cleaned up after itself says so', () => {
  const run = summarize(fixture())
  try {
    assert.match(run.markdown, /`clean_after` = `1`/)
    assert.equal(run.report.config.clean_after, '1')
  } finally { run.cleanup() }
})

test('a failing language suite is counted as a failure', () => {
  const run = summarize(fixture())
  try {
    assert.match(run.markdown, /\*\*Test totals:\*\* 1\/2 target test suites passed\./)
    assert.match(run.markdown, /\| petstore \| OK \| FAIL\(2\) \|/)
    assert.equal(run.report.runs[0].tests.go, 2)
  } finally { run.cleanup() }
})

test('a failing warmup generate is visible in the report', () => {
  const run = summarize(fixture().replace('generate_warmup_rc=0', 'generate_warmup_rc=3'))
  try {
    assert.match(run.markdown, /\| Build \| Warmup \| Generate \|/)
    assert.match(run.markdown, /\| petstore \| petstore\.json \| OK \| OK \| OK \| FAIL\(3\) \| OK \|/)
    assert.equal(run.report.runs[0].generate_warmup_rc, 3)
  } finally { run.cleanup() }
})

// test_model_rc also matches the per-target `test_<lang>_rc` shape, so a run
// that never ran a language suite used to grow a phantom `model` target and
// report empty deps/test tables with "Test totals: 0/0".
test('a run without --test gets no language-test tables', () => {
  const run = summarize(fixture().split('\n')
    .filter((l) => !/^(deps|test)_(ts|go)_rc=/.test(l)).join('\n'))
  try {
    assert.deepEqual(run.report.runs[0].tests, {})
    assert.equal(run.report.runs[0].test_model_rc, 0)
    assert.equal(run.markdown.includes('Test totals:'), false)
    assert.equal(run.markdown.includes('## Per-target test results'), false)
  } finally { run.cleanup() }
})

test('a phase rc with no column of its own still fails loudly', () => {
  const run = summarize(fixture() + '\nsdkgen_override_rc=1')
  try {
    assert.match(run.markdown, /## Other non-zero phase results/)
    assert.match(run.markdown, /- `petstore`: `sdkgen_override_rc` = FAIL\(1\)/)
    assert.equal(run.report.runs[0].other.sdkgen_override_rc, 1)
  } finally { run.cleanup() }
})

test('a phase that succeeded is not listed as a failure', () => {
  const run = summarize(fixture() + '\nsdkgen_override_rc=0')
  try {
    assert.equal(run.markdown.includes('## Other non-zero phase results'), false)
    assert.equal(run.report.runs[0].other.sdkgen_override_rc, 0)
  } finally { run.cleanup() }
})

// A committed report is read by people who did not make the run, on machines
// that share none of its paths.
const ABSOLUTE_PATH_RE = /(^|[^\w:])\/(Users|home|root|var|tmp|opt|private|mnt|srv)\//

test('every committed report is machine-independent', () => {
  const root = Path.join(__dirname, '..', 'reports')
  const files = []
  for (const entry of Fs.readdirSync(root, { withFileTypes: true, recursive: true })) {
    if (entry.isFile() && ['REPORT.md', 'report.json'].includes(entry.name)) {
      files.push(Path.join(entry.parentPath || entry.path, entry.name))
    }
  }
  for (const file of files) {
    const hit = Fs.readFileSync(file, 'utf8').split('\n')
      .find((line) => ABSOLUTE_PATH_RE.test(line))
    assert.equal(hit, undefined, file + ' carries an absolute path: ' + hit)
  }
})
