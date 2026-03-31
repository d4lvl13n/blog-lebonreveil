// JSON-LD structured data generators for SEO

import { siteConfig } from "../config/site";
import type { WPPostFull } from "./wordpress";

// ---------------------------------------------------------------------------
// Organization (site-wide)
// ---------------------------------------------------------------------------

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.shopUrl,
    logo: `${siteConfig.url}${siteConfig.logo}`,
  };
}

// ---------------------------------------------------------------------------
// WebSite (site-wide)
// ---------------------------------------------------------------------------

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Blog`,
    url: siteConfig.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

// ---------------------------------------------------------------------------
// Article (single post)
// ---------------------------------------------------------------------------

export function articleJsonLd(post: WPPostFull) {
  const image =
    post.seo?.opengraphImage?.sourceUrl ??
    post.featuredImage?.node.sourceUrl ??
    `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: stripHtml(post.excerpt),
    image,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${post.slug}/`,
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

// ---------------------------------------------------------------------------
// FAQ (AEO — when article contains FAQ section)
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(faqs: FaqItem[], dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function buildTitle(pageTitle: string): string {
  return siteConfig.titleTemplate.replace("%s", pageTitle);
}

export function buildCanonical(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const withTrailing = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return `${siteConfig.url}${withTrailing}`;
}

export function buildOgImageUrl(post: WPPostFull | null): string {
  if (post?.seo?.opengraphImage?.sourceUrl) return post.seo.opengraphImage.sourceUrl;
  if (post?.featuredImage?.node.sourceUrl) return post.featuredImage.node.sourceUrl;
  return `${siteConfig.url}${siteConfig.ogImage}`;
}
