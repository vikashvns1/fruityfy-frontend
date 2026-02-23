import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {fetchCampaignBySlug,getImageUrl} from "../services/api";
import ProductCard from "../components/shared/ProductCard";
import toast from 'react-hot-toast';

const CampaignPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const res = await fetchCampaignBySlug(slug);
        setCampaign(res);
      } catch (err) {
        // 🔥 CAMPAIGN EXPIRED / NOT FOUND
        toast.error('error fetching campaign: ' + err.message);
        navigate('/shop', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [slug, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!campaign) return null;

  return (
    <div className="max-w-[1536px] mx-auto px-4 py-10">
      <img
        src={getImageUrl(campaign.banner_image)}
        className="w-full h-[300px] object-cover rounded-xl mb-8"
      />

      <h1 className="text-4xl font-serif font-bold text-[#064E3B]">
        {campaign.name}
      </h1>
      <p className="text-gray-600 mt-2">{campaign.subtitle}</p>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {campaign.products.map(p => (
          <ProductCard key={p.id} product={p} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;
