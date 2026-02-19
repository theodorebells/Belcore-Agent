
import React from 'react';

const Roadmap: React.FC = () => {
  const items = [
    { year: "2026 (Live)", title: "The Foundation Core", desc: "Digital intake engines, multi-branch cloud-synchronized inventory, and enterprise WhatsApp automation frameworks.", status: "LIVE" },
    { year: "2027", title: "Neural Specialist Force", desc: "Autonomous AI Voice Receptionists handling 1000+ calls simultaneously. AI Tax Managers with direct FIRS TaxPro-Max API — one-click e-filing of VAT returns, WHT remittances, PAYE schedules, and annual income tax. Real-time compliance scoring prevents penalties before they happen. Full payroll automation with biometric clock-in integration.", status: "PLANNING" },
    { year: "2028", title: "The Autonomous Sovereign", desc: "Self-healing supply chain logic and AI-driven market arbitrage to grow your enterprise automatically while you sleep.", status: "FUTURE" },
    { year: "2029", title: "Global SME Mesh", desc: "Native voice-commerce across all major Nigerian dialects, connecting local merchants to global digital markets via autonomous agents.", status: "FUTURE" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-10 px-4">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">2026 - 2029 Horizon</div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">The Road Ahead</h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">BELCORE CAPITAL LTD is engineering the future of the African digital economy. We don't just solve problems; we predict them.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-gray-200 before:to-transparent">
        {items.map((item, idx) => (
          <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${item.status === 'FUTURE' ? 'opacity-50' : ''}`}>
            {/* Timeline Marker */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500 z-10 ${item.status === 'LIVE' ? 'bg-emerald-500 scale-110' : 'bg-gray-300'}`}>
              <div className={`w-2 h-2 rounded-full ${item.status === 'LIVE' ? 'bg-white animate-ping' : 'bg-gray-500'}`} />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/80 backdrop-blur-sm p-8 rounded-[40px] border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-2 group">
              <div className="flex items-center justify-between space-x-2 mb-4">
                <div className="font-black text-emerald-600 text-lg uppercase tracking-tighter">{item.year}</div>
                <span className={`px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase shadow-sm ${item.status === 'LIVE' ? 'bg-emerald-500 text-white' : (item.status === 'PLANNING' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500')}`}>
                  {item.status}
                </span>
              </div>
              <h4 className="font-black text-gray-900 text-xl mb-3 leading-tight tracking-tight">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              
              <div className="mt-6 h-1 w-0 bg-emerald-500 rounded-full group-hover:w-full transition-all duration-700" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-10 sm:p-16 rounded-[60px] text-center border border-gray-800 shadow-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <h4 className="text-xl font-black text-emerald-400 mb-6 uppercase tracking-[0.3em]">Strategic Commitment</h4>
        <p className="text-lg sm:text-2xl font-black text-white max-w-2xl mx-auto leading-relaxed italic tracking-tight">
          "The next era of African growth is autonomous. We are building the operating system that ensures no SME is left behind in the manual past."
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🌍</div>
           <div className="text-left">
              <p className="text-white font-black text-xs uppercase tracking-widest">Belcore Engineering Hub</p>
              <p className="text-gray-500 text-[10px] font-bold">Lagos • Port Harcourt • Abuja</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
