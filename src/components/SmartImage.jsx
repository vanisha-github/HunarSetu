import { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { FALLBACK_IMAGE } from '../data/images'
import { cn } from '../utils/format'

// Image component with a graceful two-step fallback:
// 1) original URL, 2) shared fallback photo, 3) gradient + icon.
export default function SmartImage({ src, alt = '', className, imgClassName, seed = '', ...rest }) {
  const fallback = seed
    ? `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/600`
    : FALLBACK_IMAGE
  const [current, setCurrent] = useState(src || fallback)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    setCurrent(src || fallback)
    setStage(0)
  }, [src, fallback])

  const handleError = () => {
    if (stage === 0) {
      setCurrent(fallback)
      setStage(1)
    } else {
      setStage(2)
    }
  }

  if (stage === 2) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-sage-100 via-cream-200 to-sage-200 text-forest-700',
          className
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-7 w-7 opacity-60" />
      </div>
    )
  }

  return (
    <div className={cn('img-skeleton', className)}>
      <img
        src={current}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className={cn('h-full w-full object-cover', imgClassName)}
        {...rest}
      />
    </div>
  )
}
