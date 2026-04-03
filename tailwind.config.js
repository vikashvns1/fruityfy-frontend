/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // CHANGE 3: Defined Premium Brand Colors
                primary: "#064E3B",       // Deep Forest Green (Luxury)
                primaryLight: "#059669",  // Lighter Green for hovers
                secondary: "#D97706",     // Warm Amber/Gold (Better than bright yellow)
                
                // Backgrounds
                background: "#ffffff",    // Pure White
                surface: "#F9FAFB",       // Light Gray (For sections separation)
                cream: "#FDFBF7",         // Very subtle warm white (For Occasions)
                
                // Text
                dark: "#111827",          // Almost Black
                muted: "#6B7280",         // Gray text
                border: "#E5E7EB",        // Light borders
            },

            fontFamily: {
                // CHANGE 4: 'Playfair Display' is the key to Premium look
                sans: ['"Inter"', 'sans-serif'], 
                serif: ['"Playfair Display"', 'serif'], 
            },
            
            container: {
                center: true,
                padding: '1.5rem',
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1536px', // Wider layout for big screens
                },
            },
            
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Very subtle shadow
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
            }
        },
    },
    plugins: [],
}