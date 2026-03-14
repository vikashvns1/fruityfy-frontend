// import React, { useState, useEffect } from 'react';
// import { Heart } from 'lucide-react';
// import { addToWishlistApi, removeFromWishlistApi, fetchWishlist } from '../../services/api';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const WishlistHeart = ({ productId, onChange }) => { // <--- 1. onChange prop receive kiya
//     const { user } = useAuth();
//     const [isWishlisted, setIsWishlisted] = useState(false);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (user) {
//             checkStatus();
//         }
//     }, [user, productId]);

//     const checkStatus = async () => {
//         const result = await fetchWishlist();
//         if (result.success && Array.isArray(result.data)) {
//             const exists = result.data.some(item => item.id === productId);
//             setIsWishlisted(exists);
//         }
//     };

//     const handleToggle = async (e) => {
//         e.preventDefault(); 
//         e.stopPropagation();

//         if (!user) {
//             toast.error("Please login to use Wishlist");
//             return;
//         }

//         setLoading(true);
//         if (isWishlisted) {
//             const res = await removeFromWishlistApi(productId);
//             if (res.success) {
//                 setIsWishlisted(false);
//                 toast.success("Removed from Wishlist");
//                 if (onChange) onChange(); // <--- 2. Parent ko bataya ki change hua hai
//             }
//         } else {
//             const res = await addToWishlistApi(productId);
//             if (res.success) {
//                 setIsWishlisted(true);
//                 toast.success("Added to Wishlist");
//                 if (onChange) onChange(); // <--- 2. Yahan bhi bataya
//             }
//         }
//         setLoading(false);
//     };

//     return (
//         <button 
//             onClick={handleToggle} 
//             disabled={loading}
//             className={`transition-transform duration-200 hover:scale-110 flex items-center justify-center ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
//         >
//             <Heart 
//                 size={22} 
//                 fill={isWishlisted ? "currentColor" : "none"} 
//                 className={isWishlisted ? "text-red-500" : "text-gray-400"}
//             />
//         </button>
//     );
// };

// export default WishlistHeart;

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { addToWishlistApi, removeFromWishlistApi, fetchWishlist } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import
import toast from 'react-hot-toast';

const WishlistHeart = ({ productId, onChange }) => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation(); // 2. Initialize translation hook
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(false);

    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        if (user) {
            checkStatus();
        }
    }, [user, productId]);

    const checkStatus = async () => {
        const result = await fetchWishlist();
        if (result.success && Array.isArray(result.data)) {
            const exists = result.data.some(item => item.id === productId);
            setIsWishlisted(exists);
        }
    };

    const handleToggle = async (e) => {
        e.preventDefault(); 
        e.stopPropagation();

        if (!user) {
            toast.error(isRTL ? "يرجى تسجيل الدخول لاستخدام قائمة الأمنيات" : "Please login to use Wishlist");
            return;
        }

        setLoading(true);
        if (isWishlisted) {
            const res = await removeFromWishlistApi(productId);
            if (res.success) {
                setIsWishlisted(false);
                toast.success(isRTL ? "تمت الإزالة من قائمة الأمنيات" : "Removed from Wishlist");
                if (onChange) onChange(); 
            }
        } else {
            const res = await addToWishlistApi(productId);
            if (res.success) {
                setIsWishlisted(true);
                toast.success(isRTL ? "تمت الإضافة إلى قائمة الأمنيات" : "Added to Wishlist");
                if (onChange) onChange(); 
            }
        }
        setLoading(false);
    };

    return (
        <button 
            onClick={handleToggle} 
            disabled={loading}
            className={`transition-transform duration-200 hover:scale-110 flex items-center justify-center ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
        >
            <Heart 
                size={22} 
                fill={isWishlisted ? "currentColor" : "none"} 
                className={isWishlisted ? "text-red-500" : "text-gray-400"}
            />
        </button>
    );
};

export default WishlistHeart;