import { getSanityClient, urlFor } from './sanity';
import { fallbackContent, type Locale, type Content } from './fallback';

export async function getContent(locale: Locale): Promise<Content> {
  const client = getSanityClient();
  if (!client) {
    return fallbackContent[locale];
  }
  try {
    // Sanity may not have all fields (e.g. site-wide settings live in fallback).
    // Type as Partial<Content> so missing fields are fine.
    const data = await client.fetch<Partial<Content> | null>(
      `*[_type == "siteContent" && language == $lang][0]`,
      { lang: locale }
    );
    if (!data) return fallbackContent[locale];
    // Merge: fallback provides defaults, Sanity overrides where present.
    // This means if you ever add a new field to fallback but forget to seed it
    // into Sanity, the site still works (uses the fallback value).
    return { ...fallbackContent[locale], ...data } as Content;
  } catch (e) {
    console.warn('Sanity fetch failed, using fallback content:', e);
    return fallbackContent[locale];
  }
}

export { urlFor };
export type { Locale, Content };
