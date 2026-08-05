import { siteConfig } from "../config/site";

/**
 * UTM tagging for every blog → shop link.
 *
 * The blog is a static site with no client-side analytics, so the only way to
 * attribute a Shopify session to the blog is to carry the intent in the URL.
 * Sessions land in GA4 / Shopify under source=blog, medium=referral, and
 * utm_content tells us which placement did the work.
 */
const UTM_SOURCE = "blog";
const UTM_MEDIUM = "referral";
const UTM_CAMPAIGN = "blog-organique";

/** Placement identifiers — kept short and stable, they become GA4 dimensions. */
export type ShopPlacement =
  | "header"
  | "footer"
  | "encart-inline"
  | "encart-popup"
  | "a-propos"
  | "contenu";

/**
 * Adds UTM parameters to a shop URL. Existing query strings and fragments are
 * preserved; an URL that already carries a utm_source is left untouched.
 */
export function shopLink(url: string, placement: ShopPlacement): string {
  let parsed: URL;
  try {
    parsed = new URL(url, siteConfig.shopUrl);
  } catch {
    return url;
  }

  if (parsed.searchParams.has("utm_source")) return url;

  parsed.searchParams.set("utm_source", UTM_SOURCE);
  parsed.searchParams.set("utm_medium", UTM_MEDIUM);
  parsed.searchParams.set("utm_campaign", UTM_CAMPAIGN);
  parsed.searchParams.set("utm_content", placement);

  return parsed.toString();
}

const SHOP_HOST = new URL(siteConfig.shopUrl).host;

/**
 * Rewrites every shop link found in WordPress content so editorial links are
 * tagged too. CDN assets (images served from the Shopify domain) are skipped —
 * only anchors are rewritten.
 */
export function tagShopLinksInHtml(
  html: string,
  placement: ShopPlacement = "contenu",
): string {
  return html.replace(
    /(<a\b[^>]*\bhref=")([^"]+)(")/gi,
    (match, before: string, href: string, after: string) => {
      let parsed: URL;
      try {
        parsed = new URL(href, siteConfig.shopUrl);
      } catch {
        return match;
      }
      if (parsed.host !== SHOP_HOST) return match;
      if (parsed.pathname.startsWith("/cdn/")) return match;
      return `${before}${shopLink(parsed.toString(), placement)}${after}`;
    },
  );
}
