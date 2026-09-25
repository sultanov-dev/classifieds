'use client'

import { LockIcon, MailIcon, MapPin, PhoneIcon, UserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { useSettings } from '@/hooks/useSetting'
import { IconInput } from '@/shared/icon.input'
import { PassowordStrengthField } from '@/shared/password.stength'
import RegionSelect from '@/shared/region.select'
import type { IUserData } from '@/types/auth.types'

export function SettingsForm({
	initialData,
}: {
	initialData: IUserData | undefined
}) {
	const t = useTranslations('Profile')
	const tCommon = useTranslations('Common')
	const { form, isPending, handleSubmit } = useSettings(initialData)

	return (
		<>
			<form id="settings-form" onSubmit={form.handleSubmit(handleSubmit)}>
				<FieldGroup className="grid grid-cols-1 md:grid-cols-2">
					<div className="max-h-110 rounded-lg border p-3.5">
						<h1 className="mb-2 text-3xl font-semibold">{t('mainInfo')}</h1>
						<p className="mb-6 text-sm font-normal text-gray-500">
							{t('mainInfoText')}
						</p>
						<div className="grid grid-cols-2 gap-3">
							<Controller
								control={form.control}
								name="fullName"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="gap-1.5">
										<FieldLabel
											className="text-xs font-medium"
											id="settings-form-fullName"
										>
											{t('fullName')}
										</FieldLabel>

										<IconInput
											disabled={isPending}
											icon={<UserIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											id="settings-form-fullName"
											placeholder={t('fullNamePlaceholder')}
											{...field}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="email"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="gap-1.5">
										<FieldLabel
											className="text-xs font-medium"
											id="settings-form-email"
										>
											{t('email')}
										</FieldLabel>

										<IconInput
											disabled={isPending}
											icon={<MailIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											type="email"
											id="settings-form-email"
											placeholder={t('emailPlaceholder')}
											{...field}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="phoneNumber"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="gap-1.5">
										<FieldLabel
											className="text-xs font-medium"
											id="settings-form-phoneNumber"
										>
											{t('phone')}
										</FieldLabel>

										<IconInput
											value={field.value ?? ''}
											disabled={isPending}
											icon={<PhoneIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											inputMode="numeric"
											maxLength={13}
											id="settings-form-phoneNumber"
											placeholder={t('phonePlaceholder')}
											type="tel"
											onChange={field.onChange}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="region"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="gap-1.5">
										<FieldLabel
											className="text-xs font-medium"
											id="settings-form-region"
										>
											{t('region')}
										</FieldLabel>
										<RegionSelect
											disabled={isPending}
											icon={<MapPin />}
											value={field.value ?? ''}
											onValueChange={field.onChange}
											id={'settings-form-region'}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>
					</div>
					<div className="max-h-110 w-112.5 rounded-lg border p-3.5">
						<h1 className="mb-2 text-3xl font-semibold">{t('security')}</h1>
						<p className="mb-6 text-sm font-normal text-gray-500">
							{t('securityText')}
						</p>
						<div className="grid grid-cols-1 gap-3">
							<Controller
								name="currentPassword"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="gap-1.5">
										<FieldLabel
											className="text-xs font-medium"
											id="settings-form-password"
										>
											{t('currentPassword')}
										</FieldLabel>
										<IconInput
											disabled={isPending}
											icon={<LockIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											type="password"
											id="settings-form-password"
											placeholder="********"
											{...field}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<PassowordStrengthField control={form.control} />
						</div>
					</div>
				</FieldGroup>
			</form>

			<Button
				className="mt-5 w-1/4 cursor-pointer bg-[#1D828E] transition-colors hover:bg-[#229ba8]"
				size={'lg'}
				type="submit"
				form="settings-form"
				disabled={isPending}
			>
				{tCommon('save')}
			</Button>
		</>
	)
}
