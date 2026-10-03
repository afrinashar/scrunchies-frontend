import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Admin } from './Admin'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SectionMark } from './components/SectionMark'
import { Dashboard } from './pages/Dashboard'

function NotFound() {
  return (
    <main className="fatal-error not-found-page">
      <SectionMark type="not-found" label="404 page illustration" />
      <span className="eyebrow">Wrong turn</span>
      <h1>That page isn&apos;t here.</h1>
      <p>Let&apos;s get you back to the sewing table.</p>
      <a className="button button-dark" href="/">Back to tuk tails</a>
    </main>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
    mutations: { retry: 0 },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
