import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export default function Container({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'mx-auto w-full px-3 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl',
				className,
			)}
		>
			{children}
		</div>
	)
}
