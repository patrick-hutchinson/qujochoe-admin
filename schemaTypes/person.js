import { defineType, defineField } from 'sanity';
import {UserIcon} from '@sanity/icons';

const personSchema = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'full_name',
      title: 'Full Name',
      type: 'string',
    }),
    {
      name: 'peopleGroup',
      title: 'People Group',
      description: 'Select the group this person belongs to',
      type: 'object',
      fields: [
        {
          name: 'qujocho_heute',
          title: 'Qujocho Heute',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'qujocho_ehemals',
          title: 'Qujocho Ehemals',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'kunstlerinnen',
          title: 'Künstler*innen',
          type: 'boolean',
          initialValue: false,
        },
      ]
    },
    defineField({
      name: 'info',
      title: 'Information',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image_description',
      title: 'Image Description',
      type: 'string',
    }),
    defineField({
      name: 'cv_de',
      title: 'CV (Deutsch)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'cv_en',
      title: 'CV (English)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    {
      name: 'two_cols',
      title: '2 Columns',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'full_name',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    }
  },
});

export default personSchema;
