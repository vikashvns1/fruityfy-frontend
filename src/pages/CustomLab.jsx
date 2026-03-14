// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import api from '../services/api';
// import LiquidFill from '../components/juice/LiquidFill';
// import { MdArrowBack, MdOutlineScience, MdAddShoppingCart, MdArrowForward } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { useCart } from '../context/CartContext';

// const CustomLab = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { addToCart } = useCart();

//     const [allIngredients, setAllIngredients] = useState({ liquids: [], fruits: [], vegetables: [], boosters: [] });
//     const [selections, setSelections] = useState([]);
//     const [totals, setTotals] = useState({ price: 0, calories: 0, qty: 0 });
//     const [activeTab, setActiveTab] = useState('liquids');
//     const [showSaveModal, setShowSaveModal] = useState(false);
//     const [templateName, setTemplateName] = useState('');

//     const [masterProduct, setMasterProduct] = useState(null);
//     useEffect(() => {
//         // ID 81 (Custom Master) ki details fetch karein
//         api.get('/products').then(res => {
//             if (res.data.success) {
//                 const master = res.data.data.find(p => p.id === 81);
//                 setMasterProduct(master);
//             }
//         });
//     }, []);
//     // --- 1. REMIX LOGIC: Purani recipe load karne ke liye ---
//     useEffect(() => {
//         if (location.state && location.state.initialSelections) {
//             setSelections(location.state.initialSelections);
//             setTemplateName(location.state.recipeName || '');

//             let p = 0, c = 0, q = 0;
//             location.state.initialSelections.forEach(s => {
//                 const factor = s.qty / 100;
//                 p += s.price * factor;
//                 c += s.calories * factor;
//                 q += s.qty;
//             });
//             setTotals({ price: Math.round(p), calories: Math.round(c), qty: q });
//         }
//     }, [location.state]);

//     // --- 2. FETCH MASTER INGREDIENTS (Public API) ---
//     useEffect(() => {
//         api.get('/juice/ingredients').then(res => {
//             if (res.data.success) {
//                 const data = res.data.data;
//                 setAllIngredients({
//                     liquids: data.filter(i => i.type === 'liquid'),
//                     fruits: data.filter(i => i.type === 'fruit'),
//                     vegetables: data.filter(i => i.type === 'vegetable'),
//                     boosters: data.filter(i => i.type === 'booster')
//                 });
//             }
//         }).catch(err => toast.error("Lab database connection failed"));
//     }, []);

//     // --- 3. DYNAMIC MIXING LOGIC ---
//     const handleQtyChange = (item, qty) => {
//         let newSelections = [...selections];
//         const idx = newSelections.findIndex(s => s.id === item.id);
//         const val = parseInt(qty);

//         if (val > 0) {
//             const entry = { ...item, qty: val };
//             if (idx > -1) newSelections[idx] = entry;
//             else newSelections.push(entry);
//         } else {
//             if (idx > -1) newSelections.splice(idx, 1);
//         }
//         setSelections(newSelections);

//         let p = 0, c = 0, q = 0;
//         newSelections.forEach(s => {
//             const factor = s.qty / 100;
//             p += s.price * factor;
//             c += s.calories * factor;
//             q += s.qty;
//         });
//         setTotals({ price: Math.round(p), calories: Math.round(c), qty: q });
//     };

//     // --- 4. SAVE & ADD TO CART LOGIC (ID 81 Mapping) ---
//     const handleSaveAndAdd = (e) => {
//         if (e) e.preventDefault();

//         if (selections.length === 0) return toast.error("Bhai, pehle glass toh bharo!");
//         if (!templateName.trim()) return toast.error("Recipe ka ek unique naam do!");

//         const customCartItem = {
//             id: 'custom-' + Date.now(), // Unique for context mapping
//             product_id: 81,            // Dynamic Anchor ID
//             name: templateName,
//             price: totals.price,
//             quantity: 1,
//             is_custom: true,
//             unit: `${totals.qty}ml`,
//             //image_url: "https://cdn-icons-png.flaticon.com/512/3050/3050161.png",
//            image_url: masterProduct?.image_url || "https://cdn-icons-png.flaticon.com/512/3050/3050161.png", // Fallback to generic icon
//             // Backend DB customization column ke liye
//             configuration: {
//                 recipe_name: templateName,
//                 ingredients: selections.map(s => ({ name: s.name, qty: s.qty, unit: s.unit })),
//                 nutrition: { calories: totals.calories }
//             }
//         };

