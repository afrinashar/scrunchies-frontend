export function LoadingState({ label = 'Loading your collection' }) {
  return (
    <div className="async-state" role="status" aria-live="polite">
      <span className="loading-mark" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export function ErrorState({ error, onRetry }) {
  return (
    <section className="async-state error-state" role="alert">
      <span className="state-eyebrow">A little pause</span>
      <h2>We couldn&apos;t load this just now.</h2>
      <p>{error?.response?.data?.message || error?.message || 'Please check your connection and try again.'}</p>
      {onRetry && <button className="button button-dark" onClick={onRetry}>Try again</button>}
    </section>
  )
}