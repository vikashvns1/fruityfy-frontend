import { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa'; // Make sure to npm install react-icons

const FloatingButtons = () => {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 300) setShowTop(true);
            else setShowTop(false);
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
            {/* WhatsApp Button */}
            <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                title="Chat with us"
            >
                <FaWhatsapp size={28} />
            </a>

            {/* Back to Top */}
            <button 
                onClick={scrollToTop}
                className={`bg-[#064E3B] text-white p-3 rounded-full shadow-lg hover:bg-[#053d2e] transition-all transform ${showTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
                <MdKeyboardArrowUp size={28} />
            </button>
        </div>
    );
};

export default FloatingButtons;