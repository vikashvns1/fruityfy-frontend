import { useEffect, useState } from 'react';
import ProductCard from '../shared/ProductCard';
import { ArrowRight } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../services/api'; // Import fetchCategories

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for Categories
  const [loading, setLoading] = useState(true);

  // Helper: List of background colors to cycle through
  const bgColors = [
    "bg-purple-50", "bg-orange-50", "bg-yellow-50", 
    "bg-red-50", "bg-green-50", "bg-pink-50", "bg-blue-50"
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Products
        const productData = await fetchProducts();
        const productList = productData.data || []; 
        setProducts(productList);

        // 2. Fetch Categories
        const categoryData = await fetchCategories();
        // Adjust based on your API response structure (e.g. data.data or just data)
        const categoryList = categoryData.data || categoryData || [];
        setCategories(categoryList);

      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Shop By Category (Dynamic) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Shop By Category</h2>
          <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map((cat, idx) => {
              // Construct Image URL
              const imgUrl = cat.image_url 
                ? (cat.image_url.startsWith('http') ? cat.image_url : `http://localhost:5000${cat.image_url}`)
                : "https://cdn-icons-png.flaticon.com/512/1625/1625048.png"; // Fallback icon

              // Cycle through colors
              const bgColor = bgColors[idx % bgColors.length];

              return (
                <div key={cat.id || idx} className="group cursor-pointer flex flex-col items-center gap-3">
                  <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition duration-300`}>
                    <img 
                      src={imgUrl} 
                      alt={cat.name} 
                      className="w-10 h-10 object-cover opacity-80 group-hover:opacity-100"
                      onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/1625/1625048.png"} 
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition text-center line-clamp-1">
                    {cat.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-sm text-gray-400">Loading categories...</p>
          )}
        </div>
      </section>

      {/* 2. Best Sellers Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Best Sellers</h2>
          <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No products found. Please add products from Admin Panel.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default FeaturedSection;