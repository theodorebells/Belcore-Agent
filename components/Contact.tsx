
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
    service: prefillData?.recommendedPackage || 'Full Digital Workforce Suite',
    message: ''
  });

  useEffect(() => {
    if (prefillData) {
      const summary = `
CASE ID: PH-2026-${prefillData.id.toUpperCase()}
BUSINESS: ${prefillData.businessName}
SECTOR: ${prefillData.industry}
CHALLENGE: ${prefillData.readiness.biggestFrustration}
PLAN: ${prefillData.recommendedPackage}
      `.trim();
      setFormData(prev => ({ 
        ...prev, 
        message: summary, 
        name: prefillData.contactPerson, 
        phone: prefillData.phoneNumber,
        service: prefillData.recommendedPackage || prev.service 
      }));
    }
  }, [prefillData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const waMessage = encodeURIComponent(
      `Hello BELCORE CONSULTANTS Engineering Desk, my name is ${formData.name}. ` +
      `I have just completed the Strategic Audit for my business, ${prefillData?.businessName}. ` +
      `I am interested in the ${formData.service} to solve our challenge with "${prefillData?.readiness.biggestFrustration}". ` +
      `Please find my Audit Ref: BC-PH-2026-${prefillData?.id.toUpperCase()}. Are you available for a technical review?`
    );
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(`https://wa.me/2349000000000?text=${waMessage}`, '_blank');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (isSubmitting) {
    return (
      <div className="max-w-4xl mx-auto py-32 sm:py-40 text-center space-y-12 animate-in fade-in duration-500 px-4">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl">📡</div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase">Initializing Uplink</h2>
          <p className="text-gray-500 font-medium italic text-sm">Synchronizing your brief with the BELCORE Engineering Desk...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-20 sm:py-24 text-center space-y-12 animate-in zoom-in-95 px-4">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-emerald-600 text-white rounded-full flex items-center justify-center text-6xl sm:text-8xl mx-auto shadow-2xl">✓</div>
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none">Uplink Confirmed.</h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed font-bold">
            Thank you for choosing BELCORE CONSULTANTS. Our team will contact you in 1 to 3 business days to finalize your deployment.
          </p>
        </div>
        <div className="pt-10 flex flex-col items-center gap-6">
           <button onClick={onHome} className="w-full sm:w-auto px-12 sm:px-16 py-6 sm:py-7 bg-gray-900 text-white rounded-2xl sm:rounded-3xl font-black shadow-2xl hover:bg-black transition-all text-base sm:text-lg">Return to Dashboard</button>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Audit Ref: BC-PH-2026-{prefillData?.id.toUpperCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16 animate-in slide-in-from-bottom-10 duration-700 pb-32 px-4">
      <div className="text-center space-y-4 sm:space-y-6">
        <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">Strategy Reservation</div>
        <h2 className="text-4xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-none">Claim Your <span className="text-emerald-600">Framework.</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">Eliminate operational leaks today. Connect with the BELCORE CONSULTANTS engineering team via WhatsApp to finalize your deployment.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start">
        <div className="space-y-8 sm:space-y-12">
           <div className="bg-gray-900 p-8 sm:p-12 rounded-[30px] sm:rounded-[60px] text-white shadow-3xl space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-9xl">💬</div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter relative z-10">Technical Consultation</h3>
              <div className="space-y-4 sm:space-y-6 relative z-10">
                 <div className="flex gap-4">
                   <span className="text-emerald-400 font-black">01.</span>
                   <p className="font-bold opacity-80 text-sm sm:text-base">Brief Review with a Lead Automation Strategist.</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="text-emerald-400 font-black">02.</span>
                   <p className="font-bold opacity-80 text-sm sm:text-base">Technical Scope & Timeline (avg. 72 hours).</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="text-emerald-400 font-black">03.</span>
                   <p className="font-bold opacity-80 text-sm sm:text-base">SLA & Private Dashboard Access.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white p-6 sm:p-14 rounded-[30px] sm:rounded-[60px] border border-gray-100 shadow-3xl">
           <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Lead Engineering Target</label>
                 <div className="flex items-center gap-3 px-6 py-5 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                    <span className="text-xl">🛠️</span>
                    <p className="font-black text-emerald-900 uppercase tracking-widest text-[10px]">BELCORE CONSULTANTS</p>
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Recommended Tier</label>
                 <input required className="w-full px-6 py-5 bg-gray-50 rounded-2xl font-bold border-2 border-transparent text-base outline-none" value={formData.service} readOnly />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Brief Packet (Auto-generated)</label>
                 <div className="w-full px-6 py-5 bg-gray-900 text-emerald-400 rounded-2xl font-mono text-[10px] whitespace-pre-wrap h-32 sm:h-40 border-2 border-transparent overflow-y-auto">
                    {formData.message}
                 </div>
              </div>
              <button type="submit" className="w-full py-6 sm:py-8 bg-emerald-600 text-white rounded-2xl sm:rounded-[2.5rem] font-black text-lg sm:text-xl shadow-2xl hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-4">
                Open WhatsApp →
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
