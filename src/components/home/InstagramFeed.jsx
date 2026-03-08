import { FaInstagram } from 'react-icons/fa';

// Real Looking Placeholders (Unsplash URLs)
const images = [
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80", // Fresh
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=400&q=80", // Strawberry
    "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=400&q=80", // Gift
    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80", // Pineapple
    "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80", // Banana
    "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=400&q=80", // Berries
];

const InstagramFeed = () => {
    return (
        <section className="bg-white py-10"> {/* Top/Bottom Padding Badhai */}
            
            <div className="flex items-center justify-between px-6 mb-6 max-w-[1400px] mx-auto">
                <div className="flex items-center gap-3 text-[#064E3B]">
                    <div className="p-2 bg-green-50 rounded-full">
                        <FaInstagram size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-serif font-bold leading-none">@Fruitify_Official</h2>
                        <p className="text-xs text-gray-500 mt-1">Follow us for fresh updates</p>
                    </div>
                </div>
                <button className="px-5 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-700 uppercase hover:bg-[#064E3B] hover:text-white hover:border-[#064E3B] transition-all">
                    Follow Us
                </button>
            </div>
            
            {/* Added Padding (px-4) and Gap (gap-4) for separation */}
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {images.map((img, i) => (
                        <div key={i} className="relative group overflow-hidden cursor-pointer h-48 md:h-56 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <img 
                                src={img} 
                                alt="Insta Feed" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            {/* Overlay with Icon */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <FaInstagram size={32} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;