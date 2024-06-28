import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {Providers} from "@/providers";
import App from "@/App.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const {worker} = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers>
          <App/>
        </Providers>

    </React.StrictMode>,
  )
})


