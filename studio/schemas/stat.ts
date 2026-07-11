import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Big number or short text, e.g. "+5", "ES · EN", "Todos"',
      validation: (r) => r.required().max(20),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
  ],
  preview: {
    select: { value: 'value', label: 'label' },
    prepare: ({ value, label }) => ({ title: value, subtitle: label }),
  },
});
