import {mkdtempSync,cpSync,symlinkSync,writeFileSync,readFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {stringify} from 'yaml';
const temp=mkdtempSync(join(tmpdir(),'tea-queue-test-'));
const repo=join(temp,'repo'),remote=join(temp,'remote.git'),queue=join(temp,'queue');
const run=(cmd,args,cwd=repo,env={})=>execFileSync(cmd,args,{cwd,encoding:'utf8',env:{...process.env,...env},stdio:'pipe'}).trim();
const git=(...args)=>run('git',args);
try{
 const {mkdirSync}=await import('node:fs');mkdirSync(repo);mkdirSync(queue);
 for(const path of ['src','public','gas','scripts','tests','astro.config.mjs','package.json','tsconfig.json','.gitignore'])cpSync(path,join(repo,path),{recursive:true});
 symlinkSync(resolve('node_modules'),join(repo,'node_modules'),'dir');
 run('git',['init','--bare',remote],temp);git('init','-b','main');git('config','user.name','Queue fixture');git('config','user.email','fixture@example.test');
 const url='https://github.com/tee0317/own-company-site.git';
 git('config',`url.${remote}.insteadOf`,url);git('remote','add','origin',url);git('add','.');git('commit','-m','Fixture baseline');git('push','-u','origin','main');
 writeFileSync(join(queue,'site-approval.json'),JSON.stringify({publicationEnabled:true,reviewedAt:'fixture',remote:url}));
 const data={title:'TEST ONLY',description:'Isolated fixture',theme:'choose',publishedAt:'2026-10-01T12:00:00+09:00',updatedAt:'2026-10-01T12:00:00+09:00',approved:true,answer:'Fixture',scope:'Fixture',evidence:'reference',sources:[{label:'Astro',url:'https://docs.astro.build/'}],related:[]};
 const text='---\n'+stringify(data,{defaultStringType:'QUOTE_DOUBLE'})+'---\nFixture only.\n';
 writeFileSync(join(queue,'queue-fixture.md'),text);writeFileSync(join(queue,'queue-fixture.approval.json'),JSON.stringify({approved:true,reviewedAt:'fixture',sha256:createHash('sha256').update(text).digest('hex')}));
 const env={TEA_PRIVATE_QUEUE:queue,PUBLIC_GAS_FORM_URL:'https://script.google.com/macros/s/fixture/exec',PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN:'a'.repeat(32)};
 const apply=()=>run('node',['scripts/publish-queue.mjs','--apply'],repo,env);
 git('config','remote.origin.pushurl','https://example.invalid/unapproved.git');
 assert.throws(apply,/Origin does not match/);assert.ok(!existsSync(join(repo,'src/content/blog/queue-fixture.md')));
 git('config','--unset','remote.origin.pushurl');
 // A second local clone moves the remote while origin/main in the publisher is stale.
 const other=join(temp,'other');run('git',['clone',remote,other],temp);run('git',['checkout','main'],other);run('git',['config','user.name','Fixture'],other);run('git',['config','user.email','fixture@example.test'],other);
 writeFileSync(join(other,'remote-change.txt'),'Fixture only');run('git',['add','.'],other);run('git',['commit','-m','Remote moved'],other);run('git',['push','origin','main'],other);
 assert.throws(apply,/synchronized main/);assert.ok(!existsSync(join(repo,'src/content/blog/queue-fixture.md')));assert.ok(!existsSync(join(queue,'.publish-lock')));
 git('merge','--ff-only','origin/main');apply();assert.equal(readFileSync(join(repo,'src/content/blog/queue-fixture.md'),'utf8'),text);
 assert.equal(git('rev-parse','HEAD'),run('git',['rev-parse','main'],remote));
 assert.ok(readFileSync(join(repo,'dist/sitemap.xml'),'utf8').includes('/blog/queue-fixture/'));
 const head=git('rev-parse','HEAD');apply();assert.equal(git('rev-parse','HEAD'),head);
 assert.ok(!existsSync(join(queue,'.publish-lock')));
 console.log('Isolated queue: stale remote rejected; verified build, local bare push, sitemap, duplicate prevention passed. No public repository changed.');
}finally{rmSync(temp,{recursive:true,force:true});}
