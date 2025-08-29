import { defineType, defineField } from 'sanity';

const datenschutzSchema = defineType({
  name: 'datenschutz',
  title: 'Datenschutz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      initialValue: 'Datenschutz',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    {
      name: 'text_de',
      title: 'Text (DE)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'text_en',
      title: 'Text (ENG)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    // defineField({
    //   name: 'information', 
    //   title: 'Information',
    //   type: 'array',
    //   of: [
    //     defineField({
    //       name: 'information_block',
    //       title: 'Information Block',
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'text',
    //           title: 'Text',
    //           type: 'internationalizedArrayText',
    //           validation: (Rule) => Rule.required(),
    //         }),
    //       ],
    //       preview: {
    //         select: {
    //           title: 'text.0.value',
    //         },
    //       },
    //     }),
    //   ],
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'information.0.information_block.text', // Adjust for previewing the first block
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `First Block: ${subtitle}` : 'No information blocks',
      };
    },
  },
});

export default datenschutzSchema;
