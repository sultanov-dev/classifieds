import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
import { cn } from '@/lib/utils'

interface RegionSelectProps {
	value: string
	onValueChange: (value: string | null) => void
	placeholder?: string
	className?: string
}

export default function RegionSelect({
	value,
	onValueChange,
	className,
	placeholder = 'Viloyatni tanlang',
}: RegionSelectProps) {
	const pathname = usePathname()

	return (
		<Select items={regionData} value={value} onValueChange={onValueChange}>
			<SelectTrigger className={cn('w-48', className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent
				className="w-90"
				side="bottom"
				alignItemWithTrigger={false}
			>
				<SelectGroup>
					{regionData.map((item) =>
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
