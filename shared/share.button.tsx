'use client'

import { Share2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useShare } from '@/hooks/useShare'

export function ShareButton({ title }: { title: string }) {
	const { handleShare } = useShare(title)

	return (
		<Button
			onClick={handleShare}
			size={'icon-lg'}
			aria-label="E'lonni ulashish"
			className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 text-black transition-colors hover:bg-white/35"
		>
			<Share2Icon className="size-4" />
		</Button>
	)
}
