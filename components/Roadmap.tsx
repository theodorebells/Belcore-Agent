
import React from 'react';

const Roadmap: React.FC = () => {
  const items = [
    { year: "2024 (Current)", title: "Core Automation", desc: "Digital intake, cloud database sync, and manual WhatsApp templates.", status: "LIVE" },
    { year: "2025-2026", title: "API Integrations", desc: "Native bank-statement reconciliation and automated Paystack/Flutterwave invoicing.", status: "PLANNED" },
    { year: "2027", title: "Predictive Intelligence", desc: "Advanced forecasting to predict when an SME will run out of inventory based on historical sales.", status: "FUTURE" },
    { year: "2028", title: "Native Voice-Commerce", desc: "Voice-based sales recording for semi-literate merchants across multiple Nigerian dialects.", status: "FUTURE" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-gray-900">The Road Ahead</h2>
        <p className="text-gray-500">BELCORE CAPITAL LTD is committed to the long-term digital maturity of African SMEs.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-gray-200 before:to-transparent">
        {items.map((item, idx) => (
          <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${item.status === 'FUTURE' ? 'opacity-40' : ''}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-125 z-10">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 12 12"><path d="M10.4 3.4L5.5 8.3 1.6 4.4 0 6l5.5 5.5L12 5z"/></svg>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:border-emerald-200">
              <div className="flex items-center justify-between space-x-2 mb-2">
                <div className="font-black text-emerald-600">{item.year}</div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase ${item.status === 'LIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {item.status}
                </span>
              </div>
              <h4 className="font-black text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 p-10 rounded-[40px] text-center border border-emerald-100">
        <h4 className="text-lg font-black text-emerald-900 mb-4">Strategic Commitment</h4>
        <p className="text-sm text-emerald-700 max-w-xl mx-auto leading-relaxed italic">
          "Our technology is built to evolve. As the Nigerian digital landscape matures, Belcore will remain at the forefront, providing SMEs with world-class tools to compete globally."
        </p>
      </div>
    </div>
  );
};

export default Roadmap;
