import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Info, ShieldCheck, Tag, X } from 'lucide-react';
import { MdOutlineScience } from 'react-icons/md';
import toast from 'react-hot-toast';

// Contexts & Helpers
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { validateCouponApi, getImageUrl } from '../services/api'; // <--- Import Helper

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { settings, formatPrice, loading } = useSettings();
    const { user } = useAuth();
    const navigate = useNavigate();

    // --- COUPON STATES ---
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);

    // --- CALCULATIONS ---
    const subTotal = Number(cartTotal) || 0;

    // Tax
    const taxAmount = (subTotal * settings.tax_rate) / 100;

    // Delivery
    const deliveryFee = subTotal >= settings.free_delivery_threshold ? 0 : settings.delivery_fee;

    // Final Total
    const totalBeforeDiscount = subTotal + taxAmount + deliveryFee;
    const finalTotal = Math.max(0, totalBeforeDiscount - discount);

    // --- HANDLERS ---
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error("Please enter a code");
            return;
        }
        setCouponLoading(true);

        const res = await validateCouponApi(couponCode, subTotal);

        if (res.success) {
            setDiscount(res.data.discountAmount);
            setAppliedCoupon(res.data.code);
            toast.success(`Coupon ${res.data.code} Applied!`);
        } else {
            toast.error(res.message);
            setDiscount(0);
            setAppliedCoupon(null);
        }
        setCouponLoading(false);
    };

    const handleRemoveCoupon = () => {
        setDiscount(0);
        setAppliedCoupon(null);
        setCouponCode('');
        toast.info("Coupon removed");
    };

    // const handleCheckout = () => {
    //     if (user) {
    //         navigate('/checkout', {
    //             state: {
    //                 discount: discount,
    //                 couponCode: appliedCoupon,
    //                 finalTotal: finalTotal
    //             }
    //         });
    //     } else {
    //         toast.error("Please login to complete your order");
    //         navigate('/login', { state: { from: '/checkout' } });
    //     }
    // };/

    const handleCheckout = () => {
        if (user) {
            // ⭐ Sabse zaroori badlav: Weekly Box ka data map karna
            const itemsWithBundleInfo = cartItems.map(item => ({
                ...item,
                // Agar ye weekly box hai (jisme weekly_box_id hai), 
                // toh product_id ko null rakhein aur weekly_box_id bhejein
                product_id: item.weekly_box_id ? null : (item.product_id || item.id),
                weekly_box_id: item.weekly_box_id || null,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                // Bundle contents ko bhi aage bhejein taaki checkout summary mein dikhe
                bundle_items: item.bundle_items || null
            }));

            navigate('/checkout', {
                state: {
                    discount: discount,
                    couponCode: appliedCoupon,
                    finalTotal: finalTotal,
                    // ⭐ Naya mapped array bhej rahe hain
                    items: itemsWithBundleInfo,
                    subTotal: subTotal,
                    deliveryFee: deliveryFee
                }
            });
        } else {
            toast.error("Please login to complete your order");
            navigate('/login', { state: { from: '/cart' } });
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Cart...</div>;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f1f3f6] text-center p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-48 mb-6 opacity-80 mix-blend-multiply" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty!</h2>
                <button onClick={() => navigate('/shop')} className="bg-[#15803d] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-800 transition-all flex items-center gap-2">
                    Start Shopping <ArrowRight size={18} />
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-8 font-sans">
            <div className="w-[95%] max-w-[1280px] mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <ShoppingBag className="text-[#15803d]" /> My Shopping Cart ({cartItems.length})
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT: Items List */}
                    {/* LEFT: Items List Section */}
                    <div className="flex-1 space-y-4">
                        {console.log("Cart Items:", cartItems)} {/* Debugging Log */}
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 items-center">

                                {/* Image Section */}
                                <div className="w-20 h-20 bg-gray-50 rounded-md border border-gray-200 p-2 flex-shrink-0 relative">
                                    <img
                                        src={getImageUrl(item.media_url || item.image_url || item.image, "https://cdn-icons-png.flaticon.com/512/2748/2748558.png")}
                                        alt={item.name}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                    {/* Agar Custom hai toh Lab Badge dikhao */}
                                    {item.is_custom && (
                                        <div className="absolute -top-2 -left-2 bg-[#064e3b] text-[#eab308] p-1 rounded-full shadow-md">
                                            <MdOutlineScience size={12} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">{item.name}</h3>

                                    {/* ⭐ 1. CUSTOM RECIPE SUMMARY (Ingredients) */}
                                    {item.is_custom && item.configuration ? (
                                        <div className="mt-1 bg-green-50/50 p-2 rounded border border-green-100/50">
                                            <p className="text-[9px] font-black text-[#064e3b] uppercase tracking-widest mb-1 flex items-center gap-1">
                                                <Info size={10} /> Molecular Mix:
                                            </p>
                                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                                {item.configuration.ingredients.map((ing, i) => (
                                                    <span key={i} className="text-[10px] text-gray-600 font-medium italic">
                                                        • {ing.name} ({ing.qty}{ing.unit})
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : item.weekly_box_id && item.bundle_items ? (
                                        /* ⭐ 2. BUNDLE SUMMARY: Basket ke andar ke items dikhane ke liye */
                                        <div className="mt-1 bg-orange-50/50 p-2 rounded border border-orange-100/50">
                                            <p className="text-[9px] font-black text-[#854d0e] uppercase tracking-widest mb-1 flex items-center gap-1">
                                                📦 Basket Contents:
                                            </p>
                                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                                {item.bundle_items && item.bundle_items.length > 0 ? (
                                                    item.bundle_items.map((prod, i) => (
                                                        <span key={prod.id || i} className="text-[10px] text-gray-600 font-medium italic">
                                                            • {prod.name} ({prod.quantity} {prod.unit})
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-[10px] text-gray-400 italic">No items found in this bundle</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        /* 3. NORMAL PRODUCT UNIT */
                                        <p className="text-xs text-gray-500 mb-1">{item.unit}</p>
                                    )}

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="font-bold text-[#15803d]">
                                            {formatPrice(item.final_price || item.price)}
                                        </span>
                                    </div>
                                </div>

                                {/* Quantity Controls & Remove Button (Baki code same rahega) */}
                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-200 text-gray-600"><Minus size={14} /></button>
                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-200 text-gray-600"><Plus size={14} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Bill Summary */}
                    <div className="lg:w-[350px] space-y-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 text-lg mb-4 border-b border-gray-100 pb-2">Bill Details</h3>

                            <div className="space-y-3 text-sm text-gray-600 mb-4">
                                <div className="flex justify-between">
                                    <span>Item Total</span>
                                    <span className="font-medium">{formatPrice(subTotal)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="flex items-center gap-1">VAT ({settings.tax_rate}%) <Info size={12} className="text-gray-400" /></span>
                                    <span className="font-medium">{formatPrice(taxAmount)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className={deliveryFee === 0 ? "text-green-600 font-bold" : "font-medium"}>
                                        {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                                    </span>
                                </div>

                                {/* COUPON INPUT */}
                                <div className="pt-2 pb-2">
                                    {appliedCoupon ? (
                                        <div className="flex justify-between items-center bg-green-50 border border-green-200 p-2 rounded-md">
                                            <div className="flex items-center gap-2">
                                                <Tag size={14} className="text-green-600" />
                                                <span className="font-bold text-green-700 text-xs">{appliedCoupon} Applied</span>
                                            </div>
                                            <button onClick={handleRemoveCoupon} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Promo Code"
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-600 uppercase"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={couponLoading}
                                                className="bg-gray-800 text-white px-3 py-2 rounded-md text-xs font-bold hover:bg-gray-900 disabled:bg-gray-400"
                                            >
                                                {couponLoading ? '...' : 'APPLY'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Discount Row */}
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-bold border-t border-dashed border-gray-200 pt-2">
                                        <span>Coupon Discount</span>
                                        <span>- {formatPrice(discount)}</span>
                                    </div>
                                )}

                                {deliveryFee > 0 && (
                                    <div className="mt-2">
                                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                            <span>Add {formatPrice(settings.free_delivery_threshold - subTotal)} for Free Delivery</span>
                                            <span>{Math.round((subTotal / settings.free_delivery_threshold) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-[#eab308] h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min((subTotal / settings.free_delivery_threshold) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                )}

                                {deliveryFee === 0 && (
                                    <div className="text-[10px] text-green-700 bg-green-50 p-2 rounded text-center font-bold border border-green-100">
                                        🎉 You've unlocked FREE Delivery!
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-dashed border-gray-300 pt-4 mb-6">
                                <span>Total Pay</span>
                                <span>{formatPrice(finalTotal)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-[#eab308] hover:bg-yellow-500 text-[#064e3b] font-bold py-3 rounded-md shadow-md transition-all flex justify-center items-center gap-2"
                            >
                                PROCEED TO CHECKOUT
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
                                <ShieldCheck size={12} /> Secure Transaction
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;