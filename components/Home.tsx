
import React, { useState } from 'react';
import { AUTOMATION_SOLUTIONS, AutomationSolution } from '../constants';

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [selectedSolution, setSelectedSolution] = useState<AutomationSolution | null>(null);

  return (
    <div className="space-y-20 sm:space-y-32 py-6 sm:py-12 px-4 sm:px-0">
      {/* 1. Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-block px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[8px] sm:text-[10px] font-black tracking-[0.2em] uppercase">
          Proudly Nigerian • RC: 9165301
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] sm:leading-[0.9] tracking-tighter mx-auto">
          Scale Your Business Without the <span className="text-emerald-600">Stress.</span>
        </h2>
        <p className="text-base sm:text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium">
          Running a business in Nigeria is a lot of work. Your records shouldn't be part of the wahala. <span className="text-gray-900 font-bold">BELCORE</span> makes your daily work easy and digital.
        </p>
        <div className="flex flex-col gap-6 justify-center items-center">
          <button 
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 sm:py-6 px-10 sm:px-16 rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95 text-lg sm:text-xl w-full sm:w-auto"
          >
            Check My Business Health
          </button>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white bg-gray-200 flex items-center justify-center text-xs font-black overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/150?u=${i+25}`} alt="user" />
                </div>
              ))}
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white bg-emerald-500 text-white flex items-center justify-center text-[8px] sm:text-[10px] font-black shadow-sm">+400</div>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">SMEs Automated</p>
          </div>
        </div>
      </div>

      {/* 2. The Struggle: The Chef Dele Story */}
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter">The Struggle is Real</h3>
          <p className="text-gray-500 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">Paper and pens are slowing you down and costing you money.</p>
        </div>

        <div className="bg-red-50/50 border border-red-100 rounded-[30px] sm:rounded-[50px] p-6 sm:p-14 grid md:grid-cols-12 gap-8 sm:gap-12 items-center shadow-inner">
           <div className="md:col-span-5 space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-center text-3xl sm:text-4xl mx-auto md:mx-0">🍲</div>
              <h4 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">The Story of <br/><span className="text-red-600">Chef Dele</span></h4>
              <p className="text-[8px] sm:text-sm font-black text-red-400 uppercase tracking-widest">A True Buka Experience</p>
           </div>
           <div className="md:col-span-7 space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium italic">
                "Dele runs a popular restaurant in Lagos. Last Monday at 1 PM, his shop was full. Waiters were screaming orders. They wrote everything on small greasy pieces of paper. Dele cooked a ₦12,000 catfish pepper soup, but the waiter lost the paper ticket. The customer finished eating and left because nobody asked for the money. Dele lost the cost of the fish, the gas, and his profit—all because of one tiny piece of paper."
              </p>
              <div className="pt-4 border-t border-red-100">
                <p className="text-xs sm:text-sm font-bold text-gray-900">This happens to thousands of Nigerian food sellers every day. Greasy paper is not a safe way to keep your money.</p>
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <StruggleCard icon="📄" title="Lost Papers" desc="Tickets get lost or thrown in the bin. If the paper is gone, your money is gone." />
          <StruggleCard icon="🧮" title="Math Wahala" desc="Adding up 50 orders by hand leads to mistakes. Staff might even short-change you." />
          <StruggleCard icon="😴" title="Owner Burnout" desc="You can't even rest because if you're not there to watch the cash, things disappear." />
          <StruggleCard icon="🤝" title="Trust Issues" desc="Asking customers 'what did you eat again?' makes your business look disorganized." />
        </div>
      </div>

      {/* 3. Why BELCORE Started - The Origin Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-emerald-600 rounded-[30px] sm:rounded-[60px] p-8 sm:p-20 text-white grid lg:grid-cols-2 gap-10 sm:gap-16 items-center shadow-3xl">
           <div className="space-y-6 sm:space-y-8">
              <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-white/20">Our Purpose</div>
              <h3 className="text-3xl sm:text-5xl font-black leading-tight sm:leading-[0.9] tracking-tighter">Why We Started.</h3>
              <p className="text-base sm:text-xl opacity-80 leading-relaxed font-medium">
                We saw too many hard-working Nigerians working like elephants but eating like ants. You spend 12 hours a day at work, but at the end of the month, you don't know where the money went.
              </p>
              <div className="space-y-3 sm:space-y-4 pt-4 text-xs sm:text-base">
                 <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">💡</div>
                    <p className="font-bold">Replace messy notebooks with simple digital systems.</p>
                 </div>
                 <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">🛡️</div>
                    <p className="font-bold">Protect your profit from staff theft and math errors.</p>
                 </div>
                 <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">🌍</div>
                    <p className="font-bold">Help local SMEs grow into big national brands.</p>
                 </div>
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[30px] sm:rounded-[50px] space-y-6 sm:space-y-8 backdrop-blur-sm">
              <p className="text-lg sm:text-2xl font-medium italic opacity-90 leading-relaxed">
                "Our technology is not for experts. It is for the person selling bread, the person running a boutique, and the person cooking soup. We built BELCORE so you can focus on your skill while we handle the boring digital stuff."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-gray-900 font-black text-xl sm:text-2xl">B</div>
                 <div>
                    <p className="font-black text-sm sm:text-lg">BELCORE CAPITAL LTD</p>
                    <p className="text-[7px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">Founded in Nigeria, for Nigerians</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. What We Automate - INTERACTIVE */}
      <div className="space-y-12 sm:space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter">How We Fix It</h3>
          <p className="text-gray-500 text-sm sm:text-base font-medium">We give you "Digital Assistants" that work 24/7. Click a box below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto">
           {AUTOMATION_SOLUTIONS.map((solution, idx) => (
             <button 
                key={idx}
                onClick={() => setSelectedSolution(solution)}
                className={`text-left p-6 sm:p-8 bg-white border rounded-[30px] sm:rounded-[40px] transition-all group shadow-sm flex flex-col h-full hover:border-emerald-500 hover:shadow-xl hover:-translate-y-2 ${selectedSolution?.title === solution.title ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-gray-100'}`}
             >
                <div className="flex justify-between items-start mb-6 w-full">
                  <span className="text-2xl sm:text-3xl bg-gray-50 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">{solution.icon}</span>
                  <div className="px-3 py-1 bg-emerald-50 rounded-full text-[8px] font-black text-emerald-600 uppercase tracking-widest">{solution.tag}</div>
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-2">{solution.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium mb-6">{solution.desc}</p>
                <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   Learn More <span>→</span>
                </div>
             </button>
           ))}
        </div>

        {/* Selected Detail View */}
        {selectedSolution && (
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-[30px] sm:rounded-[50px] p-6 sm:p-16 text-white animate-in zoom-in-95 duration-500 shadow-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none hidden sm:block">
                <span className="text-[200px] font-black">{selectedSolution.icon}</span>
             </div>
             <button onClick={() => setSelectedSolution(null)} className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all font-bold">✕</button>
             
             <div className="relative z-10 space-y-8 sm:space-y-10">
                <div className="space-y-3 sm:space-y-4">
                   <p className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">Deep Dive: {selectedSolution.title}</p>
                   <h4 className="text-3xl sm:text-5xl font-black tracking-tighter">{selectedSolution.title}</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                   <div className="space-y-3 sm:space-y-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In Simple Terms</p>
                      <p className="text-base sm:text-lg font-medium leading-relaxed italic text-emerald-50">"{selectedSolution.example}"</p>
                   </div>
                   <div className="space-y-3 sm:space-y-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">The Belcore Method</p>
                      <p className="text-base sm:text-lg font-medium leading-relaxed opacity-70">{selectedSolution.howItWorks}</p>
                   </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 items-center border-t border-white/10">
                   <button onClick={onStart} className="w-full sm:w-auto px-10 py-5 bg-emerald-600 rounded-2xl font-black hover:bg-emerald-700 transition-all">Apply to my Business</button>
                   <p className="text-[8px] sm:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Deployment time: ~72 Hours</p>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* 5. Why Choose Belcore Section */}
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
           <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter">Why Choose Belcore?</h3>
           <p className="text-gray-500 text-sm sm:text-lg font-medium italic">We don't just sell apps. we build your business future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
           <WhyCard 
             icon="🇳🇬" 
             title="Built for Nigeria" 
             desc="Lagos rush or PH network? Our tools work on low data and focus on WhatsApp, where you and your customers already live."
           />
           <WhyCard 
             icon="🏢" 
             title="Physical Presence" 
             desc="Real offices in Port Harcourt and Lagos. If you have any issues, call us or visit us. We are real people, not ghosts."
           />
           <WhyCard 
             icon="🤝" 
             title="Total Support" 
             desc="We don't just build and leave. Our team will train your staff and stay with you until everything is running perfectly."
           />
        </div>
      </div>

      {/* 6. Final Call to Action */}
      <div className="text-center py-16 sm:py-24 bg-gray-900 rounded-[40px] sm:rounded-[60px] text-white shadow-3xl relative overflow-hidden mx-auto max-w-6xl">
        <div className="absolute inset-0 bg-emerald-600/10 opacity-50"></div>
        <div className="relative z-10 space-y-8 sm:space-y-10 px-6">
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter max-w-2xl mx-auto">Ready to fix your business?</h3>
          <button 
            onClick={onStart}
            className="bg-white text-gray-900 font-black py-5 sm:py-7 px-12 sm:px-20 rounded-2xl sm:rounded-[2rem] shadow-2xl hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 text-xl w-full sm:w-auto"
          >
            Start Free Audit →
          </button>
          <div className="pt-4">
            <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[8px] sm:text-[10px]">Lagos | Abuja | Port Harcourt | Bayelsa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StruggleCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center space-y-3 sm:space-y-4">
    <div className="text-3xl sm:text-4xl mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-2xl flex items-center justify-center">{icon}</div>
    <h4 className="text-base sm:text-lg font-black text-gray-900">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const WhyCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-8 sm:p-10 rounded-[30px] sm:rounded-[50px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2 text-center flex flex-col h-full">
    <div className="text-4xl sm:text-5xl mb-6 sm:mb-8 bg-gray-50 w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] sm:rounded-[32px] flex items-center justify-center group-hover:bg-emerald-50 transition-colors mx-auto">{icon}</div>
    <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">{title}</h4>
    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium flex-grow">{desc}</p>
  </div>
);

export default Home;
