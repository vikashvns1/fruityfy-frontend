import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// API
import { fetchHomeBanners, getImageUrl } from '../../services/api';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomeBanners().then(res => setBanners(res || []));
  }, []);

  if (!banners.length) return null;

  return (
    <section className="w-full h-[420px] md:h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-full"
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">

            {/* BACKGROUND IMAGE (NO CUT, FULL COVER) */}
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${getImageUrl(banner.media_url)})`
              }}
            />

            {/* DARK PREMIUM GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

            {/* CONTENT */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-20">
              <div className="max-w-2xl text-white">

                {/* BADGE */}
                <span className="inline-block mb-4 bg-[#FACC15] text-black text-[11px] md:text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
                  Fresh • Premium • Delivered
                </span>

                {/* TITLE */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold leading-tight drop-shadow-lg">
                  {banner.title}
                </h1>

                {/* SUBTITLE */}
                <p className="mt-4 text-white/90 text-sm md:text-lg max-w-xl">
                  {banner.subtitle ||
                    'Handpicked fruits, delivered fresh to your doorstep in Dubai & Abu Dhabi.'}
                </p>

                {/* CTA */}
                <div className="mt-8">
                  <button
                    onClick={() => navigate(banner.click_url || '/shop')}
                    className="bg-[#064E3B] hover:bg-[#043F30] text-white px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-2xl"
                  >
                    {banner.cta_text || 'Shop Now'}
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SWIPER STYLES */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          background: rgba(0,0,0,0.35);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0,0,0,0.55);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.6);
        }
        .swiper-pagination-bullet-active {
          background: #FACC15 !important;
          width: 24px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
