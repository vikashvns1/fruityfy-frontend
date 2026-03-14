// import { NavLink } from "react-router-dom";

// const WeeklyBoxSidebar = ({ boxes }) => {
//   return (
//     <div className="bg-white rounded-xl border p-4 space-y-3">
//       {boxes.map(box => (
//         <NavLink
//           key={box.id}
//           to={`/weeklyboxes/${box.slug}`}
//           className={({ isActive }) =>
//             `block p-3 rounded-lg border transition
//              ${isActive ? "border-[#064E3B] bg-green-50" : "hover:bg-gray-50"}`
//           }
//         >
//           <h4 className="font-semibold text-[#064E3B]">
//             {box.title}
//           </h4>

//           <p className="text-sm text-gray-500">
//             {box.fruit_range}
//           </p>

//           <p className="text-xs text-gray-400 mt-1">
//             {box.item_count} items
//           </p>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default WeeklyBoxSidebar;


import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. Added i18n hook

const WeeklyBoxSidebar = ({ boxes }) => {
  const { t, i18n } = useTranslation(); // 2. Initialize translation hook
  const isRTL = i18n.language === 'ar'; // 3. RTL Check

  return (
    <div className={`bg-white rounded-xl border p-4 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
      {boxes.map(box => (
        <NavLink
          key={box.id}
          to={`/weeklyboxes/${box.slug}`}
          className={({ isActive }) =>
            `block p-3 rounded-lg border transition
             ${isActive 
               ? "border-[#064E3B] bg-green-50 shadow-sm" 
               : "hover:bg-gray-50 border-transparent"}`
          }
        >
          <h4 className="font-semibold text-[#064E3B]">
            {/* 4. Support for dynamic Arabic titles from DB */}
            {isRTL ? (box.title_ar || box.title) : box.title}
          </h4>

          <p className="text-sm text-gray-500">
            {isRTL ? (box.fruit_range_ar || box.fruit_range) : box.fruit_range}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {box.item_count} {isRTL ? 'منتجات' : 'items'}
          </p>
        </NavLink>
      ))}
    </div>
  );
};

export default WeeklyBoxSidebar;