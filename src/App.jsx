import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons'; // <--- IMPORT THIS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages Imports...
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetails from './pages/OrderDetails';
import CampaignPage from './pages/CampaignPage';
import WeeklyBoxLanding from './pages/WeeklyBoxLanding';
import OccasionLanding from './pages/OccasionLanding';
import BestSeller from './pages/BestSeller';
import JuiceBuilder from './pages/JuiceBuilder';
import CustomLab from './pages/CustomLab';
import OfferPage from './pages/OfferPage';

function App() {
  return (
    <SettingsProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900 relative">

            <Navbar />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/campaign/:slug" element={<CampaignPage />} />
                <Route path="/weeklyboxes/:slug" element={<WeeklyBoxLanding />} />
                <Route path="/occasions/:slug" element={<OccasionLanding />} />
                <Route path="/best-sellers" element={<BestSeller />} />
                <Route path="/juice-builder" element={<JuiceBuilder />} />
                <Route path="/juice-builder/:id" element={<JuiceBuilder />} />
                <Route path="/juice-builder/custom" element={<CustomLab />} />
                <Route path="/offers" element={<OfferPage />} />
              </Routes>
            </main>

            <Footer />

            {/* Add Floating Buttons & Toast */}
            <FloatingButtons />
            <ToastContainer position="bottom-right" autoClose={3000} />

          </div>
        </Router>
      </CartProvider>
    </SettingsProvider>
  );
}

export default App;