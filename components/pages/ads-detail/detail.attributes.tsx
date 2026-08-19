import type { TAttirbute } from '@/types/listing.types'

export function DetailAttributes({ attributes }: { attributes: TAttirbute[] }) {
	return (
		<div className="mt-7.5 space-y-7">
			{attributes.map((attribute, i) => (
				<div className="relative flex justify-between" key={i}>
					<span className="bg-background z-10 pr-3 text-base font-normal">
						{attribute.key}
					</span>

					<div className="border-muted-foreground/30 absolute inset-x-0 top-1/2 z-0 border-t border-dashed" />

					<span className="bg-background z-10 pl-3 text-base font-medium">
						{attribute.value}
					</span>
				</div>
			))}
		</div>
	)
}
