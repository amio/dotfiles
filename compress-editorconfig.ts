import {readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

const srcPath = resolve(import.meta.dirname, './src/.editorconfig')
const outPath = resolve(import.meta.dirname, './.editorconfig')

const banner = '# See https://github.com/hax/dotfiles/tree/master/src/.editorconfig for commented edition\n'
const src = readFileSync(srcPath, 'utf-8')
const out = banner + compress(src)
// console.log(out)
writeFileSync(outPath, out, 'utf-8')

function compress(content: string) {
	return content
		.split(/\n/)
		.map(l => l.trim())
		.filter(l => l.length > 0 && !isComment(l))
		.reduce(({lines, head}, l) => {
			if (isHead(l)) return {lines, head: l}
			if (head) lines.push(head)
			lines.push(l)
			return {lines}
		}, {lines: []} as {lines: string[], head?: string})
		.lines.join('\n')
}

function isComment(line: string) {
	const c = line[0]
	return c === '#' || c === ';'
}
function isHead(line: string) {
	const c0 = line[0]
	const c1 = line[line.length - 1]
	return c0 === '[' && c1 === ']'
}
