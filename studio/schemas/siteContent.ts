import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Español', value: 'es' },
          { title: 'English', value: 'en' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),

    // ─── Hero ─────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow text', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'headlineItalic', title: 'Headline (italic part)', type: 'string' }),
        defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 }),
        defineField({ name: 'ctaText', title: 'Button text', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Button link', type: 'string' }),
      ],
    }),

    // ─── About ────────────────────────────────────
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow text', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'headlineItalic', title: 'Headline (italic part)', type: 'string' }),
        defineField({ name: 'body', title: 'Body text', type: 'text', rows: 4 }),
        defineField({
          name: 'stats',
          title: 'Stats (3 numbers)',
          type: 'array',
          of: [{ type: 'stat' }],
          validation: (r) => r.length(3).error('Exactly 3 stats'),
        }),
      ],
    }),

    // ─── Classes ──────────────────────────────────
    defineField({
      name: 'classes',
      title: 'Classes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'ID (slug)', type: 'string' }),
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'titleItalic', title: 'Title (italic part)', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
            defineField({
              name: 'details',
              title: 'Details (bullet list)',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({ name: 'ctaText', title: 'Button text', type: 'string' }),
          ],
        },
      ],
    }),

    // ─── Schedule ─────────────────────────────────
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({
          name: 'rows',
          title: 'Days',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'day', title: 'Day', type: 'string' }),
                defineField({ name: 'time', title: 'Time', type: 'string' }),
                defineField({ name: 'class', title: 'Class', type: 'string' }),
                defineField({ name: 'highlight', title: 'Highlight this row', type: 'boolean' }),
              ],
              preview: {
                select: { day: 'day', time: 'time', cls: 'class' },
                prepare: ({ day, time, cls }) => ({ title: day, subtitle: `${time} · ${cls}` }),
              },
            },
          ],
        }),
        defineField({ name: 'footer', title: 'Footer note', type: 'text', rows: 2 }),
      ],
    }),

    // ─── Pricing ──────────────────────────────────
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'headlineItalic', title: 'Headline (italic part)', type: 'string' }),
        defineField({
          name: 'tiers',
          title: 'Pricing tiers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Tier name', type: 'string' }),
                defineField({ name: 'price', title: 'Price', type: 'string' }),
                defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
                defineField({
                  name: 'features',
                  title: 'Features',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({ name: 'ctaText', title: 'Button text', type: 'string' }),
                defineField({ name: 'popular', title: 'Mark as popular', type: 'boolean' }),
                defineField({ name: 'popularLabel', title: 'Popular label', type: 'string' }),
              ],
              preview: {
                select: { name: 'name', price: 'price', popular: 'popular' },
                prepare: ({ name, price, popular }) => ({
                  title: popular ? `⭐ ${name}` : name,
                  subtitle: price,
                }),
              },
            },
          ],
        }),
        defineField({ name: 'footer', title: 'Footer note', type: 'text', rows: 2 }),
      ],
    }),

    // ─── Contact ──────────────────────────────────
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'headlineItalic', title: 'Headline (italic part)', type: 'string' }),
        defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Display value', type: 'string' }),
            defineField({ name: 'href', title: 'WhatsApp link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Display value', type: 'string' }),
            defineField({ name: 'href', title: 'Mailto link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Display value', type: 'string' }),
            defineField({ name: 'href', title: 'Instagram URL', type: 'string' }),
          ],
        }),
        defineField({ name: 'whereLabel', title: '"Where" label', type: 'string' }),
        defineField({
          name: 'where',
          title: 'Locations',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'subtitle' },
                prepare: ({ title, subtitle }) => ({ title, subtitle }),
              },
            },
          ],
        }),
      ],
    }),

    // ─── Footer ───────────────────────────────────
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'copyright', title: 'Copyright', type: 'string' }),
      ],
    }),
  ],

  preview: {
    select: { language: 'language' },
    prepare: ({ language }) => ({
      title: `Site content — ${language?.toUpperCase() ?? 'unknown'}`,
    }),
  },
});
