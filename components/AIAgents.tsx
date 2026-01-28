
import React, { useState } from 'react';

const AIAgents: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [showLogic, setShowLogic] = useState(false);

  const agents = [
    {
      title: "Software Agent",
      role: "Workflow Automation",
      icon: "💻",
      desc: "Our core ICT engine. Replicates your best office staff. Records sales, updates stock, and generates receipts instantly across all devices.",
      features: ["Custom Code Logic", "Secure Cloud Sync", "Multi-user Access"]
    },
    {
      title: "Marketing Agent",
      role: "Lead Conversion",
      icon: "📢",
      desc: "Captures 'Price?' comments on Instagram and turning them into real sales leads on your dashboard before the customer loses interest.",
      features: ["Auto-Lead Capture", "WhatsApp API Integration", "Campaign Tracking"]
    },
    {
      title: "Audit Agent",
      role: "Security & Fraud",
      icon: "🛡️",
      desc: "The digital watchdog for your SME. Flags suspicious discounts, stock theft, and cash mismatches in real-time, sending alerts to your phone.",
      features: ["Theft Detection", "Daily Profit Audit", "Anomaly Alerts"]
    },
    {
      title: "Support Agent",
      role: "Relationship CRM",
      icon: "🤝",
      desc: "Handles the follow-up work you are too busy to do. Sends 'Thank You' notes, payment reminders, and birthday wishes automatically.",
      features: ["Customer History", "Auto-Reminders", "Professional CRM"]
    }
  ];

  return (
    <div className="space-y-24 py-10 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-32">
      <div className="text-center space-y-6 px-4">
        <div className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full uppercase tracking-widest">Digital Workforce Simulation</div>
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">Meet Your Agents.</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed italic">
          "BELCORE Agents don't sleep, don't ask for leave, and never make math mistakes."
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {agents.map((agent, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-3 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
               <span className="text-8xl grayscale">{agent.icon}</span>
            </div>
            <div className="text-5xl mb-8 bg-gray-50 w-24 h-24 rounded-[32px] flex items-center justify-center group-hover:bg-purple-50 transition-colors relative z-10">{agent.icon}</div>
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-2 relative z-10">{agent.role}</p>
            <h3 className="text-2xl font-black text-gray-900 mb-4 relative z-10">{agent.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-grow font-medium relative z-10">{agent.desc}</p>
            <div className="space-y-3 pt-8 border-t border-gray-100 relative z-10">
               {agent.features.map(f => (
                 <div key={f} className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> {f}
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logic Showcase */}
      <div className="bg-gray-900 rounded-[80px] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl mx-4">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-emerald-500/10"></div>
         <div className="relative z-10 space-y-12 max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">The Deployment Strategy</h3>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">
               Deploying a digital workforce is a 4-stage technical process handled entirely by our ICT engineers.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
               <DeploymentCard step="01" title="Process Map" desc="We audit your manual office tasks." />
               <DeploymentCard step="02" title="Logic Build" desc="We write the software rules." />
               <DeploymentCard step="03" title="API Sync" desc="We connect your WhatsApp/DB." />
               <DeploymentCard step="04" title="Live Scale" desc="Your business runs on autopilot." />
            </div>

            <div className="pt-12 flex flex-col items-center gap-8">
               <button 
                onClick={onNext}
                className="group px-16 py-7 bg-white text-gray-900 font-black rounded-3xl hover:bg-emerald-50 transition-all shadow-2xl hover:scale-105 active:scale-95 text-xl flex items-center gap-4"
               >
                 Review Error-Proofing Guardrails <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
               </button>
               <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Proprietary ICT Framework by BELCORE CAPITAL LTD</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const DeploymentCard = ({ step, title, desc }: any) => (
  <div className="space-y-4 text-left p-6 bg-white/5 rounded-[40px] border border-white/10 hover:border-emerald-500/50 transition-colors group">
     <span className="text-4xl font-black text-emerald-500 block group-hover:scale-110 transition-transform origin-left">{step}</span>
     <h4 className="text-white font-black uppercase tracking-widest text-xs">{title}</h4>
     <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default AIAgents;
