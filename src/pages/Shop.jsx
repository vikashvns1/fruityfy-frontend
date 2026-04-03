// import { useEffect, useState, useMemo } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { 
//   ChevronRight, 
//   ChevronDown, 
//   SlidersHorizontal, 
//   LayoutGrid, 
//   ArrowUpDown,
//   RefreshCcw,
//   SearchX,
//   Home
// } from 'lucide-react';
// import ProductCard from '../components/shared/ProductCard';
// import { fetchProducts, fetchCategories } from '../services/api';
// import { useSettings } from '../context/SettingsContext';

// const Shop = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { formatPrice } = useSettings(); //

//   const queryParams = new URLSearchParams(location.search);
//   const selectedCategoryId = queryParams.get('category');

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortBy, setSortBy] = useState('default');

//   /* ================= FETCH PRODUCTS (SERVER-SIDE FILTER) ================= */
//   // Jab bhi category ID badlegi, ye useEffect dobara trigger hoga
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setLoading(true);
//         // Backend ko params bhej rahe hain taaki wo filter karke de
//         const res = await fetchProducts({ 
//             category_id: selectedCategoryId,
//             limit: 50 // Zyada products fetch karne ke liye
//         });

//         if (res.success) {
//           setProducts(res.data || []); //
//         }
//       } catch (err) {
//         console.error('Fetch Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProducts();
//   }, [selectedCategoryId]); //

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     fetchCategories().then(res => {
//       if (res.success) setCategories(res.data || []); //
//     });
//   }, []);

//   /* ================= SORTING (CLIENT-SIDE) ================= */
//   const sortedProducts = useMemo(() => {
//     let result = [...products];
//     if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price); //
//     if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price); //
//     if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating); //
//     return result;
//   }, [products, sortBy]);

//   const activeCategory = categories.find(c => c.id.toString() === selectedCategoryId); //

//   const getSubCategories = parentId =>
//     categories.filter(c => c.parent_id === parentId); //

//   return (
//     <div className="bg-[#FBFCFD] min-h-screen py-8 selection:bg-green-100 font-sans">
//       <div className="w-[94%] max-w-[1440px] mx-auto flex gap-8">

//         {/* ================= SIDEBAR (PREMIUM DESIGN) ================= */}
//         <aside className="hidden lg:block w-72 h-fit sticky top-28">
//           <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
//             <div className="flex items-center gap-2 mb-6 pl-2">
//               <LayoutGrid size={20} className="text-[#15803d]" />
//               <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Collections</h3>
//             </div>

//             <nav className="space-y-1.5">
//               <button
//                 onClick={() => navigate('/shop')}
//                 className={`w-full text-left text-sm py-3.5 px-5 rounded-2xl transition-all duration-300 font-bold flex items-center gap-3
//                 ${!selectedCategoryId
//                   ? 'bg-green-600 text-white shadow-xl shadow-green-100'
//                   : 'text-gray-500 hover:bg-gray-50'}`}
//               >
//                 <Home size={16} /> All Products
//               </button>

//               {categories.filter(c => !c.parent_id).map(parent => {
//                 const subs = getSubCategories(parent.id);
//                 const isOpen = selectedCategoryId === parent.id.toString() || 
//                                subs.some(s => s.id.toString() === selectedCategoryId);

//                 return (
//                   <div key={parent.id} className="pt-1">
//                     <button
//                       onClick={() => navigate(`/shop?category=${parent.id}`)}
//                       className={`w-full flex justify-between items-center text-sm py-3 px-5 rounded-2xl transition-all
//                       ${isOpen ? 'bg-green-50 text-green-800 font-black' : 'text-gray-600 hover:bg-gray-50'}`}
//                     >
//                       {parent.name}
//                       {subs.length > 0 && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
//                     </button>

//                     {subs.length > 0 && isOpen && (
//                       <div className="mt-1 ml-6 space-y-1 border-l-2 border-green-100 pl-4 animate-in slide-in-from-left-2 duration-300">
//                         {subs.map(sub => (
//                           <button
//                             key={sub.id}
//                             onClick={() => navigate(`/shop?category=${sub.id}`)}
//                             className={`w-full text-left text-xs py-2.5 px-3 rounded-xl transition-all
//                             ${selectedCategoryId === sub.id.toString()
//                               ? 'text-green-700 font-black bg-white shadow-sm'
//                               : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
//                           >
//                             {sub.name}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </nav>
//           </div>
//         </aside>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="flex-1 space-y-6">

//           {/* TOP BAR / BREADCRUMB */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="space-y-1">
//                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
//                  {activeCategory?.name || 'Fresh Market'}
//                </h1>
//                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
//                   <Link to="/" className="hover:text-green-600">Home</Link>
//                   <ChevronRight size={12} />
//                   <span className="text-green-700">{activeCategory?.name || 'Shop All'}</span>
//                </div>
//             </div>

//             <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
//                 <span className="text-xs font-black text-gray-800 uppercase tracking-tighter">
//                    {products.length} Items Found
//                 </span>
//             </div>
//           </div>

//           {/* FILTERS & SORTING TOOLBAR */}
//           <div className="bg-white p-3 rounded-[1.5rem] shadow-sm border border-gray-50 flex flex-wrap justify-between items-center gap-4">
//             <div className="flex items-center gap-3 pl-2">
//               <div className="p-2 bg-green-50 rounded-xl text-green-700">
//                 <SlidersHorizontal size={18} />
//               </div>
//               <span className="text-sm font-black text-gray-700 uppercase tracking-tight">Refine Collection</span>
//             </div>

//             <div className="flex items-center gap-3 pr-2">
//               <ArrowUpDown size={14} className="text-gray-400" />
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="text-xs font-bold text-gray-600 bg-gray-50 border-none rounded-xl py-2.5 px-5 focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
//               >
//                 <option value="default">Sort: Recommended</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Top Rated</option>
//               </select>
//             </div>
//           </div>

//           {/* PRODUCTS GRID SECTION */}
//           {loading ? (
//             <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
//                <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />
//                <p className="font-black text-gray-400 uppercase tracking-widest text-[10px] animate-pulse">Syncing Inventory...</p>
//             </div>
//           ) : sortedProducts.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
//               {sortedProducts.map(p => (
//                 <ProductCard key={p.id} product={p} /> //
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white py-32 rounded-[3rem] border-2 border-dashed border-gray-100 text-center">
//               <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <SearchX size={40} className="text-gray-200" />
//               </div>
//               <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">No Harvest Found</h2>
//               <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto font-medium">We couldn't find any products in this category at the moment.</p>
//               <button
//                 onClick={() => navigate('/shop')}
//                 className="mt-8 bg-gray-900 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-gray-200 active:scale-95"
//               >
//                 Explore All Products
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;

import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  ArrowUpDown,
  RefreshCcw,
  SearchX,
  Home
} from 'lucide-react';
import ProductCard from '../components/shared/ProductCard';
import { fetchProducts, fetchCategories } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice } = useSettings();
  const { t, i18n } = useTranslation(); // 2. Initialize translation hook

  const isRTL = i18n.language === 'ar'; // 3. RTL Check

  const queryParams = new URLSearchParams(location.search);
  const selectedCategoryId = queryParams.get('category');
  const searchQuery = queryParams.get('search');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchProducts({
          category_id: selectedCategoryId,
          q: searchQuery,
          limit: 50
        });

        if (res.success) {
          setProducts(res.data || []);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategoryId, searchQuery]);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetchCategories().then(res => {
      if (res.success) setCategories(res.data || []);
    });
  }, []);

  /* ================= SORTING ================= */
  const sortedProducts = useMemo(() => {
    let result = [...products];
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, sortBy]);

  const activeCategory = categories.find(c => c.id.toString() === selectedCategoryId);

  const getSubCategories = parentId =>
    categories.filter(c => c.parent_id === parentId);

  return (
    <div className={`bg-[#FBFCFD] min-h-screen py-8 selection:bg-green-100 font-sans ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`w-[94%] max-w-[1440px] mx-auto flex gap-8 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden lg:block w-72 h-fit sticky top-28">
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
            <div className={`flex items-center gap-2 mb-6 ${isRTL ? 'pr-2' : 'pl-2'} ${isRTL ? 'flex-row-reverse' : ''}`}>
              <LayoutGrid size={20} className="text-[#15803d]" />
              <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">{t('footer.shop_title')}</h3>
            </div>

            <nav className="space-y-1.5">
              <button
                onClick={() => navigate('/shop')}
                className={`w-full text-sm py-3.5 px-5 rounded-2xl transition-all duration-300 font-bold flex items-center gap-3
                ${isRTL ? 'text-right flex-row-reverse' : 'text-left flex-row'}
                ${!selectedCategoryId
                    ? 'bg-green-600 text-white shadow-xl shadow-green-100'
                    : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Home size={16} /> {isRTL ? 'كل المنتجات' : 'All Products'}
              </button>

              {categories.filter(c => !c.parent_id).map(parent => {
                const subs = getSubCategories(parent.id);
                const isOpen = selectedCategoryId === parent.id.toString() ||
                  subs.some(s => s.id.toString() === selectedCategoryId);

                return (
                  <div key={parent.id} className="pt-1">
                    <button
                      onClick={() => navigate(`/shop?category=${parent.id}`)}
                      className={`w-full flex justify-between items-center text-sm py-3 px-5 rounded-2xl transition-all
                      ${isRTL ? 'flex-row-reverse' : 'flex-row'}
                      ${isOpen ? 'bg-green-50 text-green-800 font-black' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {isRTL ? (parent.name_ar || parent.name) : parent.name}
                      {subs.length > 0 && (
                        isOpen ? <ChevronDown size={14} /> : (isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />)
                      )}
                    </button>

                    {subs.length > 0 && isOpen && (
                      <div className={`mt-1 space-y-1 animate-in slide-in-from-${isRTL ? 'right' : 'left'}-2 duration-300 ${isRTL ? 'mr-6 border-r-2 pr-4' : 'ml-6 border-l-2 pl-4'} border-green-100`}>
                        {subs.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => navigate(`/shop?category=${sub.id}`)}
                            className={`w-full text-xs py-2.5 px-3 rounded-xl transition-all
                            ${isRTL ? 'text-right' : 'text-left'}
                            ${selectedCategoryId === sub.id.toString()
                                ? 'text-green-700 font-black bg-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
                          >
                            {isRTL ? (sub.name_ar || sub.name) : sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 space-y-6">

          {/* TOP BAR / BREADCRUMB */}
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {isRTL ? (activeCategory?.name_ar || activeCategory?.name || 'سوق طازج') : (activeCategory?.name || 'Fresh Market')}
              </h1>
              <div className={`flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link to="/" className="hover:text-green-600">{t('nav.home')}</Link>
                {isRTL ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
                <span className="text-green-700">{isRTL ? (activeCategory?.name_ar || activeCategory?.name || 'تسوق الكل') : (activeCategory?.name || 'Shop All')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-black text-gray-800 uppercase tracking-tighter">
                {products.length} {t('product.items')} {isRTL ? 'تم العثور عليها' : 'Found'}
              </span>
            </div>
          </div>

          {/* FILTERS & SORTING TOOLBAR */}
          <div className={`bg-white p-3 rounded-[1.5rem] shadow-sm border border-gray-50 flex flex-wrap justify-between items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'pr-2 flex-row-reverse' : 'pl-2'}`}>
              <div className="p-2 bg-green-50 rounded-xl text-green-700">
                <SlidersHorizontal size={18} />
              </div>
              <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{isRTL ? 'تصفية المجموعة' : 'Refine Collection'}</span>
            </div>

            <div className={`flex items-center gap-3 ${isRTL ? 'pl-2 flex-row-reverse' : 'pr-2'}`}>
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`text-xs font-bold text-gray-600 bg-gray-50 border-none rounded-xl py-2.5 px-5 focus:ring-2 focus:ring-green-500 outline-none cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <option value="default">{t('common.sort_by')}: {isRTL ? 'الموصى به' : 'Recommended'}</option>
                <option value="price-low">{isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-high">{isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                <option value="rating">{isRTL ? 'الأعلى تقييماً' : 'Top Rated'}</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID SECTION */}
          {loading ? (
            <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />
              <p className="font-black text-gray-400 uppercase tracking-widest text-[10px] animate-pulse">{t('common.loading')}</p>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {sortedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white py-32 rounded-[3rem] border-2 border-dashed border-gray-100 text-center">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchX size={40} className="text-gray-200" />
              </div>
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : (isRTL ? 'لم يتم العثور على منتجات' : 'No Products Found')
                }
              </h2>

              <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto font-medium">
                {searchQuery
                  ? (isRTL
                    ? 'لم نتمكن من العثور على أي نتائج لبحثك. حاول كلمات أخرى.'
                    : 'Try searching with different keywords or check spelling.')
                  : (isRTL
                    ? 'لا توجد منتجات في هذه الفئة حالياً.'
                    : 'We couldn’t find any products in this category.')
                }
              </p>  <button
                onClick={() => navigate('/shop')}
                className="mt-8 bg-gray-900 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-gray-200 active:scale-95"
              >
                {t('common.view_all')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;