import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp,
    FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaChevronRight
} from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcApplePay, FaCcAmex } from 'react-icons/fa'; // Payment Icons

const Footer = () => {
    return (
        <footer className="bg-[#064E3B] text-white pt-16 pb-8 font-sans text-sm relative border-t-4 border-yellow-400">

            {/* Background Texture (Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="w-[95%] max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 relative z-10">

                {/* Brand Info */}
                <div className="space-y-5">
                    <h2 className="text-3xl font-serif font-bold text-yellow-400 flex items-center gap-2">
                        <span>🍏</span> Fruityfy.
                    </h2>
                    <p className="text-green-100 text-sm leading-relaxed max-w-xs opacity-90">
                        Delivering nature's finest, freshest organic fruits directly from selected farms to your doorstep in Dubai & Abu Dhabi.
                    </p>

                    {/* Social Icons with Hover Effect */}
                    <div className="flex gap-3">
                        {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-9 h-9 border border-green-600 bg-[#053d2e] hover:bg-yellow-400 hover:text-[#064E3B] hover:border-yellow-400 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm group">
                                <Icon size={16} className="group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Shop */}
                <div>
                    <h3 className="font-bold text-yellow-400 mb-5 uppercase text-xs tracking-widest">Shop Categories</h3>
                    <ul className="space-y-3">
                        {['Fresh Fruits', 'Fruit Baskets', 'Exotic Imports', 'Dry Fruits', 'Gifts & Combos'].map((item, i) => (
                            <li key={i}>
                                <Link to="/shop" className="text-green-100 hover:text-yellow-400 transition-all flex items-center gap-2 group">
                                    <FaChevronRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-yellow-400" />
                                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h3 className="font-bold text-yellow-400 mb-5 uppercase text-xs tracking-widest">Customer Care</h3>
                    <ul className="space-y-3">
                        {['About Us', 'Contact Support', 'Shipping Policy', 'Terms of Service', 'Privacy Policy'].map((item, i) => (
                            <li key={i}>
                                <Link to="/about" className="text-green-100 hover:text-yellow-400 transition-all flex items-center gap-2 group">
                                    <FaChevronRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-yellow-400" />
                                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-bold text-yellow-400 mb-5 uppercase text-xs tracking-widest">Get In Touch</h3>
                    <ul className="space-y-4 text-green-100">
                        <li className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <FaMapMarkerAlt size={14} />
                            </div>
                            <span className="text-sm leading-relaxed">
                                Business Bay, Fruit Market Center,<br />
                                Dubai, UAE
                            </span>
                        </li>

                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <FaPhoneAlt size={14} />
                            </div>
                            <span className="text-sm font-semibold">+971 50 123 4567</span>
                        </li>

                        {/* EMAIL – NEW */}
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <FaEnvelope size={14} />
                            </div>
                            <a
                                href="mailto:support@fruityfy.com"
                                className="text-sm hover:text-yellow-400 transition-colors"
                            >
                                support@fruityfy.com
                            </a>
                        </li>

                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 hover:bg-[#25D366] transition-colors">
                                <FaWhatsapp size={16} />
                            </div>
                            <a
                                href="https://wa.me/971501234567"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm hover:text-[#25D366]"
                            >
                                Chat on WhatsApp
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-800/50 pt-6 relative z-10">
                <div className="w-[95%] max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-green-200/60">
                        © 2026 <span className="text-yellow-400 font-bold">Fruityfy</span>. All rights reserved.
                    </p>

                    {/* Payment Icons */}
                    <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                        <span className="text-[10px] uppercase text-green-300 font-bold tracking-wider mr-2">We Accept</span>
                        <FaCcVisa size={32} className="text-white" />
                        <FaCcMastercard size={32} className="text-white" />
                        <FaCcAmex size={32} className="text-white" />
                        <FaCcApplePay size={32} className="text-white" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;