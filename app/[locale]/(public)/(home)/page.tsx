import HomePage from '@/components/pages/home/home.page'
import Container from '@/shared/container'

export const revalidate = 60

export default function Home() {
	return (
		<Container>
			<HomePage />
		</Container>
	)
}
