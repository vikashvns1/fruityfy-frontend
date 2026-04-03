import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdLocalShipping, MdMap, MdAccessTime, MdPayment } from 'react-icons/md';

const ShippingPolicy = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const policies = [
        {
            id: 1,
            icon: <MdMap className="text-3xl text-[#064E3B]" />,
            title: t('shipping.areas_title'),
            desc: t('shipping.areas_desc'),
            bgColor: 'bg-green-50'
        },
        {
            id: 2,
            icon: <MdPayment className="text-3xl text-yellow-600" />,
            title: t('shipping.charges_title'),
            desc: t('shipping.charges_desc'),
            bgColor: 'bg-yellow-50'
        },
        {
            id: 3,
            icon: <MdAccessTime className="text-3xl text-blue-600" />,
            title: t('shipping.timings_title'),
            desc: t('shipping.timings_desc'),
            bgColor: 'bg-blue-50'
        }
    ];

    return (
        <div className={`min-h-screen bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
            
            {/* Header Section */}
            <div className="bg-[#064E3B] pt-20 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <MdLocalShipping className="text-[#FACC15] text-6xl mx-auto mb-6 animate-bounce" />
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                        {t('shipping.title')}
                    </h1>
                    <div className="h-1.5 w-32 bg-[#FACC15] mx-auto rounded-full"></div>
                </div>
            </div>

            {/* Content Cards */}
            <div className="max-w-5xl mx-auto px-6 -mt-16 pb-20 relative z-20">
                <div className="grid grid-cols-1 gap-8">
                    {policies.map((item) => (
                        <div 
                            key={item.id} 
                            className={`bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row gap-8 items-center hover:scale-[1.01] transition-transform duration-500 ${isRTL ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className={`w-20 h-20 ${item.bgColor} rounded-3xl flex items-center justify-center shrink-0 shadow-inner`}>
                                {item.icon}
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h3 className={`text-2xl font-serif font-bold text-[#064E3B] mb-3 ${isRTL ? 'md:text-right' : ''}`}>
                                    {item.title}
                                </h3>
                                <p className={`text-gray-600 text-lg leading-relaxed ${isRTL ? 'md:text-right' : ''}`}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Trust Note */}
                <div className="mt-16 bg-gray-50 rounded-[2.5rem] p-10 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium italic">
                        {isRTL 
                          ? "نحن نضمن أن يتم توصيل فواكهك بعناية فائقة للحفاظ على جودتها." 
                          : "We ensure your fruits are handled with utmost care to maintain their peak freshness during delivery."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;