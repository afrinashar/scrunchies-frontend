import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ErrorState, LoadingState } from './components/AsyncState'
import { VisitingCard } from './components/VisitingCard'

const API_URL = import.meta.env.VITE_API_URL || 'https://scrunchies-backend-api.vercel.app'
const orderStates = ['new', 'confirmed', 'shipped', 'complete', 'cancelled']
const dressTypes = ['Blouse', 'Chudithar', 'Gown']
const feedbackTitles = { app: 'App feedback', product: 'Product feedback', 'new-product': 'New product idea' }

function ProductEditor({ product, pending, error, onCancel, onSave }) {
  const [fields, setFields] = useState({ name: '', description: '', category: 'Scrunchies', subcategory: '', price: '', videoUrl: '', isFeatured: false, isUpcoming: false })
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    setFields(product ? {
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Scrunchies',
      subcategory: product.subcategory || 'Blouse',
      price: product.price ?? '',
      videoUrl: product.videoUrl || '',
      isFeatured: product.isFeatured || false,
      isUpcoming: product.isUpcoming || false,
    } : { name: '', description: '', category: 'Scrunchies', subcategory: '', price: '', videoUrl: '', isFeatured: false, isUpcoming: false })
    setPhoto(null)
  }, [product])

  function submit(event) {
    event.preventDefault()
    onSave({ ...fields, photo })
  }

  return (
    <form className="product-editor" onSubmit={submit}>
      <div className="product-editor-heading"><div><span className="state-eyebrow">{product ? 'Make it just right' : 'Add a new piece'}</span><h2>{product ? 'Edit product' : 'New product'}</h2></div><button type="button" className="dialog-close" onClick={onCancel} aria-label="Close product editor">×</button></div>
      <label>Product name<input value={fields.name} maxLength={100} onChange={(event) => setFields({ ...fields, name: event.target.value })} required /></label>
      <div className="editor-field-row">
        <label>Collection<select value={fields.category} onChange={(event) => setFields({ ...fields, category: event.target.value, subcategory: event.target.value === 'Dress' ? 'Blouse' : '' })}><option>Scrunchies</option><option>Dress</option></select></label>
        {fields.category === 'Dress' && <label>Dress type<select value={fields.subcategory} onChange={(event) => setFields({ ...fields, subcategory: event.target.value })}>{dressTypes.map((type) => <option key={type}>{type}</option>)}</select></label>}
        <label>Price (INR)<input type="number" min="0" max="10000000" step="0.01" value={fields.price} onChange={(event) => setFields({ ...fields, price: event.target.value })} required /></label>
      </div>
      <label>Description<textarea rows={3} maxLength={1000} value={fields.description} onChange={(event) => setFields({ ...fields, description: event.target.value })} /></label>
      <label>Product photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />{product?.photo && <span className="field-hint">Leave empty to keep the current photo.</span>}</label>
      <label>Optional video URL<input type="url" maxLength={500} placeholder="https://…/preview.mp4" value={fields.videoUrl} onChange={(event) => setFields({ ...fields, videoUrl: event.target.value })} /><span className="field-hint">Direct HTTPS MP4, WebM or Ogg link. Leave blank to use the photo.</span></label>
      <div className="product-flags">
        <label><input type="checkbox" checked={fields.isFeatured} onChange={(event) => setFields({ ...fields, isFeatured: event.target.checked, isUpcoming: event.target.checked ? false : fields.isUpcoming })} /> Show in Most wanted</label>
        <label><input type="checkbox" checked={fields.isUpcoming} onChange={(event) => setFields({ ...fields, isUpcoming: event.target.checked, isFeatured: event.target.checked ? false : fields.isFeatured })} /> Show in Upcoming</label>
      </div>
      {error && <p className="admin-error" role="alert">{error.response?.data?.message || 'Could not save the product. Please try again.'}</p>}
      <div className="editor-actions"><button type="button" className="button button-light" onClick={onCancel}>Cancel</button><button className="button button-dark" disabled={pending}>{pending ? 'Saving…' : product ? 'Save changes' : 'Add product'}</button></div>
    </form>
  )
}

