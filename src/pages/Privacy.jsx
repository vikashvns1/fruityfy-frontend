import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdSecurity, MdLockOutline, MdHistory, MdOutlinePrivacyTip, MdMailOutline } from 'react-icons/md';

const Privacy = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const sections = [
        {
            icon: <MdLockOutline />,
            title: t('privacy.data_title'),
            desc: t('privacy.data_desc'),
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            icon: <MdSecurity />,
            title: t('privacy.security_title'),
            desc: t('privacy.security_desc'),
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            icon: <MdHistory />,
            title: t('privacy.cookies_title'),
            desc: t('privacy.cookies_desc'),
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        }
    ];

    return (
        <div className={`min-h-screen bg-[#F8FAFA] ${isRTL ? 'text-right' : 'text-left'}`}>
            
            {/* Header with Icon */}
            <div className="bg-[#064E3B] pt-40 pb-24 px-6 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mt-20 blur-3xl"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="w-20 h-20 bg-[#FACC15] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
                        <MdOutlinePrivacyTip className="text-[#064E3B] text-4xl" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                        {t('privacy.title')}
                    </h1>
                    <p className="text-green-100/60 text-sm font-bold uppercase tracking-widest">
                        {isRTL ? "خصوصيتك هي أولويتنا القصوى" : "Your Security is Our Priority"}
                    </p>
                </div>
            </div>

            {/* Content Cards */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 pb-20 relative z-20">
                <div className="bg-white rounded-[3.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-16 border border-gray-100">
                    
                    {/* Intro Statement */}
                    <div className={`p-8 bg-gray-50 rounded-[2.5rem] mb-16 border border-gray-100 italic text-gray-600 text-lg leading-relaxed ${isRTL ? 'border-r-8 border-r-[#FACC15]' : 'border-l-8 border-l-[#FACC15]'}`}>
                        "{t('privacy.intro')}"
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {sections.map((item, idx) => (
                            <div key={idx} className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#064E3B]">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                        
                        {/* Contact Support Box */}
                        <div className="md:col-span-2 mt-8 p-8 bg-green-50 rounded-[2.5rem] border border-green-100 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#064E3B] shadow-sm shrink-0">
                                <MdMailOutline size={28} />
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h4 className={`text-[#064E3B] font-bold text-lg ${isRTL ? 'md:text-right' : ''}`}>{t('privacy.contact_title')}</h4>
                                <p className={`text-green-700/70 text-sm ${isRTL ? 'md:text-right' : ''}`}>{t('privacy.contact_desc')}</p>
                            </div>
                            <button className="bg-[#064E3B] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#FACC15] hover:text-[#064E3B] transition-all whitespace-nowrap shadow-lg shadow-green-900/10">
                                {isRTL ? "اتصل بنا" : "Contact Us"}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Security Badge */}
                <div className="mt-12 flex justify-center opacity-30">
                    <img src="https://cdn-icons-png.flaticon.com/512/2592/2592225.png" alt="SSL Secure" className="h-16 grayscale" />
                </div>
            </div>
        </div>
    );
};

export default Privacy;