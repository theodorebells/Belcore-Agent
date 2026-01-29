
import React, { useState } from 'react';
import { SMESubmission, SMEStatus, ReadinessAnswers } from '../types';

interface AdminPanelProps {
  submissions: SMESubmission[];
  onUpdate: (id: string, status: SMEStatus, progress: number, notes?: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ submissions, onUpdate }) => {
  const [selected, setSelected] = useState<SMESubmission | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [statusDraft, setStatusDraft] = useState<SMEStatus>('New Lead');
  const [progressDraft, setProgressDraft] = useState(0);

  const handleSelect = (s: SMESubmission) => {
    setSelected(s);
    setNoteDraft(s.adminNotes || '');
    setStatusDraft(s.status);
    setProgressDraft(s.implementationProgress);
    window.scrollTo(0, 0);
  };

  const handleSave = () => {
    if (selected) {
      onUpdate(selected.id, statusDraft, progressDraft, noteDraft);
      alert(`Case Synchronized: ${selected.businessName} updated.`);
      setSelected({ ...selected, status: statusDraft, implementationProgress: progressDraft, adminNotes: noteDraft });
    }
  };

  const startWhatsApp = () => {
    if (!selected) return;
    let cleanPhone = selected.phoneNumber.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '234' + cleanPhone.substring(1);
    if (!cleanPhone.startsWith('234')) cleanPhone = '234' + cleanPhone;

    const message = encodeURIComponent(
      `Hello ${selected.contactPerson},\n\n` +
      `This is the Engineering Desk at BELCORE CAPITAL. We've finished reviewing the ${selected.industry} diagnostic for ${selected.businessName}.\n\n` +
      `I have your Diagnostic Brief here (Ref: BC-${selected.id.toUpperCase()}). We've identified a key solution for your "${selected.readiness.biggestFrustration}" using our ${selected.recommendedPackage || 'custom automation'}.\n\n` +
      `Are you available for a 5-minute technical review?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 py-4 animate-in fade-in duration-500 pb-32">
      {/* Lead List */}
      <div className={`lg:col-span-4 space-y-6 ${selected ? 'hidden lg:block' : 'block'}`}>
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Case Pipeline</h2>
          <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{submissions.length} Total</span>
        </div>
        
        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-2xl">
          <div className="max-h-[750px] overflow-y-auto no-scrollbar">
            {submissions.map(s => (
              <div 
                key={s.id} 
                onClick={() => handleSelect(s)}
                className={`p-6 border-b border-gray-50 cursor-pointer transition-all hover:bg-emerald-50 ${selected?.id === s.id ? 'bg-emerald-50 border-emerald-100' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-gray-900 text-base leading-tight">{s.businessName}</h4>
                  <span className={`px-2 py-0.5 text-[7px] font-black rounded uppercase tracking-widest ${s.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {s.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{s.readiness.location}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{s.industry.split(' (')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Detail View */}
      <div className={`lg:col-span-8 ${!selected ? 'hidden lg:block' : 'block'}`}>
        {selected ? (
          <div className="bg-white p-8 sm:p-16 rounded-[60px] border border-gray-100 shadow-3xl space-y-12 animate-in slide-in-from-right-10 duration-700">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-10">
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <span className="bg-gray-900 text-emerald-400 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">Ref: BC-{selected.id.toUpperCase()}</span>
                 </div>
                 <h3 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none">{selected.businessName}</h3>
                 <div className="flex flex-wrap gap-8 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Point Person</p>
                        <p className="text-sm font-bold text-gray-900">{selected.contactPerson}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Uplink Number</p>
                        <p className="text-sm font-bold text-gray-900">{selected.phoneNumber}</p>
                      </div>
                    </div>
                 </div>
               </div>
               <button onClick={() => setSelected(null)} className="lg:hidden p-4 bg-gray-100 rounded-full text-gray-500">✕</button>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
               <button 
                 onClick={startWhatsApp}
                 className="flex flex-col items-center justify-center p-10 bg-emerald-600 text-white rounded-[40px] shadow-2xl hover:bg-emerald-500 transition-all group active:scale-95"
               >
                 <span className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">💬</span>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Engage Client</p>
                 <p className="text-xl font-black">WhatsApp Start →</p>
               </button>
               
               <div className="p-10 bg-gray-900 text-white rounded-[40px] shadow-2xl space-y-4 flex flex-col justify-center">
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">AI Tier Recommendation</p>
                  <p className="text-2xl font-black text-emerald-400 leading-tight">
                    {selected.recommendedPackage || 'Custom Evaluation'}
                  </p>
               </div>
            </div>

            {/* NEW: Client Strategy Brief Visibility */}
            <div className="space-y-6 p-10 bg-emerald-50/50 rounded-[40px] border-2 border-emerald-100">
               <div className="flex items-center gap-4 border-b border-emerald-100 pb-6">
                 <span className="text-3xl">📝</span>
                 <div>
                   <h4 className="text-xl font-black text-emerald-900">Client Strategy Brief</h4>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">This is exactly what the client read</p>
                 </div>
               </div>
               <div className="prose prose-sm max-w-none">
                 <div className="whitespace-pre-wrap font-bold text-emerald-900/70 text-sm leading-relaxed italic">
                   {selected.aiStrategy || "No diagnostic brief generated yet."}
                 </div>
               </div>
            </div>

            {/* Technical Intel */}
            <div className="space-y-10">
               <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                 <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                 Audit Intelligence
               </h4>
               <div className="grid sm:grid-cols-2 gap-6">
                  <DossierStat label="Sector" value={selected.industry} />
                  <DossierStat label="HQ Region" value={selected.readiness.location} />
                  <DossierStat label="Main Friction" value={selected.readiness.biggestFrustration} />
                  <DossierStat label="Desired Outcome" value={selected.readiness.autoWish} />
                  <DossierStat label="Current Records" value={selected.readiness.customerRecording.join(', ')} />
                  <DossierStat label="Budget Strategy" value={selected.readiness.investmentLevel} />
               </div>
            </div>

            {/* Pipeline Controls */}
            <div className="space-y-10 pt-10 border-t border-gray-100">
               <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Case Lifecycle</label>
                    <select 
                      className="w-full p-6 bg-gray-50 rounded-[25px] font-black text-sm border-2 border-transparent focus:border-emerald-500 outline-none cursor-pointer"
                      value={statusDraft}
                      onChange={e => setStatusDraft(e.target.value as SMEStatus)}
                    >
                      <option>New Lead</option>
                      <option>Discovery</option>
                      <option>Assessment</option>
                      <option>Proposal Sent</option>
                      <option>Implementation</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Build Status ({progressDraft}%)</label>
                    <div className="flex items-center gap-4 pt-4">
                      <input type="range" className="flex-grow accent-emerald-500 h-2 bg-gray-100 rounded-full cursor-pointer" value={progressDraft} onChange={e => setProgressDraft(parseInt(e.target.value))} />
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Case Deployment Notes</label>
                  <textarea 
                    className="w-full p-8 bg-gray-50 rounded-[40px] text-sm font-medium h-48 border-2 border-transparent focus:border-emerald-500 outline-none resize-none" 
                    placeholder="Technical logs, client feedback, or implementation blockers..."
                    value={noteDraft}
                    onChange={e => setNoteDraft(e.target.value)}
                  />
               </div>

               <button 
                 onClick={handleSave}
                 className="w-full py-8 bg-gray-900 text-white rounded-[35px] font-black text-xl shadow-2xl hover:bg-emerald-600 transition-all active:scale-95"
               >
                 Save Case Progress →
               </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 h-full min-h-[600px] rounded-[70px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-20 opacity-40">
            <span className="text-8xl mb-8">🔍</span>
            <p className="text-2xl font-black text-gray-400 uppercase tracking-tighter leading-tight">Select a Lead from the pipeline <br/> to initiate deployment</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DossierStat = ({ label, value }: { label: string, value: string }) => (
  <div className="p-8 bg-gray-50 rounded-[35px] border border-gray-100 flex flex-col gap-2 hover:bg-emerald-50 transition-colors group">
    <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] group-hover:text-emerald-600 transition-colors">{label}</p>
    <p className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{value || 'N/A'}</p>
  </div>
);

export default AdminPanel;
