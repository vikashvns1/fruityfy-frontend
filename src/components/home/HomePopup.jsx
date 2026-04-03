// import { useState, useEffect } from 'react';
// import { MdClose } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import { fetchActivePopup, getImageUrl } from '../../services/api';
// import { useSettings } from '../../context/SettingsContext'; // <--- Import Settings Context

// const HomePopup = () => {
//     const [popup, setPopup] = useState(null);
//     const [isVisible, setIsVisible] = useState(false);
//     const navigate = useNavigate();
    
//     // 1. Get Global Settings
//     const { settings } = useSettings(); 

//     useEffect(() => {
//         // 2. Logic Check:
//         // - Settings load honi chahiye
//         // - show_popup true (1) hona chahiye
//         // - User ne session me pehle na dekha ho
        
//         const hasSeen = sessionStorage.getItem('hasSeenPopup');

//         if (settings && settings.show_popup === 1 && !hasSeen) {
//             loadPopup();
//         }
//     }, [settings]); // Jab settings load hongi, tab ye chalega

//     const loadPopup = async () => {
//         const result = await fetchActivePopup();
//         if (result.success && result.data) {
//             setPopup(result.data);
//             setTimeout(() => setIsVisible(true), 1000);
//         }
//     };

//     const handleClose = () => {
//         setIsVisible(false);
//         sessionStorage.setItem('hasSeenPopup', 'true');
//     };

//     const handleClick = () => {
//         if (popup.link_url) {
//             handleClose();
//             if (popup.link_url.startsWith('http')) {
//                 window.location.href = popup.link_url;
//             } else {
//                 navigate(popup.link_url);
//             }
//         }
//     };

//     if (!isVisible || !popup) return null;

//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
//             <div className="relative bg-transparent max-w-lg w-full">
//                 <button 
//                     onClick={handleClose}
//                     className="absolute -top-10 right-0 md:-right-10 text-white hover:text-gray-200 transition-colors bg-white/10 rounded-full p-2"
//                 >
//                     <MdClose size={24} />
//                 </button>
//                 <div 
//                     onClick={handleClick}
//                     className={`rounded-xl overflow-hidden shadow-2xl ${popup.link_url ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''}`}
//                 >
//                     <img 
//                         src={getImageUrl(popup.image_url)} 
//                         alt="Special Offer" 
//                         className="w-full h-auto object-contain max-h-[80vh]" 
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePopup;

import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fetchActivePopup, getImageUrl } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import

const HomePopup = () => {
    const [popup, setPopup] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // 2. Initialize translation hook
    
    const isRTL = i18n.language === 'ar'; // 3. RTL Check
    const { settings } = useSettings(); 

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('hasSeenPopup');

        if (settings && settings.show_popup === 1 && !hasSeen) {
            loadPopup();
        }
    }, [settings]);

    const loadPopup = async () => {
        const result = await fetchActivePopup();
        if (result.success && result.data) {
            setPopup(result.data);
            setTimeout(() => setIsVisible(true), 1000);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenPopup', 'true');
    };

    const handleClick = () => {
        if (popup.link_url) {
            handleClose();
            if (popup.link_url.startsWith('http')) {
                window.location.href = popup.link_url;
            } else {
                navigate(popup.link_url);
            }
        }
    };

    if (!isVisible || !popup) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative bg-transparent max-w-lg w-full">
                {/* Close Button - Flipped position for RTL */}
                <button 
                    onClick={handleClose}
                    className={`absolute -top-10 ${isRTL ? 'left-0 md:-left-10' : 'right-0 md:-right-10'} text-white hover:text-gray-200 transition-colors bg-white/10 rounded-full p-2`}
                >
                    <MdClose size={24} />
                </button>
                <div 
                    onClick={handleClick}
                    className={`rounded-xl overflow-hidden shadow-2xl ${popup.link_url ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''}`}
                >
                    <img 
                        src={getImageUrl(isRTL ? (popup.image_url_ar || popup.image_url) : popup.image_url)} 
                        alt={isRTL ? 'عرض خاص' : 'Special Offer'} 
                        className="w-full h-auto object-contain max-h-[80vh]" 
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePopup;