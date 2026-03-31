// Utility functions

import { decodeHtmlEntities } from "./seo";

/**
 * Format a date string to French locale (ex: "31 mars 2026")
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Estimate reading time from HTML content.
 * Returns minutes (minimum 1).
 */
export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/**
 * Extract headings (H2, H3) from HTML content for table of contents.
 * Adds id attributes to the headings for anchor linking.
 */
interface TocEntry {
  level: 2 | 3;
  text: string;
  id: string;
}

export function extractToc(html: string): { toc: TocEntry[]; htmlWithIds: string } {
  const toc: TocEntry[] = [];
  const seen = new Map<string, number>();

  const htmlWithIds = html.replace(
    /<(h[23])([^>]*)>(.*?)<\/h[23]>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const text = decodeHtmlEntities(inner.replace(/<[^>]*>/g, "")).trim();
      let baseId = slugify(text);

      // Deduplicate ids
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);
      const id = count > 0 ? `${baseId}-${count}` : baseId;

      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      toc.push({ level, text, id });

      // Preserve existing attributes, add id
      if (attrs.includes("id=")) {
        return match;
      }
      return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
    },
  );

  return { toc, htmlWithIds };
}

/**
 * Create a URL-safe slug from text.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Paginate an array into chunks and return page data.
 */
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  prevUrl: string | null;
  nextUrl: string | null;
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number,
  baseUrl: string,
): { items: T[]; pagination: PaginationData } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const paged = items.slice(start, start + perPage);

  const prevUrl = currentPage > 1 ? `${baseUrl}page/${currentPage - 1}/` : null;
  const nextUrl = currentPage < totalPages ? `${baseUrl}page/${currentPage + 1}/` : null;

  return {
    items: paged,
    pagination: { currentPage, totalPages, prevUrl, nextUrl },
  };
}
