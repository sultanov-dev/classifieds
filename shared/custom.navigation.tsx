'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSwiper } from 'swiper/react'

import 'swiper/css'

import { Button } from '@/components/ui/button'

export function CustomNavigation() {
	const swiper = useSwiper()

	return (
		<>
			<Button
				size={'icon'}
				type="button"
				onClick={() => swiper.slidePrev()}
				className="absolute top-[calc(50%-1.25rem)] left-3 z-10 cursor-pointer rounded-full bg-black/20 p-2 transition-colors hover:bg-black/25"
				aria-label="Oldingi rasm"
			>
				<ChevronLeft size={22} />
			</Button>

			<Button
				size={'icon-sm'}
				type="button"
				onClick={() => swiper.slideNext()}
				className="absolute top-[calc(50%-1.25rem)] right-3 z-10 cursor-pointer rounded-full bg-black/20 p-2 shadow transition hover:bg-black/25"
				aria-label="Keyingi rasm"
			>
				<ChevronRight size={22} />
			</Button>
		</>
	)
}
