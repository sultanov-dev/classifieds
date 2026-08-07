import { DetailContent } from '@/components/pages/ads-detail/detail.content'
import { productData } from '@/data/product.data'
import Container from '@/shared/container'

export default async function AdsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const product = productData.find((item) => item.slug === slug)

  return (
    <Container>
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <DetailContent item={product!} />
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <h1>{product?.title}</h1>
        </aside>
      </div>
    </Container>
  )
}
