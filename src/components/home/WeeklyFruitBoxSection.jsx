import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// Icons & Toasts
import { MdAdd, MdRemove, MdShoppingCart } from "react-icons/md";
import { Check, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

// Contexts & Helpers (Based on your ProductCard reference)
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

const IMAGE_BASE = "http://localhost:5000";

const FruitBundleSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ⭐ Using your Cart Context
  const { formatPrice } = useSettings(); // ⭐ Using your Price Formatter
  
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartQtys, setCartQtys] = useState({}); 
  const [addedIds, setAddedIds] = useState({}); // Tracking which bundles were just added

  useEffect(() => {
    const loadBoxes = async () => {
      try {
        const res = await api.get("/weeklyBox");
        if (res.data?.success) {
          setBoxes(res.data.data || []);
          const initialQtys = {};
          res.data.data.forEach(box => { initialQtys[box.id] = 1; });
          setCartQtys(initialQtys);
        }
      } catch (err) {
        console.error("Bundles load failed", err);
      } finally {
        setLoading(false);
      }
    };
    loadBoxes();
  }, []);

  const handleQtyChange = (e, id, delta) => {
    e.stopPropagation(); // Card click event stop karne ke liye
    setCartQtys(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  /* ================= ADD TO CART LOGIC ================= */
  const handleAddToCart = (e, box) => {
    e.stopPropagation(); // Details page par jane se rokne ke liye
    
    const qty = cartQtys[box.id] || 1;

    // Mapping bundle to cart structure
    // ⭐ 'weekly_box_id' pass kar rahe hain orderController ke liye
    addToCart(
      {
        ...box,
        name: box.title, // 'product_name' mapping
        weekly_box_id: box.id, 
        product_id: null, // Combo items don't have a single product_id
        price: Number(box.price),
        bundle_items: box.products || []
      },
      qty
    );

    toast.success(`${qty} x ${box.title} added to cart! 🛒`, {
        position: "bottom-right",
        autoClose: 2000,
    });

    // Button Animation
    setAddedIds(prev => ({ ...prev, [box.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [box.id]: false })), 1500);
  };

  if (loading) return null;

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="text-[#eab308] font-bold text-xs tracking-widest uppercase block">
            Premium Value Combos
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B]">
            Fruitify Variety Bundles
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Get the best market value with our curated fruit combinations. 
            Hand-picked freshness, delivered directly to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boxes.map(box => {
            const mktVal = Number(box.market_value || 0);
            const sellPrice = Number(box.price || 0);
            const savePercent = mktVal > sellPrice ? Math.round(((mktVal - sellPrice) / mktVal) * 100) : 0;
            const currentQty = cartQtys[box.id] || 1;
            const isAdded = addedIds[box.id];

            return (
              <div 
                key={box.id} 
                onClick={() => navigate(`/weeklyboxes/${box.slug || box.id}`)}
                className="group bg-white rounded-3xl shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden relative border border-gray-100 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {savePercent > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                        -{savePercent}%
                    </span>
                    )}
                    {box.is_popular === 1 && (
                    <span className="bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase">
                        Bestseller
                    </span>
                    )}
                </div>

                {/* Image Section */}
                <div className="relative w-full h-56 bg-cream/30 overflow-hidden">
                    <img 
                        src={box.image ? IMAGE_BASE + box.image : "/placeholder/weekly-box.jpg"} 
                        alt={box.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-serif font-bold text-[#064E3B] leading-tight line-clamp-1">
                        {box.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 italic">{box.subtitle}</p>
                    <p className="text-[10px] font-bold text-primaryLight uppercase mt-2">🚚 Hand-picked Freshness</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                    {/* Pricing */}
                    <div className="flex flex-col">
                        {mktVal > sellPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                {formatPrice(mktVal)}
                            </span>
                        )}
                        <span className="text-2xl font-black text-primary">
                            {formatPrice(sellPrice)}
                        </span>
                    </div>

                    {/* Quantity Controls & Add Button */}
                    <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 border border-gray-100">
                            <button 
                                onClick={(e) => handleQtyChange(e, box.id, -1)}
                                className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
                            >
                                <MdRemove size={14} />
                            </button>
                            <span className="font-bold text-sm text-primary w-4 text-center">{currentQty}</span>
                            <button 
                                onClick={(e) => handleQtyChange(e, box.id, 1)}
                                className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
                            >
                                <MdAdd size={14} />
                            </button>
                        </div>

                        <button 
                            onClick={(e) => handleAddToCart(e, box)}
                            className={`
                                h-10 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-md
                                ${isAdded ? 'bg-primary text-white scale-105' : 'bg-primary text-white hover:bg-primaryLight hover:shadow-lg'}
                            `}
                        >
                            {isAdded ? (
                                <><Check size={16} /><span className="text-xs font-bold uppercase">Added</span></>
                            ) : (
                                <><Plus size={18} strokeWidth={3} /><span className="text-xs font-bold uppercase tracking-wider">Add</span></>
                            )}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {boxes.length > 3 && (
            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/weeklyboxes")}
                    className="px-10 py-3 border-2 border-primary text-primary font-black rounded-full hover:bg-primary hover:text-white transition-all uppercase text-xs tracking-widest shadow-soft hover:shadow-lg"
                >
                    View All {boxes.length} Bundles
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default FruitBundleSection;