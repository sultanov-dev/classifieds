import Image from 'next/image'

import { UploadCloudIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useImages } from './hooks/useImages'

export function ImageContent({
	value,
	onChange,
	isLoading,
}: {
	value: File[]
	onChange: (files: File[]) => void
	isLoading: boolean
}) {
	const { imagePrviews, handleSelectImages, removeImage } = useImages({
		value,
		onChange,
	})

	return (
		<>
			<div
				className="border-border hover:border-primary/50 bg-muted/30 relative cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors"
				aria-disabled={imagePrviews.length >= 6}
			>
				<input
					id="create-listing-images"
					type="file"
					multiple
					accept="image/*"
					className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
					disabled={imagePrviews.length >= 6 || isLoading}
					onChange={(e) => {
						if (e.target.files) {
							handleSelectImages(e.target.files)
						}
					}}
				/>
				<div
					aria-disabled={isLoading}
					className={cn(
						'flex flex-col items-center justify-center space-y-2',
						isLoading && 'cursor-not-allowed',
					)}
				>
					<div className="bg-background rounded-full border p-3 shadow-sm">
						<UploadCloudIcon className="text-primary h-6 w-6" />
					</div>
					<p
						className={cn(
							'text-sm font-medium',
							imagePrviews.length >= 6 ? 'text-rose-600' : 'text-black',
						)}
					>
						{imagePrviews.length >= 6
							? "Boshqa rasm yuklab bo'lmaydi"
							: 'Rasmlarni yuklash uchun bosing yoki shu yerga tashlang'}
					</p>
					<p className="text-muted-foreground text-xs">
						PNG, JPG, WEBP (Maksimal 6 ta rasm)
					</p>
				</div>
			</div>

			{imagePrviews.length > 0 && (
				<div className="grid grid-cols-3 gap-3 pt-2 sm:grid-cols-5">
					{imagePrviews.map((image, index) => (
						<div
							key={index}
							className="group bg-muted relative aspect-square overflow-hidden rounded-xl border"
						>
							<Image
								src={image.url}
								alt={`E'lon rasmi ${index + 1}`}
								className="object-cover"
								fill
								sizes="(max-width: 640px) 33vw, 150px"
							/>

							{/* Asosiy Rasm Nishoni */}
							{index === 0 && (
								<span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
									Asosiy
								</span>
							)}

							{/* O'chirish Tugmasi */}
							<Button
								type="button"
								size={'icon-sm'}
								onClick={() => {
									removeImage(index)
								}}
								className="hover:bg-destructive absolute top-1 right-1 cursor-pointer rounded-full bg-black/60 p-1 text-white opacity-0 transition-colors group-hover:opacity-100"
							>
								<XIcon className="h-3.5 w-3.5" />
							</Button>
						</div>
					))}
				</div>
			)}
		</>
	)
}
