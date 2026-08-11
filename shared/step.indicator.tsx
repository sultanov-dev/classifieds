'use client'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

interface StepIndicatorProps {
	currentStep: number
	steps: { id: number; title: string }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
	return (
		<div className="mb-5 w-full">
			<div className="relative flex items-center justify-between">
				{steps.map((step, index) => {
					const isCompleted = currentStep > step.id
					const isCurrent = currentStep === step.id

					return (
						<div key={step.id} className="relative flex flex-1 items-center">
							<div className="z-10 mx-auto flex flex-col items-center">
								<div
									className={cn(
										'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
										isCompleted
											? 'bg-primary text-primary-foreground'
											: isCurrent
												? 'bg-primary text-primary-foreground ring-primary/20 ring-4'
												: 'bg-muted text-muted-foreground',
									)}
								>
									{isCompleted ? <Check className="h-5 w-5" /> : step.id}
								</div>
								<span
									className={`mt-2 text-xs font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}
								>
									{step.title}
								</span>
							</div>

							{/* Qadamlar orasidagi chiziq */}
							{index < steps.length - 1 && (
								<div
									className={cn(
										'h-0.6 absolute top-5 left-[50%] z-0 w-full transition-all duration-300',
										currentStep > step.id ? 'bg-primary' : 'bg-muted',
									)}
								/>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
