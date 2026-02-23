import React from 'react';

const LiquidFill = ({ selections, totalQty }) => {
    // Selection ke colors determine karein (e.g. Mango = Yellow, Beetroot = Red)
    const getGradient = () => {
        if (selections.length === 0) return 'bg-gray-100';
        // Sabse zyada quantity wale ingredient ka color dominant hoga
        return 'bg-gradient-to-t from-orange-400 to-yellow-300'; 
    };

    const fillLevel = Math.min((totalQty / 1000) * 100, 100); // 1000ml max limit

    return (
        <div className="relative w-48 h-72 mx-auto">
            {/* Glass Outline */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-b-[3rem] rounded-t-lg z-20 shadow-xl" />
            
            {/* Liquid Animation */}
            <div 
                className={`absolute bottom-0 left-0 right-0 rounded-b-[2.5rem] transition-all duration-1000 ease-out z-10 ${getGradient()}`}
                style={{ height: `${fillLevel}%` }}
            >
                <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 animate-pulse" />
            </div>

            {/* Empty State Text */}
            {totalQty === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif italic text-sm z-30">
                    Empty Glass
                </div>
            )}
        </div>
    );
};

export default LiquidFill;