import { Leaf, Star, ShieldCheck, Package } from 'lucide-react';

const TrustStrip = () => {
  const items = [
    {
      icon: <Leaf size={22} />,
      title: "Farm-Fresh Quality",
      subtitle: "Direct from trusted farms",
    },
    {
      icon: <Star size={22} />,
      title: "10,000+ Happy Customers",
      subtitle: "4.8★ average rating",
    },
    {
      icon: <Package size={22} />,
      title: "Premium Packaging",
      subtitle: "Gift-ready & hygienic",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Secure & Trusted",
      subtitle: "Safe payments & handling",
    },
  ];

  return (
    <section className="bg-[#F6FBF7] border-t border-green-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="text-[#064E3B] bg-white p-3 rounded-full shadow-sm">
                {item.icon}
              </div>
              <p className="font-semibold text-gray-900 text-sm">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
