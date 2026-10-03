import { useEffect, useRef, useState } from 'react'

const DEFAULT_SERVICES = 'Hand-finished scrunchies · Tailored blouses, chudithars and gowns'
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/tuk_tails'
const WHATSAPP_NUMBER = (import.meta.env.VITE_ADMIN_WHATSAPP || '916383737258').replace(/\D/g, '')
const WEBSITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin

function wrapText(context, text, maxWidth, maxLines) {
  const words = text.trim().split(/\s+/)
  const lines = []
  let line = ''

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word
    if (line && context.measureText(nextLine).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = nextLine
    }
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    let lastLine = lines[maxLines - 1]
    while (lastLine && context.measureText(`${lastLine}…`).width > maxWidth) lastLine = lastLine.slice(0, -1)
    lines[maxLines - 1] = `${lastLine.trimEnd()}…`
  }
  return lines
}

function drawCard(canvas, name, services, logoImage) {
  const context = canvas.getContext('2d')
  if (!context) return

  const width = 1200
  const height = 675
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#20352e'
  context.fillRect(0, 0, width, height)

  const wash = context.createLinearGradient(0, 0, width, height)
  wash.addColorStop(0, '#29463b')
  wash.addColorStop(1, '#192b27')
  context.fillStyle = wash
  context.fillRect(0, 0, width, height)

  context.strokeStyle = '#d1d9b15c'
  context.lineWidth = 2
  context.setLineDash([5, 12])
  context.strokeRect(25, 25, width - 50, height - 50)
  context.setLineDash([])
  context.strokeStyle = '#d1d9b175'
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(360, 76)
  context.lineTo(360, 599)
  context.stroke()

  context.strokeStyle = '#d1d9b175'
  context.lineWidth = 2
  context.setLineDash([3, 8])
  context.strokeRect(105, 146, 145, 145)
  context.setLineDash([])
  if (logoImage) {
    const logoScale = Math.min(125 / logoImage.naturalWidth, 125 / logoImage.naturalHeight)
    const logoWidth = logoImage.naturalWidth * logoScale
    const logoHeight = logoImage.naturalHeight * logoScale
    context.drawImage(logoImage, 177.5 - logoWidth / 2, 218.5 - logoHeight / 2, logoWidth, logoHeight)
  }

  context.textAlign = 'left'
  context.fillStyle = '#f5f1e7'
  context.font = '600 36px "Playfair Display", Georgia, serif'
  context.fillText('Tuk Tails', 83, 358)
  context.fillStyle = '#c9d1a1'
  context.font = '600 12px "DM Sans", Arial, sans-serif'
  context.fillText('CUT  ·  FIT  ·  FINISH', 83, 389)
  context.fillStyle = '#b7c5bb'
  context.font = '12px "DM Sans", Arial, sans-serif'
  context.fillText('STUDIO CONTACT', 83, 548)

  const contentX = 425
  const contentWidth = 680
  context.fillStyle = '#d1d9a6'
  context.font = '600 13px "DM Sans", Arial, sans-serif'
  context.fillText('A PERSONAL INTRODUCTION', contentX, 130)

  const recipient = name.trim() || 'Your name here'
  let recipientSize = Math.min(54, 700 / recipient.length)
  recipientSize = Math.max(32, recipientSize)
  context.fillStyle = '#f5f1e7'
  context.font = `500 ${recipientSize}px "Playfair Display", Georgia, serif`
  context.fillText(recipient, contentX, 207, contentWidth)

  context.fillStyle = '#ccd5bd'
  context.font = '20px "DM Sans", Arial, sans-serif'
  const serviceLines = wrapText(context, services || DEFAULT_SERVICES, contentWidth, 3)
  serviceLines.forEach((line, index) => context.fillText(line, contentX, 268 + index * 32))

  context.strokeStyle = '#d1d9a15c'
  context.beginPath()
  context.moveTo(contentX, 395)
  context.lineTo(contentX + contentWidth, 395)
  context.stroke()

  const instagram = new URL(INSTAGRAM_URL)
  const website = new URL(WEBSITE_URL)
  context.fillStyle = '#d1d9a6'
  context.font = '600 11px "DM Sans", Arial, sans-serif'
  context.fillText('INSTAGRAM', contentX, 443)
  context.fillText('WEBSITE', contentX + 350, 443)
  context.fillStyle = '#f5f1e7'
  context.font = '17px "DM Sans", Arial, sans-serif'
  context.fillText(instagram.host + instagram.pathname.replace(/\/$/, ''), contentX, 476, 330)
  context.fillText(website.host, contentX + 350, 476, 330)

  context.fillStyle = '#d1d9a6'
  context.font = '600 11px "DM Sans", Arial, sans-serif'
  context.fillText('WHATSAPP', contentX, 531)
  context.fillStyle = '#f5f1e7'
  context.font = '17px "DM Sans", Arial, sans-serif'
  context.fillText(`+${WHATSAPP_NUMBER}`, contentX, 565)
  context.textAlign = 'right'
  context.fillStyle = '#b7c5bb'
  context.font = '11px "DM Sans", Arial, sans-serif'
  context.fillText('MADE WITH CARE · SHARED WITH PRIDE', width - 75, 565)
  context.textAlign = 'left'
}

