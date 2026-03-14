// import React, { useState } from 'react';
// import { X, AlertTriangle, RefreshCw, Banknote } from 'lucide-react'; // Icons Import
// import { requestExchangeApi} from '../../services/api';
// import toast from 'react-hot-toast';

// const ExchangeModal = ({ isOpen, onClose, item, orderId, onSuccess }) => {
//     const [reason, setReason] = useState('Quality Issue (Rotten/Damaged)');
//     const [qty, setQty] = useState(1);
//     const [type, setType] = useState('exchange'); // 'exchange' or 'return'
//     const [loading, setLoading] = useState(false);

//     if (!isOpen || !item) return null;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const data = {
//             order_id: orderId,
//             product_id: item.product_id || item.id,
//             qty: parseInt(qty),
//             reason: reason,
//             request_type: type // <--- Backend ko bhej rahe hain
//         };

//         const res = await requestExchangeApi(data);

//         if (res.success) {
//             toast.success(type === 'exchange' ? "Exchange requested!" : "Return requested!");
//             onSuccess();
//             onClose();
//         } else {
//             toast.error(res.message);
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//             <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                
//                 {/* Header */}
//                 <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
//                     <h3 className="font-bold text-gray-800 flex items-center gap-2">
//                         <AlertTriangle size={20} className="text-orange-500"/> Request Service
//                     </h3>
//                     <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-600">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* Body */}
//                 <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
//                     {/* TYPE SELECTION (Exchange vs Return) */}
//                     <div className="grid grid-cols-2 gap-3">
//                         <button
//                             type="button"
//                             onClick={() => setType('exchange')}
//                             className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
//                                 type === 'exchange' 
//                                 ? 'bg-green-50 border-green-500 text-green-700' 
//                                 : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
//                             }`}
//                         >
//                             <RefreshCw size={24} />
//                             <span className="font-bold text-sm">Exchange Item</span>
//                         </button>

//                         <button
//                             type="button"
//                             onClick={() => setType('return')}
//                             className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
//                                 type === 'return' 
//                                 ? 'bg-blue-50 border-blue-500 text-blue-700' 
//                                 : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
//                             }`}
//                         >
//                             <Banknote size={24} />
//                             <span className="font-bold text-sm">Return & Refund</span>
//                         </button>
//                     </div>

//                     <div className="text-xs text-center text-gray-500 bg-gray-50 p-2 rounded">
//                         {type === 'exchange' 
//                             ? "We will replace the damaged item with a fresh one." 
//                             : "Amount will be refunded to your Wallet/Source after pickup."}
//                     </div>

//                     {/* Quantity Input */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//                         <select 
//                             value={qty} 
//                             onChange={(e) => setQty(e.target.value)}
//                             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                         >
//                             {[...Array(item.quantity)].map((_, i) => (
//                                 <option key={i+1} value={i+1}>{i+1}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Reason Select */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
//                         <select 
//                             value={reason} 
//                             onChange={(e) => setReason(e.target.value)}
//                             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                         >
//                             <option>Quality Issue (Rotten/Damaged)</option>
//                             <option>Wrong Item Received</option>
//                             <option>Item Missing</option>
//                             <option>Packaging Damaged</option>
//                             <option>Don't want anymore</option>
//                         </select>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-2">
//                         <button 
//                             type="submit" 
//                             disabled={loading}
//                             className={`w-full py-2.5 rounded-lg font-bold text-white transition disabled:opacity-50 ${
//                                 type === 'exchange' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
//                             }`}
//                         >
//                             {loading ? 'Processing...' : `Confirm ${type === 'exchange' ? 'Exchange' : 'Return'}`}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ExchangeModal;

import React, { useState } from 'react';
import { X, AlertTriangle, RefreshCw, Banknote } from 'lucide-react'; 
import { requestExchangeApi } from '../../services/api';
import { useTranslation } from 'react-i18next'; // 1. Added i18n import
import toast from 'react-hot-toast';

const ExchangeModal = ({ isOpen, onClose, item, orderId, onSuccess }) => {
    const { t, i18n } = useTranslation(); // 2. Initialize translation hook
    const isRTL = i18n.language === 'ar';

    const [reason, setReason] = useState('Quality Issue (Rotten/Damaged)');
    const [qty, setQty] = useState(1);
    const [type, setType] = useState('exchange'); 
    const [loading, setLoading] = useState(false);

    if (!isOpen || !item) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            order_id: orderId,
            product_id: item.product_id || item.id,
            qty: parseInt(qty),
            reason: reason,
            request_type: type 
        };

        const res = await requestExchangeApi(data);

        if (res.success) {
            toast.success(type === 'exchange' 
                ? (isRTL ? "تم طلب الاستبدال!" : "Exchange requested!") 
                : (isRTL ? "تم طلب الاسترجاع!" : "Return requested!")
            );
            onSuccess();
            onClose();
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                
                {/* Header */}
                <div className={`bg-gray-50 p-4 border-b flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-bold text-gray-800 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <AlertTriangle size={20} className="text-orange-500"/> 
                        {isRTL ? 'طلب الخدمة' : 'Request Service'}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* TYPE SELECTION (Exchange vs Return) */}
                    <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'direction-rtl' : ''}`}>
                        <button
                            type="button"
                            onClick={() => setType('exchange')}
                            className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                                type === 'exchange' 
                                ? 'bg-green-50 border-green-500 text-green-700' 
                                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <RefreshCw size={24} className={isRTL ? 'rotate-180' : ''} />
                            <span className="font-bold text-sm">{isRTL ? 'استبدال المنتج' : 'Exchange Item'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setType('return')}
                            className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                                type === 'return' 
                                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <Banknote size={24} />
                            <span className="font-bold text-sm">{isRTL ? 'استرجاع ومبلغ' : 'Return & Refund'}</span>
                        </button>
                    </div>

                    <div className="text-xs text-center text-gray-500 bg-gray-50 p-2 rounded">
                        {type === 'exchange' 
                            ? (isRTL ? "سنقوم باستبدال المنتج التالف بمنتج طازج." : "We will replace the damaged item with a fresh one.") 
                            : (isRTL ? "سيتم استرداد المبلغ إلى محفظتك/المصدر بعد الاستلام." : "Amount will be refunded to your Wallet/Source after pickup.")}
                    </div>

                    {/* Quantity Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{isRTL ? 'الكمية' : 'Quantity'}</label>
                        <select 
                            value={qty} 
                            onChange={(e) => setQty(e.target.value)}
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none ${isRTL ? 'text-right' : ''}`}
                        >
                            {[...Array(item.quantity)].map((_, i) => (
                                <option key={i+1} value={i+1}>{i+1}</option>
                            ))}
                        </select>
                    </div>

                    {/* Reason Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{isRTL ? 'السبب' : 'Reason'}</label>
                        <select 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)}
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none ${isRTL ? 'text-right' : ''}`}
                        >
                            <option value="Quality Issue (Rotten/Damaged)">{isRTL ? 'مشكلة في الجودة (تالف/فاسد)' : 'Quality Issue (Rotten/Damaged)'}</option>
                            <option value="Wrong Item Received">{isRTL ? 'تم استلام منتج خاطئ' : 'Wrong Item Received'}</option>
                            <option value="Item Missing">{isRTL ? 'منتج ناقص' : 'Item Missing'}</option>
                            <option value="Packaging Damaged">{isRTL ? 'تغليف تالف' : 'Packaging Damaged'}</option>
                            <option value="Don't want anymore">{isRTL ? 'لا أريد المنتج بعد الآن' : "Don't want anymore"}</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-2.5 rounded-lg font-bold text-white transition disabled:opacity-50 ${
                                type === 'exchange' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {loading ? (isRTL ? 'جاري المعالجة...' : 'Processing...') : 
                             `${isRTL ? 'تأكيد' : 'Confirm'} ${type === 'exchange' ? (isRTL ? 'الاستبدال' : 'Exchange') : (isRTL ? 'الاسترجاع' : 'Return')}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExchangeModal;