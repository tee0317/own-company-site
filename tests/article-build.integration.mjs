import {mkdtempSync,mkdirSync,cpSync,symlinkSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {checkStructuredData} from '../scripts/check-structured-data.mjs';
import {tmpdir} from 'node:os';import {join,resolve} from 'node:path';import {execFileSync} from 'node:child_process';import assert from 'node:assert/strict';import {stringify} from 'yaml';
const temp=mkdtempSync(join(tmpdir(),'tea-article-test-'));try{
for(const path of ['src','public','scripts','astro.config.mjs','package.json','tsconfig.json'])cpSync(path,join(temp,path),{recursive:true});symlinkSync(resolve('node_modules'),join(temp,'node_modules'),'dir');
rmSync(join(temp,'src/content/blog'),{recursive:true,force:true});mkdirSync(join(temp,'src/content/blog'));
for(const [i,theme] of ['choose','brew','enjoy'].entries()){const d={title:'TEST ONLY '+theme,description:'Synthetic test fixture',theme,publishedAt:'2026-10-01T12:00:00+09:00',updatedAt:'2026-10-01T12:00:00+09:00',approved:true,answer:'Test answer',scope:'Synthetic data, not a real experience',evidence:'reference',sources:[{label:'Astro',url:'https://docs.astro.build/'}],related:['tea-choose','tea-brew','tea-enjoy'].filter(id=>id!=='tea-'+theme),featured:true,featuredOrder:i};writeFileSync(join(temp,'src/content/blog/tea-'+theme+'.md'),'---\n'+stringify(d,{defaultStringType:'QUOTE_DOUBLE'})+'---\nTest fixture body.\n');}
execFileSync('npm',['run','build'],{cwd:temp,stdio:'pipe'});
const html=path=>readFileSync(join(temp,'dist',path),'utf8');const home=html('index.html');assert.ok(home.includes('/blog/choose/'));assert.ok(home.includes('aria-label="おすすめの記事"'));const article=html('blog/tea-choose/index.html');assert.ok(article.includes('この記事について'));assert.ok(article.includes('BlogPosting'));assert.ok(article.includes('/story/'));assert.ok(article.includes('/blog/tea-brew/'));assert.ok(html('sitemap.xml').includes('/blog/tea-choose/'));assert.ok(!html('blog/choose/index.html').includes('noindex,follow'));
console.log('Article, recommendations, hubs, author, related links, sitemap verified in isolated test build');
assert.equal(checkStructuredData(join(temp,'dist')).articles,3);
if(process.env.TEA_REVIEW_OUTPUT){const output=resolve(process.env.TEA_REVIEW_OUTPUT);assert.ok(output.startsWith('/Users/test/Documents/Codex/'));cpSync(join(temp,'dist'),output,{recursive:true});}
}finally{rmSync(temp,{recursive:true,force:true});}
