import { useCallback, useMemo } from 'react'

interface UseImageUploadOptions {
	value: File[]
	onChange: (files: File[]) => void
	maxFiles?: number
}

export const useImages = ({
	value,
	onChange,
	maxFiles = 6,
}: UseImageUploadOptions) => {
	const imagePrviews = useMemo(() => {
		return value.map((file) => ({
			file,

			url: URL.createObjectURL(file),
		}))
	}, [value])

	const handleSelectImages = useCallback(
		(fileList: FileList) => {
			const files = Array.from(fileList)
			const aviableCount = maxFiles - value.length

			if (aviableCount <= 0) return

			const newFiles = files.slice(0, aviableCount)
			onChange([...value, ...newFiles])
		},
		[maxFiles, onChange, value],
	)

	const removeImage = useCallback(
		(index: number) => {
			const newFiles = value.filter((_, i) => i !== index)
			imagePrviews.forEach((preview) => {
				URL.revokeObjectURL(preview.url)
			})

			onChange(newFiles)
		},
		[value, onChange, imagePrviews],
	)

	return { imagePrviews, removeImage, handleSelectImages }
}
