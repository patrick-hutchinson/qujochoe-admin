import { defineType, defineField } from 'sanity';
import {TagIcon} from '@sanity/icons';

const eventsTypeSchema = defineType({
  name: 'events_type',
  title: 'Events Type',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title of an Event Type',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'row',
      title: 'Row Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
        ],
        layout: 'radio',
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'icon',
      title: 'Icon of an Event Type',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug of an Event Type',
      type: 'slug',
      description: 'The slug needs to be the same for every language',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
        .toLowerCase()
        .replace(/\s+|\.+/g, '-')
        .slice(0, 96)
      },
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
      options: {
        isOrderable: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
    
      return {
        title: title[1].value, 
      };
    },
  },
});

export default eventsTypeSchema;