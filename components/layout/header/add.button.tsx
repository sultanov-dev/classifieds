import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { protectPages } from '@/config/pages.config'
import { useRouter } from '@/i18n/navigation'

export default function AddButton() {
	const t = useTranslations('Header')
	const { push } = useRouter()

	return (
		<Button
			className="cursor-pointer bg-[#1D828E] hover:bg-[#1b93a0]"
			onClick={() => push(protectPages.CREATELISTING)}
		>
			<PlusIcon className="size-5" />
			<span className="hidden text-base font-normal capitalize md:block">
				{t('addListing')}
			</span>
		</Button>
	)
}
