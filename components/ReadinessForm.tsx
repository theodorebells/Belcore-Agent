
import React, { useState, useEffect } from 'react';
import { NIGERIAN_INDUSTRIES } from '../constants';
import { SMESubmission, ReadinessAnswers } from '../types';

interface ReadinessFormProps {
  onSubmit: (entry: Omit<SMESubmission, 'id' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ReadinessForm: React.FC<ReadinessFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 10;
  const [otherLocationText, setOtherLocationText] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    industry: NIGERIAN_INDUSTRIES[0],
    contactPerson: '',
    phoneNumber: '',
    challenge: '',
    implementationProgress: 0,
    readiness: {
      location: ['Lagos'],
      customerRecording: [],
      storageMethod: [],
      lostLeadsCount: 'I am not sure',
      followUpMethod: [],
      paymentReminders: [],
      repetitiveTasks: '',
      orderProcess: [],
      inventoryMethod: [],
      searchTime: 'Medium',
      teamComm: [],
      digitalTools: [],
      primaryDevice: 'Smartphone',
      invoicingMethod: [],
      errorSource: [],
      biggestFrustration: '',
      breakPoint: [],
      blockerToGrowth: [],
      autoWish: '',
      monthlyLoss: 'I am not sure',
      investmentLevel: 'Growth (System Overhaul)'
    } as ReadinessAnswers
  });

  const suggestions = {
    repetitiveTasks: [
      "Typing waybills manually", 
      "Sending bank details repeatedly", 
      "Checking if customers have paid", 
      "Counting stock every night",
      "Manual price updates"
    ],
    biggestFrustration: [
      "Staff forgetting to record sales", 
      "Customers owing for too long", 
      "Losing customer contacts", 
      "Inventory mismatch at end of day"
    ],
    autoWish: [
      "Collect orders while I sleep", 
      "Send auto-receipts", 
      "Track every kobo in the shop", 
      "Real-time stock alerts on my phone"
    ]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const updateField = (field: keyof ReadinessAnswers, value: any) => {
    setFormData(prev => ({
      ...prev,
      readiness: { ...prev.readiness, [field]: value }
    }));
  };

  const toggleMultiSelect = (field: keyof ReadinessAnswers, value: string) => {
    const current = (formData.readiness[field] as string[]) || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    updateField(field, updated);
  };

  const handleOtherLocationChange = (val: string) => {
    setOtherLocationText(val);
    const locations = formData.readiness.location.filter(loc => !loc.startsWith('Other: '));
    if (val.trim()) {
      locations.push(`Other: ${val}`);
    }
    updateField('location', locations);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 pb-32 px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 sm:mb-10 px-4">
        <h2 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tighter uppercase">Operational Audit</h2>
        <div className="text-right">
          <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Node {step} of {totalSteps}</p>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1 sm:h-1.5 w-4 sm:w-6 rounded-full transition-all duration-500 ${step > i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] sm:rounded-[50px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col min-h-[500px] sm:min-h-[650px] relative">
        <div className="p-8 sm:p-16 flex-grow">
          {step === 1 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in">
               <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">Business Identity</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <FormInput label="Business Name" value={formData.businessName} onChange={(v: string) => setFormData({...formData, businessName: v})} placeholder="e.g. Kola's Ventures" />
                  <FormSelect label="Core Sector" value={formData.industry} onChange={(v: string) => setFormData({...formData, industry: v})} options={NIGERIAN_INDUSTRIES} />
                  <FormInput label="Founder Name" value={formData.contactPerson} onChange={(v: string) => setFormData({...formData, contactPerson: v})} placeholder="Full Name" />
                  <FormInput label="WhatsApp Line" value={formData.phoneNumber} onChange={(v: string) => setFormData({...formData, phoneNumber: v})} placeholder="080..." type="tel" />
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 sm:space-y-12 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Operations Hub</h3>
              <div className="space-y-6">
                <ChipGroup 
                  label="Operational Locations" 
                  options={['Lagos', 'Port Harcourt', 'Abuja', 'Kano', 'Onitsha', 'Ibadan', 'Other']} 
                  selected={formData.readiness.location} 
                  onToggle={v => toggleMultiSelect('location', v)} 
                />
                {(formData.readiness.location.includes('Other') || formData.readiness.location.some(l => l.startsWith('Other: '))) && (
                  <div className="animate-in slide-in-from-top-2 pt-4 border-t border-gray-100">
                     <FormInput 
                        label="Type Your Location" 
                        value={otherLocationText} 
                        onChange={handleOtherLocationChange} 
                        placeholder="Enter City/State name..." 
                     />
                  </div>
                )}
              </div>
              <ChipGroup label="Recording Method" options={['Notebook', 'WhatsApp', 'Excel', 'Brain Only', 'POS Machine']} selected={formData.readiness.customerRecording} onToggle={v => toggleMultiSelect('customerRecording', v)} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Financial Leakage</h3>
              <FormSelect label="Lost Leads (Monthly Estimate)" value={formData.readiness.lostLeadsCount} onChange={(v: string) => updateField('lostLeadsCount', v)} options={['0-5', '6-15', '16-30', '31+', 'I am not sure']} />
              <FormSelect label="Inventory Audit Frequency" value={formData.readiness.inventoryMethod[0] || 'Weekly'} onChange={(v: string) => updateField('inventoryMethod', [v])} options={['Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Never / Irregular']} />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Process Friction</h3>
              <div className="space-y-4">
                <FormInput label="Most Repetitive Manual Task" value={formData.readiness.repetitiveTasks} onChange={(v: string) => updateField('repetitiveTasks', v)} placeholder="What task takes too much time?" />
                <SuggestionChips options={suggestions.repetitiveTasks} onSelect={v => updateField('repetitiveTasks', v)} />
              </div>
              <FormSelect label="Average Record Search Time" value={formData.readiness.searchTime} onChange={(v: string) => updateField('searchTime', v)} options={['Seconds', 'Minutes', 'Hours', 'Days', 'Impossible']} />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Billing Logic</h3>
              <ChipGroup label="Primary Invoicing Method" options={['Carbon Receipt', 'Thermal Print', 'WhatsApp Text', 'Voice Confirmation', 'Digital PDF']} selected={formData.readiness.invoicingMethod} onToggle={v => toggleMultiSelect('invoicingMethod', v)} />
              <ChipGroup label="Order Source Channels" options={['Walk-in', 'WhatsApp', 'Instagram/DM', 'Phone Calls', 'Website']} selected={formData.readiness.orderProcess} onToggle={v => toggleMultiSelect('orderProcess', v)} />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Infrastructure</h3>
              <ChipGroup label="Current Digital Tools" options={['Facebook Ads', 'WhatsApp Business', 'Google Sheets', 'POS Software', 'None']} selected={formData.readiness.digitalTools} onToggle={v => toggleMultiSelect('digitalTools', v)} />
              <FormSelect label="Primary Business Device" value={formData.readiness.primaryDevice} onChange={(v: string) => updateField('primaryDevice', v)} options={['Smartphone', 'Tablet', 'Laptop', 'Desktop PC']} />
            </div>
          )}

          {step === 7 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Core Frustrations</h3>
              <div className="space-y-4">
                <FormInput label="Biggest Operational Pain Point" value={formData.readiness.biggestFrustration} onChange={(v: string) => updateField('biggestFrustration', v)} placeholder="What keeps you awake at night?" />
                <SuggestionChips options={suggestions.biggestFrustration} onSelect={v => updateField('biggestFrustration', v)} />
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Automation Vision</h3>
              <div className="space-y-4">
                <FormInput label="If you had a magic digital bot, it would..." value={formData.readiness.autoWish} onChange={(v: string) => updateField('autoWish', v)} placeholder="e.g. Handle all price queries" />
                <SuggestionChips options={suggestions.autoWish} onSelect={v => updateField('autoWish', v)} />
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-8 animate-in fade-in">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Growth Capacity</h3>
              <FormSelect label="Estimated Monthly Revenue Leak" value={formData.readiness.monthlyLoss} onChange={(v: string) => updateField('monthlyLoss', v)} options={['Below ₦50k', '₦50k - ₦150k', '₦150k - ₦500k', 'Above ₦500k', 'I am not sure']} />
              <FormSelect label="Desired Investment Level" value={formData.readiness.investmentLevel} onChange={(v: string) => updateField('investmentLevel', v)} options={['Lite (Single Workflow)', 'Growth (Multi-Module)', 'Enterprise (Custom ERP)']} />
            </div>
          )}

          {step === 10 && (
            <div className="space-y-8 sm:space-y-12 animate-in fade-in text-center py-6 sm:py-10">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">🎯</div>
              <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-none">Diagnostic Locked.</h3>
              <p className="text-gray-500 font-medium text-base sm:text-lg max-w-md mx-auto">Our engine is ready to synthesize your 2026 Strategy Brief.</p>
              <div className="bg-gray-900 p-8 sm:p-10 rounded-[40px] sm:rounded-[50px] text-white space-y-2 inline-block px-12 sm:px-16 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 <p className="text-[8px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-2">Subject Node</p>
                 <p className="text-xl sm:text-2xl font-bold tracking-tight">{formData.businessName}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 sm:p-12 bg-gray-50 flex justify-between items-center border-t rounded-b-[40px] sm:rounded-b-[50px]">
          <button onClick={step === 1 ? onCancel : prevStep} className="px-5 sm:px-8 py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button 
            onClick={step === totalSteps ? () => onSubmit(formData) : nextStep}
            disabled={step === 1 && !formData.businessName}
            className="px-8 sm:px-16 py-4 sm:py-6 bg-gray-900 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm shadow-xl hover:bg-emerald-600 disabled:opacity-20 transition-all active:scale-95"
          >
            {step === totalSteps ? 'Finalize Analysis →' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input type={type} className="w-full px-5 py-3 sm:px-6 sm:py-5 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 transition-all shadow-sm" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

const FormSelect = ({ label, value, onChange, options }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <select className="w-full px-5 py-3 sm:px-6 sm:py-5 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 appearance-none transition-all shadow-sm" value={value} onChange={e => onChange(e.target.value)}>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const ChipGroup = ({ label, options, selected, onToggle }: { label: string, options: string[], selected: string[], onToggle: (v: string) => void }) => (
  <div className="space-y-3">
    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {options.map(opt => {
        const isSelected = selected.includes(opt) || (opt === 'Other' && selected.some(l => l.startsWith('Other: ')));
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)} className={`px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold transition-all border-2 ${isSelected ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg scale-105' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-emerald-200'}`}>{opt}</button>
        );
      })}
    </div>
  </div>
);

const SuggestionChips = ({ options, onSelect }: { options: string[], onSelect: (v: string) => void }) => (
  <div className="flex flex-wrap gap-2">
    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest pt-2">AI Help:</span>
    {options.map(opt => (
      <button key={opt} type="button" onClick={() => onSelect(opt)} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors">+{opt}</button>
    ))}
  </div>
);

export default ReadinessForm;
