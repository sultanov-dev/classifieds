'use client'

import Link from 'next/link'

import { Controller } from 'react-hook-form'

import { useAuthForm } from '@/hooks/useAuthForm'
import { authPages } from '@/config/pages.config'
import { cn } from '@/lib/utils'
import { Loader } from '@/shared/loader'

import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
	const { form, isLoading, onSubmit } = useAuthForm(isLogin)

	return (
		<div className="w-70">
			<h1 className="mb-12 text-2xl font-normal">
				{isLogin ? 'Kirish' : "Ro'hatdan o'tish"}
			</h1>
			<form id="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-xs font-medium"
									id="auth-form-email"
								>
									Emailni kiriting
								</FieldLabel>
								<Input
									className="w-full focus-visible:ring-purple-300"
									id="auth-form-email"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									placeholder="example@mail.ru"
									{...field}
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="password"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-xs font-medium"
									id="auth-form-password"
								>
									Parol kiriting
								</FieldLabel>
								<Input
									type="password"
									className="w-full focus-visible:ring-purple-300"
									id="auth-form-password"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									placeholder="********"
									{...field}
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</form>

			<Button
				className={cn(
					'mt-5 w-full cursor-pointer bg-[#1D828E] transition-colors hover:bg-[#229ba8]',
					isLoading && 'cursor-not-allowed bg-[#21cadd]',
				)}
				type="submit"
				form="auth-form"
				disabled={isLoading}
			>
				{isLogin ? 'Kirish' : 'Ro"yhatdan o"tish'}
				{isLoading && <Loader />}
			</Button>

			<div className="mt-7 flex w-full items-center justify-center gap-3">
				<span className="text-muted-foreground text-xs font-normal">
					{isLogin ? "Akkountingiz yo'qmi?" : 'Akkountingiz bormi?'}
				</span>
				<Link
					className="text-sm hover:text-sky-400"
					href={isLogin ? authPages.REGISTER : authPages.LOGIN}
				>
					{isLogin ? "Ro'yhatdan o'ting" : 'Kirish'}
				</Link>
			</div>
		</div>
	)
}
