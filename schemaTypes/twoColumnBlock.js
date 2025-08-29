import {defineType, defineField} from 'sanity'

export const twoColumnBlock = defineType({
  //   name: 'twoColumnBlock',
  //   title: 'Two Column Block',
  //   type: 'object',
  //   fields: [
  //     defineField({
  //       name: 'content',
  //       title: 'Content',
  //       type: 'array',
  //       of: [{type: 'block'}],
  //     }),
  //   ],

  name: 'twoColumnBlock',
  title: 'Two Column Text',
  type: 'object',
  fields: [
    defineField({
      name: 'left',
      title: 'Left Column',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'right',
      title: 'Right Column',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {left: 'left', right: 'right'},
    prepare({left, right}) {
      const getText = (blocks) =>
        Array.isArray(blocks) && blocks[0]?.children
          ? blocks[0].children
              .filter((child) => child._type === 'span')
              .map((child) => child.text)
              .join('')
          : ''

      const leftText = getText(left).slice(0, 20)
      const rightText = getText(right).slice(0, 20)

      return {
        title: `${leftText} | ${rightText}`,
      }
    },
  },
})
