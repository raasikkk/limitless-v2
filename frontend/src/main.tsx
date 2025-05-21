import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import './i18n.ts'
import { Toaster } from "react-hot-toast"
import {HelmetProvider } from 'react-helmet-async';

import { PostHogProvider} from 'posthog-js/react';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

createRoot(document.getElementById('root')!).render(
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <HelmetProvider>
        <Provider store={store}>
          <App />
          <Toaster position='top-center'/>
        </Provider>
      </HelmetProvider>
    </PostHogProvider>
)
