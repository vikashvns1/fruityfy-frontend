import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOccasions, getImageUrl } from '../../services/api';

const OccasionSection = () => {
  const navigate = useNavigate();
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchOccasions();
      if (res?.success) setOccasions(res.data);
    })();
  }, []);

  if (!occasions.length) return null;

  return (
    <section className="relative py-24 overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0faf6] via-[#ffffff] to-[#ecfdf5]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-xs text-[#064E3B] font-semibold">
            Celebrate Moments
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-[#064E3B]">
            Gifting & Occasions
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Make every moment special with thoughtfully curated fruit hampers
          </p>
        </div>

        {/* ===== OCCASIONS ===== */}
        <div className="flex flex-wrap justify-center gap-10">
          {occasions.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/occasions/${item.slug}`)}
              className="group flex flex-col items-center focus:outline-none"
            >
              {/* IMAGE */}
              <div className="
                w-32 h-32 md:w-40 md:h-40
                rounded-full overflow-hidden
                bg-white/70 backdrop-blur
                border border-white
                shadow-md
                group-hover:shadow-2xl
                group-hover:scale-[1.04]
                transition-all duration-300
              ">
                <img
                  src={getImageUrl(item.image_url)}
                  alt={item.title}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-110
                    transition-transform duration-500
                  "
                />
              </div>

              {/* TITLE */}
              <span className="
                mt-5 text-base font-semibold
                text-gray-700
                group-hover:text-[#064E3B]
                transition
              ">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionSection;