//         try {
//             // A. Grid ke liye save karo
//             localStorage.setItem('fruitify_custom_mix', JSON.stringify({
//                 ...customCartItem,
//                 ingredients: selections,
//                 date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
//             }));

//             // B. Cart mein add karo
//             addToCart(customCartItem, 1);

//             toast.success("Added to Cart Successfully! 🎉");
//             setShowSaveModal(false);

//             // C. Direct Cart par bhej do checkout ke liye
//             setTimeout(() => navigate('/cart'), 1000);
//         } catch (err) {
//             toast.error("Process failed. Check your connection.");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#061916] text-white p-6 font-sans">
//             {/* Header */}
//             <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
//                 <button onClick={() => navigate('/juice-builder')} className="flex items-center gap-2 text-[#FACC15] font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">
//                     <MdArrowBack size={20} /> Exit Lab
//                 </button>
//                 <div className="text-center">
//                     <h1 className="text-4xl font-serif font-bold italic text-[#FACC15]">Custom Lab</h1>
//                     <p className="text-white/40 text-[10px] uppercase tracking-widest font-black tracking-[0.4em]">Molecular Engine v1.0</p>
//                 </div>
//                 <button
//                     onClick={() => setShowSaveModal(true)}
//                     className="bg-[#FACC15] text-[#064E3B] px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-2"
//                 >
//                     <MdAddShoppingCart size={18} /> Add to Cart
//                 </button>
//             </div>

//             <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
//                 {/* Left: Visualizer & Quick Action */}
//                 <div className="lg:col-span-4 flex flex-col items-center">
//                     <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 w-full flex justify-center shadow-2xl relative">
//                         <LiquidFill selections={selections} totalQty={totals.qty} />
//                     </div>

//                     <div className="mt-8 space-y-4 w-full">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
//                                 <span className="text-[10px] font-black text-gray-500 block mb-1">ENERGY</span>
//                                 <span className="text-2xl font-serif text-[#FACC15]">{totals.calories} <small className="text-xs">kcal</small></span>
//                             </div>
//                             <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
//                                 <span className="text-[10px] font-black text-gray-500 block mb-1">TOTAL</span>
//                                 <span className="text-2xl font-serif text-[#FACC15]">₹{totals.price}</span>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => setShowSaveModal(true)}
//                             disabled={totals.qty === 0}
//                             className="w-full bg-[#FACC15] text-[#064E3B] py-5 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-20 shadow-2xl"
//                         >
//                             Build & Checkout <MdArrowForward size={18} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Right: Ingredients Selection */}
//                 <div className="lg:col-span-8 space-y-6">
//                     <div className="flex bg-white/5 p-2 rounded-2xl gap-2 border border-white/5 backdrop-blur-md">
//                         {['liquids', 'fruits', 'vegetables', 'boosters'].map(tab => (
//                             <button key={tab} onClick={() => setActiveTab(tab)}
//                                 className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#FACC15] text-[#064E3B]' : 'text-white/40 hover:text-white'}`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[580px] overflow-y-auto pr-2 custom-scrollbar">
//                         {allIngredients[activeTab]?.map(item => {
//                             const sel = selections.find(s => s.id === item.id);
//                             return (
//                                 <div key={item.id} className={`p-6 rounded-[2.5rem] border transition-all duration-300 flex items-center gap-4 ${sel?.qty > 0 ? 'bg-white/10 border-[#FACC15]/50' : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'}`}>
//                                     <div className="w-16 h-16 bg-black/40 rounded-2xl overflow-hidden p-2 border border-white/5 flex-shrink-0">
//                                         <img src={`http://localhost:5000${item.image_url}`} className="w-full h-full object-contain" alt={item.name} />
//                                     </div>
//                                     <div className="flex-1">
//                                         <h4 className="font-bold text-white text-sm mb-2">{item.name}</h4>
//                                         <input type="range" min="0" max="500" step="50" value={sel?.qty || 0}
//                                             onChange={(e) => handleQtyChange(item, e.target.value)}
//                                             className="w-full h-1 bg-white/10 rounded-full appearance-none accent-[#FACC15] cursor-pointer"
//                                         />
//                                         <div className="flex justify-between text-[8px] font-black uppercase text-gray-500 mt-2">
//                                             <span className={sel?.qty > 0 ? "text-[#FACC15]" : ""}>{sel?.qty || 0} {item.unit}</span>
//                                             <span>₹{item.price}/100ml</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* Save & Add Modal */}
//             {showSaveModal && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/80 animate-in fade-in duration-300" onClick={() => setShowSaveModal(false)}>
//                     <div className="bg-[#061916] border border-[#FACC15]/30 p-10 rounded-[3.5rem] max-w-md w-full shadow-[0_0_120px_rgba(250,204,21,0.15)] animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
//                         <div className="text-center mb-8">
//                             <div className="w-20 h-20 bg-[#FACC15] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
//                                 <MdOutlineScience className="text-[#064E3B] text-4xl" />
//                             </div>
//                             <h3 className="text-2xl font-serif font-bold text-[#FACC15]">Final Registry</h3>
//                             <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] mt-2">Personal Molecular Mix</p>
//                         </div>

