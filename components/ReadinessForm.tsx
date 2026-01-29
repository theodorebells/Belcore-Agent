
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
      investmentLevel: ''
    } as ReadinessAnswers
  });

  // Ensure scroll to top on step change - immediate behavior
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

  const nigeriaStates = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Bayelsa", "Delta", "Kano", "Enugu", "Abeokuta", "Uyo"];

  return (
    <div className="max-w-4xl mx-auto py-10 pb-32">
      <div className="flex justify-between items-center mb-10 px-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Business Audit</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Identifying Operational Risks</p>
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
                <h3 className="text-3xl font-black text-gray-900">1. Core Information</h3>
                <p className="text-gray-500 font-medium text-sm">Define your business profile for our regional engineers.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <FormInput label="Official Business Name" value={formData.businessName} onChange={v => setFormData({...formData, businessName: v})} placeholder="e.g. Kola's Kitchen" />
                <FormSelect label="Economic Sector" value={formData.industry} onChange={v => setFormData({...formData, industry: v})} options={NIGERIAN_INDUSTRIES} />
                <FormSelect label="Primary Operational State" value={formData.readiness.location} onChange={v => updateField('location', v)} options={nigeriaStates} />
                <FormInput label="Founder / Managing Director" value={formData.contactPerson} onChange={v => setFormData({...formData, contactPerson: v})} placeholder="Full Name" />
                <FormInput label="Primary WhatsApp Uplink" value={formData.phoneNumber} onChange={v => setFormData({...formData, phoneNumber: v})} placeholder="080..." type="tel" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">2. Client Data Pipeline</h3>
                <p className="text-gray-500 font-medium text-sm">How is customer information currently institutionalized?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Primary Record-Keeping Method" options={['Paper Notebook', 'Phone Contacts', 'WhatsApp', 'Instagram/TikTok', 'Excel Sheets', 'POS App', 'Memory-based']} selected={formData.readiness.customerRecording} onToggle={v => toggleMultiSelect('customerRecording', v)} />
                <ChipGroup label="Revenue Recovery Strategy (Debt)" options={['Manual Outreach', 'WhatsApp Status', 'Direct SMS', 'Automated Notifications', 'Zero strategy']} selected={formData.readiness.followUpMethod} onToggle={v => toggleMultiSelect('followUpMethod', v)} />
                <FormSelect label="Estimated Monthly Conversion Loss" value={formData.readiness.lostLeadsCount} onChange={v => updateField('lostLeadsCount', v)} options={['Negligible', '3-10 clients', '10-30 clients', 'Unknown (High Risk)']} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">3. Operational Friction</h3>
                <p className="text-gray-500 font-medium text-sm">Which repetitive tasks consume the most executive time?</p>
              </div>
              <div className="space-y-8">
                <FormInputWithSuggestions 
                  label="Target Task for Automation" 
                  value={formData.readiness.repetitiveTasks} 
                  onChange={v => updateField('repetitiveTasks', v)} 
                  suggestions={['Sales reconciliation', 'Invoice generation', 'Stock auditing', 'Customer debt chasing', 'Staff reporting']} 
                />
                <ChipGroup label="Internal Communication Channels" options={['Direct verbal', 'WhatsApp Groups', 'Formal Meetings', 'Written memos']} selected={formData.readiness.teamComm} onToggle={v => toggleMultiSelect('teamComm', v)} />
                <ChipGroup label="Inventory Management Method" options={['Physical count', 'Ledger/Logbook', 'Cloud spreadsheet', 'Staff trust-based', 'Software system']} selected={formData.readiness.inventoryMethod} onToggle={v => toggleMultiSelect('inventoryMethod', v)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">4. Financial Infrastructure</h3>
                <p className="text-gray-500 font-medium text-sm">Deployment status of digital payment and tools.</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Billing & Invoicing Method" options={['Manual Carbon-copy', 'WhatsApp Message', 'Digital Payment Link', 'Thermal Printer', 'None']} selected={formData.readiness.invoicingMethod} onToggle={v => toggleMultiSelect('invoicingMethod', v)} />
                <ChipGroup label="Current Digital Stack" options={['WhatsApp', 'Instagram', 'Excel', 'Paystack', 'Odoo', 'Canva']} selected={formData.readiness.digitalTools} onToggle={v => toggleMultiSelect('digitalTools', v)} />
                <FormSelect label="Primary Workflow Device" value={formData.readiness.primaryDevice} onChange={v => updateField('primaryDevice', v)} options={['Smartphone', 'Laptop/Desktop', 'Tablet', 'Analog Only']} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">5. Risk & Vulnerability</h3>
                <p className="text-gray-500 font-medium text-sm">Where does the manual process break down most frequently?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Primary Source of Operational Error" options={['Staff data-entry', 'Mathematical errors', 'Logistics/Delivery', 'Inventory Leakage', 'Executive Bandwidth']} selected={formData.readiness.errorSource} onToggle={v => toggleMultiSelect('errorSource', v)} />
                <FormInputWithSuggestions 
                  label="Critical Business Pain-Point" 
                  value={formData.readiness.biggestFrustration} 
                  onChange={v => updateField('biggestFrustration', v)} 
                  suggestions={['Staff reliability', 'Temporal inefficiency', 'Data fragmentation', 'Customer delinquency', 'High overheads']} 
                />
                <ChipGroup label="Scaling Blockers (If volume doubles tomorrow)" options={['Customer Support', 'Logistics/Fulfillment', 'Inventory Control', 'Personal Burnout', 'Managerial Oversight']} selected={formData.readiness.breakPoint} onToggle={v => toggleMultiSelect('breakPoint', v)} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-10 animate-in fade-in zoom-in-95">
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">📊</div>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Audit Complete.</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">Ready to review your Strategic Automation Roadmap.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <FormSelect label="Automation Allocation Budget" value={formData.readiness.investmentLevel} onChange={v => updateField('investmentLevel', v)} options={['Strategic (Low)', 'Operational (Mid)', 'Enterprise (High)', 'Experimental']} />
                <FormInputWithSuggestions 
                  label="Priority Automation Target" 
                  value={formData.readiness.autoWish} 
                  onChange={v => updateField('autoWish', v)} 
                  suggestions={['Real-time reporting', 'Digital invoicing', 'Smart alerts', 'Debt automation']} 
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
            {step === totalSteps ? 'Finalize Strategic Audit →' : 'Continue'}
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
        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mr-2 self-center">TRY THESE:</span>
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
      <option value="" disabled>Select...</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default ReadinessForm;
