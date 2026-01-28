
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
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Checking your business health</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Section {step} of {totalSteps}</p>
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
                <h3 className="text-3xl font-black text-gray-900">1. Who are you?</h3>
                <p className="text-gray-500 font-medium text-sm">Fill in these basic details so we can reach you.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <FormInput label="Name of your Business" value={formData.businessName} onChange={v => setFormData({...formData, businessName: v})} placeholder="e.g. Kola's Kitchen" />
                <FormSelect label="Business Industry" value={formData.industry} onChange={v => setFormData({...formData, industry: v})} options={NIGERIAN_INDUSTRIES} />
                <FormSelect label="Where are you located?" value={formData.readiness.location} onChange={v => updateField('location', v)} options={nigeriaStates} />
                <FormInput label="Your Name (The Owner)" value={formData.contactPerson} onChange={v => setFormData({...formData, contactPerson: v})} placeholder="Full Name" />
                <FormInput label="WhatsApp Number" value={formData.phoneNumber} onChange={v => setFormData({...formData, phoneNumber: v})} placeholder="080..." type="tel" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">2. Customers</h3>
                <p className="text-gray-500 font-medium text-sm">How do you talk to or record your customers?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Where do you write down customer info?" options={['Paper Notebook', 'Phone Contacts', 'WhatsApp', 'Instagram/TikTok', 'Excel Sheets', 'POS App', 'Verbal/Memory']} selected={formData.readiness.customerRecording} onToggle={v => toggleMultiSelect('customerRecording', v)} />
                <ChipGroup label="How do you remind them to pay?" options={['Calling one-by-one', 'WhatsApp Status', 'Manual Text Message', 'Status updates', 'Automated App']} selected={formData.readiness.followUpMethod} onToggle={v => toggleMultiSelect('followUpMethod', v)} />
                <FormSelect label="How many customers do you lose monthly?" value={formData.readiness.lostLeadsCount} onChange={v => updateField('lostLeadsCount', v)} options={['Almost None', 'A few (3-10)', 'Many (10-30)', 'I have no idea']} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">3. Daily Work</h3>
                <p className="text-gray-500 font-medium text-sm">What takes up most of your time every day?</p>
              </div>
              <div className="space-y-8">
                <FormInputWithSuggestions 
                  label="What repetitive work tires you out?" 
                  value={formData.readiness.repetitiveTasks} 
                  onChange={v => updateField('repetitiveTasks', v)} 
                  suggestions={['Balancing my sales book', 'Sending account details', 'Checking if stock is left', 'Chasing people for debt', 'Talking to staff']} 
                />
                <ChipGroup label="How do you talk to your staff?" options={['Talking directly', 'WhatsApp Groups', 'Phone Calls', 'Paper notes']} selected={formData.readiness.teamComm} onToggle={v => toggleMultiSelect('teamComm', v)} />
                <ChipGroup label="How do you count your products?" options={['Physical count', 'Big Ledger Book', 'Excel Sheets', 'I just trust the staff', 'Software']} selected={formData.readiness.inventoryMethod} onToggle={v => toggleMultiSelect('inventoryMethod', v)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">4. Money & Tools</h3>
                <p className="text-gray-500 font-medium text-sm">How do you handle receipts and payments?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="How do you give receipts?" options={['Handwritten paper', 'WhatsApp Text', 'Payment Link', 'POS Printout', 'No Receipts']} selected={formData.readiness.invoicingMethod} onToggle={v => toggleMultiSelect('invoicingMethod', v)} />
                <ChipGroup label="Tools you use now" options={['WhatsApp', 'Instagram', 'Excel', 'Paystack', 'Odoo', 'Canva']} selected={formData.readiness.digitalTools} onToggle={v => toggleMultiSelect('digitalTools', v)} />
                <FormSelect label="What do you use to work?" value={formData.readiness.primaryDevice} onChange={v => updateField('primaryDevice', v)} options={['Smartphone', 'Laptop', 'Tablet', 'Paper-only']} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900">5. The Headache</h3>
                <p className="text-gray-500 font-medium text-sm">Where are you struggling the most?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Where do mistakes happen?" options={['Staff typing wrong info', 'Math errors', 'Wrong delivery address', 'Missing products', 'Owner is too busy']} selected={formData.readiness.errorSource} onToggle={v => toggleMultiSelect('errorSource', v)} />
                <FormInputWithSuggestions 
                  label="Your biggest business frustration?" 
                  value={formData.readiness.biggestFrustration} 
                  onChange={v => updateField('biggestFrustration', v)} 
                  suggestions={['Staff reliability', 'Running out of time', 'Losing my records', 'Customer debt', 'High costs']} 
                />
                <ChipGroup label="What breaks if you get 50 more customers today?" options={['Customer Service', 'Delivery', 'Stock/Inventory', 'My Health', 'Staff Management']} selected={formData.readiness.breakPoint} onToggle={v => toggleMultiSelect('breakPoint', v)} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-10 animate-in fade-in zoom-in-95">
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">📊</div>
                <h3 className="text-3xl font-black text-gray-900">Finished!</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">We are ready to show you how to fix your business.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <FormSelect label="Budget for Automation" value={formData.readiness.investmentLevel} onChange={v => updateField('investmentLevel', v)} options={['Small Budget', 'Medium Budget', 'Enterprise (Big)', 'I just want to start']} />
                <FormInputWithSuggestions 
                  label="If you could fix ONE thing now?" 
                  value={formData.readiness.autoWish} 
                  onChange={v => updateField('autoWish', v)} 
                  suggestions={['Daily sales report', 'Making receipts', 'Stock alerts', 'Debt reminders']} 
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
            {step === totalSteps ? 'Show My Results →' : 'Continue'}
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