export function Admin() {
  const [accessKey, setAccessKey] = useState(() => sessionStorage.getItem('tuk-tails-admin-key') || '')
  const [keyInput, setKeyInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('orders')
  const [editingProduct, setEditingProduct] = useState(undefined)
  const queryClient = useQueryClient()
  const ordersQuery = useQuery({
    queryKey: ['admin-orders'],
    enabled: Boolean(accessKey),
    queryFn: async () => (await axios.get(`${API_URL}/admin/orders`, { headers: { 'x-admin-key': accessKey }, timeout: 10000 })).data,
    retry: false,
    refetchInterval: 30000,
  })
  const productsQuery = useQuery({
    queryKey: ['admin-products'],
    enabled: Boolean(accessKey) && activeTab === 'products',
    queryFn: async () => (await axios.get(`${API_URL}/items`, { headers: { 'x-admin-key': accessKey }, timeout: 10000 })).data,
    retry: false,
    refetchInterval: 30000,
  })
  const feedbackQuery = useQuery({
    queryKey: ['admin-feedback'],
    enabled: Boolean(accessKey) && activeTab === 'feedback',
    queryFn: async () => (await axios.get(`${API_URL}/admin/feedback`, { headers: { 'x-admin-key': accessKey }, timeout: 10000 })).data,
    retry: false,
    refetchInterval: 30000,
  })
  const statusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => axios.patch(`${API_URL}/admin/orders/${orderId}`, { status }, { headers: { 'x-admin-key': accessKey } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  })
  const saveProductMutation = useMutation({
    mutationFn: async ({ productId, fields }) => {
      const body = new FormData()
      body.append('name', fields.name.trim())
      body.append('description', fields.description.trim())
      body.append('category', fields.category)
      if (fields.category === 'Dress') body.append('subcategory', fields.subcategory)
      body.append('price', fields.price)
      body.append('videoUrl', fields.videoUrl.trim())
      body.append('isFeatured', String(fields.isFeatured))
      body.append('isUpcoming', String(fields.isUpcoming))
      if (fields.photo) body.append('photo', fields.photo)
      const config = { headers: { 'x-admin-key': accessKey }, timeout: 20000 }
      const url = productId ? `${API_URL}/items/${productId}` : `${API_URL}/items`
      return productId ? axios.patch(url, body, config) : axios.post(url, body, config)
    },
    onSuccess: () => {
      setEditingProduct(undefined)
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
  const deleteProductMutation = useMutation({
    mutationFn: async (product) => axios.delete(`${API_URL}/items/${product._id}`, { headers: { 'x-admin-key': accessKey }, timeout: 10000 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  async function signIn(event) {
    event.preventDefault()
    setLoginError('')
    try {
      await axios.get(`${API_URL}/admin/access`, { headers: { 'x-admin-key': keyInput }, timeout: 10000 })
      sessionStorage.setItem('tuk-tails-admin-key', keyInput)
      setAccessKey(keyInput)
      setKeyInput('')
    } catch (error) {
      setLoginError(error.response?.status === 401
        ? 'That access key is incorrect.'
        : error.response?.data?.message || 'Could not reach the admin service. Make sure the backend is running, then try again.')
    }
  }

  function signOut() {
    sessionStorage.removeItem('tuk-tails-admin-key')
    setAccessKey('')
    setEditingProduct(undefined)
    queryClient.removeQueries({ queryKey: ['admin-orders'] })
    queryClient.removeQueries({ queryKey: ['admin-products'] })
  }

  function deleteProduct(product) {
    if (window.confirm(`Delete “${product.name}” from the storefront? This cannot be undone.`)) {
      deleteProductMutation.mutate(product)
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar"><a href="/" className="wordmark"><img src="../images/logo.png" alt="tuk tails" height="100" width="250" /><span></span></a><span>SHOP MANAGEMENT</span><a href="/" className="text-link">View storefront <span>↗</span></a></header>
      <section className="admin-content">
        <div className="admin-heading"><div><span className="eyebrow">Your little control room</span><h1>Order desk</h1><a className="button button-light" href="/">Dashboard</a></div>{accessKey && <button className="button button-dark" onClick={signOut}>Sign out</button>}</div>
        {!accessKey && <form className="admin-login" onSubmit={signIn}>
          <span className="state-eyebrow">Admin access</span>
          <label>Access key<input type="password" autoComplete="current-password" value={keyInput} onChange={(event) => setKeyInput(event.target.value)} required /></label>
          {loginError && <p className="admin-error" role="alert">{loginError}</p>}
          <button className="button button-dark" disabled={!keyInput}>Open order desk <span>→</span></button>
        </form>}
        {accessKey && <nav className="admin-tabs" aria-label="Admin sections" role="tablist">
          <button className={activeTab === 'orders' ? 'admin-tab active' : 'admin-tab'} role="tab" aria-selected={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Orders</button>
          <button className={activeTab === 'products' ? 'admin-tab active' : 'admin-tab'} role="tab" aria-selected={activeTab === 'products'} onClick={() => setActiveTab('products')}>Products</button>
          <button className={activeTab === 'feedback' ? 'admin-tab active' : 'admin-tab'} role="tab" aria-selected={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')}>Feedback</button>
          <button className={activeTab === 'card' ? 'admin-tab active' : 'admin-tab'} role="tab" aria-selected={activeTab === 'card'} onClick={() => setActiveTab('card')}>Visiting card</button>
        </nav>}
        {accessKey && activeTab === 'orders' && ordersQuery.isPending && <LoadingState label="Loading recent orders" />}
        {accessKey && activeTab === 'orders' && ordersQuery.isError && <ErrorState error={ordersQuery.error} onRetry={() => ordersQuery.refetch()} />}
        {accessKey && activeTab === 'orders' && ordersQuery.isSuccess && <>
          <div className="admin-heading"><p>{ordersQuery.data.length} {ordersQuery.data.length === 1 ? 'order' : 'orders'} received</p><p>Newest orders first</p></div>
          {ordersQuery.data.length === 0 ? <div className="empty-state"><h3>No orders yet.</h3><p>New customer orders will appear here.</p></div> : <div className="admin-order-list">
            {ordersQuery.data.map((order) => <article className="admin-order" key={order._id}>
              <div><strong>{order.customerName}</strong><p>{new Date(order.createdAt).toLocaleString()}</p><p>{order.phone}</p></div>
              <div><strong>{order.items.map((item) => `${item.name}${item.subcategory ? ` · ${item.subcategory}` : ''} × ${item.quantity}`).join(', ')}</strong><p>{order.address}</p></div>
              <div><strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(order.total)}</strong><p className="order-status">{order.status}</p></div>
              <label className="admin-status-label">Update status<select value={order.status} onChange={(event) => statusMutation.mutate({ orderId: order._id, status: event.target.value })} disabled={statusMutation.isPending}>
                {orderStates.map((status) => <option key={status} value={status}>{status}</option>)}
              </select></label>
            </article>)}
          </div>}
        </>}
        {accessKey && activeTab === 'products' && <div className="products-panel">
          <div className="products-panel-heading"><div><span className="eyebrow">Your current collection</span><h2>Products</h2></div><button className="button button-dark" onClick={() => { saveProductMutation.reset(); setEditingProduct(null) }}>＋ Add product</button></div>
          {productsQuery.isPending && <LoadingState label="Loading products" />}
          {productsQuery.isError && <ErrorState error={productsQuery.error} onRetry={() => productsQuery.refetch()} />}
          {deleteProductMutation.isError && <p className="admin-error" role="alert">{deleteProductMutation.error.response?.data?.message || 'Could not delete product.'}</p>}
          {productsQuery.isSuccess && productsQuery.data.length === 0 && <div className="empty-state"><h3>Your collection is ready for its first piece.</h3><p>Add scrunchies or a tailored dress to start the shop.</p></div>}
          {productsQuery.isSuccess && productsQuery.data.length > 0 && <div className="admin-product-list">
            {productsQuery.data.map((product) => <article className="admin-product" key={product._id}>
              <div className="admin-product-photo">{product.photo && <img src={product.photo.startsWith('http') ? product.photo : `${API_URL}/images/${encodeURIComponent(product.photo)}`} alt="" />}</div>
              <div className="admin-product-details"><span className="product-category">{product.category}{product.subcategory ? ` / ${product.subcategory}` : ''}{product.isFeatured ? ' · MOST WANTED' : ''}{product.isUpcoming ? ' · UPCOMING' : ''}</span><h3>{product.name}</h3><p>{product.description || 'No description'}</p></div>
              <strong className="admin-product-price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}</strong>
              <div className="admin-product-actions"><button className="button button-light" onClick={() => { saveProductMutation.reset(); setEditingProduct(product) }}>Edit</button><button className="button button-danger" disabled={deleteProductMutation.isPending} onClick={() => deleteProduct(product)}>Delete</button></div>
            </article>)}
          </div>}
        </div>}
        {accessKey && activeTab === 'feedback' && <div className="feedback-inbox">
          <div className="products-panel-heading"><div><span className="eyebrow">Notes from the community</span><h2>Feedback</h2></div><p>Latest 100 submissions</p></div>
          {feedbackQuery.isPending && <LoadingState label="Loading feedback" />}
          {feedbackQuery.isError && <ErrorState error={feedbackQuery.error} onRetry={() => feedbackQuery.refetch()} />}
          {feedbackQuery.isSuccess && feedbackQuery.data.length === 0 && <div className="empty-state"><h3>No feedback yet.</h3><p>Customer notes will appear here.</p></div>}
          {feedbackQuery.isSuccess && feedbackQuery.data.length > 0 && <div className="admin-feedback-list">{feedbackQuery.data.map((feedback) => <article className="admin-feedback" key={feedback._id}>
            <div className="admin-feedback-meta"><span className="product-category">{feedbackTitles[feedback.type] || feedback.type}</span><strong>{feedback.name || 'Guest'}</strong><span>{new Date(feedback.createdAt).toLocaleString()}</span></div>
            {feedback.productName && <p className="feedback-product">About {feedback.productName}</p>}
            <p className="feedback-message">{feedback.message}</p>
          </article>)}</div>}
        </div>}
        {accessKey && activeTab === 'card' && <VisitingCard />}
        {accessKey && editingProduct !== undefined && <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingProduct(undefined)}>
          <ProductEditor product={editingProduct || null} pending={saveProductMutation.isPending} error={saveProductMutation.error} onCancel={() => setEditingProduct(undefined)} onSave={(fields) => saveProductMutation.mutate({ productId: editingProduct?._id, fields })} />
        </div>}
      </section>
    </main>
  )
}
