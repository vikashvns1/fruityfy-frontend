import React from 'react';

const LiquidFill = ({ selections = [], totalQty = 0 }) => {
    // Colors logic
    const getGradient = () => {
        if (!selections || selections.length === 0) return 'from-gray-200 to-gray-100';
        // Yahan aap dynamic colors add kar sakte hain selection ke base par
        return 'from-orange-500 to-yellow-300'; 
    };

    const fillLevel = Math.min((totalQty / 1000) * 100, 100); 

    return (
        <div className="relative w-48 h-72 mx-auto">
            {/* ⭐ Main Glass Container - Isme overflow-hidden zaroori hai */}
            <div className="absolute inset-0 border-4 border-white/40 rounded-b-[3.5rem] rounded-t-xl overflow-hidden bg-white/5 backdrop-blur-sm z-10 shadow-2xl">
                
                {/* 🌊 Liquid Layer */}
                <div 
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out bg-gradient-to-t ${getGradient()}`}
                    style={{ height: `${fillLevel}%` }}
                >
                    {/* Top Wave Effect (Surface) */}
                    {fillLevel > 0 && (
                        <div className="absolute top-0 left-0 right-0 h-3 bg-white/30 backdrop-blur-md animate-pulse border-b border-white/20" />
                    )}

                    {/* Subtle Bubbles Animation (Optional) */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
                </div>

                {/* Reflection Detail (Glass effect) */}
                <div className="absolute top-4 left-4 w-4 h-32 bg-white/10 rounded-full blur-[1px] pointer-events-none" />
            </div>

            {/* Glass Rim Top (Optional - for depth) */}
            <div className="absolute -top-1 left-0 right-0 h-4 border-2 border-white/20 rounded-[100%] z-0" />

            {/* Empty State Text */}
            {totalQty === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-[#FACC15]/20 font-serif italic text-sm z-30 tracking-widest">
                    LAB EMPTY
                </div>
            )}
        </div>
    );
};

export default LiquidFill;