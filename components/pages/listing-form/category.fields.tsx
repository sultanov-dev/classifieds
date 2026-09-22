'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { CATEGORIES } from '@/data/category.data'

import { useCategorySelect } from './hooks/useCategorySelect'

export function CategoryFields() {
	const {
		selectedCategory,
		selectedSubCategory,
		handleChangeCategory,
		handleChangeSubCategory,
		subCategoryError,
	} = useCategorySelect()

	return (
		<div className="mt-6 w-full space-y-6">
			<div className="grid grid-cols-2 gap-4">
				<Button
					type="button"
					variant={selectedCategory === 'transport' ? 'default' : 'outline'}
					className="h-24 text-lg"
					onClick={() => handleChangeCategory('transport')}
				>
					🚗 Transport
				</Button>
				<Button
					type="button"
					variant={selectedCategory === 'electronics' ? 'default' : 'outline'}
					className="h-24 text-lg"
					onClick={() => handleChangeCategory('electronics')}
				>
					📱 Elektronika
				</Button>
			</div>

			{selectedCategory && (
				<Field data-invalid={Boolean(subCategoryError)} className="space-y-3">
					<h3 className="text-md font-medium">Kichik bolimni tanlang:</h3>
					<div className="flex flex-wrap gap-4">
						{CATEGORIES[selectedCategory].subCategory.map((sub) => (
							<Button
								key={sub.id}
								type="button"
								aria-pressed={selectedSubCategory === sub.id}
								variant={
									selectedSubCategory === sub.id ? 'default' : 'secondary'
								}
								onClick={() => handleChangeSubCategory(sub.id)}
							>
								{sub.label}
							</Button>
						))}
					</div>

					{subCategoryError && <FieldError errors={[subCategoryError]} />}
				</Field>
			)}
		</div>
	)
}
