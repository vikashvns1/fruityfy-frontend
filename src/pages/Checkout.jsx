import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
// Added fetchGreetings logic in API calls
import { placeOrderApi, verifyPaymentApi, getUserAddressesApi, fetchGreetings } from '../services/api'; 
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle, ShieldCheck, Loader2, Tag, X, Gift } from 'lucide-react';
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [tempOrderId, setTempOrderId] = useState(null);

  // ⭐ State for Greeting Messages
  const [predefinedMessages, setPredefinedMessages] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    phone: user?.phone || '',
    address: '',
    city: 'Dubai',
    pincode: '',
    paymentMethod: 'cod',
    isGift: false,
    giftMessage: '',
    senderName: ''
  });

  // Security Check, Address Prefill & Load Greetings
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    const loadData = async () => {
      try {
        // 1. Fetch Saved Address
        const res = await getUserAddressesApi();
        if (res.success && res.data.length > 0) {
          const addr = res.data.find(a => a.is_default === 1) || res.data[0];
          setFormData(prev => ({
            ...prev,
            address: `${addr.building_villa || ''} ${addr.street || ''} ${addr.area || ''}`.trim(),
            city: addr.emirate || 'Dubai',
            pincode: addr.pincode || ''
          }));
        }

        // 2. ⭐ Fetch Greeting Messages
        const greetRes = await fetchGreetings();
        if (greetRes.success) {
          setPredefinedMessages(greetRes.data);
        }
      } catch (error) {
        console.error("Error loading checkout data:", error);
      }
    };

    loadData();
  }, [user, navigate]);

  // Calculations
  const subTotal = Number(cartTotal) || 0;
  const taxAmount = (subTotal * (settings?.tax_rate || 0)) / 100;
  const deliveryFee = subTotal >= (settings?.free_delivery_threshold || 0) ? 0 : (settings?.delivery_fee || 0);
  const finalTotal = Math.max(0, subTotal + taxAmount + deliveryFee - discount);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // --- 1. HANDLE PLACE ORDER ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const formattedItems = cartItems.map(item => ({
      product_id: item.weekly_box_id ? null : (item.product_id || item.id),
      weekly_box_id: item.weekly_box_id || null,
      product_name: item.name,
      quantity: item.quantity,
      price: Number(item.final_price || item.price),
      total: Number((item.final_price || item.price) * item.quantity),
      customization: item.configuration ? JSON.stringify(item.configuration) : (item.customization || null)
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
      paymentMethod: formData.paymentMethod,
      subTotal: Number(subTotal),
      deliveryFee: Number(deliveryFee),
      discount_amount: Number(discount),
      coupon_code: couponCode,
      finalTotal: Number(finalTotal),
      // ⭐ Gift Data for Backend
      is_gift: formData.isGift ? 1 : 0,
      gift_message: formData.isGift ? formData.giftMessage : null,
      sender_name: formData.isGift ? formData.senderName : null
    };

    try {
      const result = await placeOrderApi(orderPayload);
      if (result.success) {
        if (result.data.requiresPayment) {
          setTempOrderId(result.data.orderId);
          setShowPaymentModal(true);
          setIsPlacingOrder(false);
        } else {
          finishOrder(result.data.orderId);
        }
      } else {
        toast.error(result.message || "Failed to place order");
        setIsPlacingOrder(false);
      }
    } catch (error) {
      console.error("Order Placement Failed:", error);
      toast.error("An error occurred. Please check your connection.");
      setIsPlacingOrder(false);
    }
  };

  // --- 2. FINISH ORDER ---
  const finishOrder = (orderId) => {
    toast.success("Order Placed Successfully! 🎉");
    clearCart();
    navigate(`/order-success/${orderId}`);
  };

  // --- 3. MOCK PAYMENT HANDLER ---
  const handleSimulatePayment = async () => {
    const toastId = toast.loading("Processing Payment...");
    const verifyRes = await verifyPaymentApi({
      orderId: tempOrderId,
      status: 'success',
      paymentId: 'TXN_' + Math.floor(Math.random() * 1000000)
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
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">City / Emirate</label>
                <select name="city" value={formData.city} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg">
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Address (Building, Villa, Street)</label>
                <textarea required name="address" rows="3" value={formData.address} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg"></textarea>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Pincode / Zip (Optional)</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg" placeholder="00000" />
              </div>
            </form>
          </div>

          {/* ⭐ GREETING SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isGift" checked={formData.isGift} onChange={handleChange} className="w-5 h-5 accent-green-600" />
              <span className="font-bold text-gray-800 flex items-center gap-2">
                <Gift className="text-green-600" size={20} /> Sending as a Gift?
              </span>
            </label>

            {formData.isGift && (
              <div className="mt-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select a Message</label>
                    <select 
                      className="w-full mt-1 p-3 bg-gray-50 border rounded-xl text-sm"
                      onChange={(e) => setFormData({...formData, giftMessage: e.target.value})}
                    >
                      <option value="">-- Choose Predefined --</option>
                      {predefinedMessages.map(msg => (
                        <option key={msg.id} value={msg.message_text}>
                          [{msg.category}] {msg.message_text.substring(0, 30)}...
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">From (Sender Name)</label>
                    <input type="text" name="senderName" placeholder="Your Name" value={formData.senderName} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border rounded-xl text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Personal Note (Optional)</label>
                  <textarea name="giftMessage" rows="3" placeholder="Write your own message here..." value={formData.giftMessage} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border rounded-xl text-sm"></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <CreditCard size={18} className="text-green-700" /> Payment Method
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="accent-green-600 w-5 h-5" />
                <div className="flex-1">
                  <span className="font-bold text-gray-900 flex items-center gap-2">Cash on Delivery (COD) <Truck size={16} className="text-gray-400" /></span>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="accent-green-600 w-5 h-5" />
                <div className="flex-1">
                  <span className="font-bold text-gray-900 flex items-center gap-2">Credit / Debit Card <CreditCard size={16} className="text-blue-500" /></span>
                  <span className="text-xs text-gray-500">Secure payment via Mock Gateway</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="h-fit space-y-4 sticky top-24">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b">Order Summary</h3>

            <div className="max-h-60 overflow-y-auto mb-4 space-y-3 pr-2">
              {cartItems.map((item, idx) => (
                <div key={idx} className="border-b border-gray-50 pb-2 last:border-0">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">{item.name} x {item.quantity}</span>
                    <span className="font-bold text-gray-800">
                      {formatPrice((item.final_price || item.price) * item.quantity)}
                    </span>
                  </div>

                  {item.weekly_box_id && item.bundle_items && (
                    <div className="mt-1 bg-orange-50/50 p-2 rounded border border-orange-100/50">
                      <p className="text-[9px] font-black text-[#854d0e] uppercase tracking-widest mb-1">
                        📦 Includes:
                      </p>
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                        {item.bundle_items.map((prod, i) => (
                          <span key={i} className="text-[9px] text-gray-500 italic">
                            • {prod.name} ({prod.quantity} {prod.unit})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.is_custom && item.configuration && (
                    <div className="mt-1 bg-green-50/50 p-2 rounded border border-green-100/50">
                      <p className="text-[9px] font-black text-[#064e3b] uppercase tracking-widest mb-1">
                        🧪 Recipe:
                      </p>
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                        {item.configuration.ingredients.map((ing, i) => (
                          <span key={i} className="text-[9px] text-gray-600 italic">
                            • {ing.name} ({ing.qty}{ing.unit})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subTotal)}</span></div>
              <div className="flex justify-between"><span>VAT ({settings?.tax_rate || 0}%)</span><span>{formatPrice(taxAmount)}</span></div>
              <div className="flex justify-between"><span>Delivery Fee</span><span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold"><span>Discount</span><span>-{formatPrice(discount)}</span></div>
              )}
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
          <div className="bg-white w-full max-md rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="text-green-400" /> Secure Payment Gateway</h3>
              <button onClick={() => setShowPaymentModal(false)}><X size={20} /></button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm">Merchant: Fruitify Inc.</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-1">{formatPrice(finalTotal)}</h2>
              </div>

              <div className="space-y-3">
                <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" defaultValue="4242 4242 4242 4242" readOnly />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" defaultValue="12/30" readOnly />
                  <input type="text" placeholder="CVC" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" defaultValue="123" readOnly />
                </div>
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg mt-2"
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