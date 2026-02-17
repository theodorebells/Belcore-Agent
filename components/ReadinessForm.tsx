
import React, { useState, useEffect } from 'react';
import { NIGERIAN_INDUSTRIES } from '../constants';
import { SMESubmission, ReadinessAnswers } from '../types';

interface ReadinessFormProps {
  onSubmit: (entry: Omit<SMESubmission, 'id' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ReadinessForm: React.FC<ReadinessFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
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

  // Track user's preference for agent selection
  const [agentPreference, setAgentPreference] = useState<'AI' | 'MANUAL'>('AI');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

  const industry = formData.industry.toLowerCase();
  
  // Total steps can vary based on complexity, but we'll aim for 8 steps to capture deep logic
  const totalSteps = 8;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const getIndustrySpecificOptions = (type: 'ops' | 'friction') => {
    if (industry.includes('laundry')) {
      return type === 'ops' 
        ? ['Garment Tagging', 'Price Tallying', 'Washing Cycle Prep', 'Pickup Notification']
        : ['Mixing customer clothes', 'Late delivery pings', 'Chemical/Soap inventory theft', 'Manual math errors on receipts'];
    }
    if (industry.includes('logistics')) {
      return type === 'ops'
        ? ['Waybill Typing', 'Driver Dispatch', 'Manifest Compilation', 'Fuel Monitoring']
        : ['Lost waybill papers', 'Unverified driver collections', 'High SMS costs for updates', 'Waybill fraud'];
    }
    if (industry.includes('restaurant') || industry.includes('food')) {
      return type === 'ops'
        ? ['Kitchen Ticket Generation', 'Waiter Order Taking', 'Table Billing', 'Daily Food Costing']
        : ['Wrong order to kitchen', 'Staff eating profit (leakage)', 'Slow service at peak hours', 'Inventory waste'];
    }
    if (industry.includes('retail')) {
      return type === 'ops'
        ? ['Stock Tallying', 'Price Labeling', 'Credit Selling Tracking', 'Manual Receipting']
        : ['Stock-out without alert', 'Staff selling at unauthorized prices', 'Math errors during busy queues', 'Theft'];
    }
    // Generic
    return type === 'ops'
      ? ['Record Keeping', 'Customer Billing', 'Inventory Tracking', 'Follow-up Calls']
      : ['Manual entry errors', 'Slow processing time', 'Lack of real-time visibility', 'Revenue leakage'];
  };

  const agentOptions = [
    { id: 'follow-up', label: 'Automated Follow-up', desc: 'Auto-ping leads who haven\'t responded to quotes.' },
    { id: 'sales-bot', label: 'WhatsApp Sales Bot', desc: 'Handle orders and pricing 24/7 automatically.' },
    { id: 'debt-agent', label: 'Debt Recovery Agent', desc: 'Polite, automated payment reminders.' },
    { id: 'inventory', label: 'Inventory Guard', desc: 'Stock alerts and theft detection logic.' },
    { id: 'receipting', label: 'Digital Receipting', desc: 'Branded PDF receipts via WhatsApp.' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 pb-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 px-4 gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase">Strategic Audit 2.0</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Industry Deep Scan Active</p>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Step {step} of {totalSteps}</p>
          <div className="flex gap-1.5 justify-start sm:justify-end">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${step > i ? 'bg-emerald-500 w-10' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] sm:rounded-[50px] shadow-2xl shadow-emerald-900/10 border border-gray-100 flex flex-col min-h-[600px] overflow-hidden">
        <div className="p-6 md:p-16 flex-grow">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">1. Business Identity</h3>
                <p className="text-gray-500 font-medium text-sm">Where should our engineers focus their analysis?</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <FormInput label="Registered Business Name" value={formData.businessName} onChange={v => setFormData({...formData, businessName: v})} placeholder="e.g. Lagos Express Logistics" />
                <FormSelect label="Core Sector" value={formData.industry} onChange={v => setFormData({...formData, industry: v})} options={NIGERIAN_INDUSTRIES} />
                <FormInput label="WhatsApp Uplink" value={formData.phoneNumber} onChange={v => setFormData({...formData, phoneNumber: v})} placeholder="080..." type="tel" />
                <FormInput label="Primary Founder/CEO" value={formData.contactPerson} onChange={v => setFormData({...formData, contactPerson: v})} placeholder="Full Name" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">2. Industrial Workflows</h3>
                <p className="text-gray-500 font-medium text-sm">Which {formData.industry} processes are currently manual?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Manual Task Intensity" options={getIndustrySpecificOptions('ops')} selected={formData.readiness.orderProcess} onToggle={v => toggleMultiSelect('orderProcess', v)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">3. Error Analysis</h3>
                <p className="text-gray-500 font-medium text-sm">Identifying common friction points in your operations.</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Common Leakage Sources" options={getIndustrySpecificOptions('friction')} selected={formData.readiness.errorSource} onToggle={v => toggleMultiSelect('errorSource', v)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">4. Lead Management</h3>
                <p className="text-gray-500 font-medium text-sm">How do you currently capture and track customers?</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Recording Tools" options={['Physical Ledger', 'WhatsApp Archive', 'Excel/Sheets', 'Google Keep', 'Memory Only']} selected={formData.readiness.customerRecording} onToggle={v => toggleMultiSelect('customerRecording', v)} />
                <FormSelect label="Monthly Lead Leakage (Est.)" value={formData.readiness.lostLeadsCount} onChange={v => updateField('lostLeadsCount', v)} options={['0-5 (Low)', '6-15 (Noticeable)', '16-30 (High)', '30+ (Critical)']} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">5. Digital Stack</h3>
                <p className="text-gray-500 font-medium text-sm">Infrastructure available for automation.</p>
              </div>
              <div className="space-y-8">
                <ChipGroup label="Current Billing Mode" options={['Carbon-paper Invoicing', 'Thermal Receipt', 'WhatsApp Text Only', 'Bank Link Only', 'None']} selected={formData.readiness.invoicingMethod} onToggle={v => toggleMultiSelect('invoicingMethod', v)} />
                <FormSelect label="Staff Primary Device" value={formData.readiness.primaryDevice} onChange={v => updateField('primaryDevice', v)} options={['Smartphone', 'Tablet', 'Desktop PC', 'None']} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">6. Financial Impact</h3>
                <p className="text-gray-500 font-medium text-sm">Quantifying the cost of manual oversight.</p>
              </div>
              <div className="space-y-8">
                 <FormInputWithSuggestions label="Biggest Operational Pain" value={formData.readiness.biggestFrustration} onChange={v => updateField('biggestFrustration', v)} suggestions={['Staff Accountability', 'Debt Collection', 'Inventory Mismatch', 'Slow Response Time']} />
                 <FormSelect label="Estimated Monthly Revenue Loss" value={formData.readiness.monthlyLoss} onChange={v => updateField('monthlyLoss', v)} options={['Below ₦50k', '₦50k - ₦150k', '₦150k - ₦500k', 'Above ₦500k']} />
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">7. Strategic Preference</h3>
                <p className="text-gray-500 font-medium text-sm">Choose your implementation path.</p>
              </div>
              <div className="space-y-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <button 
                    onClick={() => setAgentPreference('AI')}
                    className={`p-8 rounded-[35px] border-4 transition-all text-left space-y-4 ${agentPreference === 'AI' ? 'bg-emerald-50 border-emerald-500 shadow-xl' : 'bg-gray-50 border-transparent opacity-60'}`}
                  >
                    <div className="text-3xl">🤖</div>
                    <h4 className="font-black text-gray-900">Let Belcore AI Decide</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Our engine will analyze your audit and select the best agent squad for your business.</p>
                  </button>
                  <button 
                    onClick={() => setAgentPreference('MANUAL')}
                    className={`p-8 rounded-[35px] border-4 transition-all text-left space-y-4 ${agentPreference === 'MANUAL' ? 'bg-emerald-50 border-emerald-500 shadow-xl' : 'bg-gray-50 border-transparent opacity-60'}`}
                  >
                    <div className="text-3xl">🛠️</div>
                    <h4 className="font-black text-gray-900">Manual Selection</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">You pick the specific automation agents you want to deploy first.</p>
                  </button>
                </div>

                {agentPreference === 'MANUAL' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Select Desired Agents</label>
                    <div className="grid gap-3">
                      {agentOptions.map(agent => (
                        <button 
                          key={agent.id}
                          onClick={() => {
                            setSelectedAgents(prev => prev.includes(agent.id) ? prev.filter(a => a !== agent.id) : [...prev, agent.id]);
                          }}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${selectedAgents.includes(agent.id) ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-gray-50 border-transparent text-gray-500'}`}
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 ${selectedAgents.includes(agent.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-200'}`}>
                            {selectedAgents.includes(agent.id) && '✓'}
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-sm leading-none">{agent.label}</p>
                            <p className="text-[10px] opacity-70 mt-1">{agent.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-10 animate-in fade-in zoom-in-95">
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">🏁</div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tighter">Audit Review Ready.</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium text-sm">All operational vectors captured. Ready for diagnostic processing.</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-[40px] text-white space-y-4 text-center">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Strategy Selected</p>
                 <p className="text-xl font-bold">{agentPreference === 'AI' ? 'Automated Strategic Intelligence' : `Custom Implementation (${selectedAgents.length} Agents)`}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-12 bg-gray-50 flex justify-between items-center border-t">
          <button onClick={step === 1 ? onCancel : prevStep} className="px-4 py-4 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-gray-900 transition-colors">
            {step === 1 ? 'Exit Audit' : 'Previous Step'}
          </button>
          <button 
            onClick={step === totalSteps ? () => onSubmit(formData) : nextStep}
            disabled={step === 1 && (!formData.businessName || !formData.phoneNumber)}
            className="px-8 sm:px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-emerald-600 disabled:opacity-20 transition-all active:scale-95"
          >
            {step === totalSteps ? 'Execute Analysis →' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Stateless Helpers with mobile-optimized text sizing
const FormInput = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</label>
    <input
      type={type}
      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 text-base placeholder:text-gray-300 transition-all"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const FormInputWithSuggestions = ({ label, value, onChange, suggestions, placeholder }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</label>
    <div className="space-y-3">
      <input
        type="text"
        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 text-base placeholder:text-gray-300 transition-all"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Type here..."}
      />
      <div className="flex flex-wrap gap-2">
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
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {options.map((opt: string) => {
          const isActive = safeSelected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`px-4 sm:px-5 py-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-2 ${isActive ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md' : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'}`}
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
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</label>
    <select
      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 text-base cursor-pointer appearance-none transition-all"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>Select...</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default ReadinessForm;
