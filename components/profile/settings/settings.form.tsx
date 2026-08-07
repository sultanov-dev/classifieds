'use client'

import { Input } from '@base-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import RegionSelect from '@/shared/region.select'
import { settingsSchema, TSettingsSchema } from '@/validation/settings.validation'

export function SettingsForm() {
  const form = useForm<TSettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '+998',
      region: 'toshkent',
      password: '',
    },
  })

  const onSubmit = (data: TSettingsSchema) => {
    console.log(data)
  }

  return (
    <>
      <form id="settings-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Controller
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs font-medium" id="settings-form-fullName">
                  Toliq ism
                </FieldLabel>
                <Input
                  className="placeholder:text-muted-foreground w-full rounded-md border p-2 placeholder:text-sm focus-visible:ring-purple-300"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  id="settings-form-fullName"
                  placeholder="Inomov Inomjon"
                  {...field}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs font-medium" id="settings-form-email">
                  Email
                </FieldLabel>
                <Input
                  className="placeholder:text-muted-foreground w-full rounded-md border p-2 placeholder:text-sm focus-visible:ring-purple-300"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  id="settings-form-email"
                  placeholder="inomjon@mail.ru"
                  type="email"
                  {...field}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs font-medium" id="settings-form-phoneNumber">
                  Telefon raqam
                </FieldLabel>
                <Input
                  className="placeholder:text-muted-foreground w-full rounded-md border p-2 placeholder:text-sm focus-visible:ring-purple-300"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  id="settings-form-phoneNumber"
                  placeholder="+998900158502"
                  type="tel"
                  inputMode="numeric"
                  maxLength={13}
                  {...field}
                  onChange={(e) => {
                    const phoneDigits = e.target.value
                      .replace(/\D/g, '')
                      .replace(/^998/, '')
                      .slice(0, 9)

                    field.onChange(`+998${phoneDigits}`)
                  }}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="region"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs font-medium" id="settings-form-region">
                  Viloyatni tanlang
                </FieldLabel>
                <RegionSelect value={field.value ?? ''} onValueChange={field.onChange} />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs font-medium" id="settings-form-password">
                  Parol kiriting
                </FieldLabel>
                <Input
                  type="password"
                  className="placeholder:text-muted-foreground w-full rounded-md border p-2 placeholder:text-sm focus-visible:ring-purple-300"
                  id="settings-form-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="********"
                  {...field}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
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
