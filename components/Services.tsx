
import React from 'react';
import { SMESubmission } from '../types';

interface ServicesProps {
  onContact: () => void;
  onWorkflow: () => void;
  submission?: SMESubmission | null;
}

const Services: React.FC<ServicesProps> = ({ onContact, onWorkflow, submission }) => {
  // Check if AI analysis suggests a very complex requirement
  const isComplex = submission?.aiStrategy && (submission.aiStrategy.split(',').length > 3 || submission.aiStrategy.toLowerCase().includes('multiple'));

  const coreServices = [
    {
      id: 'core',
      title: "Core Automation Setup (₦75k)",
      desc: "Perfect for single-workflow fixes like automated client onboarding or debt recovery.",
      price: "₦75,000",
      period: "per module",
      tags: ["Quick Fix", "Starter"]
    },
    {
      id: 'suite',
      title: "Full Digital Workforce Suite",
      desc: "Our complete ecosystem: WhatsApp bots, inventory agents, and risk guardrails synced together.",
      price: "₦350,000",
      period: "complete setup",
      tags: ["High Impact", "Recommended"]
    },
    {
      id: 'custom',
      title: "Custom Enterprise Deployment",
      desc: "Tailor-made ERP and management systems for regional firms with multi-module requirements.",
      price: isComplex ? "Custom Pricing" : "Contact Desk",
      period: isComplex ? "based on module count" : "consultation required",
      tags: ["Scale", "Advanced"]
    }
  ];

  const isPlanRecommended = (id: string) => {
    if (!submission?.recommendedPackage) return id === 'suite';
    const rec = submission.recommendedPackage.toLowerCase();
    if (id === 'suite' && rec.includes('full')) return true;
    if (id === 'core' && rec.includes('core')) return true;
    if (id === 'custom' && isComplex) return true;
    return false;
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-6 px-4">
        <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">Pricing & Deployment</div>
        <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none">Your <span className="text-emerald-600">Investment.</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg sm:text-xl font-medium">
          "Automation is not an expense; it is the foundation of modern scalability."
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {coreServices.map((s, idx) => {
          const isRec = isPlanRecommended(s.id);
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-[40px] border p-8 sm:p-10 shadow-sm transition-all flex flex-col group relative overflow-hidden ${isRec ? 'border-emerald-500 shadow-2xl ring-4 ring-emerald-50 scale-105 z-10' : 'border-gray-100 hover:shadow-xl hover:border-emerald-100'}`}
            >
              {isRec && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black px-5 py-2 rounded-bl-3xl uppercase tracking-widest shadow-lg">
                  AI Recommended
                </div>
              )}
              <div className="flex gap-2 mb-8">
                {s.tags.map(t => (
                  <span key={t} className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg ${isRec ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>{t}</span>
                ))}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{s.title}</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-10 flex-grow leading-relaxed font-medium">{s.desc}</p>
              <div className="border-t pt-8 space-y-2">
                <p className={`font-black text-gray-900 ${s.price === 'Custom Pricing' ? 'text-3xl' : 'text-3xl sm:text-5xl'}`}>{s.price}</p>
                <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{s.period}</p>
              </div>
              <button 
                onClick={onContact}
                className={`mt-10 w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isRec ? 'bg-emerald-600 text-white shadow-xl hover:bg-emerald-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-900'}`}
              >
                {s.id === 'custom' ? 'Request Consultation' : 'Choose This Plan'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-emerald-600 rounded-[50px] sm:rounded-[80px] p-10 sm:p-20 text-white relative overflow-hidden shadow-3xl mx-4 max-w-7xl lg:mx-auto">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none text-9xl">💰</div>
        <div className="relative z-10 grid md:grid-cols-2 items-center gap-12 sm:gap-24">
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-5xl font-black leading-tight tracking-tighter">Support & Lifecycle</h3>
            <p className="text-emerald-50 text-lg sm:text-xl opacity-90 leading-relaxed font-medium">
              Every Belcore setup comes with 24/7 technical monitoring. We maintain your digital infrastructure so your business never goes offline.
            </p>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="text-5xl sm:text-7xl font-black mb-2">₦30,000</p>
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] opacity-70">Monthly Maintenance & Server Fees</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center px-4 pb-12">
        <button onClick={onWorkflow} className="px-12 py-6 bg-gray-900 text-white rounded-[1.5rem] sm:rounded-3xl font-black text-lg hover:bg-black transition-all shadow-xl">Review Simulation ROI</button>
        <button onClick={onContact} className="px-12 py-6 bg-white border-4 border-emerald-600 text-emerald-600 rounded-[1.5rem] sm:rounded-3xl font-black text-lg hover:bg-emerald-50 transition-all">Proceed to Booking →</button>
      </div>
    </div>
  );
};

export default Services;
