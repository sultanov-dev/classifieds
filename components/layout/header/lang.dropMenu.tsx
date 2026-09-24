'use client'

import { useTransition } from 'react'

import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

type TLocale = (typeof routing.locales)[number]

const LOCALE_NAMES: Record<TLocale, string> = {
	uz: "O'zbekcha",
	ru: 'Русский',
}

export default function LangDropMenu() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()

	const onLocaleChange = (nextLocale: TLocale) => {
		if (nextLocale === locale) return

		const search = window.location.search

		startTransition(() => {
			router.replace(`${pathname}${search}`, { locale: nextLocale })
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" />}
				disabled={isPending}
			>
				{locale === 'ru' ? (
					<span className="text-xl">🇷🇺</span>
				) : (
					<span className="text-xl">🇺🇿</span>
				)}
				<span className="text-base font-normal uppercase">{locale}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup value={locale} onValueChange={onLocaleChange}>
					{routing.locales.map((item) => (
						<DropdownMenuRadioItem key={item} value={item}>
							{LOCALE_NAMES[item]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
