import ProductViews from '@/components/product/product.views'

import HomeCarousel from './home.carousel'

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeCarousel />
      <ProductViews />
    </div>
  )
}
