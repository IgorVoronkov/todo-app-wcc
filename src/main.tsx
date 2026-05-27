import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return

  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass', // незнакомые запросы пропускаем, не ругаемся
  })
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch((error: unknown) => {
    console.error('Failed to enable API mocking', error)
  })
