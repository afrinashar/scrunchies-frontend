import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ErrorState, LoadingState } from '../components/AsyncState'
import { FeedbackForm } from '../components/FeedbackForm'
import { SectionMark } from '../components/SectionMark'

const API_URL = import.meta.env.VITE_API_URL || 'https://scrunchies-backend-api.vercel.app'
const categories = ['Scrunchies', 'Dress']
const dressTypes = ['All', 'Blouse', 'Chudithar', 'Gown']
const themes = [
  { id: 'linen', kicker: 'Made slowly, stitched with care', title: 'Made by hand.', accent: 'Fit for you.', description: 'Hand-finished scrunchies and tailored blouses, chudithars and gowns, thoughtfully made around your style and fit.', announcement: 'Hand-finished scrunchies · Tailored pieces, made to your measure' },
  { id: 'midnight', kicker: 'Measured with care, finished by hand', title: 'Your shape.', accent: 'Your signature.', description: 'A considered cut, a comfortable fit, and the small details that make a garment feel like it was always yours.', announcement: 'From first measure to final stitch · Made around you' },
  { id: 'sage', kicker: 'From cloth to one-of-a-kind', title: 'Patterned for', accent: 'your proportions.', description: 'Choose your silhouette and fabric. We’ll shape a blouse, chudithar or gown to move naturally with you.', announcement: 'Thoughtfully patterned · Carefully fitted · Hand finished' },
  { id: 'atelier', kicker: 'One precise cut at a time', title: 'A thoughtful fit.', accent: 'Lasting detail.', description: 'Explore small-batch scrunchies and tailored pieces made with patience, a steady hand and care for every seam.', announcement: 'A little thread, a lot of care · Welcome to our sewing room' },
]
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/'
const adminWhatsapp = import.meta.env.VITE_ADMIN_WHATSAPP || '916383737258'
const tailoringMessage = encodeURIComponent('Hi tuk tails, I would like to ask about a tailored blouse, chudithar or gown.')

function money(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0)
}

