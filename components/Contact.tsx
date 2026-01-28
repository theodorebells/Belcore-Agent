
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
      const recommended = [];
      if (prefillData.readiness.customerRecording.some(r => r.includes('Paper'))) recommended.push("Software Agent");
      if (prefillData.readiness.lostLeadsCount.includes('Critical')) recommended.push("Marketing Agent");
      if (prefillData.readiness.inventoryMethod.includes('Physical')) recommended.push("Audit Agent");
      if (prefillData.readiness.breakPoint.some(p => p.includes('Health'))) recommended.push("Support Agent");

      const messageSummary = `
SME AUDIT SUMMARY: ${prefillData.businessName.toUpperCase()}
-------------------------------------------------
Industry: ${prefillData.industry}
Biggest Bottleneck: ${prefillData.readiness.biggestFrustration}
Automated Wish: ${prefillData.readiness.autoWish}

RECOMMENDED DIGITAL WORKFORCE:
${recommended.length > 0 ? recommended.map(a => `- ${a}`).join('\n') : '- Standard Core Automation'}

REQUEST: Please reach out to me to discuss the implementation of these solutions.
      `.trim();

      setFormData(prev => ({
        ...prev,
        message: messageSummary,
        name: prefillData.contactPerson,
        phone: prefillData.phoneNumber
      }));
    }
  }, [prefillData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate high-tech sync loading
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  if (isSubmitting) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center space-y-12 animate-in fade-in duration-500">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">📡</div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Syncing with Belcore Cloud...</h2>
          <p className="text-gray-500 font-medium max-w-xs mx-auto text-sm">Uploading audit diagnostic data and reserving deployment slot for {prefillData?.businessName || 'your business'}.</p>
        </div>
        <div className="flex justify-center gap-1">
          {[1,2,3].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-24 animate-in zoom-in-95 duration-700 text-center space-y-10">
        <div className="w-40 h-40 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-7xl mx-auto shadow-3xl shadow-emerald-500/20">
          ✓
        </div>
        <div className="space-y-4">
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter">Application Received.</h2>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            BELCORE CAPITAL LTD has received your implementation request for <span className="text-gray-900 font-bold">{prefillData?.businessName || 'your business'}</span>.
          </p>
          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 max-w-md mx-auto mt-8">
            <p className="text-sm text-emerald-800 font-bold">What happens next?</p>
            <p className="text-xs text-emerald-600 mt-2 leading-relaxed">
              Our Senior Solutions Architect will review your audit data and contact you via WhatsApp or Phone within <span className="font-black underline">2 Business Hours</span>.
            </p>
          </div>
        </div>
        <div className="pt-10">
          <button 
            onClick={onHome}
            className="px-12 py-6 bg-gray-900 text-white rounded-3xl font-black text-sm shadow-2xl hover:bg-black transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">Step 3: Implementation Booking</div>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">Start Your Transformation</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
          Confirm your service details below. Your diagnostic results are already attached to this request.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-12">
           <div className="space-y-8">
              <h3 className="text-3xl font-black text-gray-900">BELCORE Support</h3>
              <div className="space-y-6">
                <ContactInfo icon="🏢" title="Headquarters" detail="Suite 204, Garki Shopping Mall, Garki II, Abuja." />
                <ContactInfo icon="📱" title="Tech Support" detail="+234 901 000 0000 (WhatsApp)" />
                <ContactInfo icon="📧" title="Email" detail="hello@belcorecapital.com" />
              </div>
           </div>

           <div className="p-10 bg-gray-900 rounded-[50px] text-white relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <span className="text-9xl">🚀</span>
              </div>
              <p className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-4">Fast-Track Guarantee</p>
              <h4 className="text-2xl font-black mb-4">Zero Downtime Migration</h4>
              <p className="text-sm opacity-70 leading-relaxed font-medium">
                We migrate your manual records to digital systems without stopping your daily sales. Our team works in the background to ensure a smooth transition.
              </p>
           </div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[60px] border border-gray-100 shadow-3xl relative">
           <div className="absolute -top-6 left-10 bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
             Priority Intake Session
           </div>
           
           <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                 <FormItem label="Your Full Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} placeholder="Founder Name" />
                 <FormItem label="WhatsApp Number" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} placeholder="080..." />
              </div>
              
              <FormItem label="Professional Email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} placeholder="name@company.com" type="email" />

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Starting Package</label>
                 <select 
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold text-gray-900 cursor-pointer"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                 >
                    <option>Core Automation Setup (₦75k)</option>
                    <option>Full Digital Workforce Deployment</option>
                    <option>Custom Enterprise Software</option>
                    <option>ICT Maintenance Package (₦30k/mo)</option>
                 </select>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Audit Implementation Summary</label>
                 <textarea 
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold h-64 text-sm leading-relaxed text-gray-600 font-mono"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                 ></textarea>
              </div>

              <button type="submit" className="w-full py-7 bg-emerald-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-95">
                Send Implementation Request →
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

const FormItem = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-3 flex-grow">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      required
      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold text-gray-900 placeholder:text-gray-300 transition-all" 
      placeholder={placeholder} 
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const ContactInfo = ({ icon, title, detail }: any) => (
  <div className="flex gap-6 group">
    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
    <div>
      <p className="font-black text-gray-900 text-lg leading-none mb-1">{title}</p>
      <p className="text-sm text-gray-500 font-medium">{detail}</p>
    </div>
  </div>
);

export default Contact;
