import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {parse} from 'yaml';
import {articleIssues,isPublished} from './lib/publication.mjs';
export function parseArticle(text){const match=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!match)throw Error('Missing frontmatter');return {data:parse(match[1]),body:match[2]};}
export function checkContent(root='src/content/blog'){const files=readdirSync(root).filter(f=>f.endsWith('.md'));const ids=new Set(files.map(f=>f.slice(0,-3)));for(const file of files){const {data,body}=parseArticle(readFileSync(`${root}/${file}`,'utf8'));const issues=articleIssues(data,file.slice(0,-3),body);if(!isPublished(data))issues.push('Only approved, already due articles may enter this public repository');for(const id of data.related||[])if(!ids.has(id))issues.push('Related article missing: '+id);if(data.heroImage&&!existsSync(`src/assets/tea/${data.heroImage}`))issues.push('Photo missing');if(issues.length)throw Error(file+': '+issues.join('; '));}return files.length;}
if(process.argv[1]?.endsWith('check-content.mjs'))console.log('Checked articles:',checkContent());
