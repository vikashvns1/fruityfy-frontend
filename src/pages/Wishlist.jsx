import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWishlist } from '../services/api';
import ProductCard from '../components/shared/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Protect Route
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // 2. Fetch Data
    useEffect(() => {
        if (user) {
            loadWishlist();
        }
    }, [user]);

    const loadWishlist = async () => {
        setLoading(true);
        const result = await fetchWishlist();
        if (result.success && Array.isArray(result.data)) {
            setWishlistItems(result.data);
        }
        setLoading(false);
    };

    // <--- 3. Ye function list ko refresh karega
    const handleWishlistUpdate = () => {
        loadWishlist(); 
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="text-red-500 fill-red-500" size={32} />
                    <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
                    <span className="text-gray-500 text-sm">({wishlistItems.length} items)</span>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : wishlistItems.length > 0 ? (
                    /* Product Grid */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                // <--- 4. Function ProductCard ko pass kiya
                                onWishlistChange={handleWishlistUpdate} 
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
                        <Heart size={64} className="text-gray-200 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-6">Save items you love to buy them later.</p>
                        <button 
                            onClick={() => navigate('/shop')}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition-colors"
                        >
                            <ShoppingBag size={20} />
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;