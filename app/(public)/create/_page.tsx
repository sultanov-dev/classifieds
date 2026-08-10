'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES } from '@/data/category.data'

export default function CreateListing() {
	const [step, setStep] = useState(1)
	const [category, setCategory] = useState<'transport' | 'electronics' | null>(
		null,
	)
	const [subCategory, setSubCategory] = useState<string | null>(null)

	// Barcha ma'lumotlarni yig'uvchi state
	const [formData, setFormData] = useState({
		title: '',
		price: '',
		description: '',
		// Dinamik maydonlar uchun
		attributes: {},
	})

	// Backendga ma'lumot yuborish
	const handleSubmit = async () => {
		const payload = {
			category,
			subCategory,
			title: formData.title,
			price: Number(formData.price),
			description: formData.description,
			attributes: formData.attributes, // Transport yoki Elektronikaga oid xususiyatlar shu yerda ketadi
		}

		console.log('Backendga ketayotgan JSON Data:', payload)
		// Bu yerda backend API ga POST so'rov yuboriladi
	}

	return (
		<div className="bg-card mx-auto mt-10 max-w-2xl space-y-6 rounded-2xl border p-6 shadow-sm">
			{/* 1-QADAM: Kategoriya tanlash */}
			{step === 1 && (
				<div className="animate-in fade-in zoom-in space-y-6 duration-300">
					<h2 className="text-xl font-bold">1. Kategoriyani tanlang</h2>

					<div className="grid grid-cols-2 gap-4">
						<Button
							variant={category === 'transport' ? 'default' : 'outline'}
							className="h-24 text-lg"
							onClick={() => {
								setCategory('transport')
								setSubCategory(null)
							}}
						>
							🚗 Transport
						</Button>
						<Button
							variant={category === 'electronics' ? 'default' : 'outline'}
							className="h-24 text-lg"
							onClick={() => {
								setCategory('electronics')
								setSubCategory(null)
							}}
						>
							📱 Elektronika
						</Button>
					</div>

					{/* Kategoriya tanlangandan so'ng Subkategoriyani ko'rsatish */}
					{category && (
						<div className="mt-6 space-y-3 border-t pt-6">
							<h3 className="text-md font-medium">Kichik bolimni tanlang:</h3>
							<div className="flex flex-wrap gap-2">
								{CATEGORIES[category].subCategory.map((sub) => (
									<Button
										key={sub.id}
										variant={subCategory === sub.id ? 'default' : 'secondary'}
										onClick={() => setSubCategory(sub.id)}
									>
										{sub.label}
									</Button>
								))}
							</div>
						</div>
					)}

					<div className="flex justify-end pt-4">
						<Button disabled={!subCategory} onClick={() => setStep(2)}>
							Keyingisi →
						</Button>
					</div>
				</div>
			)}

			{/* 2-QADAM: Dinamik ma'lumotlar va Asosiy parametrlar */}
			{step === 2 && (
				<div className="animate-in slide-in-from-right space-y-6 duration-300">
					<h2 className="text-xl font-bold">2. Elon malumotlari</h2>

					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium">Sarlavha</label>
							<Input
								placeholder="Masalan: iPhone 14 Pro Max 256GB"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
						</div>

						<div>
							<label className="text-sm font-medium">Narxi (USD)</label>
							<Input
								type="number"
								placeholder="Masalan: 850"
								value={formData.price}
								onChange={(e) =>
									setFormData({ ...formData, price: e.target.value })
								}
							/>
						</div>

						{/* Dinamik maydonlar: Agar Transport bo'lsa */}
						{category === 'transport' && (
							<div>
								<label className="text-sm font-medium">Probeg (km)</label>
								<Input
									type="number"
									placeholder="25000"
									onChange={(e) =>
										setFormData({
											...formData,
											attributes: {
												...formData.attributes,
												mileage: e.target.value,
											},
										})
									}
								/>
							</div>
						)}

						{/* Dinamik maydonlar: Agar Elektronika bo'lsa */}
						{category === 'electronics' && (
							<div>
								<label className="text-sm font-medium">Holati</label>
								<Input
									placeholder="Yangi yoki ishlatilgan"
									onChange={(e) =>
										setFormData({
											...formData,
											attributes: {
												...formData.attributes,
												condition: e.target.value,
											},
										})
									}
								/>
							</div>
						)}

						<div>
							<label className="text-sm font-medium">Batafsil malumot</label>
							<Textarea
								rows={4}
								placeholder="E'lon haqida to'liq yozing..."
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
							/>
						</div>
					</div>

					<div className="flex justify-between pt-4">
						<Button variant="outline" onClick={() => setStep(1)}>
							← Orqaga
						</Button>
						<Button onClick={handleSubmit}>Elonni joylash</Button>
					</div>
				</div>
			)}
		</div>
	)
}
