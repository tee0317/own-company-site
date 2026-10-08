import { defineCollection } from 'astro:content';
import {z} from 'astro/zod';
import { glob } from 'astro/loaders';
const blog = defineCollection({
 loader: glob({pattern:'*.md',base:'./src/content/blog'}),
 schema: z.object({
  title:z.string().min(1),description:z.string().min(1),theme:z.enum(['choose','brew','enjoy']),
  publishedAt:z.iso.datetime({offset:true}),updatedAt:z.iso.datetime({offset:true}),approved:z.boolean(),
  answer:z.string().min(1),scope:z.string().min(1),evidence:z.enum(['tested','reference','mixed']),
  testConditions:z.string().optional(),testResult:z.string().optional(),
  sources:z.array(z.object({label:z.string().min(1),url:z.url().startsWith('https://')})).min(1),
  related:z.array(z.string()).max(2),featured:z.boolean().default(false),featuredOrder:z.number().int().default(0),
  heroImage:z.string().optional(),heroAlt:z.string().optional()
 }).superRefine((data,ctx)=>{
  if(Date.parse(data.updatedAt)<Date.parse(data.publishedAt))ctx.addIssue({code:'custom',message:'Invalid update date'});
  if(data.evidence!=='reference'&&(!data.testConditions?.trim()||!data.testResult?.trim()))ctx.addIssue({code:'custom',message:'Test evidence required'});
  if(data.heroImage&&!data.heroAlt?.trim())ctx.addIssue({code:'custom',message:'Image alt required'});
 })
});
export const collections={blog};
