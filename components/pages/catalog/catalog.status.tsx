import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useFilter } from '@/hooks/useFilter'

type TStatus = 'newest' | 'oldest' | 'all'

const filterButtons: {
	labelKey: 'sortNewest' | 'sortOldest' | 'sortAll'
	value: TStatus
}[] = [
	{ labelKey: 'sortNewest', value: 'newest' },
	{ labelKey: 'sortOldest', value: 'oldest' },
	{ labelKey: 'sortAll', value: 'all' },
]

export function StatusSort() {
	const t = useTranslations('Catalog')
	const { updateQueryParams, queryParams } = useFilter()

	return (
		<div className="mt-6 w-full">
			<h3 className="mb-3 text-base font-medium">{t('listingStatus')}</h3>
			<div className="flex flex-wrap items-center gap-2">
				{filterButtons.map((btn) => (
					<Button
						variant={queryParams.sort === btn.value ? 'default' : 'outline'}
						key={btn.value}
						onClick={() => updateQueryParams('sort', btn.value)}
					>
						{t(btn.labelKey)}
					</Button>
				))}
			</div>
		</div>
	)
}
