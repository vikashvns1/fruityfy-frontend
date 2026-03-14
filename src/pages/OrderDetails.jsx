// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import {
//     ArrowLeft, MapPin, CreditCard, CheckCircle,
//     Star, Tag, RefreshCw, Clock, CheckCircle2,
//     XCircle, ChevronDown, ChevronUp, Banknote, Truck
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// // Imports
// import { fetchOrderById, getImageUrl } from '../services/api';
// import { useSettings } from '../context/SettingsContext';
// import ReviewModal from '../components/shared/ReviewModal';
// import ExchangeModal from '../components/shared/ExchangeModal';

// const OrderDetails = () => {
//     const { id } = useParams();
//     const { formatPrice } = useSettings();
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Track open timelines per item
//     const [openTimelines, setOpenTimelines] = useState({});

//     // Modals
//     const [reviewModalOpen, setReviewModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
//     const [exchangeItem, setExchangeItem] = useState(null);

//     useEffect(() => {
//         loadOrder();
//     }, [id]);

//     const loadOrder = async () => {
//         setLoading(true);
//         const result = await fetchOrderById(id);
//         if (result.success) {
//             setOrder(result.data);
//         } else {
//             toast.error(result.message);
//         }
//         setLoading(false);
//     };

//     const toggleTimeline = (itemId) => {
//         setOpenTimelines(prev => ({ ...prev, [itemId]: !prev[itemId] }));
//     };

//     const handleOpenReview = (product) => {
//         setSelectedProduct(product);
//         setReviewModalOpen(true);
//     };

//     const handleOpenExchange = (item) => {
//         setExchangeItem(item);
//         setExchangeModalOpen(true);
//     };

//     // --- HELPER 1: Exchange Badge ---
//     const getExchangeBadge = (status, type) => {
//         const isReturn = type === 'return';
//         const Label = isReturn ? 'Return' : 'Exchange';
//         const Icon = isReturn ? Banknote : Clock;

//         const baseClass = "text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border";

//         switch (status) {
//             case 'pending':
//                 return <span className={`${baseClass} ${isReturn ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-yellow-600 bg-yellow-50 border-yellow-100'}`}>
//                     <Icon size={12} /> {Label} Requested
//                 </span>;
//             case 'approved':
//                 return <span className={`${baseClass} text-purple-600 bg-purple-50 border-purple-100`}>
//                     <CheckCircle2 size={12} /> {Label} Approved
//                 </span>;
//             case 'completed':
//                 return <span className={`${baseClass} text-green-600 bg-green-50 border-green-100`}>
//                     <CheckCircle2 size={12} /> {isReturn ? 'Refunded' : 'Exchanged'}
//                 </span>;
//             case 'rejected':
//                 return <span className={`${baseClass} text-red-600 bg-red-50 border-red-100`}>
//                     <XCircle size={12} /> Rejected
//                 </span>;
//             default: return null;
//         }
//     };

//     // --- HELPER 2: Item Status Badge ---
//     const getItemStatusBadge = (status) => {
//         let colorClass = 'bg-gray-100 text-gray-600 border-gray-200';
//         let icon = null;

//         switch (status) {
//             case 'delivered':
//                 colorClass = 'bg-green-50 text-green-700 border-green-200';
//                 icon = <CheckCircle size={12} />;
//                 break;
//             case 'shipped':
//             case 'out_for_delivery':
//                 colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
//                 icon = <Truck size={12} />;
//                 break;
//             case 'cancelled':
//                 colorClass = 'bg-red-50 text-red-700 border-red-200';
//                 icon = <XCircle size={12} />;
//                 break;
//             case 'returned':
//                 colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
//                 break;
//             case 'confirmed':
//                 colorClass = 'bg-teal-50 text-teal-700 border-teal-200';
//                 break;
//             default: break;
//         }

//         return (
//             <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border flex items-center gap-1 ml-2 ${colorClass}`}>
//                 {icon} {status.replace(/_/g, " ")}
//             </span>
//         );
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//     if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found.</div>;

//     const masterStatusLower = order.order_status ? order.order_status.toLowerCase() : 'pending';
//     const steps = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
//     const currentStep = steps.indexOf(masterStatusLower);

