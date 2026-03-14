// import { useState } from 'react';
// import { MdOutlineMarkEmailRead } from 'react-icons/md';
// import { toast } from 'react-toastify';

// const Newsletter = () => {
//     const [email, setEmail] = useState('');

//     const handleSubscribe = (e) => {
//         e.preventDefault();
//         if (!email) return toast.error("Enter email address");
//         toast.success("Subscribed successfully!");
//         setEmail('');
//     };

//     return (
//         // Light Background, Slim Padding
//         <section className="bg-white border-t border-b border-gray-100 py-12">
//             <div className="w-[95%] max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                
//                 {/* Text Content */}
//                 <div className="flex items-center gap-4 text-center md:text-left">
//                     <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#064E3B] shrink-0">
//                         <MdOutlineMarkEmailRead size={24} />
//                     </div>
//                     <div>
//                         <h2 className="text-xl font-bold text-gray-900">Join the Fresh Club</h2>
//                         <p className="text-sm text-gray-500">Get 15% off your first order + fresh updates.</p>
//                     </div>
//                 </div>

//                 {/* Compact Form */}
//                 <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
//                     <input 
//                         type="email" 
//                         placeholder="Your email address" 
//                         className="w-full md:w-80 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#064E3B] text-sm"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <button 
//                         type="submit" 
//                         className="bg-[#064E3B] hover:bg-[#053d2e] text-white px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-sm whitespace-nowrap"
//                     >
//                         Subscribe
//                     </button>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Newsletter;

import { useState } from 'react';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // 1. Import i18n

const Newsletter = () => {
    const { t, i18n } = useTranslation(); // 2. Initialize i18n
    const [email, setEmail] = useState('');
    const isRTL = i18n.language === 'ar';

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return toast.error(isRTL ? "أدخل عنوان البريد الإلكتروني" : "Enter email address");
        toast.success(isRTL ? "تم الاشتراك بنجاح!" : "Subscribed successfully!");
        setEmail('');
    };

    return (
        <section className="bg-white border-t border-b border-gray-100 py-12">
            <div className={`w-[95%] max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Text Content */}
                <div className={`flex items-center gap-4 text-center ${isRTL ? 'md:text-right md:flex-row-reverse' : 'md:text-left'}`}>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#064E3B] shrink-0">
                        <MdOutlineMarkEmailRead size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{t('sections.newsletter_title') || "Join the Fresh Club"}</h2>
                        <p className="text-sm text-gray-500">{t('sections.newsletter_subtitle') || "Get 15% off your first order + fresh updates."}</p>
                    </div>
                </div>

                {/* Compact Form */}
                <form onSubmit={handleSubscribe} className={`flex w-full md:w-auto gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input 
                        type="email" 
                        placeholder={t('cart.coupon_placeholder') || "Your email address"}
                        className={`w-full md:w-80 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#064E3B] text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="bg-[#064E3B] hover:bg-[#053d2e] text-white px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-sm whitespace-nowrap"
                    >
                        {t('sections.newsletter_btn') || "Subscribe"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;