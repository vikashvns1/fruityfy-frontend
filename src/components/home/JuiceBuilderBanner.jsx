import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MdLocalDrink,
    MdAutoFixHigh,
    MdAddShoppingCart,
    MdArrowForward,
    MdChevronLeft,
    MdChevronRight,
    MdBolt,
    MdStars
} from "react-icons/md";
import api, { getImageUrl } from "../../services/api";

const JuiceBuilderBanner = () => {
    const navigate = useNavigate();
    const [featuredJuices, setFeaturedJuices] = useState([]);
    const [standardJuices, setStandardJuices] = useState([]); // Naya state standard juices ke liye
    const [mainBuilderId, setMainBuilderId] = useState(null);
    const scrollRef = useRef(null);
    const standardScrollRef = useRef(null); // Naya ref niche wali strip ke liye

    useEffect(() => {
        api.get("/products?category_id=11").then((res) => {
            if (res.data.success) {
                const allProducts = res.data.data;

                // 1. Featured Templates (Right Side Carousel)
                const builderTemplates = allProducts.filter(p => p.product_type === 'customizable' && p.id !== 81);
                setFeaturedJuices(builderTemplates.slice(0, 5));

                // 2. Standard Juices (Niche wali strip ke liye)
                const standards = allProducts.filter(p => p.product_type === 'simple');
                setStandardJuices(standards);

                if (builderTemplates.length > 0) {
                    setMainBuilderId(builderTemplates[0].id);
                }
            }
        });
    }, []);

    const handleStartMixing = () => {
        if (mainBuilderId) {
            navigate(`/juice-builder/${mainBuilderId}`);
        } else {
            navigate('/juice-builder');
        }
    };

    const scroll = (ref, direction) => {
        const container = ref.current;
        if (!container) return;
        const amount = 300;
        container.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth"
        });
    };

    return (
        <section className="bg-[#F8FAF7] overflow-hidden">
            <div className="max-w-[1536px] mx-auto px-4 lg:px-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[3rem] bg-[#064E3B] p-8 md:p-16 overflow-hidden shadow-2xl border border-white/10">
                    {/* Background Visuals */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                    <div className="grid xl:grid-cols-12 gap-12 items-center relative z-10">
                        {/* LEFT SIDE: CONTENT */}
                        <div className="xl:col-span-5 text-white">
                            <div className="inline-flex items-center gap-2 bg-[#FACC15] text-[#064E3B] px-5 py-1.5 rounded-full text-[12px] font-black uppercase tracking-[2px] mb-8 shadow-xl">
                                <MdBolt className="text-xl animate-bounce" /> Juice Lab Active
                            </div>

                            <h2 className="text-6xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
                                Craft Your <br />
                                <span className="text-[#FACC15] italic relative">Perfect Blend</span>
                            </h2>

                            <p className="text-green-100/70 text-xl max-w-md mb-12 leading-relaxed font-light">
                                Why settle for standard? Use our <span className="text-white font-medium">Digital Mixer</span> to create a juice that matches your mood.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <button onClick={() => navigate("/juice-builder/")} className="group relative bg-[#FACC15] text-[#064E3B] px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 transition-all overflow-hidden">
                                    <span>Start Building</span>
                                    <MdArrowForward size={22} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button onClick={handleStartMixing} className="px-10 py-5 rounded-2xl border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    Explore Classics
                                </button>
                            </div>
                        </div>

                        {/* RIGHT SIDE: PREMIUM CAROUSEL */}
                        <div className="xl:col-span-7 relative pt-10">
                            <div className="absolute -top-10 right-4 flex gap-3 z-30">
                                <button onClick={() => scroll(scrollRef, "left")} className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-[#FACC15] hover:text-[#064E3B] transition-all"><MdChevronLeft size={28} /></button>
                                <button onClick={() => scroll(scrollRef, "right")} className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-[#FACC15] hover:text-[#064E3B] transition-all"><MdChevronRight size={28} /></button>
                            </div>

                            <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-10 snap-x no-scrollbar scroll-smooth px-4">
                                {featuredJuices.map((juice, idx) => (
                                    <div key={juice.id} className="snap-center min-w-[300px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 transition-all hover:bg-white/10 group relative">
                                        <div className="h-48 flex items-center justify-center mb-8 relative">
                                            <img src={getImageUrl(juice.image_url)} alt={juice.name} className="h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6" />
                                        </div>
                                        <h4 className="text-white font-bold text-xl mb-2 group-hover:text-[#FACC15] transition-colors">{juice.name}</h4>
                                        <div className="flex items-center gap-3">
                                            <p className="text-[#FACC15] font-serif text-2xl font-black">₹{juice.price}</p>
                                        </div>
                                        <button onClick={() => navigate(`/juice-builder/${juice.id}`)} className="w-full mt-4 bg-white text-[#064E3B] py-4 rounded-2xl font-black uppercase text-xs tracking-[2px] hover:bg-[#FACC15] transition-all flex items-center justify-center gap-2 shadow-xl">
                                            <MdAutoFixHigh /> Customize Mix
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- NEW SECTION: BOTTOM STRIP FOR STANDARD JUICES --- */}
                    <div className="mt-5 pt-1 border-t border-white/5">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <h3 className="text-[#FACC15] font-bold text-xs uppercase tracking-[3px] mb-1">Direct From Lab</h3>
                                <p className="text-white/30 text-[11px] uppercase tracking-wider">Ready-to-drink fresh classics</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => scroll(standardScrollRef, 'left')} className="text-white/50 hover:text-white"><MdChevronLeft size={30} /></button>
                                <button onClick={() => scroll(standardScrollRef, 'right')} className="text-white/50 hover:text-white"><MdChevronRight size={30} /></button>
                            </div>
                        </div>

                      <div ref={standardScrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-6 px-2">
    {standardJuices.map((juice) => (
        <div 
            key={juice.id} 
            className="min-w-[280px] h-[180px] relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-[2rem] p-4 flex items-center gap-5 
                       hover:bg-white/20 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/10 hover:border-[#FACC15]/40 
                       group cursor-pointer shadow-2xl hover:shadow-[#FACC15]/10"
        >
            {/* Image Section - Thoda bada size */}
            <div className="relative w-24 h-24 bg-gradient-to-t from-black/40 to-black/10 rounded-3xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10 shadow-inner">
                {juice.image_url ? (
                    <img
                        src={getImageUrl(juice.image_url)}
                        alt={juice.name}
                        className="w-[85%] h-[85%] object-contain group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FACC15]/20 to-transparent text-[#FACC15] font-bold text-4xl">
                        {juice.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content Section - Height manage karne ke liye flex-col */}
            <div className="flex flex-col justify-between h-full py-1 flex-1">
                <div>
                    <h5 className="text-white font-bold text-sm tracking-tight line-clamp-1 group-hover:text-[#FACC15] transition-colors">
                        {juice.name}
                    </h5>
                    {/* Short Description - Ab clear dikhega */}
                    <p className="text-white/50 text-[10px] leading-tight mt-1 line-clamp-2 italic font-light">
                        {juice.short_description}
                    </p>
                </div>
                
                <div className="flex flex-col gap-2">
    {/* Price & Discount Section */}
    <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
            {/* New Discounted Price */}
            <span className="text-[#FACC15] font-black text-2xl tracking-tighter leading-none">
                ₹{Math.round(juice.discount_price || juice.price)}
            </span>
            
            {/* Original Price - Now much clearer with a Reddish-Grey strike */}
            {juice.discount_price && parseFloat(juice.discount_price) < parseFloat(juice.price) && (
                <span className="text-white/30 text-xs line-through decoration-red-500/50 font-medium">
                    ₹{juice.price}
                </span>
            )}
        </div>

        {/* Savings Badge - "15% OFF" type look */}
        {juice.discount_price && parseFloat(juice.discount_price) < parseFloat(juice.price) && (
            <span className="text-[9px] text-green-400 font-bold tracking-widest uppercase">
                Save ₹{Math.round(juice.price - juice.discount_price)} OFF
            </span>
        )}
    </div>

    {/* Add Button */}
    <button className="w-fit flex items-center gap-2 px-5 py-2.5 bg-[#FACC15] text-black rounded-xl text-[11px] font-black uppercase tracking-wider shadow-lg shadow-[#FACC15]/20 hover:bg-white hover:scale-105 transition-all active:scale-95">
        <MdAddShoppingCart className="text-sm" /> 
        Add
    </button>
</div>
            </div>

            {/* Labels - Bestseller ya New Arrival */}
            {juice.is_bestseller === 1 && (
                <div className="absolute -top-2 -left-2 bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                    BESTSELLER
                </div>
            )}
            {juice.is_new_arrival === 1 && juice.is_bestseller !== 1 && (
                <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                    NEW
                </div>
            )}
        </div>
    ))}
</div>
                    </div>
                </motion.div>
            </div>

            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </section>
    );
};

export default JuiceBuilderBanner;