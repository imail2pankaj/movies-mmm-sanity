export default {
  name: 'persons',
  title: 'Persons',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(128),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'fullName',
        maxLength: 128,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
    },
    {
      name: 'birthName',
      title: 'Birth Name',
      type: 'string',
      validation: (Rule) => Rule.max(255),
    },
    {
      name: 'nickNames',
      title: 'Nicknames',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'A list of nicknames.',
    },
    {
      name: 'height',
      title: 'Height',
      type: 'string',
      description: 'Height in a standard format (e.g., "5ft 10in").',
      validation: (Rule) => Rule.max(32),
    },
    {
      name: 'born',
      title: 'Date of Birth',
      type: 'date',
    },
    {
      name: 'birthPlace',
      title: 'Place of Birth',
      type: 'string',
      validation: (Rule) => Rule.max(64),
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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'Male' },
          { title: 'Female', value: 'Female' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'radio',
      },
      initialValue: 'Male',
      validation: (Rule) => Rule.required(),
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
      name: 'died',
      title: 'Date of Death',
      type: 'date',
    },
    {
      name: 'deathPlace',
      title: 'Place of Death',
      type: 'string',
      validation: (Rule) => Rule.max(64),
    },
    {
      name: 'personTypes',
      title: 'Person Types',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'personTypes' }],
        },
      ],
      description: 'Link this person to one or more person types.',
    },
  ],
  initialValue: {
    status: 'Draft',
    gender: 'Male',
  },
};
