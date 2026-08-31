'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { columnsSkeleton } from '@/data/table.data'

export function AdsTableLoader() {
	return (
		<div className="overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columnsSkeleton.map((col, index) => (
							<TableHead key={index}>
								<Skeleton className={col.header} />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 6 }).map((_, rowIndex) => (
						<TableRow key={rowIndex}>
							{columnsSkeleton.map((col, colIndex) => (
								<TableCell key={colIndex}>
									<Skeleton className={col.cell} />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
