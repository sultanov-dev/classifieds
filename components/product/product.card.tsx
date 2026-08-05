import { IProduct } from '@/data/product'
import { formatAdDate } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'

export function ProductCard({ item }: { item: IProduct }) {
  return (
    <div className="w-full min-w-0 rounded-md bg-white shadow-md">
      <div className="relative aspect-square h-48.75 w-full outline-hidden">
        {item.images.map((image, i) => (
          <BlurImage
            src={image}
            alt={item.title}
            className="rounded-xl object-cover p-2"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            key={i}
          />
        ))}
      </div>
      <div className="p-3.5">
        <div className="mb-3">
          <h6 className="line-clamp-2 text-base font-normal">{item.title}</h6>
          <span className="text-lg font-semibold">{item.price}</span>
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
  )
}
