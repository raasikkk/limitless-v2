import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import './i18n.ts'
import { Toaster } from "react-hot-toast"
import {HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
      <Provider store={store}>
        <App />
        <Toaster position='top-center'/>
      </Provider>
    </HelmetProvider>
)
