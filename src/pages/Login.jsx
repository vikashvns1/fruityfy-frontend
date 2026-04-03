// import { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Redirect Logic: Did we come from Checkout? If yes, go back there. If no, go Home.
//   const from = location.state?.from || '/';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate slight delay for smooth UX (optional)
//     await new Promise(r => setTimeout(r, 800));

//     const success = await login(email, password);
    
//     if (success) {
//         // Redirect to the previous page (e.g., Checkout)
//         navigate(from, { replace: true });
//     } else {
//         setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      
//       {/* Back to Home Button (Floating) */}
//       <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-green-700 transition font-medium z-10">
//         <ArrowLeft size={20} /> Back to Home
//       </Link>

//       <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
//         {/* LEFT SIDE: Premium Visuals */}
//         <div className="hidden md:block w-1/2 relative">
//           <img 
//             src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1000&auto=format&fit=crop" 
//             alt="Fresh Fruits" 
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex flex-col justify-end p-12">
//             <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
//                 <h2 className="text-3xl font-bold mb-2">Nature's Best, <br/>Delivered.</h2>
//                 <p className="text-green-50 opacity-90 text-sm leading-relaxed">
//                     Log in to track your orders, save your wishlist, and enjoy exclusive member deals.
//                 </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: Login Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
//           <div className="mb-10">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h1>
//             <p className="text-gray-500">Enter your details to access your account.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
//                 <input 
//                   type="email" 
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-gray-700" 
//                   placeholder="name@example.com"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <div className="flex justify-between items-center mb-1.5 ml-1">
//                  <label className="block text-sm font-semibold text-gray-700">Password</label>
//                  <a href="#" className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline">Forgot Password?</a>
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-gray-700" 
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button 
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
//                 >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button 
//                 type="submit" 
//                 disabled={isSubmitting}
//                 className="w-full bg-[#15803d] text-white py-4 rounded-xl font-bold text-lg shadow-green-200 shadow-lg hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                   <>
//                     <Loader2 className="animate-spin" size={24} /> Signing In...
//                   </>
//               ) : (
//                   <>
//                     Sign In <ArrowRight size={20} />
//                   </>
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-10 text-center border-t border-gray-100 pt-6">
//             <p className="text-gray-600">
//               Don't have an account? 
//               <Link to="/signup" className="text-green-700 font-bold ml-1 hover:underline">Create Account</Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import
import toast from 'react-hot-toast';

const Login = () => {
  const { t, i18n } = useTranslation(); // 2. Initialize translation hook
  const isRTL = i18n.language === 'ar';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(r => setTimeout(r, 800));
    const success = await login(email, password);
    
    if (success) {
        navigate(from, { replace: true });
    } else {
        setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Back to Home Button (Floating) */}
      <Link to="/" className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} flex items-center gap-2 text-gray-600 hover:text-green-700 transition font-medium z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />} {t('common.back') || 'Back to Home'}
      </Link>

      <div className={`max-w-5xl w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[600px]`}>
        
        {/* LEFT SIDE: Premium Visuals */}
        <div className="hidden md:block w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1000&auto=format&fit=crop" 
            alt="Fresh Fruits" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex flex-col justify-end p-12">
            <div className={`backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white ${isRTL ? 'text-right' : ''}`}>
                <h2 className="text-3xl font-bold mb-2">
                    {isRTL ? 'أفضل ما في الطبيعة،' : "Nature's Best,"} <br/>
                    {isRTL ? 'يصلك أينما كنت.' : 'Delivered.'}
                </h2>
                <p className="text-green-50 opacity-90 text-sm leading-relaxed">
                    {isRTL 
                      ? 'قم بتسجيل الدخول لتتبع طلباتك، وحفظ قائمة أمنياتك، والاستمتاع بعروض حصرية للأعضاء.' 
                      : 'Log in to track your orders, save your wishlist, and enjoy exclusive member deals.'}
                </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.login_title')}</h1>
            <p className="text-gray-500">
                {isRTL ? 'أدخل تفاصيلك للوصول إلى حسابك.' : 'Enter your details to access your account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${isRTL ? 'mr-1' : 'ml-1'}`}>{t('auth.email')}</label>
              <div className="relative group">
                <Mail className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5`} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-gray-700 ${isRTL ? 'text-right' : ''}`} 
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className={`flex justify-between items-center mb-1.5 ${isRTL ? 'flex-row-reverse mr-1' : 'ml-1'}`}>
                  <label className="block text-sm font-semibold text-gray-700">{t('auth.password')}</label>
                  <a href="#" className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline">{t('auth.forgot')}</a>
              </div>
              <div className="relative group">
                <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5`} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-gray-700 ${isRTL ? 'text-right' : ''}`} 
                  placeholder="••••••••"
                  required
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-3.5 text-gray-400 hover:text-gray-600`}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#15803d] text-white py-4 rounded-xl font-bold text-lg shadow-green-200 shadow-lg hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} /> {isRTL ? 'جاري تسجيل الدخول...' : 'Signing In...'}
                  </>
              ) : (
                  <>
                    {t('auth.signin_btn')} {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                  </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              {t('auth.no_account')} 
              <Link to="/signup" className="text-green-700 font-bold ml-1 hover:underline">{t('auth.signup_title')}</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;