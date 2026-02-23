import axios from 'axios';

// 1. BASE_URL ko export karein taaki components me images ke liye use ho sake
export const BASE_URL = "http://localhost:5000"; 

// 2. HELPER FUNCTION: Get Image URL
export const getImageUrl = (path, defaultUrl = "") => {
    // Agar path nahi hai (null/undefined/empty), to default return karo
    if (!path) return defaultUrl;

    // Agar path me already 'http' hai (matlab external link hai like Google/Unsplash), to wahi return karo
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }

    // Otherwise, BASE_URL ke sath jod kar return karo
    return `${BASE_URL}${path}`;
};

// 2. API_URL define karein (BASE_URL + /api)
const API_URL = `${BASE_URL}/api`;

// 3. Axios Instance banayein (Sirf valid config ke sath)
const api = axios.create({
    baseURL: API_URL,
    // headers wagera yahan aa sakte hain
});

// Helper: Get Token Headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ==========================================
// BANNER API
// ==========================================

export const fetchHomeBanners = async () => {
    try {
        const response = await api.get('/banners');
        if (response.data.success) {
            return response.data.data.filter(
                b =>
                    b.is_active === 1 &&
                    b.position === 'home_main'
            );
        }
        return [];
    } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
};

// ==========================================
// CATEGORY API
// ==========================================

export const fetchCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data; 
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, data: [] };
    }
};

// ==========================================
// PRODUCT API
// ==========================================

// Purana code params ignore kar raha tha, naya code params bhejega
export const fetchProducts = async (params = {}) => {
    try {
        // 'params' ko request mein pass karna zaroori hai
        const response = await api.get('/products', { params });
        return response.data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, data: [] };
    }
};

export const fetchFeaturedProducts = async () => {
    try {
        const response = await api.get('/products');
        if (response.data.success) {
            const featured = response.data.data.filter(p => p.is_featured === 1);
            return featured;
        }
        return [];
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
};

export const fetchProductsByCategory = async (categoryId) => {
    try {
        const response = await api.get(`/products?category=${categoryId}`);
        return response.data.success ? response.data.data : [];
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
};

export const fetchProductBySlug = async (slug) => {
    try {
        const response = await api.get(`/products/details/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return { success: false, message: error.message };
    }
};


// ==========================================
// AUTH API
// ==========================================

export const loginApi = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data; 
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Login failed" };
    }
};

export const registerApi = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
};

// ==========================================
// WISHLIST API
// ==========================================

export const fetchWishlist = async () => {
    try {
        const response = await api.get('/wishlist', getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, data: [] };
    }
};

export const addToWishlistApi = async (productId) => {
    try {
        const response = await api.post('/wishlist', { productId }, getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error adding to wishlist" };
    }
};

export const removeFromWishlistApi = async (productId) => {
    try {
        const response = await api.delete(`/wishlist/${productId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error removing from wishlist" };
    }
};

// ==========================================
// USER PROFILE API
// ==========================================

export const fetchUserProfile = async () => {
    try {
        const response = await api.get('/profile', getAuthHeaders());
        return response.data; 
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error fetching profile" };
    }
};

export const updateUserProfile = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.put('/profile', formData, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' 
            }
        });
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error updating profile" };
    }
};

export const fetchMyOrders = async () => {
    try {
        const response = await api.get('/profile/orders', getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: "Error fetching orders" };
    }
};

// ==========================================
// ORDER API
// ==========================================

export const placeOrderApi = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData, getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Order failed" };
    }
};

export const fetchOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`, getAuthHeaders());
        return response.data; 
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error fetching order" };
    }
};

// ==========================================
// REVIEW API (ADDED NEW)
// ==========================================

export const addReviewApi = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        // Note: Don't set Content-Type manually for FormData, axios does it automatically
        const response = await api.post('/reviews', formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Failed to add review" };
    }
};

export const fetchProductReviews = async (productId) => {
    try {
        const response = await api.get(`/reviews/${productId}`);
        return response.data;
    } catch (error) {
        return { success: false, data: [] };
    }
};

// ==========================================
// COUPON API
// ==========================================

export const validateCouponApi = async (code, cartTotal) => {
    try {
        const response = await api.post('/coupons/validate', { code, cartTotal }, getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Invalid Coupon" };
    }
};

// Verify Payment (Mock or Real)
export const verifyPaymentApi = async (data) => {
    try {
        const response = await api.post('/orders/verify-payment', data, getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: "Payment Verification Failed" };
    }
};

// ==========================================
// MARKETING API (Occasions & Testimonials)
// ==========================================

export const fetchOccasions = async () => {
    try {
        // Customer view: No query params needed (Backend defaults to Active only)
        const response = await api.get('/marketing/occasions');
        return response.data;
    } catch (error) {
        console.error("Error fetching occasions:", error);
        return { success: false, data: [] };
    }
};
 

export const getOccasionBySlug = (slug) => api.get(`/marketing/occasions/slug/${slug}`);

export const fetchTestimonials = async () => {
    try {
        // Customer view: No query params needed (Backend defaults to Active only)
        const response = await api.get('/marketing/testimonials');
        return response.data;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return { success: false, data: [] };
    }
};

export const fetchActiveCampaign = async () => {
    try {
        const res = await api.get('/campaigns');
        if (res.data.success && res.data.data.length > 0) {
            // Find first active campaign
            return res.data.data.find(c => c.is_active === 1) || null;
        }
        return null;
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return null;
    }
}

export const fetchCampaignBySlug = async (slug) => {
  const res = await api.get(`/campaigns/slug/${slug}`);
  if (!res.data.success) {
    throw new Error(res.data.message);
  }
  return res.data.data;
};

// ==========================================
// EXCHANGE API (ADD THIS)
// ==========================================

export const requestExchangeApi = async (data) => {
    try {
        // data format: { order_id, product_id, qty, reason }
        const response = await api.post('/orders/exchange', data, getAuthHeaders());
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Exchange request failed" };
    }
};

// ... existing imports and code ...

// ==========================================
// POPUP API (Add this section)
// ==========================================

export const fetchActivePopup = async () => {
    try {
        // Calls the backend endpoint we created earlier
        const response = await api.get('/popups/active');
        return response.data;
    } catch (error) {
        console.error("Error fetching popup:", error);
        return { success: false, data: null };
    }
};

export const getWeeklyBoxes = () => {
  return api.get("/weeklyBox");
};

export const getWeeklyBoxBySlug = (slug) => {
  return api.get(`/weeklyBox/slug/${slug}`);
};

export default api;