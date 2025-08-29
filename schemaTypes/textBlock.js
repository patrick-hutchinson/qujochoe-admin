import { defineType, defineField } from 'sanity';

const textBlockSchema = defineType({
  name: 'text_block',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'content',
      title: 'Content of block',
      type: 'internationalizedArrayText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title[0].value,
      };
    }
  },
});

export default textBlockSchema;
