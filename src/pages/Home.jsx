import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API & Context
import api, { fetchCategories, fetchProducts, getImageUrl } from '../services/api';
import { useSettings } from '../context/SettingsContext';

// COMPONENTS
import Hero from '../components/home/Hero';
import ProductCard from '../components/shared/ProductCard';
import OccasionSection from '../components/home/OccasionSection';
import Testimonials from '../components/home/Testimonials';
import CategorySection from '../components/home/CategorySection';
import Newsletter from '../components/home/Newsletter';
import DealOfTheDay from '../components/home/DealOfTheDay';
import ShippingBanner from '../components/home/ShippingBanner';
import BrandStory from '../components/home/BrandStory';
import HomePopup from '../components/home/HomePopup';
import WhyChooseUs from '../components/home/WhyChooseUs';
import WeeklyFruitBoxSection from "../components/home/WeeklyFruitBoxSection";
// TOP PE IMPORT ME ADD KAREIN
import JuiceBuilderBanner from '../components/home/JuiceBuilderBanner';

const Home = () => {
  const { showSection } = useSettings();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [middleBanner, setMiddleBanner] = useState(null);
  const [sideBanner, setSideBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes, bannerRes] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          api.get('/banners')
        ]);

        if (catRes?.success) {
          setCategories(catRes.data.filter(c => !c.parent_id));
        }

        if (prodRes?.success) {
          const products = prodRes.data || [];
          setFeaturedProducts(products.filter(p => p.is_featured === 1).slice(0, 10));
          setNewArrivals(products.filter(p => p.is_new_arrival === 1).slice(0, 10));
        }

        if (bannerRes?.data?.success) {
          const banners = bannerRes.data.data || [];

          setMiddleBanner(
            banners.find(b => b.is_active === 1 && b.position === 'home_middle')
          );

          setSideBanner(
            banners.find(b => b.is_active === 1 && b.position === 'sidebar')
          );
        }
      } catch (err) {
        console.error('Home load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading fresh fruits 🍎
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">

      {showSection('show_popup') && <HomePopup />}

      {/* ================= 1. HERO ================= */}
      {showSection('show_hero') && <Hero />}

{/* ================= 2. BEST SELLERS ================= */}
{showSection('show_bestsellers') && featuredProducts.length > 0 && (
  <section className="bg-[#F5F7F6] py-16 relative">
    <div className="max-w-[1536px] mx-auto px-4">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] tracking-tight">
            Best Sellers
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Customer favorites everyone loves
          </p>
        </div>

        <button
          onClick={() => navigate('/best-sellers')}
          className="
            hidden md:inline-flex items-center gap-2
            font-bold text-sm text-[#064E3B]
            hover:text-green-700 transition
          "
        >
          View All
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* SCROLL WRAPPER */}
      <div className="relative">

        {/* LEFT GRADIENT */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#F5F7F6] to-transparent z-10" />

        {/* RIGHT GRADIENT */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#F5F7F6] to-transparent z-10" />

        {/* LEFT ARROW */}
        <button
          onClick={() => {
            document.getElementById('best-seller-scroll')?.scrollBy({
              left: -320,
              behavior: 'smooth',
            });
          }}
          className="
            hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full bg-white shadow-lg
            items-center justify-center text-xl
            hover:scale-110 transition
          "
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => {
            document.getElementById('best-seller-scroll')?.scrollBy({
              left: 320,
              behavior: 'smooth',
            });
          }}
          className="
            hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full bg-white shadow-lg
            items-center justify-center text-xl
            hover:scale-110 transition
          "
        >
          ›
        </button>

        {/* PRODUCTS */}
        <div
          id="best-seller-scroll"
          className="
            flex gap-6 overflow-x-auto
            scroll-smooth snap-x snap-mandatory
            pb-6 px-1
            scrollbar-hide
          "
        >
          {featuredProducts.slice(0, 10).map((product) => (
            <div
              key={product.id}
              className="snap-start min-w-[260px] max-w-[260px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE VIEW ALL */}
      <div className="md:hidden mt-8 text-center">
        <button
          onClick={() => navigate('/best-sellers')}
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-full
            bg-[#064E3B] text-white
            font-bold text-sm
            hover:bg-green-800 transition
          "
        >
          View All Best Sellers →
        </button>
      </div>
    </div>
  </section>
)}

<JuiceBuilderBanner />
      {/* AFTER BEST SELLERS */}
      <WeeklyFruitBoxSection />

      {/* ================= 3. DEAL OF THE DAY ================= */}
      {showSection('show_deal') && <DealOfTheDay />}

      {/* ================= 4. TRUST STRIP ================= */}
      {showSection('show_trust_strip') && <WhyChooseUs />}

      {/* ================= 5. SHOP BY CATEGORY ================= */}
        {showSection('show_categories') && <CategorySection categories={categories}  />}
      

      {/* ================= 6. MIDDLE PROMO BANNER (CTA) ================= */}
      {showSection('show_promo_banner') && middleBanner && (
        <section className="py-14 bg-white">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              onClick={() => navigate(middleBanner.click_url || '/shop')}
              className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
            >
              {/* IMAGE */}
              <img
                src={getImageUrl(middleBanner.media_url)}
                alt={middleBanner.title}
                className="
            w-full
            h-[260px]
            md:h-[380px]
            object-cover
            group-hover:scale-105
            transition-transform
            duration-700
          "
              />

              {/* OVERLAY (API DRIVEN) */}
              {middleBanner.overlay !== 'none' && (
                <div
                  className={`absolute inset-0 ${middleBanner.overlay === 'dark'
                    ? 'bg-black/60'
                    : 'bg-white/50'
                    }`}
                />
              )}

              {/* CONTENT */}
              <div
                className={`
            absolute inset-0 flex items-center
            ${middleBanner.text_align === 'center'
                    ? 'justify-center text-center'
                    : middleBanner.text_align === 'right'
                      ? 'justify-end text-right pr-6 md:pr-16'
                      : 'justify-start text-left pl-6 md:pl-16'
                  }
          `}
              >
                <div className="max-w-xl text-white">

                  {/* TITLE */}
                  <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight drop-shadow-lg">
                    {middleBanner.title}
                  </h2>

                  {/* SUBTITLE */}
                  {middleBanner.subtitle && (
                    <p className="mt-3 text-white/90 text-sm md:text-base">
                      {middleBanner.subtitle}
                    </p>
                  )}

                  {/* CTA */}
                  {middleBanner.cta_text && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(middleBanner.click_url || '/shop');
                      }}
                      className="
                  mt-6 inline-flex items-center gap-2
                  bg-[#FACC15]
                  text-black
                  px-7 py-3
                  rounded-full
                  font-bold
                  text-sm
                  hover:bg-yellow-400
                  transition
                  shadow-lg
                "
                    >
                      {middleBanner.cta_text}
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>
        </section>
      )}



      {/* ================= 7. FRESH ARRIVALS + SIDE BANNER ================= */}
      {showSection('show_new_arrivals') && (
        <section className="py-16 max-w-[1536px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* PRODUCTS */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-serif font-bold text-[#064E3B] mb-8">
                Fresh Arrivals
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {newArrivals.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* SIDE BANNER */}
            {sideBanner && (
              <div className="hidden lg:block">
                <div
                  onClick={() => navigate(sideBanner.click_url || '/shop')}
                  className="sticky top-28 rounded-xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <img
                    src={getImageUrl(sideBanner.media_url)}
                    alt={sideBanner.title}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= 8. OCCASIONS ================= */}
      {showSection('show_occasions') && <OccasionSection />}

      {/* ================= 9. BRAND STORY ================= */}
      {showSection('show_brand_story') && <BrandStory />}

      {/* ================= 10. TESTIMONIALS ================= */}
      {showSection('show_testimonials') && <Testimonials />}

      {/* ================= 11. NEWSLETTER ================= */}
      {showSection('show_newsletter') && <Newsletter />}

      {/* ================= 12. SHIPPING ================= */}
      {showSection('show_shipping_banner') && <ShippingBanner />}

    </div>
  );
};

export default Home;
