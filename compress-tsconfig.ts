import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const srcPath = resolve(import.meta.dirname, './src/tsconfig-base.json')
const outPath = resolve(import.meta.dirname, './tsconfig-base.json')

const banner = '// See https://github.com/hax/dotfiles/tree/master/src/tsconfig-base.json for full edition\n'
const src = readFileSync(srcPath, 'utf-8')
const content = JSON.parse(removeComments(src))
const out = `${banner}${ JSON.stringify(content, null, '\t') }\n`
// console.log(out)
writeFileSync(outPath, out, 'utf-8')

function removeComments(src: string)  {
	return src.replaceAll(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
}