//     return (
//         <div className="min-h-screen bg-[#FDFDFD] py-12 px-4 font-sans selection:bg-green-100">
//             <div className="max-w-6xl mx-auto">

//                 {/* Modern Header Section */}
//                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
//                     <div className="flex items-center gap-5">
//                         <Link to="/profile" className="group flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
//                             <ArrowLeft size={22} className="text-gray-600 group-hover:text-green-600" />
//                         </Link>
//                         <div>
//                             <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest mb-1 block">Purchase Confirmation</span>
//                             <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order ID: <span className="text-gray-400">#{order.id}</span></h1>
//                             <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2">
//                                 <Clock size={14} /> Placed on {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
//                         <div className={`w-3 h-3 rounded-full animate-pulse ${masterStatusLower === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'}`} />
//                         <span className="text-sm font-bold text-gray-800 pr-2 capitalize">{order.order_status.replace(/_/g, " ")}</span>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//                     {/* LEFT COLUMN: Main Content (8 Cols) */}
//                     <div className="lg:col-span-8 space-y-8">

//                         {/* 1. Overall Progress Card */}
//                         <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
//                             <div className="flex items-center justify-between mb-10">
//                                 <h3 className="font-bold text-gray-900 text-lg">Delivery Progress</h3>
//                                 <span className="text-xs font-bold text-gray-400">Step {currentStep + 1} of 5</span>
//                             </div>
//                             <div className="relative flex justify-between items-start group">
//                                 {/* Connector Line */}
//                                 <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
//                                     <div
//                                         className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
//                                         style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
//                                     />
//                                 </div>

//                                 {steps.map((step, index) => {
//                                     const isCompleted = index <= currentStep;
//                                     const isActive = index === currentStep;
//                                     return (
//                                         <div key={step} className="relative z-10 flex flex-col items-center gap-3">
//                                             <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${isCompleted ? 'bg-green-600 border-white text-white shadow-lg shadow-green-200' : 'bg-white border-gray-100 text-gray-300'
//                                                 }`}>
//                                                 {isCompleted ? <CheckCircle size={18} weight="bold" /> : <span className="text-xs font-bold">{index + 1}</span>}
//                                             </div>
//                                             <span className={`text-[10px] font-black uppercase tracking-tighter ${isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
//                                                 {step.replace(/_/g, " ")}
//                                             </span>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         {/* 2. Items List */}
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-bold text-gray-900 pl-2">Ordered Items</h3>
//                             {order.items.map((item) => {

//                                 const isCustom = item.product_id === 81;
//                                 let config = null;

//                                 // 2. Customization JSON ko parse karo
//                                 if (isCustom && item.customization) {
//                                     try {
//                                         config = typeof item.customization === 'string'
//                                             ? JSON.parse(item.customization)
//                                             : item.customization;
//                                     } catch (e) {
//                                         console.error("Recipe parsing failed", e);
//                                     }
//                                 }

//                                 const isItemDelivered = item.item_status === 'delivered' || (item.item_status === 'pending' && masterStatusLower === 'delivered');
//                                 const rating = parseInt(item.my_rating || 0);

//                                 return (
//                                     <div key={item.id} className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
//                                         <div className="flex flex-col md:flex-row gap-6">
//                                             {/* Product Image */}
//                                             <div className="w-24 h-24 bg-gray-50 rounded-2xl p-3 border border-gray-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
//                                                 <img
//                                                     src={getImageUrl(item.product_image || item.image_url || item.image, "https://cdn-icons-png.flaticon.com/512/2748/2748558.png")}
//                                                     alt={item.product_name}
//                                                     className="max-h-full object-contain mix-blend-multiply"
//                                                 />
//                                             </div>

