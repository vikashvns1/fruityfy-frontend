import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp,
    FaPhoneAlt, FaMapMarkerAlt, FaChevronRight, FaChevronLeft
} from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcApplePay, FaCcAmex } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logoImg from '../../assets/footerlogo.png';

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
        <footer className="bg-gradient-to-b from-[#064E3B] to-[#022c22] text-white pt-14 pb-8 border-t-4 border-yellow-400">

            <div className="w-[92%] max-w-[1280px] mx-auto">

                {/* MAIN GRID */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>

                    {/* 🔥 COLUMN 1 - LOGO */}
                    <div className="flex items-start">
                        <div className="relative">

                            <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-full scale-125"></div>

                            <img
                                src={logoImg}
                                alt="Fruitify Logo"
                                className="relative h-32 md:h-36 lg:h-40 object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* 🟢 COLUMN 2 - ABOUT + SOCIAL */}
                    <div className="space-y-5">

                        <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                            About Fruitify
                        </h3>

                        <p className="text-green-100 text-sm leading-relaxed opacity-80">
                            {t('footer.about')}
                        </p>

                        <div className="flex gap-3">
                            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 bg-white/10 hover:bg-yellow-400 hover:text-[#064E3B] rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-md"
                                >
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 🟡 SHOP */}
                    <div>
                        <h3 className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">
                            {t('footer.shop_title')}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {shopLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="hover:text-yellow-400 flex items-center gap-2">
                                        {isRTL ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 🟡 CUSTOMER CARE */}
                    <div>
                        <h3 className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">
                            {t('footer.care_title')}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {supportLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="hover:text-yellow-400 flex items-center gap-2">
                                        {isRTL ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 🟡 CONTACT */}
                    <div className="space-y-4 text-sm">
                        <h3 className="text-yellow-400 font-semibold mb-4 uppercase tracking-wider">
                            {t('footer.get_in_touch')}
                        </h3>

                        <div className="flex gap-3">
                            <FaMapMarkerAlt />
                            <span>{t('footer.address')}</span>
                        </div>

                        <div className="flex gap-3">
                            <FaPhoneAlt />
                            <span>+971 50 123 4567</span>
                        </div>

                        <div className="flex gap-3 items-center">
                            <FaWhatsapp />
                            <span className="hover:text-[#25D366] cursor-pointer">
                                {t('footer.whatsapp')}
                            </span>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-green-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

                    <p className="text-green-200/70">
                        © 2026 <span className="text-yellow-400 font-semibold">Fruitify</span>. {t('footer.rights')}
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-green-300">WE ACCEPT</span>
                        <FaCcVisa size={24} />
                        <FaCcMastercard size={24} />
                        <FaCcAmex size={24} />
                        <FaCcApplePay size={24} />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;