export function VisitingCard() {
  const cardRef = useRef(null)
  const [logoImage, setLogoImage] = useState(null)
  const [recipient, setRecipient] = useState(() => localStorage.getItem('tuk-tails-card-recipient') || '')
  const [services, setServices] = useState(() => localStorage.getItem('tuk-tails-card-services') || DEFAULT_SERVICES)
  const [downloadError, setDownloadError] = useState('')

  useEffect(() => {
    const image = new Image()
    image.onload = () => setLogoImage(image)
    image.src = '/images/logo.png'
  }, [])

  useEffect(() => {
    localStorage.setItem('tuk-tails-card-recipient', recipient)
    localStorage.setItem('tuk-tails-card-services', services)
    drawCard(cardRef.current, recipient, services, logoImage)
  }, [recipient, services, logoImage])

  function downloadCard() {
    const canvas = cardRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) {
        setDownloadError('The card could not be exported. Please try again.')
        return
      }
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const safeName = recipient.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'seller'
      link.download = `tuk-tails-card-${safeName}.png`
      link.href = objectUrl
      link.click()
      URL.revokeObjectURL(objectUrl)
      setDownloadError('')
    }, 'image/png')
  }

  return (
    <section className="visiting-card-panel">
      <header className="visiting-card-heading"><div><span className="eyebrow">A card to share</span><h2>Visiting card</h2><p>Personalize the recipient and service line, then export a print-ready image.</p></div></header>
      <div className="visiting-card-layout">
        <form className="visiting-card-form" onSubmit={(event) => { event.preventDefault(); downloadCard() }}>
          <label>Recipient / seller name<input value={recipient} onChange={(event) => setRecipient(event.target.value.slice(0, 60))} maxLength={60} placeholder="Enter a name" required /></label>
          <label>Services provided<textarea value={services} onChange={(event) => setServices(event.target.value.slice(0, 180))} maxLength={180} rows={4} required /></label>
          <p className="field-hint">The tuk tails logo, Instagram, website and WhatsApp details stay fixed.</p>
          {downloadError && <p className="admin-error" role="alert">{downloadError}</p>}
          <button className="button button-dark" type="submit" disabled={!recipient.trim() || !services.trim()}>Download card image <span aria-hidden="true">↓</span></button>
        </form>
        <div className="visiting-card-preview"><canvas ref={cardRef} width="1200" height="675" role="img" aria-label={`Preview visiting card for ${recipient || 'your seller'}, services: ${services}`} /></div>
      </div>
    </section>
  )
}
