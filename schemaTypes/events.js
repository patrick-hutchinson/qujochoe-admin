import {defineType, defineField} from 'sanity'
import CaptionsWithImagesComponent from '../components/CaptionsWithImagesComponent'

const eventsSchema = defineType({
  name: 'events',
  type: 'document',
  title: 'Events',
  groups: [
    {
      name: 'aggregator',
      title: 'Archive page fields',
    },
    {
      name: 'single',
      title: 'Single page fields',
    },
  ],
  fieldsets: [
    {
      name: 'dateRange',
      title: 'Date Range',
      options: {columns: 1},
    },
  ],
  fields: [
    defineField({
      name: 'main_title',
      title: 'Title',
      type: 'internationalizedArrayString',
      group: ['aggregator', 'single'],
    }),
    defineField({
      name: 'q',
      title: 'Q',
      type: 'internationalizedArrayString',
      group: ['aggregator', 'single'],
    }),
    defineField({
      name: 'a',
      title: 'A',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
      group: ['aggregator', 'single'],
    }),
    defineField({
      name: 'title',
      title: 'Animated Title of the event',
      type: 'text',
      validation: (Rule) => Rule.required(),
      group: ['single'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug of an Event',
      type: 'slug',
      options: {
        source: 'a[0].value',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters, including slashes, with hyphens
            .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
            .slice(0, 96),
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          return slug && slug.current.includes('/')
            ? 'Slashes (/) are not allowed in the slug.'
            : true
        }),
      group: ['single'],
    }),
    defineField({
      name: 'event_type',
      title: "Event's Type",
      type: 'array',
      of: [{type: 'reference', to: {type: 'events_type'}}],
      group: ['single'],
    }),
    defineField({
      name: 'date_time',
      title: 'Start Date and Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: ['aggregator'],
      fieldset: 'dateRange', // Add to fieldset
    }),
    defineField({
      name: 'date_time_end',
      title: 'End Date and Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: ['aggregator'],
      fieldset: 'dateRange', // Add to fieldset
    }),
    {
      name: 'show_date_time_end',
      title: 'Show End Date on the Event Page',
      type: 'boolean',
      initialValue: false,
      group: ['single'],
    },
    defineField({
      name: 'small_description',
      title: 'Additional Info',
      type: 'internationalizedArrayText',
      group: ['aggregator'],
    }),
    defineField({
      name: 'full_description_de',
      title: 'Full Description (DE)',
      type: 'array',
      of: [{type: 'block'}, {type: 'twoColumnBlock'}],
      group: ['single'],
    }),
    defineField({
      name: 'full_description_eng',
      title: 'Full Description (ENG)',
      type: 'array',
      of: [{type: 'block'}],
      group: ['single'],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'internationalizedArrayString',
      group: ['aggregator', 'single'],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.required(),
      group: ['aggregator', 'single'],
    }),
    defineField({
      name: 'captions',
      title: 'Captions',
      type: 'array',
      of: [
        {
          type: 'string',
          title: 'Caption',
        },
      ],
      components: {
        input: CaptionsWithImagesComponent,
      },
      group: ['single'],
    }),
    defineField({
      name: 'gallery_proportion',
      title: 'Gallery Proportion',
      type: 'string',
      options: {
        list: [
          {title: 'Landscape', value: 'landscape'},
          {title: 'Portrait', value: 'portrait'},
          {title: 'Square', value: 'square'},
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
      group: ['aggregator'],
    }),
    defineField({
      name: 'gallery_single_images_quantity',
      title: 'Gallery Single Images Quantity For Exp Mode',
      description: '3 by default',
      type: 'number',
      options: {
        list: [
          {title: '3', value: 3},
          {title: '6', value: 6},
          {title: '8', value: 8},
          {title: '12', value: 12},
          {title: '24', value: 24},
        ],
        layout: 'radio',
      },
      initialValue: 3,
      group: ['single'],
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'reference',
      to: {type: 'global_color'},
      group: ['aggregator', 'single'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audios',
      title: "Event's Audios",
      type: 'array',
      of: [{type: 'audio'}],
      group: ['single'],
    }),
    defineField({
      name: 'videos',
      title: "Event's Videos",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'url', type: 'url', title: 'Video URL'},
            {name: 'caption', type: 'string', title: 'Video Caption'},
          ],
        },
      ],
      group: ['single'],
    }),
    defineField({
      name: 'event_series',
      title: 'Event Series',
      description: 'Please specify if current event is consisting of multiple series',
      type: 'boolean',
      initialValue: false,
      group: ['aggregator', 'single'],
    }),
    defineField({
      name: 'series_part',
      title: "Event's Series Part",
      description: 'Specify the current series part of the event series',
      type: 'string',
      group: ['aggregator', 'single'],
      hidden: ({document}) => !document.event_series, // Only show if event_series is true
    }),
    // defineField({
    //   name: 'text_blocks_in_bottom',
    //   title: 'Text Blocks in Bottom',
    //   group: ['single'],
    //   type: 'array',
    //   of: [{ type: 'text_block' }],
    // }),
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
      group: ['single'],
    }),
  ],
  preview: {
    select: {
      main_title: 'main_title',
      a: 'a',
      mediaImage: 'gallery.0.asset',
      date: 'date_time',
      eventTypeIcon: 'event_type.0.icon',
      eventTypeTitle: 'event_type.0.title',
    },
    prepare(selection) {
      const {main_title, a, mediaImage, date, eventTypeTitle, eventTypeIcon} = selection
      const formattedDate = new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

      return {
        title: main_title[0].value || a[0].value,
        subtitle:
          (eventTypeIcon || '') + ' ' + (eventTypeTitle[1].value || '') + ', ' + formattedDate,
        media: mediaImage,
      }
    },
  },
})

export default eventsSchema
