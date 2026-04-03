import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp,
    FaPhoneAlt, FaMapMarkerAlt, FaChevronRight, FaChevronLeft
} from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcApplePay, FaCcAmex } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logoImg from '../../assets/logo.png';

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
        <footer className="bg-[#064E3B] text-white pt-12 pb-8 border-t-4 border-yellow-400">

            <div className="w-[92%] max-w-[1280px] mx-auto">

                {/* MAIN GRID */}
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 ${isRTL ? 'text-right' : 'text-left'}`}>

                    {/* LOGO SECTION */}
                    <div className="space-y-4">
                        <Link to="/">
                            <img
                                src={logoImg}
                                alt="Fruitify Logo"
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </Link>

                        <p className="text-green-100 text-sm leading-relaxed opacity-80">
                            {t('footer.about')}
                        </p>

                        <div className="flex gap-3">
                            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                                <div
                                    key={i}
                                    className="w-9 h-9 bg-white/10 hover:bg-yellow-400 hover:text-[#064E3B] rounded-lg flex items-center justify-center cursor-pointer transition"
                                >
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SHOP */}
                    <div>
                        <h3 className="text-yellow-400 font-semibold mb-4 text-sm uppercase">
                            {t('footer.shop_title')}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {shopLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="hover:text-yellow-400 flex items-center gap-2">
                                        {isRTL ? <FaChevronLeft size={10}/> : <FaChevronRight size={10}/>}
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CUSTOMER CARE */}
                    <div>
                        <h3 className="text-yellow-400 font-semibold mb-4 text-sm uppercase">
                            {t('footer.care_title')}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {supportLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="hover:text-yellow-400 flex items-center gap-2">
                                        {isRTL ? <FaChevronLeft size={10}/> : <FaChevronRight size={10}/>}
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="space-y-4 text-sm">
                        <h3 className="text-yellow-400 font-semibold mb-4 uppercase">
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
                <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

                    <p className="text-green-200/70">
                        © 2026 <span className="text-yellow-400 font-semibold">Fruitify</span>. {t('footer.rights')}
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-green-300">WE ACCEPT</span>
                        <FaCcVisa size={22} />
                        <FaCcMastercard size={22} />
                        <FaCcAmex size={22} />
                        <FaCcApplePay size={22} />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;