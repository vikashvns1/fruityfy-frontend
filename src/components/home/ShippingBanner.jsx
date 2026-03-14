// import { FaShippingFast, FaGift, FaUndo, FaMoneyBillWave } from 'react-icons/fa';

// const ShippingBanner = () => {
//   const items = [
//     {
//       icon: <FaShippingFast size={22} />,
//       title: "Free Shipping",
//       desc: "On orders above $50",
//     },
//     {
//       icon: <FaGift size={22} />,
//       title: "Premium Packaging",
//       desc: "Safe & gift-ready boxes",
//     },
//     {
//       icon: <FaUndo size={22} />,
//       title: "Easy Returns",
//       desc: "Hassle-free policy",
//     },
//     {
//       icon: <FaMoneyBillWave size={22} />,
//       title: "Cash on Delivery",
//       desc: "Pay when you receive",
//     },
//   ];

//   return (
//     <section className="bg-[#fff7ed] border-t border-orange-100 py-8">
//       <div className="w-[95%] max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {items.map((item, i) => (
//           <div key={i} className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-white border border-orange-200 rounded-full flex items-center justify-center text-[#064E3B] shadow-sm">
//               {item.icon}
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-800 text-sm">
//                 {item.title}
//               </h3>
//               <p className="text-xs text-gray-500">
//                 {item.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ShippingBanner;

import { FaShippingFast, FaGift, FaUndo, FaMoneyBillWave } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // 1. Import i18n hook

const ShippingBanner = () => {
  const { t, i18n } = useTranslation(); // 2. Initialize translation
  const isRTL = i18n.language === 'ar';

  const items = [
    {
      icon: <FaShippingFast size={22} />,
      title: t('sections.shipping_info'), // Uses your JSON key
      desc: t('sections.shipping_desc') || "On orders above AED 50", 
    },
    {
      icon: <FaGift size={22} />,
      title: t('sections.premium_packaging') || "Premium Packaging",
      desc: t('sections.premium_desc') || "Safe & gift-ready boxes",
    },
    {
      icon: <FaUndo size={22} />,
      title: t('sections.easy_returns') || "Easy Returns",
      desc: t('sections.returns_desc') || "Hassle-free policy",
    },
    {
      icon: <FaMoneyBillWave size={22} />,
      title: t('checkout.cod'), // Reusing key from your checkout JSON
      desc: t('sections.cod_desc') || "Pay when you receive",
    },
  ];

  return (
    <section className="bg-[#fff7ed] border-t border-orange-100 py-8">
      <div className="w-[95%] max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
          >
            <div className="w-14 h-14 bg-white border border-orange-200 rounded-full flex-shrink-0 flex items-center justify-center text-[#064E3B] shadow-sm">
              {/* Flip the truck icon specifically for RTL if needed */}
              <div className={isRTL && i === 0 ? 'scale-x-[-1]' : ''}>
                {item.icon}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShippingBanner;