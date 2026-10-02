import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { ErrorState, LoadingState } from '../components/AsyncState'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const categories = ['Scrunchies', 'Dress']
const fallbackImages = {
  Scrunchies: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85',
  Dress: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',
}

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
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [confirmation, setConfirmation] = useState('')
  const queryClient = useQueryClient()
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await axios.get(`${API_URL}/items`, { timeout: 10000 })).data,
  })
  const products = Array.isArray(productsQuery.data)
    ? productsQuery.data.filter((product) => product.category?.toLowerCase() === activeCategory.toLowerCase())
    : []

  function handleOrderComplete(order, customer) {
    queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
    setSelectedProduct(null)
    setConfirmation(`Order ${String(order._id || order.id || '').slice(-6)} is in. We’ll be in touch shortly.`)
    const phone = import.meta.env.VITE_ADMIN_WHATSAPP
    if (phone) {
      const product = selectedProduct
      const message = `Hi tuk tails! I just placed an order.\nOrder: ${order._id || order.id}\nItem: ${product.name} × ${customer.quantity}\nName: ${customer.customerName}\nPhone: ${customer.phone}\nAddress: ${customer.address}`
      window.location.assign(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`)
    }
  }

  return (
    <main className="storefront">
      <div className="announcement">Small details. Big feeling. Complimentary delivery on orders over ₹1,499.</div>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="tuk tails home">tuk tails<span>®</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#collection">Shop all</a><a href="#story">Our little world</a>
        </nav>
        <a className="admin-link" href="/admin">Admin <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">A softer kind of statement</span>
          <h1>Little things.<br /><em>Lovely</em> days.</h1>
          <p>Thoughtful accessories and easy-to-love dresses, made for wherever the day takes you.</p>
          <a className="button button-dark" href="#collection">Find your favourite <span aria-hidden="true">↓</span></a>
          <div className="hero-note"><span className="note-star">✳</span><span>Made for the<br />everyday extraordinary</span></div>
        </div>
        <div className="hero-image" role="img" aria-label="Softly styled summer outfit in warm natural light">
          <div className="image-caption"><span>THE EVERYDAY EDIT</span><span>01 / 02</span></div>
        </div>
        <div className="hero-side-note">A LITTLE JOY, WORN OFTEN</div>
      </section>

      <section className="collection section-wrap" id="collection">
        <div className="section-heading">
          <div><span className="eyebrow">The good things</span><h2>Meet your new <em>favourites.</em></h2></div>
          <p>Considered pieces for the little rituals<br />that make a day feel like yours.</p>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Shop by collection">
          {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}<span>↗</span></button>)}
        </div>
        {productsQuery.isPending && <LoadingState />}
        {productsQuery.isError && <ErrorState error={productsQuery.error} onRetry={() => productsQuery.refetch()} />}
        {productsQuery.isSuccess && products.length === 0 && (
          <div className="empty-state"><span className="state-eyebrow">A fresh drop is on its way</span><h3>Nothing here just yet.</h3><p>Try the other collection, or check back soon.</p></div>
        )}
        {products.length > 0 && <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-item" key={product._id} style={{ '--item-index': index }}>
              <div className="product-photo">
                <img src={product.photo?.startsWith('http') ? product.photo : product.photo ? `${API_URL}/images/${encodeURIComponent(product.photo)}` : fallbackImages[activeCategory]} alt={product.name} loading="lazy" />
                <span className="product-tag">{activeCategory === 'Dress' ? 'EASY DOES IT' : 'A LITTLE EXTRA'}</span>
                <button className="quick-order" onClick={() => { setSelectedProduct(product); setConfirmation('') }} aria-label={`Order ${product.name}`}>＋</button>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.description || 'Made to feel like you.'}</p></div><span>{money(product.price)}</span></div>
            </article>
          ))}
        </div>}
      </section>

      <section className="story-band" id="story">
        <div className="story-photo" role="img" aria-label="Textured fabric and carefully chosen accessories" />
        <div className="story-copy"><span className="eyebrow">The tuk tails feeling</span><h2>More than what<br />you <em>wear.</em></h2><p>We believe the smallest details can change the whole mood. Each tuk tails piece is picked to bring a little more colour, comfort and character to your everyday.</p><a href="#collection" className="text-link">See what speaks to you <span>↗</span></a></div>
        <span className="story-mark">tt</span>
      </section>

      <footer className="site-footer"><a href="#home" className="wordmark">tuk tails<span>®</span></a><p>For the days you want to feel a little more you.</p><a href="/admin">Admin portal ↗</a><span>© 2026 tuk tails</span></footer>
      {confirmation && <div className="toast-message" role="status">{confirmation}<button onClick={() => setConfirmation('')} aria-label="Dismiss">×</button></div>}
      {selectedProduct && <OrderDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} onOrderComplete={handleOrderComplete} />}
    </main>
  )
}