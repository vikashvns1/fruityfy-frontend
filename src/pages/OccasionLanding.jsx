// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { fetchOccasions, getOccasionBySlug } from "../services/api";
// import OccasionSidebar from "../components/occasions/OccasionSidebar";
// import ProductCard from "../components/shared/ProductCard";

// const IMAGE_BASE = "http://localhost:5000";

// const getImageUrl = (img) =>
//   img ? `${IMAGE_BASE}${img}` : "/placeholder-hero.jpg";

// const OccasionLanding = () => {
//   const { slug } = useParams();

//   const [occasions, setOccasions] = useState([]);
//   const [activeOccasion, setActiveOccasion] = useState(null);
//   const [loadingBody, setLoadingBody] = useState(false);

//   /* ================= SIDEBAR ================= */
//   useEffect(() => {
//     (async () => {
//       const res = await fetchOccasions();
//       if (res?.success) setOccasions(res.data);
//     })();
//   }, []);

//   /* ================= BODY ONLY ================= */
//   useEffect(() => {
//     if (!slug) return;

//     setLoadingBody(true);

//     getOccasionBySlug(slug)
//       .then((res) => {
//         if (res.data?.success) {
//           setActiveOccasion(res.data.data);
//         }
//       })
//       .finally(() => setLoadingBody(false));
//   }, [slug]);

//   if (!activeOccasion) {
//     return (
//       <div className="py-24 text-center text-gray-500">
//         Loading occasion…
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[260px_1fr] gap-8">

//       {/* ================= SIDEBAR ================= */}
//       <aside className="sticky top-28 h-fit">
//         <OccasionSidebar occasions={occasions} />
//       </aside>

//       {/* ================= RIGHT CONTENT ================= */}
//       <div className="space-y-8">

//         {/* ================= HERO ================= */}
//         <div
//           className={`rounded-2xl p-8 text-white transition-opacity duration-300 ${
//             loadingBody ? "opacity-60" : "opacity-100"
//           }`}
//           style={{
//             backgroundImage: `
//               linear-gradient(
//                 rgba(6,78,59,0.88),
//                 rgba(6,78,59,0.88)
//               ),
//               url(${getImageUrl(activeOccasion.image_url)})
//             `,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <p className="uppercase tracking-widest text-xs text-green-200">
//             Occasion
//           </p>

//           <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1">
//             {activeOccasion.title}
//           </h1>

//           <p className="text-green-100 mt-2 text-sm max-w-xl">
//             Thoughtful gifts & fresh picks for every moment
//           </p>
//         </div>

//         {/* ================= PRODUCTS ================= */}
//         {activeOccasion.products?.length === 0 ? (
//           <div className="bg-white border border-dashed rounded-2xl p-12 text-center">
//   <div className="flex justify-center mb-4">
//     <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
//       <span className="text-3xl">🎁</span>
//     </div>
//   </div>

//   <h3 className="text-lg font-semibold text-gray-800">
//     Products coming soon
//   </h3>

//   <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
//     We’re curating something special for this occasion.
//     Please check back shortly or explore other occasions.
//   </p>

//   <div className="mt-6">
//     <a
//       href="/shop"
//       className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
//                  bg-[#064E3B] text-white text-sm font-medium hover:bg-[#043f30]
//                  transition"
//     >
//       Browse all products
//     </a>
//   </div>
// </div>

//         ) : (
//           <div
//             className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
//               loadingBody ? "opacity-60" : "opacity-100"
//             }`}
//           >
//             {activeOccasion.products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OccasionLanding;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchOccasions, getOccasionBySlug } from "../services/api";
import OccasionSidebar from "../components/occasions/OccasionSidebar";
import ProductCard from "../components/shared/ProductCard";
import { useTranslation } from "react-i18next"; // 1. Added i18n import

const IMAGE_BASE = "http://localhost:5000";

const getImageUrl = (img) =>
  img ? `${IMAGE_BASE}${img}` : "/placeholder-hero.jpg";

const OccasionLanding = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation(); // 2. Initialize translation hook

  const [occasions, setOccasions] = useState([]);
  const [activeOccasion, setActiveOccasion] = useState(null);
  const [loadingBody, setLoadingBody] = useState(false);

  const isRTL = i18n.language === 'ar'; // 3. RTL Check

  /* ================= SIDEBAR ================= */
  useEffect(() => {
    (async () => {
      const res = await fetchOccasions();
      if (res?.success) setOccasions(res.data);
    })();
  }, []);

  /* ================= BODY ONLY ================= */
  useEffect(() => {
    if (!slug) return;

    setLoadingBody(true);

    getOccasionBySlug(slug)
      .then((res) => {
        if (res.data?.success) {
          setActiveOccasion(res.data.data);
        }
      })
      .finally(() => setLoadingBody(false));
  }, [slug]);

  if (!activeOccasion) {
    return (
      <div className="py-24 text-center text-gray-500">
        {t('common.loading') || "Loading occasion…"}
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[260px_1fr] gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* ================= SIDEBAR ================= */}
      <aside className={`sticky top-28 h-fit ${isRTL ? 'md:order-last' : 'md:order-first'}`}>
        <OccasionSidebar occasions={occasions} />
      </aside>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="space-y-8">

        {/* ================= HERO ================= */}
        <div
          className={`rounded-2xl p-8 text-white transition-opacity duration-300 ${
            loadingBody ? "opacity-60" : "opacity-100"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(6,78,59,0.88),
                rgba(6,78,59,0.88)
              ),
              url(${getImageUrl(activeOccasion.image_url)})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="uppercase tracking-widest text-xs text-green-200">
            {t('nav.celebrate_moments') || "Occasion"}
          </p>

          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1">
            {isRTL ? (activeOccasion.title_ar || activeOccasion.title) : activeOccasion.title}
          </h1>

          <p className="text-green-100 mt-2 text-sm max-w-xl">
            {isRTL ? (activeOccasion.subtitle_ar || t('nav.occasions_subtitle')) : t('nav.occasions_subtitle')}
          </p>
        </div>

        {/* ================= PRODUCTS ================= */}
        {activeOccasion.products?.length === 0 ? (
          <div className="bg-white border border-dashed rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {isRTL ? "المنتجات ستتوفر قريباً" : "Products coming soon"}
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              {isRTL ? "نحن نقوم بتجهيز شيء مميز لهذه المناسبة. يرجى العودة قريباً." : "We’re curating something special for this occasion. Please check back shortly or explore other occasions."}
            </p>

            <div className="mt-6">
              <a
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                           bg-[#064E3B] text-white text-sm font-medium hover:bg-[#043f30]
                           transition"
              >
                {t('common.continue_shopping') || "Browse all products"}
              </a>
            </div>
          </div>

        ) : (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
              loadingBody ? "opacity-60" : "opacity-100"
            }`}
          >
            {activeOccasion.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OccasionLanding;
