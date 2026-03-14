import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp,
    FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaChevronRight, FaChevronLeft
} from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcApplePay, FaCcAmex } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const shopLinks = [
        { name: t('footer.links.fresh_fruits'), path: '/shop' },
        { name: t('footer.links.fruit_baskets'), path: '/shop' },
        { name: t('footer.links.exotic_imports'), path: '/shop' },
        { name: t('footer.links.dry_fruits'), path: '/shop' },
        { name: t('footer.links.gifts'), path: '/shop' }
    ];

    const supportLinks = [
        { name: t('footer.links.about_us'), path: '/about' },
        { name: t('footer.links.contact'), path: '/contact' },
        { name: t('footer.links.shipping'), path: '/shipping-policy' },
        { name: t('footer.links.terms'), path: '/terms' },
        { name: t('footer.links.privacy'), path: '/privacy' }
    ];

    return (
        <footer className={`bg-[#064E3B] text-white pt-16 pb-8 font-sans text-sm relative border-t-4 border-yellow-400 overflow-hidden`}>
            {/* Subtle Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className={`w-[92%] max-w-[1280px] mx-auto relative z-10`}>
                <div className={`flex flex-col md:flex-row gap-10 md:gap-4 justify-between ${isRTL ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
                    
                    {/* 1. Brand Info (Logo Section) */}
                    <div className="md:w-[25%] space-y-5">
                        <h2 className={`text-3xl font-serif font-bold text-yellow-400 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>🍏</span> Fruitify.
                        </h2>
                        <p className={`text-green-100 leading-relaxed opacity-90 ${isRTL ? 'pl-4' : 'pr-4'}`}>
                            {t('footer.about')}
                        </p>
                        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse justify-start' : ''}`}>
                            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 border border-green-600 bg-[#053d2e] hover:bg-yellow-400 hover:text-[#064E3B] rounded-lg flex items-center justify-center transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Shop Categories */}
                    <div className="md:w-[20%]">
                        <h3 className="font-bold text-yellow-400 mb-6 uppercase text-xs tracking-widest">{t('footer.shop_title')}</h3>
                        <ul className="space-y-3">
                            {shopLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className={`text-green-100 hover:text-yellow-400 transition-all flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        {isRTL ? <FaChevronLeft size={10} className="text-yellow-400" /> : <FaChevronRight size={10} className="text-yellow-400" />}
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Customer Care */}
                    <div className="md:w-[20%]">
                        <h3 className="font-bold text-yellow-400 mb-6 uppercase text-xs tracking-widest">{t('footer.care_title')}</h3>
                        <ul className="space-y-3">
                            {supportLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className={`text-green-100 hover:text-yellow-400 transition-all flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        {isRTL ? <FaChevronLeft size={10} className="text-yellow-400" /> : <FaChevronRight size={10} className="text-yellow-400" />}
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Contact Info */}
                    <div className="md:w-[25%] space-y-4">
                        <h3 className="font-bold text-yellow-400 mb-6 uppercase text-xs tracking-widest">{t('footer.get_in_touch')}</h3>
                        <ul className="space-y-4 text-green-100">
                            <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1"><FaMapMarkerAlt size={14} /></div>
                                <span className="leading-relaxed flex-1">{t('footer.address')}</span>
                            </li>
                            <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><FaPhoneAlt size={14} /></div>
                                <span className="font-semibold dir-ltr" style={{ direction: 'ltr' }}>+971 50 123 4567</span>
                            </li>
                            <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 hover:bg-[#25D366] transition-colors"><FaWhatsapp size={16} /></div>
                                <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" className="hover:text-[#25D366]">{t('footer.whatsapp')}</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-800/50 mt-12 pt-8 relative z-10">
                <div className={`w-[92%] max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                    <p className="text-xs text-green-200/60">
                        © 2026 <span className="text-yellow-400 font-bold">Fruitify</span>. {t('footer.rights')}
                    </p>
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[10px] uppercase text-green-300 font-black tracking-widest">{t('footer.accept')}</span>
                        <div className="flex gap-2 bg-white/5 p-2 rounded-xl border border-white/5" style={{ direction: 'ltr' }}>
                            <FaCcVisa size={24} /> <FaCcMastercard size={24} /> <FaCcAmex size={24} /> <FaCcApplePay size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;