import { useEffect, useState } from 'react';
import { MdFormatQuote, MdStar } from 'react-icons/md';
import { fetchTestimonials, getImageUrl } from '../../services/api';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchTestimonials();
      if (res?.success) {
        setReviews(res.data || []);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B]">
            Customer Love 💚
          </h2>
          <p className="text-gray-600 mt-3">
            What our happy customers are saying
          </p>
        </div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                bg-white
                p-7
                rounded-2xl
                border border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                relative
              "
            >
              {/* QUOTE ICON */}
              <MdFormatQuote className="absolute top-5 right-5 text-[#15803d]/15 text-5xl" />

              {/* RATING */}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, index) => (
                  <MdStar
                    key={index}
                    className={
                      index < review.rating
                        ? 'fill-current'
                        : 'text-gray-200'
                    }
                  />
                ))}
              </div>

              {/* REVIEW */}
              <p className="text-gray-600 text-sm leading-relaxed italic mb-8 min-h-[72px]">
                “{review.review_text}”
              </p>

              {/* USER */}
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                  {review.customer_image ? (
                    <img
                      src={getImageUrl(review.customer_image)}
                      alt={review.customer_name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-[#064E3B] text-white text-sm font-bold">
                      {review.customer_name.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {review.customer_name}
                  </h4>
                  <span className="text-xs text-green-600 font-medium">
                    {review.designation || 'Verified Buyer'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
