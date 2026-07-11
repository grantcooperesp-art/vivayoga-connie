import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Viva Yoga con Connie',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
