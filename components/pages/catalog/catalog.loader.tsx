import { ProductLoader } from '@/components/product/product.loader'

export default function CatalogLoader() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 10 }).map((_, index) => (
				<ProductLoader key={index} />
			))}
		</div>
	)
}
