'use client'

import dynamic from 'next/dynamic'

import { formatAdDate, formatCurrency } from '@/lib/utils'
import { Heading } from '@/shared/heading'
import { LikeButton } from '@/shared/like.button'
import { ShareButton } from '@/shared/share.button'
import type { IListing } from '@/types/listing.types'

import { DetailAttributes } from './detail.attributes'

const DynamicCarousel = dynamic(
	() => import('./detail.carousel').then((mod) => mod.DetailCarousel),
	{
		ssr: false,
	},
)

export function DetailContent({ item }: { item: IListing }) {
	return (
		<section className="bg-background rounded-md p-7 shadow-md">
			<DynamicCarousel images={item.images} />
			<div className="mt-5 flex items-center justify-between border-t pt-5">
				<div className="flex items-center gap-6">
					<span className="text-muted-foreground text-xs capitalize">
						{item.region}
					</span>
					<span className="text-muted-foreground text-xs">
						{formatAdDate(item.createdAt)}
					</span>
				</div>
				<div className="flex items-center gap-4">
					<ShareButton title={item.title} />
					<LikeButton
						size={'icon-lg'}
						className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 text-black transition-colors hover:bg-white/35"
						initialLiked={item.isLiked}
						id={item.id}
					/>
				</div>
			</div>
			<Heading title={item.title} className="text-2xl font-normal" />
			<Heading
				title={formatCurrency(item.price, {
					currency: item.currency,
					locale: item.currency === 'USD' ? 'en-US' : 'uz-UZ',
				})}
				className="mt-3 border-b pb-5 text-2xl font-semibold"
			/>
			<DetailAttributes attributes={item.attributes} />
			<div className="mt-10 border-t pt-10">
				<Heading
					className="mb-5 text-xl font-semibold"
					title={"Qisqacha ma'lumot"}
				/>
				<p className="text-base leading-7 font-normal">{item.description}</p>
			</div>
		</section>
	)
}
