'use client'

import { HeartIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
	const t = useTranslations('AdDetail')
	const { isLiked, toggle, isPending } = useLiked(initialLiked, id)

	return (
		<Button
			disabled={isPending}
			onClick={toggle}
			className={className}
			size={size}
			aria-label={isLiked ? t('likeRemove') : t('likeAdd')}
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
