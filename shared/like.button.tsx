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
	const { handleToggle, likeLoading } = useLiked(initialLiked, id)

	return (
		<Button
			disabled={likeLoading}
			onClick={handleToggle}
			className={className}
			size={size}
			aria-label={initialLiked ? 'Like-ni bekor qilish' : 'Like qilish'}
		>
			<HeartIcon
				className={cn(
					'size-5',
					initialLiked ? 'fill-rose-600 stroke-rose-600' : 'fill-none',
				)}
			/>
		</Button>
	)
}
