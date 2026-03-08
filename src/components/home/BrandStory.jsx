import { FaHeart, FaLeaf, FaQuoteLeft } from 'react-icons/fa';
import { useSettings } from '../../context/SettingsContext'; // Context Import
import { getImageUrl } from '../../services/api';

const BrandStory = () => {
    // 1. Get settings directly from context (no API call here)
    const { settings } = useSettings();
    
    // 3. Default Values (Fallback if admin hasn't set anything)
    const defaults = {
        title: "Our Promise to You",
        text: `To always be your Haven of Health, exceeding expectations with every juicy bite. We strive to be the best, for the smiles we weave into your family's health.\n\nWe understand the emotions you entrust us to handle. Whether it's a "Get Well Soon" hamper or a "Love Surprise", we ensure each delivery whispers an "I Care" like a warm embrace.`,
        img1: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
        img2: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=600&q=80"
    };

    // 4. Prepare Data: Use settings from context or fallback to defaults
    const data = {
        title: settings?.promise_title || defaults.title,
        text: settings?.promise_text || defaults.text,
        img1: getImageUrl(settings?.promise_image_1, defaults.img1),
        img2: getImageUrl(settings?.promise_image_2, defaults.img2)
    };

    return (
        <section className="bg-[#FDFBF7] py-12 border-t border-gray-100 relative overflow-hidden">
            <div className="w-[95%] max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* ================= LEFT IMAGE ================= */}
                <div className="hidden lg:block lg:col-span-3 h-[420px] relative rounded-[2rem] overflow-hidden shadow-md group">
                    <img
                        src={data.img1}
                        alt="Fresh from Farm"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-8">
                        <p className="text-white font-serif font-bold text-lg tracking-wide">
                            Fresh from Farm
                        </p>
                    </div>
                </div>

                {/* ================= CENTER CONTENT ================= */}
                <div className="col-span-1 lg:col-span-6 text-center px-4 md:px-14 relative">

                    {/* ICON */}
                    <div className="flex justify-center mb-6">
                        <span className="bg-white text-[#064E3B] p-4 rounded-full shadow-sm border border-green-50">
                            <FaLeaf size={22} />
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">
                        {data.title}
                    </h2>

                    {/* STORY */}
                    <div className="relative">
                        <FaQuoteLeft className="absolute -top-8 -left-6 text-green-100 opacity-40 text-6xl -z-10" />

                        <div className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg font-light whitespace-pre-line">
                            {/* whitespace-pre-line ensures new lines from the admin panel text area are respected */}
                            {data.text}
                        </div>
                    </div>

                    {/* SIGNATURE */}
                    <div className="mt-10 flex flex-col items-center gap-2">
                        <FaHeart className="text-red-500 text-sm animate-pulse" />

                        <p
                            className="text-3xl text-[#064E3B] opacity-80"
                            style={{
                                fontFamily: '"Brush Script MT", "Pacifico", cursive',
                            }}
                        >
                            Fruitify Team
                        </p>

                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                            Delivering Care & Love
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT IMAGE ================= */}
                <div className="hidden lg:block lg:col-span-3 h-[420px] relative rounded-[2rem] overflow-hidden shadow-md group">
                    <img
                        src={data.img2}
                        alt="Delivered with Love"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-8">
                        <p className="text-white font-serif font-bold text-lg tracking-wide">
                            Delivered with Love
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;