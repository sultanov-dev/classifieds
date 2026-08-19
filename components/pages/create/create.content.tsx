'use client'

import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Loader } from '@/shared/loader'
import { StepIndicator } from '@/shared/step.indicator'

import { CategoryFields } from './category.fields'
import { CommonFields } from './common.fields'
import { CreateWrapper } from './create.wrapper'
import { ElectronicFields } from './electronic.fields'
import { useCreateListing } from './hooks/useCreateListing'
import { ImageUpload } from './image.upload'
import { TransportFields } from './transport.fields'

export function CreateContent() {
	const {
		isLoading,
		onSubmit,
		currentStep,
		STEPS,
		prevStep,
		nextStep,
		form,
		selectedCategory,
	} = useCreateListing()

	return (
		<div className="bg-card mx-auto max-w-2xl rounded-xl p-6 shadow-sm">
			<StepIndicator steps={STEPS} currentStep={currentStep} />
			<FormProvider {...form}>
				<form id="create-listing" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						{currentStep === 1 && (
							<CreateWrapper>
								<CategoryFields />
								<CommonFields />
							</CreateWrapper>
						)}

						{currentStep === 2 && (
							<CreateWrapper>
								{selectedCategory === 'transport' && <TransportFields />}
								{selectedCategory === 'electronics' && <ElectronicFields />}
							</CreateWrapper>
						)}

						{currentStep === 3 && (
							<CreateWrapper>
								<ImageUpload control={form.control} />
							</CreateWrapper>
						)}
					</FieldGroup>
				</form>

				<div className="mt-8 flex items-center justify-between border-t pt-6">
					<Button
						type="button"
						variant="outline"
						onClick={prevStep}
						disabled={currentStep === 1}
					>
						← Orqaga
					</Button>

					{currentStep < STEPS.length ? (
						<Button type="button" onClick={nextStep}>
							Keyingisi →
						</Button>
					) : (
						<Button
							type="submit"
							form="create-listing"
							className="bg-green-600 hover:bg-green-700"
							disabled={isLoading}
						>
							Elonni joylash
							{isLoading && <Loader />}
						</Button>
					)}
				</div>
			</FormProvider>
		</div>
	)
}
