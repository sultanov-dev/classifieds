'use client'

import { Button } from '@/components/ui/button'
import { useLogOut } from '@/hooks/useLogOut'
import { Loader } from '@/shared/loader'

export function LogOutBtn() {
	const { logoutMutate, isLoading } = useLogOut()

	return (
		<Button
			className={
				'mt-3 w-full cursor-pointer bg-rose-500 text-base font-normal tracking-widest text-white hover:bg-rose-400'
			}
			variant={'destructive'}
			onClick={() => logoutMutate()}
			disabled={isLoading}
		>
			Log out
			{isLoading && <Loader />}
		</Button>
	)
}
