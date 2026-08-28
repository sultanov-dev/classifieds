import { useSearchParams } from 'next/navigation'

export const usePagination = (totalPages: number) => {
	const searchParams = useSearchParams()
	const currentPage = Number(searchParams.get('page')) || 1

	const getPageNumbers = () => {
		const pages: (number | string)[] = []

		if (totalPages <= 10) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, '...', totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(
					1,
					'...',
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				)
			} else {
				pages.push(
					1,
					'...',
					currentPage - 1,
					currentPage,
					currentPage + 1,
					'...',
					totalPages,
				)
			}
		}

		return pages
	}

	const pages = getPageNumbers()

	return { pages, currentPage }
}
