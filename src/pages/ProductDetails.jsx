import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingCart, Star, Truck, ShieldCheck, Award, ChevronRight, 
  CheckCircle, ThumbsUp, Heart, Share2, Leaf, Clock, MapPin, Info 
} from 'lucide-react';

// API & Helpers
import { fetchProductBySlug, fetchProductsByCategory, fetchProductReviews, getImageUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import ProductCard from '../components/shared/ProductCard';
import toast from 'react-hot-toast'; // ⭐ Import Toast

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { formatPrice } = useSettings();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const loadProductData = async () => {
            try {
                setLoading(true);
                const res = await fetchProductBySlug(slug);

                if (res.success) {
                    const currentProduct = res.data;
                    setProduct(currentProduct);

                    if (currentProduct.images && currentProduct.images.length > 0) {
                        const firstImg = typeof currentProduct.images[0] === 'string' 
                            ? currentProduct.images[0] 
                            : currentProduct.images[0].image_url;
                        setSelectedImage(firstImg);
                    } else {
                        setSelectedImage(currentProduct.image_url || '');
                    }

                    if (currentProduct.category_id) {
                        const relatedRes = await fetchProductsByCategory(currentProduct.category_id);
                        const filtered = Array.isArray(relatedRes)
                            ? relatedRes.filter(p => p.id !== currentProduct.id).slice(0, 5)
                            : [];
                        setRelatedProducts(filtered);
                    }

                    const reviewRes = await fetchProductReviews(currentProduct.id);
                    if (reviewRes.success) {
                        setReviews(reviewRes.data);
                    }
                } else {
                    navigate('/shop');
                }
            } catch (error) {
                console.error("Error loading product:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProductData();
        window.scrollTo(0, 0);
    }, [slug, navigate]);

    // --- HANDLERS ---
    const handleAddToCart = () => {
        if (!product) return;

        // Ensure image_url is present in the object sent to cart
        const productWithImg = {
            ...product,
            image_url: selectedImage || product.image_url // Ensuring cart gets the current image
        };

        addToCart(productWithImg, quantity);
        toast.success(`${quantity} x ${product.name} added to cart! 🛒`, {
            position: "bottom-center",
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
        });
    };
const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    // --- DATA PREP ---
    const price = Number(product?.price) || 0;
    const discountPrice = Number(product?.discount_price) || 0;
    const finalPrice = discountPrice > 0 ? discountPrice : price;
    const discountPercent = discountPrice > 0 ? Math.round(((price - discountPrice) / price) * 100) : 0;
    const isOutOfStock = product?.stock_quantity === 0;

    const galleryImages = Array.isArray(product?.images) 
        ? product.images.map(img => typeof img === 'string' ? img : img.image_url) 
        : [product?.image_url];

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : "0.0";
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { if (starCounts[r.rating] !== undefined) starCounts[r.rating]++; });

    if (loading) return <div className="h-screen flex items-center justify-center text-[#15803d] font-bold animate-pulse">Growing Freshness...</div>;
    if (!product) return null;

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-12 font-sans text-slate-900">
            
            {/* BREADCRUMBS - More modern look */}
            <div className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-[1280px] mx-auto px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                    <Link to="/" className="hover:text-green-600 transition">Home</Link> 
                    <ChevronRight size={14} />
                    <Link to="/shop" className="hover:text-green-600 transition">Shop</Link> 
                    <ChevronRight size={14} />
                    <span className="text-slate-800 font-semibold truncate">{product.name}</span>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- LEFT: GALLERY & ACTIONS --- */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
                        <div className="flex flex-col-reverse lg:flex-row gap-4">
                            {/* Thumbnails */}
                            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[450px] scrollbar-hide">
                                {galleryImages.map((img, index) => (
                                    <div 
                                        key={index}
                                        onMouseEnter={() => setSelectedImage(img)}
                                        className={`w-16 h-16 shrink-0 rounded-xl border-2 cursor-pointer p-1.5 transition-all ${selectedImage === img ? 'border-green-500 bg-green-50' : 'border-slate-100 hover:border-slate-300'}`}
                                    >
                                        <img src={getImageUrl(img)} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                ))}
                            </div>

                            {/* Main Image View */}
                            <div className="flex-1 relative aspect-square rounded-xl bg-slate-50/50 overflow-hidden group border border-slate-100 flex items-center justify-center">
                                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                                    <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-all border border-slate-100">
                                        <Heart size={20} />
                                    </button>
                                    <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-green-500 transition-all border border-slate-100">
                                        <Share2 size={18} />
                                    </button>
                                </div>

                                <div 
                                    className="w-full h-full cursor-zoom-in flex items-center justify-center"
                                    onMouseEnter={() => setIsZoomed(true)}
                                    onMouseLeave={() => setIsZoomed(false)}
                                    onMouseMove={handleMouseMove}
                                >
                                    <img
                                        src={getImageUrl(selectedImage)}
                                        alt={product.name}
                                        className={`max-w-[90%] max-h-[90%] object-contain transition-transform duration-300 ${isOutOfStock ? 'grayscale' : ''}`}
                                        style={{
                                            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                                            transform: isZoomed ? 'scale(1.8)' : 'scale(1)'
                                        }}
                                    />
                                </div>
                                {isOutOfStock && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center font-bold text-red-600 text-xl tracking-tighter border-2 border-red-600 m-12 rounded-full rotate-[-15deg]">SOLD OUT</div>}
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button 
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-100 transition-all active:scale-95 disabled:bg-slate-200 uppercase tracking-tight text-sm"
                            >
                                <ShoppingCart size={20} /> {isOutOfStock ? 'No Stock' : 'Add to Cart'}
                            </button>
                            <button 
                            onClick={handleBuyNow}
                                disabled={isOutOfStock}
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-95 disabled:bg-slate-200 uppercase tracking-tight text-sm"
                            >
                                <Truck size={20} /> Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: DETAILS SECTION --- */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                        
                        {/* Title & Badge */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded">Fresh {product.category_name}</span>
                                {product.is_featured === 1 && (
                                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold border border-blue-100 uppercase tracking-wider">
                                        <ShieldCheck size={12} /> Fruityfy Assured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-tight">{product.name}</h1>
                            
                            <div className="flex items-center gap-4 pt-1">
                                <div className="flex items-center gap-1.5 bg-green-700 text-white px-2.5 py-1 rounded-lg text-sm font-bold">
                                    {avgRating} <Star size={14} fill="white" className="mb-0.5" />
                                </div>
                                <span className="text-sm text-slate-400 font-medium">{totalReviews} Ratings & {reviews.length} Reviews</span>
                            </div>
                        </div>

                        {/* Price Area */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-black text-slate-900">{formatPrice(finalPrice)}</span>
                                {discountPrice > 0 && (
                                    <>
                                        <span className="text-slate-400 line-through text-lg font-medium">{formatPrice(price)}</span>
                                        <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded text-sm">{discountPercent}% OFF</span>
                                    </>
                                )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
                                <Info size={12} /> Price inclusive of all taxes
                            </p>
                        </div>

                        {/* Benefits Icons - Enhanced for Fruits/Veg/Flowers */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {[
                                { icon: <Leaf className="text-green-500" />, label: '100% Organic' },
                                { icon: <Clock className="text-orange-500" />, label: 'Fast Delivery' },
                                { icon: <Award className="text-blue-500" />, label: 'Quality Tested' },
                                { icon: <MapPin className="text-red-500" />, label: 'Farm Source' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-white hover:border-green-200 transition-colors">
                                    <div className="mb-2">{item.icon}</div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase text-center leading-none">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Description Table */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Info size={16} className="text-green-600" /> PRODUCT HIGHLIGHTS
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
                                    {product.country_origin && (
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Origin</span>
                                            <span className="text-slate-800 font-semibold">{product.country_origin}</span>
                                        </div>
                                    )}
                                    {product.unit && (
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Net Weight</span>
                                            <span className="text-slate-800 font-semibold">{product.unit}</span>
                                        </div>
                                    )}
                                    {product.shelf_life && (
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Shelf Life</span>
                                            <span className="text-slate-800 font-semibold">{product.shelf_life}</span>
                                        </div>
                                    )}
                                    {product.sku && (
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Product Code</span>
                                            <span className="text-slate-800 font-mono text-xs">{product.sku}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Main Text Content */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Description</h3>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    {product.full_description || product.short_description}
                                </p>
                            </div>

                            {/* Care / Storage Instructions (Dynamic Tip) */}
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                                <h4 className="text-amber-800 font-bold text-sm mb-2 flex items-center gap-2 uppercase tracking-wide">
                                    <ThumbsUp size={16} /> Freshness Tip
                                </h4>
                                <p className="text-amber-700 text-sm leading-relaxed italic">
                                    {product.category_name?.toLowerCase().includes('flower') 
                                        ? "For long vase life, cut the stems at a 45° angle and keep them in cool water. Avoid direct sunlight."
                                        : "Store in the lower crisper drawer of your refrigerator to maintain crispness and vitamins."}
                                </p>
                            </div>

                            {/* Nutritional Info */}
                            {product.nutritional_benefits && (
                                <div className="p-5 bg-green-50 border border-green-100 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                                        <Leaf size={100} fill="green" />
                                    </div>
                                    <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2 text-sm uppercase">
                                        <Award size={18} /> Nutritional Health Benefits
                                    </h3>
                                    <p className="text-green-700 text-sm leading-relaxed relative z-10">
                                        {product.nutritional_benefits}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* REVIEWS SECTION - Cleaner Design */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Customer Reviews</h2>
                            <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors">
                                Rate This Item
                            </button>
                        </div>

                        {reviews.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <Star size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-medium italic">Fresh out of stock on reviews! Be the first to share your experience.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                {/* Rating Summary */}
                                <div className="md:w-1/3 p-8 bg-slate-50/30">
                                    <div className="text-center md:text-left">
                                        <div className="text-5xl font-black text-slate-800 mb-2">{avgRating}</div>
                                        <div className="flex gap-1 justify-center md:justify-start mb-6 text-green-600">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(avgRating) ? "currentColor" : "none"} />)}
                                        </div>
                                        <div className="space-y-3">
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <div key={star} className="flex items-center gap-3">
                                                    <span className="text-[10px] font-bold text-slate-400 w-4">{star}★</span>
                                                    <div className="flex-1 h-2 bg-slate-100 rounded-full">
                                                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${totalReviews > 0 ? (starCounts[star] / totalReviews) * 100 : 0}%` }}></div>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 w-4 text-right">{starCounts[star]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable Review List */}
                                <div className="md:w-2/3 max-h-[500px] overflow-y-auto p-4 space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-4 rounded-xl border border-slate-50 bg-slate-50/20 hover:bg-white transition-all shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className={`px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1 ${review.rating >= 4 ? 'bg-green-600' : 'bg-amber-500'}`}>
                                                    {review.rating} <Star size={8} fill="white" />
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium">{new Date(review.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-800 mb-1 capitalize">{review.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed mb-4 italic">"{review.comment}"</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">{review.user_name?.charAt(0)}</div>
                                                    <span className="text-[10px] font-bold text-slate-700">{review.user_name}</span>
                                                    {review.is_verified_purchase === 1 && <span className="text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={8} /> Verified Purchase</span>}
                                                </div>
                                                <button className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-green-600">
                                                    <ThumbsUp size={12} /> Helpful?
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            {relatedProducts.length > 0 && (
                <div className="max-w-[1280px] mx-auto mt-12 px-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-green-600 pl-4">Similar Fresh Items</h2>
                        <Link to="/shop" className="text-green-600 text-sm font-bold hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {relatedProducts.map(rp => <ProductCard key={rp.id} product={rp} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;