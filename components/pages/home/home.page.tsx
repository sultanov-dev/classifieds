import { Suspense } from 'react'

import ProductViews from '@/components/product/product.views'

import HomeCarousel from './home.carousel'
import InfoBanner from './home.info.banner'

export default function HomePage() {
	return (
		<div className="w-full">
			<HomeCarousel />
			<Suspense fallback={<div>loading..</div>}>
				<ProductViews title="Yangi elonlar" isHomePage />
			</Suspense>
			<InfoBanner />
			<Suspense fallback={<div>loading..</div>}>
				<ProductViews title="Barcha elonlar" isHomePage />
			</Suspense>
		</div>
	)
}
