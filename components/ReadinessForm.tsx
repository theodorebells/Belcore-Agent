
import React, { useState } from 'react';
import { NIGERIAN_INDUSTRIES } from '../constants';
import { SMESubmission, ReadinessAnswers } from '../types';

interface ReadinessFormProps {
  onSubmit: (entry: Omit<SMESubmission, 'id' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ReadinessForm: React.FC<ReadinessFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    businessName: '',
    industry: NIGERIAN_INDUSTRIES[0],
    contactPerson: '',
    phoneNumber: '',
    challenge: '',
    // Fix: Added implementationProgress to satisfy the required property in Omit<SMESubmission, 'id' | 'status' | 'createdAt'>
    implementationProgress: 0,
    readiness: {
      customerRecording: [],
      storageMethod: [],
      lostLeadsCount: '',
      repetitiveTasks: '',
      orderProcess: [],
      inventoryMethod: [],
      searchTime: '',
      teamComm: [],
      digitalTools: [],
      primaryDevice: 'Phone',
      invoicingMethod: [],
      errorSource: [],
      biggestFrustration: '',
      breakPoint: [],
      blockerToGrowth: [],
      autoWish: '',
      monthlyLoss: '',
      investmentLevel: ''
    } as ReadinessAnswers
  });

  const updateField = (field: keyof ReadinessAnswers, value: any) => {
    setFormData(prev => ({
      ...prev,
      readiness: { ...prev.readiness, [field]: value }
    }));
  };

  const toggleMultiSelect = (field: keyof ReadinessAnswers, value: string) => {
    const current = (formData.readiness[field] as string[]) || [];
    const updated = current.includes(value) 
      ? current.filter(v => v !== value) 
      : [...current, value];
    updateField(field, updated);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-4xl mx-auto py-10 pb-32">
      <div className="flex justify-between items-center mb-10 px-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Operational Audit</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Digital Maturity Assessment</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Step {step}/{totalSteps}</p>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${step > i ? 'bg-emerald-500 w-10' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[50px] shadow-2xl shadow-emerald-900/10 border border-gray-100 flex flex-col min-h-[600px] overflow-hidden">
        <div className="p-8 md:p-16 flex-grow">
          
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">1. Core Identity</h3>
                <p className="text-gray-500 font-medium">Let's start with who you are.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <FormInput label="Business Name" value={formData.businessName} onChange={v => setFormData({...formData, businessName: v})} placeholder="e.g. Lagos Fashion Hub" />
                <FormSelect label="Business Industry" value={formData.industry} onChange={v => setFormData({...formData, industry: v})} options={NIGERIAN_INDUSTRIES} />
                <FormInput label="Founder / Contact" value={formData.contactPerson} onChange={v => setFormData({...formData, contactPerson: v})} placeholder="Full Name" />
                <FormInput label="WhatsApp Number" value={formData.phoneNumber} onChange={v => setFormData({...formData, phoneNumber: v})} placeholder="080..." type="tel" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">2. Customer Capture</h3>
                <p className="text-gray-500 font-medium">How do you currently handle new clients? (Select all that apply)</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="How do you record new info?" options={['Paper Notebook', 'Phone Contacts', 'WhatsApp Search', 'Instagram DM', 'TikTok DM', 'Excel/Sheets', 'Dedicated POS App', 'Verbal/Memory']} selected={formData.readiness.customerRecording} onToggle={v => toggleMultiSelect('customerRecording', v)} />
                <ChipGroup label="How do you follow up leads?" options={['By memory', 'Scrolling chats', 'Notebook reminders', 'Staff phone calls', 'Status updates', 'Email Broadcast', 'Automated CRM']} selected={formData.readiness.followUpMethod} onToggle={v => toggleMultiSelect('followUpMethod', v)} />
                <FormSelect label="Lost customers monthly?" value={formData.readiness.lostLeadsCount} onChange={v => updateField('lostLeadsCount', v)} options={['0-2 (Very few)', '3-10 (Noticeable)', '11-30 (Critical)', '30+ (Extreme Leakage)', 'I have no idea']} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">3. Operational Flow</h3>
                <p className="text-gray-500 font-medium">Describe your daily tasks and team communication.</p>
              </div>
              <div className="space-y-8">
                <FormInputWithSuggestions 
                  label="Repetitive task that wastes your time?" 
                  value={formData.readiness.repetitiveTasks} 
                  onChange={v => updateField('repetitiveTasks', v)} 
                  suggestions={['Balancing sales book', 'Sending bank details', 'Answering "Is this available?"', 'Debt reminders', 'Daily staff check-ins', 'Calculating delivery costs']} 
                />
                <ChipGroup label="Team Communication" options={['Face-to-face', 'WhatsApp Groups', 'Phone Calls', 'Paper memos', 'Voice Notes', 'Slack/Teams', 'Task Management App']} selected={formData.readiness.teamComm} onToggle={v => toggleMultiSelect('teamComm', v)} />
                <ChipGroup label="Inventory Tracking" options={['Physical count', 'Ledger Book', 'Excel Sheets', 'Vendor receipts', 'Real-time Software', 'Storekeeper only', 'None']} selected={formData.readiness.inventoryMethod} onToggle={v => toggleMultiSelect('inventoryMethod', v)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">4. Tech & Payments</h3>
                <p className="text-gray-500 font-medium">Your current digital footprint.</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Invoicing Method" options={['Handwritten', 'Excel PDF', 'WhatsApp Text', 'Payment Link (Paystack/Flutterwave)', 'POS Printout', 'Custom Software', 'No Invoices']} selected={formData.readiness.invoicingMethod} onToggle={v => toggleMultiSelect('invoicingMethod', v)} />
                <ChipGroup label="Current Digital Tools" options={['WhatsApp Business', 'Instagram/FB', 'Excel/Sheets', 'QuickBooks', 'Odoo', 'Canva', 'Notion', 'Zoho', 'Paystack']} selected={formData.readiness.digitalTools} onToggle={v => toggleMultiSelect('digitalTools', v)} />
                <FormSelect label="Primary Device" value={formData.readiness.primaryDevice} onChange={v => updateField('primaryDevice', v)} options={['Smartphone', 'Laptop/PC', 'Tablet', 'POS Machine', 'Paper-only']} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">5. Pain Points</h3>
                <p className="text-gray-500 font-medium">Where are the biggest cracks in the foundation?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Where do errors happen?" options={['Staff typing info', 'Math calculations', 'Delivery addresses', 'Stock mismatch', 'Customer names', 'Payment confirmation', 'Owner oversight']} selected={formData.readiness.errorSource} onToggle={v => toggleMultiSelect('errorSource', v)} />
                <FormInputWithSuggestions 
                  label="Biggest Operational Frustration?" 
                  value={formData.readiness.biggestFrustration} 
                  onChange={v => updateField('biggestFrustration', v)} 
                  suggestions={['Staff reliability', 'Lack of time', 'Losing records', 'Slow payment', 'High operational cost', 'Difficulty scaling']} 
                />
                <ChipGroup label="What breaks if you grow 50%?" options={['Customer service', 'Order delivery', 'Stock levels', 'My health/Time', 'Staff management', 'Cashflow management', 'Quality control']} selected={formData.readiness.breakPoint} onToggle={v => toggleMultiSelect('breakPoint', v)} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-10 animate-in fade-in zoom-in-95">
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">📊</div>
                <h3 className="text-3xl font-black text-gray-900">Audit Ready!</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">We've mapped your bottlenecks. One last thing before we generate your transformation plan.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <FormSelect label="Investment Comfort" value={formData.readiness.investmentLevel} onChange={v => updateField('investmentLevel', v)} options={['Startup (Tight budget)', 'Growth (Medium investment)', 'Scale (Enterprise transformation)', 'Unlimited (Total overhaul)']} />
                <FormInputWithSuggestions 
                  label="The one task to automate?" 
                  value={formData.readiness.autoWish} 
                  onChange={v => updateField('autoWish', v)} 
                  suggestions={['Daily sales report', 'Receipt generation', 'Customer registration', 'Stock alerts', 'Staff shift tracking', 'Debt collection']} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-8 md:p-12 bg-gray-50 flex justify-between items-center border-t">
          <button onClick={step === 1 ? onCancel : prevStep} className="px-8 py-4 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-gray-900 transition-colors">
            {step === 1 ? 'Cancel Audit' : 'Previous Step'}
          </button>
          <button 
            onClick={step === totalSteps ? () => onSubmit(formData) : nextStep}
            disabled={step === 1 && (!formData.businessName || !formData.phoneNumber)}
            className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-emerald-600 disabled:opacity-20 transition-all hover:scale-105"
          >
            {step === totalSteps ? 'See Diagnostic Results →' : 'Continue Section'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 placeholder:text-gray-300 transition-all"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const FormInputWithSuggestions = ({ label, value, onChange, suggestions, placeholder }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <div className="space-y-3">
      <input
        type="text"
        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 placeholder:text-gray-300 transition-all"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Type here..."}
      />
      <div className="flex flex-wrap gap-2">
        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mr-2 self-center">AI SUGGESTIONS:</span>
        {suggestions.map((s: string) => (
          <button key={s} onClick={() => onChange(s)} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all">
            {s}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ChipGroup = ({ label, options, selected = [], onToggle }: any) => {
  // Defensive check to ensure selected is an array
  const safeSelected = Array.isArray(selected) ? selected : [];

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt: string) => {
          const isActive = safeSelected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`px-5 py-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-2 ${isActive ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md' : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'}`}
            >
              {isActive && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FormSelect = ({ label, value, onChange, options }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <select
      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 cursor-pointer appearance-none transition-all"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>Select an option...</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const getStepTitle = (s: number) => {
  switch(s) {
    case 1: return "Identity";
    case 2: return "Customer Engagement";
    case 3: return "Operational Tasks";
    case 4: return "Infrastructure";
    case 5: return "Crisis Points";
    case 6: return "Next Steps";
    default: return "";
  }
};

export default ReadinessForm;
