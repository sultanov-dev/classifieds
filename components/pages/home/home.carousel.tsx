'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { BlurImage } from '@/shared/blur.image'

export default function HomeCarousel() {
  return (
    <Swiper
      className="relative aspect-video h-120 w-full sm:aspect-16/7 lg:aspect-21/7"
      pagination={{ dynamicBullets: true }}
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <BlurImage
          className="rounded-lg object-cover"
          src={'/banner.png'}
          priority
          alt="banner"
          fill
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <BlurImage
          className="rounded-lg object-cover"
          src={'/banner.png'}
          priority
          alt="banner"
          fill
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <BlurImage
          className="rounded-lg object-cover"
          src={'/banner.png'}
          priority
          alt="banner"
          fill
          sizes="100vw"
        />
      </SwiperSlide>
    </Swiper>
  )
}
