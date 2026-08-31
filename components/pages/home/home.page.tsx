import { Suspense } from 'react'

import { ProductLoader } from '@/components/product/product.loader'
import ProductViews from '@/components/product/product.views'

import HomeCarousel from './home.carousel'
import InfoBanner from './home.info.banner'

export default function HomePage() {
	return (
		<div className="w-full">
			<HomeCarousel />
			<Suspense fallback={<ProductLoader />}>
				<ProductViews title="Yangi elonlar" type="latest" isHomePage />
			</Suspense>
			<InfoBanner />
			<Suspense fallback={<ProductLoader />}>
				<ProductViews title="Barcha elonlar" type="all" isHomePage />
			</Suspense>
		</div>
	)
}
