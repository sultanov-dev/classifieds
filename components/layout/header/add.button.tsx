import { useRouter } from 'next/navigation'

import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { protectPages } from '@/config/pages.config'

export default function AddButton() {
	const { push } = useRouter()

	return (
		<Button
			className="cursor-pointer bg-[#1D828E] hover:bg-[#1b93a0]"
			onClick={() => push(protectPages.CREATELISTING)}
		>
			<PlusIcon className="size-5" />
			<span className="hidden text-base font-normal capitalize md:block">
				Qoshish
			</span>
		</Button>
	)
}
