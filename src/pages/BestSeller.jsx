import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../services/api';
import ProductCard from '../components/shared/ProductCard';

const BestSeller = () => {
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
      best_seller: 1,
      category: filters.category,
      price: filters.price,
      sort: filters.sort,
    });
    setProducts(res?.data || []);
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mb-8">
          🌟 Best Sellers
        </h1>

        <div className="flex gap-8">

          {/* LEFT FILTER */}
          <aside className="w-64 hidden md:block bg-white rounded-2xl shadow p-5 h-fit sticky top-28">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* CATEGORY */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={e =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">
                Price
              </label>
              <select
                value={filters.price}
                onChange={e =>
                  setFilters({ ...filters, price: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="0-50">Below ₹50</option>
                <option value="50-100">₹50 – ₹100</option>
                <option value="100-200">₹100 – ₹200</option>
              </select>
            </div>

            {/* SORT */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={e =>
                  setFilters({ ...filters, sort: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <div className="flex-1">

            {loading ? (
              <div className="text-center py-20 text-gray-500">
                Loading best sellers...
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No products found
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
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
