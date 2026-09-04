'use client'

import Image from 'next/image'

export function HasNoResult({ text }: { text: string }) {
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
				<p className="font-normal tracking-wider text-gray-500">{text}</p>
			</div>
		</div>
	)
}
