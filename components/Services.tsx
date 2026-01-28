
import React from 'react';

interface ServicesProps {
  onContact: () => void;
  onWorkflow: () => void;
}

const Services: React.FC<ServicesProps> = ({ onContact, onWorkflow }) => {
  const coreServices = [
    {
      title: "Business Process Automation",
      desc: "Digitizing manual workflows like client onboarding, debt recovery, and sales tracking.",
      price: "₦75,000",
      period: "per workflow setup",
      tags: ["Most Popular", "WhatsApp Integrated"]
    },
    {
      title: "Custom Software Dev",
      desc: "Tailor-made ERP, inventory, and management systems for niche industries.",
      price: "Custom",
      period: "based on scope",
      tags: ["Advanced", "Scalable"]
    },
    {
      title: "Corporate Web Design",
      desc: "Professional web presence with integrated customer intake forms and CRM hooks.",
      price: "₦150,000",
      period: "starting price",
      tags: ["SEO Ready", "Mobile Optimized"]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-900">Our Solutions Catalog</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Transparent, SME-friendly pricing designed to help Nigerian businesses scale without breaking the bank.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {coreServices.map((s, idx) => (
          <div key={idx} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all flex flex-col group">
            <div className="flex gap-2 mb-6">
              {s.tags.map(t => (
                <span key={t} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md">{t}</span>
              ))}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{s.title}</h3>
            <p className="text-sm text-gray-500 mb-8 flex-grow leading-relaxed">{s.desc}</p>
            <div className="border-t pt-6 space-y-1">
              <p className="text-3xl font-black text-gray-900">{s.price}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.period}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-600 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.84-.44-3.42-1.57-4.14-3.09l1.64-.68c.45 1.09 1.45 1.93 2.5 2.27V13.8c-1.74-.42-3.44-1.35-3.44-3.64 0-1.77 1.25-3.07 3-3.6V4.62h2.82v1.98c1.39.31 2.56 1.09 3.22 2.18l-1.55.93c-.41-.71-1.04-1.32-1.67-1.46v2.66c1.94.55 3.75 1.5 3.75 3.96 0 1.91-1.36 3.44-3.31 3.86zm-2.82-7.55c0 .7.62 1.1 1.41 1.34V8.43c-.8.15-1.41.56-1.41 1.11zm1.41 5.37v-2.73c-.91-.2-1.72-.64-1.72-1.46 0-.81.76-1.25 1.72-1.46v5.65c-.8-.19-1.72-.63-1.72-1.46z"/></svg>
        </div>
        <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
          <div>
            <h3 className="text-3xl font-black mb-4">Monthly Maintenance</h3>
            <p className="text-emerald-50 text-lg opacity-90 leading-relaxed">
              We don't just build and leave. For a flat monthly fee, we ensure your systems are online, secure, and updated.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-6xl font-black mb-1">₦30,000</p>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80">Flat Monthly Fee / Support</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onWorkflow} className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl">Explore Workflow Logic</button>
        <button onClick={onContact} className="px-10 py-5 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all">Contact for Booking</button>
      </div>
    </div>
  );
};

export default Services;
