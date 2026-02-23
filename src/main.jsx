import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

// Contexts Import
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* SettingsProvider ko sabse upar rakhein taaki 
       Currency/SiteName poori app (Auth/Cart sahit) mein available ho 
    */}
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