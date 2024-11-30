export default {
  name: 'titles',
  title: 'Titles',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(255),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 255,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'details',
      title: 'Details',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required().max(8),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Movie', value: 'Movie' },
          { title: 'Web Series', value: 'WebSeries' },
          { title: 'TV Series', value: 'TvSeries' },
          { title: 'Short Movie', value: 'ShortMovie' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Movie',
      validation: (Rule) => Rule.required(),
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
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'Draft' },
          { title: 'Publish', value: 'Publish' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Draft',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'story',
      title: 'Story',
      type: 'text',
    },
    {
      name: 'runTime',
      title: 'Run Time',
      type: 'string',
      description: 'Duration of the title (e.g., "2h 30m").',
    },
    {
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'List of genres associated with the title.',
    },
  ],
  initialValue: {
    status: 'Draft',
    type: 'Movie',
  },
};
