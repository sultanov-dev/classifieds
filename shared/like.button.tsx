'use client'

import { HeartIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLiked } from '@/hooks/useLiked'
import { cn } from '@/lib/utils'

type Props = {
	size?:
		'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'

	className?: string
	initialLiked: boolean
	id: string
}

export function LikeButton({ size, className, initialLiked, id }: Props) {
	const { handleToggle, isLoading, isLiked } = useLiked(initialLiked, id)

	console.log({ isLiked, initialLiked })

	return (
		<Button
			disabled={isLoading}
			onClick={() => handleToggle(id)}
			className={className}
			size={size}
			aria-label="Yoqtirish"
		>
			<HeartIcon
				className={cn(
					'size-5',
					isLiked ? 'fill-rose-600 stroke-rose-600' : 'fill-none',
				)}
			/>
		</Button>
	)
}
