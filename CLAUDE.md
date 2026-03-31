# CLAUDE.md — Blog Le Bon Réveil

## Architecture

- **Front** : Astro 6.x (static output) on Vercel → `blog.lebonreveil.com`
- **CMS** : WordPress headless on CapRover (65.21.253.51) → `cms.lebonreveil.com` / `lebonreveil-wordpress.captain.codolie.com`
- **E-commerce** : Shopify → `lebonreveil.com`
- **Content pipeline** : GPBot → WP REST API → WP webhook → Vercel Deploy Hook → Astro rebuild
- **Repo** : github.com/d4lvl13n/blog-lebonreveil
- **Vercel project** : lebonreveil-blog

## Tech Stack

- Astro 6.x, Tailwind CSS v4 (via `@tailwindcss/vite`), TypeScript
- `@astrojs/sitemap` for XML sitemap
- WPGraphQL + Yoast SEO + WPGraphQL for Yoast SEO (plugins on WP)
- Zero client-side JS — static HTML only

## Project Structure

```
src/
├── config/site.ts          # Site identity, URLs, SEO defaults
├── lib/
│   ├── wordpress.ts        # WPGraphQL client (queries, types, mock fallback)
│   ├── seo.ts              # JSON-LD generators, HTML entity decoder, meta helpers
│   ├── utils.ts            # formatDate, readingTime, extractToc, paginate
│   └── mock-data.ts        # Mock posts/categories for dev without WP
├── components/             # BaseHead, Header, Footer, ArticleCard, Breadcrumbs,
│                           # TableOfContents, RelatedPosts, Pagination
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro                    # Homepage
│   ├── [...slug].astro                # Article pages
│   ├── page/[page].astro             # Homepage pagination
│   ├── categorie/[slug].astro        # Category pages
│   ├── categorie/[slug]/page/[page].astro
│   └── 404.astro
└── styles/global.css       # Tailwind v4 + custom prose styles
```

## Key Conventions

- **Mock mode** : when `WORDPRESS_GRAPHQL_URL` env var is empty, all WP queries return mock data from `mock-data.ts`. Useful for local dev without WP.
- **HTML entities** : WordPress returns `&rsquo;`, `&ldquo;`, etc. Use `decodeHtmlEntities()` from `seo.ts` when displaying WP text in meta tags, JSON-LD, or TOC.
- **Yoast SEO titles** : use as-is (they already include site name). Don't wrap in `buildTitle()`.
- **Trailing slash** : always on. Configured in `astro.config.mjs`.
- **URL structure** : flat for articles (`/post-slug/`), hierarchical for categories (`/categorie/cat-slug/`).
- **No tag pages** until 50+ articles per tag.

## Commands

```bash
npm run dev       # Dev server (localhost:4321), uses mocks if no WP_GRAPHQL_URL
npm run build     # Static build
npm run preview   # Preview built site
npx astro check   # TypeScript checking
```

## Environment Variables

```
WORDPRESS_GRAPHQL_URL=https://lebonreveil-wordpress.captain.codolie.com/graphql
SITE_URL=https://blog.lebonreveil.com
```

## WordPress Access

- **Admin** : `lebonreveil-wordpress.captain.codolie.com/wp-admin`
- **GraphQL** : `lebonreveil-wordpress.captain.codolie.com/graphql`
- **App Password user** : Sophie
- See `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Codolie-workspace/CODOLIE_WORKSPACE/03_CLIENTS/ACTIVE/Lebonreveil/README.md` for credentials

## SEO Checklist (for every change)

- [ ] Single `<h1>` per page
- [ ] Canonical URL present
- [ ] Meta description non-empty
- [ ] JSON-LD valid (Article, BreadcrumbList, Organization)
- [ ] Images have `width`, `height`, `alt`
- [ ] No client-side JS added
- [ ] `decodeHtmlEntities()` used on any WP-sourced text in meta/structured data

## Deployment

Push to `main` → manual `vercel deploy --prod` (or auto-deploy when GitHub integration is connected).
WP webhook → Vercel Deploy Hook (to be configured) for auto-rebuild on publish.
