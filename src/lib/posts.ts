import { getCollection } from 'astro:content';
import { isPublished, validSlug } from '../../scripts/lib/publication.mjs';
export async function publishedPosts(){
 const posts=await getCollection('blog');
 return posts.filter(p=>validSlug(p.id)&&isPublished(p.data)).sort((a,b)=>Date.parse(b.data.publishedAt)-Date.parse(a.data.publishedAt));
}
