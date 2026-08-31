import Link from 'next/link'

import { formatAdDate, formatCurrency } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'
import { LikeButton } from '@/shared/like.button'
import type { TListingRemoveUser } from '@/types/listing.types'

export function ProductCard({ item }: { item: TListingRemoveUser }) {
	return (
		<div className="relative">
			<Link href={`/ads/${item.id}`}>
				<div className="w-full min-w-0 rounded-md bg-white shadow-md">
					<div className="relative aspect-square h-48.75 w-full outline-hidden">
						<BlurImage
							src={item.images[0].thumbnailUrl}
							alt={item.title}
							className="rounded-xl object-cover p-2"
							fill
							sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						/>
					</div>
					<div className="flex h-36.25 flex-col justify-center p-3.5">
						<div className="mb-3">
							<h6 className="line-clamp-2 min-h-10 text-base leading-5 font-normal">
								{item.title}
							</h6>
							<span
								className="mt-2 inline-block text-lg font-semibold"
								suppressHydrationWarning
							>
								{formatCurrency(item.price, {
									currency: item.currency,
									locale: item.currency === 'USD' ? 'en-US' : 'uz-UZ',
									fractionDigits: 2,
								})}
							</span>
						</div>
						<div className="flex items-center justify-between border-t pt-3">
							<span className="text-muted-foreground text-xs font-normal capitalize">
								{item.region}
							</span>
							<span className="text-muted-foreground text-xs font-normal capitalize">
								{formatAdDate(item.createdAt)}
							</span>
						</div>
					</div>
				</div>
			</Link>

			<LikeButton
				className="absolute top-3 right-3 z-20 cursor-pointer bg-black/20 transition-colors hover:bg-black/30"
				size={'icon-sm'}
				initialLiked={item.isLiked}
				id={item.id}
			/>
		</div>
	)
}
