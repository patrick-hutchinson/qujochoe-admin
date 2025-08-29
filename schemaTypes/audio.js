import { defineType, defineField } from 'sanity';

const audioSchema = defineType({
  name: 'audio',
  title: 'Audio',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link to MP3',
      type: 'url',
    }),
  ],
});

export default audioSchema;
