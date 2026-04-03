// import { useEffect, useState } from 'react';
// import api, { fetchProducts } from '../services/api';
// import { MdContentCopy, MdFlashOn, MdCampaign } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// import ProductCard from '../components/shared/ProductCard';

// const OfferPage = () => {

//     const [campaigns, setCampaigns] = useState([]);
//     const [discountedProducts, setDiscountedProducts] = useState([]);
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [tick, setTick] = useState(0);

//     /* TIMER REFRESH */
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setTick(t => t + 1);
//         }, 60000);

//         return () => clearInterval(interval);
//     }, []);

//     /* FETCH DATA */
//     useEffect(() => {

//         const loadOfferData = async () => {

//             try {

//                 /* CAMPAIGNS */
//                 const campRes = await api.get('/campaigns');

//                 if (campRes.data.success) {

//                     const now = new Date();

//                     const activeCampaigns = campRes.data.data
//                         .filter(c => {
//                             const start = new Date(c.start_date);
//                             const end = new Date(c.end_date);
//                             return c.is_active === 1 && start <= now && end >= now;
//                         })
//                         .sort((a, b) => b.is_featured - a.is_featured);

//                     setCampaigns(activeCampaigns);
//                 }

//                 /* COUPONS */
//                 const coupRes = await api.get('/coupons');

//                 if (coupRes.data.success) {

//                     const today = new Date();

//                     const activeCoupons = coupRes.data.data.filter(coupon => {

//                         const expiryDate = new Date(coupon.expiry_date);

//                         return coupon.is_active === 1 && expiryDate >= today;

//                     });

//                     setCoupons(activeCoupons);
//                 }

//                 /* PRODUCTS */
//                 const prodRes = await fetchProducts();

//                 if (prodRes.success) {

//                     const discounted = prodRes.data.filter(p =>
//                         p.discount_price > 0 && p.is_active === 1
//                     );

//                     setDiscountedProducts(discounted);
//                 }

//             }
//             catch (err) {

//                 console.error("Offer fetch error:", err);

//             }
//             finally {

//                 setLoading(false);

//             }

//         };

//         loadOfferData();

//     }, []);

//     /* COUNTDOWN FUNCTION */

//     const getTimeLeft = (endDate) => {

//         const total = new Date(endDate) - new Date();

//         if (total <= 0) return "Expired";

//         const days = Math.floor(total / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((total / (1000 * 60)) % 60);

//         return `${days}d ${hours}h ${minutes}m`;

//     };

//     /* COPY COUPON */

//     const copyToClipboard = (code) => {

//         navigator.clipboard.writeText(code);

//         toast.success(`Coupon ${code} copied! 📋`, {
//             position: "bottom-right",
//             autoClose: 2000
//         });

//     };

//     if (loading)
//         return (
//             <div className="flex items-center justify-center min-h-[60vh]">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#064E3B]"></div>
//             </div>
//         );

//     return (

//         <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">

//             {/* 🔥 FRUITIFY OFFERS HERO - PREMIUM DESIGN */}
//             <div className="rounded-[40px] bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#10B981] text-white p-14 shadow-2xl text-center">

//         <h1 className="text-5xl md:text-6xl font-black flex items-center justify-center gap-3">
//           <MdFlashOn className="text-yellow-400" />
//           Fruitify Offers
//         </h1>

//         <p className="text-green-100 mt-3 text-lg">
//           Fresh Deals • Premium Fruits • Limited Time Discounts
//         </p>

//       </div>


//             {/* CAMPAIGNS */}

//             {campaigns.length > 0 && (

//                 <div className="space-y-6">

//                     <h2 className="text-3xl font-black text-[#064E3B] flex items-center gap-2">
//                         <MdCampaign className="text-green-600" />
//                         Special Campaigns
//                     </h2>

//                     <div className="grid md:grid-cols-2 gap-8">

//                         {campaigns.map(camp => (

//                             <Link
//                                 key={camp.id}
//                                 to={`/campaign/${camp.slug}`}
//                                 className="group relative block h-[280px] md:h-[320px] w-full overflow-hidden rounded-[30px] shadow-lg transition-all duration-500 hover:shadow-2xl border border-gray-100"
//                             >
//                                 {/* Banner Image with subtle Zoom */}
//                                 <img
//                                     src={`http://localhost:5000${camp.banner_image}`}
//                                     className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
//                                     alt={camp.name}
//                                 />

