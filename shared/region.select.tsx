'use client'

import { useMemo, type ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { publicPages } from '@/config/pages.config'
import { regionData } from '@/data/region.data'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface RegionSelectProps {
	value: string
	onValueChange: (value: string | null) => void
	placeholder?: string
	className?: string
	id?: string
	icon?: ReactNode
	disabled?: boolean
}

export default function RegionSelect({
	value,
	onValueChange,
	className,
	icon,
	placeholder,
	id,
	disabled,
}: RegionSelectProps) {
	const t = useTranslations('Regions')
	const tHeader = useTranslations('Header')
	const pathname = usePathname()

	const regions = useMemo(
		() =>
			regionData.map((item) => ({ value: item.value, label: t(item.value) })),
		[t],
	)

	return (
		<Select items={regions} value={value} onValueChange={onValueChange} id={id}>
			<SelectTrigger className={cn('w-48', className)} disabled={disabled}>
				{icon && (
					<span className="text-muted-foreground flex size-4 shrink-0 items-center justify-center">
						{icon}
					</span>
				)}
				<SelectValue
					placeholder={placeholder ?? tHeader('regionPlaceholder')}
				/>
			</SelectTrigger>
			<SelectContent
				className="w-90"
				side="bottom"
				alignItemWithTrigger={false}
			>
				<SelectGroup>
					{regions.map((item) =>
						['/catalog', '/'].includes(pathname) ? (
							<Link
								href={`${publicPages.CATALOG}?region=${item.value}`}
								key={item.value}
							>
								<SelectItem value={item.value}>{item.label}</SelectItem>
							</Link>
						) : (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						),
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
