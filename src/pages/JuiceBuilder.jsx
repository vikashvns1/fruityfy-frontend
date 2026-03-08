// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api, { getImageUrl } from '../services/api';
// import { toast } from 'react-toastify';
// import LiquidFill from '../components/juice/LiquidFill';
// import {
//     MdLocalDrink, MdAddShoppingCart, MdBolt, MdCheckCircle,
//     MdSettings, MdAutoFixHigh, MdOutlineScience, MdArrowForward,
//     MdTune, MdFastfood, MdInfoOutline, MdAdd, MdAccessTime
// } from 'react-icons/md';

// const JuiceBuilder = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [data, setData] = useState(null);
//     const [simpleJuices, setSimpleJuices] = useState([]);
//     const [templates, setTemplates] = useState([]);
//     const [selections, setSelections] = useState([]);
//     const [customOptions, setCustomOptions] = useState({});
//     const [totals, setTotals] = useState({ price: 0, calories: 0, qty: 0 });
//     const [step, setStep] = useState(1);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchEverything = async () => {
//             try {
//                 // 1. All Products Fetch Karein
//                 const productsRes = await api.get('/products?category_id=11');
//                 if (productsRes.data.success) {
//                     const allJuiceProducts = productsRes.data.data;
//                     setSimpleJuices(allJuiceProducts.filter(p => p.product_type === 'simple'));
//                     setTemplates(allJuiceProducts.filter(p => p.product_type === 'customizable'));
//                 }

//                 // 2. Active Builder Data (If ID exists)
//                 if (id && id !== 'undefined' && id !== 'custom') {
//                     const builderRes = await api.get(`/juice/builder/${id}`);
//                     if (builderRes.data.success) {
//                         setData(builderRes.data.data);
//                         setTotals(t => ({ ...t, price: Number(builderRes.data.data.product.price) }));
//                     }
//                 }
//             } catch (err) {
//                 console.error("Initialization Error:", err);
//                 toast.error("Failed to load lab data");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchEverything();
//     }, [id]);

//     const handleBackToLab = () => {
//         setData(null);
//         navigate('/juice-builder');
//     };

//     const handleQtyChange = (item, qty) => {
//         let newSelections = [...selections];
//         const idx = newSelections.findIndex(s => s.id === item.id);
//         const val = parseInt(qty);
//         if (val > 0) {
//             const entry = { id: item.id, name: item.name, qty: val, price: item.price, calories: item.calories, unit: item.unit };
//             if (idx > -1) newSelections[idx] = entry; else newSelections.push(entry);
//         } else { if (idx > -1) newSelections.splice(idx, 1); }
//         setSelections(newSelections);
//         updateCalculations(newSelections, customOptions);
//     };

//     const handleOptionSelect = (optId, valId) => {
//         const newOptions = { ...customOptions, [optId]: valId };
//         setCustomOptions(newOptions);
//         updateCalculations(selections, newOptions);
//     };

//     const updateCalculations = (items, options) => {
//         if (!data) return;
//         let price = Number(data.product.price);
//         let cals = 0; let totalQty = 0;
//         items.forEach(s => {
//             const factor = s.qty / 100;
//             price += s.price * factor; cals += s.calories * factor; totalQty += s.qty;
//         });
//         Object.keys(options).forEach(optId => {
//             const option = data.custom_options.find(o => o.id === parseInt(optId));
//             const value = option?.values.find(v => v.id === options[optId]);
//             if (value) price += Number(value.price);
//         });
//         setTotals({ price: Math.round(price), calories: Math.round(cals), qty: totalQty });
//     };

//     if (loading) return (
//         <div className="min-h-screen bg-[#064E3B] flex flex-col items-center justify-center text-[#FACC15]">
//             <div className="relative w-20 h-20 mb-4">
//                 <div className="absolute inset-0 border-4 border-[#FACC15]/20 rounded-full"></div>
//                 <div className="absolute inset-0 border-4 border-[#FACC15] rounded-full border-t-transparent animate-spin"></div>
//             </div>
//             <p className="font-serif italic tracking-widest animate-pulse">Initializing Juice Lab...</p>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#F8FAFA] font-sans text-[#1A2E28]">
//             <div className={`${!data ? "bg-[#061916] py-20" : "bg-white pt-24"} transition-all duration-700 relative overflow-hidden`}>
//                 <div className="max-w-[1440px] mx-auto px-6">
//                     {!data ? (
//                         /* --- 🧪 LAB GRID VIEW --- */
//                         <div className="animate-in fade-in duration-1000">
//                             <div className="text-center mb-16">
//                                 <div className="inline-flex items-center gap-2 bg-[#FACC15] text-[#064E3B] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-6">
//                                     <MdOutlineScience /> Signature Lab
//                                 </div>
//                                 <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6">
//                                     The Juice <span className="text-[#FACC15] italic">Lab</span>
//                                 </h2>
//                                 <p className="text-green-100/50 max-w-2xl mx-auto text-lg leading-relaxed">
//                                     Choose a base formula engineered by nutrition experts — then fine-tune every milliliter.
//                                 </p>
//                             </div>

