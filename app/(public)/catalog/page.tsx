import { CatalogFilter } from '@/components/pages/catalog/catolog.filter'
import Container from '@/shared/container'

type TSearchParams = Promise<{ region: string; category: string }>

export default async function CatalogPage({
	searchParams,
}: {
	searchParams: TSearchParams
}) {
	const resolvedSearchParams = await searchParams

	console.log(resolvedSearchParams)

	return (
		<Container className="mt-10">
			<div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="hidden lg:block">
					<CatalogFilter region={resolvedSearchParams.region} />
				</aside>
			</div>
		</Container>
	)
}
