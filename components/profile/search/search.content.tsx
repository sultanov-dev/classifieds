import { productData } from '@/data/product.data'
import { formatAdDate } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'
import { Heading } from '@/shared/heading'

export function SearchContent() {
  return (
    <div className="my-10">
      <Heading title="Qidiruvlar" className="mb-5" />
      {productData.map((item) => (
        <div className="mb-6 flex w-full items-center rounded-md shadow-md last:mb-0" key={item.id}>
          <div className="relative aspect-square h-44.5 w-42 overflow-hidden">
            <BlurImage
              className="rounded-xl object-cover p-2"
              src={item.images[0]}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <div className="ml-4 flex flex-col justify-center">
            <h1 className="line-clamp-2 w-105 text-base font-normal md:text-2xl">{item.title}`</h1>
            <span className="mt-5 mb-5 text-base font-semibold lg:text-2xl">{item.price}</span>
            <div className="flex items-center justify-between border-t px-3 pt-3">
              <span className="text-muted-foreground text-xs font-normal capitalize">
                {item.region}
              </span>
              <span className="text-muted-foreground text-xs font-normal capitalize">
                {formatAdDate(item.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