//                                 {/* Dynamic Gradient Overlay - Improved focus on text */}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

//                                 {/* Content Container - Compact Padding */}
//                                 <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">

//                                     {/* Top Right Shop Now Badge */}
//                                     <div className="absolute top-5 right-5 translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 hidden md:block">
//                                         <span className="rounded-full bg-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#064E3B] shadow-lg">
//                                             Shop Now →
//                                         </span>
//                                     </div>

//                                     {/* Text Details - Reduced Translate for snappier feel */}
//                                     <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
//                                         <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
//                                             {camp.name}
//                                         </h3>

//                                         <p className="mt-1 max-w-[85%] text-xs md:text-sm font-medium text-gray-200 line-clamp-1 opacity-90">
//                                             {camp.subtitle}
//                                         </p>

//                                         {/* Badges Row - More Compact Spacing */}
//                                         <div className="mt-4 flex flex-wrap items-center gap-2">

//                                             {/* Discount Badge */}
//                                             <div className="flex items-center rounded-xl bg-yellow-400 px-4 py-1.5 shadow-md">
//                                                 <span className="text-[10px] md:text-xs font-black text-[#064E3B] uppercase">
//                                                     {camp.discount_type === "percentage"
//                                                         ? `${Math.round(camp.discount_value)}% OFF`
//                                                         : `SAVE AED ${camp.discount_value}`}
//                                                 </span>
//                                             </div>

//                                             {/* Glassmorphism Timer Badge - Slimmer design */}
//                                             <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md shadow-inner">
//                                                 <div className="relative flex h-1.5 w-1.5">
//                                                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
//                                                     <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
//                                                 </div>
//                                                 <span className="text-[9px] md:text-[10px] font-bold tracking-tight text-white uppercase">
//                                                     {getTimeLeft(camp.end_date)}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>

//                         ))}

//                     </div>

//                 </div>

//             )}


//             {/* COUPONS */}

//             {coupons.length > 0 && (

//                 <div className="space-y-6">

//                     <h2 className="text-3xl font-black text-[#064E3B]">
//                         Promo Coupons
//                     </h2>

//                     <div className="grid md:grid-cols-3 gap-6">

//                         {coupons.map(coupon => (

//                             <div
//                                 key={coupon.id}
//                                 className="relative bg-white rounded-[24px] p-6 shadow-lg border border-gray-100 hover:shadow-xl transition"
//                             >

//                                 <div className="absolute -top-3 right-6 bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
//                                     Limited
//                                 </div>

//                                 <h3 className="text-3xl font-black text-green-600">

//                                     {coupon.discount_type === "percentage"
//                                         ? `${Math.round(coupon.discount_value)}%`
//                                         : `AED ${coupon.discount_value}`}

//                                     <span className="text-gray-500 text-sm ml-1">
//                                         OFF
//                                     </span>

//                                 </h3>

//                                 <p className="text-xs text-gray-500 mt-1">
//                                     On orders above AED {coupon.min_order_amount}
//                                 </p>

//                                 <div className="mt-6 flex items-center justify-between bg-gray-50 p-3 rounded-xl border">

//                                     <span className="font-mono font-bold text-lg text-green-700">
//                                         {coupon.code}
//                                     </span>

//                                     <button
//                                         onClick={() => copyToClipboard(coupon.code)}
//                                         className="hover:text-green-600"
//                                     >
//                                         <MdContentCopy size={20} />
//                                     </button>

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             )}


//             {/* PRODUCTS */}

//             <div className="space-y-8">

//                 <h2 className="text-3xl font-black text-[#064E3B] flex items-center gap-2">
//                     <MdFlashOn className="text-orange-500" />
//                     Hot Deals
//                 </h2>

//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//                     {discountedProducts.map(product => (

//                         <ProductCard
//                             key={product.id}
//                             product={product}
//                         />

//                     ))}

//                 </div>

//                 {discountedProducts.length === 0 && (

