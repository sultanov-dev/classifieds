import { AdsTableLoader } from '@/components/pages/profile/ads-table/ads.table.loader'
import Container from '@/shared/container'

export default function MyAdsSkeleton() {
	return (
		<Container>
			<div className="mt-10">
				<AdsTableLoader />
			</div>
		</Container>
	)
}
