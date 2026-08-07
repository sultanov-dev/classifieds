'use client'

import { IProduct } from '@/data/product.data'

import { DetailCarousel } from './detail.carousel'

export function DetailContent({ item }: { item: IProduct }) {
  return (
    <section className="space-y-6 rounded-md p-7 shadow-md">
      <DetailCarousel images={item.images} />
    </section>
  )
}