//                                             {/* Details */}
//                                             <div className="flex-1">
//                                                 <div className="flex flex-col sm:flex-row justify-between gap-4">
//                                                     <div>
//                                                         <div className="flex items-center gap-2 mb-1.5">
//                                                             <h4 className="text-lg font-bold text-gray-900 leading-tight">{item.product_name}</h4>
//                                                             {getItemStatusBadge(isItemDelivered ? 'delivered' : item.item_status)}
//                                                         </div>
//                                                         <p className="text-sm font-semibold text-gray-400 flex items-center gap-2">
//                                                             Qty: <span className="text-gray-900">{item.quantity}</span>
//                                                             <span className="text-gray-300">|</span>
//                                                             Unit: <span className="text-gray-900">{formatPrice(item.price)}</span>
//                                                         </p>
//                                                     </div>
//                                                     <div className="text-left sm:text-right">
//                                                         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
//                                                         <div className="text-xl font-black text-green-700">{formatPrice(item.total)}</div>
//                                                     </div>
//                                                 </div>
// {/* ⭐ MOLECULAR RECIPE VIEW: Custom Recipe Details */}
//                     {config && config.ingredients && (
//                         <div className="mt-5 p-5 bg-[#064E3B]/5 rounded-2xl border-l-4 border-[#EAB308] animate-in slide-in-from-left-2">
//                             <h5 className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest mb-3 flex items-center gap-2">
//                                 <RefreshCw size={12} className="animate-spin-slow" /> Molecular Mix Content:
//                             </h5>
//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
//                                 {config.ingredients.map((ing, idx) => (
//                                     <div key={idx} className="flex items-center gap-2">
//                                         <div className="w-1 h-1 bg-[#EAB308] rounded-full" />
//                                         <span className="text-[11px] text-gray-600 font-medium">{ing.name}:</span>
//                                         <span className="text-[11px] font-bold text-gray-900">{ing.qty}{ing.unit}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             {config.nutrition && (
//                                 <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
//                                     <span className="text-[10px] font-bold text-[#064E3B] uppercase">Total Energy Yield</span>
//                                     <span className="text-xs font-black text-green-700">{config.nutrition.calories} KCAL</span>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                                                 {/* Action Row & User Input */}
//                                                 <div className="mt-6 pt-5 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
//                                                     <div className="flex flex-wrap gap-2">
//                                                         <button
//                                                             onClick={() => toggleTimeline(item.id)}
//                                                             className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-gray-600 bg-gray-50 px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
//                                                         >
//                                                             <Truck size={14} /> {openTimelines[item.id] ? 'Close Tracking' : 'Track Order'}
//                                                         </button>

//                                                         {!item.exchange_status && isItemDelivered && item.isReturnWindowOpen && (
//                                                             <button onClick={() => handleOpenExchange(item)} className="text-[11px] font-black uppercase tracking-wider text-red-500 bg-red-50/50 px-5 py-2.5 rounded-xl hover:bg-red-50 transition-all border border-red-100">
//                                                                 Return/Exchange
//                                                             </button>
//                                                         )}
//                                                         {item.exchange_status && getExchangeBadge(item.exchange_status, item.exchange_type)}
//                                                     </div>

//                                                     <div className="flex items-center gap-3">
//                                                         {rating > 0 ? (
//                                                             <div className="flex flex-col items-end">
//                                                                 <div className="flex gap-0.5 mb-1">
//                                                                     {[...Array(5)].map((_, i) => (
//                                                                         <Star key={i} size={12} fill={i < rating ? "#EAB308" : "none"} className={i < rating ? "text-yellow-500" : "text-gray-200"} />
//                                                                     ))}
//                                                                 </div>
//                                                                 <span className="text-[10px] font-bold text-green-600 uppercase">Aapka Review Saved</span>
//                                                             </div>
//                                                         ) : isItemDelivered && (
//                                                             <button onClick={() => handleOpenReview(item)} className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-white bg-green-600 px-6 py-2.5 rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 hover:shadow-green-200 transition-all">
//                                                                 <Star size={14} /> Write Review
//                                                             </button>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 {/* My Review Section (Text & Images) */}
//                                                 {(item.my_comment || (item.my_review_images && item.my_review_images.length > 0)) && (
//                                                     <div className="mt-5 p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
//                                                         {item.my_comment && (
//                                                             <p className="text-sm text-gray-600 italic font-medium leading-relaxed mb-3">"{item.my_comment}"</p>
//                                                         )}
//                                                         {item.my_review_images && item.my_review_images.length > 0 && (
//                                                             <div className="flex flex-wrap gap-2">
//                                                                 {item.my_review_images.map((path, index) => (
//                                                                     <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open(`http://localhost:5000${path}`, '_blank')}>
//                                                                         <img src={`http://localhost:5000${path}`} alt="Review" className="w-full h-full object-cover" />
//                                                                     </div>
//                                                                 ))}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 )}

