import {
    Truck,
    Leaf,
    ShieldCheck,
    Clock
} from 'lucide-react';

const features = [
    {
        icon: Leaf,
        title: 'Farm Fresh Quality',
        desc: 'Handpicked fruits sourced daily from trusted farms'
    },
    {
        icon: Truck,
        title: 'Same Day Delivery',
        desc: 'Fresh fruits delivered across Dubai & Abu Dhabi'
    },
    {
        icon: ShieldCheck,
        title: '100% Trusted',
        desc: 'Safe payments, premium packaging & quality assurance'
    },
    {
        icon: Clock,
        title: 'Always On Time',
        desc: 'Quick processing with real-time order tracking'
    }
];

const WhyChooseUs = () => {
    return (
        <section className="bg-white py-16 border-y border-gray-100">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="text-[#eab308] font-bold text-xs tracking-widest uppercase">
                        Our Promise
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mt-2">
                        Why Customers Love Fruitify
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        We go the extra mile to deliver freshness, quality and trust in every order.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                {/* ICON */}
                                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#15803d] mb-4 shadow-md">
                                    <Icon className="text-white" size={28} />
                                </div>

                                {/* TITLE */}
                                <h3 className="font-bold text-dark mb-2 text-sm md:text-base">
                                    {item.title}
                                </h3>

                                {/* DESC */}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>


            </div>
        </section>
    );
};

export default WhyChooseUs;
