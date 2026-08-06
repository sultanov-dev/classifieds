import ProductViews from '@/components/product/product.views'

import HomeCarousel from './home.carousel'
import InfoBanner from './home.info.banner'

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeCarousel />
      <ProductViews />
      <InfoBanner />
    </div>
  )
}