//                                                 {/* Inner Tracking Timeline (Same as before but polished) */}
//                                                 {openTimelines[item.id] && item.timeline && (
//                                                     <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
//                                                         <div className="space-y-6 relative pl-4">
//                                                             <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-100" />
//                                                             {item.timeline.map((track, idx) => (
//                                                                 <div key={idx} className="relative flex gap-4">
//                                                                     <div className={`w-3 h-3 rounded-full mt-1.5 z-10 border-2 border-white shadow-sm ${idx === 0 ? 'bg-green-500 scale-125' : 'bg-gray-300'}`} />
//                                                                     <div>
//                                                                         <p className={`text-xs font-bold capitalize ${idx === 0 ? 'text-gray-900' : 'text-gray-400'}`}>{track.status.replace(/_/g, " ")}</p>
//                                                                         <p className="text-[11px] text-gray-500 mt-1">{new Date(track.created_at).toLocaleString()}</p>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* RIGHT COLUMN: Sidebar (4 Cols) */}
//                     <div className="lg:col-span-4 space-y-6">
//                         {/* 1. Address Card */}
//                         <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
//                             <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
//                                 <MapPin size={16} className="text-green-600" /> Shipping Info
//                             </h3>
//                             <div className="space-y-4">
//                                 <div>
//                                     <p className="text-lg font-bold text-gray-900">{order.full_name}</p>
//                                     <p className="text-sm text-gray-500 font-medium leading-relaxed mt-1">
//                                         {order.address_line_1}, {order.area}<br />
//                                         {order.city}, UAE
//                                     </p>
//                                 </div>
//                                 <div className="pt-4 border-t border-gray-50">
//                                     <div className="flex items-center gap-3 text-sm font-bold text-gray-800">
//                                         <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
//                                             < Truck size={16} />
//                                         </div>
//                                         {order.phone}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 2. Order Summary Card */}
//                         <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl shadow-xl shadow-gray-200 overflow-hidden relative">
//                             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
//                             <h3 className="text-xs font-black text-green-400 uppercase tracking-widest mb-6">Order Summary</h3>
//                             <div className="space-y-4">
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-400 font-medium">Items Total</span>
//                                     <span className="font-bold">{formatPrice(order.subtotal)}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-400 font-medium">Delivery Fee</span>
//                                     <span className="font-bold">{Number(order.delivery_fee) === 0 ? "FREE" : formatPrice(order.delivery_fee)}</span>
//                                 </div>
//                                 {Number(order.discount_amount) > 0 && (
//                                     <div className="flex justify-between text-sm text-green-400">
//                                         <span className="font-medium">Coupon Discount</span>
//                                         <span className="font-black">- {formatPrice(order.discount_amount)}</span>
//                                     </div>
//                                 )}
//                                 <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
//                                     <div>
//                                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Grand Total</p>
//                                         <p className="text-3xl font-black text-white">{formatPrice(order.final_total)}</p>
//                                     </div>
//                                     <div className="pb-1">
//                                         <div className="px-3 py-1 bg-white/10 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-widest text-green-400">
//                                             {order.payment_status}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
//             {reviewModalOpen && selectedProduct && (
//                 <ReviewModal
//                     productId={selectedProduct.id}
//                     productName={selectedProduct.name}
//                     onClose={() => setReviewModalOpen(false)}
//                     onSuccess={() => {
//                         toast.success("Thanks for your feedback!");
//                         loadOrder();
//                     }}
//                 />
//             )}

//             <ExchangeModal
//                 isOpen={exchangeModalOpen}
//                 onClose={() => setExchangeModalOpen(false)}
//                 item={exchangeItem}
//                 orderId={order?.id}
//                 onSuccess={() => {
//                     loadOrder();
//                 }}
//             />
//         </div>
//     );
// };

