import {publishedPosts} from '../lib/posts';
import {SITE,themes} from '../lib/site';
export async function GET(){const posts=await publishedPosts();const paths=['/','/blog/','/story/','/about/','/contact/',...themes.filter(t=>posts.some(p=>p.data.theme===t.id)).map(t=>`/blog/${t.id}/`),...posts.map(p=>`/blog/${p.id}/`)];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>`<url><loc>${SITE.url}${p}</loc></url>`).join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});}
