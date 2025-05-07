import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

//Cấu hình Redux-Persit
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import App from './App.jsx'
import theme from './theme.js'
import { store } from '~/redux/store'

// Cấu hình Redux-Persit
const persistor = persistStore(store)

// Kỹ thuật Inject Store
import { injectStore } from '~/utils/authorizedAxios'

injectStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer theme='colored' />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
