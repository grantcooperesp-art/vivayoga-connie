import { getSanityClient, urlFor } from './sanity';
import { fallbackContent, type Locale, type Content } from './fallback';

export async function getContent(locale: Locale): Promise<Content> {
  const client = getSanityClient();
  if (!client) {
    return fallbackContent[locale];
  }
  try {
    const data = await client.fetch<Content | null>(
      `*[_type == "siteContent" && language == $lang][0]{ ... }`,
      { lang: locale }
    );
    return data || fallbackContent[locale];
  } catch (e) {
    console.warn('Sanity fetch failed, using fallback content:', e);
    return fallbackContent[locale];
  }
}

export { urlFor };
export type { Locale, Content };
