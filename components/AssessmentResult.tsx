
import React from 'react';
import { SMESubmission } from '../types';

interface AssessmentResultProps {
  submission: SMESubmission;
  onNext: () => void;
  onBook: () => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ submission, onNext, onBook }) => {
  const { readiness } = submission;

  const calculateFriction = () => {
    let friction = 95; // Nigerian SMEs usually start very manual
    if (readiness.digitalTools && readiness.digitalTools.length > 2) friction -= 15;
    if (readiness.invoicingMethod && readiness.invoicingMethod.some(m => !m.includes('Handwritten'))) friction -= 20;
    if (readiness.storageMethod && readiness.storageMethod.some(m => m.includes('App') || m.includes('Excel'))) friction -= 15;
    return Math.max(friction, 10);
  };

  const frictionScore = calculateFriction();

  // 1. Identify Leaks
  const leaks = [];
  if (readiness.customerRecording.some(r => r.includes('Paper') || r.includes('Memory'))) {
    leaks.push({ 
      risk: "Data Loss Risk", 
      impact: "80% chance of losing historical customer data during rain or office moves.",
      agent: "Software Agent" 
    });
  }
  if (readiness.lostLeadsCount.includes('Critical') || readiness.lostLeadsCount.includes('Extreme')) {
    leaks.push({ 
      risk: "Revenue Leakage", 
      impact: "You are losing significant daily revenue due to slow WhatsApp responses.",
      agent: "Marketing Agent" 
    });
  }
  if (readiness.inventoryMethod.includes('Physical count') || readiness.inventoryMethod.includes('Ledger')) {
    leaks.push({ 
      risk: "Inventory Shrinkage", 
      impact: "Unmonitored stock allows for staff theft and math errors.",
      agent: "Audit Agent" 
    });
  }
  if (readiness.breakPoint.some(p => p.includes('Health') || p.includes('Time'))) {
    leaks.push({ 
      risk: "Owner Burnout", 
      impact: "Scaling further will lead to health crisis or total operational collapse.",
      agent: "Support Agent" 
    });
  }

  // 2. Map Recommended Agents
  const recommendedAgents = Array.from(new Set(leaks.map(l => l.agent)));

  return (
    <div className="max-w-6xl mx-auto space-y-20 py-10 pb-32 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-900 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Audit AI: Analysis Complete
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          {submission.businessName} <span className="text-emerald-600">Report.</span>
        </h2>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Our AI has identified <span className="text-gray-900 font-bold">{leaks.length} critical leaks</span> in your current manual system.
        </p>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Friction Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-900 text-white p-10 rounded-[50px] shadow-3xl space-y-8 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Manual Friction Score</p>
              <div className="text-8xl font-black text-emerald-400">{frictionScore}%</div>
              <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000 delay-500" style={{ width: `${frictionScore}%` }} />
              </div>
              <p className="mt-6 text-sm opacity-70 leading-relaxed font-medium">
                {frictionScore > 60 
                  ? "Your business is currently 100% dependent on your physical presence. This is not a system; it's a high-stress job." 
                  : "You have digital tools, but they are 'islands'. You need a BELCORE Bridge to unify your operations."}
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 text-[180px] opacity-10 grayscale">🏢</div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100">
             <h4 className="font-black text-emerald-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
               🎯 Primary Fix
             </h4>
             <p className="text-emerald-800 font-bold text-lg leading-tight mb-4">
               Automating "{readiness.autoWish || 'Daily Reporting'}"
             </p>
             <p className="text-sm text-emerald-600 font-medium">
               Reclaiming ~18 hours of your life monthly.
             </p>
          </div>
        </div>

        {/* Recommendations & Workflow */}
        <div className="lg:col-span-8 space-y-12">
          {/* Leaks */}
          <section className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3 px-2">
               <span className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-600">⚠️</span>
               Critical Bottlenecks Found
            </h3>
            <div className="grid gap-4">
               {leaks.map((leak, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-all">
                    <div className="shrink-0 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">🚨</div>
                    <div>
                      <h4 className="font-black text-gray-900">{leak.risk}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{leak.impact}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Recommended Agents */}
          <section className="space-y-6">
             <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3 px-2">
               <span className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">🤖</span>
               Your Recommended Workforce
            </h3>
            <div className="flex flex-wrap gap-4">
               {recommendedAgents.map((agent, i) => (
                 <div key={i} className="bg-purple-900 text-white px-6 py-4 rounded-3xl flex items-center gap-3 shadow-xl">
                   <span className="text-xl">✨</span>
                   <span className="font-black text-xs uppercase tracking-widest">{agent}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* Step-by-Step New Workflow */}
          <section className="bg-gray-50 p-10 rounded-[50px] space-y-8 border border-gray-100">
            <div className="space-y-2">
               <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Your New Digital Flow</h3>
               <p className="text-gray-500 font-medium">Here is exactly how {submission.businessName} will operate after setup:</p>
            </div>

            <div className="grid gap-4 relative">
               <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-emerald-200"></div>
               <WorkflowStep 
                 step="01" 
                 title="Digital Intake" 
                 desc={`Instead of ${readiness.customerRecording[0]}, customers use a Belcore Form linked to your WhatsApp.`} 
               />
               <WorkflowStep 
                 step="02" 
                 title="AI Logic Check" 
                 desc={`Our logic agents check for inventory availability and calculate prices instantly.`} 
               />
               <WorkflowStep 
                 step="03" 
                 title="Auto-Invoicing" 
                 desc={`The customer receives a professional PDF receipt on WhatsApp while you are sleeping.`} 
               />
               <WorkflowStep 
                 step="04" 
                 title="Owner Oversight" 
                 desc={`You view your daily profit on a clear dashboard. No more manual balancing.`} 
               />
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
             <button 
               onClick={onBook}
               className="flex-grow py-6 bg-emerald-600 text-white rounded-3xl font-black text-lg hover:bg-emerald-700 transition-all hover:scale-105 shadow-2xl shadow-emerald-200 active:scale-95"
             >
               Confirm Implementation Request →
             </button>
             <button 
               onClick={onNext}
               className="px-12 py-6 bg-gray-900 text-white rounded-3xl font-black text-lg hover:bg-black transition-all"
             >
               Meet the Agents
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ step, title, desc }: any) => (
  <div className="flex gap-6 items-start relative z-10 group">
    <div className="w-12 h-12 bg-white rounded-2xl border-2 border-emerald-500 flex items-center justify-center font-black text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
      {step}
    </div>
    <div className="pt-1">
      <h4 className="font-black text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default AssessmentResult;
