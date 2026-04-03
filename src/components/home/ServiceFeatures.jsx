import { Truck, Leaf, Headphones, ShieldCheck } from 'lucide-react';

const ServiceFeatures = () => {
  const features = [
    {
      icon: <Truck size={18} />,
      title: 'Fast Local Delivery',
      subtitle: 'Dubai & Abu Dhabi',
    },
    {
      icon: <Leaf size={18} />,
      title: 'Farm-Fresh Quality',
      subtitle: 'Handpicked daily',
    },
    {
      icon: <Headphones size={18} />,
      title: '24/7 Support',
      subtitle: 'WhatsApp & Chat',
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Secure Payments',
      subtitle: 'COD & Online',
    },
  ];

  return (
    <section className="bg-white">
      <div className="
        max-w-[1200px]
        mx-auto
        px-4
        py-4
        border-b border-gray-100
      ">
        <div className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-y-4
          gap-x-6
          text-center
        ">
          {features.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-3"
            >
              <div className="
                text-[#064E3B]
                bg-green-50
                rounded-full
                p-2
              ">
                {item.icon}
              </div>

              <div className="text-left leading-tight">
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
