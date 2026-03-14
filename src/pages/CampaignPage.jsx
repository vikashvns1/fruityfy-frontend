// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchCampaignBySlug, getImageUrl } from "../services/api";
// import ProductCard from "../components/shared/ProductCard";
// import { MdTimer, MdLocalOffer, MdArrowBack } from 'react-icons/md';
// import toast from 'react-hot-toast';

// const CampaignPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [campaign, setCampaign] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     const loadCampaign = async () => {
//       try {
//         const res = await fetchCampaignBySlug(slug);
//         setCampaign(res);
//       } catch (err) {
//         toast.error('Campaign not found or expired');
//         navigate('/shop', { replace: true });
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCampaign();
//   }, [slug, navigate]);

//   // Timer Logic
//   useEffect(() => {
//     if (!campaign || !campaign.end_date) return;
//     const timer = setInterval(() => {
//       const distance = new Date(campaign.end_date).getTime() - new Date().getTime();
//       if (distance < 0) {
//         clearInterval(timer);
//         return;
//       }
//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000)
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [campaign]);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin h-10 w-10 border-4 border-[#064E3B] border-t-transparent rounded-full"></div>
//     </div>
//   );

//   if (!campaign) return null;

//   return (
//     <div className="bg-[#FCF9F5] min-h-screen pb-20">
//       {/* --- HERO SECTION --- */}
//       <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
//         <img
//           src={getImageUrl(campaign.banner_image)}
//           alt={campaign.name}
//           className="w-full h-full object-cover"
//         />
//         {/* Dark Overlay for Text Readability */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
//         {/* Back Button */}
//         <button 
//           onClick={() => navigate(-1)}
//           className="absolute top-6 left-6 z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-all"
//         >
//           <MdArrowBack size={24} />
//         </button>

//         <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 z-10">
//           <div className="max-w-[1400px] mx-auto">
//             <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#064E3B] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-xl">
//               <MdLocalOffer /> Limited Time Deal
//             </div>
//             <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-3 drop-shadow-lg uppercase tracking-tight">
//               {campaign.name}
//             </h1>
//             <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl italic">
//               {campaign.subtitle}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* --- CAMPAIGN INFO BAR (Timer & Discount) --- */}
//       <div className="max-w-[1400px] mx-auto px-4 -mt-10 relative z-20">
//         <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-orange-50">
//           <div className="flex items-center gap-6">
//             <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 hidden md:block">
//               <MdTimer size={40} />
//             </div>
//             <div>
//               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Offer Ends In</p>
//               <div className="flex gap-3">
//                 {[
//                   { label: 'Days', val: timeLeft.days },
//                   { label: 'Hrs', val: timeLeft.hours },
//                   { label: 'Mins', val: timeLeft.minutes },
//                   { label: 'Secs', val: timeLeft.seconds }
//                 ].map((item) => (
//                   <div key={item.label} className="flex flex-col items-center">
//                     <span className="text-2xl font-black text-[#064E3B]">{item.val.toString().padStart(2, '0')}</span>
//                     <span className="text-[10px] text-gray-400 uppercase font-bold">{item.label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="h-px md:h-12 w-full md:w-px bg-gray-100"></div>

//           <div className="text-center md:text-right">
//             <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Exclusive Discount</p>
//             <div className="text-3xl font-serif font-black text-red-600">
//               {campaign.discount_type === 'percentage' 
//                 ? `${Math.round(campaign.discount_value)}% FLAT OFF` 
//                 : `SAVE AED ${campaign.discount_value} FLAT`}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- PRODUCTS GRID --- */}
//       <div className="max-w-[1400px] mx-auto px-4 mt-16">
//         <div className="flex items-center gap-4 mb-10">
//           <div className="h-px flex-1 bg-gray-200"></div>
//           <h2 className="text-2xl font-serif font-bold text-[#064E3B] uppercase tracking-widest px-4">
//             Featured Products
//           </h2>
//           <div className="h-px flex-1 bg-gray-200"></div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
//           {campaign.products.map(p => (
//             <div key={p.id} className="transform hover:-translate-y-2 transition-all duration-300">
//                <ProductCard product={p} campaign={campaign} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignPage;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCampaignBySlug, getImageUrl } from "../services/api";
import ProductCard from "../components/shared/ProductCard";
import { MdTimer, MdLocalOffer, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useTranslation } from 'react-i18next'; // 1. Added i18n hook
import { useSettings } from "../context/SettingsContext"; // 2. Added Settings for formatPrice
import toast from 'react-hot-toast';

const CampaignPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // 3. Initialize translation
  const { formatPrice } = useSettings(); // 4. Destructure formatPrice
  
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const res = await fetchCampaignBySlug(slug);
        setCampaign(res);
      } catch (err) {
        toast.error(isRTL ? 'الحملة غير موجودة أو انتهت صلاحيتها' : 'Campaign not found or expired');
        navigate('/shop', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    loadCampaign();
  }, [slug, navigate, isRTL]);

  // Timer Logic
  useEffect(() => {
    if (!campaign || !campaign.end_date) return;
    const timer = setInterval(() => {
      const distance = new Date(campaign.end_date).getTime() - new Date().getTime();
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [campaign]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-[#064E3B] border-t-transparent rounded-full"></div>
    </div>
  );

  if (!campaign) return null;

  return (
    <div className={`bg-[#FCF9F5] min-h-screen pb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* --- HERO SECTION --- */}
      <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
        <img
          src={getImageUrl(campaign.banner_image)}
          alt={isRTL ? (campaign.name_ar || campaign.name) : campaign.name}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Back Button - Positioned and Flipped for RTL */}
        <button 
          onClick={() => navigate(-1)}
          className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-all`}
        >
          {isRTL ? <MdArrowForward size={24} /> : <MdArrowBack size={24} />}
        </button>

        <div className={`absolute bottom-10 left-0 w-full px-6 md:px-12 z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className={`inline-flex items-center gap-2 bg-yellow-400 text-[#064E3B] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MdLocalOffer /> {isRTL ? 'عرض لفترة محدودة' : 'Limited Time Deal'}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-3 drop-shadow-lg uppercase tracking-tight">
              {isRTL ? (campaign.name_ar || campaign.name) : campaign.name}
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl italic">
              {isRTL ? (campaign.subtitle_ar || campaign.subtitle) : campaign.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* --- CAMPAIGN INFO BAR --- */}
      <div className="max-w-[1400px] mx-auto px-4 -mt-10 relative z-20">
        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-orange-50 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 hidden md:block">
              <MdTimer size={40} />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{isRTL ? 'ينتهي العرض خلال' : 'Offer Ends In'}</p>
              <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[
                  { label: isRTL ? 'أيام' : 'Days', val: timeLeft.days },
                  { label: isRTL ? 'ساعة' : 'Hrs', val: timeLeft.hours },
                  { label: isRTL ? 'دقيقة' : 'Mins', val: timeLeft.minutes },
                  { label: isRTL ? 'ثانية' : 'Secs', val: timeLeft.seconds }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="text-2xl font-black text-[#064E3B]">{item.val.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px md:h-12 w-full md:w-px bg-gray-100"></div>

          <div className={isRTL ? 'text-left' : 'text-right'}>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{isRTL ? 'خصم حصري' : 'Exclusive Discount'}</p>
            <div className="text-3xl font-serif font-black text-red-600">
              {campaign.discount_type === 'percentage' 
                ? `${Math.round(campaign.discount_value)}${isRTL ? '٪ خصم' : '% FLAT OFF'}` 
                : `${isRTL ? 'وفر' : 'SAVE'} ${formatPrice(campaign.discount_value)} ${isRTL ? 'ثابت' : 'FLAT'}`}
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="max-w-[1400px] mx-auto px-4 mt-16">
        <div className={`flex items-center gap-4 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="h-px flex-1 bg-gray-200"></div>
          <h2 className="text-2xl font-serif font-bold text-[#064E3B] uppercase tracking-widest px-4">
            {isRTL ? 'منتجات مميزة' : 'Featured Products'}
          </h2>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {campaign.products.map(p => (
            <div key={p.id} className="transform hover:-translate-y-2 transition-all duration-300">
               <ProductCard product={p} campaign={campaign} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;