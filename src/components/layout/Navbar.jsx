// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   ShoppingCart,
//   Search,
//   User,
//   ChevronDown,
//   Heart,
//   Menu,
//   X, Phone
// } from 'lucide-react';

// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useSettings } from '../../context/SettingsContext';
// import { fetchCategories, getImageUrl } from '../../services/api';

// import logoImg from '../../assets/logo.png';

// const Navbar = () => {
//   const { cartItems } = useCart();
//   const { user } = useAuth();
//   const { settings } = useSettings();

//   const [categories, setCategories] = useState([]);
//   const [parentCategories, setParentCategories] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [search, setSearch] = useState('');
//   const [scrolled, setScrolled] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories().then(res => {
//       if (res?.success) {
//         setCategories(res.data);
//         setParentCategories(res.data.filter(c => !c.parent_id));
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const visibleCategories = parentCategories.slice(0, 5);
//   const hiddenCategories = parentCategories.slice(5);

//   const getSubCategories = (parentId) =>
//     categories.filter(c => c.parent_id === parentId);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     navigate(`/shop?search=${encodeURIComponent(search)}`);
//     setSearch('');
//     setIsMenuOpen(false);
//   };

//   const getProfileImage = () => {
//     if (user?.profile_pic) {
//       return user.profile_pic.startsWith('http')
//         ? user.profile_pic
//         : getImageUrl(user.profile_pic);
//     }
//     return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
//   };

//   return (
//     <>
//       <header className={`sticky top-0 z-50 bg-white transition-all ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>

//         {/* TOP STRIP */}
//         <div className="hidden md:flex items-center bg-gradient-to-r from-lime-100 to-yellow-100 text-[#14532d] text-[11px] py-1 px-4 font-semibold relative overflow-hidden">

//           {/* FULL WIDTH MARQUEE AREA (except contact) */}
//           <div className="flex-1 overflow-hidden whitespace-nowrap">
//             <div className="inline-block animate-marquee pr-16">
//               🚚 Same-day delivery with 2-hour express service in Dubai.
//               &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
//               ⚡ 2 Hr Express Areas
//               &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
//               🚚 Same-day delivery with 2-hour express service in Dubai.
//             </div>
//           </div>

//           {/* RIGHT CORNER CONTACT (FIXED) */}
//           {/* <div className="flex items-center gap-3 ml-4 shrink-0">
//             <span className="text-black font-medium italic uppercase text-[10px]">
//               Need Quick Help?
//             </span>

//             <a
//               href={`tel:${settings.support_phone}`}
//               className="bg-[#FFD700] text-black px-4 py-1 rounded-full font-black text-[12px] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:bg-[#FFC000] hover:scale-105 transition-all duration-300 flex items-center gap-2"
//             >
//               <Phone size={12} fill="black" />
//               {settings.support_phone}
//             </a>
//           </div> */}
//           <div className="flex items-center gap-3 ml-4 shrink-0">
//             <span className="text-black font-medium italic uppercase text-[10px]">
//               Need Quick Help?
//             </span>

//             <a
//               href={`tel:${settings.support_phone}`}
//               className="bg-[#FFD700] text-black px-4 py-1 rounded-full font-black text-[12px] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:bg-[#FFC000] hover:scale-105 transition-all duration-300 flex items-center gap-2"
//             >
//               {/* This wrapper div handles the blinking animation for the icon and number only */}
//               <div className="flex items-center gap-2 animate-[pulse_1s_infinite]">
//                 <Phone size={12} fill="black" />
//                 {settings.support_phone}
//               </div>
//             </a>
//           </div>
//         </div>

//         {/* MAIN HEADER */}
//         <div className={`border-b transition-all ${scrolled ? 'h-[68px]' : 'h-[82px]'}`}>
//           <div className="max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between gap-4">

//             {/* LEFT */}
//             {/* <div className="flex items-center gap-3">
//               <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
//                 <Menu size={26} />
//               </button>

//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logoImg}
//                   alt="Fruitify"
//                   className={`transition-all ${scrolled ? 'h-12' : 'h-16'} w-auto object-contain`}
//                 />
//               </Link>
//             </div> */}

//             <div className="flex items-center min-w-[180px] lg:min-w-[240px]">
//               <button onClick={() => setIsMenuOpen(true)} className="md:hidden mr-3">
//                 <Menu size={26} />
//               </button>

//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logoImg}
//                   alt="Fruitify"
//                   /* h-auto aur w-40/w-52 se logo wide dikhega aur aspect ratio maintain rahega */
//                   className={`transition-all duration-300 object-contain ${scrolled ? 'w-32 lg:w-40' : 'w-44 lg:w-56'
//                     } h-auto`}
//                   style={{ maxWidth: 'none' }} // Tailwind ki default max-width ko override karne ke liye
//                 />
//               </Link>
//             </div>

//             {/* SEARCH */}
//             <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl shadow-sm">
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search fresh fruits, hampers..."
//                 className="w-full h-11 px-5 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-600"
//               />
//               <button
//                 type="submit"
//                 className="h-11 px-6 bg-[#EAB308] text-white rounded-r-full hover:bg-yellow-500 transition"
//               >
//                 <Search size={18} />
//               </button>
//             </form>

//             {/* RIGHT */}
//             <div className="flex items-center gap-5">

//               <span className="hidden lg:inline-flex text-[11px] font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
//                 ⚡ 2 Hr Delivery
//               </span>

//               {user && (
//                 <Link to="/wishlist" className="hidden md:block hover:text-red-500 transition">
//                   <Heart size={22} />
//                 </Link>
//               )}

//               {user ? (
//                 <Link to="/profile">
//                   <img
//                     src={getProfileImage()}
//                     alt="Profile"
//                     className="w-9 h-9 rounded-full border-2 border-[#15803d]"
//                   />
//                 </Link>
//               ) : (
//                 <Link to="/login" className="hidden md:flex items-center gap-1 text-sm hover:text-green-700">
//                   <User size={18} />
//                   Account
//                 </Link>
//               )}

//               <Link to="/cart" className="relative hover:text-green-700">
//                 <ShoppingCart size={24} />
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* CATEGORY BAR */}
//         <nav className="hidden md:block bg-[#15803d] text-white text-sm">
//           <div className="max-w-[1280px] mx-auto flex items-center justify-between">

//             <div className="flex items-center">
//               <Link to="/" className="px-4 py-3 hover:bg-green-700">Home</Link>

//               {visibleCategories.map(parent => {
//                 const subs = getSubCategories(parent.id);
//                 return (
//                   <div key={parent.id} className="relative group">
//                     <div
//                       onClick={() => navigate(`/shop?category=${parent.id}`)}
//                       className="px-4 py-3 cursor-pointer hover:bg-green-700 flex items-center gap-1"
//                     >
//                       {parent.name}
//                       {subs.length > 0 && <ChevronDown size={14} />}
//                     </div>

//                     {subs.length > 0 && (
//                       <div className="absolute top-full left-0 bg-white text-gray-800 w-56 shadow-xl rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
//                         {subs.map(sub => (
//                           <Link key={sub.id} to={`/shop?category=${sub.id}`} className="block px-4 py-2 hover:bg-gray-100">
//                             {sub.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}

//               {hiddenCategories.length > 0 && (
//                 <div className="relative group">
//                   <div className="px-4 py-3 cursor-pointer hover:bg-green-700 flex items-center gap-1 text-yellow-300 font-semibold">
//                     More <ChevronDown size={14} />
//                   </div>

//                   <div className="absolute top-full left-0 bg-white text-gray-800 w-64 shadow-xl rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition max-h-[420px] overflow-y-auto">
//                     {hiddenCategories.map(cat => (
//                       <Link key={cat.id} to={`/shop?category=${cat.id}`} className="block px-4 py-3 hover:bg-gray-100">
//                         {cat.name}
//                       </Link>
//                     ))}
//                     <Link to="/categories" className="block text-center px-4 py-3 font-bold text-[#15803d] bg-gray-50">
//                       View All Categories
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Link
//               to="/offers"
//               className="mr-4 bg-yellow-400 text-[#064E3B] px-5 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-300"
//             >
//               Exciting Offers.
//             </Link>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. i18n इंपोर्ट करें
import {
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  Heart,
  Menu,
  X, Phone,
  Globe // ग्लोब आइकॉन स्विच के लिए
} from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { fetchCategories, getImageUrl } from '../../services/api';

import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const { settings } = useSettings();
  const { t, i18n } = useTranslation(); // 2. t और i18n हुक का प्रयोग

  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // 3. भाषा बदलने का फंक्शन
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // HTML टैग पर dir सेट करें ताकि CSS सही काम करे
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    fetchCategories().then(res => {
      if (res?.success) {
        setCategories(res.data);
        setParentCategories(res.data.filter(c => !c.parent_id));
      }
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visibleCategories = parentCategories.slice(0, 5);
  const hiddenCategories = parentCategories.slice(5);

  const getSubCategories = (parentId) =>
    categories.filter(c => c.parent_id === parentId);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    setSearch('');
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-all ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>

        {/* TOP STRIP */}
        <div className="hidden md:flex items-center bg-gradient-to-r from-lime-100 to-yellow-100 text-[#14532d] text-[11px] py-1 px-4 font-semibold relative overflow-hidden">

          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee pr-16">
              {t('nav.marquee_text')} {/* 4. JSON से टेक्स्ट उठाएं */}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4 shrink-0">
            {/* 5. LANGUAGE SWITCHER BUTTON */}
            <div className="flex items-center gap-2 border-r border-green-200 pr-4">
              <Globe size={14} className="text-green-700" />
              <button
                onClick={() => changeLanguage('en')}
                className={`hover:text-green-900 transition ${i18n.language === 'en' ? 'font-black underline underline-offset-4' : 'font-normal'}`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => changeLanguage('ar')}
                className={`hover:text-green-900 transition ${i18n.language === 'ar' ? 'font-black underline underline-offset-4' : 'font-normal'}`}
              >
                العربية
              </button>
            </div>

            <span className="text-black font-medium italic uppercase text-[10px]">
              {t('nav.help_text')}
            </span>

            <a
              href={`tel:${settings.support_phone}`}
              className="bg-[#FFD700] text-black px-4 py-1 rounded-full font-black text-[12px] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:bg-[#FFC000] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <div className="flex items-center gap-2 animate-[pulse_1s_infinite]">
                <Phone size={12} fill="black" />
                {settings.support_phone}
              </div>
            </a>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className={`border-b transition-all ${scrolled ? 'h-[68px]' : 'h-[82px]'}`}>
          <div className="max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between gap-4">

            <div className="flex items-center min-w-[180px] lg:min-w-[240px]">
              <button onClick={() => setIsMenuOpen(true)} className="md:hidden mr-3">
                <Menu size={26} />
              </button>

              <Link to="/" className="flex items-center">
                <img
                  src={logoImg}
                  alt="Fruitify"
                  className={`transition-all duration-300 object-contain ${scrolled ? 'w-32 lg:w-40' : 'w-44 lg:w-56'} h-auto`}
                  style={{ maxWidth: 'none' }}
                />
              </Link>
            </div>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('nav.search_placeholder')}
                className="w-full h-11 px-5 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-[#EAB308] text-white rounded-r-full hover:bg-yellow-500 transition"
              >
                <Search size={18} />
              </button>
            </form>

            {/* RIGHT */}
            <div className="flex items-center gap-5">
              <span className="hidden lg:inline-flex text-[11px] font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {t('nav.express_delivery')}
              </span>

              {user && (
                <Link to="/wishlist" className="hidden md:block hover:text-red-500 transition">
                  <Heart size={22} />
                </Link>
              )}
              {user ? (
                <Link to="/profile">
                  {/* <img
                    src={getImageUrl(user.profile_pic, 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png')}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-[#15803d]"
                  /> */}

                  <img
                    // user object ab updated hai, bas peeche timestamp laga do force reload ke liye
                    src={`${getImageUrl(user.profile_pic)}?t=${new Date().getTime()}`}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-[#15803d] object-cover"
                    onError={(e) => {
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                    }}
                  />
                </Link>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-1 text-sm hover:text-green-700">
                  <User size={18} />
                  {t('nav.account')}
                </Link>
              )}

              <Link to="/cart" className="relative hover:text-green-700">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* CATEGORY BAR */}
        <nav className="hidden md:block bg-[#15803d] text-white text-sm">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between">

            <div className="flex items-center">
              <Link to="/" className="px-4 py-3 hover:bg-green-700">{t('nav.home')}</Link>

              {visibleCategories.map(parent => {
                const subs = getSubCategories(parent.id);
                return (
                  <div key={parent.id} className="relative group">
                    <div
                      onClick={() => navigate(`/shop?category=${parent.id}`)}
                      className="px-4 py-3 cursor-pointer hover:bg-green-700 flex items-center gap-1"
                    >
                      {/* 6. डेटाबेस की वैल्यू को भाषा के अनुसार दिखाएं */}
                      {i18n.language === 'ar' ? parent.name_ar || parent.name : parent.name}
                      {subs.length > 0 && <ChevronDown size={14} />}
                    </div>

                    {subs.length > 0 && (
                      <div className="absolute top-full left-0 bg-white text-gray-800 w-56 shadow-xl rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
                        {subs.map(sub => (
                          <Link key={sub.id} to={`/shop?category=${sub.id}`} className="block px-4 py-2 hover:bg-gray-100">
                            {i18n.language === 'ar' ? sub.name_ar || sub.name : sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {hiddenCategories.length > 0 && (
                <div className="relative group">
                  <div className="px-4 py-3 cursor-pointer hover:bg-green-700 flex items-center gap-1 text-yellow-300 font-semibold">
                    {t('nav.more')} <ChevronDown size={14} />
                  </div>

                  <div className="absolute top-full left-0 bg-white text-gray-800 w-64 shadow-xl rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition max-h-[420px] overflow-y-auto">
                    {hiddenCategories.map(cat => (
                      <Link key={cat.id} to={`/shop?category=${cat.id}`} className="block px-4 py-3 hover:bg-gray-100">
                        {i18n.language === 'ar' ? cat.name_ar || cat.name : cat.name}
                      </Link>
                    ))}
                    <Link to="/categories" className="block text-center px-4 py-3 font-bold text-[#15803d] bg-gray-50">
                      {t('nav.view_all_cat')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/offers"
              className="mr-4 relative flex items-center gap-2 px-6 py-2 rounded-full 
  text-xs font-extrabold text-[#064E3B] 
  bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 
  shadow-lg shadow-orange-400/40 
  hover:scale-105 transition-all duration-300"
            >
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                🔥 {t('nav.offers')}
              </span>

              {/* HOT badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded-full shadow">
                HOT
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;