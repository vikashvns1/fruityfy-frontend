import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward, MdLocalOffer } from 'react-icons/md';
import { fetchActiveCampaign, getImageUrl } from '../../services/api'; // <--- IMPORTS

const DealOfTheDay = () => {
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // 1. Fetch Campaign using Service (No direct axios/api call here)
    useEffect(() => {
        const loadCampaign = async () => {
            const data = await fetchActiveCampaign();
            setCampaign(data);
        };
        loadCampaign();
    }, []);

    // 2. Timer Logic
    useEffect(() => {
        if (!campaign) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(campaign.end_date).getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [campaign]);

    // 3. Smart Navigation Handler
    const handleGrabDeal = () => {
        if (!campaign?.slug) return;
        navigate(`/campaign/${campaign.slug}`);
    };



    if (!campaign) return null;

    return (
        <section className="bg-[#FFF8F0] rounded-xl overflow-hidden shadow-sm border border-orange-100 my-6 relative max-w-[1536px] mx-auto px-0">
            <div className="flex flex-col md:flex-row items-center h-auto md:h-[280px]">

                {/* LEFT: Text Content */}
                <div className="p-6 md:p-8 flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold mb-3 tracking-wide uppercase">
                        <MdLocalOffer size={12} /> Today's Exclusive
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                        {campaign.name}
                    </h2>

                    <p className="text-gray-600 mb-5 text-sm md:text-base font-medium">
                        {/* Subtitle with formatting */}
                        {campaign.subtitle ? (
                            campaign.subtitle.split(/(% OFF)/i).map((part, index) =>
                                part.match(/% OFF/i) ? (
                                    <span key={index} className="text-red-600 font-bold">{part}</span>
                                ) : (
                                    <span key={index}>{part}</span>
                                )
                            )
                        ) : "Get amazing discounts on premium items."}
                    </p>

                    {/* Timer */}
                    <div className="flex gap-3 justify-center md:justify-start mb-6">
                        {['Hours', 'Mins', 'Secs'].map((label, idx) => {
                            const val = idx === 0 ? timeLeft.hours : idx === 1 ? timeLeft.minutes : timeLeft.seconds;
                            return (
                                <div key={label} className="text-center">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-[#064E3B] shadow-sm">
                                        {val.toString().padStart(2, '0')}
                                    </div>
                                    <span className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-wider">{label}</span>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleGrabDeal}
                        className="bg-[#064E3B] hover:bg-[#053d2e] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2 mx-auto md:mx-0 group"
                    >
                        Grab Deal <MdArrowForward size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* RIGHT: Image (Using Helper) */}
                <div className="w-full md:w-1/2 h-48 md:h-full relative">
                    <img
                        // Using helper function from api.js
                        src={getImageUrl(campaign.banner_image, "https://via.placeholder.com/800x600?text=Offer")}
                        alt={campaign.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=800&auto=format&fit=crop" }}
                        onClick={() => {
                            if (isCampaignActive) {
                                navigate(`/campaign/${campaign.slug}`);
                            } else {
                                navigate(`/product/${product.slug}`);
                            }
                        }}

                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-transparent to-transparent md:bg-gradient-to-r md:from-[#FFF8F0] md:via-transparent md:to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;