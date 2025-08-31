'use client'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Avatar = ({
  src,
  alt = '',
  fallback = '?',
  size = 'md',
  className = '',
}: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={` ${sizes[size]} flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600 ${className} `}
    >
      {fallback}
    </div>
  )
}
