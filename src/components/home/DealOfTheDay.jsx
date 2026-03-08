import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward, MdLocalOffer } from 'react-icons/md';
import { fetchActiveCampaign, getImageUrl } from '../../services/api';

const DealOfTheDay = () => {
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const loadCampaign = async () => {
            try {
                const data = await fetchActiveCampaign();
                if (Array.isArray(data) && data.length > 0) {
                const featured = data.find(c => c.is_featured === 1);
                setCampaign(featured || data[0]); 
            } 
            else if (data && !Array.isArray(data)) {
                setCampaign(data);
            }
            } catch (err) {
                console.error("Deal fetching error:", err);
            }
        };
        loadCampaign();
    }, []);

    useEffect(() => {
        if (!campaign || !campaign.end_date) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(campaign.end_date).getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [campaign]);

    const handleGrabDeal = () => {
        if (campaign?.slug) {
            navigate(`/campaign/${campaign.slug}`);
        }
    };

    if (!campaign) return null;

    // 🔥 Balanced Gradient & Background
    const bannerStyle = {
        backgroundImage: `linear-gradient(to right, rgba(255, 248, 240, 1) 35%, rgba(255, 248, 240, 0) 100%), url(${getImageUrl(campaign.banner_image)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
    };

    return (
        <section 
            style={bannerStyle}
            className="rounded-3xl overflow-hidden shadow-lg border border-orange-100 my-6 relative max-w-[1536px] mx-auto min-h-[280px] md:min-h-[320px] flex items-center transition-all duration-300"
        >
            <div className="relative z-10 p-6 md:p-12 w-full md:w-3/5 lg:w-1/2 text-left">
                {/* Badge - Standardized */}
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold mb-4 tracking-wider uppercase shadow-md">
                    <MdLocalOffer size={14} /> Today's Exclusive Offer
                </div>

                {/* Title - Bold & Balanced */}
                <h2 className="text-2xl md:text-4xl font-serif font-black text-[#064E3B] mb-2 leading-tight drop-shadow-sm">
                    {campaign.name}
                </h2>

                {/* Subtitle - Readable */}
                <div className="text-gray-700 mb-6 text-sm md:text-lg font-semibold max-w-md">
                   {campaign.subtitle}
                </div>

                {/* 🔥 Standard Timer UI - More Visible */}
                <div className="flex gap-3 mb-8">
                    {[
                        { label: 'Days', val: timeLeft.days },
                        { label: 'Hours', val: timeLeft.hours },
                        { label: 'Mins', val: timeLeft.minutes },
                        { label: 'Secs', val: timeLeft.seconds }
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm border-2 border-[#064E3B]/5 rounded-2xl flex items-center justify-center text-lg md:text-2xl font-black text-[#064E3B] shadow-lg">
                                {item.val.toString().padStart(2, '0')}
                            </div>
                            <span className="text-[9px] md:text-[10px] text-[#064E3B] mt-2 block uppercase font-black tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Action Button - Premium Feel */}
                <button
                    onClick={handleGrabDeal}
                    className="bg-[#064E3B] hover:bg-[#053d2e] text-white px-8 py-3 rounded-2xl text-sm font-black shadow-xl transition-all flex items-center gap-3 group active:scale-95"
                >
                    GRAB THIS DEAL <MdArrowForward size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default DealOfTheDay;