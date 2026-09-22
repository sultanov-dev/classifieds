'use client'

import Image from 'next/image'

import { RotateCcwIcon, UploadCloudIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'
import { Loader } from '@/shared/loader'
import type { TImages } from '@/types/listing.types'

import { MAX_LISTING_IMAGES, useEditImages } from './hooks/useEditImages'

export function EditImages({
	listingId,
	images,
}: {
	listingId: string
	images: TImages[]
}) {
	const {
		keptImages,
		removedIds,
		newPreviews,
		totalCount,
		availableCount,
		hasChanges,
		isPending,
		markRemoved,
		undoRemoved,
		addFiles,
		removeNewFile,
		resetChanges,
		save,
	} = useEditImages(listingId, images)

	const isFull = availableCount <= 0

	return (
		<section className="bg-card rounded-xl p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<h3 className="text-base font-semibold">E&apos;lon rasmlari</h3>
				<span className="text-muted-foreground text-xs">
					{totalCount} / {MAX_LISTING_IMAGES} — birinchi rasm muqova
				</span>
			</div>

			<div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
				{images.map((image, index) => {
					const isRemoved = removedIds.includes(image.id)

					return (
						<div
							key={image.id}
							className={cn(
								'group bg-muted relative aspect-square overflow-hidden rounded-xl border',
								isRemoved && 'opacity-40',
							)}
						>
							<BlurImage
								src={image.thumbnailUrl}
								alt={`E'lon rasmi ${index + 1}`}
								fill
								sizes="150px"
								className="object-cover"
							/>

							{!isRemoved && index === 0 && (
								<span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
									Asosiy
								</span>
							)}

							<Button
								type="button"
								size="icon-sm"
								disabled={isPending}
								title={isRemoved ? 'Qaytarish' : "O'chirish"}
								aria-label={isRemoved ? 'Rasmni qaytarish' : "Rasmni o'chirish"}
								onClick={() =>
									isRemoved ? undoRemoved(image.id) : markRemoved(image.id)
								}
								className="hover:bg-destructive absolute top-1 right-1 cursor-pointer rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 aria-disabled:opacity-100"
							>
								{isRemoved ? (
									<RotateCcwIcon className="h-3.5 w-3.5" />
								) : (
									<XIcon className="h-3.5 w-3.5" />
								)}
							</Button>
						</div>
					)
				})}

				{newPreviews.map((preview, index) => (
					<div
						key={preview.url}
						className="group border-primary/40 bg-muted relative aspect-square overflow-hidden rounded-xl border-2"
					>
						<Image
							src={preview.url}
							alt={`Yangi rasm ${index + 1}`}
							fill
							sizes="150px"
							className="object-cover"
						/>

						<span className="absolute bottom-1 left-1 rounded bg-emerald-600/90 px-1.5 py-0.5 text-[10px] text-white">
							Yangi
						</span>

						<Button
							type="button"
							size="icon-sm"
							disabled={isPending}
							aria-label="Yangi rasmni olib tashlash"
							onClick={() => removeNewFile(index)}
							className="hover:bg-destructive absolute top-1 right-1 cursor-pointer rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							<XIcon className="h-3.5 w-3.5" />
						</Button>
					</div>
				))}
			</div>

			<div
				className="border-border hover:border-primary/50 bg-muted/30 relative mt-4 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors"
				aria-disabled={isFull}
			>
				<input
					id="edit-listing-images"
					type="file"
					multiple
					accept="image/*"
					disabled={isFull || isPending}
					className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
					onChange={(event) => {
						if (event.target.files) addFiles(event.target.files)
						event.target.value = ''
					}}
				/>
				<div className="flex flex-col items-center justify-center space-y-2">
					<div className="bg-background rounded-full border p-3 shadow-sm">
						<UploadCloudIcon className="text-primary h-6 w-6" />
					</div>
					<p
						className={cn(
							'text-sm font-medium',
							isFull ? 'text-rose-600' : 'text-foreground',
						)}
					>
						{isFull
							? "Boshqa rasm yuklab bo'lmaydi"
							: `Yangi rasm qo'shish (yana ${availableCount} ta mumkin)`}
					</p>
					<p className="text-muted-foreground text-xs">PNG, JPG, WEBP</p>
				</div>
			</div>

			{hasChanges && (
				<div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
					<p className="text-muted-foreground text-xs">
						{removedIds.length > 0 &&
							`${removedIds.length} ta rasm o'chiriladi. `}
						{newPreviews.length > 0 &&
							`${newPreviews.length} ta yangi rasm qo'shiladi.`}
					</p>

					<div className="flex items-center gap-2">
						<Button
							type="button"
							variant="outline"
							disabled={isPending}
							onClick={resetChanges}
						>
							Bekor qilish
						</Button>
						<Button
							type="button"
							disabled={isPending || totalCount === 0}
							onClick={save}
						>
							Rasmlarni saqlash
							{isPending && <Loader />}
						</Button>
					</div>
				</div>
			)}

			{totalCount === 0 && (
				<p className="text-destructive mt-4 text-sm">
					Kamida 1 ta rasm qolishi kerak.
				</p>
			)}

			{keptImages.length === 0 && newPreviews.length > 0 && (
				<p className="text-muted-foreground mt-2 text-xs">
					Barcha eski rasmlar o&apos;chiriladi, muqova yangi rasm bo&apos;ladi.
				</p>
			)}
		</section>
	)
}
