
import React from 'react';
import { SMESubmission } from '../types';

interface AIAgentsProps {
  onNext: () => void;
  submission?: SMESubmission | null;
}

const AIAgents: React.FC<AIAgentsProps> = ({ onNext, submission }) => {
  const agents = [
    {
      id: 'software',
      title: "Software Specialist",
      role: "Workflow Automation",
      icon: "💻",
      desc: "Our core ICT engine. Replicates your best office staff. Records sales, updates stock, and generates receipts instantly across all devices.",
      features: ["Custom Code Logic", "Secure Cloud Sync", "Multi-user Access"],
      keywords: ["inventory", "recording", "stock", "ledger", "paper", "receipt", "invoice", "math"]
    },
    {
      id: 'growth',
      title: "Growth Consultant",
      role: "Lead Conversion",
      icon: "👔",
      desc: "Captures 'Price?' comments on Instagram and turning them into real sales leads on your dashboard before the customer loses interest.",
      features: ["Auto-Lead Capture", "WhatsApp API Integration", "Campaign Tracking"],
      keywords: ["whatsapp", "leads", "sales", "instagram", "facebook", "customer", "marketing", "follow-up"]
    },
    {
      id: 'risk',
      title: "Risk Strategist",
      role: "Security & Fraud",
      icon: "🛡️",
      desc: "The digital watchdog for your SME. Flags suspicious discounts, stock theft, and cash mismatches in real-time, sending alerts to your phone.",
      features: ["Theft Detection", "Daily Profit Audit", "Anomaly Alerts"],
      keywords: ["theft", "leaks", "security", "errors", "staff", "loss", "fraud", "auditing"]
    },
    {
      id: 'client',
      title: "Client Manager",
      role: "Relationship CRM",
      icon: "🤝",
      desc: "Handles the follow-up work you are too busy to do. Sends 'Thank You' notes, payment reminders, and birthday wishes automatically.",
      features: ["Customer History", "Auto-Reminders", "Professional CRM"],
      keywords: ["debt", "reminders", "payment", "follow-up", "client", "customer", "messages"]
    },
    {
      id: 'fiscal',
      title: "Fiscal Strategist",
      role: "Tax Calculation & Regulatory Compliance",
      icon: "📊",
      desc: "Real-time tax engine that calculates VAT (7.5%), PAYE (employee income tax), and WHT (5% professional, 10% contracts, 5% rent) on every transaction. Alerts you 7 days before you hit the ₦25M VAT registration threshold. Auto-generates monthly FIRS reports in Excel format.",
      features: ["VAT Threshold Tracker", "PAYE Calculation Engine", "FIRS Report Export"],
      keywords: ["tax", "vat", "compliance", "firs", "audit", "accounting", "revenue", "wht", "withholding", "penalty", "registration", "threshold", "fiscal", "returns", "paye", "payroll", "salary", "employee tax", "income tax", "remittance", "cra", "staff"]
    }
  ];

  const getRelevance = (agent: typeof agents[0]) => {
    if (!submission) return false;
    const textToSearch = (
      (submission.readiness.biggestFrustration || '') + 
      (submission.readiness.autoWish || '') + 
      (submission.readiness.errorSource?.join(' ') || '') +
      (submission.aiStrategy || '')
    ).toLowerCase();
    
    return agent.keywords.some(kw => textToSearch.includes(kw));
  };

  return (
    <div className="space-y-20 sm:space-y-24 py-10 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-32">
      <div className="text-center space-y-6 px-4">
        <div className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">Digital Workforce Assembly</div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          {submission ? "Your Expert " : "SME Expert "}
          <span className="text-emerald-600">Squad.</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg sm:text-xl font-medium leading-relaxed italic">
          {submission 
            ? `"Based on your audit, BELCORE has identified the specific digital agents needed for your ${submission.industry.split(' (')[0]} business."`
            : `"Perform an Operational Audit to see which autonomous agents are best suited for your business model."`
          }
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
        {agents.map((agent, idx) => {
          const isRecommended = getRelevance(agent);
          return (
            <div 
              key={idx} 
              className={`bg-white p-8 sm:p-10 rounded-[40px] sm:rounded-[50px] border transition-all group hover:-translate-y-3 flex flex-col relative overflow-hidden ${isRecommended ? 'border-emerald-500 shadow-2xl ring-4 ring-emerald-50' : 'border-gray-100 shadow-sm opacity-60 hover:opacity-100'}`}
            >
              {isRecommended && (
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-20 shadow-lg animate-bounce">
                  AI Recommended
                </div>
              )}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                 <span className="text-8xl grayscale">{agent.icon}</span>
              </div>
              <div className={`text-4xl sm:text-5xl mb-6 sm:mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-[30px] sm:rounded-[32px] flex items-center justify-center transition-colors relative z-10 ${isRecommended ? 'bg-emerald-50' : 'bg-gray-50 group-hover:bg-purple-50'}`}>{agent.icon}</div>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 relative z-10 ${isRecommended ? 'text-emerald-600' : 'text-purple-600'}`}>{agent.role}</p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 relative z-10 leading-tight">{agent.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-8 flex-grow font-medium relative z-10">{agent.desc}</p>
              <div className="space-y-3 pt-6 sm:pt-8 border-t border-gray-100 relative z-10">
                 {agent.features.map(f => (
                   <div key={f} className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${isRecommended ? 'bg-emerald-500' : 'bg-purple-500'}`}></span> {f}
                   </div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900 rounded-[50px] sm:rounded-[80px] p-10 sm:p-24 text-white relative overflow-hidden shadow-3xl mx-4">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-emerald-500/10"></div>
         <div className="relative z-10 space-y-10 sm:space-y-12 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none">Assemble Your Implementation.</h3>
            <p className="text-gray-400 text-lg sm:text-xl font-medium leading-relaxed">
               {submission 
                 ? "Proceed to receive your AI-generated Strategic Brief based on these workforce requirements."
                 : "You haven't completed your operational audit yet. Start now to unlock your custom business roadmap."
               }
            </p>
            
            <div className="pt-6 flex flex-col items-center gap-8">
               <button 
                onClick={onNext}
                className="group px-10 sm:px-16 py-5 sm:py-7 bg-emerald-600 text-white font-black rounded-3xl hover:bg-emerald-500 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg sm:text-xl flex items-center gap-4"
               >
                 {submission ? "Review My Strategic Brief" : "Start My Operational Audit"} 
                 <span className="text-2xl sm:text-3xl group-hover:translate-x-2 transition-transform">→</span>
               </button>
               <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Belcore Capital Ltd Implementation Path</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIAgents;
