/**
 * Dynamic sitemap — fetches all posts and categories from WordPress
 * at request time (SSR) so every published article is included.
 */
import type { APIRoute } from "astro";
import { fetchAllPostSlugs, fetchAllCategories } from "../lib/wordpress";
import { siteConfig } from "../config/site";

export const GET: APIRoute = async () => {
  const [slugs, categories] = await Promise.all([
    fetchAllPostSlugs(),
    fetchAllCategories(),
  ]);

  const urls: { loc: string; lastmod?: string; priority: string; changefreq: string }[] = [];

  // Homepage
  urls.push({
    loc: `${siteConfig.url}/`,
    priority: "1.0",
    changefreq: "daily",
  });

  // Static pages
  urls.push({
    loc: `${siteConfig.url}/a-propos/`,
    priority: "0.3",
    changefreq: "monthly",
  });

  // Articles
  for (const { slug, modified } of slugs) {
    urls.push({
      loc: `${siteConfig.url}/${slug}/`,
      lastmod: modified ? new Date(modified).toISOString().split("T")[0] : undefined,
      priority: "0.8",
      changefreq: "weekly",
    });
  }

  // Categories
  for (const cat of categories) {
    urls.push({
      loc: `${siteConfig.url}/categorie/${cat.slug}/`,
      priority: "0.5",
      changefreq: "weekly",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
