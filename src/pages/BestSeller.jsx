// import { useEffect, useState } from 'react';
// import { fetchCategories, fetchProducts } from '../services/api';
// import ProductCard from '../components/shared/ProductCard';

// const BestSeller = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [filters, setFilters] = useState({
//     category: '',
//     price: '',
//     sort: 'popular',
//   });

//   useEffect(() => {
//     fetchCategories().then(res => {
//       if (res?.success) setCategories(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     loadProducts();
//   }, [filters]);

//   const loadProducts = async () => {
//     setLoading(true);
//     const res = await fetchProducts({
//       best_seller: 1,
//       category: filters.category,
//       price: filters.price,
//       sort: filters.sort,
//     });
//     setProducts(res?.data || []);
//     setLoading(false);
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen">
//       <div className="max-w-[1280px] mx-auto px-4 py-10">

//         {/* TITLE */}
//         <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mb-8">
//           🌟 Best Sellers
//         </h1>

//         <div className="flex gap-8">

//           {/* LEFT FILTER */}
//           <aside className="w-64 hidden md:block bg-white rounded-2xl shadow p-5 h-fit sticky top-28">
//             <h3 className="font-bold text-lg mb-4">Filters</h3>

//             {/* CATEGORY */}
//             <div className="mb-5">
//               <label className="block text-sm font-semibold mb-2">
//                 Category
//               </label>
//               <select
//                 value={filters.category}
//                 onChange={e =>
//                   setFilters({ ...filters, category: e.target.value })
//                 }
//                 className="w-full border rounded px-3 py-2 text-sm"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* PRICE */}
//             <div className="mb-5">
//               <label className="block text-sm font-semibold mb-2">
//                 Price
//               </label>
//               <select
//                 value={filters.price}
//                 onChange={e =>
//                   setFilters({ ...filters, price: e.target.value })
//                 }
//                 className="w-full border rounded px-3 py-2 text-sm"
//               >
//                 <option value="">All</option>
//                 <option value="0-50">Below ₹50</option>
//                 <option value="50-100">₹50 – ₹100</option>
//                 <option value="100-200">₹100 – ₹200</option>
//               </select>
//             </div>

//             {/* SORT */}
//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Sort By
//               </label>
//               <select
//                 value={filters.sort}
//                 onChange={e =>
//                   setFilters({ ...filters, sort: e.target.value })
//                 }
//                 className="w-full border rounded px-3 py-2 text-sm"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//               </select>
//             </div>
//           </aside>

//           {/* PRODUCTS GRID */}
//           <div className="flex-1">

//             {loading ? (
//               <div className="text-center py-20 text-gray-500">
//                 Loading best sellers...
//               </div>
//             ) : products.length === 0 ? (
//               <div className="text-center py-20 text-gray-500">
//                 No products found
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map(product => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                   />
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSeller;

import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../services/api';
import ProductCard from '../components/shared/ProductCard';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

const BestSeller = () => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useSettings();
  const isRTL = i18n.language === 'ar';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: '',
    price: '',
    sort: 'popular',
  });

  useEffect(() => {
    fetchCategories().then(res => {
      if (res?.success) setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetchProducts({
      best_seller: 1, // Controller isse 'is_bestseller' ke liye use karega
      category_id: filters.category || "",
      price: filters.price || "",
      sort: filters.sort || "popular",
    });
    setProducts(res?.data || []);
    setLoading(false);
  };

  return (
    <section className={`bg-gray-50 min-h-screen py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-[1280px] mx-auto px-4">

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mb-8">
          🌟 {isRTL ? 'الأكثر مبيعاً' : 'Best Sellers'}
        </h1>

        <div className={`flex flex-col md:flex-row gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>

          {/* SIDEBAR FILTERS */}
          <aside className="w-full md:w-64 bg-white rounded-2xl shadow-sm p-5 h-fit sticky top-28 border">
            <h3 className="font-bold text-lg mb-4">{isRTL ? 'الفلاتر' : 'Filters'}</h3>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">{isRTL ? 'الفئة' : 'Category'}</label>
              <select
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <option value="">{isRTL ? 'جميع الفئات' : 'All Categories'}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {isRTL ? (cat.name_ar || cat.name) : cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">{isRTL ? 'السعر' : 'Price'}</label>
              <select
                value={filters.price}
                onChange={e => setFilters({ ...filters, price: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <option value="">{isRTL ? 'الكل' : 'All'}</option>
                <option value="0-50">{isRTL ? 'تحت ٥٠' : 'Below'} {formatPrice(50)}</option>
                <option value="50-100">{formatPrice(50)} – {formatPrice(100)}</option>
                <option value="100-200">{formatPrice(100)} – {formatPrice(200)}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{isRTL ? 'ترتيب حسب' : 'Sort By'}</label>
              <select
                value={filters.sort}
                onChange={e => setFilters({ ...filters, sort: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <option value="popular">{isRTL ? 'الأكثر شعبية' : 'Most Popular'}</option>
                <option value="price_low">{isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price_high">{isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              </select>
            </div>
          </aside>

          {/* GRID */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20 text-gray-500 font-bold">{t('common.loading')}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-500">{isRTL ? 'لم يتم العثور على منتجات' : 'No products found'}</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;