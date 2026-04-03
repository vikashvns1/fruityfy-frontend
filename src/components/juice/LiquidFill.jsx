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

const LiquidFill = ({ selections = [], totalQty = 0, isMini = false, maxCapacity = 500 }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const getBlendedColor = () => {
        if (!selections || selections.length === 0) return 'rgba(255, 255, 255, 0.1)';
        let r = 0, g = 0, b = 0, totalWeight = 0;
        selections.forEach(item => {
            const hex = item.color_code || '#facc15';
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                const weight = Number(item.qty) || 0;
                r += parseInt(result[1], 16) * weight;
                g += parseInt(result[2], 16) * weight;
                b += parseInt(result[3], 16) * weight;
                totalWeight += weight;
            }
        });
        if (totalWeight === 0) return 'rgba(255, 255, 255, 0.1)';
        r = Math.round(r / totalWeight);
        g = Math.round(g / totalWeight);
        b = Math.round(b / totalWeight);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const blendedColor = getBlendedColor();
    // Capacity user selection ke base par fix hogi
    const fillLevel = Math.min((totalQty / maxCapacity) * 100, 100);

    return (
        <div className={`relative ${isMini ? 'w-24 h-40' : 'w-44 h-72'} mx-auto transition-all duration-700`}>
            
            {/* Glass Container */}
            <div className="absolute inset-0 border-[4px] border-white/20 rounded-b-[4rem] rounded-t-2xl overflow-hidden bg-white/5 backdrop-blur-sm z-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                
                {/* Liquid */}
                <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
                    style={{
                        height: `${fillLevel}%`,
                        backgroundColor: blendedColor,
                        boxShadow: fillLevel > 0 ? `inset 0 10px 30px rgba(255,255,255,0.3)` : 'none'
                    }}
                >
                    {/* Top Surface Wave/Shine */}
                    {fillLevel > 0 && (
                        <div className="absolute -top-1 left-0 right-0 h-3 bg-white/30 blur-[4px] animate-pulse" />
                    )}
                </div>

                {/* Vertical Shine lines for Glassy look */}
                <div className="absolute top-10 left-4 w-1.5 h-1/2 bg-white/10 rounded-full blur-[1px]" />
                <div className="absolute top-20 right-6 w-1 h-1/3 bg-white/5 rounded-full blur-[1px]" />
            </div>

            {/* Top Rim */}
            <div className="absolute -top-2 left-0 right-0 h-6 border-[3px] border-white/15 rounded-[100%] z-0 bg-white/5" />

            {/* ML Markers on Glass Side */}
            <div className="absolute -right-8 inset-y-4 flex flex-col justify-between text-[8px] font-black text-white/30 py-2 pointer-events-none">
                <span>{maxCapacity}</span>
                <span>{Math.round(maxCapacity * 0.75)}</span>
                <span>{Math.round(maxCapacity * 0.5)}</span>
                <span>{Math.round(maxCapacity * 0.25)}</span>
                <span>0</span>
            </div>

            {totalQty === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black text-[10px] z-30 tracking-[0.4em] uppercase">
                    {isRTL ? 'فارغ' : 'Empty'}
                </div>
            )}
        </div>
    );
};

export default LiquidFill;