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
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  Heart,
  Menu,
  X, Phone,
  Globe,
  ChevronRight,
  Home
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
  const { t, i18n } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null); // Mobile sub-menu toggle

  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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

  // EXACT LOGIC: Top 5 visible, rest in "More"
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

        {/* TOP STRIP - Desktop Only */}
        <div className="hidden md:flex items-center bg-gradient-to-r from-lime-100 to-yellow-100 text-[#14532d] text-[11px] py-1 px-4 font-semibold relative overflow-hidden">
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee pr-16">{t('nav.marquee_text')}</div>
          </div>

          <div className="flex items-center gap-4 ml-4 shrink-0">
            <div className="flex items-center gap-2 border-r border-green-200 pr-4">
              <Globe size={14} className="text-green-700" />
              <button onClick={() => changeLanguage('en')} className={`${i18n.language === 'en' ? 'font-black underline underline-offset-4' : 'font-normal'}`}>EN</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => changeLanguage('ar')} className={`${i18n.language === 'ar' ? 'font-black underline underline-offset-4' : 'font-normal'}`}>العربية</button>
            </div>
            <span className="text-black font-medium italic uppercase text-[10px]">{t('nav.help_text')}</span>
            <a href={`tel:${settings.support_phone}`} className="bg-[#FFD700] text-black px-4 py-1 rounded-full font-black text-[12px] flex items-center gap-2 shadow-sm">
              <Phone size={12} fill="black" className="animate-pulse" /> {settings.support_phone}
            </a>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className={`border-b transition-all ${scrolled ? 'h-[60px] md:h-[68px]' : 'h-[70px] md:h-[82px]'}`}>
          <div className="max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between gap-4">

            <div className="flex items-center">
              <button onClick={() => setIsMenuOpen(true)} className="md:hidden mr-3 p-1">
                <Menu size={28} className="text-green-800" />
              </button>
              <Link to="/" className="flex items-center">
                <img src={logoImg} alt="Fruitify" className={`transition-all duration-300 ${scrolled ? 'w-28 md:w-40' : 'w-32 md:w-56'}`} />
              </Link>
            </div>

            {/* SEARCH - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t('nav.search_placeholder')}
                className="w-full h-10 px-5 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button type="submit" className="h-10 px-6 bg-[#EAB308] text-white rounded-r-full hover:bg-yellow-500 transition">
                <Search size={18} />
              </button>
            </form>

            {/* ICONS */}
            <div className="flex items-center gap-3 md:gap-5">
              <button className="md:hidden p-1" onClick={() => navigate('/shop')}><Search size={24} /></button>
              {user && <Link to="/wishlist" className="hidden md:block hover:text-red-500 transition"><Heart size={22} /></Link>}

              {user ? (
                <Link to="/profile">
                  <img src={`${getImageUrl(user.profile_pic)}?t=${new Date().getTime()}`} alt="P" className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-[#15803d] object-cover"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />
                </Link>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-1 text-sm font-semibold"><User size={18} /> {t('nav.account')}</Link>
              )}

              <Link to="/cart" className="relative p-1">
                <ShoppingCart size={24} className="text-green-800" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* CATEGORY BAR - Desktop Only */}
        <nav className="hidden md:block bg-[#15803d] text-white text-sm">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="px-4 py-3 hover:bg-green-700">{t('nav.home')}</Link>

              {/* Visible Top 5 */}
              {visibleCategories.map(parent => {
                const subs = getSubCategories(parent.id);
                return (
                  <div key={parent.id} className="relative group">
                    <div onClick={() => navigate(`/shop?category=${parent.id}`)} className="px-4 py-3 cursor-pointer hover:bg-green-700 flex items-center gap-1">
                      {isRTL ? parent.name_ar || parent.name : parent.name}
                      {subs.length > 0 && <ChevronDown size={14} />}
                    </div>
                    {subs.length > 0 && (
                      <div className="absolute top-full left-0 bg-white text-gray-800 w-56 shadow-xl rounded-b-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-[60]">
                        {subs.map(sub => (
                          <Link key={sub.id} to={`/shop?category=${sub.id}`} className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 border-b border-gray-50 last:border-0">
                            {isRTL ? sub.name_ar || sub.name : sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* "More" Logic - EXACTLY AS YOU HAD */}
              {hiddenCategories.length > 0 && (
                <div className="relative group">
                  <div className="px-4 py-3 cursor-pointer hover:bg-green-700 flex items-center gap-1 text-yellow-300 font-semibold">
                    {t('nav.more')} <ChevronDown size={14} />
                  </div>
                  <div className="absolute top-full left-0 bg-white text-gray-800 w-64 shadow-xl rounded-b-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-[60] max-h-[420px] overflow-y-auto">
                    {hiddenCategories.map(cat => (
                      <Link key={cat.id} to={`/shop?category=${cat.id}`} className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-50">
                        {isRTL ? cat.name_ar || cat.name : cat.name}
                      </Link>
                    ))}
                    <Link to="/shop" className="block text-center px-4 py-3 font-bold text-[#15803d] bg-gray-50 hover:bg-green-100">
                      {t('nav.view_all_cat')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/offers" className="mr-4 relative flex items-center gap-2 px-6 py-2 rounded-full text-xs font-extrabold text-[#064E3B] bg-gradient-to-r from-yellow-300 to-orange-400 shadow-lg hover:scale-105 transition-all">
              🔥 {t('nav.offers')}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded-full shadow-md">HOT</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Dark Overlay */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />

        {/* Sidebar Panel */}
        <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-[300px] h-full bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}`}>

          {/* HEADER SECTION - Logo fixed here */}
          <div className="relative bg-gradient-to-br from-green-700 to-green-500 px-4 pt-6 pb-8">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center 
              rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
            >
              <X size={20} className="text-white" />
            </button>

            {/* LOGO */}
            <div className="flex justify-center">
              <img
                src={logoImg}
                alt="Logo"
                className="h-14 object-contain drop-shadow-lg"
              />
            </div>

            {/* OPTIONAL TAGLINE (adds premium feel) */}
            <p className="text-center text-white/80 text-xs mt-2 tracking-wide">
              Fresh Fruits Delivered 🍎
            </p>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-68px)] pb-20">

            {/* 1. Language Switcher */}
            <div className="flex border-b">
              <button onClick={() => changeLanguage('en')} className={`flex-1 py-3 text-sm font-bold ${i18n.language === 'en' ? 'text-green-700 bg-green-50 border-b-2 border-green-700' : 'text-gray-500'}`}>English</button>
              <button onClick={() => changeLanguage('ar')} className={`flex-1 py-3 text-sm font-bold ${i18n.language === 'ar' ? 'text-green-700 bg-green-50 border-b-2 border-green-700' : 'text-gray-500'}`}>العربية</button>
            </div>

            {/* 2. Home Link */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 border-b font-semibold text-gray-700 hover:bg-gray-50">
              <Home size={18} /> {t('nav.home')}
            </Link>

            {/* 3. Categories (VIEW ALL text removed from top) */}
            {parentCategories.map(cat => {
              const subs = getSubCategories(cat.id);
              const isOpen = activeMobileSub === cat.id;

              return (
                <div key={cat.id} className="border-b last:border-0">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <span onClick={() => { navigate(`/shop?category=${cat.id}`); setIsMenuOpen(false) }} className="flex-1 font-medium text-gray-800">
                      {isRTL ? cat.name_ar || cat.name : cat.name}
                    </span>
                    {subs.length > 0 && (
                      <button onClick={() => setActiveMobileSub(isOpen ? null : cat.id)} className="p-2 bg-gray-100 rounded-md">
                        <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Sub-categories Accordion */}
                  {isOpen && subs.length > 0 && (
                    <div className="bg-gray-50 py-1">
                      {subs.map(sub => (
                        <Link key={sub.id} to={`/shop?category=${sub.id}`} onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 pl-8 pr-4 py-3 text-sm text-gray-600 hover:text-green-700 border-b border-gray-100 last:border-0">
                          <ChevronRight size={14} /> {isRTL ? sub.name_ar || sub.name : sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 4. Offers Section */}
            <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 text-orange-600 font-bold bg-orange-50/50 mt-2">
              <span className="flex items-center gap-2">🔥 {t('nav.offers')}</span>
              <ChevronRight size={18} />
            </Link>

            {/* 5. Final View All Link */}
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-6 text-green-700 font-bold underline underline-offset-4 text-lg">
              {t('nav.view_all_cat')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;