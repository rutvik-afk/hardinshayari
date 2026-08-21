import type { APIRoute } from 'astro';
import { SITE } from '../../site.config.mjs';

export const GET: APIRoute = () => {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
};
