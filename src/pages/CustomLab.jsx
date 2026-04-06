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
import { MdArrowBack, MdOutlineScience, MdAddShoppingCart, MdArrowForward, MdLocalDrink, MdClose, MdSettings, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';
import { getImageUrl } from '../services/api';
import Swal from 'sweetalert2';

const CustomLab = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart, removeFromCart } = useCart();
    const { t, i18n } = useTranslation();
    const { formatPrice } = useSettings();

    const isRTL = i18n.language === 'ar';

    const [allIngredients, setAllIngredients] = useState({ liquids: [], fruits: [], boosters: [] });
    const [selections, setSelections] = useState([]);
    const [totals, setTotals] = useState({ price: 0, calories: 0, qty: 0 });
    const [activeTab, setActiveTab] = useState('glass');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [templateName, setTemplateName] = useState('');

    const [masterProduct, setMasterProduct] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [customOptions, setCustomOptions] = useState({});
    const [masterOptions, setMasterOptions] = useState([]);

    // 1. Fetch Master Options & Set Initial Default (Only if no saved mix)
    useEffect(() => {
        api.get(`/juice/builder/81`).then(res => {
            if (res.data.success) {
                const builderData = res.data.data;
                setMasterOptions(builderData.custom_options);
                setMasterProduct(builderData.product);

                const savedRecipeString = localStorage.getItem('fruitify_custom_mix');
                // Agar pehle se saved mix nahi hai, tabhi default select karo
                if (!savedRecipeString && !location.state?.initialSelections) {
                    const glassOpt = builderData.custom_options.find(o => o.name.toLowerCase().includes('glass'));
                    if (glassOpt) {
                        const firstVal = glassOpt.values[0];
                        setMaxCapacity(parseInt(firstVal.health_tag) || 500);
                        setCustomOptions({ [glassOpt.id]: firstVal.id });
                    }
                }
            }
        });
    }, []);

    useEffect(() => {
        api.get('/products').then(res => {
            if (res.data.success) {
                const master = res.data.data.find(p => p.id === 81);
                setMasterProduct(master);
            }
        });
    }, []);

    // 2. Load Saved Masterpiece & Sync All States (Highlights & Totals)
    useEffect(() => {
        const savedRecipeString = localStorage.getItem('fruitify_custom_mix');
        if (!savedRecipeString || location.state?.initialSelections) return;

        const savedRecipe = JSON.parse(savedRecipeString);

        if (masterOptions.length > 0) {
            const loadedIngredients = savedRecipe.configuration?.ingredients || savedRecipe.ingredients || [];
            setSelections(loadedIngredients);
            setTemplateName(savedRecipe.name || savedRecipe.recipe_name || '');

            // Restore Glass Selection & Options
            if (savedRecipe.configuration?.options) {
                const savedOpts = savedRecipe.configuration.options;
                setCustomOptions(savedOpts);

                Object.keys(savedOpts).forEach(optId => {
                    const option = masterOptions.find(o => o.id === parseInt(optId));
                    if (option && option.name.toLowerCase().includes('glass')) {
                        const val = option.values.find(v => v.id === savedOpts[optId]);
                        if (val) setMaxCapacity(parseInt(val.health_tag));
                    }
                });
            }

            // ⭐ Progress Bar Fix: Recalculate Totals from Loaded Data
            if (savedRecipe.configuration?.totals) {
                setTotals(savedRecipe.configuration.totals);
            } else {
                updateCalculations(loadedIngredients, savedRecipe.configuration?.options || {});
            }
        }
    }, [masterOptions, location.state]);

    useEffect(() => {
        api.get('/juice/ingredients').then(res => {
            if (res.data.success) {
                const data = res.data.data;
                setAllIngredients({
                    liquids: data.filter(i => i.type === 'liquid'),
                    fruits: data.filter(i => i.type === 'fruit' || i.type === 'vegetable'),
                    boosters: data.filter(i => i.type === 'booster')
                });
            }
        }).catch(err => toast.error(isRTL ? "فشل الاتصال" : "Connection failed"));
    }, [isRTL]);

    const handleResetLab = () => {
        setSelections([]);
        setTotals({ price: masterProduct ? Number(masterProduct.price) : 0, calories: 0, qty: 0 });
        setTemplateName('');
        localStorage.removeItem('fruitify_custom_mix');
        window.location.reload();
    };

    const handleOptionSelect = (optId, valId) => {
        const option = masterOptions.find(o => o.id === parseInt(optId));
        const value = option?.values.find(v => v.id === valId);

        if (option.name.toLowerCase().includes('glass')) {
            setMaxCapacity(parseInt(value.health_tag));
        }

        const newOptions = { ...customOptions, [optId]: valId };
        setCustomOptions(newOptions);
        updateCalculations(selections, newOptions);
    };

    const handleQtyChange = (item, qty) => {
        if (maxCapacity === 0) {
            toast.error("Please select a glass size first!");
            setActiveTab('glass');
            return;
        }
        const val = parseInt(qty);
        const otherQty = selections.filter(s => s.id !== item.id).reduce((sum, s) => sum + s.qty, 0);
        const newTotal = otherQty + val;
        if (newTotal > maxCapacity) {
            const allowedQty = maxCapacity - otherQty;

            // 🔥 FULL CASE
            if (allowedQty <= 0) {
                toast.error("Glass is full! You can't add more.");
            }
            // ⚠️ LIMITED SPACE CASE
            else {
                toast.warning(`You can only add ${allowedQty} ml more.`);
            }

            return;
        }
        let newSelections = [...selections];
        const idx = newSelections.findIndex(s => s.id === item.id);
        if (val > 0) {
            const entry = { ...item, qty: val };
            if (idx > -1) newSelections[idx] = entry; else newSelections.push(entry);
        } else {
            if (idx > -1) newSelections.splice(idx, 1);
        }
        setSelections(newSelections);
        updateCalculations(newSelections, customOptions);
    };

    const updateCalculations = (items, options) => {
        let p = masterProduct ? Number(masterProduct.price) : 0;
        let c = 0; let q = 0;
        items.forEach(s => {
            const factor = s.qty / 100;
            p += s.price * factor; c += s.calories * factor; q += s.qty;
        });
        Object.keys(options).forEach(optId => {
            const option = masterOptions.find(o => o.id === parseInt(optId));
            const val = option?.values.find(v => v.id === options[optId]);
            if (val) p += Number(val.price);
        });
        setTotals({ price: Math.round(p), calories: Math.round(c), qty: q });
    };

    const handleSaveAndAdd = (e) => {
        if (e) e.preventDefault();
        if (selections.length === 0) return toast.error("Nothing in the glass yet. Start by adding ingredients.");
        if (!templateName.trim()) return toast.error("Recipe name required!");

        const savedRecipeString = localStorage.getItem('fruitify_custom_mix');
        const savedRecipe = savedRecipeString ? JSON.parse(savedRecipeString) : null;

        // ⭐ Overwrite Logic: Keep the same ID for cart synchronization
        const constantId = savedRecipe?.id || 'custom-' + Date.now();

        const selectedOptionsDetails = Object.keys(customOptions).map(optId => {
            const option = masterOptions.find(o => o.id === parseInt(optId));
            const value = option?.values.find(v => v.id === customOptions[optId]);
            return { option_name: option?.name, value_name: value?.name };
        });

        const customCartItem = {
            id: constantId,
            product_id: 81,
            name: templateName,
            price: totals.price,
            quantity: 1,
            is_custom: true,
            unit: `${totals.qty}ml`,
            image_url: masterProduct?.image_url || "https://cdn-icons-png.flaticon.com/512/3050/3050161.png",
            configuration: {
                recipe_name: templateName,
                ingredients: selections,
                options: customOptions,
                selected_options_details: selectedOptionsDetails,
                nutrition: { calories: totals.calories },
                totals: totals
            }
        };

        try {
            removeFromCart(constantId); // Clear old version from cart
            localStorage.setItem('fruitify_custom_mix', JSON.stringify(customCartItem));
            addToCart(customCartItem, 1);
            toast.success("Masterpiece Updated! 🎉");
            setShowSaveModal(false);
            setTimeout(() => navigate('/cart'), 1000);
        } catch (err) {
            toast.error("Failed.");
        }
    };

    return (
        <div className={`min-h-screen bg-[#061916] text-white p-6 font-sans ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Header */}
            <div className={`max-w-7xl mx-auto flex justify-between items-center mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => navigate('/juice-builder')} className={`flex items-center gap-2 text-[#FACC15] font-black uppercase text-[10px] tracking-widest hover:text-white transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isRTL ? <MdArrowForward size={20} /> : <MdArrowBack size={20} />} Exit Lab
                </button>
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold italic text-[#FACC15]">Custom Lab</h1>
                </div>
                <button onClick={() => setShowSaveModal(true)} disabled={totals.qty === 0} className={`bg-[#FACC15] text-[#064E3B] px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MdAddShoppingCart size={18} /> Add to Cart
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
                <div className={`lg:col-span-4 flex flex-col items-center ${isRTL ? 'lg:order-last' : ''}`}>
                    <div className="w-full flex justify-end mb-2 px-4">
                        <button onClick={handleResetLab} className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-red-400"><MdClose size={14} /> Reset Lab</button>
                    </div>
                    <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 w-full flex justify-center shadow-2xl relative">
                        {/* ⭐ Preview Fix: Scaled relative to selection */}
                        <div style={{ transform: `scale(${maxCapacity === 300 ? 0.8 : maxCapacity === 750 ? 1.15 : 1})`, transition: '0.5s' }}>
                            <LiquidFill selections={selections} totalQty={totals.qty} maxCapacity={maxCapacity} />
                        </div>
                    </div>

                    <div className="mt-8 space-y-4 w-full">
                        <div className="flex justify-between items-end px-2 text-[10px] font-black text-[#FACC15] uppercase tracking-widest">
                            <span>Volume</span><span>{totals.qty} / {maxCapacity} ml</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-700 ${totals.qty >= maxCapacity ? 'bg-red-500' : 'bg-[#FACC15]'}`} style={{ width: `${(totals.qty / (maxCapacity || 1)) * 100}%` }} />
                        </div>
                        <div className={`grid grid-cols-2 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <span className="text-[10px] font-black text-gray-500 block mb-1 uppercase">Energy</span>
                                <span className="text-2xl font-serif text-[#FACC15]">{totals.calories} <small className="text-xs">kcal</small></span>
                            </div>
                            <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <span className="text-[10px] font-black text-gray-500 block mb-1 uppercase">Total</span>
                                <span className="text-2xl font-serif text-[#FACC15]">{formatPrice(totals.price)}</span>
                            </div>
                        </div>
                        <button onClick={() => setShowSaveModal(true)} disabled={totals.qty === 0} className={`w-full bg-[#FACC15] text-[#064E3B] py-5 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-20 shadow-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                            Confirm Lab Build <MdArrowForward size={18} />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="flex bg-white/5 p-2 rounded-2xl gap-2 border border-white/5 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'glass', label: 'Glass Size' },
                            { id: 'liquids', label: 'Liquid Base' },
                            { id: 'fruits', label: 'Fruit & Veg' },
                            { id: 'boosters', label: 'Boosters' },
                            { id: 'options', label: 'Final Polish' }
                        ].map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 min-w-[100px] py-3 rounded-xl font-black text-[10px] uppercase transition-all ${activeTab === tab.id ? 'bg-[#FACC15] text-[#064E3B]' : 'text-white/40'}`}>{tab.label}</button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[580px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* ⭐ FIX: HIGHLIGHT GLASS BUTTON BASED ON ID MATCH */}
                        {activeTab === 'glass' && (
                            <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in">
                                {masterOptions.find(o => o.name.toLowerCase().includes('glass'))?.values.map(val => {
                                    const isSel = customOptions[val.option_id] === val.id;
                                    return (
                                        <button key={val.id} onClick={() => handleOptionSelect(val.option_id, val.id)}
                                            className={`p-8 rounded-[3rem] border-2 transition-all flex flex-col items-center gap-4 ${isSel ? 'border-[#FACC15] bg-[#FACC15]/10 shadow-xl' : 'border-white/5 bg-white/5 hover:border-white/20'}`}>
                                            <MdLocalDrink size={45} className={isSel ? 'text-[#FACC15]' : 'text-white/20'} />
                                            <span className="font-bold text-xs">{val.name}</span>
                                            <span className="text-[10px] opacity-40">+{formatPrice(val.price)}</span>
                                            {isSel && <MdCheckCircle className="text-[#FACC15]" size={16} />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'options' && (
                            <div className="col-span-full space-y-6 animate-in fade-in">
                                {masterOptions.filter(o => !o.name.toLowerCase().includes('glass')).map(opt => (
                                    <div key={opt.id} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
                                        <h4 className="text-[#FACC15] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2"><MdSettings /> {opt.name}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {opt.values.map(val => (
                                                <button key={val.id} onClick={() => handleOptionSelect(opt.id, val.id)}
                                                    className={`px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all ${customOptions[opt.id] === val.id ? 'border-[#FACC15] bg-[#FACC15] text-[#064E3B]' : 'border-white/10 text-white/40'}`}
                                                >{val.name} (+{formatPrice(val.price)})</button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!['glass', 'options'].includes(activeTab) && allIngredients[activeTab]?.map(item => {
                            const sel = selections.find(s => s.id === item.id);
                            const fillPerc = ((sel?.qty || 0) / (maxCapacity || 500)) * 100;
                            return (
                                <div key={item.id} className={`p-6 rounded-[2.5rem] border transition-all duration-300 flex items-center gap-4 ${sel?.qty > 0 ? 'bg-white/10 border-[#FACC15]/50' : 'bg-white/5 border-white/10'}`}>
                                    <div className="w-16 h-16 bg-black/40 rounded-2xl overflow-hidden p-2 flex-shrink-0"><img src={getImageUrl(item.image_url)} className="w-full h-full object-contain" alt="" /></div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-sm mb-2">{item.name}</h4>
                                        <input type="range" min="0" max={maxCapacity} step="50" value={sel?.qty || 0} onChange={(e) => handleQtyChange(item, e.target.value)}
                                            className="w-full h-1 appearance-none cursor-pointer rounded-full"
                                            style={{ background: `linear-gradient(to right, ${item.color_code || '#FACC15'} ${fillPerc}%, rgba(255,255,255,0.1) ${fillPerc}%)`, color: item.color_code }}
                                        />
                                        <div className="flex justify-between text-[8px] font-black mt-2">
                                            <span style={{ color: sel?.qty > 0 ? (item.color_code || '#FACC15') : '#6b7280' }}>{sel?.qty || 0} ml</span>
                                            <span className="text-white/40">{formatPrice(item.price)}/100ml</span>
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
                    <div className="bg-[#061916] border border-[#FACC15]/30 p-10 rounded-[3.5rem] max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-serif font-bold text-[#FACC15]">Confirm Customization</h3>
                        </div>
                        <input type="text" className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-3xl outline-none focus:border-[#FACC15] text-white font-bold" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowSaveModal(false)} className="flex-1 py-5 rounded-3xl font-black text-[10px] uppercase text-white/40">Back</button>
                            <button onClick={handleSaveAndAdd} className="flex-1 bg-[#FACC15] text-[#064E3B] py-5 rounded-3xl font-black text-[10px] uppercase shadow-xl">Save & Sync Cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomLab;