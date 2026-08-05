import { productData } from '@/data/product'
import { Heading } from '@/shared/heading'

import { ProductCard } from './product.card'

export default function ProductViews() {
  return (
    <div className="my-18 h-full">
      <Heading title="Yangi elonlar" className="mb-5" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productData.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}
