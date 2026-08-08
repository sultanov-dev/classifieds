export const useShare = (title: string) => {
	const handleShare = async () => {
		const shareData = {
			title,
			text: `${title} e'lonni ko'ring`,
			url: window.location.href,
		}

		try {
			if (navigator.share) {
				await navigator.share(shareData)
			} else {
				await navigator.clipboard.writeText(window.location.href)
				alert('Nusxalandi')
			}
		} catch (error) {
			if ((error as Error).name !== 'AbortError') {
				console.log('Ulashishda xatolik')
			}
		}
	}

	return { handleShare }
}