//                             {/* Dynamic Grid Section */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">

//                                 {/* 1. Standard Templates */}
//                                 {templates.filter(t => t.id !== 81).map((t, idx) => (
//                                     <div
//                                         key={t.id}
//                                         onClick={() => navigate(`/juice-builder/${t.id}`)}
//                                         className="group relative bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
//                                     >
//                                         <div className="absolute top-5 left-6 text-white/5 font-serif text-6xl italic group-hover:text-[#FACC15]/10 transition-colors">
//                                             {String(idx + 1).padStart(2, "0")}
//                                         </div>

//                                         <div className="relative z-10 w-full h-48 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700">
//                                             <img src={getImageUrl(t.image_url)} alt={t.name} className="h-full object-contain drop-shadow-2xl" />
//                                         </div>

//                                         <div className="flex-1 space-y-3">
//                                             <h3 className="text-xl font-bold text-white group-hover:text-[#FACC15] transition">{t.name}</h3>

//                                             {/* ⭐ Full Description Logic */}
//                                             <p className="text-white/40 text-xs leading-relaxed line-clamp-3 italic">
//                                                 {t.full_description || t.short_description}
//                                             </p>

//                                             {/* ⭐ Nutritional Perks */}
//                                             {t.nutritional_benefits && (
//                                                 <div className="pt-3 flex items-center gap-2 border-t border-white/5">
//                                                     <MdOutlineScience className="text-[#FACC15]" size={14} />
//                                                     <span className="text-[9px] font-black uppercase text-[#FACC15] tracking-widest truncate">
//                                                         {t.nutritional_benefits.split(',')[0]}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}

//                                 {/* 2. Personalized 6th Card (Handling Blank & Saved States) */}
//                                 {(() => {
//                                     const savedRecipe = JSON.parse(localStorage.getItem('fruitify_custom_mix'));
//                                     const masterData = templates.find(t => t.id === 81);

//                                     if (savedRecipe) {
//                                         return (
//                                             /* CASE A: USER HAS A SAVED MASTERPIECE */
//                                             <div onClick={() => navigate(`/juice-builder/custom`, { state: { initialSelections: savedRecipe.ingredients, recipeName: savedRecipe.name } })}
//                                                 className="group relative bg-gradient-to-br from-[#064E3B] to-[#042f24] border border-[#FACC15]/30 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-2xl flex flex-col h-full">

//                                                 <div className="absolute top-4 right-6 text-[#FACC15] font-black text-[8px] uppercase tracking-widest bg-[#FACC15]/10 px-3 py-1 rounded-full border border-[#FACC15]/20">
//                                                     YOUR MASTERPIECE
//                                                 </div>

//                                                 <div className="relative z-10 w-full h-44 flex items-center justify-center mb-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
//                                                     <div className="scale-90">
//                                                         <LiquidFill selections={savedRecipe.ingredients} totalQty={savedRecipe.totalQty || 500} isMini={true} />
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex-1 space-y-2 text-center md:text-left">
//                                                     <h3 className="text-2xl font-serif font-bold text-[#FACC15] italic tracking-tight">{savedRecipe.name}</h3>
//                                                     <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-6">Mastered on: {savedRecipe.date}</p>

//                                                     <button className="w-full py-4 bg-[#FACC15] text-[#064E3B] rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-white transition-all shadow-xl">
//                                                         REMIX YOUR CREATION
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         );
//                                     } else {
//                                         return (
//                                             /* CASE B: BLANK STATE - SHOWING PROFESSIONAL LAB INFO */
//                                             <div onClick={() => navigate(`/juice-builder/custom`)}
//                                                 className="group relative bg-[#061916] border-2 border-dashed border-[#FACC15]/20 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 hover:border-[#FACC15]/50 flex flex-col h-full overflow-hidden">

//                                                 {/* Subtle Background Blueprint Image */}
//                                                 <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
//                                                     <MdOutlineScience size={200} className="text-[#FACC15]" />
//                                                 </div>

//                                                 {/* Top Section with Small Lab Image/Icon */}
//                                                 <div className="flex items-center gap-4 mb-6">
//                                                     <div className="w-16 h-16 rounded-2xl bg-[#FACC15] flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.2)] shrink-0">
//                                                         <MdAdd className="text-[#064E3B] text-3xl" />
//                                                     </div>
//                                                     <div>
//                                                         <h3 className="text-xl font-black text-white group-hover:text-[#FACC15] transition-colors uppercase tracking-tighter">
//                                                             {masterData?.name || "Custom Molecular Blend"}
//                                                         </h3>
//                                                         <p className="text-[9px] font-black text-[#FACC15] uppercase tracking-[0.3em] opacity-60">Lab ID: #81-A</p>
//                                                     </div>
//                                                 </div>

//                                                 {/* Main Content */}
//                                                 <div className="flex-1 space-y-4">
//                                                     <p className="text-[#FACC15] text-xs font-bold italic leading-relaxed">
//                                                         "Your unique masterpiece, crafted from scratch in our lab."
//                                                     </p>

