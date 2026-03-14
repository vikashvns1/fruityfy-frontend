import React from 'react';
import { useTranslation } from 'react-i18next';
// Icons fixed for react-icons/md
import { MdCheckCircle, MdOutlineAgriculture, MdOutlineSentimentSatisfiedAlt } from 'react-icons/md';

const About = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className={`min-h-screen bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* --- Hero Header --- */}
            <div className="bg-[#064E3B] pt-20 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                        {t('about.title')} – <span className="text-[#FACC15]">{t('about.brand')}</span>
                    </h1>
                    <div className="h-1 w-24 bg-[#FACC15] mx-auto rounded-full"></div>
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className={`flex flex-col lg:flex-row gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="lg:w-1/2 space-y-6">
                        <p className={`text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic border-[#FACC15] py-2 ${isRTL ? 'border-r-4 pr-6' : 'border-l-4 pl-6'}`}>
                            {t('about.p1')}
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {t('about.p2')}
                        </p>
                        
                        <div className="pt-6">
                            <h3 className="text-2xl font-serif font-black text-[#064E3B] uppercase tracking-wider">
                                {t('about.brand')} – <span className="text-[#FACC15]">{t('about.tagline')}</span>
                            </h3>
                        </div>
                    </div>

                    {/* --- Visual Elements (Cards) --- */}
                    <div className="lg:w-1/2 w-full grid grid-cols-1 gap-6">
                        {/* Farm Fresh Card */}
                        <div className={`bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex items-start gap-5 hover:shadow-xl transition-shadow duration-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                                <MdOutlineAgriculture className="text-[#064E3B] text-3xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#064E3B] text-xl mb-1">{t('about.feature1_title')}</h4>
                                <p className="text-sm text-gray-500">{t('about.feature1_desc')}</p>
                            </div>
                        </div>

                        {/* Quality Card */}
                        <div className={`bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex items-start gap-5 hover:shadow-xl transition-shadow duration-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center shrink-0">
                                <MdCheckCircle className="text-yellow-600 text-3xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#064E3B] text-xl mb-1">{t('about.feature2_title')}</h4>
                                <p className="text-sm text-gray-500">{t('about.feature2_desc')}</p>
                            </div>
                        </div>

                        {/* Trust Card */}
                        <div className={`bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex items-start gap-5 hover:shadow-xl transition-shadow duration-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                                <MdOutlineSentimentSatisfiedAlt className="text-blue-600 text-3xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#064E3B] text-xl mb-1">{t('about.feature3_title')}</h4>
                                <p className="text-sm text-gray-500">{t('about.feature3_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Bottom Marquee Style Banner --- */}
            <div className="bg-gray-50 py-10 overflow-hidden whitespace-nowrap">
                <div className="flex gap-10 animate-marquee text-[#064E3B]/10 text-6xl font-black uppercase italic">
                    <span>{isRTL ? 'حياة صحية' : 'Healthy Living'}</span>
                    <span>•</span>
                    <span>{isRTL ? 'طعام طازج' : 'Fresh Food'}</span>
                    <span>•</span>
                    <span>{isRTL ? 'ثقة' : 'Trust'}</span>
                    <span>•</span>
                    <span>{isRTL ? 'طبيعة' : 'Nature'}</span>
                </div>
            </div>
        </div>
    );
};

export default About;