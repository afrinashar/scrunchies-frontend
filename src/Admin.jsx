import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { ErrorState, LoadingState } from './components/AsyncState'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const orderStates = ['new', 'confirmed', 'shipped', 'complete', 'cancelled']

export function Admin() {
  const [accessKey, setAccessKey] = useState(() => sessionStorage.getItem('tuk-tails-admin-key') || '')
  const [keyInput, setKeyInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const queryClient = useQueryClient()
  const ordersQuery = useQuery({
    queryKey: ['admin-orders'],
    enabled: Boolean(accessKey),
    queryFn: async () => (await axios.get(`${API_URL}/admin/orders`, { headers: { 'x-admin-key': accessKey }, timeout: 10000 })).data,
    retry: false,
    refetchInterval: 30000,
  })
  const statusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => axios.patch(`${API_URL}/admin/orders/${orderId}`, { status }, { headers: { 'x-admin-key': accessKey } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  })

  async function signIn(event) {
    event.preventDefault()
    setLoginError('')
    try {
      await axios.get(`${API_URL}/admin/orders`, { headers: { 'x-admin-key': keyInput }, timeout: 10000 })
      sessionStorage.setItem('tuk-tails-admin-key', keyInput)
      setAccessKey(keyInput)
      setKeyInput('')
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Could not verify that admin key. Check it and try again.')
    }
  }

  function signOut() {
    sessionStorage.removeItem('tuk-tails-admin-key')
    setAccessKey('')
    queryClient.removeQueries({ queryKey: ['admin-orders'] })
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar"><a href="/" className="wordmark">tuk tails<span>®</span></a><span>SHOP MANAGEMENT</span><a href="/" className="text-link">View storefront <span>↗</span></a></header>
      <section className="admin-content">
        <div className="admin-heading"><div><span className="eyebrow">Your little control room</span><h1>Order desk</h1></div>{accessKey && <button className="button button-dark" onClick={signOut}>Sign out</button>}</div>
        {!accessKey && <form className="admin-login" onSubmit={signIn}>
          <span className="state-eyebrow">Admin access</span>
          <label>Access key<input type="password" autoComplete="current-password" value={keyInput} onChange={(event) => setKeyInput(event.target.value)} required /></label>
          {loginError && <p className="admin-error" role="alert">{loginError}</p>}
          <button className="button button-dark" disabled={!keyInput}>Open order desk <span>→</span></button>
        </form>}
        {accessKey && ordersQuery.isPending && <LoadingState label="Loading recent orders" />}
        {accessKey && ordersQuery.isError && <ErrorState error={ordersQuery.error} onRetry={() => ordersQuery.refetch()} />}
        {accessKey && ordersQuery.isSuccess && <>
          <div className="admin-heading"><p>{ordersQuery.data.length} {ordersQuery.data.length === 1 ? 'order' : 'orders'} received</p><p>Newest orders first</p></div>
          {ordersQuery.data.length === 0 ? <div className="empty-state"><h3>No orders yet.</h3><p>New customer orders will appear here.</p></div> : <div className="admin-order-list">
            {ordersQuery.data.map((order) => <article className="admin-order" key={order._id}>
              <div><strong>{order.customerName}</strong><p>{new Date(order.createdAt).toLocaleString()}</p><p>{order.phone}</p></div>
              <div><strong>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')}</strong><p>{order.address}</p></div>
              <div><strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(order.total)}</strong><p className="order-status">{order.status}</p></div>
              <label className="admin-status-label">Update status<select value={order.status} onChange={(event) => statusMutation.mutate({ orderId: order._id, status: event.target.value })} disabled={statusMutation.isPending}>
                {orderStates.map((status) => <option key={status} value={status}>{status}</option>)}
              </select></label>
            </article>)}
          </div>}
        </>}
      </section>
    </main>
  )
}
