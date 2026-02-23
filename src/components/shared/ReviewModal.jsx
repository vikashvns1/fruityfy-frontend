import React, { useState } from 'react';
import { Star, X, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { addReviewApi } from '../../services/api';
import toast from 'react-hot-toast';

const ReviewModal = ({ productId, productName, onClose, onSuccess }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]); 
    const [previews, setPreviews] = useState([]); 
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 3) {
            toast.error("You can only upload up to 3 images");
            return;
        }
        setImages([...images, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('rating', rating);
        // Backend agar title mang raha ho to khali string ya 'Review' bhej do
        formData.append('title', ''); 
        formData.append('comment', comment);
        
        images.forEach((image) => {
            formData.append('images', image);
        });
        
        const res = await addReviewApi(formData);
        
        if (res.success) {
            toast.success("Review submitted!");
            if (onSuccess) onSuccess(); 
            onClose();
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
                        <ImageIcon size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Rate your experience</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">{productName}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Stars Selection */}
                    <div className="flex justify-center gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                type="button" 
                                key={star} 
                                onClick={() => setRating(star)}
                                className="transform active:scale-90 transition-transform"
                            >
                                <Star 
                                    size={42} 
                                    fill={star <= rating ? "#EAB308" : "none"} 
                                    className={star <= rating ? "text-yellow-400 drop-shadow-sm" : "text-gray-200"} 
                                />
                            </button>
                        ))}
                    </div>

                    {/* Comment Area */}
                    <div>
                        <textarea 
                            required 
                            rows="4" 
                            placeholder="How was the product? Tell us about the freshness and quality..." 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 text-sm font-medium placeholder:text-gray-400 resize-none transition-all"
                        ></textarea>
                    </div>

                    {/* Modern Image Upload */}
                    <div className="space-y-3">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Photos (Optional)</p>
                        <div className="flex flex-wrap gap-3">
                            <label className="w-16 h-16 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-green-50 hover:border-green-300 transition-all text-gray-400 hover:text-green-600">
                                <Camera size={20} />
                                <span className="text-[9px] font-bold">Add</span>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>

                            {previews.map((src, idx) => (
                                <div key={idx} className="relative group w-16 h-16 rounded-2xl overflow-hidden border border-gray-100">
                                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-green-700 hover:shadow-green-200 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:shadow-none"
                    >
                        {loading ? "Posting Review..." : "Submit My Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;