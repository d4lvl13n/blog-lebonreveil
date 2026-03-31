// WordPress GraphQL client — fetches data at build time only
// In dev without WORDPRESS_GRAPHQL_URL, serves mock data.

import { mockPosts, mockPostSummaries, mockCategories } from "./mock-data";

const WORDPRESS_GRAPHQL_URL = import.meta.env.WORDPRESS_GRAPHQL_URL ?? "";
const USE_MOCKS = !WORDPRESS_GRAPHQL_URL;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WPCategory {
  name: string;
  slug: string;
  description: string | null;
  count: number | null;
}

export interface WPFeaturedImage {
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  } | null;
}

export interface WPSeoFields {
  title: string | null;
  metaDesc: string | null;
  opengraphImage: { sourceUrl: string } | null;
}

export interface WPPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: { node: WPFeaturedImage } | null;
  categories: { nodes: WPCategory[] };
  seo: WPSeoFields | null;
}

export interface WPPostFull extends WPPostSummary {
  content: string;
  tags: { nodes: { name: string; slug: string }[] };
}

interface WPPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

// ---------------------------------------------------------------------------
// GraphQL helper
// ---------------------------------------------------------------------------

async function wpGraphql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`WP GraphQL error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`WP GraphQL query error: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

const POST_SUMMARY_FIELDS = `
  slug
  title
  excerpt
  date
  modified
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
  seo {
    title
    metaDesc
    opengraphImage {
      sourceUrl
    }
  }
`;

const POST_FULL_FIELDS = `
  ${POST_SUMMARY_FIELDS}
  content
  tags {
    nodes {
      name
      slug
    }
  }
`;

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function fetchAllPostSlugs(): Promise<{ slug: string; modified: string }[]> {
  if (USE_MOCKS) return mockPosts.map((p) => ({ slug: p.slug, modified: p.modified }));
  const data = await wpGraphql<{
    posts: { nodes: { slug: string; modified: string }[] };
  }>(`
    query AllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
          modified
        }
      }
    }
  `);
  return data.posts.nodes;
}

export async function fetchPosts(
  first = 12,
  after: string | null = null,
): Promise<{ posts: WPPostSummary[]; pageInfo: WPPageInfo }> {
  const data = await wpGraphql<{
    posts: { nodes: WPPostSummary[]; pageInfo: WPPageInfo };
  }>(
    `
    query Posts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { status: PUBLISH }) {
        nodes {
          ${POST_SUMMARY_FIELDS}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
    { first, after },
  );
  return { posts: data.posts.nodes, pageInfo: data.posts.pageInfo };
}

export async function fetchAllPosts(): Promise<WPPostSummary[]> {
  if (USE_MOCKS) return mockPostSummaries;
  const all: WPPostSummary[] = [];
  let after: string | null = null;
  let hasNext = true;

  while (hasNext) {
    const { posts, pageInfo } = await fetchPosts(100, after);
    all.push(...posts);
    hasNext = pageInfo.hasNextPage;
    after = pageInfo.endCursor;
  }

  return all;
}

export async function fetchPostBySlug(slug: string): Promise<WPPostFull | null> {
  if (USE_MOCKS) return mockPosts.find((p) => p.slug === slug) ?? null;
  const data = await wpGraphql<{
    postBy: WPPostFull | null;
  }>(
    `
    query PostBySlug($slug: String!) {
      postBy(slug: $slug) {
        ${POST_FULL_FIELDS}
      }
    }
  `,
    { slug },
  );
  return data.postBy;
}

export async function fetchPostsByCategory(
  categorySlug: string,
  first = 12,
  after: string | null = null,
): Promise<{ posts: WPPostSummary[]; pageInfo: WPPageInfo }> {
  const data = await wpGraphql<{
    posts: { nodes: WPPostSummary[]; pageInfo: WPPageInfo };
  }>(
    `
    query PostsByCategory($categorySlug: String!, $first: Int!, $after: String) {
      posts(
        first: $first
        after: $after
        where: { status: PUBLISH, categoryName: $categorySlug }
      ) {
        nodes {
          ${POST_SUMMARY_FIELDS}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
    { categorySlug, first, after },
  );
  return { posts: data.posts.nodes, pageInfo: data.posts.pageInfo };
}

export async function fetchAllCategories(): Promise<WPCategory[]> {
  if (USE_MOCKS) return mockCategories;
  const data = await wpGraphql<{
    categories: { nodes: WPCategory[] };
  }>(`
    query AllCategories {
      categories(first: 100, where: { hideEmpty: true }) {
        nodes {
          name
          slug
          description
          count
        }
      }
    }
  `);
  // Filter out "Uncategorized"
  return data.categories.nodes.filter((c) => c.slug !== "uncategorized");
}

export async function fetchRelatedPosts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4,
): Promise<WPPostSummary[]> {
  if (USE_MOCKS) {
    return mockPostSummaries
      .filter((p) => p.categories.nodes.some((c) => c.slug === categorySlug) && p.slug !== excludeSlug)
      .slice(0, limit);
  }
  const { posts } = await fetchPostsByCategory(categorySlug, limit + 1);
  return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}
