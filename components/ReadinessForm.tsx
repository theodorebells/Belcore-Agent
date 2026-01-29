
import React, { useState, useEffect } from 'react';
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
    implementationProgress: 0,
    readiness: {
      location: 'Lagos',
      customerRecording: [],
      storageMethod: [],
      lostLeadsCount: '',
      repetitiveTasks: '',
      orderProcess: [],
      inventoryMethod: [],
      searchTime: '',
      teamComm: [],
      digitalTools: [],
      primaryDevice: 'Smartphone',
      invoicingMethod: [],
      errorSource: [],
      biggestFrustration: '',
      breakPoint: [],
      blockerToGrowth: [],
      autoWish: '',
      monthlyLoss: '',
      investmentLevel: 'Growth (System Overhaul)'
    } as ReadinessAnswers
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [step]);

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

  // Industry-specific logic for tailored questions
  const getTailoredOptions = (type: 'recording' | 'process' | 'frustration') => {
    const ind = formData.industry.toLowerCase();
    
    if (ind.includes('laundry')) {
      if (type === 'recording') return ['Garment Tags', 'Paper Notebook', 'WhatsApp Chat', 'Customer Phone Contacts'];
      if (type === 'process') return ['Tagging clothes', 'Sorting by owner', 'Recording payment balance', 'Pickup/Delivery tracking'];
      if (type === 'frustration') return ['Mixing up customer clothes', 'Late pickups', 'Forgetting to notify customer when clothes are ready', 'Staff theft of soaps/materials'];
    }
    
    if (ind.includes('restaurant')) {
      if (type === 'recording') return ['Kitchen Tickets', 'Waiter Notepad', 'POS Terminal', 'Verbal orders'];
      if (type === 'process') return ['Order taking', 'Kitchen communication', 'Bill calculation', 'Inventory counting'];
      if (type === 'frustration') return ['Wrong orders to tables', 'Missing tickets in kitchen', 'Inventory waste/shrinkage', 'Manual calculation errors'];
    }

    if (ind.includes('retail')) {
      if (type === 'recording') return ['Ledger Book', 'Excel Sheet', 'Barcode Scanner', 'Memory'];
      if (type === 'process') return ['Stock taking', 'Price checking', 'Manual receipting', 'Credit tracking'];
      if (type === 'frustration') return ['Stock out (no alert)', 'Debt recovery', 'Staff selling at wrong prices', 'Long queue for manual invoicing'];
    }

    if (ind.includes('logistics')) {
      if (type === 'recording') return ['Waybill Slips', 'WhatsApp Status', 'Driver Logbook', 'Spreadsheets'];
      if (type === 'process') return ['Parcel booking', 'Waybill generation', 'Driver dispatch', 'Delivery confirmation'];
      if (type === 'frustration') return ['Lost waybills', 'Proof of delivery delay', 'Manual manifest typing', 'Payment collection from drivers'];
    }

    // Default generic SME options
    if (type === 'recording') return ['Paper Notebook', 'WhatsApp', 'Excel Sheets', 'Memory-based'];
    if (type === 'process') return ['Sales recording', 'Stock management', 'Invoicing', 'Customer communication'];
    return ['Manual recording speed', 'Data errors', 'Staff oversight', 'High overheads'];
  };

  const nigeriaStates = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Bayelsa", "Delta", "Kano", "Enugu", "Abeokuta", "Uyo"];

  return (
    <div className="max-w-4xl mx-auto py-10 pb-32">
      <div className="flex justify-between items-center mb-10 px-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Strategic Audit</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Profiling Operational Leaks</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Audit Section {step} of {totalSteps}</p>
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
                <h3 className="text-3xl font-black text-gray-900">1. Business Profile</h3>
                <p className="text-gray-500 font-medium text-sm">Identifying the specific industry landscape you operate in.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <FormInput label="Official Business Name" value={formData.businessName} onChange={v => setFormData({...formData, businessName: v})} placeholder="e.g. Pristine Cleaners" />
                <FormSelect label="Economic Sector" value={formData.industry} onChange={v => setFormData({...formData, industry: v})} options={NIGERIAN_INDUSTRIES} />
                <FormSelect label="Operational HQ" value={formData.readiness.location} onChange={v => updateField('location', v)} options={nigeriaStates} />
                <FormInput label="Founder / Manager" value={formData.contactPerson} onChange={v => setFormData({...formData, contactPerson: v})} placeholder="Full Name" />
                <FormInput label="WhatsApp Uplink" value={formData.phoneNumber} onChange={v => setFormData({...formData, phoneNumber: v})} placeholder="080..." type="tel" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">2. Current Data Workflow</h3>
                <p className="text-gray-500 font-medium text-sm">How do you currently track jobs for <span className="text-emerald-600 font-black">{formData.industry}</span>?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup 
                  label={`Primary ${formData.industry.split('(')[0]} Recording Method`} 
                  options={getTailoredOptions('recording')} 
                  selected={formData.readiness.customerRecording} 
                  onToggle={v => toggleMultiSelect('customerRecording', v)} 
                />
                <ChipGroup 
                  label="Debt & Payment Tracking" 
                  options={['Manual check of records', 'Customer memory', 'WhatsApp Status', 'Excel Ledger', 'None']} 
                  selected={formData.readiness.followUpMethod} 
                  onToggle={v => toggleMultiSelect('followUpMethod', v)} 
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">3. Operational Leaks</h3>
                <p className="text-gray-500 font-medium text-sm">Where is the friction in your daily <span className="text-emerald-600 font-black">{formData.industry.split('(')[0]}</span> cycle?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup 
                  label="Most Repetitive Tasks" 
                  options={getTailoredOptions('process')} 
                  selected={formData.readiness.orderProcess} 
                  onToggle={v => toggleMultiSelect('orderProcess', v)} 
                />
                <FormInputWithSuggestions 
                  label="Specific Task to Automate" 
                  value={formData.readiness.repetitiveTasks} 
                  onChange={v => updateField('repetitiveTasks', v)} 
                  suggestions={['Auto-receipting', 'Status updates to client', 'Staff commission tracking', 'Inventory alerts']} 
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">4. Tech & Billing</h3>
                <p className="text-gray-500 font-medium text-sm">Current digital tools deployed in your workflow.</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Billing & Invoicing" options={['Manual Carbon-copy', 'WhatsApp Message', 'Digital Payment Link', 'Thermal Printer', 'None']} selected={formData.readiness.invoicingMethod} onToggle={v => toggleMultiSelect('invoicingMethod', v)} />
                <FormSelect label="Primary Device used for Work" value={formData.readiness.primaryDevice} onChange={v => updateField('primaryDevice', v)} options={['Smartphone', 'Laptop/Desktop', 'Analog Only']} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">5. Pain & Friction Points</h3>
                <p className="text-gray-500 font-medium text-sm">The specific problems causing revenue loss.</p>
              </div>
              <div className="space-y-8">
                <ChipGroup 
                  label="Primary Operational Frustration" 
                  options={getTailoredOptions('frustration')} 
                  selected={formData.readiness.errorSource} 
                  onToggle={v => toggleMultiSelect('errorSource', v)} 
                />
                <FormInputWithSuggestions 
                  label="Detailed Pain-Point Description" 
                  value={formData.readiness.biggestFrustration} 
                  onChange={v => updateField('biggestFrustration', v)} 
                  suggestions={['Staff reliability', 'Speed of service', 'Record accuracy', 'Customer follow-up']} 
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-10 animate-in fade-in zoom-in-95">
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">🛡️</div>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Audit Review Ready.</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">Proceed to see how BELCORE AI identifies your operational gaps.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <FormSelect 
                  label="Monthly Operational ICT Strategy" 
                  value={formData.readiness.investmentLevel} 
                  onChange={v => updateField('investmentLevel', v)} 
                  options={['Maintenance (Basic Essentials)', 'Growth (System Overhaul)', 'Strategic (Full Digitalization)']} 
                />
                <FormInputWithSuggestions 
                  label="Final Automation Goal" 
                  value={formData.readiness.autoWish} 
                  onChange={v => updateField('autoWish', v)} 
                  suggestions={['Paperless office', 'Remote management', 'Zero-theft systems', 'Auto-marketing']} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-8 md:p-12 bg-gray-50 flex justify-between items-center border-t">
          <button onClick={step === 1 ? onCancel : prevStep} className="px-8 py-4 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-gray-900 transition-colors">
            {step === 1 ? 'Go Back' : 'Previous Section'}
          </button>
          <button 
            onClick={step === totalSteps ? () => onSubmit(formData) : nextStep}
            disabled={step === 1 && (!formData.businessName || !formData.phoneNumber)}
            className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-emerald-600 disabled:opacity-20 transition-all hover:scale-105"
          >
            {step === totalSteps ? 'Run AI Analysis →' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components (Stateless)
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
        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mr-2 self-center">TRY:</span>
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
      <option value="" disabled>Select...</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default ReadinessForm;
