export default {
  name: 'personTypes',
  title: 'Person Types',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(255),
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
