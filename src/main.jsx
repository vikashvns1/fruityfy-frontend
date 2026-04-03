import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import './i18n';
// Contexts Import
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider> 
      <AuthProvider>
        <CartProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <App />
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  </React.StrictMode>,
);