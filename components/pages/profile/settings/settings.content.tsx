'use client'

import { useProfile } from '@/hooks/useProfile'
import { Heading } from '@/shared/heading'

import { FormSkeleton } from './form.skeleton'
import { SettingsForm } from './settings.form'

export function SettingsContent() {
	const { isLoading, data } = useProfile()

	return (
		<div className="my-9">
			<Heading title="Sozlamalar" className="mb-10" />
			{isLoading ? <FormSkeleton /> : <SettingsForm initialData={data?.user} />}
		</div>
	)
}
