import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEmail, MdPhone, MdLocationOn, MdSend } from 'react-icons/md';
import { toast } from 'react-toastify';

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success(t('contact.success_msg'));
            e.target.reset();
        }, 1500);
    };

    return (
        <div className={`min-h-screen pt-10 pb-20 px-6 bg-[#F8FAFA] ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#064E3B] mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className={`bg-white rounded-[3.5rem] shadow-2xl shadow-green-900/5 overflow-hidden flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Left Side: Contact Info */}
                    <div className="bg-[#064E3B] p-10 md:p-16 text-white md:w-2/5 relative overflow-hidden">
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10 space-y-10">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-[#FACC15] mb-4">{t('contact.info_title')}</h2>
                                <p className="text-green-100/70 text-sm">{isRTL ? 'تواصل معنا مباشرة عبر القنوات التالية:' : 'Reach out to us directly through any of these channels:'}</p>
                            </div>

                            <div className="space-y-8">
                                <div className={`flex items-center gap-6 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FACC15] group-hover:text-[#064E3B] transition-all">
                                        <MdEmail className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-300 uppercase font-bold tracking-widest">{isRTL ? 'البريد الإلكتروني' : 'Email Us'}</p>
                                        <p className="text-lg font-medium">support@fruitify.com</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-6 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FACC15] group-hover:text-[#064E3B] transition-all">
                                        <MdPhone className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-300 uppercase font-bold tracking-widest">{isRTL ? 'اتصل بنا' : 'Call Us'}</p>
                                        <p className="text-lg font-medium" dir="ltr">+971 50 123 4567</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-6 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FACC15] group-hover:text-[#064E3B] transition-all">
                                        <MdLocationOn className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-300 uppercase font-bold tracking-widest">{isRTL ? 'موقعنا' : 'Our Office'}</p>
                                        <p className="text-lg font-medium leading-tight">{isRTL ? 'خليج الأعمال، دبي' : 'Business Bay, Dubai'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="p-10 md:p-16 flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{t('contact.form_name')}</label>
                                <input required type="text" className={`w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-[#064E3B] focus:bg-white transition-all ${isRTL ? 'text-right' : ''}`} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{t('contact.form_email')}</label>
                                <input required type="email" className={`w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-[#064E3B] focus:bg-white transition-all ${isRTL ? 'text-right' : ''}`} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{t('contact.form_msg')}</label>
                                <textarea required rows="4" className={`w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-[#064E3B] focus:bg-white transition-all ${isRTL ? 'text-right' : ''}`}></textarea>
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#FACC15] hover:text-[#064E3B] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? '...' : t('contact.form_btn')}
                                <MdSend className={isRTL ? 'rotate-180' : ''} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;