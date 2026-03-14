// import React from 'react';

// const LiquidFill = ({ selections = [], totalQty = 0 }) => {
//     // Colors logic
//     const getGradient = () => {
//         if (!selections || selections.length === 0) return 'from-gray-200 to-gray-100';
//         // Yahan aap dynamic colors add kar sakte hain selection ke base par
//         return 'from-orange-500 to-yellow-300'; 
//     };

//     const fillLevel = Math.min((totalQty / 1000) * 100, 100); 

//     return (
//         <div className="relative w-48 h-72 mx-auto">
//             {/* ⭐ Main Glass Container - Isme overflow-hidden zaroori hai */}
//             <div className="absolute inset-0 border-4 border-white/40 rounded-b-[3.5rem] rounded-t-xl overflow-hidden bg-white/5 backdrop-blur-sm z-10 shadow-2xl">

//                 {/* 🌊 Liquid Layer */}
//                 <div 
//                     className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out bg-gradient-to-t ${getGradient()}`}
//                     style={{ height: `${fillLevel}%` }}
//                 >
//                     {/* Top Wave Effect (Surface) */}
//                     {fillLevel > 0 && (
//                         <div className="absolute top-0 left-0 right-0 h-3 bg-white/30 backdrop-blur-md animate-pulse border-b border-white/20" />
//                     )}

//                     {/* Subtle Bubbles Animation (Optional) */}
//                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
//                 </div>

//                 {/* Reflection Detail (Glass effect) */}
//                 <div className="absolute top-4 left-4 w-4 h-32 bg-white/10 rounded-full blur-[1px] pointer-events-none" />
//             </div>

//             {/* Glass Rim Top (Optional - for depth) */}
//             <div className="absolute -top-1 left-0 right-0 h-4 border-2 border-white/20 rounded-[100%] z-0" />

//             {/* Empty State Text */}
//             {totalQty === 0 && (
//                 <div className="absolute inset-0 flex items-center justify-center text-[#FACC15]/20 font-serif italic text-sm z-30 tracking-widest">
//                     LAB EMPTY
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LiquidFill;

import React from 'react';
import { useTranslation } from 'react-i18next';

const LiquidFill = ({ selections = [], totalQty = 0, isMini = false }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    // 🎨 RGB Blending Logic: Quantity ke weighted average ke base par color mix hoga
    const getBlendedColor = () => {
        if (!selections || selections.length === 0) return 'rgba(229, 231, 235, 0.3)'; // Default Grayish

        let r = 0, g = 0, b = 0, totalWeight = 0;

        selections.forEach(item => {
            // Hex (#ffffff) ko RGB mein convert karna
            const hex = item.color_code || '#facc15'; // Default Fruitify Yellow agar color na ho
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            if (result) {
                const weight = Number(item.qty) || 0;
                r += parseInt(result[1], 16) * weight;
                g += parseInt(result[2], 16) * weight;
                b += parseInt(result[3], 16) * weight;
                totalWeight += weight;
            }
        });

        if (totalWeight === 0) return 'rgba(229, 231, 235, 0.3)';

        // Weighted Average nikalna
        r = Math.round(r / totalWeight);
        g = Math.round(g / totalWeight);
        b = Math.round(b / totalWeight);

        return `rgb(${r}, ${g}, ${b})`;
    };

    const blendedColor = getBlendedColor();
    // Capacity 500 ya 1000ml jo bhi aap set karein
    const fillLevel = Math.min((totalQty / 500) * 100, 100);

    return (
        <div className={`relative ${isMini ? 'w-24 h-36' : 'w-48 h-72'} mx-auto transition-all duration-500`}>

            {/* ⭐ Main Glass Body */}
            <div className="absolute inset-0 border-[3px] border-white/40 rounded-b-[3.5rem] rounded-t-xl overflow-hidden bg-white/5 backdrop-blur-md z-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">

                {/* 🌊 Dynamic Blended Liquid Layer */}
                <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
                    style={{
                        height: `${fillLevel}%`,
                        backgroundColor: blendedColor,
                        boxShadow: fillLevel > 0 ? `inset 0 10px 20px rgba(255,255,255,0.2)` : 'none'
                    }}
                >
                    {/* Top Surface Shine (Gives liquid depth) */}
                    {fillLevel > 0 && (
                        <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 blur-[2px] animate-pulse" />
                    )}

                    {/* Animated Bubbles Pattern */}
                    <div className="absolute inset-0 opacity-10 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                </div>

                {/* Glass Reflection/Shine Line */}
                <div className={`absolute top-6 ${isRTL ? 'right-4' : 'left-4'} w-3 h-2/3 bg-white/10 rounded-full blur-[1px] pointer-events-none`} />
            </div>

            {/* Glass Rim Top Detail */}
            <div className="absolute -top-1 left-1 right-1 h-5 border-2 border-white/20 rounded-[100%] z-0 bg-white/5" />

            {/* Empty State Text */}
            {totalQty === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif italic text-xs z-30 tracking-[0.3em] uppercase">
                    {isRTL ? 'المختبر فارغ' : 'Lab Empty'}
                </div>
            )}
        </div>
    );
};

export default LiquidFill;