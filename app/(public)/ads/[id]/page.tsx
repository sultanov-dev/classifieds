import { Phone } from 'lucide-react'

import { DetailContent } from '@/components/pages/ads-detail/detail.content'
import { listingService } from '@/services/listing.service'
import Container from '@/shared/container'

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
	const response = await listingService.getLisings()
	const data = response.data.listings

	return data.map((item) => ({
		id: item.id,
	}))
}

export default async function AdsDetailPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id

	const listing = await listingService.getLisingById(id)

	return (
		<Container>
			<div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
				<DetailContent item={listing.listing} />
				<aside className="bg-background h-fit rounded-md p-4 shadow-md">
					<div className="flex flex-col items-center gap-y-3">
						<h5 className="text-lg font-medium">
							{listing.listing.user.fullName}
						</h5>
						<a
							className="flex w-full items-center justify-center gap-x-2 rounded-md bg-[#1D828E] p-2 text-white hover:bg-[#1b93a0]"
							// href={`tel:${listing.listing.user.phoneNumber.replace(/\s/g, '')}`}
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
