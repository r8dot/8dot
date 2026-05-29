import { Component, type ReactNode } from 'react'
import Scene from './components/Scene'

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  state = { error: null }
  static getDerivedStateFromError(e: Error) {
    return { error: e.message }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          color: 'white',
          padding: 40,
          background: '#1a1a2e',
          fontSize: 16
        }}>
          <h2>Error loading scene:</h2>
          <p>{this.state.error}</p>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Scene />
    </ErrorBoundary>
  )
}

export default App
