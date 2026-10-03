import { useState } from 'react'

const marks = {
  brand: { text: 'tt', image: '/images/logo.png' },
  loading: { text: '…', image: '/images/logo.png' },
  error: { text: '!', image: '/images/404.png' },
  'not-found': { text: '404', image: '/images/404.png' },
  scrunchies: { text: 'S', image: '/images/scrunchies.png' },
  dress: { text: 'D', image: '/images/dress.png' },
  'most-wanted': { text: 'MW' },
  upcoming: { text: 'UP' },
  tailoring: { text: 'T', image: '/images/logo.png' },
  feedback: { text: 'F' },
}

export function SectionMark({ type = 'brand', label }) {
  const mark = marks[type] || marks.brand
  const [loadedImage, setLoadedImage] = useState('')
  const [failedImage, setFailedImage] = useState('')

  return (
    <span className={`section-mark section-mark--${type}`} role="img" aria-label={label || `${type} placeholder logo`}>
      {mark.image && failedImage !== mark.image && <img className="section-mark-image" src={mark.image} width="200" height="200" alt="" onLoad={() => setLoadedImage(mark.image)} onError={() => setFailedImage(mark.image)} />}
      {(!mark.image || loadedImage !== mark.image) && <span className="section-mark-fallback">{mark.text}</span>}
    </span>
  )
}
