import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdGavel, MdVerifiedUser, MdInfoOutline } from 'react-icons/md';

const Terms = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const sections = [
        { title: t('terms.section1_title'), desc: t('terms.section1_desc') },
        { title: t('terms.section2_title'), desc: t('terms.section2_desc') },
        { title: t('terms.section3_title'), desc: t('terms.section3_desc') },
        { title: t('terms.section4_title'), desc: t('terms.section4_desc') }
    ];

    return (
        <div className={`min-h-screen bg-[#F8FAFA] ${isRTL ? 'text-right' : 'text-left'}`}>
            
            {/* Minimalist Header */}
            <div className="bg-white border-b border-gray-100 pt-10 pb-16 px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                        <MdGavel className="text-[#064E3B] text-3xl" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#064E3B] mb-4 text-center">
                        {t('terms.title')}
                    </h1>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold">
                        {isRTL ? "آخر تحديث: مارس ٢٠٢٦" : "Last Updated: March 2026"}
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-16 relative overflow-hidden">
                    
                    {/* Welcome Text */}
                    <div className={`flex items-start gap-4 mb-12 p-6 bg-yellow-50 rounded-3xl border border-yellow-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MdInfoOutline className="text-yellow-600 text-2xl shrink-0 mt-1" />
                        <p className="text-yellow-800 font-medium leading-relaxed italic">
                            {t('terms.intro')}
                        </p>
                    </div>

                    {/* Policy Sections */}
                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <div key={index} className="group">
                                <h3 className={`text-xl md:text-2xl font-serif font-bold text-[#064E3B] mb-4 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span className="w-8 h-8 bg-[#064E3B] text-white text-xs rounded-full flex items-center justify-center font-sans group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    {section.title}
                                </h3>
                                <p className={`text-gray-600 leading-relaxed text-lg ${isRTL ? 'mr-11' : 'ml-11'}`}>
                                    {section.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Trust Footer */}
                    <div className="mt-20 pt-10 border-t border-gray-50 flex flex-col items-center gap-4">
                        <MdVerifiedUser className="text-green-500 text-4xl opacity-20" />
                        <p className="text-gray-400 text-sm text-center">
                            {isRTL 
                                ? "شكراً لاختيارك فروتيفاي. نحن نقدر ثقتكم بنا." 
                                : "Thank you for choosing Fruitify. We value your trust and business."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;