// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // <--- 1. Import Link
// import { useAuth } from '../context/AuthContext';
// import { fetchUserProfile, fetchMyOrders, updateUserProfile ,getImageUrl} from '../services/api';
// import { User, Package, Settings, LogOut, Camera, ArrowRight, ExternalLink } from 'lucide-react'; // Added icons
// import toast from 'react-hot-toast';

// const Profile = () => {
//     const { logout } = useAuth();
//     const navigate = useNavigate();
    
//     // State
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('dashboard'); 
//     const [userData, setUserData] = useState(null);
//     const [recentOrders, setRecentOrders] = useState([]);
//     const [allOrders, setAllOrders] = useState([]);

//     // Form State
//     const [formData, setFormData] = useState({
//         full_name: '',
//         phone: '',
//         gender: '',
//         password: '',
//         profile_pic: null
//     });
//     const [previewImage, setPreviewImage] = useState(null);

//     // Initial Data Fetch
//     useEffect(() => {
//         loadDashboard();
//     }, []);

//     const loadDashboard = async () => {
//         setLoading(true);
//         const res = await fetchUserProfile();
        
//         if (res.success) {
//             setUserData(res.data.user);
//             setRecentOrders(res.data.recent_orders || []);
            
//             setFormData({
//                 full_name: res.data.user.full_name || '',
//                 phone: res.data.user.phone || '',
//                 gender: res.data.user.gender || 'Male',
//                 password: '',
//                 profile_pic: null
//             });
//         } else {
//             toast.error("Session expired. Please login.");
//             logout();
//         }
//         setLoading(false);
//     };

//     const handleTabChange = async (tab) => {
//         setActiveTab(tab);
//         if (tab === 'orders' && allOrders.length === 0) {
//             const res = await fetchMyOrders();
//             if (res.success) setAllOrders(res.data);
//         }
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append('full_name', formData.full_name);
//         data.append('phone', formData.phone);
//         data.append('gender', formData.gender);
//         if (formData.password) data.append('password', formData.password);
//         if (formData.profile_pic) data.append('profile_pic', formData.profile_pic);

//         const res = await updateUserProfile(data);
//         if (res.success) {
//             toast.success("Profile updated successfully!");
//             setUserData(res.data);
//             setFormData(prev => ({ ...prev, password: '' }));
//         } else {
//             toast.error(res.message);
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData({ ...formData, profile_pic: file });
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     const getProfileImg = (path) => {
//         if (previewImage) return previewImage;
//         if (path && path.startsWith('/uploads')) return getImageUrl(path);
//         return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; 
//     };

//     if (loading) return <div className="h-screen flex items-center justify-center">Loading Profile...</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
//             <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                
//                 {/* --- LEFT SIDEBAR --- */}
//                 <div className="lg:col-span-1">
//                     <div className="bg-white rounded-xl shadow-sm p-6 text-center">
//                         <div className="relative w-24 h-24 mx-auto mb-4">
//                             <img 
//                                 src={getProfileImg(userData?.profile_pic)} 
//                                 alt="Profile" 
//                                 className="w-full h-full rounded-full object-cover border-4 border-green-50"
//                             />
//                         </div>
//                         <h2 className="text-xl font-bold text-gray-800">{userData?.full_name}</h2>
//                         <p className="text-sm text-gray-500 mb-6">{userData?.email}</p>

//                         <div className="flex flex-col gap-2 text-left">
//                             <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
//                                 <User size={20} /> Dashboard
//                             </button>
//                             <button onClick={() => handleTabChange('orders')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
//                                 <Package size={20} /> My Orders
//                             </button>
//                             <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
//                                 <Settings size={20} /> Settings
//                             </button>
//                             <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4">
//                                 <LogOut size={20} /> Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- RIGHT CONTENT --- */}
//                 <div className="lg:col-span-3">
                    
//                     {/* 1. DASHBOARD TAB */}
//                     {activeTab === 'dashboard' && (
//                         <div className="space-y-6">
//                             <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-8 text-white shadow-lg">
//                                 <h1 className="text-3xl font-bold mb-2">Welcome back, {userData?.full_name.split(' ')[0]}! 👋</h1>
//                                 <p className="opacity-90">Track your orders and manage your account details here.</p>
//                             </div>

//                             <div className="bg-white rounded-xl shadow-sm p-6">
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
//                                     <button onClick={() => handleTabChange('orders')} className="text-green-600 text-sm font-semibold hover:underline">View All</button>
//                                 </div>

//                                 {recentOrders.length > 0 ? (
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full text-left">
//                                             <thead>
//                                                 <tr className="text-gray-400 text-sm border-b">
//                                                     <th className="pb-3 font-medium">Order ID</th>
//                                                     <th className="pb-3 font-medium">Date</th>
//                                                     <th className="pb-3 font-medium">Total</th>
//                                                     <th className="pb-3 font-medium">Status</th>
//                                                     <th className="pb-3 font-medium">Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="text-sm">
//                                                 {recentOrders.map(order => (
//                                                     <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
//                                                         <td className="py-4 font-medium">#{order.id}</td>
//                                                         <td className="py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
//                                                         <td className="py-4 font-bold">₹{order.final_total}</td>
//                                                         <td className="py-4">
//                                                             <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                                                 order.order_status === 'delivered' ? 'bg-green-100 text-green-700' : 
//                                                                 order.order_status === 'cancelled' ? 'bg-red-100 text-red-700' : 
//                                                                 'bg-yellow-100 text-yellow-700'
//                                                             }`}>
//                                                                 {order.order_status.toUpperCase()}
//                                                             </span>
//                                                         </td>
//                                                         {/* --- VIEW LINK --- */}
//                                                         <td className="py-4">
//                                                             <Link to={`/order/${order.id}`} className="text-green-600 hover:text-green-800 font-medium flex items-center gap-1">
//                                                                 View <ArrowRight size={14}/>
//                                                             </Link>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center py-10 text-gray-400">No recent orders found.</div>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* 2. ORDERS TAB (UPDATED: CLICKABLE LINKS) */}
//                     {activeTab === 'orders' && (
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <h2 className="text-xl font-bold mb-6">Order History</h2>
//                             <div className="space-y-4">
//                                 {allOrders.map(order => (
//                                     /* --- 2. WRAPPED IN LINK --- */
//                                     <Link 
//                                         to={`/order/${order.id}`} 
//                                         key={order.id} 
//                                         className="block border rounded-lg p-4 hover:shadow-md transition-all duration-200 group bg-white"
//                                     >
//                                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//                                             <div className="flex gap-4">
//                                                 <div className="bg-gray-100 w-16 h-16 rounded flex items-center justify-center overflow-hidden border">
//                                                     {order.thumbnail ? (
//                                                         <img src={`http://localhost:5000${order.thumbnail}`} alt="Product" className="w-full h-full object-cover mix-blend-multiply"/>
//                                                     ) : <Package className="text-gray-400" />}
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors flex items-center gap-2">
//                                                         Order #{order.id} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//                                                     </h4>
//                                                     <p className="text-sm text-gray-500">{new Date(order.created_at).toDateString()}</p>
//                                                     <p className="text-xs text-green-600 font-semibold mt-1">{order.total_items} Items</p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-right mt-2 md:mt-0">
//                                                 <p className="font-bold text-lg">₹{order.final_total}</p>
//                                                 <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
//                                                     order.order_status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
//                                                 }`}>
//                                                     {order.order_status.toUpperCase()}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 ))}
//                                 {allOrders.length === 0 && <p className="text-center text-gray-500 py-10">You haven't placed any orders yet.</p>}
//                             </div>
//                         </div>
//                     )}

//                     {/* 3. SETTINGS TAB */}
//                     {activeTab === 'settings' && (
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
//                             <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {/* Photo Upload */}
//                                 <div className="md:col-span-2 flex items-center gap-4">
//                                     <div className="relative w-20 h-20">
//                                         <img src={getProfileImg(userData?.profile_pic)} className="w-full h-full rounded-full object-cover border" alt="Profile" />
//                                         <label className="absolute bottom-0 right-0 bg-white border shadow p-1 rounded-full cursor-pointer hover:bg-gray-50">
//                                             <Camera size={14} className="text-gray-600"/>
//                                             <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
//                                         </label>
//                                     </div>
//                                     <div>
//                                         <h4 className="font-medium text-gray-800">Profile Photo</h4>
//                                         <p className="text-xs text-gray-500">Max file size 2MB</p>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                                     <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                                     <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                                     <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none">
//                                         <option value="Male">Male</option>
//                                         <option value="Female">Female</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
//                                     <input type="password" placeholder="Leave blank to keep current" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
//                                 </div>
//                                 <div className="md:col-span-2 text-right">
//                                     <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm">Save Changes</button>
//                                 </div>
//                             </form>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext'; // 1. Added Missing Import
import { fetchUserProfile, fetchMyOrders, updateUserProfile, getImageUrl } from '../services/api';
import { User, Package, Settings, LogOut, Camera, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 2. Added translation hook
import toast from 'react-hot-toast';

const Profile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); 
    const { formatPrice } = useSettings(); // 3. Fixed ReferenceError by initializing hook

    const isRTL = i18n.language === 'ar';
    
    // State
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard'); 
    const [userData, setUserData] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        gender: '',
        password: '',
        profile_pic: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    // Initial Data Fetch
    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        setLoading(true);
        const res = await fetchUserProfile();
        
        if (res.success) {
            setUserData(res.data.user);
            setRecentOrders(res.data.recent_orders || []);
            
            setFormData({
                full_name: res.data.user.full_name || '',
                phone: res.data.user.phone || '',
                gender: res.data.user.gender || 'Male',
                password: '',
                profile_pic: null
            });
        } else {
            toast.error(isRTL ? "انتهت الجلسة. يرجى تسجيل الدخول." : "Session expired. Please login.");
            logout();
        }
        setLoading(false);
    };

    const handleTabChange = async (tab) => {
        setActiveTab(tab);
        if (tab === 'orders' && allOrders.length === 0) {
            const res = await fetchMyOrders();
            if (res.success) setAllOrders(res.data);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('full_name', formData.full_name);
        data.append('phone', formData.phone);
        data.append('gender', formData.gender);
        if (formData.password) data.append('password', formData.password);
        if (formData.profile_pic) data.append('profile_pic', formData.profile_pic);

        const res = await updateUserProfile(data);
        if (res.success) {
            toast.success(isRTL ? "تم تحديث الملف الشخصي بنجاح!" : "Profile updated successfully!");
            setUserData(res.data);
            setFormData(prev => ({ ...prev, password: '' }));
        } else {
            toast.error(res.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profile_pic: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const getProfileImg = (path) => {
        if (previewImage) return previewImage;
        if (path && path.startsWith('/uploads')) return getImageUrl(path);
        return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; 
    };

    if (loading) return <div className="h-screen flex items-center justify-center text-green-600 font-bold">{t('common.loading')}</div>;

    return (
        <div className={`min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* --- LEFT SIDEBAR --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <img 
                                src={getProfileImg(userData?.profile_pic)} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover border-4 border-green-50"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{userData?.full_name}</h2>
                        <p className="text-sm text-gray-500 mb-6">{userData?.email}</p>

                        <div className={`flex flex-col gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <User size={20} /> {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                            </button>
                            <button onClick={() => handleTabChange('orders')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${activeTab === 'orders' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <Package size={20} /> {isRTL ? 'طلباتي' : 'My Orders'}
                            </button>
                            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${activeTab === 'settings' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <Settings size={20} /> {isRTL ? 'الإعدادات' : 'Settings'}
                            </button>
                            <button onClick={logout} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <LogOut size={20} /> {isRTL ? 'تسجيل الخروج' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT CONTENT --- */}
                <div className="lg:col-span-3">
                    
                    {/* 1. DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            <div className={`bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-8 text-white shadow-lg ${isRTL ? 'text-right' : ''}`}>
                                <h1 className="text-3xl font-bold mb-2">{isRTL ? 'مرحباً بعودتك' : 'Welcome back'}, {userData?.full_name.split(' ')[0]}! 👋</h1>
                                <p className="opacity-90">{isRTL ? 'تتبع طلباتك وقم بإدارة تفاصيل حسابك هنا.' : 'Track your orders and manage your account details here.'}</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <h3 className="text-lg font-bold text-gray-800">{isRTL ? 'الطلبات الأخيرة' : 'Recent Orders'}</h3>
                                    <button onClick={() => handleTabChange('orders')} className="text-green-600 text-sm font-semibold hover:underline">{isRTL ? 'عرض الكل' : 'View All'}</button>
                                </div>

                                {recentOrders.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                                            <thead>
                                                <tr className={`text-gray-400 text-sm border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <th className="pb-3 font-medium">{isRTL ? 'رقم الطلب' : 'Order ID'}</th>
                                                    <th className="pb-3 font-medium">{isRTL ? 'التاريخ' : 'Date'}</th>
                                                    <th className="pb-3 font-medium">{isRTL ? 'الإجمالي' : 'Total'}</th>
                                                    <th className="pb-3 font-medium">{isRTL ? 'الحالة' : 'Status'}</th>
                                                    <th className="pb-3 font-medium">{isRTL ? 'الإجراء' : 'Action'}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {recentOrders.map(order => (
                                                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                                                        <td className="py-4 font-medium">#{order.id}</td>
                                                        <td className="py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString(isRTL ? 'ar-AE' : 'en-GB')}</td>
                                                        <td className="py-4 font-bold">{formatPrice(order.final_total)}</td>
                                                        <td className="py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                                order.order_status === 'delivered' ? 'bg-green-100 text-green-700' : 
                                                                order.order_status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                                                                'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                                {isRTL ? t(`status.${order.order_status}`) : order.order_status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="py-4">
                                                            <Link to={`/order/${order.id}`} className={`text-green-600 hover:text-green-800 font-medium flex items-center gap-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                                                                {isRTL ? 'عرض' : 'View'} {isRTL ? <ArrowLeft size={14}/> : <ArrowRight size={14}/>}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-gray-400">{isRTL ? 'لا توجد طلبات حديثة.' : 'No recent orders found.'}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 2. ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className={`text-xl font-bold mb-6 ${isRTL ? 'text-right' : ''}`}>{isRTL ? 'سجل الطلبات' : 'Order History'}</h2>
                            <div className="space-y-4">
                                {allOrders.map(order => (
                                    <Link 
                                        to={`/order/${order.id}`} 
                                        key={order.id} 
                                        className={`block border rounded-lg p-4 hover:shadow-md transition-all duration-200 group bg-white ${isRTL ? 'text-right' : ''}`}
                                    >
                                        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                                            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <div className="bg-gray-100 w-16 h-16 rounded flex items-center justify-center overflow-hidden border">
                                                    {order.thumbnail ? (
                                                        <img src={`http://localhost:5000${order.thumbnail}`} alt="Product" className="w-full h-full object-cover mix-blend-multiply"/>
                                                    ) : <Package className="text-gray-400" />}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold text-gray-800 group-hover:text-green-600 transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                        {isRTL ? 'طلب رقم' : 'Order'} #{order.id} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </h4>
                                                    <p className="text-sm text-gray-500">{new Date(order.created_at).toDateString()}</p>
                                                    <p className="text-xs text-green-600 font-semibold mt-1">{order.total_items} {isRTL ? 'منتجات' : 'Items'}</p>
                                                </div>
                                            </div>
                                            <div className={`${isRTL ? 'text-left' : 'text-right'} mt-2 md:mt-0`}>
                                                <p className="font-bold text-lg">{formatPrice(order.final_total)}</p>
                                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                                                    order.order_status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {isRTL ? t(`status.${order.order_status}`) : order.order_status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {allOrders.length === 0 && <p className="text-center text-gray-500 py-10">{isRTL ? 'لم تقم بإجراء أي طلبات بعد.' : "You haven't placed any orders yet."}</p>}
                            </div>
                        </div>
                    )}

                    {/* 3. SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className={`text-xl font-bold mb-6 ${isRTL ? 'text-right' : ''}`}>{isRTL ? 'تعديل الملف الشخصي' : 'Edit Profile'}</h2>
                            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`md:col-span-2 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="relative w-20 h-20">
                                        <img src={getProfileImg(userData?.profile_pic)} className="w-full h-full rounded-full object-cover border" alt="Profile" />
                                        <label className={`absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} bg-white border shadow p-1 rounded-full cursor-pointer hover:bg-gray-50`}>
                                            <Camera size={14} className="text-gray-600"/>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                    <div className={isRTL ? 'text-right' : 'text-left'}>
                                        <h4 className="font-medium text-gray-800">{isRTL ? 'صورة الملف الشخصي' : 'Profile Photo'}</h4>
                                        <p className="text-xs text-gray-500">{isRTL ? 'الحد الأقصى لحجم الملف 2 ميجابايت' : 'Max file size 2MB'}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
                                    <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className={`w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none ${isRTL ? 'text-right' : ''}`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</label>
                                    <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className={`w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none ${isRTL ? 'text-right' : ''}`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{isRTL ? 'الجنس' : 'Gender'}</label>
                                    <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className={`w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none ${isRTL ? 'text-right' : ''}`}>
                                        <option value="Male">{isRTL ? 'ذكر' : 'Male'}</option>
                                        <option value="Female">{isRTL ? 'أنثى' : 'Female'}</option>
                                        <option value="Other">{isRTL ? 'آخر' : 'Other'}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                                    <input type="password" placeholder={isRTL ? 'اتركه فارغاً للاحتفاظ بالحالية' : 'Leave blank to keep current'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className={`w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none ${isRTL ? 'text-right' : ''}`} />
                                </div>
                                <div className={`md:col-span-2 ${isRTL ? 'text-left' : 'text-right'}`}>
                                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm">{isRTL ? 'حفظ التغييرات' : 'Save Changes'}</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;