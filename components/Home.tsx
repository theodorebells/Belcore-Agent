
import React, { useState } from 'react';
import { AUTOMATION_SOLUTIONS, AutomationSolution, WORKFLOW_COMPARISON } from '../constants';

// Internal helper component for the Opportunity Cost cards
const StruggleCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 space-y-4 hover:shadow-xl transition-all group shadow-sm text-center">
    <div className="text-4xl bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-red-100 transition-all">{icon}</div>
    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter">{title}</h4>
    <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const Home: React.FC<{ onStart: () => void; onSeeMoreAgents?: () => void }> = ({ onStart, onSeeMoreAgents }) => {
  const [selectedSolution, setSelectedSolution] = useState<AutomationSolution | null>(null);

  const roadmapItems = [
    { year: "2026 (Launch)", title: "Core Automation", desc: "Digital intake, cloud database sync, and professional WhatsApp frameworks.", status: "LIVE" },
    { year: "2027", title: "API Integrations", desc: "Native bank-statement reconciliation and automated Paystack/Flutterwave invoicing.", status: "PLANNING" },
    { year: "2028", title: "Predictive Intelligence", desc: "Advanced forecasting to predict inventory depletion based on historical sales.", status: "FUTURE" }
  ];

  return (
    <div className="space-y-20 sm:space-y-32 py-6 sm:py-16 px-2 sm:px-0 overflow-x-hidden">
      {/* 1. Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-block px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[9px] sm:text-[11px] font-black tracking-[0.2em] uppercase shadow-sm mx-auto">
          Enterprise Solutions • RC: 9165301
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 leading-[1] tracking-tighter mx-auto max-w-4xl px-4">
          Transform Your SME Into a <span className="text-emerald-600">Powerhouse.</span>
        </h2>
        <p className="text-base sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium px-6">
          Eliminate friction and manual logging. BELCORE CAPITAL LTD deploys strategic frameworks designed for the Nigerian landscape.
        </p>
        <div className="flex flex-col gap-6 justify-center items-center px-6">
          <button 
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 sm:py-7 px-10 sm:px-20 rounded-2xl sm:rounded-[2rem] shadow-2xl transition-all active:scale-95 text-lg sm:text-2xl w-full sm:w-auto"
          >
            Initiate Business Audit
          </button>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white bg-gray-200 flex items-center justify-center text-xs font-black overflow-hidden shadow-lg">
                  <img src={`https://i.pravatar.cc/150?u=${i+145}`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white bg-emerald-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-lg">+400</div>
            </div>
            <div className="text-left">
               <p className="text-[9px] sm:text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">SMEs Optimized</p>
               <p className="text-[8px] sm:text-[9px] font-bold text-emerald-600">Lagos | Port Harcourt | Abuja</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Opportunity Cost Section */}
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-6">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em]">THE OPPORTUNITY COST</p>
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tighter">Operational Integrity Gaps.</h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Manual processes are the silent killers of African business growth. We identify and seal these leaks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StruggleCard 
            icon="📄" 
            title="Record Volatility" 
            desc="Paper logs are fragile and easily misplaced. If the physical record vanishes, the revenue vanishes with it." 
          />
          <StruggleCard 
            icon="🧮" 
            title="Accounting Errors" 
            desc="Manual tallies lead to arithmetic mistakes and inventory leakage. Discrepancies cost SMEs millions annually." 
          />
          <StruggleCard 
            icon="🥱" 
            title="Micro-Management" 
            desc="Business owners become 'human logs,' unable to scale because they are tied to constant manual oversight." 
          />
          <StruggleCard 
            icon="🤝" 
            title="Brand Erosion" 
            desc="Disorganized processes reduce customer trust. Professional automation ensures every client feels valued." 
          />
        </div>
      </div>

      {/* 3. Strategic Intent Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-900 rounded-[40px] sm:rounded-[70px] p-8 sm:p-20 text-white grid lg:grid-cols-2 gap-12 sm:gap-20 items-center shadow-3xl">
           <div className="space-y-8 sm:space-y-10">
              <div className="inline-block px-5 py-2 bg-emerald-500/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 text-emerald-400">OUR STRATEGIC INTENT</div>
              <h3 className="text-3xl sm:text-5xl font-black leading-tight tracking-tighter">Digitizing the <br/>African Economy.</h3>
              <p className="text-base sm:text-xl opacity-70 leading-relaxed font-medium">
                We founded BELCORE to bridge the gap between traditional grit and modern efficiency. We believe African founders deserve systems that match their ambition.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">⚡</span>
                  <p className="text-sm sm:text-base font-bold text-gray-300">Replacing analog chaos with cloud-synchronized stability.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🛡️</span>
                  <p className="text-sm sm:text-base font-bold text-gray-300">Hardening SMEs against internal leakage and financial errors.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📈</span>
                  <p className="text-sm sm:text-base font-bold text-gray-300">Empowering the next generation of conglomerates.</p>
                </div>
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[30px] sm:rounded-[40px] space-y-8 backdrop-blur-xl">
              <p className="text-lg sm:text-2xl font-medium italic opacity-90 leading-relaxed tracking-tight">
                "Automation isn't a luxury; it's the foundation of modern commerce. We build for the artisan, the merchant, and the industrialist."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl sm:text-2xl">B</div>
                 <div>
                    <p className="font-black text-lg sm:text-xl">BELCORE CAPITAL</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">RC: 9165301 • PH HQ</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. Comparison Section (Efficiency Benchmarks) */}
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-6">
        <div className="text-center space-y-4">
          <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">Efficiency Benchmarks</p>
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter">Manual vs. Automated</h3>
        </div>
        <div className="grid gap-6">
          {WORKFLOW_COMPARISON.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm grid md:grid-cols-3 items-center gap-6 sm:gap-8">
              <div>
                <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-1">{item.task}</h4>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-md uppercase tracking-widest">{item.benefit}</span>
              </div>
              <div className="bg-red-50/30 p-5 rounded-2xl border border-red-50">
                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">MANUAL (Paper/Excel)</p>
                <p className="text-sm font-bold text-red-900">{item.manual.process}</p>
                <p className="text-xs text-red-500 mt-1">Time: {item.manual.time}</p>
              </div>
              <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-50 relative overflow-hidden">
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">AUTOMATED (Belcore)</p>
                <p className="text-sm font-bold text-emerald-900">{item.automated.process}</p>
                <p className="text-xs text-emerald-600 mt-1">Time: {item.automated.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Solutions Grid (Technical Framework) */}
      <div className="space-y-16 sm:space-y-24 px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <p className="text-emerald-600 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">The Technical Framework</p>
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter">Operational Efficiency.</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
           {AUTOMATION_SOLUTIONS.map((solution, idx) => (
             <button 
                key={idx}
                onClick={() => setSelectedSolution(solution)}
                className="text-left p-8 sm:p-10 bg-white border rounded-[30px] sm:rounded-[40px] transition-all group shadow-sm flex flex-col h-full hover:border-emerald-500 hover:shadow-2xl active:scale-95"
             >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl bg-gray-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-all">{solution.icon}</span>
                  <div className="px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest">{solution.tag}</div>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2 leading-tight">{solution.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8 flex-grow">{solution.desc}</p>
                <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">Learn More ➔</div>
             </button>
           ))}

           {/* MEET THE FORCE CARD */}
           <button 
              onClick={onSeeMoreAgents}
              className="text-left p-8 sm:p-10 bg-emerald-600 border border-emerald-500 rounded-[30px] sm:rounded-[40px] transition-all group shadow-xl flex flex-col h-full hover:bg-emerald-700 active:scale-95 text-white"
           >
              <div className="flex justify-between items-start mb-6">
                <span className="text-3xl bg-white/10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">💼</span>
                <div className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-widest">ECOSYSTEM</div>
              </div>
              <h4 className="text-xl font-black mb-2 leading-tight uppercase tracking-tighter">AND MORE</h4>
              <p className="text-sm text-emerald-50 leading-relaxed font-medium mb-8 flex-grow">Explore our full suite of digital agents designed for complex SME logic.</p>
              <div className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">MEET THE FORCE ➔</div>
           </button>
        </div>
      </div>

      {/* 6. Operational Pillars (The Belcore Advantage) */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">OPERATIONAL PILLARS</p>
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter">The Belcore Advantage.</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 space-y-6 shadow-sm hover:shadow-xl transition-all">
            <span className="text-5xl">🇳🇬</span>
            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Localization</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Our frameworks are optimized for low-bandwidth environments and the unique WhatsApp-driven commerce of Nigeria.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 space-y-6 shadow-sm hover:shadow-xl transition-all">
            <span className="text-5xl">🏢</span>
            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Accountability</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Strategic presence in Port Harcourt and Lagos. We offer on-site consultation and training for all enterprise deployments.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 space-y-6 shadow-sm hover:shadow-xl transition-all">
            <span className="text-5xl">🤝</span>
            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Management</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              We provide continuous system optimization, staff training, and technical support to ensure your long-term success.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Closing CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center py-16 sm:py-24 bg-gray-900 rounded-[40px] sm:rounded-[60px] text-white shadow-3xl relative overflow-hidden">
          <div className="relative z-10 space-y-10 px-6">
            <h3 className="text-4xl sm:text-6xl font-black leading-tight tracking-tighter max-w-4xl mx-auto">
              Future-Proof Your <br className="hidden sm:block" /><span className="text-emerald-500">Business Today.</span>
            </h3>
            <button onClick={onStart} className="bg-white text-gray-900 font-black py-5 sm:py-7 px-10 sm:px-20 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl transition-all active:scale-95 text-xl sm:text-2xl w-full sm:w-auto">
              Launch Strategic Audit ➔
            </button>
          </div>
        </div>
      </div>

      {/* 8. Strategic Horizon / Roadmap */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 pb-20">
        <div className="text-center space-y-4">
          <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">Strategic Horizon</p>
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-none">The Roadmap to 2028</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-8 sm:p-10 rounded-[40px] border border-gray-100 space-y-6 group hover:bg-white hover:shadow-2xl transition-all">
              <div className="flex justify-between items-center">
                <span className="text-emerald-600 font-black text-lg">{item.year}</span>
                <span className={`px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase ${item.status === 'LIVE' ? 'bg-emerald-500 text-white' : (item.status === 'PLANNING' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500')}`}>{item.status}</span>
              </div>
              <h4 className="text-xl font-black text-gray-900 tracking-tighter">{item.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSolution(null)} />
           <div className="bg-white rounded-[30px] sm:rounded-[40px] p-6 sm:p-12 text-gray-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-3xl relative animate-in zoom-in-95 duration-300">
              <button onClick={() => setSelectedSolution(null)} className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition-all">✕</button>
              <div className="space-y-8">
                 <div className="space-y-2">
                    <p className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">Case Study: {selectedSolution.tag}</p>
                    <h4 className="text-3xl sm:text-4xl font-black tracking-tighter text-gray-900">{selectedSolution.title}</h4>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Practical Scenario</p>
                       <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-gray-700">"{selectedSolution.example}"</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Technical Engine</p>
                       <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-500">{selectedSolution.howItWorks}</p>
                    </div>
                 </div>
                 <div className="pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center border-t border-gray-100">
                    <button onClick={() => { setSelectedSolution(null); onStart(); }} className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl">Initiate Audit</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Home;
