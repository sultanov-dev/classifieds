import { Phone } from 'lucide-react'

import { DetailContent } from '@/components/pages/ads-detail/detail.content'
import { productData } from '@/data/product.data'
import Container from '@/shared/container'

export default async function AdsDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const product = productData.find((item) => item.slug === slug)

	return (
		<Container>
			<div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
				<DetailContent item={product!} />
				<aside className="bg-background h-fit rounded-md p-4 shadow-md">
					<div className="flex flex-col items-center gap-y-3">
						<h5 className="text-lg font-medium">{product?.seller.name}</h5>
						<a
							className="flex w-full items-center justify-center gap-x-2 rounded-md bg-[#1D828E] p-2 text-white hover:bg-[#1b93a0]"
							href={`tel:${product?.seller.phoneNumber.replace(/\s/g, '')}`}
						>
							<Phone className="size-5" />
							Qongiroq qilish
						</a>
					</div>
				</aside>
			</div>
		</Container>
	)
}
