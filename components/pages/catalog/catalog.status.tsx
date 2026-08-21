import { useState } from 'react'

import { Button } from '@/components/ui/button'

type TStatus = 'new' | 'used' | 'all'

const filterButtons: { label: string; value: TStatus }[] = [
	{
		label: 'Yangi',
		value: 'new',
	},
	{
		label: 'Barchasi',
		value: 'all',
	},
]
export function StatusSort() {
	const [selectStatus, setSelectStatus] = useState<TStatus>('all')

	return (
		<div className="mt-6 w-full">
			<h3 className="mb-3 text-base font-medium">Elon holati</h3>
			<div className="flex flex-wrap items-center gap-2">
				{filterButtons.map((btn) => (
					<Button
						variant={selectStatus === btn.value ? 'default' : 'outline'}
						key={btn.value}
						onClick={() => setSelectStatus(btn.value)}
					>
						{btn.label}
					</Button>
				))}
			</div>
		</div>
	)
}
