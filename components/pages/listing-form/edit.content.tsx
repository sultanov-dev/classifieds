'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Button, buttonVariants } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { protectPages } from '@/config/pages.config'
import { Link } from '@/i18n/navigation'
import { listingToFormValues } from '@/lib/listing.mapper'
import { Heading } from '@/shared/heading'
import { Loader } from '@/shared/loader'
import type { IListing } from '@/types/listing.types'

import { CategoryFields } from './category.fields'
import { CommonFields } from './common.fields'
import { CreateWrapper } from './create.wrapper'
import { EditImages } from './edit.images'
import { ElectronicFields } from './electronic.fields'
import { useUpdateListing } from './hooks/useUpdateListing'
import { TransportFields } from './transport.fields'

export function EditContent({ listing }: { listing: IListing }) {
	const t = useTranslations('ListingForm')
	const tCommon = useTranslations('Common')

	const initialValues = useMemo(() => listingToFormValues(listing), [listing])

	const { form, onSubmit, selectedCategory, isLoading, isDirty } =
		useUpdateListing(listing, initialValues)

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			<FormProvider {...form}>
				<form
					id="edit-listing"
					onSubmit={form.handleSubmit(onSubmit)}
					className="bg-card rounded-xl p-6 shadow-sm"
				>
					<Heading title={t('editTitle')} className="text-2xl" />

					<FieldGroup>
						<CreateWrapper>
							<CategoryFields />
							<CommonFields />
						</CreateWrapper>

						<CreateWrapper>
							{selectedCategory === 'transport' ? (
								<TransportFields />
							) : (
								<ElectronicFields />
							)}
						</CreateWrapper>
					</FieldGroup>

					<div className="mt-8 flex items-center justify-between border-t pt-6">
						<Link
							href={protectPages.ADS}
							className={buttonVariants({ variant: 'outline' })}
						>
							← {tCommon('cancel')}
						</Link>

						<Button
							type="submit"
							disabled={isLoading || !isDirty}
							className="bg-green-600 hover:bg-green-700"
						>
							{tCommon('save')}
							{isLoading && <Loader />}
						</Button>
					</div>
				</form>
			</FormProvider>

			<EditImages listingId={listing.id} images={listing.images} />
		</div>
	)
}
