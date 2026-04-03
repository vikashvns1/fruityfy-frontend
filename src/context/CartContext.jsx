import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // LocalStorage se data uthao taaki refresh hone par cart khali na ho
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Helper: Price ko hamesha Number me convert karega
    const parsePrice = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };

    // --- 1. ADD TO CART (Custom Support Added) ---
    const addToCart = (product, qty = 1) => {
        setCartItems((prevItems) => {
            // ⭐ LOGIC: Hum 'id' use karenge jo custom items ke liye 'custom-123' hogi
            // Isse do alag custom juice merge nahi honge
            const existingItem = prevItems.find((item) => item.id === product.id);
            
            // Price calculation safe karein
            const cleanPrice = parsePrice(product.price);
            const cleanDiscount = parsePrice(product.discount_price);
            
            // Custom products ke liye hum seedhe cleanPrice use karenge 
            // Normal products ke liye discount logic chalega
            const finalPrice = product.is_custom ? cleanPrice : (cleanDiscount > 0 ? cleanDiscount : cleanPrice);

            if (existingItem) {
                // Agar item (with same ID) pehle se hai, to quantity badhao
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            } else {
                // Naya item add karein (is_custom flag ke saath data save hoga)
                return [...prevItems, { 
                    ...product, 
                    quantity: qty, 
                    price: cleanPrice,           
                    discount_price: cleanDiscount, 
                    final_price: finalPrice      
                }];
            }
        });
    };

    // --- 2. REMOVE FROM CART ---
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // --- 3. UPDATE QUANTITY ---
    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQty } : item
            )
        );
    };

    // --- 4. CLEAR CART ---
    const clearCart = () => {
        setCartItems([]);
    };

    // --- CALCULATE TOTAL (Fix NaN Issue) ---
    const cartTotal = cartItems.reduce((total, item) => {
        // Hamesha 'final_price' use karein jo humne add karte waqt set kiya hai
        const price = item.final_price || 0; 
        return total + (price * item.quantity);
    }, 0);

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart,
            cartTotal: Math.round(cartTotal) 
        }}>
            {children}
        </CartContext.Provider>
    );

};

export const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem('cart');
};