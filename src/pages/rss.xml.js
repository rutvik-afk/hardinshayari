import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../site.config.mjs';

export async function GET(context) {
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date - a.data.date).slice(0, 100);
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => {
      const slug = post.slug.split('/').pop();
      return {
        title: post.data.title,
        description: post.data.metaDescription,
        pubDate: post.data.date,
        link: `/${post.data.category}/${slug}/`,
      };
    }),
  });
}
