import { useState } from 'react'

import type { Swiper as SwiperType } from 'swiper'
import { EffectFade, FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import Image from 'next/image'

import { CustomNavigation } from '@/shared/custom.navigation'
import type { TImages } from '@/types/listing.types'

export function DetailCarousel({ images }: { images: TImages[] }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

	return (
		<div className="w-full">
			<Swiper
				className="relative"
				spaceBetween={10}
				effect={'fade'}
				navigation={true}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Thumbs, EffectFade]}
			>
				<CustomNavigation />
				{images.map((image) => (
					<SwiperSlide
						className="relative aspect-4/3 w-full overflow-hidden rounded-xl sm:aspect-16/10 lg:aspect-16/8"
						key={image.id}
					>
						<Image
							src={image.url}
							alt="Product image"
							className="object-cover"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				className="mt-3 box-border"
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={5}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Thumbs]}
			>
				{images.map((image) => (
					<SwiperSlide className="cursor-pointer" key={image.id}>
						<div className="relative aspect-square size-20 h-20 w-full overflow-hidden rounded-md">
							<Image
								src={image.thumbnailUrl}
								alt="product image thumb"
								fill
								sizes="80px"
								className="object-cover"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
