'use client'

import { useTranslations } from 'next-intl'

import { useProfile } from '@/hooks/useProfile'
import { Heading } from '@/shared/heading'

import { FormSkeleton } from './form.skeleton'
import { SettingsForm } from './settings.form'

export function SettingsContent() {
	const t = useTranslations('Profile')
	const { isLoading, data } = useProfile()

	return (
		<div className="my-9">
			<Heading title={t('settingsTitle')} className="mb-10" />
			{isLoading ? <FormSkeleton /> : <SettingsForm initialData={data?.user} />}
		</div>
	)
}
