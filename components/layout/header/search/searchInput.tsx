'use client'

import { useState } from 'react'

import { XIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchListings } from '@/hooks/useSearchListings'

import { SearchItem } from './searchItem'
import { SearchSkeleton } from './searchSkeleton'

export default function SearchInput() {
	const [search, setSearch] = useState<string>('')
	const debouncedValue = useDebounce<string>(search, 400)

	const { data, isLoading, isFetching } = useSearchListings(debouncedValue)

	const isDebouncing = search !== debouncedValue
	const isSearching = isLoading || isFetching || isDebouncing

	const listings = data?.listings || []
	const hasNoResult =
		!isSearching && debouncedValue.trim().length > 0 && listings.length === 0

	return (
		<div className="relative w-full">
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				type="text"
				placeholder="Elon qidirish"
				className="w-full focus-visible:ring-0 focus-visible:outline-none"
			/>
			{search && (
				<XIcon
					onClick={() => setSearch('')}
					className="absolute top-1/2 right-2 size-5 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-black"
				/>
			)}

			{search && (
				<div className="animate-in fade-in-0 zoom-in-95 absolute z-30 mt-2 flex w-full flex-col gap-y-4 rounded-2xl bg-white p-6 text-base font-normal text-black shadow duration-400">
					{isSearching ? (
						<div className="flex flex-col gap-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<SearchSkeleton key={index} />
							))}
						</div>
					) : hasNoResult ? (
						<div className="flex w-full flex-col items-center justify-center gap-y-3">
							<h2 className="text-xl font-semibold">Natijalar topilmadi 🔍</h2>
							<p className="text-base tracking-wide text-zinc-500">
								Afsuski, soʻrovingizga mos keladigan maʼlumot topilmadi
							</p>
						</div>
					) : (
						listings.map((item) => (
							<SearchItem
								item={item}
								key={item.id}
								onClose={() => setSearch('')}
							/>
						))
					)}
				</div>
			)}
		</div>
	)
}
