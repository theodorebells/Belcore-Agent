
import React, { useState, useEffect } from 'react';
import { SMESubmission } from '../types';

interface ContactProps {
  prefillData?: SMESubmission | null;
  onHome: () => void;
}

const Contact: React.FC<ContactProps> = ({ prefillData, onHome }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: prefillData?.contactPerson || '',
    email: '',
    phone: prefillData?.phoneNumber || '',
    service: 'Core Automation Setup (₦75k)',
    message: ''
  });

  useEffect(() => {
    if (prefillData) {
      const summary = `
SME AUDIT: ${prefillData.businessName.toUpperCase()}
Port Harcourt Case ID: PH-${prefillData.id.toUpperCase()}
Bottleneck: ${prefillData.readiness.biggestFrustration}
Goal: ${prefillData.readiness.autoWish}
System: ${prefillData.readiness.customerRecording.join(', ')}
      `.trim();
      setFormData(prev => ({ ...prev, message: summary, name: prefillData.contactPerson, phone: prefillData.phoneNumber }));
    }
  }, [prefillData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  if (isSubmitting) {
    return (
      <div className="max-w-4xl mx-auto py-40 text-center space-y-12 animate-in fade-in duration-500">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl">📡</div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Cloud Uplink Active</h2>
          <p className="text-gray-500 font-medium">Transmitting diagnostic audit to Port Harcourt Regional HQ...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-12 animate-in zoom-in-95">
        <div className="w-40 h-40 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-8xl mx-auto shadow-2xl">✓</div>
        <div className="space-y-4">
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">Order Registered.</h2>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            BELCORE CAPITAL LTD has reserved an implementation slot for <span className="text-gray-900 font-bold">{prefillData?.businessName || 'your business'}</span>.
          </p>
          <div className="p-10 bg-emerald-50 rounded-[40px] border border-emerald-100 max-w-md mx-auto mt-12">
            <p className="text-sm text-emerald-800 font-black uppercase tracking-widest mb-2">Regional Support</p>
            <p className="text-xs text-emerald-600 font-medium leading-relaxed">
              Our Port Harcourt engineering desk will contact you via WhatsApp shortly to begin the Discovery phase.
            </p>
          </div>
        </div>
        <button 
          onClick={onHome} 
          className="px-16 py-7 bg-gray-900 text-white rounded-3xl font-black shadow-2xl hover:bg-black transition-all active:scale-95"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in slide-in-from-bottom-10 duration-700 pb-32">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">Step 3: Implementation</div>
        <h2 className="text-6xl font-black text-gray-900 tracking-tighter">Book Deployment</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
           <div className="space-y-8">
              <h3 className="text-3xl font-black text-gray-900">BELCORE Support</h3>
              <div className="space-y-6">
                <ContactInfo icon="🏢" title="Regional HQ" detail="Port Harcourt, Rivers State, Nigeria." />
                <ContactInfo icon="📱" title="WhatsApp Business" detail="+234 900 000 0000" />
                <ContactInfo icon="📧" title="Enterprise Desk" detail="hello@belcorecapital.com" />
              </div>
           </div>
           <div className="p-10 bg-gray-900 rounded-[50px] text-white shadow-3xl border border-white/5">
              <h4 className="text-2xl font-black mb-4 italic text-emerald-400 tracking-tight">"Automation is not an expense, it's an employee that never sleeps."</h4>
              <p className="text-sm opacity-60 leading-relaxed font-medium">BELCORE CAPITAL LTD: RC 9165301</p>
           </div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[60px] border border-gray-100 shadow-3xl">
           <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                 <FormItem label="Your Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} placeholder="Founder" />
                 <FormItem label="WhatsApp" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} placeholder="080..." />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Starting Package</label>
                 <select className="w-full px-6 py-5 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-emerald-500 transition-all outline-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                    <option>Core Automation Setup (₦75k)</option>
                    <option>Full Digital Workforce Suite</option>
                    <option>Custom Enterprise Development</option>
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Technical Implementation Summary</label>
                 <textarea className="w-full px-6 py-5 bg-gray-50 rounded-2xl h-40 font-mono text-[10px] leading-relaxed border-2 border-transparent focus:border-emerald-500 transition-all outline-none" value={formData.message} readOnly></textarea>
              </div>
              <button type="submit" className="w-full py-7 bg-emerald-600 text-white rounded-3xl font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all active:scale-95">
                Send Deployment Request →
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

const FormItem = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input required className="w-full px-6 py-5 bg-gray-50 rounded-2xl font-bold text-gray-900 border-2 border-transparent focus:border-emerald-500 transition-all outline-none" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const ContactInfo = ({ icon, title, detail }: any) => (
  <div className="flex gap-6 items-center">
    <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">{icon}</div>
    <div>
      <p className="font-black text-gray-900 text-lg leading-none mb-1">{title}</p>
      <p className="text-sm text-gray-500 font-medium">{detail}</p>
    </div>
  </div>
);

export default Contact;
