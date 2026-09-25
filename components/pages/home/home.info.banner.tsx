import {
	AwardIcon,
	BotMessageSquareIcon,
	ShieldIcon,
	ZapIcon,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function InfoBanner() {
	const t = await getTranslations('Home')

	return (
		<div className="mb-10 grid grid-cols-1 gap-6 rounded-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
					<ShieldIcon className="size-8 text-purple-300" />
				</div>
				<div className="flex flex-col">
					<h6 className="text-base font-semibold">{t('secureTitle')}</h6>
					<span className="text-muted-foreground text-xs font-normal tracking-tight">
						{t('secureText')}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
					<ZapIcon className="size-8 text-yellow-300" />
				</div>
				<div className="flex flex-col">
					<h6 className="text-base font-semibold">{t('fastTitle')}</h6>
					<span className="text-muted-foreground text-xs font-normal tracking-tight">
						{t('fastText')}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
					<BotMessageSquareIcon className="size-8 text-purple-300" />
				</div>
				<div className="flex flex-col">
					<h6 className="text-base font-semibold">{t('supportTitle')}</h6>
					<span className="text-muted-foreground text-xs font-normal tracking-tight">
						{t('supportText')}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
					<AwardIcon className="size-8 text-purple-300" />
				</div>
				<div className="flex flex-col">
					<h6 className="text-base font-semibold">{t('qualityTitle')}</h6>
					<span className="text-muted-foreground text-xs font-normal tracking-tight">
						{t('qualityText')}
					</span>
				</div>
			</div>
		</div>
	)
}
