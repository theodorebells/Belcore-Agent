
import React, { useState } from 'react';
import { SMESubmission, SMEStatus, User } from '../types';

interface AdminPanelProps {
  submissions: SMESubmission[];
  onUpdate: (id: string, status: SMEStatus, progress: number, notes?: string) => void;
  user: User | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ submissions, onUpdate, user }) => {
  const [selected, setSelected] = useState<SMESubmission | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [statusDraft, setStatusDraft] = useState<SMEStatus>('New Lead');
  const [progressDraft, setProgressDraft] = useState(0);

  const handleSelect = (s: SMESubmission) => {
    setSelected(s);
    setNoteDraft(s.adminNotes || '');
    setStatusDraft(s.status);
    setProgressDraft(s.implementationProgress);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const launchWhatsAppUplink = () => {
    if (!selected) return;
    let cleanPhone = selected.phoneNumber.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '234' + cleanPhone.substring(1);
    if (!cleanPhone.startsWith('234')) cleanPhone = '234' + cleanPhone;

    const message = encodeURIComponent(
      `Hello ${selected.contactPerson}, This is the Engineering Desk at BELCORE CAPITAL. ` +
      `We've finished reviewing the diagnostic for ${selected.businessName}. ` +
      `I have your Diagnostic Brief here (Ref: BC-PH-2026-${selected.id.toUpperCase()}). ` +
      `Are you available for a 5-minute technical review?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleSave = () => {
    if (selected) {
      onUpdate(selected.id, statusDraft, progressDraft, noteDraft);
      alert(`Synchronized: ${selected.businessName} updated in registry.`);
      setSelected({ ...selected, status: statusDraft, implementationProgress: progressDraft, adminNotes: noteDraft });
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 py-4 animate-in fade-in duration-500 pb-32">
      <div className={`lg:col-span-4 space-y-6 ${selected ? 'hidden lg:block' : 'block'}`}>
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter px-1">Engineering Pipeline</h2>
        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-2xl">
          <div className="max-h-[750px] overflow-y-auto no-scrollbar">
            {submissions.map(s => (
              <div key={s.id} onClick={() => handleSelect(s)} className={`p-6 border-b border-gray-50 cursor-pointer transition-all hover:bg-emerald-50 ${selected?.id === s.id ? 'bg-emerald-50 border-emerald-100' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-gray-900 text-sm leading-tight">{s.businessName}</h4>
                  <span className={`px-2 py-0.5 text-[7px] font-black rounded uppercase tracking-widest ${s.depositPaid ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{s.depositPaid ? 'COMMITTED' : 'AUDIT'}</span>
                </div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{s.industry.split(' (')[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`lg:col-span-8 ${!selected ? 'hidden lg:block' : 'block'}`}>
        {selected ? (
          <div className="bg-white p-8 sm:p-14 rounded-[40px] sm:rounded-[60px] border border-gray-100 shadow-3xl space-y-12 relative">
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all z-20 group active:scale-95 shadow-sm"
            >
              <span className="text-xl font-bold group-hover:rotate-90 transition-transform">✕</span>
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-b pb-10">
               <div className="space-y-4 max-w-[80%]">
                 <div className="flex gap-2">
                   <span className="bg-gray-900 text-emerald-400 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Ref: BC-PH-2026-{selected.id.toUpperCase()}</span>
                   {selected.depositPaid && <span className="bg-emerald-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Deposit Paid</span>}
                 </div>
                 <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-none">{selected.businessName}</h3>
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">REGIONAL DESK • SYNC ACTIVE</p>
                 </div>
               </div>
               <button onClick={launchWhatsAppUplink} className="w-full sm:w-auto px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
                 <span>WhatsApp Client</span>
                 <span className="text-xl">→</span>
               </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <DossierStat label="Primary Friction" value={selected.readiness.biggestFrustration} />
               <DossierStat label="Commitment" value={selected.depositPaid ? "₦10k Verified" : "Pending"} />
            </div>

            <div className="space-y-6">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brief Packet</label>
               <div className="bg-gray-50 p-8 rounded-[40px] text-base font-bold leading-relaxed text-gray-600 border border-gray-100">
                  {selected.aiStrategy || "System analysis missing."}
               </div>
            </div>

            <div className="space-y-8 pt-8 border-t">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workflow State</label>
                  <select className="w-full p-6 bg-gray-50 rounded-3xl font-black text-sm outline-none border-2 border-transparent focus:border-emerald-500" value={statusDraft} onChange={e => setStatusDraft(e.target.value as SMEStatus)}>
                    <option>New Lead</option><option>Discovery</option><option>Assessment</option><option>Proposal Sent</option><option>Implementation</option><option>Completed</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress ({progressDraft}%)</label>
                  <input type="range" className="w-full accent-emerald-500 h-2 bg-gray-100 rounded-full mt-6" value={progressDraft} onChange={e => setProgressDraft(parseInt(e.target.value))} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Field Logs</label>
                <textarea className="w-full p-8 bg-gray-50 rounded-[40px] h-40 font-bold text-sm outline-none border-2 border-transparent focus:border-emerald-500 resize-none" value={noteDraft} onChange={e => setNoteDraft(e.target.value)} />
              </div>
              <button onClick={handleSave} className="w-full py-8 bg-gray-900 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-emerald-600 transition-all">Synchronize Local Data →</button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 h-full min-h-[600px] rounded-[70px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-20 opacity-30">
            <span className="text-8xl mb-8">📁</span>
            <p className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Select a case for technical review</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DossierStat = ({ label, value }: { label: string, value: string }) => (
  <div className="p-8 bg-gray-50 rounded-[35px] border border-gray-100 flex flex-col gap-2 hover:bg-emerald-50 transition-all">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-base font-bold text-gray-900 leading-tight uppercase">{value || 'Pending'}</p>
  </div>
);

export default AdminPanel;
