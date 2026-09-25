import { Suspense } from 'react'

import { getTranslations } from 'next-intl/server'

import { ProductLoader } from '@/components/product/product.loader'
import ProductViews from '@/components/product/product.views'

import HomeCarousel from './home.carousel'
import InfoBanner from './home.info.banner'

export default async function HomePage() {
	const t = await getTranslations('Home')

	return (
		<div className="w-full">
			<HomeCarousel />
			<Suspense fallback={<ProductLoader />}>
				<ProductViews title={t('latestListings')} type="latest" isHomePage />
			</Suspense>
			<InfoBanner />
			<Suspense fallback={<ProductLoader />}>
				<ProductViews title={t('allListings')} type="all" isHomePage />
			</Suspense>
		</div>
	)
}
