
import React, { useState, useEffect, useRef } from 'react';
import { AUTOMATION_SOLUTIONS, AutomationSolution, WORKFLOW_COMPARISON } from '../constants';
import WhatsAppBotDemo from './WhatsAppBotDemo';

const Reveal: React.FC<{ children: React.ReactNode; type?: 'left' | 'right' | 'up' | 'zoom' }> = ({ children, type = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal reveal-${type} ${isVisible ? 'active' : ''}`}>
      {children}
    </div>
  );
};

const StruggleCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-6 sm:p-10 rounded-[35px] sm:rounded-[45px] border border-gray-100 space-y-4 hover:shadow-2xl transition-all group shadow-sm text-center hover:border-emerald-100 relative overflow-hidden h-full">
    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors pointer-events-none" />
    <div className="text-3xl sm:text-4xl bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:bg-white group-hover:scale-110 transition-all duration-500 relative z-10 shadow-sm">{icon}</div>
    <h4 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tighter relative z-10 leading-none">{title}</h4>
    <p className="text-[12px] sm:text-sm text-gray-500 font-medium leading-relaxed relative z-10">{desc}</p>
  </div>
);

const Home: React.FC<{ onStart: () => void; onAgents: () => void }> = ({ onStart, onAgents }) => {
  const [selectedSolution, setSelectedSolution] = useState<AutomationSolution | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Does this work without constant internet?", a: "Yes. Our local nodes cache data during downtime and synchronize instantly once a connection is detected, ensuring no sale is ever lost." },
    { q: "Will my staff be able to use this?", a: "We design 'Zero-Training' interfaces. If your staff can use WhatsApp, they can use the Belcore ecosystem. We simplify input so errors are impossible." },
    { q: "How do you prevent staff from stealing cash?", a: "Our system performs real-time audit reconciliation. Every digital order generates a unique token that must match the daily cash-out report, or the owner receives an instant alert." },
    { q: "Can I manage Lagos and PH branches at once?", a: "Absolutely. Our 'Global Sync' dashboard aggregates multi-branch data into a single view on your phone, wherever you are in the world." }
  ];

  return (
    <div className="space-y-24 sm:space-y-48 py-0 overflow-x-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-glow" />

      {/* Strategy Popup Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] sm:rounded-[60px] max-w-2xl w-full shadow-3xl overflow-hidden relative border border-gray-100 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedSolution(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-all z-10 font-bold"
            >
              ✕
            </button>
            <div className="p-8 sm:p-12 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-5xl shadow-sm">{selectedSolution.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{selectedSolution.tag} Strategy</p>
                  <h3 className="text-3xl font-black text-gray-900 leading-none tracking-tighter">{selectedSolution.title}</h3>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">How it works</p>
                  <p className="text-gray-700 font-bold leading-relaxed">{selectedSolution.howItWorks}</p>
                </div>
                <div className="p-6 bg-emerald-600 rounded-3xl text-white shadow-xl">
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">Real World Example</p>
                  <p className="text-lg font-black leading-tight tracking-tight italic">"{selectedSolution.example}"</p>
                </div>
              </div>
              <button 
                onClick={onStart}
                className="w-full py-6 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl"
              >
                Initiate Implementation Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <div className="max-w-6xl mx-auto text-center space-y-4 sm:space-y-6 pt-12 sm:pt-24 animate-in fade-in slide-in-from-top-4 duration-1000 relative px-6">
        <div className="inline-block px-4 py-1.5 bg-emerald-50/80 glass border border-emerald-100 rounded-full text-emerald-700 text-[8px] sm:text-[10px] font-black tracking-[0.25em] uppercase shadow-sm mx-auto mb-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          Enterprise Solutions • RC: 9165301
        </div>
        <h2 className="text-4xl sm:text-7xl md:text-9xl font-black text-gray-900 leading-[0.85] tracking-tighter mx-auto max-w-5xl relative">
          Automate Your <br />
          <span className="shimmer-text">Business Legacy.</span>
        </h2>
        <p className="text-sm sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium px-4">
          Eliminate friction and manual logging. BELCORE CAPITAL deployments ensure your business scales without you.
        </p>
        <div className="flex flex-col gap-6 justify-center items-center pt-8">
          <button 
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 sm:py-7 px-12 sm:px-24 rounded-2xl sm:rounded-[2.5rem] shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 text-lg sm:text-2xl w-full sm:w-auto overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            Initiate Operational Audit
          </button>
          
          <div className="flex items-center gap-4 animate-float">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 sm:border-4 border-white bg-gray-100 overflow-hidden shadow-xl hover:scale-110 hover:z-20 transition-all">
                  <img src={`https://i.pravatar.cc/150?u=${i+145}`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 sm:border-4 border-white bg-emerald-500 text-white flex items-center justify-center text-[8px] sm:text-xs font-black shadow-xl">+400</div>
            </div>
            <div className="text-left">
               <p className="text-[8px] sm:text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">Active SME Nodes</p>
               <p className="text-[7px] sm:text-[9px] font-bold text-emerald-600">Lagos | Port Harcourt | Abuja</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Marquee */}
      <div className="w-full border-y border-gray-100 bg-gray-50/30 py-12 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <p className="text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">Scaling Infrastructure Across Sectors</p>
        </div>
        <div className="flex animate-marquee whitespace-nowrap gap-16 sm:gap-32 items-center">
          {['LOGISTICS HUB', 'RETAIL SYNDICATE', 'PH TECH CORRIDOR', 'FOOD SECURITY', 'FINANCIAL NODES', 'SME COALITION', 'LOGISTICS HUB', 'RETAIL SYNDICATE'].map((logo, i) => (
            <span key={i} className="text-3xl sm:text-5xl font-black text-gray-200 uppercase tracking-tighter opacity-40 hover:opacity-100 hover:text-emerald-500 transition-all cursor-default">{logo}</span>
          ))}
        </div>
      </div>

      {/* 2. Opportunity Cost */}
      <Reveal type="up">
        <div className="max-w-7xl mx-auto px-6 space-y-12 sm:space-y-20">
          <div className="text-center space-y-4">
            <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              OPERATIONAL LEAKS
            </p>
            <h3 className="text-3xl sm:text-6xl font-black text-gray-900 leading-tight tracking-tighter">Integrity Gaps.</h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-medium">
              Manual systems are the silent killers of African business growth. We seal the leaks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <StruggleCard icon="📄" title="Volatility" desc="Paper logs are fragile. If the physical record vanishes, the revenue vanishes with it." />
            <StruggleCard icon="🧮" title="Accounting" desc="Manual tallies lead to errors. Inventory leakage costs Nigerian SMEs millions annually." />
            <StruggleCard icon="🥱" title="Stagnation" desc="Owners become 'human logs,' unable to scale because they are tied to micro-oversight." />
            <StruggleCard icon="🛡️" title="Security" desc="Disorganized processes invite fraud. Automation ensures full accountability for every kobo." />
          </div>
        </div>
      </Reveal>

      {/* 3. Workflow Comparison */}
      <Reveal type="zoom">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-2">Efficiency Benchmark</p>
            <h3 className="text-3xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none">Manual <span className="text-red-500">vs.</span> <br /> <span className="text-emerald-600">Automated.</span></h3>
          </div>
          <div className="space-y-6">
            {WORKFLOW_COMPARISON.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[40px] sm:rounded-[60px] p-8 sm:p-14 border border-gray-100 shadow-xl grid md:grid-cols-3 items-center gap-10 hover:border-emerald-100 transition-all">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">{item.task}</h3>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{item.benefit}</span>
                </div>
                <div className="bg-red-50/40 p-6 sm:p-8 rounded-[35px] border border-red-100/50">
                  <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-3">MANUAL LOGGING</p>
                  <p className="text-sm sm:text-base font-bold text-red-900 leading-snug">{item.manual.process}</p>
                  <p className="text-[10px] text-red-500 mt-3 font-black">🕒 Time: {item.manual.time}</p>
                </div>
                <div className="bg-emerald-50/40 p-6 sm:p-8 rounded-[35px] border border-emerald-100/50">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">BELCORE ENGINE</p>
                  <p className="text-sm sm:text-base font-bold text-emerald-900 leading-snug">{item.automated.process}</p>
                  <p className="text-[10px] text-emerald-600 mt-3 font-black">⚡ Time: {item.automated.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 4. WhatsApp Demo Interactive */}
      <Reveal type="left">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 sm:gap-24 items-center">
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-6">
              <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">Interactive Framework</p>
              <h3 className="text-4xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-none">Your Digital <br /> <span className="text-emerald-600">Specialist.</span></h3>
              <p className="text-gray-500 text-lg sm:text-xl font-medium leading-relaxed">
                Chat with "Bella," our logic engine. This is how your business can interact with customers 24/7 without a single human typing.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 font-bold text-sm flex items-center gap-4">⚡ Price Logic</div>
              <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 font-bold text-sm flex items-center gap-4">💸 Debt Recovery</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-8 bg-emerald-500/10 rounded-[60px] blur-[100px] group-hover:bg-emerald-500/15 transition-all" />
            <WhatsAppBotDemo />
          </div>
        </div>
      </Reveal>

      {/* NATIVE INTELLIGENCE SECTION */}
      <Reveal type="up">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-32 text-center space-y-12 sm:space-y-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] -z-10 rounded-full" />
          <div className="space-y-6">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4">Linguistic Sovereignty</p>
            <h3 className="text-5xl sm:text-8xl md:text-9xl font-black text-gray-900 tracking-tighter leading-none uppercase">Native <br /> <span className="text-emerald-600">Intelligence.</span></h3>
            <p className="text-gray-500 max-w-4xl mx-auto text-lg sm:text-2xl font-black italic tracking-tight leading-relaxed">
              "Built for the diversity of the African market. Our automation logic is optimized for the way we speak — from the Alaba market to the Abuja city center. Whether your staff speaks Igbo, Hausa, Yoruba, or Pidgin, the Belcore engine understands the intent behind every transaction."
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10">
            {[
              { name: 'IGBO', motto: 'Business Legacy' },
              { name: 'HAUSA', motto: 'Trade Mastery' },
              { name: 'YORUBA', motto: 'Commerce Flow' },
              { name: 'PIDGIN', motto: 'Zero Barriers' }
            ].map((lang) => (
              <div key={lang.name} className="bg-gray-900 p-8 sm:p-16 rounded-[40px] sm:rounded-[60px] border border-gray-800 shadow-2xl group hover:bg-emerald-600 transition-all hover:-translate-y-4 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 opacity-30" />
                <h4 className="text-2xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-none mb-4 group-hover:scale-110 transition-transform">{lang.name}</h4>
                <p className="text-[8px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{lang.motto}</p>
                <div className="mt-6 w-8 h-1 bg-emerald-500 rounded-full group-hover:w-20 transition-all" />
              </div>
            ))}
          </div>
          <div className="pt-10 flex flex-col items-center gap-4">
            <p className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-[0.5em]">No English Barrier • No Training Required</p>
            <div className="h-0.5 w-24 bg-gray-100 rounded-full" />
          </div>
        </div>
      </Reveal>

      {/* STRATEGIC INTENT SECTION */}
      <Reveal type="up">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-900 text-white rounded-[60px] sm:rounded-[100px] p-12 sm:p-24 overflow-hidden relative group shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
            
            <div className="relative z-10 space-y-16">
              <div className="space-y-6 max-w-4xl">
                <p className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.6em]">OUR STRATEGIC INTENT</p>
                <h2 className="text-5xl sm:text-8xl font-black tracking-tighter leading-none uppercase">Digitizing the <br /> <span className="text-emerald-500">African Economy.</span></h2>
                <p className="text-gray-400 text-lg sm:text-2xl font-bold leading-relaxed max-w-3xl">
                  We founded BELCORE to bridge the gap between traditional grit and modern efficiency. We believe African founders deserve systems that match their ambition.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {[
                  { icon: '⚡', text: 'Replacing analog chaos with cloud-synchronized stability.' },
                  { icon: '🛡️', text: 'Hardening SMEs against internal leakage and financial errors.' },
                  { icon: '📈', text: 'Empowering the next generation of conglomerates.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="text-4xl sm:text-5xl shrink-0">{item.icon}</span>
                    <p className="text-sm sm:text-lg font-black leading-tight text-gray-200">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-16 border-t border-white/10 space-y-8">
                <p className="text-2xl sm:text-4xl font-black italic tracking-tight text-emerald-100 max-w-5xl leading-tight">
                  "Automation isn't a luxury; it's the foundation of modern commerce. We build for the artisan, the merchant, and the industrialist."
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                  <div>
                    <p className="text-lg font-black text-white uppercase tracking-tighter">BELCORE CAPITAL</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">RC: 9165301 • PH HQ</p>
                  </div>
                  <div className="h-0.5 w-32 bg-emerald-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 5. Solutions Assembly */}
      <Reveal type="up">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">Deployment Ecosystem</p>
            <h3 className="text-3xl sm:text-6xl font-black text-gray-900 tracking-tighter">Operational Supremacy.</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
             {AUTOMATION_SOLUTIONS.map((solution, idx) => (
               <button 
                  key={idx}
                  onClick={() => setSelectedSolution(solution)}
                  className="text-left p-8 sm:p-12 bg-white border border-gray-100 rounded-[45px] transition-all group shadow-sm flex flex-col h-full hover:border-emerald-500 hover:shadow-3xl hover:-translate-y-2 active:scale-95"
               >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-3xl sm:text-4xl bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center group-hover:bg-emerald-50 transition-all shadow-sm">{solution.icon}</span>
                    <div className="px-3 py-1 bg-emerald-50 rounded-lg text-[9px] font-black text-emerald-600 uppercase tracking-widest">{solution.tag}</div>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 tracking-tight">{solution.title}</h4>
                  <p className="text-[13px] sm:text-[15px] text-gray-500 leading-relaxed font-medium mb-10 flex-grow">{solution.desc}</p>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Explore Strategy ➔</div>
               </button>
             ))}
             
             {/* AND OTHER AGENTS BOX */}
             <button 
                onClick={onAgents}
                className="text-left p-8 sm:p-12 bg-emerald-600 border border-emerald-500 rounded-[45px] transition-all group shadow-2xl flex flex-col h-full hover:bg-emerald-700 hover:-translate-y-2 active:scale-95 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8 opacity-20 text-8xl grayscale">🤖</div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-3xl sm:text-4xl bg-white/10 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white shadow-sm">⚡</span>
                  <div className="px-3 py-1 bg-white/20 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">Digital Workforce</div>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">And Other Agents...</h4>
                <p className="text-[13px] sm:text-[15px] text-emerald-50 leading-relaxed font-medium mb-10 flex-grow">
                  Explore our autonomous squad: Risk Strategists, Growth Consultants, and Client Managers working in sync.
                </p>
                <div className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Meet the Squad ➔
                </div>
             </button>
          </div>
        </div>
      </Reveal>

      {/* 6. Testimonials */}
      <Reveal type="zoom">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">Social Proof</p>
            <h3 className="text-3xl sm:text-6xl font-black text-gray-900 tracking-tighter">Voice of Progress.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            {[
              { name: "Chisom O.", loc: "Lagos Retail", text: "Before Belcore, I lost 20% of stock to errors. Now every kobo is tracked from PH headquarters. Pure peace of mind." },
              { name: "Engr. Yusuf", loc: "Abuja Logistics", text: "The WhatsApp bot handles 500+ daily queries. We saved on hiring 3 staff members. The ROI is immediate." },
              { name: "Ifeanyi E.", loc: "PH Restaurant", text: "Debt recovery used to be my biggest headache. Belcore recovered 1.5M Naira in 2 weeks automatically. World-class." }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50/50 p-8 sm:p-10 rounded-[45px] border border-gray-100 space-y-6 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="flex gap-1 text-emerald-500 text-lg">★★★★★</div>
                <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed italic tracking-tight">"{t.text}"</p>
                <div>
                  <p className="font-black text-gray-900 uppercase tracking-widest text-xs">{t.name}</p>
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 7. FAQ Section */}
      <Reveal type="up">
        <div className="max-w-4xl mx-auto px-6 space-y-12 sm:space-y-16">
          <div className="text-center space-y-4">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">Common Queries</p>
            <h3 className="text-3xl sm:text-6xl font-black text-gray-900 tracking-tighter">Strategic Clarity.</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-sm hover:border-emerald-200 transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center group"
                >
                  <span className="text-base sm:text-lg font-black text-gray-900 tracking-tight uppercase">{faq.q}</span>
                  <span className={`text-2xl transition-transform duration-500 ${activeFaq === i ? 'rotate-45 text-emerald-500' : 'text-gray-300 group-hover:text-emerald-600'}`}>+</span>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeFaq === i ? 'max-h-[300px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="p-8 text-gray-500 font-medium leading-relaxed text-sm sm:text-base">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 8. Final High-Energy CTA */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-[60px] sm:rounded-[100px] p-12 sm:p-32 text-center relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 space-y-12">
            <h2 className="text-4xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">Ready for Operational <br className="hidden md:block" /> <span className="text-emerald-500">Supremacy?</span></h2>
            <button 
              onClick={onStart}
              className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-black py-6 sm:py-8 px-12 sm:px-24 rounded-2xl sm:rounded-[2.5rem] shadow-2xl transition-all hover:scale-105 active:scale-95 text-xl sm:text-3xl uppercase tracking-tighter"
            >
              Start Your Audit Now
            </button>
          </div>
        </div>
      </div>

      <footer className="py-20 border-t border-gray-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 leading-none">BELCORE <span className="text-emerald-600">SME</span></h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digital Engineering for African Growth</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-600">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600">RC: 9165301</a>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 BELCORE CAPITAL LTD</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
