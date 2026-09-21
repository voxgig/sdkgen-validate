const Fs = require('node:fs')
const Path = require('node:path')
const { createRequire } = require('node:module')

const [sdk, ...paths] = process.argv.slice(2)
const modules = Path.resolve(sdk, 'node_modules')
const requireFromSdk = createRequire(Path.resolve(sdk, 'package.json'))

for (const source of paths.filter(Boolean)) {
  const root = Fs.realpathSync(source)
  const pkg = JSON.parse(Fs.readFileSync(Path.join(root, 'package.json'), 'utf8'))
  if (!/^(@[\w.-]+\/)?[\w.-]+$/.test(pkg.name)) throw Error('Invalid package name: ' + pkg.name)
  const dest = Path.join(modules, pkg.name)
  Fs.mkdirSync(Path.dirname(dest), { recursive: true })
  Fs.rmSync(dest, { recursive: true, force: true })
  Fs.symlinkSync(root, dest, 'dir')
  const bins = typeof pkg.bin === 'string' ? { [pkg.name.split('/').pop()]: pkg.bin } : pkg.bin || {}
  for (const [name, file] of Object.entries(bins)) {
    if (Path.basename(name) !== name) throw Error('Invalid binary name: ' + name)
    const bin = Path.join(modules, '.bin', name)
    Fs.mkdirSync(Path.dirname(bin), { recursive: true })
    Fs.rmSync(bin, { force: true })
    Fs.symlinkSync(Path.join(root, file), bin)
  }
  const resolved = Fs.realpathSync(requireFromSdk.resolve(pkg.name + '/package.json'))
  if (resolved !== Path.join(root, 'package.json')) throw Error('Local resolution mismatch: ' + pkg.name)
  console.log(pkg.name + '@' + pkg.version + ' -> ' + root)
}
