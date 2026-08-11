import type { ReactNode } from 'react'

export function CreateWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="animate-in fade-in zoom-in flex flex-wrap gap-3 space-y-6 duration-300">
			{children}
		</div>
	)
}
