// import { useRef, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
// import { getImageUrl } from '../../services/api';

// const CategorySection = ({ categories }) => {
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   // Check scroll position to show/hide arrows
//   const checkScroll = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       setCanScrollLeft(scrollLeft > 10);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   useEffect(() => {
//     checkScroll();
//     window.addEventListener('resize', checkScroll);
//     return () => window.removeEventListener('resize', checkScroll);
//   }, [categories]);

//   if (!categories?.length) return null;

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const { clientWidth } = scrollRef.current;
//       const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <section className="py-10 bg-white overflow-hidden">
//       <div className="max-w-[1536px] mx-auto px-6 relative">       
//         {/* ===== HEADER ===== */}
//         <div className="mb-6 text-center md:text-left">
//           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#064E3B] tracking-tight">
//             Our Fresh Collections
//           </h2>
//           <p className="text-gray-400 mt-3 text-lg font-medium">
//             Handpicked nature's best for your lifestyle.
//           </p>
//         </div>

//         {/* ===== NAVIGATION ARROWS (Floating Style) ===== */}
//         {canScrollLeft && (
//           <button 
//             onClick={() => scroll('left')}
//             className="absolute left-2 top-[60%] -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-100 text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all duration-300 backdrop-blur-sm"
//           >
//             <ChevronLeft size={28} />
//           </button>
//         )}
        
//         {canScrollRight && (
//           <button 
//             onClick={() => scroll('right')}
//             className="absolute right-2 top-[60%] -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-100 text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all duration-300 backdrop-blur-sm"
//           >
//             <ChevronRight size={28} />
//           </button>
//         )}

//         {/* ===== SCROLLABLE CONTAINER ===== */}
//         <div 
//           ref={scrollRef}
//           onScroll={checkScroll}
//           className="flex overflow-x-auto gap-8 pb-10 pt-4 scrollbar-hide snap-x snap-mandatory"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               onClick={() => navigate(`/shop?category=${cat.id}`)}
//               className="
//                 group relative flex-shrink-0 snap-start
//                 w-[200px] sm:w-[240px] md:w-[280px]
//                 aspect-[4/5] rounded-[2rem] 
//                 bg-[#f8faf9] border border-gray-50
//                 hover:shadow-[0_20px_50px_rgba(6,78,59,0.12)]
//                 hover:-translate-y-2
//                 transition-all duration-500 cursor-pointer
//                 overflow-hidden
//               "
//             >
//               {/* IMAGE CONTAINER */}
//               <div className="absolute inset-0 flex items-center justify-center p-8">
//                 <img
//                   src={getImageUrl(cat.image_url)}
//                   alt={cat.name}
//                   className="
//                     w-full h-full object-contain
//                     group-hover:scale-110 group-hover:rotate-3
//                     transition-transform duration-700 ease-out
//                   "
//                 />
//               </div>

//               {/* GRADIENT OVERLAY */}
//               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 group-hover:from-[#064E3B]/10 transition-colors duration-500" />

//               {/* TEXT CONTENT */}
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
//                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors duration-300">
//                   {cat.name}
//                 </h3>
//                 <div className="h-1 w-0 group-hover:w-12 bg-[#064E3B] mx-auto mt-2 transition-all duration-500 rounded-full" />
//               </div>
//             </div>
//           ))}

//           {/* ===== PREMIUM 'VIEW ALL' CARD AT THE END ===== */}
//           <div
//             onClick={() => navigate('/shop')}
//             className="
//               flex-shrink-0 snap-start
//               w-[200px] sm:w-[240px] md:w-[280px]
//               aspect-[4/5] rounded-[2rem]
//               bg-[#064E3B] flex flex-col items-center justify-center
//               text-white cursor-pointer group
//               hover:bg-[#043f30] transition-all duration-500
//               shadow-lg hover:shadow-2xl
//             "
//           >
//             <div className="p-5 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500">
//               <LayoutGrid size={40} strokeWidth={1.5} />
//             </div>
//             <span className="mt-6 text-xl font-bold tracking-wide">View All</span>
//             <div className="mt-2 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
//               <span className="text-sm">Explore More</span>
//               <ArrowRight size={16} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CategorySection;/

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { getImageUrl } from '../../services/api';
import { useTranslation } from 'react-i18next'; // 1. Import i18n hook

const CategorySection = ({ categories }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // 2. Initialize translation
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isRTL = i18n.language === 'ar';

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // In RTL, scrollLeft is usually 0 or negative
      if (isRTL) {
        setCanScrollRight(scrollLeft < -10);
        setCanScrollLeft(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10);
      } else {
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories, i18n.language]);

  if (!categories?.length) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      let scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      
      // Reverse scroll amount for RTL
      if (isRTL) scrollAmount = -scrollAmount;

      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6 relative">      
        
        {/* ===== HEADER ===== */}
        <div className={`mb-6 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#064E3B] tracking-tight">
            {t('home.collections_title')}
          </h2>
          <p className="text-gray-400 mt-3 text-lg font-medium">
            {t('home.collections_subtitle')}
          </p>
        </div>

        {/* ===== NAVIGATION ARROWS ===== */}
        {/* Note: Left arrow button UI */}
        {(isRTL ? canScrollRight : canScrollLeft) && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-[60%] -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-100 text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={28} className={isRTL ? 'rotate-180' : ''} />
          </button>
        )}
        
        {/* Note: Right arrow button UI */}
        {(isRTL ? canScrollLeft : canScrollRight) && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 top-[60%] -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-100 text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={28} className={isRTL ? 'rotate-180' : ''} />
          </button>
        )}

        {/* ===== SCROLLABLE CONTAINER ===== */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-8 pb-10 pt-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/shop?category=${cat.id}`)}
              className="
                group relative flex-shrink-0 snap-start
                w-[200px] sm:w-[240px] md:w-[280px]
                aspect-[4/5] rounded-[2rem] 
                bg-[#f8faf9] border border-gray-50
                hover:shadow-[0_20px_50px_rgba(6,78,59,0.12)]
                hover:-translate-y-2
                transition-all duration-500 cursor-pointer
                overflow-hidden
              "
            >
              {/* IMAGE CONTAINER */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={getImageUrl(cat.image_url)}
                  alt={isRTL ? (cat.name_ar || cat.name) : cat.name}
                  className="
                    w-full h-full object-contain
                    group-hover:scale-110 group-hover:rotate-3
                    transition-transform duration-700 ease-out
                  "
                />
              </div>

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 group-hover:from-[#064E3B]/10 transition-colors duration-500" />

              {/* TEXT CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors duration-300">
                  {isRTL ? (cat.name_ar || cat.name) : cat.name}
                </h3>
                <div className="h-1 w-0 group-hover:w-12 bg-[#064E3B] mx-auto mt-2 transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}

          {/* ===== PREMIUM 'VIEW ALL' CARD ===== */}
          <div
            onClick={() => navigate('/shop')}
            className="
              flex-shrink-0 snap-start
              w-[200px] sm:w-[240px] md:w-[280px]
              aspect-[4/5] rounded-[2rem]
              bg-[#064E3B] flex flex-col items-center justify-center
              text-white cursor-pointer group
              hover:bg-[#043f30] transition-all duration-500
              shadow-lg hover:shadow-2xl
            "
          >
            <div className="p-5 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500">
              <LayoutGrid size={40} strokeWidth={1.5} />
            </div>
            <span className="mt-6 text-xl font-bold tracking-wide">
                {t('home.view_all')}
            </span>
            <div className="mt-2 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <span className="text-sm">{t('home.explore_more')}</span>
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;