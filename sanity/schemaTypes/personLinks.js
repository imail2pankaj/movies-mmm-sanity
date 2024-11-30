export default {
  name: 'personLink',
  title: 'Person Links',
  type: 'document',
  fields: [
    {
      name: 'persons',
      title: 'Persons',
      type: 'reference',
      to: [{ type: 'persons' }],
      validation: (Rule) => Rule.required(),
      description: 'The person associated with this link.',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(64),
      description: 'Title or label for the link.',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'The URL of the link.',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        timeStep: 1,
      },
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      options: {
        timeStep: 1,
      },
    },
  ],
  initialValue: {
    createdAt: () => new Date().toISOString(),
  },
};
