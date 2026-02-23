import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { placeOrderApi, verifyPaymentApi } from '../services/api'; // Import verifyPaymentApi
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle, ShieldCheck, Loader2, Tag, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart(); 
  const { settings, formatPrice, loading: settingsLoading } = useSettings();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Coupon Data
  const { discount = 0, couponCode = null } = location.state || {};

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // <--- Controls Mock Modal
  const [tempOrderId, setTempOrderId] = useState(null); // Stores Order ID while paying

  // Security Check
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  // Calculations
  const subTotal = Number(cartTotal) || 0;
  const taxAmount = (subTotal * (settings?.tax_rate || 0)) / 100;
  const deliveryFee = subTotal >= (settings?.free_delivery_threshold || 0) ? 0 : (settings?.delivery_fee || 0);
  const finalTotal = Math.max(0, subTotal + taxAmount + deliveryFee - discount);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    phone: user?.phone || '',
    address: '',
    city: 'Dubai',
    pincode: '',
    paymentMethod: 'cod' // Default
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- 1. HANDLE PLACE ORDER ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);
// ⭐ IMPORTANT: Cart items ko backend structure ke hisaab se map karein
    const formattedItems = cartItems.map(item => ({
        product_id: item.product_id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.final_price || item.price,
        total: (item.final_price || item.price) * item.quantity,
        // Custom juice ke liye configuration ko customization column me map karein
        customization: item.is_custom ? JSON.stringify(item.configuration) : null
    }));

    const orderPayload = {
        items: formattedItems,
        shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city, 
            pincode: formData.pincode || '00000'
        },
        paymentMethod: formData.paymentMethod, // 'cod' or 'card'
        subTotal,
        deliveryFee,
        discount_amount: discount,
        coupon_code: couponCode,
        finalTotal
    };

    const result = await placeOrderApi(orderPayload);

    if (result.success) {
        if (result.data.requiresPayment) {
            // --- ONLINE PAYMENT FLOW ---
            setTempOrderId(result.data.orderId); // Save ID
            setShowPaymentModal(true); // Open "Fake" Bank Page
            setIsPlacingOrder(false); // Stop loading on button
        } else {
            // --- COD FLOW ---
            finishOrder(result.data.orderId);
        }
    } else {
        toast.error(result.message || "Failed to place order");
        setIsPlacingOrder(false);
    }
  };

  // --- 2. FINISH ORDER (After COD or Successful Payment) ---
  const finishOrder = (orderId) => {
      toast.success("Order Placed Successfully! 🎉");
      clearCart();
      navigate(`/order-success/${orderId}`);
  };

  // --- 3. MOCK PAYMENT HANDLER (Called from Modal) ---
  const handleSimulatePayment = async () => {
      // Simulate API Call delay
      const toastId = toast.loading("Processing Payment...");
      
      // In real life, Razorpay/Stripe popup handles this.
      // Here, we call backend to "verify" (fake verify)
      const verifyRes = await verifyPaymentApi({
          orderId: tempOrderId,
          status: 'success', // Simulating success
          paymentId: 'TXN_' + Math.floor(Math.random() * 1000000) // Fake Trans ID
      });

      toast.dismiss(toastId);

      if (verifyRes.success) {
          setShowPaymentModal(false);
          finishOrder(tempOrderId);
      } else {
          toast.error("Payment Failed. Try again.");
      }
  };

  if (!user || settingsLoading) return null;
  if (cartItems.length === 0) return <div className="p-10 text-center">Your cart is empty</div>;

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-8 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Forms */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-green-700" /> Shipping Details
              </h2>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 {/* ... (Same Input Fields as before) ... */}
                 <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                    <select name="city" onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg">
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                    </select>
                 </div>
                 <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                    <textarea required name="address" rows="3" onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg"></textarea>
                 </div>
              </form>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-green-700" /> Payment Method
              </h2>
              <div className="space-y-3">
                {/* COD Option */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="accent-green-600 w-5 h-5" />
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 flex items-center gap-2">Cash on Delivery (COD) <Truck size={16} className="text-gray-400"/></span>
                  </div>
                </label>

                {/* Online Payment Option (ENABLED NOW) */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="accent-green-600 w-5 h-5" />
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 flex items-center gap-2">Credit / Debit Card <CreditCard size={16} className="text-blue-500"/></span>
                    <span className="text-xs text-gray-500">Secure payment via Mock Gateway</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="h-fit space-y-4 sticky top-24">
             {/* ... (Same Summary Logic) ... */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b">Order Summary</h3>
                {/* Cart Items List... (Use your existing map code) */}
                
                <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                    <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subTotal)}</span></div>
                    {/* ... (Tax, Delivery, Discount rows) ... */}
                    <div className="flex justify-between font-extrabold text-lg text-gray-900 pt-3 border-t mt-2">
                        <span>Total Amount</span><span>{formatPrice(finalTotal)}</span>
                    </div>
                </div>

                <button type="submit" form="checkout-form" disabled={isPlacingOrder} className="w-full mt-6 bg-[#eab308] hover:bg-yellow-500 text-[#064e3b] py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2">
                    {isPlacingOrder ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                    {isPlacingOrder ? "Processing..." : (formData.paymentMethod === 'card' ? "PAY NOW" : "CONFIRM ORDER")}
                </button>
             </div>
          </div>
      </div>

      {/* --- MOCK PAYMENT MODAL --- */}
      {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animation-fade-in">
                  <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
                      <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="text-green-400"/> Secure Payment Gateway</h3>
                      <button onClick={() => setShowPaymentModal(false)}><X size={20}/></button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                      <div className="text-center mb-4">
                          <p className="text-gray-500 text-sm">Merchant: Fruityfy Inc.</p>
                          <h2 className="text-3xl font-bold text-gray-800 mt-1">{formatPrice(finalTotal)}</h2>
                      </div>

                      {/* Fake Card Form */}
                      <div className="space-y-3">
                          <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" defaultValue="4242 4242 4242 4242" readOnly />
                          <div className="grid grid-cols-2 gap-3">
                              <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" defaultValue="12/30" readOnly />
                              <input type="text" placeholder="CVC" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" defaultValue="123" readOnly />
                          </div>
                      </div>

                      <button 
                          onClick={handleSimulatePayment} 
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg mt-2 transition-transform active:scale-95"
                      >
                          Pay {formatPrice(finalTotal)}
                      </button>
                      
                      <p className="text-xs text-center text-gray-400 mt-2">
                          This is a dummy payment for testing. No real money will be deducted.
                      </p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Checkout;