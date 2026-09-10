'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LockIcon, MailIcon, MapPin, PhoneIcon, UserIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { IconInput } from '@/shared/icon.input'
import { PassowordStrengthField } from '@/shared/password.stength'
import RegionSelect from '@/shared/region.select'
import type { IUserData } from '@/types/auth.types'
import {
	settingsSchema,
	type TSettingsSchema,
} from '@/validation/settings.validation'

export function SettingsForm({
	initialData,
}: {
	initialData: IUserData | undefined
}) {
	const form = useForm<TSettingsSchema>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			fullName: initialData?.fullName || '',
			email: initialData?.email || '',
			phoneNumber: initialData?.phoneNumber || '+998',
			region: initialData?.region || 'Toshkent shahri',
			currentPassword: '',
			newPassword: '',
		},
	})

	const onSubmit = (data: TSettingsSchema) => {
		console.log(data)
	}

	return (
		<>
			<form id="settings-form" onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup className="grid grid-cols-1 md:grid-cols-2">
					<div className="max-h-110 rounded-lg border p-3.5">
						<h1 className="mb-2 text-3xl font-semibold">
							Asosiy ma&apos;lumotlar
						</h1>
						<p className="mb-6 text-sm font-normal text-gray-500">
							Boshqa foydalanuvchilarga ko&apos;rinadigan ma&apos;lumotlaringiz
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
											Toliq ism
										</FieldLabel>

										<IconInput
											icon={<UserIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											id="settings-form-fullName"
											placeholder="Inomov Inomjon"
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
											Email
										</FieldLabel>

										<IconInput
											icon={<MailIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											type="email"
											id="settings-form-email"
											placeholder="inomjon@mail.ru"
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
											Telefon raqam
										</FieldLabel>

										<IconInput
											icon={<PhoneIcon />}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											inputMode="numeric"
											maxLength={13}
											id="settings-form-phoneNumber"
											placeholder="900158502"
											type="tel"
											onChange={(e) => {
												const phoneDigits = e.target.value
													.replace(/\D/g, '')
													.replace(/^998/, '')
													.slice(0, 9)

												field.onChange(`+998${phoneDigits}`)
											}}
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
											Viloyatni tanlang
										</FieldLabel>
										<RegionSelect
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
						<h1 className="mb-2 text-3xl font-semibold">Xavfsizlik</h1>
						<p className="mb-6 text-sm font-normal text-gray-500">
							Hisobingiz xavfsizligini ta&apos;minlash uchun kuchli paroldan
							foydalaning.
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
											Parol kiriting
										</FieldLabel>
										<IconInput
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
			>
				Saqlash
			</Button>
		</>
	)
}
