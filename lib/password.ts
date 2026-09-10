type TReturn = {
	score: number
	color: string
	label: string
}

export const getPasswordStrength = (password: string): TReturn => {
	if (!password) return { score: 0, color: 'bg-muted', label: '' }

	let score = 0

	if (password.length >= 6) score++
	if (/[A-Z]/.test(password)) score++
	if (/[0-9]/.test(password)) score++
	if (/[^A-Za-z0-9\s]/.test(password)) score++

	switch (score) {
		case 1:
			return { score: 1, color: 'bg-red-500', label: 'Juda zaif' }
		case 2:
			return { score: 2, color: 'bg-orange-500', label: 'Zaif' }
		case 3:
			return { score: 3, color: 'bg-yellow-500', label: "O'rtacha" }
		case 4:
			return { score: 4, color: 'bg-emerald-500', label: 'Juda kuchli' }
		default:
			return { score: 0, color: 'bg-muted', label: '' }
	}
}
