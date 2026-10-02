import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="fatal-error" role="alert">
          <span className="wordmark">tuk tails</span>
          <h1>That page needs a fresh start.</h1>
          <p>Something unexpected happened. Reload the page to try again.</p>
          <button className="button button-dark" onClick={() => window.location.reload()}>Reload page</button>
        </main>
      )
    }

    return this.props.children
  }
}