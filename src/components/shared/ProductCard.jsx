import { useNavigate } from 'react-router-dom';
import { Star, Check, Plus, Tag } from 'lucide-react'; // ⭐ Tag icon added
import { useState } from 'react';

// Contexts & Helpers
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { getImageUrl } from '../../services/api';
import WishlistHeart from './WishlistHeart';
import { toast } from 'react-toastify';

const ProductCard = ({ product, campaign = null, onWishlistChange }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useSettings();
  const [isAdded, setIsAdded] = useState(false);

  /* ================= PRICE & CAMPAIGN LOGIC ================= */
  const basePrice = Number(product.price) || 0;
  const standardDiscountPrice = Number(product.discount_price) || null;

  // 🚀 Naya Campaign Logic: Agar campaign prop hai, toh price recalculate hoga
  let finalPrice = standardDiscountPrice ?? basePrice;
  let originalPrice = standardDiscountPrice ? basePrice : null;
  let campaignBadgeText = null;

  if (campaign) {
    originalPrice = basePrice; // Campaign mein base price hi strike-through hoga
    if (campaign.discount_type === 'percentage') {
      finalPrice = basePrice - (basePrice * (Number(campaign.discount_value) / 100));
      campaignBadgeText = `${Math.round(campaign.discount_value)}% OFF`;
    } else if (campaign.discount_type === 'flat') {
      finalPrice = basePrice - Number(campaign.discount_value);
      campaignBadgeText = `AED ${campaign.discount_value} OFF`;
    }
  }

  const discountPercent =
    originalPrice && finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  /* ================= META ================= */
  const isOutOfStock = product.stock_quantity === 0;
  const rating = product.rating ?? 4.5;
  const ratingCount = product.rating_count ?? 0;

  const deliveryMap = {
    same_day: { label: 'Today', icon: '⚡' },
    next_day: { label: 'Tomorrow', icon: '📅' },
    two_to_four_days: { label: '2–4 Days', icon: '🚚' },
  };

  const delivery = deliveryMap[product.delivery_eta] || deliveryMap.same_day;

  /* ================= ADD TO CART ================= */
  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isOutOfStock) {
      navigate(`/product/${product.slug}?notify=1`);
      return;
    }

    // ⭐ Cart mein discounted price bhej rahe hain
    addToCart(
      {
        ...product,
        price: finalPrice,
      },
      1
    );

    toast.success(`${product.name} added to cart! 🛒`, {
        position: "bottom-right",
        autoClose: 2000,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className={`
        group bg-white rounded-2xl shadow-soft hover:shadow-card
        transition-all duration-300 cursor-pointer
        overflow-hidden flex flex-col h-full min-h-[400px]
        relative transform hover:-translate-y-1
        ${campaign ? 'border-2 border-orange-100' : ''} 
      `}
    >
      {/* ================= BADGES ================= */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {/* 🔥 Campaign Specific Badge */}
        {campaign && (
            <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg animate-pulse">
                <Tag size={10} /> {campaignBadgeText}
            </span>
        )}

        {product.is_new_arrival === 1 && (
          <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase w-fit">
            New
          </span>
        )}

        {!campaign && discountPercent > 0 && (
          <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-fit">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* ================= WISHLIST ================= */}
      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition">
          <WishlistHeart productId={product.id} onChange={onWishlistChange} />
        </div>
      </div>

      {/* ================= IMAGE ================= */}
      <div className="relative w-full aspect-square bg-cream/50 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={getImageUrl(product.image_url)}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              isOutOfStock ? 'grayscale opacity-60' : ''
            }`}
          />
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="bg-dark text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-primaryLight uppercase flex items-center gap-1">
            {delivery.icon} {delivery.label}
          </span>

          {ratingCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <Star size={10} className="fill-secondary text-secondary" />
              {rating}
            </span>
          )}
        </div>

        <h3 className="text-base font-serif font-bold leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-muted mb-4">
          {product.unit ? `Approx. ${product.unit}` : 'Per Item'}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && originalPrice > finalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className={`text-lg font-bold ${campaign ? 'text-orange-600' : 'text-primary'}`}>
              {formatPrice(finalPrice)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`
              h-9 w-9 md:w-auto md:px-4 rounded-full
              flex items-center justify-center gap-2
              transition-all shadow-sm
              ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400'
                  : isAdded
                  ? 'bg-primary text-white scale-105'
                  : campaign 
                  ? 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg' 
                  : 'bg-primary text-white hover:bg-primaryLight hover:shadow-lg'
              }
            `}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span className="hidden md:inline text-xs font-bold">Added</span>
              </>
            ) : (
              <>
                <Plus size={18} strokeWidth={3} />
                <span className="hidden md:inline text-xs font-bold">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;