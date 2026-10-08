export const THEMES = ['choose', 'brew', 'enjoy'];
export const RESERVED_SLUGS = [...THEMES, 'index'];
export const validSlug = (slug) => typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && !RESERVED_SLUGS.includes(slug);
export const isPublished = (data, now = Date.now()) => data.approved === true && Number.isFinite(Date.parse(data.publishedAt)) && Date.parse(data.publishedAt) <= now;
export function articleIssues(data, slug, body = '') {
 const issues = [];
 if (!validSlug(slug)) issues.push('Invalid or reserved article slug');
 for (const key of ['title','description','answer','scope']) if (typeof data[key] !== 'string' || !data[key].trim()) issues.push(`${key} is required`);
 if (!THEMES.includes(data.theme)) issues.push('Unknown theme');
 for (const key of ['publishedAt','updatedAt']) if (typeof data[key] !== 'string' || !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(data[key]) || !Number.isFinite(Date.parse(data[key]))) issues.push(`${key} must include a timezone`);
 if (Date.parse(data.updatedAt) < Date.parse(data.publishedAt)) issues.push('Updated date precedes publication');
 if (typeof data.approved !== 'boolean') issues.push('approved must be explicit');
 if (!['tested','reference','mixed'].includes(data.evidence)) issues.push('Unknown evidence type');
 if (data.evidence !== 'reference' && (!data.testConditions?.trim() || !data.testResult?.trim())) issues.push('Test conditions and results are required');
 if (!Array.isArray(data.sources) || !data.sources.length || data.sources.some(s => !s?.label || !/^https:\/\//.test(s.url || ''))) issues.push('HTTPS sources are required');
 if (!Array.isArray(data.related) || data.related.length > 2 || new Set(data.related).size !== data.related.length || data.related.some(s => !validSlug(s) || s === slug)) issues.push('Invalid related articles');
 if (data.heroImage && (!/^[\p{L}\p{N}][\p{L}\p{N}-]*\.(jpg|jpeg|png|webp)$/u.test(data.heroImage) || !data.heroAlt?.trim())) issues.push('Image filename and description required');
 if (/(admin\x40|amazon\.|amzn\.|line\.me|lin\.ee|<script\b|<iframe\b|javascript:)/i.test(JSON.stringify(data) + body)) issues.push('Forbidden public content');
 return issues;
}
export const dateLabel = (value) => new Intl.DateTimeFormat('ja-JP', {timeZone:'Asia/Tokyo',year:'numeric',month:'long',day:'numeric'}).format(new Date(value));
