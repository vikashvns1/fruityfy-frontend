// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { User, Mail, Lock, ArrowRight } from 'lucide-react';

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await register(formData.name, formData.email, formData.password);
//     if (success) navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-row-reverse">
        
//         {/* Right Side: Image */}
//         <div className="hidden md:block w-1/2 bg-cover bg-center" 
//              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1000&auto=format&fit=crop')" }}>
//         </div>

//         {/* Left Side: Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//             <p className="text-gray-500 mt-2">Join Fruitify for fresh updates</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                 <input 
//                   type="text" 
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none" 
//                   placeholder="Rahul Mishra"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                 <input 
//                   type="email" 
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none" 
//                   placeholder="rahul@example.com"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                 <input 
//                   type="password" 
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none" 
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </div>

//             <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
//               Sign Up <ArrowRight size={20} />
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-8">
//             Already have an account? 
//             <Link to="/login" className="text-primary font-bold ml-1 hover:underline">Sign In</Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import

const Signup = () => {
  const { t, i18n } = useTranslation(); // 2. Initialize translation hook
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData.name, formData.email, formData.password);
    if (success) navigate('/login');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Side Image - Flips position in RTL */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1000&auto=format&fit=crop')" }}>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('auth.signup_title')}</h2>
            <p className="text-gray-500 mt-2">
                {isRTL ? 'انضم إلى فروتيفاي للحصول على تحديثات طازجة' : 'Join Fruitify for fresh updates'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.full_name')}</label>
              <div className="relative">
                <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-gray-400 w-5 h-5`} />
                <input 
                  type="text" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none ${isRTL ? 'text-right' : ''}`} 
                  placeholder={isRTL ? "مثلاً: راؤول مشرا" : "Rahul Mishra"}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.email')}</label>
              <div className="relative">
                <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-gray-400 w-5 h-5`} />
                <input 
                  type="email" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none ${isRTL ? 'text-right' : ''}`} 
                  placeholder="rahul@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.password')}</label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-gray-400 w-5 h-5`} />
                <input 
                  type="password" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none ${isRTL ? 'text-right' : ''}`} 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className={`w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t('auth.signup_btn')} {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            {t('auth.has_account')} 
            <Link to="/login" className="text-primary font-bold ml-1 hover:underline">{t('auth.signin_btn')}</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;