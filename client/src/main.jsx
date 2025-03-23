import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from './ScrollToTop.js'
import { useTranslation } from "react-i18next";
import "./i18n";
import LanguageSelector from './LanguageSelector'
import { useSelector } from "react-redux";
import { useEffect } from 'react'

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>     
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
