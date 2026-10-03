import { SectionMark } from './SectionMark'

export function LoadingState({ label = 'Loading your collection', mark = 'loading' }) {
  return (
    <div className="async-state" role="status" aria-live="polite">
      <SectionMark type={mark} />
      <p>{label}</p>
    </div>
  )
}

export function ErrorState({ error, onRetry, mark = 'error' }) {
  return (
    <section className="async-state error-state" role="alert">
      <SectionMark type={mark} />
      <span className="state-eyebrow">A little pause</span>
      <h2>We couldn&apos;t load this just now.</h2>
      <p>{error?.response?.data?.message || error?.message || 'Please check your connection and try again.'}</p>
      {onRetry && <button className="button button-dark" onClick={onRetry}>Try again</button>}
    </section>
  )
}