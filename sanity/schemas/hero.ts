import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: '히어로 배너',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '부제목',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: '배너 이미지',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA 버튼 텍스트',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA 버튼 링크',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
