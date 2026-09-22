import { notFound } from 'next/navigation'

import { EditContent } from '@/components/pages/listing-form/edit.content'
import { listingService } from '@/services/listing.service'
import { userService } from '@/services/user/user.service'
import Container from '@/shared/container'

export default async function EditAdPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const [listing, profile] = await Promise.all([
		listingService.getLisingById(id).catch(() => null),
		userService.getProfile().catch(() => null),
	])

	if (
		!listing ||
		!profile ||
		listing.listing.user.id !== profile.data.user.id
	) {
		notFound()
	}

	return (
		<Container className="mt-10">
			<EditContent listing={listing.listing} />
		</Container>
	)
}
