import {readdirSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
export function checkStructuredData(root='dist'){
 const files=[];const walk=dir=>{for(const f of readdirSync(dir,{withFileTypes:true})){const p=resolve(dir,f.name);f.isDirectory()?walk(p):f.name.endsWith('.html')&&files.push(p);}};walk(root);
 let articles=0,pages=0;
 for(const file of files){
  const html=readFileSync(file,'utf8');
  if(/\/google[a-z0-9]+\.html$/.test(file)&&/^google-site-verification: google[a-z0-9]+\.html\s*$/.test(html))continue;
  pages++;
  const match=html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(match,'Missing JSON-LD: '+file);
  const json=JSON.parse(match[1]);assert.equal(json['@context'],'https://schema.org');
  const graph=json['@graph'];assert.ok(Array.isArray(graph));
  const ids=new Set(graph.map(n=>n['@id']).filter(Boolean));
  for(const type of ['WebSite','Organization','Person'])assert.ok(graph.some(n=>n['@type']===type),'Missing '+type+': '+file);
  for(const n of graph){
   if(n['@type']==='BreadcrumbList'){for(const [i,item] of n.itemListElement.entries()){assert.equal(item.position,i+1);assert.ok(item.name);assert.ok(item.item.startsWith('https://tsdsystem.tokyo/'));}}
   if(n['@type']==='BlogPosting'){
    articles++;for(const k of ['headline','description','image','datePublished','dateModified','mainEntityOfPage'])assert.ok(n[k],'Missing article '+k);
    for(const k of ['author','publisher'])assert.ok(ids.has(n[k]?.['@id']),'Unresolved '+k);
    assert.ok(Number.isFinite(Date.parse(n.datePublished)));assert.ok(Date.parse(n.dateModified)>=Date.parse(n.datePublished));
   }
  }
 }
 return {pages,articles};
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname))console.log('JSON-LD syntax, core types, references, dates and breadcrumbs verified:',checkStructuredData());
