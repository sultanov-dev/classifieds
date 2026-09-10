'use client'

import { LockIcon } from 'lucide-react'
import { Controller, useWatch, type Control } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import type { TSettingsSchema } from '@/validation/settings.validation'

import { IconInput } from './icon.input'
import { PassowordStrengthIndicator } from './password.strength.indicator'

export function PassowordStrengthField({
	control,
}: {
	control: Control<TSettingsSchema>
}) {
	const newPassword = useWatch({
		control,
		name: 'newPassword',
		defaultValue: '',
	})

	return (
		<Controller
			name="newPassword"
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid} className="gap-1.5">
					<FieldLabel
						className="text-xs font-medium"
						id="settings-form-password"
					>
						Yangi Parol kiriting
					</FieldLabel>
					<IconInput
						icon={<LockIcon />}
						aria-invalid={fieldState.invalid}
						autoComplete="off"
						type="password"
						id="settings-form-newPassword"
						placeholder="********"
						{...field}
					/>

					<PassowordStrengthIndicator password={newPassword} />
					<p className="text-sm font-normal text-gray-500">
						Kamida 6 ta belgi, bosh harf, raqam va maxsus belgi bo&apos;lishi
						kerak.
					</p>

					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	)
}
