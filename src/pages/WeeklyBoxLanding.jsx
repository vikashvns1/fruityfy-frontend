import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getWeeklyBoxes,getWeeklyBoxBySlug} from "../services/api";
import WeeklyBoxSidebar from "../components/weeklyBoxes/WeeklyBoxSidebar";

const IMAGE_BASE = "http://localhost:5000";

const WeeklyBoxLanding = () => {
  const { slug } = useParams();

  const [boxes, setBoxes] = useState([]);
  const [activeBox, setActiveBox] = useState(null);

  useEffect(() => {
    getWeeklyBoxes().then(res => {
      if (res.data.success) {
        setBoxes(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!slug) return;

    getWeeklyBoxBySlug(slug).then(res => {
      if (res.data.success) {
        setActiveBox(res.data.data);
      }
    });
  }, [slug]);

  if (!activeBox) return null;

  return (
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <WeeklyBoxSidebar boxes={boxes} />
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 bg-white rounded-xl p-6 border">
          <img
            src={
              activeBox.image
                ? IMAGE_BASE + activeBox.image
                : "/placeholder/weekly-box.jpg"
            }
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <h1 className="text-3xl font-serif font-bold text-[#064E3B]">
            {activeBox.title}
          </h1>

          <p className="text-gray-500 mt-1">
            {activeBox.subtitle}
          </p>

          <p className="mt-4 text-sm text-gray-600">
            {activeBox.fruit_range}
          </p>

          <div className="mt-4 text-2xl font-bold text-[#064E3B]">
            AED {Number(activeBox.price).toFixed(0)}
            <span className="text-sm text-gray-400"> / week</span>
          </div>

          <h3 className="mt-8 font-semibold text-lg">
            Included Products ({activeBox.products.length})
          </h3>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {activeBox.products.map(p => (
              <div key={p.id} className="border rounded-lg p-3">
                <img
                  src={IMAGE_BASE + p.image_url}
                  className="h-32 w-full object-cover rounded"
                />
                <p className="mt-2 text-sm font-medium">
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
  );
};

export default WeeklyBoxLanding;
