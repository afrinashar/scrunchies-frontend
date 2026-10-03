import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { SectionMark } from './SectionMark'

const API_URL = import.meta.env.VITE_API_URL || 'https://scrunchies-backend-api.vercel.app'
const feedbackOptions = [
  { id: 'app', label: 'App feedback', detail: 'Tell us about your tuk tails experience.' },
  { id: 'product', label: 'Product feedback', detail: 'Share a thought about something you bought.' },
  { id: 'new-product', label: 'New product idea', detail: 'What would you love us to make next?' },
]

export function FeedbackForm({ products }) {
  const [type, setType] = useState('app')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [productId, setProductId] = useState('')
  const [sent, setSent] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const feedbackMutation = useMutation({
    mutationFn: async () => (await axios.post(`${API_URL}/feedback`, {
      type,
      name: name.trim(),
      message: message.trim(),
      ...(type === 'product' ? { productId } : {}),
    }, { timeout: 10000 })).data,
    onSuccess: () => {
      setMessage('')
      setSent(true)
      feedbackMutation.reset()
    },
  })

  function submit(event) {
    event.preventDefault()
    setSent(false)
    feedbackMutation.mutate()
  }

  return (
    <section className={isOpen ? 'feedback-section feedback-open' : 'feedback-shell'} id="feedback">
      {!isOpen ? <div className="feedback-invite"><SectionMark type="feedback" /><div><span className="eyebrow">From your sewing room to ours</span><p>Have a thought to share?</p></div><button className="feedback-open-button" onClick={() => setIsOpen(true)} aria-expanded="false">Leave a note <span aria-hidden="true">↗</span></button></div> : <div className="feedback-panel">
        <div className="feedback-panel-top"><div className="feedback-heading"><span className="eyebrow">A note from you</span><h2>Help us make<br /><em>lovely things.</em></h2><p>We read every note. Tell us what you think, or what you wish existed.</p></div><button type="button" className="feedback-close" onClick={() => setIsOpen(false)} aria-label="Close feedback">×</button></div>
        <div className="feedback-content">
          <div className="feedback-options" role="group" aria-label="Choose feedback type">
            {feedbackOptions.map((option) => <button key={option.id} type="button" className={type === option.id ? 'feedback-option active' : 'feedback-option'} aria-pressed={type === option.id} onClick={() => { setType(option.id); setSent(false); feedbackMutation.reset() }}>
              <span>{option.label}</span><small>{option.detail}</small><b aria-hidden="true">↗</b>
            </button>)}
          </div>
          <form className="feedback-form" onSubmit={submit}>
            {type === 'product' && <label>Which product?<select value={productId} onChange={(event) => setProductId(event.target.value)} required>
              <option value="">Choose a product</option>
              {products.map((product) => <option value={product._id} key={product._id}>{product.name}{product.subcategory ? ` · ${product.subcategory}` : ''}</option>)}
            </select></label>}
            <label>Your name <span>(optional)</span><input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} autoComplete="name" /></label>
            <label>Your note<textarea value={message} onChange={(event) => setMessage(event.target.value)} minLength={5} maxLength={1000} rows={4} placeholder={type === 'new-product' ? 'A colour, a style, a little daydream…' : 'Tell us what is on your mind…'} required /></label>
            {feedbackMutation.isError && <p className="form-error" role="alert">{feedbackMutation.error.response?.data?.message || 'Your note could not be sent. Please try again.'}</p>}
            {sent && <p className="feedback-success" role="status">Thank you. Your note is with us.</p>}
            <div className="feedback-submit-row"><span>{message.length}/1000</span><button className="button button-dark" disabled={feedbackMutation.isPending || (type === 'product' && !productId)}>{feedbackMutation.isPending ? 'Sending…' : 'Send your note'} <span aria-hidden="true">↗</span></button></div>
          </form>
        </div>
      </div>}
    </section>
  )
}