//                                                     <p className="text-white/40 text-[10px] leading-relaxed">
//                                                         {masterData?.nutritional_benefits || "This personalized blend is optimized for maximum bioavailability. Rich in antioxidants, essential vitamins, and minerals based on your custom ingredient selection."}
//                                                     </p>

//                                                     {/* Storage Info Badge */}
//                                                     <div className="pt-4 mt-auto border-t border-white/5">
//                                                         <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
//                                                             <MdAccessTime className="text-[#FACC15] mt-0.5 shrink-0" size={14} />
//                                                             <p className="text-[9px] text-white/50 leading-snug">
//                                                                 <span className="font-black text-[#FACC15] uppercase">Storage:</span> {masterData?.shelf_life || "Consume within 24 hours. Keep refrigerated at 1-4°C."}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Hover Indicator */}
//                                                 <div className="mt-6 flex items-center justify-center gap-2 text-[#FACC15] text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
//                                                     Open Lab <MdArrowForward size={14} />
//                                                 </div>
//                                             </div>
//                                         );
//                                     }
//                                 })()}
//                             </div>
//                         </div>
//                     ) : (
//                         /* --- 🛠️ ACTIVE BUILDER VIEW --- */
//                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-8 duration-700">
//                             <div className="lg:col-span-8 space-y-8">
//                                 <div className="flex justify-between items-end border-b border-gray-100 pb-8">
//                                     <div>
//                                         <button onClick={handleBackToLab} className="text-[#064E3B] font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2 group">
//                                             <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit Lab
//                                         </button>
//                                         <h1 className="text-5xl font-serif font-bold text-[#064E3B]">{data.product.name}</h1>
//                                     </div>
//                                     <div className="flex bg-gray-50 p-2 rounded-2xl gap-2">
//                                         {[1, 2, 3, 4].map(s => (
//                                             <div key={s} className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs ${step === s ? 'bg-[#064E3B] text-white shadow-xl' : 'text-gray-300'}`}>{s}</div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* ⭐ NEW: INTELLIGENCE PANEL (From DB Response) */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="relative overflow-hidden bg-green-50 p-6 rounded-[2rem] border border-green-100 group transition-all">
//                                         <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
//                                             <img src="https://cdn-icons-png.flaticon.com/512/2822/2822003.png" alt="Nutrition" className="w-20 h-20" />
//                                         </div>
//                                         <div className="relative z-10">
//                                             <h5 className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-2 flex items-center gap-2">
//                                                 <MdOutlineScience size={16} /> Nutritional Profile
//                                             </h5>
//                                             <p className="text-xs text-green-700/80 leading-relaxed italic font-medium">
//                                                 {data.product.nutritional_benefits || "Optimized based on your unique ingredient molecular map."}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="relative overflow-hidden bg-blue-50 p-6 rounded-[2rem] border border-blue-100 group transition-all">
//                                         <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
//                                             <img src="https://cdn-icons-png.flaticon.com/512/3058/3058224.png" alt="Shelf Life" className="w-20 h-20" />
//                                         </div>
//                                         <div className="relative z-10">
//                                             <h5 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-2">
//                                                 <MdAccessTime size={14} /> Care & Storage
//                                             </h5>
//                                             <p className="text-xs text-blue-700/80 leading-relaxed font-medium">
//                                                 {data.product.shelf_life || "Keep refrigerated and consume fresh within 24 hours."}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
//                                     {['Liquid Base', 'Fruit & Veg', 'Boosters', 'Final Polish'].map((label, i) => (
//                                         <button key={i} onClick={() => setStep(i + 1)} className={`flex-1 min-w-[140px] py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all ${step === i + 1 ? 'bg-[#064E3B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{label}</button>
//                                     ))}
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
//                                     {step === 4 ? (
//                                         <div className="col-span-full space-y-6">
//                                             {data.custom_options.map(opt => (
//                                                 <div key={opt.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50">
//                                                     <h4 className="font-black text-[#064E3B] mb-6 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2"><MdSettings className="text-lg" /> {opt.name}</h4>
//                                                     <div className="flex flex-wrap gap-4">
//                                                         {opt.values.map(val => (
//                                                             <button key={val.id} onClick={() => handleOptionSelect(opt.id, val.id)} className={`px-8 py-4 rounded-2xl border-2 transition-all font-bold text-sm flex flex-col items-start ${customOptions[opt.id] === val.id ? 'border-[#064E3B] bg-green-50 text-[#064E3B]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
//                                                                 <span>{val.name}</span>
//                                                                 <span className="text-[10px] opacity-60">+₹{val.price}</span>
//                                                             </button>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         (step === 1 ? data.ingredients.liquids : step === 2 ? [...data.ingredients.fruits, ...data.ingredients.vegetables] : data.ingredients.boosters).map(item => {
//                                             const active = selections.find(s => s.id === item.id);
//                                             return (
//                                                 <div key={item.id} className={`p-6 rounded-[2.5rem] transition-all duration-500 border-2 ${active?.qty > 0 ? 'bg-white border-[#064E3B] shadow-xl' : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'}`}>
//                                                     <div className="flex gap-5 mb-6">
//                                                         <div className="w-20 h-20 bg-gray-50 rounded-3xl overflow-hidden p-2">
//                                                             <img src={`http://localhost:5000${item.image_url}`} className="w-full h-full object-contain" alt={item.name} />
//                                                         </div>
//                                                         <div className="flex-1">
//                                                             <div className="flex justify-between items-start">
//                                                                 <h4 className="font-bold text-[#064E3B] text-lg">{item.name}</h4>
//                                                                 {active?.qty > 0 && <MdCheckCircle className="text-[#064E3B] text-xl" />}
//                                                             </div>
//                                                             <div className="flex flex-wrap gap-1 mt-1">
//                                                                 {item.health_tags?.split(',').map(tag => (<span key={tag} className="text-[8px] font-black uppercase px-2 py-0.5 bg-green-100 text-[#064E3B] rounded-md">{tag.trim()}</span>))}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="space-y-3">
//                                                         <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 px-1">
//                                                             <span>Intensity</span>
//                                                             <span className={active?.qty > 0 ? 'text-[#064E3B]' : ''}>{active?.qty || 0} {item.unit}</span>
//                                                         </div>
//                                                         <input type="range" min="0" max="500" step="50" value={active?.qty || 0} onChange={(e) => handleQtyChange(item, e.target.value)} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#064E3B]" />
//                                                         <div className="flex justify-between items-center text-[11px] font-bold text-[#064E3B] opacity-60">
//                                                             <span>₹{item.price}/100ml</span>
//                                                             <span>Subtotal: ₹{Math.round(item.price * ((active?.qty || 0) / 100))}</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="lg:col-span-4">
//                                 <div className="bg-[#064E3B] rounded-[4rem] p-10 lg:sticky lg:top-28 shadow-2xl text-white border-t-8 border-[#FACC15]">
//                                     <div className="mb-8 flex justify-center"><LiquidFill selections={selections} totalQty={totals.qty} /></div>
//                                     <div className="space-y-6">
//                                         <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
//                                             <div className="flex justify-between items-center mb-4">
//                                                 <span className="text-xs font-black uppercase tracking-widest text-[#FACC15]">Nutrition Facts</span>
//                                                 <span className="text-lg font-serif">{totals.calories} <span className="text-[10px]">kcal</span></span>
//                                             </div>
//                                             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
//                                                 <div className="h-full bg-[#FACC15] transition-all duration-500" style={{ width: `${Math.min((totals.calories / 600) * 100, 100)}%` }}></div>
//                                             </div>
//                                         </div>
//                                         <div className="flex justify-between items-baseline px-2">
//                                             <span className="text-2xl font-serif">Total</span>
//                                             <div className="text-right">
//                                                 <div className="text-4xl font-serif text-[#FACC15]">₹{totals.price}</div>
//                                                 <div className="text-[10px] uppercase font-bold opacity-40">Inc. GST & Packing</div>
//                                             </div>
//                                         </div>
//                                         <button disabled={totals.qty === 0} className="group w-full bg-[#FACC15] text-[#064E3B] py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-95 disabled:opacity-20 disabled:grayscale">
//                                             Checkout Blend <MdArrowForward className="group-hover:translate-x-1 transition-transform" size={18} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Catalog Section (Classics) */}
//             <div className="bg-white py-24">
//                 <div className="max-w-[1440px] mx-auto px-6 relative z-10">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//                         <div>
//                             <h3 className="text-4xl font-serif font-bold text-[#064E3B]">Freshly Squeezed Classics</h3>
//                             <p className="text-gray-400 mt-2">Zero customization, pure perfection.</p>
//                         </div>
//                         <div className="h-px flex-1 bg-gray-100 mx-10 hidden md:block"></div>
//                         <button className="text-[#064E3B] font-bold text-xs uppercase tracking-widest border-2 border-[#064E3B]/10 px-6 py-3 rounded-xl hover:bg-[#064E3B] hover:text-white transition-all">
//                             View All Menu
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//                         {simpleJuices.map(juice => (
//                             <div key={juice.id} className="group bg-[#F8FAFA] rounded-[3rem] p-6 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 border border-transparent hover:border-gray-100">
//                                 <div className="relative overflow-hidden rounded-[2rem] mb-6 bg-white aspect-square flex items-center justify-center p-8">
//                                     <img src={getImageUrl(juice.image_url)} className="w-full h-full object-contain group-hover:scale-110 transition duration-700" alt={juice.name} />
//                                     <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-[#064E3B] uppercase tracking-tighter">
//                                         Best Seller
//                                     </div>
//                                 </div>
//                                 <h4 className="font-bold text-[#064E3B] text-xl mb-1">{juice.name}</h4>
//                                 <p className="text-[11px] text-gray-400 font-medium mb-6 line-clamp-1">{juice.short_description || "Traditional cold-press method."}</p>

