'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'

type TImage = ImageProps & {
  className?: string
  priority?: boolean
}

export const BlurImage = ({ className, priority = false, alt = '', ...props }: TImage) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      alt={alt}
      {...props}
      priority={priority}
      onLoad={() => setIsLoading(false)}
      className={cn(
        'transition duration-500',
        isLoading ? 'scale-105 blur-md' : 'blur-0 scale-100',
        className,
      )}
    />
  )
}
