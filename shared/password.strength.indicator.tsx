import { getPasswordStrength } from '@/lib/password'
import { cn } from '@/lib/utils'

export function PassowordStrengthIndicator({
	password = '',
}: {
	password: string
}) {
	const { score, color, label } = getPasswordStrength(password)

	return (
		<div className="mt-2 space-y-1.5">
			<div className="grid grid-cols-4 gap-1.5">
				{[1, 2, 3, 4].map((level) => (
					<div
						key={level}
						className={cn(
							'h-1.5 rounded-full transition-all duration-300',
							score >= level ? color : 'bg-gray-200',
						)}
					/>
				))}
			</div>

			<div className="text-muted-foreground flex justify-between text-xs">
				<span>Parol ishonchliligi:</span>
				<span className="text-foreground font-medium">{label}</span>
			</div>
		</div>
	)
}
