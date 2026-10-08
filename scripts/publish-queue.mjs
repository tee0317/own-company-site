import {readFileSync,readdirSync,writeFileSync,existsSync,mkdirSync,realpathSync,unlinkSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parseArticle} from './check-content.mjs';
import {articleIssues,isPublished} from './lib/publication.mjs';
const repo=resolve(dirname(fileURLToPath(import.meta.url)),'..'),queue=process.env.TEA_PRIVATE_QUEUE;
if(!queue||realpathSync(queue)===repo||realpathSync(queue).startsWith(repo+'/'))throw Error('TEA_PRIVATE_QUEUE must point outside the public repository');
const applying=process.argv.includes('--apply');
const hash=text=>createHash('sha256').update(text).digest('hex');
const git=(...args)=>execFileSync('git',args,{cwd:repo,encoding:'utf8'}).trim();
const approval=JSON.parse(readFileSync(resolve(queue,'site-approval.json'),'utf8'));
if(applying&&(!approval.reviewedAt||approval.remote!=='https://github.com/tee0317/own-company-site.git'||approval.publicationEnabled!==true))throw Error('Site review and publication activation are required');
if(applying&&(git('branch','--show-current')!=='main'||git('status','--porcelain')||git('rev-parse','HEAD')!==git('rev-parse','origin/main')))throw Error('Clean, synchronized main is required');
const lock=resolve(queue,'.publish-lock');let locked=false;
try{
 if(applying){writeFileSync(lock,String(process.pid),{flag:'wx'});locked=true;}
 const ready=[];
 for(const file of readdirSync(queue).filter(f=>f.endsWith('.md'))){const slug=file.slice(0,-3),text=readFileSync(resolve(queue,file),'utf8'),receipt=resolve(queue,slug+'.approval.json');if(!existsSync(receipt))continue;const approved=JSON.parse(readFileSync(receipt,'utf8'));if(approved.sha256!==hash(text)||approved.approved!==true||!approved.reviewedAt)continue;
 const {data,body}=parseArticle(text);const issues=articleIssues(data,slug,body);if(issues.length)throw Error(slug+': '+issues.join('; '));if(!isPublished(data))continue;
 const target=resolve(repo,'src/content/blog',file);if(existsSync(target)){if(readFileSync(target,'utf8')!==text)throw Error('Existing article differs: '+slug);continue;}ready.push({slug,text,target});}
 console.log('Due approved articles:',ready.map(p=>p.slug).join(', ')||'none');
 if(applying&&ready.length){for(const p of ready)writeFileSync(p.target,p.text,{flag:'wx'});try{execFileSync('npm',['run','verify'],{cwd:repo,stdio:'inherit'});execFileSync('npm',['run','release:check'],{cwd:repo,stdio:'inherit'});git('add','--',...ready.map(p=>p.target));git('commit','-m','Publish approved tea articles');git('push','origin','main');}catch(error){throw Error('Publication stopped; inspect local changes before retrying. '+error.message);}}
}finally{if(locked)unlinkSync(lock);}
