import { NavLink } from "react-router-dom";
 import { getImageUrl } from "../../services/api";

const OccasionSidebar = ({ occasions }) => {
  return (
    <div className="bg-white rounded-2xl border p-3 space-y-2 sticky top-24">

      {occasions.map(o => (
        <NavLink
          key={o.id}
          to={`/occasions/${o.slug}`}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl border transition
            ${isActive
              ? "bg-green-50 border-[#064E3B] shadow-sm"
              : "hover:bg-gray-50"}`
          }
        >
          {/* IMAGE */}
          <img
            src={getImageUrl(o.image_url)}
            alt={o.title}
            className="w-10 h-10 rounded-lg object-cover border"
          />

          {/* TEXT */}
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#064E3B]">
              {o.title}
            </div>
            <div className="text-xs text-gray-400">
              {o.item_count || 0} items
            </div>
          </div>
        </NavLink>
      ))}

    </div>
  );
};

export default OccasionSidebar;
