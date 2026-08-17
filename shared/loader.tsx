'use client'

import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Loader({ className }: { className?: string }) {
	return <LoaderIcon className={cn('size-4 animate-spin', className)} />
}
