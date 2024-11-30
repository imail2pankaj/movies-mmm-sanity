import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'personInPersonTypeInTitle',
  title: 'Persons in Person Type in Titles',
  type: 'document',
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'reference',
      to: [{ type: 'title' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'personType',
      title: 'Person Type',
      type: 'reference',
      to: [{ type: 'personType' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'roleTitle',
      title: 'Title (Role)',
      type: 'string',
      validation: Rule => Rule.max(255),
    }),
    defineField({
      name: 'asRole',
      title: 'As Role',
      type: 'string',
      options: {
        list: [
          { title: 'Director', value: 'Director' },
          { title: 'Producer', value: 'Producer' },
          { title: 'Stars', value: 'Stars' },
          { title: 'Cast', value: 'Cast' },
          { title: 'Writer', value: 'Writer' },
          { title: 'Music', value: 'Music' },
          { title: 'Casting', value: 'Casting' },
          { title: 'Makeup', value: 'Makeup' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      person: 'person.name',
      title: 'title.name',
      asRole: 'asRole',
    },
    prepare(selection) {
      const { person, title, asRole } = selection;
      return {
        title: `${person || 'Unknown Person'} in ${title || 'Unknown Title'}`,
        subtitle: `Role: ${asRole || 'Unknown'}`,
      };
    },
  },
});
