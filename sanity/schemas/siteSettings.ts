import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '사이트 설정',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: '사이트 이름',
      type: 'string',
    }),
    defineField({
      name: 'announcement',
      title: '공지사항 배너',
      type: 'string',
      description: '상단 공지사항 텍스트 (예: "무료배송 이벤트 진행 중")',
    }),
    defineField({
      name: 'freeShippingThreshold',
      title: '무료배송 기준 금액 (KRW)',
      type: 'number',
      initialValue: 100000,
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
})
