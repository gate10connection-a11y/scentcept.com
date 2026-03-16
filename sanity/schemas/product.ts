import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: '상품',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '상품명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: '가격 (KRW)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: '상품 설명',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: 'Outerwear', value: 'Outerwear' },
          { title: 'Tops', value: 'Tops' },
          { title: 'Bottoms', value: 'Bottoms' },
          { title: 'Accessories', value: 'Accessories' },
          { title: 'Bags', value: 'Bags' },
          { title: 'Footwear', value: 'Footwear' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: '상품 이미지',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'sizes',
      title: '사이즈',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isNew',
      title: '신상품',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'collection',
      title: '컬렉션',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      subtitle: 'category',
    },
  },
})