//                     <p className="text-center text-gray-400 font-bold py-10">
//                         No deals available right now
//                     </p>

//                 )}

//             </div>

//         </div>

//     );

// };

// export default OfferPage;

import { useEffect, useState } from 'react';
import api, { fetchProducts, getImageUrl } from '../services/api';
import { MdContentCopy, MdFlashOn, MdCampaign } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import

import ProductCard from '../components/shared/ProductCard';

const OfferPage = () => {
    const { t, i18n } = useTranslation(); // 2. Initialize translation hook
    const isRTL = i18n.language === 'ar'; // 3. RTL Check

    const [campaigns, setCampaigns] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tick, setTick] = useState(0);

    /* TIMER REFRESH */
    useEffect(() => {
        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    /* FETCH DATA */
    useEffect(() => {
        const loadOfferData = async () => {
            try {
                /* CAMPAIGNS */
                const campRes = await api.get('/campaigns');
                if (campRes.data.success) {
                    const now = new Date();
                    const activeCampaigns = campRes.data.data
                        .filter(c => {
                            const start = new Date(c.start_date);
                            const end = new Date(c.end_date);
                            return c.is_active === 1 && start <= now && end >= now;
                        })
                        .sort((a, b) => b.is_featured - a.is_featured);
                    setCampaigns(activeCampaigns);
                }

                /* COUPONS */
                const coupRes = await api.get('/coupons');
                if (coupRes.data.success) {
                    const today = new Date();
                    const activeCoupons = coupRes.data.data.filter(coupon => {
                        const expiryDate = new Date(coupon.expiry_date);
                        return coupon.is_active === 1 && expiryDate >= today;
                    });
                    setCoupons(activeCoupons);
                }

                /* PRODUCTS */
                const prodRes = await fetchProducts();
                if (prodRes.success) {
                    const discounted = prodRes.data.filter(p =>
                        p.discount_price > 0 && p.is_active === 1
                    );
                    setDiscountedProducts(discounted);
                }
            }
            catch (err) {
                console.error("Offer fetch error:", err);
            }
            finally {
                setLoading(false);
            }
        };
        loadOfferData();
    }, []);

    /* COUNTDOWN FUNCTION */
    const getTimeLeft = (endDate) => {
        const total = new Date(endDate) - new Date();
        if (total <= 0) return isRTL ? "منتهي" : "Expired";

        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / (1000 * 60)) % 60);

        return isRTL
            ? `${days}ي ${hours}س ${minutes}د`
            : `${days}d ${hours}h ${minutes}m`;
    };

    /* COPY COUPON - FIXED FOR NON-HTTPS SERVERS */
    const copyToClipboard = (code) => {
        // 1. Try modern API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(() => {
                showToast(code);
            });
        } else {
            // 2. Fallback: Old school 'execCommand' method for non-https
            const textArea = document.createElement("textarea");
            textArea.value = code;

            // Ensure it's not visible but part of DOM
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);

            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                showToast(code);
            } catch (err) {
                console.error('Fallback copy failed', err);
            }

            document.body.removeChild(textArea);
        }
    };

    // Helper to keep code clean
    const showToast = (code) => {
        toast.success(isRTL ? `تم نسخ الكوبون ${code}! 📋` : `Coupon ${code} copied! 📋`, {
            position: isRTL ? "bottom-left" : "bottom-right",
            autoClose: 2000
        });
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#064E3B]"></div>
            </div>
        );

    return (
        <div className={`max-w-7xl mx-auto px-4 py-12 space-y-20 ${isRTL ? 'text-right' : 'text-left'}`}>

            {/* 🔥 FRUITIFY OFFERS HERO */}
            <div className="rounded-[40px] bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#10B981] text-white p-14 shadow-2xl text-center">
                <h1 className={`text-5xl md:text-6xl font-black flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MdFlashOn className="text-yellow-400" />
                    {t('nav.offers')}
                </h1>
                <p className="text-green-100 mt-3 text-lg opacity-90">
                    {isRTL ? "عروض طازجة • فواكه ممتازة • خصومات لفترة محدودة" : "Fresh Deals • Premium Fruits • Limited Time Discounts"}
                </p>
            </div>

            {/* CAMPAIGNS */}
            {campaigns.length > 0 && (
                <div className="space-y-6">
                    <h2 className={`text-3xl font-black text-[#064E3B] flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MdCampaign className="text-green-600" />
                        {isRTL ? "حملات خاصة" : "Special Campaigns"}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {campaigns.map(camp => (
                            <Link
                                key={camp.id}
                                to={`/campaign/${camp.slug}`}
                                className="group relative block h-[280px] md:h-[320px] w-full overflow-hidden rounded-[30px] shadow-lg transition-all duration-500 hover:shadow-2xl border border-gray-100"
                            >
                                <img
                                    src={getImageUrl(camp.banner_image)}
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt={isRTL ? (camp.name_ar || camp.name) : camp.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                                <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                                    <div className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 hidden md:block`}>
                                        <span className="rounded-full bg-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#064E3B] shadow-lg">
                                            {isRTL ? "← تسوق الآن" : "Shop Now →"}
                                        </span>
                                    </div>

                                    <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                                        <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
                                            {isRTL ? (camp.name_ar || camp.name) : camp.name}
                                        </h3>
                                        <p className="mt-1 max-w-[85%] text-xs md:text-sm font-medium text-gray-200 line-clamp-1 opacity-90">
                                            {isRTL ? (camp.subtitle_ar || camp.subtitle) : camp.subtitle}
                                        </p>

                                        <div className={`mt-4 flex flex-wrap items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <div className="flex items-center rounded-xl bg-yellow-400 px-4 py-1.5 shadow-md">
                                                <span className="text-[10px] md:text-xs font-black text-[#064E3B] uppercase">
                                                    {camp.discount_type === "percentage"
                                                        ? `${Math.round(camp.discount_value)}% ${isRTL ? 'خصم' : 'OFF'}`
                                                        : `${isRTL ? 'وفر' : 'SAVE'} ${camp.discount_value} ${t('common.currency')}`}
                                                </span>
                                            </div>

                                            <div className={`flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md shadow-inner ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <div className="relative flex h-1.5 w-1.5">
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                                </div>
                                                <span className="text-[9px] md:text-[10px] font-bold tracking-tight text-white uppercase">
                                                    {getTimeLeft(camp.end_date)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* COUPONS */}
            {coupons.length > 0 && (
                <div className="space-y-6">
                    <h2 className={`text-3xl font-black text-[#064E3B] ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isRTL ? "قسائم الترويض" : "Promo Coupons"}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {coupons.map(coupon => (
                            <div key={coupon.id} className="relative bg-white rounded-[24px] p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                                <div className={`absolute -top-3 ${isRTL ? 'left-6' : 'right-6'} bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase`}>
                                    {isRTL ? "محدود" : "Limited"}
                                </div>

                                <h3 className={`text-3xl font-black text-green-600 ${isRTL ? 'flex flex-row-reverse justify-end' : ''}`}>
                                    {coupon.discount_type === "percentage"
                                        ? `${Math.round(coupon.discount_value)}%`
                                        : `${t('common.currency')} ${coupon.discount_value}`}
                                    <span className="text-gray-500 text-sm mx-1">
                                        {isRTL ? "خصم" : "OFF"}
                                    </span>
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    {isRTL
                                        ? `على الطلبات الأكثر من ${coupon.min_order_amount} درهم`
                                        : `On orders above AED ${coupon.min_order_amount}`}
                                </p>

                                <div className={`mt-6 flex items-center justify-between bg-gray-50 p-3 rounded-xl border ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span className="font-mono font-bold text-lg text-green-700">
                                        {coupon.code}
                                    </span>
                                    <button onClick={() => copyToClipboard(coupon.code)} className="hover:text-green-600">
                                        <MdContentCopy size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PRODUCTS */}
            <div className="space-y-8">
                <h2 className={`text-3xl font-black text-[#064E3B] flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MdFlashOn className="text-orange-500" />
                    {isRTL ? "عروض ساخنة" : "Hot Deals"}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {discountedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {discountedProducts.length === 0 && (
                    <p className="text-center text-gray-400 font-bold py-10">
                        {isRTL ? "لا توجد عروض متوفرة حالياً" : "No deals available right now"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OfferPage;