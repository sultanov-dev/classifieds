'use client'

import dynamic from 'next/dynamic'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { IProduct } from '@/data/product.data'
import { formatAdDate } from '@/lib/utils'
import { Heading } from '@/shared/heading'
import { ShareButton } from '@/shared/share.button'

import { DetailAttributes } from './detail.attributes'

const DynamicCarousel = dynamic(
	() => import('./detail.carousel').then((mod) => mod.DetailCarousel),
	{
		ssr: false,
		loading: () => (
			<div className="bg-muted aspect-video w-full animate-pulse rounded-xl" />
		),
	},
)

export function DetailContent({ item }: { item: IProduct }) {
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
					<Button
						size={'icon-lg'}
						className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 text-black transition-colors hover:bg-white/35"
					>
						<Heart className="size-4" />
					</Button>
				</div>
			</div>
			<Heading title={item.title} className="text-2xl font-normal" />
			<Heading
				title={item.price}
				className="mt-3 border-b pb-5 text-2xl font-semibold"
			/>
			<DetailAttributes attributes={item.attribute} />
			<div className="mt-10 border-t pt-10">
				<Heading
					className="mb-5 text-xl font-semibold"
					title={"Qisqacha ma'lumot"}
				/>
				<p className="text-base leading-7 font-normal">{item.desctiption}</p>
			</div>
		</section>
	)
}
