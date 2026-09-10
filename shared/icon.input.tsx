import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from 'react'

import { Input } from '@base-ui/react'

import { cn } from '@/lib/utils'

interface Props extends ComponentPropsWithoutRef<typeof Input> {
	icon?: ReactNode
	containerClassName?: string
}

export const IconInput = forwardRef<HTMLInputElement, Props>(
	(
		{
			icon,
			className,
			containerClassName,
			'aria-invalid': ariaInvalid,
			...props
		},
		ref,
	) => {
		return (
			<div
				className={cn(
					'border-input flex items-center gap-2 rounded-md border bg-transparent px-3 py-2 transition-colors',
					'focus-within:border-transparent focus-within:ring-2 focus-within:ring-purple-300',
					ariaInvalid && 'border-red-500 focus-within:ring-red-200',
					containerClassName,
				)}
			>
				{icon && (
					<span className="text-muted-foreground flex size-4 shrink-0 items-center justify-center">
						{icon}
					</span>
				)}

				<Input
					ref={ref}
					aria-invalid={ariaInvalid}
					className={cn(
						'placeholder:text-muted-foreground w-full bg-transparent p-0 text-sm placeholder:text-sm',
						'border-none shadow-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none',
						className,
					)}
					{...props}
				/>
			</div>
		)
	},
)

IconInput.displayName = 'IconInput'
