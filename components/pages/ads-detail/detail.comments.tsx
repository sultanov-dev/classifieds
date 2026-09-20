import { useParams } from 'next/navigation'

import { Comments } from './comments/comments'
import { DetailForm } from './detail.form'

export function DetailComments() {
	const { id } = useParams<{ id: string }>()

	return (
		<div className="border-border mt-8 border-t pt-5">
			<DetailForm listingId={id} />
			<Comments listingId={id} />
		</div>
	)
}
