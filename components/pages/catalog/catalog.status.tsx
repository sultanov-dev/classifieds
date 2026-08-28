import { Button } from '@/components/ui/button'
import { useFilter } from '@/hooks/useFilter'

type TStatus = 'newest' | 'oldest' | 'all'

const filterButtons: { label: string; value: TStatus }[] = [
	{
		label: 'Yangi',
		value: 'newest',
	},
	{
		label: 'Eskilar',
		value: 'oldest',
	},
	{
		label: 'Barchasi',
		value: 'all',
	},
]
export function StatusSort() {
	const { updateQueryParams, queryParams } = useFilter()

	return (
		<div className="mt-6 w-full">
			<h3 className="mb-3 text-base font-medium">Elon holati</h3>
			<div className="flex flex-wrap items-center gap-2">
				{filterButtons.map((btn) => (
					<Button
						variant={queryParams.sort === btn.value ? 'default' : 'outline'}
						key={btn.value}
						onClick={() => updateQueryParams('sort', btn.value)}
					>
						{btn.label}
					</Button>
				))}
			</div>
		</div>
	)
}
