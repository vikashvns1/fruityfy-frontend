import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate add kiya
import { getWeeklyBoxes, getWeeklyBoxBySlug } from "../services/api";
import WeeklyBoxSidebar from "../components/weeklyBoxes/WeeklyBoxSidebar";
import { MdAdd, MdRemove, MdShoppingCart, MdVerified, MdStars } from "react-icons/md";
import { toast } from 'react-toastify';

// ⭐ Contexts Import
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

const IMAGE_BASE = "http://localhost:5000";

const WeeklyBoxLanding = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ⭐ Cart Context
  const { formatPrice } = useSettings(); // ⭐ Settings Context
  
  const [boxes, setBoxes] = useState([]);
  const [activeBox, setActiveBox] = useState(null);
  const [orderQty, setOrderQty] = useState(1);

  useEffect(() => {
    getWeeklyBoxes().then(res => {
      if (res.data.success) {
        setBoxes(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!slug) return;
    getWeeklyBoxBySlug(slug).then(res => {
      if (res.data.success) {
        setActiveBox(res.data.data);
      }
    });
  }, [slug]);

  /* ================= 🔥 ADD TO CART HANDLER ================= */
  const handleAddToCart = () => {
    if (!activeBox) return;

    addToCart(
      {
        ...activeBox,
        name: activeBox.title, // 'product_name' mapping
        weekly_box_id: activeBox.id, 
        product_id: null, // Combo items don't have a single product_id
        price: Number(activeBox.price),
        bundle_items: activeBox.products || [] // ⭐ Contents ko cart summary ke liye bhej rahe hain
      },
      orderQty
    );

    toast.success(`${orderQty} x ${activeBox.title} added to cart! 🛒`, {
        position: "bottom-right",
        autoClose: 2000,
    });
  };

  if (!activeBox) return null;

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 py-10 px-4">
      {/* SIDEBAR */}
      <div className="md:col-span-1">
        <WeeklyBoxSidebar boxes={boxes} />
      </div>

      {/* MAIN CONTENT */}
      <div className="md:col-span-3 bg-white rounded-3xl p-4 md:p-8 border shadow-sm">

        {/* BANNER SECTION */}
        <div className="relative mb-6 group">
          <img
            src={activeBox.image ? IMAGE_BASE + activeBox.image : "/placeholder/weekly-box.jpg"}
            className="w-full h-[260px] object-cover rounded-3xl shadow-lg transition-transform duration-700 group-hover:scale-[1.01]"
            alt={activeBox.title}
          />

          <div className="absolute top-4 right-4 bg-yellow-400 text-black p-3 rounded-xl shadow-lg flex flex-col items-center justify-center border-2 border-white animate-bounce">
            <span className="text-[9px] font-black uppercase tracking-tighter">Instant Saving</span>
            <span className="text-xl font-black italic leading-none">AED {activeBox.savings_amount?.toFixed(0)}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl">
            <div className="flex items-center gap-1.5 text-yellow-400 mb-1.5">
              <MdStars size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Premium Collection</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">{activeBox.title}</h1>
          </div>
        </div>

        {/* PRICING & DESCRIPTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white border border-slate-100 p-5 md:p-6 rounded-2xl shadow-sm">
          <div className="text-center md:text-left space-y-1">
            <p className="text-base text-[#064E3B] font-semibold italic">{activeBox.subtitle}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest justify-center md:justify-start">
              <MdVerified className="text-blue-500" size={14} />
              <span>{activeBox.fruit_range}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Market Value</p>
              <p className="text-sm text-slate-400 font-bold line-through">{formatPrice(activeBox.market_value)}</p>
            </div>

            <div className="h-10 w-[1px] bg-slate-100 hidden sm:block"></div>

            <div className="text-center md:text-right">
              <div className="flex items-baseline gap-1 justify-center md:justify-end">
                <span className="text-3xl font-black text-[#064E3B] tracking-tighter">
                   {formatPrice(activeBox.price)}
                </span>
              </div>
              <p className="text-[9px] text-green-600 font-black bg-green-50 px-2 py-0.5 rounded-md inline-block mt-0.5 uppercase tracking-tighter">
                Best Bundle Price
              </p>
            </div>
          </div>
        </div>

        {/* BASKET CONTENTS */}
        <h3 className="font-black text-2xl text-[#064E3B] mb-8 px-2 border-l-4 border-yellow-400 ml-2">
          What's Inside Your Basket?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activeBox.products.map(p => (
            <div key={p.id} className="group bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col">
              <span className="absolute top-4 right-4 bg-[#064E3B] text-white px-3 py-1 rounded-lg text-[10px] font-black z-10 shadow-lg">
                {p.quantity} {p.unit}
              </span>

              <div className="aspect-square overflow-hidden rounded-2xl mb-5">
                <img
                  src={IMAGE_BASE + p.image_url}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                  alt={p.name}
                />
              </div>

              <div className="space-y-3 px-1">
                <p className="font-bold text-gray-800 text-base line-clamp-1">{p.name}</p>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-400 font-black uppercase">Value</span>
                  <span className="text-sm font-black text-[#064E3B]">{formatPrice(Number(p.price) * Number(p.quantity))}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL ACTION SECTION */}
        <div className="bg-[#064E3B] rounded-[2rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">

            <div className="text-center lg:text-left space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-black italic leading-tight">Grab Your Combo!</h2>
                <p className="text-green-100/70 text-sm max-w-xs leading-relaxed mt-1">
                  Freshly packed and delivered together. Order as many as you need!
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start gap-2">
                <span className="text-[9px] font-black text-green-300 uppercase tracking-widest">Select Quantity</span>
                <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
                  <button
                    onClick={() => orderQty > 1 && setOrderQty(orderQty - 1)}
                    className="w-10 h-10 rounded-lg bg-white text-[#064E3B] flex items-center justify-center hover:bg-yellow-400 transition-all shadow-md"
                  >
                    <MdRemove size={20} />
                  </button>
                  <span className="text-2xl font-black w-8 text-center">{orderQty}</span>
                  <button
                    onClick={() => setOrderQty(orderQty + 1)}
                    className="w-10 h-10 rounded-lg bg-white text-[#064E3B] flex items-center justify-center hover:bg-yellow-400 transition-all shadow-md"
                  >
                    <MdAdd size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white text-[#064E3B] p-6 md:p-8 rounded-[1.5rem] shadow-xl text-center min-w-[280px] border border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Grand Total</p>
              <div className="mb-6">
                <p className="text-5xl font-black italic tracking-tighter leading-none">
                  {formatPrice(Number(activeBox.price) * orderQty)}
                </p>
                <p className="text-[11px] font-bold text-green-600 mt-2 bg-green-50 py-1 px-3 rounded-full inline-block">
                  🎉 Savings: {formatPrice(activeBox.savings_amount * orderQty)}
                </p>
              </div>

              <button
                className="w-full bg-yellow-400 text-black px-6 py-4 rounded-xl font-black text-base hover:bg-yellow-500 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-yellow-400/20"
                onClick={handleAddToCart} // ⭐ Trigger handler
              >
                <MdShoppingCart size={22} />
                ADD TO CART
              </button>
              <p className="text-[9px] text-gray-400 mt-4 font-bold uppercase tracking-tighter opacity-60">
                Hand-Picked Freshness Guaranteed
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeeklyBoxLanding;