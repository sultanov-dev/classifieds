import { useTranslations } from 'next-intl'

export const useShare = (title: string) => {
	const t = useTranslations('AdDetail')

	const handleShare = async () => {
		const shareData = {
			title,
			text: t('shareText', { title }),
			url: window.location.href,
		}

		try {
			if (navigator.share) {
				await navigator.share(shareData)
			} else {
				await navigator.clipboard.writeText(window.location.href)
				alert(t('shareCopied'))
			}
		} catch (error) {
			if ((error as Error).name !== 'AbortError') {
				console.log('Ulashishda xatolik')
			}
		}
	}

	return { handleShare }
}
