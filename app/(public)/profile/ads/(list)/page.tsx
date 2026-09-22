import ProfileAds from '@/components/pages/profile/ads-table/profiel.ads'
import { listingService } from '@/services/listing.service'
import Container from '@/shared/container'

export const revalidate = 60

export default async function ProfileAdsPage() {
	const response = await listingService.getMylistings()

	return (
		<Container>
			<ProfileAds initialData={response} />
		</Container>
	)
}
