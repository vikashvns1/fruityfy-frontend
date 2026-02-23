import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const IMAGE_BASE = "http://localhost:5000";

const WeeklyFruitBoxSection = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // LOAD WEEKLY BOXES FROM API
  // ============================
  useEffect(() => {
    const loadBoxes = async () => {
      try {
        const res = await api.get("/weeklyBox");
        if (res.data?.success) {
          setBoxes(res.data.data || []);
        }
      } catch (err) {
        console.error("Weekly boxes load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadBoxes();
  }, []);

  if (loading) return null; // or skeleton later

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="text-[#eab308] font-bold text-xs tracking-widest uppercase block">
            Save More Every Week
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B]">
            Weekly Fruit Boxes
          </h2>
          <p className="text-gray-600 mt-3">
            Curated fresh fruit combos delivered weekly at the best price
          </p>
        </div>

        {/* BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boxes.map(box => (
            <div
              key={box.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden relative"
            >
              {/* MOST POPULAR */}
              {box.is_popular === 1 && (
                <span className="absolute top-4 right-4 bg-[#FACC15] text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                  Most Popular
                </span>
              )}

              {/* IMAGE */}
              <img
                src={
                  box.image
                    ? IMAGE_BASE + box.image
                    : "/placeholder/weekly-box.jpg"
                }
                alt={box.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-[#064E3B]">
                  {box.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {box.subtitle}
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  {box.fruit_range}
                </p>

                <div className="mt-5 text-2xl font-bold text-[#064E3B]">
                  AED {Number(box.price).toFixed(0)}
                  <span className="text-sm text-gray-500 font-normal">
                    {" "} / week
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/weeklyboxes/${box.slug || box.id}`)}
                  className="mt-6 w-full bg-[#064E3B] text-white py-3 rounded-full font-bold hover:bg-[#053d2e] transition"
                >
                  View Box
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/weeklyboxes")}
            className="px-8 py-3 border-2 border-[#064E3B] text-[#064E3B] font-bold rounded-full hover:bg-[#064E3B] hover:text-white transition"
          >
            View All Weekly Boxes
          </button>
        </div>

      </div>
    </section>
  );
};

export default WeeklyFruitBoxSection;
