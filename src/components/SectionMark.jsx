import { useState } from 'react'

const marks = {
  brand: { text: 'tt', image: '../marks/tuk-tails.png' },
  loading: { text: '…', image: '../marks/loading.png' },
  error: { text: '!', image: '../marks/error.png' },
  'not-found': { text: '404', image: '../marks/404.png' },
  scrunchies: { text: 'S', image: '../marks/scrunchies.png' },
  dress: { text: 'D', image: '/images/dress.png' },
  'most-wanted': { text: 'MW', image: '../marks/most-wanted.svg' },
  upcoming: { text: 'UP', image: '../marks/upcoming.png' },
  tailoring: { text: 'T', image: '../marks/tailoring.svg' },
  feedback: { text: 'F', image: '../marks/feedback.svg' },
}

export function SectionMark({ type = 'brand', label }) {
  const mark = marks[type] || marks.brand
  const [loadedImage, setLoadedImage] = useState('')
  const [failedImage, setFailedImage] = useState('')

  return (
    <span className={`section-mark section-mark--${type}`} role="img" aria-label={label || `${type} placeholder logo`}>
      {failedImage !== mark.image && <img className="section-mark-image" src={mark.image} width="200" height="200" alt="" onLoad={() => setLoadedImage(mark.image)} onError={() => setFailedImage(mark.image)} />}
      {loadedImage !== mark.image && <span className="section-mark-fallback">{mark.text}</span>}
    </span>
  )
}
