import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const files=[];function walk(dir){for(const file of readdirSync(dir,{withFileTypes:true})){const path=resolve(dir,file.name);if(file.isDirectory())walk(path);else files.push(path);}}walk('dist');
for(const file of files.filter(f=>/\.(html|xml|txt|js)$/.test(f))){const text=readFileSync(file,'utf8');if(/admin\x40|amazon\.|amzn\.|line\.me|lin\.ee|step-drill|アクロポリス|工具/.test(text))throw Error('Forbidden content in '+file);}
for(const path of ['products/index.html','company/index.html','events/index.html','blog/step-drill-basics/index.html'])if(existsSync('dist/'+path))throw Error('Deleted route remains: '+path);
const sitemap=readFileSync('dist/sitemap.xml','utf8');if(sitemap.includes('/privacy/')||sitemap.includes('/404'))throw Error('Noindex page is in sitemap');
if(process.argv.includes('--ready')){const contact=readFileSync('dist/contact/index.html','utf8');if(!contact.includes('script.google.com/macros/s/'))throw Error('GAS deployment is not configured');const home=readFileSync('dist/index.html','utf8');if(!home.includes('static.cloudflareinsights.com')){if(process.argv.includes('--require-analytics'))throw Error('Analytics is not configured');console.warn('Analytics pending: owner authorized online review before measurement setup on 2026-10-14');}if(!readdirSync('public').some(f=>/^google[a-z0-9]+\.html$/.test(f)))throw Error('Search Console verification file is missing');}
// A photo has one visual role on the homepage; preserve the owner's art direction.
const homePhotos=[...readFileSync('dist/index.html','utf8').matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(m=>decodeURIComponent(m[1]).split('/').pop().split('.')[0]);
if(new Set(homePhotos).size!==homePhotos.length)throw Error('Homepage repeats the same source photograph');
console.log('Public output verified');
