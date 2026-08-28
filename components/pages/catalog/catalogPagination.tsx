import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { useFilter } from '@/hooks/useFilter'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'

export function CatalogPagination({ totalPages }: { totalPages: number }) {
	const { pages, currentPage } = usePagination(totalPages)
	const { updateQueryParams } = useFilter()

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							if (currentPage > 1) {
								updateQueryParams('page', String(currentPage - 1))
							}
						}}
						aria-disabled={currentPage <= 1}
						className={cn(currentPage <= 1 && 'pointer-events-none opacity-60')}
					/>
				</PaginationItem>

				{pages.map((page, index) => {
					if (page === '...') {
						return (
							<PaginationItem key={`elypsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						)
					}

					const pageNumber = Number(page)
					const isActive = pageNumber === currentPage

					return (
						<PaginationItem key={pageNumber}>
							<PaginationLink
								onClick={() => updateQueryParams('page', String(pageNumber))}
								isActive={isActive}
							>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					)
				})}

				<PaginationItem>
					<PaginationNext
						onClick={() => {
							if (currentPage < totalPages) {
								updateQueryParams('page', String(currentPage + 1))
							}
						}}
						aria-disabled={currentPage >= totalPages}
						className={cn(
							currentPage >= totalPages && 'pointer-events-none opacity-60',
						)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
