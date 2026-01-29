
import React, { useState } from 'react';
import { AUTOMATION_SOLUTIONS, AutomationSolution } from '../constants';

const Home: React.FC<{ onStart: () => void; onSeeMoreAgents?: () => void }> = ({ onStart, onSeeMoreAgents }) => {
  const [selectedSolution, setSelectedSolution] = useState<AutomationSolution | null>(null);

  return (
    <div className="space-y-20 sm:space-y-32 py-6 sm:py-16 px-2 sm:px-0 overflow-visible">
      {/* 1. Hero Section - Balanced Typography */}
      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-block px-5 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[9px] sm:text-[11px] font-black tracking-[0.25em] uppercase shadow-sm">
          Enterprise Solutions for Emerging Markets • RC: 9165301
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] sm:leading-[1.05] tracking-tighter mx-auto max-w-4xl px-4">
          Transform Your SME Into a <span className="text-emerald-600">Digital Powerhouse.</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium px-6">
          Eliminate operational friction and manual record-keeping. <span className="text-gray-900 font-bold">BELCORE CAPITAL LTD</span> deploys strategic automation frameworks designed specifically for the Nigerian business landscape.
        </p>
        <div className="flex flex-col gap-8 justify-center items-center px-4">
          <button 
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 sm:py-6 px-10 sm:px-20 rounded-2xl sm:rounded-[2rem] shadow-2xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95 text-lg sm:text-xl w-full sm:w-auto"
          >
            Initiate Business Audit
          </button>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white bg-gray-200 flex items-center justify-center text-xs font-black overflow-hidden shadow-lg">
                  <img src={`https://i.pravatar.cc/150?u=${i+145}`} alt="user" />
                </div>
              ))}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white bg-emerald-500 text-white flex items-center justify-center text-[9px] sm:text-xs font-black shadow-lg">+400</div>
            </div>
            <div className="text-left">
               <p className="text-[9px] sm:text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">SMEs Optimized</p>
               <p className="text-[8px] sm:text-[10px] font-bold text-emerald-600">Lagos | Port Harcourt | Abuja</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Business Challenges - Focused on Operational Gaps */}
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-4 overflow-visible">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-black text-[11px] uppercase tracking-[0.3em]">The Opportunity Cost</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter">Operational Integrity Gaps.</h3>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-medium">Manual processes are the silent killers of African business growth. We identify and seal these leaks.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StruggleCard icon="📄" title="Record Volatility" desc="Paper logs are fragile and easily misplaced. If the physical record vanishes, the revenue vanishes with it." />
          <StruggleCard icon="🧮" title="Accounting Errors" desc="Manual tallies lead to arithmetic mistakes and inventory leakage. Discrepancies cost SMEs millions annually." />
          <StruggleCard icon="🥱" title="Micro-Management" desc="Business owners become 'human logs,' unable to scale because they are tied to constant manual oversight." />
          <StruggleCard icon="🤝" title="Brand Erosion" desc="Disorganized processes reduce customer trust. Professional automation ensures every client feels valued." />
        </div>
      </div>

      {/* 3. The Vision: Founders Context */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-900 rounded-[40px] sm:rounded-[70px] p-8 sm:p-20 text-white grid lg:grid-cols-2 gap-12 sm:gap-20 items-center shadow-3xl">
           <div className="space-y-8 sm:space-y-10">
              <div className="inline-block px-5 py-2 bg-emerald-500/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 text-emerald-400">Our Strategic Intent</div>
              <h3 className="text-3xl sm:text-5xl font-black leading-tight tracking-tighter">Digitizing the <br/>African Economy.</h3>
              <p className="text-base sm:text-xl opacity-70 leading-relaxed font-medium">
                We founded BELCORE to bridge the gap between traditional grit and modern efficiency. We believe African founders deserve systems that match their ambition.
              </p>
              <div className="space-y-5 pt-4">
                 <OriginPoint icon="⚡" text="Replacing analog chaos with cloud-synchronized stability." />
                 <OriginPoint icon="🛡️" text="Hardening SMEs against internal leakage and financial errors." />
                 <OriginPoint icon="📈" text="Empowering the next generation of conglomerates." />
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[40px] space-y-8 backdrop-blur-xl relative group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <p className="text-lg sm:text-2xl font-medium italic opacity-90 leading-relaxed tracking-tight">
                "Automation isn't a luxury; it's the foundation of modern commerce. We build for the artisan, the merchant, and the industrialist."
              </p>
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-2xl">B</div>
                 <div>
                    <p className="font-black text-lg sm:text-xl">BELCORE CAPITAL</p>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">RC: 9165301 • PH HQ</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. Strategic Automation: Balanced Font Sizes */}
      <div className="space-y-16 sm:space-y-24 px-4">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <p className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.3em]">The Technical Framework</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Operational Efficiency.</h3>
          <p className="text-gray-500 text-lg sm:text-xl font-medium">Select a core module to explore deployment specs and ROI metrics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 max-w-[95rem] mx-auto">
           {AUTOMATION_SOLUTIONS.map((solution, idx) => (
             <button 
                key={idx}
                onClick={() => setSelectedSolution(solution)}
                className={`text-left p-8 sm:p-10 bg-white border rounded-[40px] transition-all group shadow-sm flex flex-col h-full hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-3 ${selectedSolution?.title === solution.title ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-gray-100'}`}
             >
                <div className="flex justify-between items-start mb-6 w-full">
                  <span className="text-3xl bg-gray-50 w-16 h-16 rounded-[22px] flex items-center justify-center group-hover:bg-emerald-50 transition-all shadow-inner">{solution.icon}</span>
                  <div className="px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest">{solution.tag}</div>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-3 leading-tight">{solution.title}</h4>
                <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed font-medium mb-8 flex-grow">{solution.desc}</p>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">
                   Technical Specs <span className="text-base">→</span>
                </div>
             </button>
           ))}

           {/* Much More Card */}
           <button 
              onClick={onSeeMoreAgents}
              className="text-center p-8 sm:p-10 bg-gray-900 border border-gray-800 rounded-[40px] transition-all group shadow-2xl flex flex-col h-full hover:-translate-y-3 justify-center items-center space-y-8 relative overflow-hidden"
           >
              <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 transition-transform relative z-10">💼</div>
              <div className="relative z-10 space-y-3">
                <h4 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase leading-tight">...and more</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-bold px-4">Explore our full suite of digital agents.</p>
              </div>
              <div className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-emerald-500 transition-colors relative z-10">
                 Meet the Force
              </div>
           </button>
        </div>

        {/* Modal Detail Popup */}
        {selectedSolution && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedSolution(null)} />
             
             <div className="bg-white rounded-[40px] p-8 sm:p-16 md:p-20 text-gray-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-3xl relative overflow-hidden animate-in zoom-in-95 duration-500 border border-gray-100">
                <button 
                  onClick={() => setSelectedSolution(null)} 
                  className="absolute top-8 right-8 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all font-bold z-20 text-gray-500"
                >
                  ✕
                </button>
                
                <div className="relative z-10 space-y-10">
                   <div className="space-y-4">
                      <p className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs">Metrics: {selectedSolution.tag}</p>
                      <h4 className="text-3xl sm:text-5xl font-black tracking-tighter text-gray-900">{selectedSolution.title}</h4>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-10 sm:gap-16">
                      <div className="space-y-5">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Practical Scenario</p>
                         <p className="text-lg sm:text-2xl font-medium leading-relaxed italic text-gray-700">"{selectedSolution.example}"</p>
                      </div>
                      <div className="space-y-5">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Technical Logic</p>
                         <p className="text-lg sm:text-2xl font-medium leading-relaxed text-gray-500">{selectedSolution.howItWorks}</p>
                      </div>
                   </div>

                   <div className="pt-10 flex flex-col sm:flex-row gap-6 items-center border-t border-gray-100">
                      <button 
                        onClick={() => { setSelectedSolution(null); onStart(); }} 
                        className="w-full sm:w-auto px-12 py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-emerald-700 transition-all shadow-xl"
                      >
                        Initiate Strategic Audit
                      </button>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Setup Time: 72 Hours</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* 5. Trust Pillars - Perfectly Balanced */}
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 px-4">
        <div className="text-center space-y-4">
           <p className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.3em]">Operational Pillars</p>
           <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">The Belcore Advantage.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
           <WhyCard 
             icon="🇳🇬" 
             title="Localization" 
             desc="Our frameworks are optimized for low-bandwidth environments and the unique WhatsApp-driven commerce of Nigeria."
           />
           <WhyCard 
             icon="🏢" 
             title="Accountability" 
             desc="Strategic presence in Port Harcourt and Lagos. We offer on-site consultation and training for all enterprise deployments."
           />
           <WhyCard 
             icon="🤝" 
             title="Management" 
             desc="We provide continuous system optimization, staff training, and technical support to ensure your long-term success."
           />
        </div>
      </div>

      {/* 6. Professional Call to Action - Reduced sizing */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center py-20 sm:py-24 bg-gray-900 rounded-[40px] sm:rounded-[60px] text-white shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5"></div>
          <div className="relative z-10 space-y-10 px-8">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter max-w-4xl mx-auto">
              Future-Proof Your <br className="hidden sm:block" /><span className="text-emerald-500">Business Today.</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <button 
                 onClick={onStart}
                 className="bg-white text-gray-900 font-black py-5 sm:py-6 px-12 sm:px-16 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 text-lg sm:text-2xl w-full sm:w-auto"
               >
                 Launch Strategic Audit →
               </button>
            </div>
            <div className="pt-8 opacity-40">
              <p className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px] sm:text-[11px]">Lagos | Port Harcourt | Abuja | Bayelsa | Delta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OriginPoint = ({ icon, text }: { icon: string, text: string }) => (
  <div className="flex gap-5 items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl border border-white/5">{icon}</div>
    <p className="font-bold text-sm sm:text-lg opacity-80">{text}</p>
  </div>
);

const StruggleCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-8 sm:p-10 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all text-center space-y-4 sm:space-y-6 group">
    <div className="text-4xl mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-[22px] flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-lg sm:text-xl font-black text-gray-900">{title}</h4>
    <p className="text-[12px] sm:text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const WhyCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-10 sm:p-14 rounded-[45px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-4 text-center flex flex-col h-full border-b-4 border-b-emerald-500/10 hover:border-b-emerald-500 transition-colors items-center">
    <div className="text-5xl sm:text-6xl mb-8 bg-gray-50 w-20 h-20 sm:w-28 sm:h-28 rounded-[35px] flex items-center justify-center group-hover:bg-emerald-50 transition-colors mx-auto shadow-inner shrink-0">{icon}</div>
    <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 tracking-tight text-center w-full leading-tight">{title}</h4>
    <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium flex-grow text-center w-full">{desc}</p>
  </div>
);

export default Home;
