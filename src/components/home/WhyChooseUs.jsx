// import {
//     Truck,
//     Leaf,
//     ShieldCheck,
//     Clock
// } from 'lucide-react';

// const features = [
//     {
//         icon: Leaf,
//         title: 'Farm Fresh Quality',
//         desc: 'Handpicked fruits sourced daily from trusted farms'
//     },
//     {
//         icon: Truck,
//         title: 'Same Day Delivery',
//         desc: 'Fresh fruits delivered across Dubai & Abu Dhabi'
//     },
//     {
//         icon: ShieldCheck,
//         title: '100% Trusted',
//         desc: 'Safe payments, premium packaging & quality assurance'
//     },
//     {
//         icon: Clock,
//         title: 'Always On Time',
//         desc: 'Quick processing with real-time order tracking'
//     }
// ];

// const WhyChooseUs = () => {
//     return (
//         <section className="bg-white py-16 border-y border-gray-100">
//             <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

//                 {/* Heading */}
//                 <div className="text-center mb-12">
//                     <span className="text-[#eab308] font-bold text-xs tracking-widest uppercase">
//                         Our Promise
//                     </span>
//                     <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mt-2">
//                         Why Customers Love Fruitify
//                     </h2>
//                     <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
//                         We go the extra mile to deliver freshness, quality and trust in every order.
//                     </p>
//                 </div>

//                 {/* Features */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {features.map((item, idx) => {
//                         const Icon = item.icon;
//                         return (
//                             <div
//                                 key={idx}
//                                 className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//                                 {/* ICON */}
//                                 <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#15803d] mb-4 shadow-md">
//                                     <Icon className="text-white" size={28} />
//                                 </div>

//                                 {/* TITLE */}
//                                 <h3 className="font-bold text-dark mb-2 text-sm md:text-base">
//                                     {item.title}
//                                 </h3>

//                                 {/* DESC */}
//                                 <p className="text-sm text-gray-600 leading-relaxed">
//                                     {item.desc}
//                                 </p>
//                             </div>
//                         );
//                     })}
//                 </div>


//             </div>
//         </section>
//     );
// };

// export default WhyChooseUs;.

import { Truck, Leaf, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Import i18n

const WhyChooseUs = () => {
    const { t, i18n } = useTranslation(); // 2. Initialize i18n
    const isRTL = i18n.language === 'ar';

    const features = [
        {
            icon: Leaf,
            title: t('why_choose.feature1_title'),
            desc: t('why_choose.feature1_desc')
        },
        {
            icon: Truck,
            title: t('why_choose.feature2_title'),
            desc: t('why_choose.feature2_desc')
        },
        {
            icon: ShieldCheck,
            title: t('why_choose.feature3_title'),
            desc: t('why_choose.feature3_desc')
        },
        {
            icon: Clock,
            title: t('why_choose.feature4_title'),
            desc: t('why_choose.feature4_desc')
        }
    ];

    return (
        <section className="bg-white py-16 border-y border-gray-100">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="text-[#eab308] font-bold text-xs tracking-widest uppercase">
                        {t('why_choose.badge')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mt-2">
                        {t('why_choose.title')}
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        {t('why_choose.subtitle')}
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isRTL ? 'text-right' : 'text-center'}`}>
                                {/* ICON */}
                                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#15803d] mb-4 shadow-md">
                                    <Icon className={`text-white ${isRTL && idx === 1 ? 'scale-x-[-1]' : ''}`} size={28} />
                                </div>

                                {/* TITLE */}
                                <h3 className={`font-bold text-dark mb-2 text-sm md:text-base ${isRTL ? 'text-center' : ''}`}>
                                    {item.title}
                                </h3>

                                {/* DESC */}
                                <p className={`text-sm text-gray-600 leading-relaxed ${isRTL ? 'text-center' : ''}`}>
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
