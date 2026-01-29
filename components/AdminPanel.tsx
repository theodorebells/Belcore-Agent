
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
    // On mobile, selection hides the list
    window.scrollTo(0, 0);
  };

  const handleSave = () => {
    if (selected) {
      onUpdate(selected.id, statusDraft, progressDraft, noteDraft);
      alert(`Sync Successful: ${selected.businessName} updated.`);
      setSelected({ ...selected, status: statusDraft, implementationProgress: progressDraft, adminNotes: noteDraft });
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 py-2 sm:py-4 animate-in fade-in duration-500">
      {/* Lead List - Hidden on mobile if detail is active */}
      <div className={`lg:col-span-4 space-y-4 sm:space-y-6 ${selected ? 'hidden lg:block' : 'block'}`}>
        <h2 className="text-xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight px-1">Lead Pipeline</h2>
        
        <div className="bg-white rounded-2xl sm:rounded-[40px] border border-gray-100 overflow-hidden shadow-xl">
          <div className="max-h-[70vh] lg:max-h-[700px] overflow-y-auto no-scrollbar">
            {submissions.map(s => (
              <div 
                key={s.id} 
                onClick={() => handleSelect(s)}
                className={`p-4 sm:p-6 border-b border-gray-50 cursor-pointer transition-all hover:bg-emerald-50 ${selected?.id === s.id ? 'bg-emerald-50 border-emerald-100' : ''}`}
              >
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <h4 className="font-black text-gray-900 text-xs sm:text-sm">{s.businessName}</h4>
                  <span className={`px-2 py-0.5 text-[6px] sm:text-[7px] font-black rounded uppercase ${s.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {s.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-bold text-gray-400">{s.readiness.location}</span>
                  <span className="text-[8px] font-bold text-gray-300">•</span>
                  <span className="text-[8px] font-bold text-gray-400">{s.industry.split(' (')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Detail */}
      <div className={`lg:col-span-8 ${!selected ? 'hidden lg:block' : 'block'}`}>
        {selected ? (
          <div className="bg-white p-6 sm:p-14 rounded-2xl sm:rounded-[60px] border border-gray-100 shadow-2xl space-y-6 sm:space-y-10 animate-in slide-in-from-right-10 min-h-[50vh]">
            <div className="flex justify-between items-start border-b pb-4 sm:pb-8">
               <div className="space-y-1">
                 <p className="text-[8px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest">Case File: {selected.readiness.location}</p>
                 <h3 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tighter">{selected.businessName}</h3>
                 <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-3">
                   <span className="text-[9px] sm:text-xs font-bold text-gray-400">Industry: {selected.industry}</span>
                   <span className="text-[9px] sm:text-xs font-bold text-gray-400">Contact: {selected.contactPerson}</span>
                 </div>
               </div>
               <button 
                 onClick={() => setSelected(null)}
                 className="lg:hidden p-2 bg-gray-50 rounded-full hover:bg-gray-100"
               >
                 <span className="text-xs font-black">✕</span>
               </button>
            </div>

            {selected.aiStrategy && (
              <div className="bg-purple-50 p-5 sm:p-8 rounded-2xl sm:rounded-[40px] border border-purple-100 space-y-2 sm:space-y-4">
                 <div className="flex items-center gap-3">
                   <span className="text-base sm:text-xl">🤖</span>
                   <p className="text-[8px] sm:text-[10px] font-black text-purple-600 uppercase tracking-widest">AI Engineering Strategy</p>
                 </div>
                 <div className="text-[11px] sm:text-sm font-bold text-purple-900 leading-relaxed italic whitespace-pre-wrap">
                   {selected.aiStrategy}
                 </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
               <AuditCard label="Records Method" value={selected.readiness.customerRecording.join(', ')} />
               <AuditCard label="Major Bottleneck" value={selected.readiness.biggestFrustration} />
               <AuditCard label="Dream Automation" value={selected.readiness.autoWish} />
               <AuditCard label="Primary Device" value={selected.readiness.primaryDevice} />
            </div>

            <div className="space-y-6 sm:space-y-8 pt-6 sm:pt-8 border-t">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment Phase</label>
                    <select 
                      className="w-full p-4 sm:p-5 bg-gray-50 rounded-xl sm:rounded-3xl font-bold text-xs sm:text-sm outline-none border-2 border-transparent focus:border-emerald-500"
                      value={statusDraft}
                      onChange={e => setStatusDraft(e.target.value as SMEStatus)}
                    >
                      <option>New Lead</option>
                      <option>Discovery</option>
                      <option>Assessment</option>
                      <option>Implementation</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Build Progress ({progressDraft}%)</label>
                    <input type="range" className="w-full accent-emerald-500 mt-2 h-2 rounded-full cursor-pointer" value={progressDraft} onChange={e => setProgressDraft(parseInt(e.target.value))} />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Internal Engineering Notes</label>
                  <textarea 
                    className="w-full p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-3xl text-xs sm:text-sm font-medium h-24 sm:h-32 border-2 border-transparent focus:border-emerald-500 outline-none" 
                    placeholder="Document implementation steps..."
                    value={noteDraft}
                    onChange={e => setNoteDraft(e.target.value)}
                  />
               </div>

               <button 
                 onClick={handleSave}
                 className="w-full py-5 sm:py-6 bg-gray-900 text-white rounded-xl sm:rounded-3xl font-black text-base sm:text-lg shadow-xl hover:bg-emerald-600 transition-all active:scale-95"
               >
                 Update Case File →
               </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 h-full min-h-[300px] sm:min-h-[500px] rounded-[30px] sm:rounded-[60px] border-2 sm:border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 sm:p-16">
            <span className="text-4xl sm:text-7xl mb-6 grayscale opacity-10">📁</span>
            <p className="text-base sm:text-xl font-black text-gray-300 uppercase tracking-widest px-4">Select a Case from the Pipeline</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AuditCard = ({ label, value }: any) => (
  <div className="p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-3xl border border-gray-100">
    <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-[10px] sm:text-xs font-bold text-gray-900 leading-tight">{value || 'N/A'}</p>
  </div>
);

export default AdminPanel;