//                         <div className="space-y-1 mb-8">
//                             <label className="text-[10px] font-black uppercase text-[#FACC15] ml-4">Recipe Name</label>
//                             <input type="text" placeholder="e.g. Summer Detox Mix"
//                                 className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-3xl outline-none focus:border-[#FACC15] text-white font-bold transition-all"
//                                 value={templateName} onChange={(e) => setTemplateName(e.target.value)} autoFocus
//                             />
//                         </div>

//                         <div className="flex gap-4">
//                             <button onClick={() => setShowSaveModal(false)} className="flex-1 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-all">Cancel</button>
//                             <button onClick={handleSaveAndAdd} className="flex-1 bg-[#FACC15] text-[#064E3B] py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">Confirm & Add</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomLab;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import LiquidFill from '../components/juice/LiquidFill';
import { MdArrowBack, MdOutlineScience, MdAddShoppingCart, MdArrowForward } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext'; // <--- 1. Settings import kiya

const CustomLab = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCart();
    const { t, i18n } = useTranslation();
    const { formatPrice } = useSettings(); // <--- 2. formatPrice yahan se mil jayega (Error Solve)

    const isRTL = i18n.language === 'ar';

    const [allIngredients, setAllIngredients] = useState({ liquids: [], fruits: [], vegetables: [], boosters: [] });
    const [selections, setSelections] = useState([]);
    const [totals, setTotals] = useState({ price: 0, calories: 0, qty: 0 });
    const [activeTab, setActiveTab] = useState('liquids');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [templateName, setTemplateName] = useState('');

    const [masterProduct, setMasterProduct] = useState(null);

    useEffect(() => {
        api.get('/products').then(res => {
            if (res.data.success) {
                const master = res.data.data.find(p => p.id === 81);
                setMasterProduct(master);
            }
        });
    }, []);

    useEffect(() => {
        if (location.state && location.state.initialSelections) {
            setSelections(location.state.initialSelections);
            setTemplateName(location.state.recipeName || '');

            let p = 0, c = 0, q = 0;
            location.state.initialSelections.forEach(s => {
                const factor = s.qty / 100;
                p += s.price * factor;
                c += s.calories * factor;
                q += s.qty;
            });
            setTotals({ price: Math.round(p), calories: Math.round(c), qty: q });
        }
    }, [location.state]);

    useEffect(() => {
        api.get('/juice/ingredients').then(res => {
            if (res.data.success) {
                const data = res.data.data;
                setAllIngredients({
                    liquids: data.filter(i => i.type === 'liquid'),
                    fruits: data.filter(i => i.type === 'fruit'),
                    vegetables: data.filter(i => i.type === 'vegetable'),
                    boosters: data.filter(i => i.type === 'booster')
                });
            }
        }).catch(err => toast.error(isRTL ? "فشل الاتصال بقاعدة بيانات المختبر" : "Lab database connection failed"));
    }, [isRTL]);

    const handleQtyChange = (item, qty) => {
        let newSelections = [...selections];
        const idx = newSelections.findIndex(s => s.id === item.id);
        const val = parseInt(qty);

        if (val > 0) {
            const entry = { ...item, qty: val };
            if (idx > -1) newSelections[idx] = entry;
            else newSelections.push(entry);
        } else {
            if (idx > -1) newSelections.splice(idx, 1);
        }
        setSelections(newSelections);

        let p = 0, c = 0, q = 0;
        newSelections.forEach(s => {
            const factor = s.qty / 100;
            p += s.price * factor;
            c += s.calories * factor;
            q += s.qty;
        });
        setTotals({ price: Math.round(p), calories: Math.round(c), qty: q });
    };

    const handleSaveAndAdd = (e) => {
        if (e) e.preventDefault();
        if (selections.length === 0) return toast.error(isRTL ? "يرجى ملء الكوب أولاً!" : "Bhai, pehle glass toh bharo!");
        if (!templateName.trim()) return toast.error(isRTL ? "يرجى إعطاء اسم فريد للوصفة!" : "Recipe ka ek unique naam do!");

        const customCartItem = {
            id: 'custom-' + Date.now(),
            product_id: 81,
            name: templateName,
            price: totals.price,
            quantity: 1,
            is_custom: true,
            unit: `${totals.qty}ml`,
            image_url: masterProduct?.image_url || "https://cdn-icons-png.flaticon.com/512/3050/3050161.png",
            configuration: {
                recipe_name: templateName,
                ingredients: selections.map(s => ({ name: s.name, qty: s.qty, unit: s.unit })),
                nutrition: { calories: totals.calories }
            }
        };

        try {
            localStorage.setItem('fruitify_custom_mix', JSON.stringify({
                ...customCartItem,
                ingredients: selections,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
            }));

            addToCart(customCartItem, 1);
            toast.success(isRTL ? "تمت الإضافة إلى السلة بنجاح! 🎉" : "Added to Cart Successfully! 🎉");
            setShowSaveModal(false);
            setTimeout(() => navigate('/cart'), 1000);
        } catch (err) {
            toast.error(isRTL ? "فشلت العملية. تحقق من اتصالك." : "Process failed. Check your connection.");
        }
    };

    return (
        <div className={`min-h-screen bg-[#061916] text-white p-6 font-sans ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Header */}
            <div className={`max-w-7xl mx-auto flex justify-between items-center mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => navigate('/juice-builder')} className={`flex items-center gap-2 text-[#FACC15] font-black uppercase text-[10px] tracking-widest hover:text-white transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isRTL ? <MdArrowForward size={20} /> : <MdArrowBack size={20} />} {isRTL ? 'الخروج من المختبر' : 'Exit Lab'}
                </button>
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold italic text-[#FACC15]">{isRTL ? 'مختبر التخصيص' : 'Custom Lab'}</h1>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black tracking-[0.4em]">{isRTL ? 'محرك جزيئي v1.0' : 'Molecular Engine v1.0'}</p>
                </div>
                <button onClick={() => setShowSaveModal(true)} className={`bg-[#FACC15] text-[#064E3B] px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MdAddShoppingCart size={18} /> {t('product_details.add_to_cart')}
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
                {/* Visualizer */}
                <div className={`lg:col-span-4 flex flex-col items-center ${isRTL ? 'lg:order-last' : ''}`}>
                    <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 w-full flex justify-center shadow-2xl relative">
                        <LiquidFill selections={selections} totalQty={totals.qty} />
                    </div>

                    <div className="mt-8 space-y-4 w-full">
                        <div className={`grid grid-cols-2 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <span className="text-[10px] font-black text-gray-500 block mb-1 uppercase">{isRTL ? 'الطاقة' : 'ENERGY'}</span>
                                <span className="text-2xl font-serif text-[#FACC15]">{totals.calories} <small className="text-xs">{isRTL ? 'سعرة' : 'kcal'}</small></span>
                            </div>
                            <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <span className="text-[10px] font-black text-gray-500 block mb-1 uppercase">{isRTL ? 'الإجمالي' : 'TOTAL'}</span>
                                <span className="text-2xl font-serif text-[#FACC15]">{formatPrice(totals.price)}</span>
                            </div>
                        </div>

                        <button onClick={() => setShowSaveModal(true)} disabled={totals.qty === 0} className={`w-full bg-[#FACC15] text-[#064E3B] py-5 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-20 shadow-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {isRTL ? 'بناء ومتابعة الدفع' : 'Build & Checkout'} {isRTL ? <MdArrowBack size={18} className="rotate-180" /> : <MdArrowForward size={18} />}
                        </button>
                    </div>
                </div>

                {/* Ingredients Selection */}
                <div className="lg:col-span-8 space-y-6">
                    <div className={`flex bg-white/5 p-2 rounded-2xl gap-2 border border-white/5 backdrop-blur-md ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {['liquids', 'fruits', 'vegetables', 'boosters'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#FACC15] text-[#064E3B]' : 'text-white/40 hover:text-white'}`}
                            >
                                {isRTL ? t(`juice_builder.${tab}`) || tab : tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[580px] overflow-y-auto pr-2 custom-scrollbar">
                        {allIngredients[activeTab]?.map(item => {
                            const sel = selections.find(s => s.id === item.id);
                            return (
                                <div key={item.id} className={`p-6 rounded-[2.5rem] border transition-all duration-300 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''} ${sel?.qty > 0 ? 'bg-white/10 border-[#FACC15]/50' : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'}`}>
                                    <div className="w-16 h-16 bg-black/40 rounded-2xl overflow-hidden p-2 border border-white/5 flex-shrink-0">
                                        <img src={`http://localhost:5000${item.image_url}`} className="w-full h-full object-contain" alt={item.name} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-bold text-white text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{isRTL ? (item.name_ar || item.name) : item.name}</h4>
                                        <input type="range" min="0" max="500" step="50" value={sel?.qty || 0}
                                            onChange={(e) => handleQtyChange(item, e.target.value)}
                                            className="w-full h-1 bg-white/10 rounded-full appearance-none accent-[#FACC15] cursor-pointer"
                                        />
                                        <div className={`flex justify-between text-[8px] font-black uppercase text-gray-500 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <span className={sel?.qty > 0 ? "text-[#FACC15]" : ""}>{sel?.qty || 0} {isRTL ? 'مل' : item.unit}</span>
                                            <span>{formatPrice(item.price)}/100ml</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/80" onClick={() => setShowSaveModal(false)}>
                    <div className={`bg-[#061916] border border-[#FACC15]/30 p-10 rounded-[3.5rem] max-w-md w-full shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-[#FACC15] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                                <MdOutlineScience className="text-[#064E3B] text-4xl" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-[#FACC15]">{isRTL ? 'السجل النهائي' : 'Final Registry'}</h3>
                            <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] mt-2">{isRTL ? 'مزيج جزيئي شخصي' : 'Personal Molecular Mix'}</p>
                        </div>

                        <div className="space-y-1 mb-8">
                            <label className={`text-[10px] font-black uppercase text-[#FACC15] ${isRTL ? 'mr-4' : 'ml-4'}`}>{isRTL ? 'اسم الوصفة' : 'Recipe Name'}</label>
                            <input type="text" placeholder={isRTL ? "مثلاً: مزيج الصيف" : "e.g. Summer Detox"}
                                className={`w-full bg-white/5 border-2 border-white/10 p-5 rounded-3xl outline-none focus:border-[#FACC15] text-white font-bold ${isRTL ? 'text-right' : ''}`}
                                value={templateName} onChange={(e) => setTemplateName(e.target.value)} autoFocus
                            />
                        </div>

                        <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <button onClick={() => setShowSaveModal(false)} className="flex-1 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-all">{isRTL ? 'إلغاء' : 'Cancel'}</button>
                            <button onClick={handleSaveAndAdd} className="flex-1 bg-[#FACC15] text-[#064E3B] py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">{isRTL ? 'تأكيد وإضافة' : 'Confirm & Add'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomLab;