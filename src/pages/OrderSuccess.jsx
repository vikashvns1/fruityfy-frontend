import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-green-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-500 mb-6">
                    Thank you for your purchase. Your order <span className="font-bold text-gray-800">#{orderId}</span> has been placed successfully.
                </p>

                <div className="space-y-3">
                    <button 
                        onClick={() => navigate('/profile')} 
                        className="w-full bg-[#15803d] text-white py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                        <Package size={20} /> Track Order
                    </button>
                    
                    <button 
                        onClick={() => navigate('/')} 
                        className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        <Home size={20} /> Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;