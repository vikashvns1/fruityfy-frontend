import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; // Ensure this path matches your project structure

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // 1. Initial State with ALL Database Columns
    const [settings, setSettings] = useState({
        // --- Basic Info ---
        site_name: 'Fruitify',
        currency: 'AED',
        delivery_fee: 0,
        free_delivery_threshold: 0,
        tax_rate: 0,
        
        // --- Contact & Social ---
        support_phone: '',
        support_email: '',
        whatsapp_number: '',
        instagram_url: '',
        facebook_url: '',

        // --- Brand Story (Promise Section) ---
        promise_title: '',
        promise_text: '',
        promise_image_1: '',
        promise_image_2: '',

        // --- Visibility Flags (Default 1 = Show) ---
        show_hero: 1,
        show_features: 1,
        show_categories: 1,
        show_deal: 1,
        show_bestsellers: 1,
        show_occasions: 1,
        show_promo_banner: 1,
        show_new_arrivals: 1,
        show_brand_story: 1,
        show_trust_strip: 1,
        show_testimonials: 1,
        show_instagram: 1,
        show_newsletter: 1,
        
        // Extra ones (if added later)
        show_shipping_banner: 1 
    });
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Ek hi API call se sab kuch aa jayega
                const res = await api.get('/settings');
                
                if (res.data.success) {
                    const data = res.data.data;
                    
                    // Numeric values ko number me convert karke set karein
                    setSettings({
                        ...data, // Database se jo bhi aaya wo seedha state me
                        delivery_fee: Number(data.delivery_fee),
                        free_delivery_threshold: Number(data.free_delivery_threshold),
                        tax_rate: Number(data.tax_rate),
                        // Flags backend se 1/0 aate hain, wo direct use ho sakte hain
                    });
                }
            } catch (error) {
                console.error("Failed to load global settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // Helper 1: Price Formatting (e.g., AED 50.00)
    const formatPrice = (amount) => {
        const num = Number(amount) || 0;
        return `${settings.currency} ${num.toFixed(2)}`;
    };

    // Helper 2: Check Section Visibility
    // Usage: showSection('show_brand_story')
    const showSection = (key) => {
        return settings[key] === 1;
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, formatPrice, showSection }}>
            {children}
        </SettingsContext.Provider>
    );
};