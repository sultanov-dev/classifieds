import { cn } from '@/lib/utils'

export function Heading({
	title,
	className,
}: {
	title: string
	className?: string
}) {
	return (
		<h2 className={cn('text-3xl font-medium text-black', className)}>
			{title}
		</h2>
	)
}