// export default OrderDetails;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, MapPin, CreditCard, CheckCircle,
    Star, Tag, RefreshCw, Clock, CheckCircle2,
    XCircle, ChevronDown, ChevronUp, Banknote, Truck
} from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Added translation hook
import toast from 'react-hot-toast';

// Imports
import { fetchOrderById, getImageUrl } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import ReviewModal from '../components/shared/ReviewModal';
import ExchangeModal from '../components/shared/ExchangeModal';

const OrderDetails = () => {
    const { id } = useParams();
    const { formatPrice } = useSettings();
    const { t, i18n } = useTranslation(); // Initialize translation
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const isRTL = i18n.language === 'ar';

    // Track open timelines per item
    const [openTimelines, setOpenTimelines] = useState({});

    // Modals
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
    const [exchangeItem, setExchangeItem] = useState(null);

    useEffect(() => {
        loadOrder();
    }, [id]);

    const loadOrder = async () => {
        setLoading(true);
        const result = await fetchOrderById(id);
        if (result.success) {
            setOrder(result.data);
        } else {
            toast.error(result.message);
        }
        setLoading(false);
    };

    const toggleTimeline = (itemId) => {
        setOpenTimelines(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const handleOpenReview = (item) => {
        setSelectedProduct({
            id: item.id,
            name: isRTL ? (item.product_name_ar || item.product_name) : item.product_name
        });
        setReviewModalOpen(true);
    };

    const handleOpenExchange = (item) => {
        setExchangeItem(item);
        setExchangeModalOpen(true);
    };

    // --- HELPER 1: Exchange Badge ---
    const getExchangeBadge = (status, type) => {
        const isReturn = type === 'return';
        const Label = isReturn ? (isRTL ? 'إرجاع' : 'Return') : (isRTL ? 'استبدال' : 'Exchange');
        const Icon = isReturn ? Banknote : Clock;
        const baseClass = "text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border";

        switch (status) {
            case 'pending':
                return <span className={`${baseClass} ${isReturn ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-yellow-600 bg-yellow-50 border-yellow-100'}`}>
                    <Icon size={12} /> {Label} {isRTL ? 'مطلوب' : 'Requested'}
                </span>;
            case 'approved':
                return <span className={`${baseClass} text-purple-600 bg-purple-50 border-purple-100`}>
                    <CheckCircle2 size={12} /> {Label} {isRTL ? 'تمت الموافقة' : 'Approved'}
                </span>;
            case 'completed':
                return <span className={`${baseClass} text-green-600 bg-green-50 border-green-100`}>
                    <CheckCircle2 size={12} /> {isReturn ? (isRTL ? 'تم استرداد المبلغ' : 'Refunded') : (isRTL ? 'تم الاستبدال' : 'Exchanged')}
                </span>;
            case 'rejected':
                return <span className={`${baseClass} text-red-600 bg-red-50 border-red-100`}>
                    <XCircle size={12} /> {isRTL ? 'مرفوض' : 'Rejected'}
                </span>;
            default: return null;
        }
    };

    // --- HELPER 2: Item Status Badge ---
    const getItemStatusBadge = (status) => {
        let colorClass = 'bg-gray-100 text-gray-600 border-gray-200';
        let icon = null;

        switch (status) {
            case 'delivered':
                colorClass = 'bg-green-50 text-green-700 border-green-200';
                icon = <CheckCircle size={12} />;
                break;
            case 'shipped':
            case 'out_for_delivery':
                colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
                icon = <Truck size={12} />;
                break;
            case 'cancelled':
                colorClass = 'bg-red-50 text-red-700 border-red-200';
                icon = <XCircle size={12} />;
                break;
            case 'returned':
                colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
                break;
            case 'confirmed':
                colorClass = 'bg-teal-50 text-teal-700 border-teal-200';
                break;
            default: break;
        }

        return (
            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border flex items-center gap-1 ${isRTL ? 'mr-2' : 'ml-2'} ${colorClass}`}>
                {icon} {isRTL ? t(`status.${status}`) : status.replace(/_/g, " ")}
            </span>
        );
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">{t('common.loading')}</div>;
    if (!order) return <div className="min-h-screen flex items-center justify-center">{isRTL ? 'الطلب غير موجود' : 'Order not found.'}</div>;

    const masterStatusLower = order.order_status ? order.order_status.toLowerCase() : 'pending';
    const steps = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentStep = steps.indexOf(masterStatusLower);

    return (
        <div className={`min-h-screen bg-[#FDFDFD] py-12 px-4 font-sans selection:bg-green-100 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="max-w-6xl mx-auto">

                {/* Modern Header Section */}
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-100 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Link to="/profile" className="group flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                            {isRTL ? <ArrowRight size={22} className="text-gray-600 group-hover:text-green-600" /> : <ArrowLeft size={22} className="text-gray-600 group-hover:text-green-600" />}
                        </Link>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                            <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest mb-1 block">{isRTL ? 'تأكيد الشراء' : 'Purchase Confirmation'}</span>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t('profile.order_id')}: <span className="text-gray-400">#{order.id}</span></h1>
                            <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2 justify-start">
                                <Clock size={14} /> {isRTL ? 'تم الطلب في' : 'Placed on'} {new Date(order.created_at).toLocaleDateString(isRTL ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-3 h-3 rounded-full animate-pulse ${masterStatusLower === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className={`text-sm font-bold text-gray-800 capitalize ${isRTL ? 'pl-2' : 'pr-2'}`}>{isRTL ? t(`status.${masterStatusLower}`) : order.order_status.replace(/_/g, " ")}</span>
                    </div>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 1. Overall Progress Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
                            <div className={`flex items-center justify-between mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <h3 className="font-bold text-gray-900 text-lg">{isRTL ? 'حالة التوصيل' : 'Delivery Progress'}</h3>
                                <span className="text-xs font-bold text-gray-400">{isRTL ? `خطوة ${currentStep + 1} من 5` : `Step ${currentStep + 1} of 5`}</span>
                            </div>
                            <div className={`relative flex justify-between items-start group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out ${isRTL ? 'float-right' : ''}`}
                                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                                    />
                                </div>

                                {steps.map((step, index) => {
                                    const isCompleted = index <= currentStep;
                                    return (
                                        <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${isCompleted ? 'bg-green-600 border-white text-white shadow-lg shadow-green-200' : 'bg-white border-gray-100 text-gray-300'}`}>
                                                {isCompleted ? <CheckCircle size={18} /> : <span className="text-xs font-bold">{index + 1}</span>}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                                                {isRTL ? t(`status.${step}`) : step.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Items List */}
                        <div className="space-y-4">
                            <h3 className={`text-lg font-bold text-gray-900 ${isRTL ? 'pr-2' : 'pl-2'}`}>{isRTL ? 'المنتجات المطلوبة' : 'Ordered Items'}</h3>
                            {order.items.map((item) => {
                                const isCustom = item.product_id === 81;
                                let config = null;
                                if (isCustom && item.customization) {
                                    try {
                                        config = typeof item.customization === 'string' ? JSON.parse(item.customization) : item.customization;
                                    } catch (e) { console.error("Recipe parsing failed", e); }
                                }
                                const isItemDelivered = item.item_status === 'delivered' || (item.item_status === 'pending' && masterStatusLower === 'delivered');
                                const rating = parseInt(item.my_rating || 0);

                                return (
                                    <div key={item.id} className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className={`flex flex-col md:flex-row gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                                            <div className="w-24 h-24 bg-gray-50 rounded-2xl p-3 border border-gray-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                <img
                                                    src={getImageUrl(item.product_image || item.image_url || item.image, "https://cdn-icons-png.flaticon.com/512/2748/2748558.png")}
                                                    alt={item.product_name}
                                                    className="max-h-full object-contain mix-blend-multiply"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className={`flex flex-col sm:flex-row justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                                                    <div className={isRTL ? 'text-right' : 'text-left'}>
                                                        <div className={`flex items-center gap-2 mb-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                            <h4 className="text-lg font-bold text-gray-900 leading-tight">{isRTL ? (item.product_name_ar || item.product_name) : item.product_name}</h4>
                                                            {getItemStatusBadge(isItemDelivered ? 'delivered' : item.item_status)}
                                                        </div>
                                                        <p className={`text-sm font-semibold text-gray-400 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                            {isRTL ? 'الكمية:' : 'Qty:'} <span className="text-gray-900">{item.quantity}</span>
                                                            <span className="text-gray-300">|</span>
                                                            {isRTL ? 'السعر:' : 'Unit:'} <span className="text-gray-900">{formatPrice(item.price)}</span>
                                                        </p>
                                                    </div>
                                                    <div className={isRTL ? 'text-right' : 'text-left sm:text-right'}>
                                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isRTL ? 'المبلغ الإجمالي' : 'Total Amount'}</p>
                                                        <div className="text-xl font-black text-green-700">{formatPrice(item.total)}</div>
                                                    </div>
                                                </div>

                                                {/* MOLECULAR RECIPE VIEW */}
                                                {config && config.ingredients && (
                                                    <div className={`mt-5 p-5 bg-[#064E3B]/5 rounded-2xl border-${isRTL ? 'r' : 'l'}-4 border-[#EAB308] animate-in slide-in-from-${isRTL ? 'right' : 'left'}-2`}>
                                                        <h5 className={`text-[10px] font-black text-[#064E3B] uppercase tracking-widest mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                            <RefreshCw size={12} className="animate-spin-slow" /> {isRTL ? 'محتويات المزيج الجزيئي:' : 'Molecular Mix Content:'}
                                                        </h5>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                                                            {config.ingredients.map((ing, idx) => (
                                                                <div key={idx} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                                    <div className="w-1 h-1 bg-[#EAB308] rounded-full" />
                                                                    <span className="text-[11px] text-gray-600 font-medium">{isRTL ? (ing.name_ar || ing.name) : ing.name}:</span>
                                                                    <span className="text-[11px] font-bold text-gray-900">{ing.qty}{ing.unit}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className={`mt-6 pt-5 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                        <button onClick={() => toggleTimeline(item.id)} className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-gray-600 bg-gray-50 px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                            <Truck size={14} /> {openTimelines[item.id] ? (isRTL ? 'إغلاق التتبع' : 'Close Tracking') : (isRTL ? 'تتبع الطلب' : 'Track Order')}
                                                        </button>
                                                        {!item.exchange_status && isItemDelivered && item.isReturnWindowOpen && (
                                                            <button onClick={() => handleOpenExchange(item)} className="text-[11px] font-black uppercase tracking-wider text-red-500 bg-red-50/50 px-5 py-2.5 rounded-xl hover:bg-red-50 transition-all border border-red-100">
                                                                {isRTL ? 'استرجاع / استبدال' : 'Return/Exchange'}
                                                            </button>
                                                        )}
                                                        {item.exchange_status && getExchangeBadge(item.exchange_status, item.exchange_type)}
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        {rating > 0 ? (
                                                            <div className={`flex flex-col ${isRTL ? 'items-start' : 'items-end'}`}>
                                                                <div className={`flex gap-0.5 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} size={12} fill={i < rating ? "#EAB308" : "none"} className={i < rating ? "text-yellow-500" : "text-gray-200"} />
                                                                    ))}
                                                                </div>
                                                                <span className="text-[10px] font-bold text-green-600 uppercase">{isRTL ? 'تم حفظ تقييمك' : 'Your Review Saved'}</span>
                                                            </div>
                                                        ) : isItemDelivered && (
                                                            <button onClick={() => handleOpenReview(item)} className={`group flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-white bg-green-600 px-6 py-2.5 rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 hover:shadow-green-200 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                                <Star size={14} /> {isRTL ? 'اكتب تقييماً' : 'Write Review'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {(item.my_comment || (item.my_review_images && item.my_review_images.length > 0)) && (
                                                    <div className="mt-5 p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                                        {item.my_comment && (
                                                            <p className="text-sm text-gray-600 italic font-medium leading-relaxed mb-3">"{item.my_comment}"</p>
                                                        )}
                                                        {item.my_review_images && item.my_review_images.length > 0 && (
                                                            <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                                {item.my_review_images.map((path, index) => (
                                                                    <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open(`http://localhost:5000${path}`, '_blank')}>
                                                                        <img src={`http://localhost:5000${path}`} alt="Review" className="w-full h-full object-cover" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {openTimelines[item.id] && item.timeline && (
                                                    <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
                                                        <div className={`space-y-6 relative ${isRTL ? 'pr-4' : 'pl-4'}`}>
                                                            <div className={`absolute ${isRTL ? 'right-[19px]' : 'left-[19px]'} top-0 bottom-0 w-0.5 bg-gray-100`} />
                                                            {item.timeline.map((track, idx) => (
                                                                <div key={idx} className={`relative flex gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                                                    <div className={`w-3 h-3 rounded-full mt-1.5 z-10 border-2 border-white shadow-sm ${idx === 0 ? 'bg-green-500 scale-125' : 'bg-gray-300'}`} />
                                                                    <div>
                                                                        <p className={`text-xs font-bold capitalize ${idx === 0 ? 'text-gray-900' : 'text-gray-400'}`}>{isRTL ? t(`status.${track.status}`) : track.status.replace(/_/g, " ")}</p>
                                                                        <p className="text-[11px] text-gray-500 mt-1">{new Date(track.created_at).toLocaleString(isRTL ? 'ar-AE' : 'en-GB')}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className={`text-sm font-black text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <MapPin size={16} className="text-green-600" /> {t('checkout.shipping_title')}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-lg font-bold text-gray-900">{order.full_name}</p>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed mt-1">
                                        {order.address_line_1}, {order.area}<br />
                                        {order.city}, UAE
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-50">
                                    <div className={`flex items-center gap-3 text-sm font-bold text-gray-800 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                            <Truck size={16} />
                                        </div>
                                        {order.phone}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl shadow-xl shadow-gray-200 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <h3 className={`text-xs font-black text-green-400 uppercase tracking-widest mb-6 ${isRTL ? 'text-right' : ''}`}>{isRTL ? 'ملخص الطلب' : 'Order Summary'}</h3>
                            <div className="space-y-4">
                                <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-gray-400 font-medium">{t('cart.subtotal')}</span>
                                    <span className="font-bold">{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-gray-400 font-medium">{t('cart.delivery')}</span>
                                    <span className="font-bold">{Number(order.delivery_fee) === 0 ? t('cart.free') : formatPrice(order.delivery_fee)}</span>
                                </div>
                                {Number(order.discount_amount) > 0 && (
                                    <div className={`flex justify-between text-sm text-green-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <span className="font-medium">{isRTL ? 'خصم الكوبون' : 'Coupon Discount'}</span>
                                        <span className="font-black">- {formatPrice(order.discount_amount)}</span>
                                    </div>
                                )}
                                <div className={`pt-6 mt-6 border-t border-white/10 flex justify-between items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className={isRTL ? 'text-right' : 'text-left'}>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{isRTL ? 'الإجمالي الكلي' : 'Grand Total'}</p>
                                        <p className="text-3xl font-black text-white">{formatPrice(order.final_total)}</p>
                                    </div>
                                    <div className="pb-1">
                                        <div className="px-3 py-1 bg-white/10 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-widest text-green-400">
                                            {isRTL ? t(`status.${order.payment_status.toLowerCase()}`) : order.payment_status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {reviewModalOpen && selectedProduct && (
                <ReviewModal
                    productId={selectedProduct.id}
                    productName={selectedProduct.name}
                    onClose={() => setReviewModalOpen(false)}
                    onSuccess={() => {
                        toast.success(isRTL ? "شكراً لملاحظاتك!" : "Thanks for your feedback!");
                        loadOrder();
                    }}
                />
            )}

            <ExchangeModal
                isOpen={exchangeModalOpen}
                onClose={() => setExchangeModalOpen(false)}
                item={exchangeItem}
                orderId={order?.id}
                onSuccess={() => {
                    loadOrder();
                }}
            />
        </div>
    );
};

export default OrderDetails;