function OrderDialog({ product, onClose, onOrderComplete }) {
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', quantity: 1 })
  const [formError, setFormError] = useState('')
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_URL}/orders`, {
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        items: [{ productId: product._id, quantity: Number(form.quantity) }],
      }, { timeout: 12000 })
      return response.data
    },
    onSuccess: (order) => onOrderComplete(order, form),
    onError: (error) => setFormError(error.response?.data?.message || error.message || 'We could not place your order. Please try again.'),
  })

  function submit(event) {
    event.preventDefault()
    if (!form.customerName.trim() || !/^\+?[0-9\s()-]{8,18}$/.test(form.phone) || !form.address.trim()) {
      setFormError('Add your name, a valid phone number and delivery address.')
      return
    }
    setFormError('')
    mutation.mutate()
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="order-dialog" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close order form">×</button>
        <span className="state-eyebrow">Made yours</span>
        <h2 id="order-title">Order {product.name}</h2>
        <p className="dialog-price">{money(product.price)} <span>· dispatched with care</span></p>
        <form onSubmit={submit} className="order-form">
          <label>Your name<input autoComplete="name" value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} maxLength={80} required /></label>
          <label>WhatsApp number<input type="tel" autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} maxLength={18} required /></label>
          <label>Delivery address<textarea autoComplete="street-address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} maxLength={400} rows={3} required /></label>
          <label>Quantity<input type="number" min="1" max="10" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} /></label>
          {formError && <p className="form-error" role="alert">{formError}</p>}
          <button className="button button-dark order-submit" disabled={mutation.isPending} type="submit">
            {mutation.isPending ? 'Placing your order…' : `Place order · ${money(product.price * Number(form.quantity || 1))}`}
          </button>
        </form>
      </section>
    </div>
  )
}

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [activeDressType, setActiveDressType] = useState(dressTypes[0])
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const [spotlightPaused, setSpotlightPaused] = useState(false)
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [confirmation, setConfirmation] = useState('')
  const queryClient = useQueryClient()

  useEffect(() => {
    const paletteTimer = window.setInterval(() => {
      setPaletteIndex((index) => (index + 1) % themes.length)
    }, 2 * 60 * 1000)

    return () => window.clearInterval(paletteTimer)
  }, [])

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await axios.get(`${API_URL}/items`, { timeout: 10000 })).data,
  })
  const allProducts = Array.isArray(productsQuery.data) ? productsQuery.data : []
  const products = allProducts.filter((product) => product.category?.toLowerCase() === activeCategory.toLowerCase()
    && (activeCategory !== 'Dress' || activeDressType === 'All' || product.subcategory === activeDressType))
  const spotlightProducts = allProducts.filter((product) => product.isFeatured)
  const upcomingProducts = allProducts.filter((product) => product.isUpcoming)
  const spotlightProduct = spotlightProducts.length ? spotlightProducts[spotlightIndex % spotlightProducts.length] : null
  const spotlightVideo = spotlightProduct?.videoUrl || ''
  const spotlightImage = spotlightProduct?.photo?.startsWith('http')
    ? spotlightProduct.photo
    : spotlightProduct?.photo ? `${API_URL}/images/${encodeURIComponent(spotlightProduct.photo)}` : undefined
  const currentTheme = themes[paletteIndex]

  useEffect(() => {
    if (spotlightProducts.length < 2 || spotlightPaused) return undefined
    const spotlightTimer = window.setInterval(() => {
      setSpotlightIndex((index) => (index + 1) % spotlightProducts.length)
    }, 7000)
    return () => window.clearInterval(spotlightTimer)
  }, [spotlightPaused, spotlightProducts.length])

  function handleOrderComplete(order, customer) {
    queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
    setSelectedProduct(null)
    setConfirmation(`Order ${String(order._id || order.id || '').slice(-6)} is in. We’ll be in touch shortly.`)
    const product = selectedProduct
    const message = `Hi tuk tails! I just placed an order.\nOrder: ${order._id || order.id}\nItem: ${product.name} × ${customer.quantity}\nName: ${customer.customerName}\nPhone: ${customer.phone}\nAddress: ${customer.address}`
    window.location.assign(`https://wa.me/${adminWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`)
  }

  return (
    <main className="storefront" data-palette={currentTheme.id}>
      <div className="announcement" key={currentTheme.id}>{currentTheme.announcement}</div>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="tuk tails home"><img src="../images/logo.png" alt="tuk tails" height="60" width="180" /><span></span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#collection">Collections</a><a href="#tailoring">Tailoring</a>
        </nav>
        <a className="admin-link" href="/admin">Admin <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow" key={`${currentTheme.id}-kicker`}>{currentTheme.kicker}</span>
          <h1 key={`${currentTheme.id}-title`}>{currentTheme.title}<br /><em>{currentTheme.accent}</em></h1>
          <p key={`${currentTheme.id}-description`}>{currentTheme.description}</p>
          <a className="button button-dark" href="#collection">Explore the collections <span aria-hidden="true">↓</span></a>
          <div className="hero-note"><span className="note-star">✳</span><span>Measured with care<br />finished by hand</span></div>
        </div>
        <div className="hero-image" role="group" aria-roledescription="carousel" aria-label={spotlightProduct ? `Most wanted ${spotlightProduct.name}` : 'Most wanted tuk tails pieces'} onMouseEnter={() => setSpotlightPaused(true)} onMouseLeave={() => setSpotlightPaused(false)} onFocus={() => setSpotlightPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSpotlightPaused(false) }}>
          {spotlightVideo ? <video className="spotlight-image" key={spotlightVideo} src={spotlightVideo} poster={spotlightImage} autoPlay muted loop playsInline aria-hidden="true" /> : spotlightImage ? <img className="spotlight-image" key={spotlightProduct?._id} src={spotlightImage} alt={`Most wanted ${spotlightProduct.name}`} /> : <div className="spotlight-empty"><SectionMark type="most-wanted" /><span>Most wanted</span></div>}
          {spotlightProducts.length > 1 && <div className="spotlight-controls"><button type="button" aria-label="Previous most wanted image" onClick={() => setSpotlightIndex((index) => (index - 1 + spotlightProducts.length) % spotlightProducts.length)}>←</button><button type="button" aria-label="Next most wanted image" onClick={() => setSpotlightIndex((index) => (index + 1) % spotlightProducts.length)}>→</button></div>}
        </div>
        <div className="hero-side-note">CUT · FIT · FINISH</div>
      </section>

      <section className="collection section-wrap" id="collection">
        <div className="section-heading">
          <div><span className="eyebrow">From our sewing table</span><h2>Made to be <em>worn your way.</em></h2></div>
          <p>Small-batch accessories and tailored<br />pieces made with a thoughtful finish.</p>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Shop by collection">
          {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => { setActiveCategory(category); setActiveDressType('All') }}>{category}<span>↗</span></button>)}
        </div>
        {activeCategory === 'Dress' && <div className="dress-filters" role="group" aria-label="Filter dresses by type">
          {dressTypes.map((type) => <button key={type} className={activeDressType === type ? 'dress-filter active' : 'dress-filter'} aria-pressed={activeDressType === type} onClick={() => setActiveDressType(type)}>{type}</button>)}
        </div>}
        {productsQuery.isPending && <LoadingState mark={activeCategory.toLowerCase()} label={`Loading ${activeCategory.toLowerCase()} pieces`} />}
        {productsQuery.isError && <ErrorState error={productsQuery.error} onRetry={() => productsQuery.refetch()} mark={activeCategory.toLowerCase()} />}
        {productsQuery.isSuccess && products.length === 0 && (
          <div className="empty-state"><SectionMark type={activeCategory.toLowerCase()} /><h3>Nothing here just yet.</h3><p>New {activeCategory.toLowerCase()} pieces will be added here.</p></div>
        )}
        {products.length > 0 && <div className="product-grid">
          {products.map((product, index) => {
            const image = product.photo?.startsWith('http') ? product.photo : product.photo ? `${API_URL}/images/${encodeURIComponent(product.photo)}` : ''
            return <article className="product-item" key={product._id} style={{ '--item-index': index }}>
              <div className="product-photo">
                {image ? <img src={image} alt={product.name} loading="lazy" /> : <div className="product-image-placeholder"><SectionMark type={activeCategory.toLowerCase()} label={`${product.name} placeholder`} /></div>}
                <span className="product-tag">{activeCategory === 'Dress' ? product.subcategory || 'TAILORED FOR YOU' : 'A LITTLE EXTRA'}</span>
                <button className="quick-order" onClick={() => { setSelectedProduct(product); setConfirmation('') }} aria-label={`Order ${product.name}`}>＋</button>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.description || 'Made to feel like you.'}</p></div><span>{money(product.price)}</span></div>
            </article>
          })}
        </div>}
      </section>

      <section className="tailoring-band" id="tailoring">
        <div className="tailoring-photo" aria-hidden="true"><span className="tailoring-symbol">✂</span><SectionMark type="tailoring" /></div>
        <div className="tailoring-copy"><span className="eyebrow">The tailoring room</span><h2>A thoughtful fit,<br />from the <em>first stitch.</em></h2><p>Tell us the silhouette you have in mind, share your measurements and fabric preferences, and we’ll talk through your blouse, chudithar or gown before it’s made.</p><div className="tailoring-steps"><span><b>01</b> Choose your style</span><span><b>02</b> Share your fit</span><span><b>03</b> Made with care</span></div><a className="button button-dark" href={`https://wa.me/${adminWhatsapp.replace(/\D/g, '')}?text=${tailoringMessage}`} target="_blank" rel="noreferrer">Talk about tailoring <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="upcoming-section section-wrap" id="upcoming">
        <div className="section-heading"><div><span className="eyebrow">On the sewing table</span><h2>Coming <em>together.</em></h2></div></div>
        {productsQuery.isPending ? <div className="empty-state section-empty"><SectionMark type="upcoming" /><p>Loading the next pieces…</p></div> : upcomingProducts.length > 0 ? <div className="upcoming-grid">{upcomingProducts.map((product, index) => {
          const image = product.photo?.startsWith('http') ? product.photo : product.photo ? `${API_URL}/images/${encodeURIComponent(product.photo)}` : ''
          return <figure className="upcoming-item" key={product._id} style={{ '--item-index': index }} aria-label={`Upcoming ${product.name}${product.subcategory ? `, ${product.subcategory}` : ''}`} role="img">{product.videoUrl ? <video src={product.videoUrl} poster={image || undefined} autoPlay muted loop playsInline aria-hidden="true" /> : image ? <img src={image} alt={`${product.name}${product.subcategory ? `, ${product.subcategory}` : ''}, coming soon`} loading="lazy" /> : <div className="upcoming-image-placeholder"><SectionMark type="upcoming" label={`${product.name} placeholder`} /></div>}</figure>
        })}</div> : <div className="empty-state section-empty"><SectionMark type="upcoming" /><h3>New pieces are on the way.</h3></div>}
      </section>

      <details className="user-guide section-wrap">
        <summary><span><span className="eyebrow">New here?</span><strong>How it works</strong></span><span className="guide-toggle" aria-hidden="true">＋</span></summary>
        <ol><li>Choose Scrunchies or Dress. In Dress, filter by blouse, chudithar or gown.</li><li>Choose a piece, enter your delivery details and place the order.</li><li>Continue in WhatsApp to confirm the details with tuk tails.</li></ol>
        <p>For a custom fit, use “Talk about tailoring” to discuss your style and measurements.</p>
      </details>
      <FeedbackForm products={allProducts} />
      <footer className="site-footer"><div className="footer-brand"><a href="#home" className="wordmark"><img src="../images/logo.png" alt="tuk tails" height="100" width="250" /><span></span></a><p>For the days you want to feel a little more you.</p></div><nav className="social-links" aria-label="Social media"><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <span>↗</span></a><a href={`https://wa.me/${adminWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a></nav><a href="/admin">Admin portal ↗</a><span>© 2026 tuk tails</span></footer>
      {confirmation && <div className="toast-message" role="status">{confirmation}<button onClick={() => setConfirmation('')} aria-label="Dismiss">×</button></div>}
      {selectedProduct && <OrderDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} onOrderComplete={handleOrderComplete} />}
    </main>
  )
}