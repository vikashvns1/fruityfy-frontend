import { NavLink } from "react-router-dom";

const WeeklyBoxSidebar = ({ boxes }) => {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-3">
      {boxes.map(box => (
        <NavLink
          key={box.id}
          to={`/weeklyboxes/${box.slug}`}
          className={({ isActive }) =>
            `block p-3 rounded-lg border transition
             ${isActive ? "border-[#064E3B] bg-green-50" : "hover:bg-gray-50"}`
          }
        >
          <h4 className="font-semibold text-[#064E3B]">
            {box.title}
          </h4>

          <p className="text-sm text-gray-500">
            {box.fruit_range}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {box.item_count} items
          </p>
        </NavLink>
      ))}
    </div>
  );
};

export default WeeklyBoxSidebar;
