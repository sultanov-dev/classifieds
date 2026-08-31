'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { protectPages } from '@/config/pages.config'

export function HasNoResult() {
	const router = useRouter()

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="relative aspect-square h-66 w-66">
				<Image
					className="object-cover"
					src={'/empty.png'}
					alt="Empty photo"
					fill
					sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
				/>
			</div>
			<div className="my-5 flex flex-col justify-center">
				<p className="font-normal tracking-wider text-gray-500">
					Hali e&apos;lon qo&apos;shmagansiz
				</p>
				<Button
					className="mt-5 cursor-pointer rounded-2xl"
					size={'lg'}
					variant={'outline'}
					onClick={() => router.push(protectPages.CREATELISTING)}
				>
					E&apos;lon qo&apos;shish
				</Button>
			</div>
		</div>
	)
}
