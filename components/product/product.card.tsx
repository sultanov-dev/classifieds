import Link from 'next/link'

import { HeartIcon } from 'lucide-react'

import { IProduct } from '@/data/product.data'
import { cn, formatAdDate } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'

import { Button } from '../ui/button'

export function ProductCard({ item }: { item: IProduct }) {
  return (
    <div className="relative">
      <Link href={`/ads/${item.slug}`}>
        <div className="w-full min-w-0 rounded-md bg-white shadow-md">
          <div className="relative aspect-square h-48.75 w-full outline-hidden">
            <BlurImage
              src={item.images[0]}
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
              <span className="mt-2 inline-block text-lg font-semibold">{item.price}</span>
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

      <Button
        className="absolute top-3 right-3 z-20 cursor-pointer bg-black/20 transition-colors hover:bg-black/30"
        size={'icon-sm'}
      >
        <HeartIcon
          className={cn('size-5', item.isLiked ? 'fill-rose-600 stroke-rose-600' : 'fill-none')}
        />
      </Button>
    </div>
  )
}
