import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

let _client: SanityClient | null = null;

function getEnv() {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-10-01';
  if (!projectId || projectId === 'your_project_id_here') return null;
  return { projectId, dataset, apiVersion };
}

export function getSanityClient(): SanityClient | null {
  const env = getEnv();
  if (!env) return null;
  if (!_client) {
    _client = createClient({ ...env, useCdn: true });
  }
  return _client;
}

export function urlFor(source: any) {
  const client = getSanityClient();
  if (!client) return null;
  return imageUrlBuilder(client).image(source);
}
