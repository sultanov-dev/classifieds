'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export default function HomeCarousel() {
  const [isLoading, setIsLoading] = useState(true)

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
        <Image
          onLoad={() => setIsLoading(false)}
          className={cn(
            'rounded-lg object-cover duration-500',
            isLoading ? 'scale-105 blur-md' : 'blur-0 scale-100',
          )}
          src={'/banner.png'}
          alt="banner"
          fill
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          onLoad={() => setIsLoading(false)}
          className={cn(
            'rounded-lg object-cover duration-500',
            isLoading ? 'scale-105 blur-md' : 'blur-0 scale-100',
          )}
          src={'/banner.png'}
          alt="banner"
          fill
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          onLoad={() => setIsLoading(false)}
          className={cn(
            'rounded-lg object-cover duration-500',
            isLoading ? 'scale-105 blur-md' : 'blur-0 scale-100',
          )}
          src={'/banner.png'}
          alt="banner"
          fill
          sizes="100vw"
        />
      </SwiperSlide>
    </Swiper>
  )
}
