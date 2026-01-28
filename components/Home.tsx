
import React from 'react';
import { AUTOMATION_SOLUTIONS } from '../constants';

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="space-y-32 py-12">
      {/* 1. Hero Section: Centered & High Impact */}
      <div className="max-w-4xl mx-auto text-center space-y-10 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-block px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-black tracking-[0.2em] uppercase">
          Empowering Nigerian Business
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mx-auto">
          Stop Fighting Your <span className="text-emerald-600">Business.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium">
          Running an SME in Nigeria is hard enough. Your operations shouldn't make it harder. <span className="text-gray-900 font-bold">BELCORE CAPITAL LTD</span> turns manual chaos into structured digital growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-6 px-16 rounded-3xl shadow-2xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95 text-xl w-full sm:w-auto"
          >
            Start Digital Audit
          </button>
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-xs font-black overflow-hidden shadow-sm">
                 <img src={`https://i.pravatar.cc/150?u=${i+25}`} alt="user" />
               </div>
             ))}
             <div className="w-12 h-12 rounded-full border-4 border-white bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm">+400</div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">A practical solution for the Nigerian marketplace</p>
      </div>

      {/* 2. The Struggle: The Manual Friction Story */}
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black text-gray-900 leading-tight">The Struggle is Real</h3>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Most business owners in Nigeria are trapped in a cycle of "Manual Friction" that kills their time and profit.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StruggleCard 
            icon="📓" 
            title="The Notebook Trap" 
            desc="Physical records get lost, soaked by rain, or hidden in a pile. If you can't find it, you can't manage it."
          />
          <StruggleCard 
            icon="📉" 
            title="The Excel Nightmare" 
            desc="Manually typing data into Excel takes hours. One wrong finger, a single typo, and your whole balance sheet becomes a lie."
          />
          <StruggleCard 
            icon="💬" 
            title="WhatsApp Chaos" 
            desc="Searching through 200 chats just to find one customer's delivery address or bank receipt."
          />
          <StruggleCard 
            icon="💸" 
            title="Forgotten Debts" 
            desc="Thousands of Naira sitting with customers because you forgot to send that 'Gentle Reminder' while busy."
          />
        </div>
      </div>

      {/* 3. The Bridge: Transition to Solution */}
      <div className="bg-gray-900 rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -ml-48 -mt-48"></div>
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-black leading-tight">We build the bridge from <br/> <span className="text-red-400 line-through decoration-white/20">Chaos</span> to <span className="text-emerald-400">Control.</span></h3>
          <p className="text-gray-400 text-xl leading-relaxed">
            BELCORE CAPITAL LTD helps you stop being the "Secretary" of your business so you can finally be the <span className="text-white font-bold">Owner.</span> We automate the boring stuff so you can focus on making money.
          </p>
          <div className="pt-8 flex justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Fast</p>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Secure</p>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Simple</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Types of Automation - EXPANDED */}
      <div className="space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-5xl font-black text-gray-900 tracking-tighter">What We Automate</h3>
          <p className="text-gray-500 font-medium">From WhatsApp to Warehouse. Our standard modules are built for the Nigerian marketplace.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {AUTOMATION_SOLUTIONS.map((solution, idx) => (
             <AutomationBox 
                key={idx}
                title={solution.title} 
                desc={solution.desc} 
                icon={solution.icon} 
                tag={solution.tag}
             />
           ))}
        </div>
      </div>

      {/* 7. Final Call to Action */}
      <div className="text-center py-24 bg-gray-900 rounded-[60px] text-white shadow-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600/10 opacity-50"></div>
        <div className="relative z-10 space-y-10">
          <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Ready to reclaim your time?</h3>
          <button 
            onClick={onStart}
            className="bg-white text-gray-900 font-black py-7 px-20 rounded-3xl shadow-2xl hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 text-2xl"
          >
            Run Business Audit →
          </button>
          <div className="pt-4">
            <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs">Custom Implementations: Lagos | Abuja | Port Harcourt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StruggleCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center space-y-4">
    <div className="text-4xl mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">{icon}</div>
    <h4 className="text-lg font-black text-gray-900">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const AutomationBox = ({ title, desc, icon, tag }: { title: string, desc: string, icon: string, tag: string }) => (
  <div className="p-8 bg-white border border-gray-100 rounded-[40px] hover:border-emerald-200 transition-all group shadow-sm flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <span className="text-3xl bg-gray-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">{icon}</span>
      <div className="px-3 py-1 bg-emerald-50 rounded-full text-[8px] font-black text-emerald-600 uppercase tracking-widest">{tag}</div>
    </div>
    <h4 className="text-lg font-black text-gray-900 mb-3">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed font-medium flex-grow">{desc}</p>
  </div>
);

const WhyCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2">
    <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">{icon}</div>
    <h4 className="text-xl font-black text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Home;