//                                 <div className="flex justify-between items-center mt-auto">
//                                     <span className="text-2xl font-serif font-bold text-[#064E3B]">₹{juice.price}</span>
//                                     <button className="bg-[#064E3B] text-white p-4 rounded-2xl hover:bg-[#FACC15] hover:text-[#064E3B] transition-all shadow-xl shadow-green-900/10 active:scale-90">
//                                         <MdAddShoppingCart size={20} />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Subtle Footer Info */}
//             <div className="py-12 border-t border-gray-100 text-center">
//                 <div className="flex justify-center gap-8 mb-4">
//                     <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><MdFastfood className="text-[#FACC15]" /> 100% Organic</div>
//                     <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><MdBolt className="text-[#FACC15]" /> Cold Pressed</div>
//                     <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><MdCheckCircle className="text-[#FACC15]" /> Lab Tested</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JuiceBuilder;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { getImageUrl } from '../services/api';
import { toast } from 'react-toastify';
import LiquidFill from '../components/juice/LiquidFill';
import { useCart } from '../context/CartContext';
import {
    MdLocalDrink, MdAddShoppingCart, MdBolt, MdCheckCircle,
    MdSettings, MdAutoFixHigh, MdOutlineScience, MdArrowForward,
    MdTune, MdFastfood, MdInfoOutline, MdAdd, MdAccessTime,MdClose
} from 'react-icons/md';
import Swal from 'sweetalert2';

const JuiceBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); // ⭐ Initialize addToCart

    const [data, setData] = useState(null);
    const [simpleJuices, setSimpleJuices] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selections, setSelections] = useState([]);
    const [customOptions, setCustomOptions] = useState({});
    const [totals, setTotals] = useState({ price: 0, calories: 0, qty: 0 });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEverything = async () => {
            try {
                setLoading(true); // Loading shuru
                const productsRes = await api.get('/products?category_id=11');
                if (productsRes.data.success) {
                    const allJuiceProducts = productsRes.data.data;
                    setSimpleJuices(allJuiceProducts.filter(p => p.product_type === 'simple'));
                    setTemplates(allJuiceProducts.filter(p => p.product_type === 'customizable'));
                }

                if (id && id !== 'undefined' && id !== 'custom') {
                    const builderRes = await api.get(`/juice/builder/${id}`);
                    if (builderRes.data.success) {
                        setData(builderRes.data.data);
                        setTotals(t => ({ ...t, price: Number(builderRes.data.data.product.price) }));
                    }
                }
                else {
                    setData(null); // Agar ID nahi hai toh Lab view dikhao
                }

            } catch (err) {
                console.error("Initialization Error:", err);
                toast.error("Failed to load lab data");
            } finally {
                setLoading(false);
            }
        };
        fetchEverything();
    }, [id]);

    // ⭐ Handle Add to Cart for Simple Juices
    const handleAddToCart = (juice) => {
        addToCart(juice, 1);
        toast.success(`${juice.name} added to cart!`);
    };

    // ⭐ Handle Checkout for Custom Blend
    const handleCheckoutCustom = () => {
        if (totals.qty === 0) {
            toast.error("Please add some ingredients first!");
            return;
        }
        const productImage = data?.product?.image_url ||
            data?.product?.media_url ||
            (templates.find(t => t.id === data?.product?.id)?.image_url) ||
            "";
        // Mapping selections for the cart
        const customJuice = {
            ...data.product,
            id: `custom-${Date.now()}`, // Unique ID for this custom blend
            product_id: data.product.id,
            price: totals.price,
            final_price: totals.price,
            is_custom: true,
            image_url: productImage,
            configuration: {
                ingredients: selections,
                options: customOptions,
                totals: totals
            }
        };
        console.log("Custom Juice to Add:", customJuice); // Debugging Log
        addToCart(customJuice, 1);
        toast.success("Custom masterpiece added to cart!");
        navigate('/cart');
    };

    const handleBackToLab = () => {
        setData(null);
        navigate('/juice-builder');
    };

    const handleQtyChange = (item, qty) => {
        let newSelections = [...selections];
        const idx = newSelections.findIndex(s => s.id === item.id);
        const val = parseInt(qty);
        if (val > 0) {
            const entry = { id: item.id, name: item.name, qty: val, price: item.price, calories: item.calories, unit: item.unit };
            if (idx > -1) newSelections[idx] = entry; else newSelections.push(entry);
        } else { if (idx > -1) newSelections.splice(idx, 1); }
        setSelections(newSelections);
        updateCalculations(newSelections, customOptions);
    };

    const handleOptionSelect = (optId, valId) => {
        const newOptions = { ...customOptions, [optId]: valId };
        setCustomOptions(newOptions);
        updateCalculations(selections, newOptions);
    };

    const updateCalculations = (items, options) => {
        if (!data) return;
        let price = Number(data.product.price);
        let cals = 0; let totalQty = 0;
        items.forEach(s => {
            const factor = s.qty / 100;
            price += s.price * factor; cals += s.calories * factor; totalQty += s.qty;
        });
        Object.keys(options).forEach(optId => {
            const option = data.custom_options.find(o => o.id === parseInt(optId));
            const value = option?.values.find(v => v.id === options[optId]);
            if (value) price += Number(value.price);
        });
        setTotals({ price: Math.round(price), calories: Math.round(cals), qty: totalQty });
    };

   const handleRemoveMasterpiece = (e) => {
    e.stopPropagation(); // Navigation rokne ke liye

    Swal.fire({
        title: 'Remove Masterpiece?',
        text: "Are you sure you want to remove your saved masterpiece?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#064E3B', // Dark Green (Aapka theme color)
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'Keep it',
        background: '#F8FAFA',
        borderRadius: '2rem',
        customClass: {
            title: 'font-serif font-bold text-[#064E3B]',
            confirmButton: 'rounded-xl font-bold uppercase tracking-widest text-xs py-3',
            cancelButton: 'rounded-xl font-bold uppercase tracking-widest text-xs py-3'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('fruitify_custom_mix');
            
            // Ek chota sa success message dikhao
            Swal.fire({
                title: 'Removed!',
                text: 'Masterpiece has been deleted.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                borderRadius: '2rem',
            });

            // 1.5 second baad reload karo taaki success message dikh sake
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    });
};

    if (loading) return (
        <div className="min-h-screen bg-[#064E3B] flex flex-col items-center justify-center text-[#FACC15]">
            <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 border-4 border-[#FACC15]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#FACC15] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="font-serif italic tracking-widest animate-pulse">Initializing Juice Lab...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFA] font-sans text-[#1A2E28]">
            <div className={`${!data ? "bg-[#061916] py-20" : "bg-white pt-24"} transition-all duration-700 relative overflow-hidden`}>
                <div className="max-w-[1440px] mx-auto px-6">
                    {!data ? (
                        /* --- 🧪 LAB GRID VIEW --- */
                        <div className="animate-in fade-in duration-1000">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 bg-[#FACC15] text-[#064E3B] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-6">
                                    <MdOutlineScience /> Signature Lab
                                </div>
                                <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6">
                                    The Juice <span className="text-[#FACC15] italic">Lab</span>
                                </h2>
                                <p className="text-green-100/50 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Choose a base formula engineered by nutrition experts — then fine-tune every milliliter.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">
                                {templates.filter(t => t.id !== 81).map((t, idx) => (
                                    <div
                                        key={t.id}
                                        onClick={() => navigate(`/juice-builder/${t.id}`)}
                                        className="group relative bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
                                    >
                                        <div className="absolute top-5 left-6 text-white/5 font-serif text-6xl italic group-hover:text-[#FACC15]/10 transition-colors">
                                            {String(idx + 1).padStart(2, "0")}
                                        </div>

                                        <div className="relative z-10 w-full h-48 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700">
                                            <img src={getImageUrl(t.image_url)} alt={t.name} className="h-full object-contain drop-shadow-2xl" />
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#FACC15] transition">{t.name}</h3>
                                            <p className="text-white/40 text-xs leading-relaxed line-clamp-3 italic">
                                                {t.full_description || t.short_description}
                                            </p>
                                            {t.nutritional_benefits && (
                                                <div className="pt-3 flex items-center gap-2 border-t border-white/5">
                                                    <MdOutlineScience className="text-[#FACC15]" size={14} />
                                                    <span className="text-[9px] font-black uppercase text-[#FACC15] tracking-widest truncate">
                                                        {t.nutritional_benefits.split(',')[0]}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {(() => {
                                    const savedRecipe = JSON.parse(localStorage.getItem('fruitify_custom_mix'));
                                    const masterData = templates.find(t => t.id === 81);

                                    if (savedRecipe) {
                                        return (
                                            <div onClick={() => navigate(`/juice-builder/custom`, { state: { initialSelections: savedRecipe.ingredients, recipeName: savedRecipe.name } })}
                                                className="group relative bg-gradient-to-br from-[#064E3B] to-[#042f24] border border-[#FACC15]/30 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-2xl flex flex-col h-full">
                                                <button
                                                    onClick={handleRemoveMasterpiece}
                                                    className="absolute top-4 left-6 z-30 bg-red-500/20 hover:bg-red-500 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                                    title="Remove Masterpiece"
                                                >
                                                    <MdClose size={14} />
                                                </button>
                                                <div className="absolute top-4 right-6 text-[#FACC15] font-black text-[8px] uppercase tracking-widest bg-[#FACC15]/10 px-3 py-1 rounded-full border border-[#FACC15]/20">
                                                    YOUR MASTERPIECE
                                                </div>
                                                <div className="relative z-10 w-full h-44 flex items-center justify-center mb-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                                    <div className="scale-90">
                                                        <LiquidFill selections={savedRecipe.ingredients} totalQty={savedRecipe.totalQty || 500} isMini={true} />
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-2 text-center md:text-left">
                                                    <h3 className="text-2xl font-serif font-bold text-[#FACC15] italic tracking-tight">{savedRecipe.name}</h3>
                                                    <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-6">Mastered on: {savedRecipe.date}</p>
                                                    <button className="w-full py-4 bg-[#FACC15] text-[#064E3B] rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-white transition-all shadow-xl">
                                                        REMIX YOUR CREATION
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div onClick={() => navigate(`/juice-builder/custom`)}
                                                className="group relative bg-[#061916] border-2 border-dashed border-[#FACC15]/20 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 hover:border-[#FACC15]/50 flex flex-col h-full overflow-hidden">
                                                <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                                                    <MdOutlineScience size={200} className="text-[#FACC15]" />
                                                </div>
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-[#FACC15] flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.2)] shrink-0">
                                                        <MdAdd className="text-[#064E3B] text-3xl" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-white group-hover:text-[#FACC15] transition-colors uppercase tracking-tighter">
                                                            {masterData?.name || "Custom Molecular Blend"}
                                                        </h3>
                                                        <p className="text-[9px] font-black text-[#FACC15] uppercase tracking-[0.3em] opacity-60">Lab ID: #81-A</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <p className="text-[#FACC15] text-xs font-bold italic leading-relaxed">
                                                        "Your unique masterpiece, crafted from scratch in our lab."
                                                    </p>
                                                    <p className="text-white/40 text-[10px] leading-relaxed">
                                                        {masterData?.nutritional_benefits || "This personalized blend is optimized for maximum bioavailability."}
                                                    </p>
                                                    <div className="pt-4 mt-auto border-t border-white/5">
                                                        <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                                                            <MdAccessTime className="text-[#FACC15] mt-0.5 shrink-0" size={14} />
                                                            <p className="text-[9px] text-white/50 leading-snug">
                                                                <span className="font-black text-[#FACC15] uppercase">Storage:</span> {masterData?.shelf_life || "Consume within 24 hours."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex items-center justify-center gap-2 text-[#FACC15] text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                                                    Open Lab <MdArrowForward size={14} />
                                                </div>
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        </div>
                    ) : (
                        /* --- 🛠️ ACTIVE BUILDER VIEW --- */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-8 duration-700">
                            <div className="lg:col-span-8 space-y-8">
                                <div className="flex justify-between items-end border-b border-gray-100 pb-8">
                                    <div>
                                        <button onClick={handleBackToLab} className="text-[#064E3B] font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2 group">
                                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit Lab
                                        </button>
                                        <h1 className="text-5xl font-serif font-bold text-[#064E3B]">{data.product.name}</h1>
                                    </div>
                                    <div className="flex bg-gray-50 p-2 rounded-2xl gap-2">
                                        {[1, 2, 3, 4].map(s => (
                                            <div key={s} className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs ${step === s ? 'bg-[#064E3B] text-white shadow-xl' : 'text-gray-300'}`}>{s}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative overflow-hidden bg-green-50 p-6 rounded-[2rem] border border-green-100 group transition-all">
                                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2822/2822003.png" alt="Nutrition" className="w-20 h-20" />
                                        </div>
                                        <div className="relative z-10">
                                            <h5 className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <MdOutlineScience size={16} /> Nutritional Profile
                                            </h5>
                                            <p className="text-xs text-green-700/80 leading-relaxed italic font-medium">
                                                {data.product.nutritional_benefits || "Optimized based on your unique ingredient molecular map."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden bg-blue-50 p-6 rounded-[2rem] border border-blue-100 group transition-all">
                                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                            <img src="https://cdn-icons-png.flaticon.com/512/3058/3058224.png" alt="Shelf Life" className="w-20 h-20" />
                                        </div>
                                        <div className="relative z-10">
                                            <h5 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <MdAccessTime size={14} /> Care & Storage
                                            </h5>
                                            <p className="text-xs text-blue-700/80 leading-relaxed font-medium">
                                                {data.product.shelf_life || "Keep refrigerated and consume fresh within 24 hours."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
                                    {['Liquid Base', 'Fruit & Veg', 'Boosters', 'Final Polish'].map((label, i) => (
                                        <button key={i} onClick={() => setStep(i + 1)} className={`flex-1 min-w-[140px] py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all ${step === i + 1 ? 'bg-[#064E3B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{label}</button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
                                    {step === 4 ? (
                                        <div className="col-span-full space-y-6">
                                            {data.custom_options.map(opt => (
                                                <div key={opt.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50">
                                                    <h4 className="font-black text-[#064E3B] mb-6 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2"><MdSettings className="text-lg" /> {opt.name}</h4>
                                                    <div className="flex flex-wrap gap-4">
                                                        {opt.values.map(val => (
                                                            <button key={val.id} onClick={() => handleOptionSelect(opt.id, val.id)} className={`px-8 py-4 rounded-2xl border-2 transition-all font-bold text-sm flex flex-col items-start ${customOptions[opt.id] === val.id ? 'border-[#064E3B] bg-green-50 text-[#064E3B]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
                                                                <span>{val.name}</span>
                                                                <span className="text-[10px] opacity-60">+₹{val.price}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        (step === 1 ? data.ingredients.liquids : step === 2 ? [...data.ingredients.fruits, ...data.ingredients.vegetables] : data.ingredients.boosters).map(item => {
                                            const active = selections.find(s => s.id === item.id);
                                            return (
                                                <div key={item.id} className={`p-6 rounded-[2.5rem] transition-all duration-500 border-2 ${active?.qty > 0 ? 'bg-white border-[#064E3B] shadow-xl' : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'}`}>
                                                    <div className="flex gap-5 mb-6">
                                                        <div className="w-20 h-20 bg-gray-50 rounded-3xl overflow-hidden p-2">
                                                            <img src={`http://localhost:5000${item.image_url}`} className="w-full h-full object-contain" alt={item.name} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <h4 className="font-bold text-[#064E3B] text-lg">{item.name}</h4>
                                                                {active?.qty > 0 && <MdCheckCircle className="text-[#064E3B] text-xl" />}
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {item.health_tags?.split(',').map(tag => (<span key={tag} className="text-[8px] font-black uppercase px-2 py-0.5 bg-green-100 text-[#064E3B] rounded-md">{tag.trim()}</span>))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 px-1">
                                                            <span>Intensity</span>
                                                            <span className={active?.qty > 0 ? 'text-[#064E3B]' : ''}>{active?.qty || 0} {item.unit}</span>
                                                        </div>
                                                        <input type="range" min="0" max="500" step="50" value={active?.qty || 0} onChange={(e) => handleQtyChange(item, e.target.value)} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#064E3B]" />
                                                        <div className="flex justify-between items-center text-[11px] font-bold text-[#064E3B] opacity-60">
                                                            <span>₹{item.price}/100ml</span>
                                                            <span>Subtotal: ₹{Math.round(item.price * ((active?.qty || 0) / 100))}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            <div className="lg:col-span-4">
                                <div className="bg-[#064E3B] rounded-[4rem] p-10 lg:sticky lg:top-28 shadow-2xl text-white border-t-8 border-[#FACC15]">
                                    <div className="mb-8 flex justify-center"><LiquidFill selections={selections} totalQty={totals.qty} /></div>
                                    <div className="space-y-6">
                                        <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-xs font-black uppercase tracking-widest text-[#FACC15]">Nutrition Facts</span>
                                                <span className="text-lg font-serif">{totals.calories} <span className="text-[10px]">kcal</span></span>
                                            </div>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#FACC15] transition-all duration-500" style={{ width: `${Math.min((totals.calories / 600) * 100, 100)}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-baseline px-2">
                                            <span className="text-2xl font-serif">Total</span>
                                            <div className="text-right">
                                                <div className="text-4xl font-serif text-[#FACC15]">₹{totals.price}</div>
                                                <div className="text-[10px] uppercase font-bold opacity-40">Inc. GST & Packing</div>
                                            </div>
                                        </div>
                                        {/* ⭐ Checkout Button Fixed */}
                                        <button
                                            disabled={totals.qty === 0}
                                            onClick={handleCheckoutCustom}
                                            className="group w-full bg-[#FACC15] text-[#064E3B] py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-95 disabled:opacity-20 disabled:grayscale"
                                        >
                                            Checkout Blend <MdArrowForward className="group-hover:translate-x-1 transition-transform" size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Catalog Section (Classics) */}
            <div className="bg-white py-24">
                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h3 className="text-4xl font-serif font-bold text-[#064E3B]">Freshly Squeezed Classics</h3>
                            <p className="text-gray-400 mt-2">Zero customization, pure perfection.</p>
                        </div>
                        <div className="h-px flex-1 bg-gray-100 mx-10 hidden md:block"></div>
                        <button onClick={() => navigate('/shop')} className="text-[#064E3B] font-bold text-xs uppercase tracking-widest border-2 border-[#064E3B]/10 px-6 py-3 rounded-xl hover:bg-[#064E3B] hover:text-white transition-all">
                            View All Menu
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {simpleJuices.map(juice => (
                            <div key={juice.id} className="group bg-[#F8FAFA] rounded-[3rem] p-6 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 border border-transparent hover:border-gray-100">
                                <div className="relative overflow-hidden rounded-[2rem] mb-6 bg-white aspect-square flex items-center justify-center p-8">
                                    <img src={getImageUrl(juice.image_url)} className="w-full h-full object-contain group-hover:scale-110 transition duration-700" alt={juice.name} />
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-[#064E3B] uppercase tracking-tighter">
                                        Best Seller
                                    </div>
                                </div>
                                <h4 className="font-bold text-[#064E3B] text-xl mb-1">{juice.name}</h4>
                                <p className="text-[11px] text-gray-400 font-medium mb-6 line-clamp-1">{juice.short_description || "Traditional cold-press method."}</p>

                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-2xl font-serif font-bold text-[#064E3B]">₹{juice.price}</span>
                                    {/* ⭐ Add to Cart Button Fixed */}
                                    <button
                                        onClick={() => handleAddToCart(juice)}
                                        className="bg-[#064E3B] text-white p-4 rounded-2xl hover:bg-[#FACC15] hover:text-[#064E3B] transition-all shadow-xl shadow-green-900/10 active:scale-90"
                                    >
                                        <MdAddShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle Footer Info */}
            <div className="py-12 border-t border-gray-100 text-center">
                <div className="flex justify-center gap-8 mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><MdFastfood className="text-[#FACC15]" /> 100% Organic</div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><MdBolt className="text-[#FACC15]" /> Cold Pressed</div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><MdCheckCircle className="text-[#FACC15]" /> Lab Tested</div>
                </div>
            </div>
        </div>
    );
};

export default JuiceBuilder;