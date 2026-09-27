import type { ZodSafeParseResult } from 'zod'

/**
 * safeParse natijasidagi xatolarni { 'maydon.yoli': 'xabar' } ko'rinishiga
 * keltiradi. Valid bo'lsa bo'sh obyekt qaytaradi.
 *
 * @example
 * errorsOf(schema.safeParse(data)) // { 'attributes.year': 'yearMax' }
 */
export const errorsOf = (result: ZodSafeParseResult<unknown>) =>
	result.success
		? {}
		: Object.fromEntries(
				result.error.issues.map((issue) => [
					issue.path.join('.'),
					issue.message,
				]),
			)
