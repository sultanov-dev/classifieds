import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/shared/container'

export default function Loading() {
	return (
		<Container>
			<Skeleton className="mt-8 h-90 w-full bg-zinc-200" />
		</Container>
	)
}
