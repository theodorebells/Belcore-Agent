
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
  };

  const handleSave = () => {
    if (selected) {
      // PERSIST TO GLOBAL STATE
      onUpdate(selected.id, statusDraft, progressDraft, noteDraft);
      
      // Update local state for immediate feedback
      setSelected({ 
        ...selected, 
        status: statusDraft, 
        implementationProgress: progressDraft, 
        adminNotes: noteDraft 
      });
      
      alert(`Success: ${selected.businessName}'s pipeline status updated to ${statusDraft} (${progressDraft}%).`);
    }
  };

  // Helper to determine recommended agents based on submission data
  const getRecommendedAgents = (readiness: ReadinessAnswers) => {
    const agents = [];
    if (readiness.customerRecording.some(r => r.includes('Paper'))) agents.push({ name: "Software Agent", role: "Record Digitization", color: "blue" });
    if (readiness.lostLeadsCount.includes('Critical') || readiness.lostLeadsCount.includes('Extreme')) agents.push({ name: "Marketing Agent", role: "Lead Capture", color: "purple" });
    if (readiness.inventoryMethod.some(r => r.includes('Physical') || r.includes('Ledger'))) agents.push({ name: "Audit Agent", role: "Stock Guard", color: "red" });
    if (readiness.breakPoint.some(p => p.includes('Health') || p.includes('Time'))) agents.push({ name: "Support Agent", role: "Owner CRM", color: "emerald" });
    
    // Default if none triggered
    if (agents.length === 0) agents.push({ name: "Software Agent", role: "General Workflow", color: "blue" });
    return agents;
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 py-4 animate-in fade-in duration-500">
      <div className="lg:col-span-6 space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Deployment Pipeline</h2>
          <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            {submissions.length} Active SMEs
          </div>
        </div>
        
        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl">
          <div className="max-h-[750px] overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-900 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-800 sticky top-0 z-20">
                <tr>
                  <th className="px-8 py-6">SME Client</th>
                  <th className="px-8 py-6">Current Status</th>
                  <th className="px-8 py-6">Build %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {submissions.map(s => (
                  <tr 
                    key={s.id} 
                    onClick={() => handleSelect(s)}
                    className={`cursor-pointer transition-all hover:bg-emerald-50/50 ${selected?.id === s.id ? 'bg-emerald-50' : ''}`}
                  >
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-900">{s.businessName}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-tight">{s.industry}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-tighter ${
                        s.status === 'Completed' ? 'bg-emerald-500 text-white' : 
                        s.status === 'Implementation' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-20 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-700" style={{ width: `${s.implementationProgress}%` }} />
                      </div>
                      <p className="text-[9px] font-black text-gray-400 mt-1 uppercase">{s.implementationProgress}%</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        {selected ? (
          <div className="bg-white p-8 md:p-12 rounded-[50px] border border-gray-100 shadow-2xl sticky top-24 space-y-10 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
            {/* Header with quick info */}
            <div className="flex justify-between items-start border-b pb-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Case Overview</p>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selected.businessName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">Owner: {selected.contactPerson}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-xs font-mono text-gray-400">ID: {selected.id.toUpperCase()}</span>
                  </div>
               </div>
               <div className="bg-gray-50 p-4 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Status</p>
                  <p className="text-sm font-black text-gray-900">{selected.status}</p>
               </div>
            </div>

            {/* Engineering Recommendation View */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Digital Workforce Recommended</p>
                 <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[8px] font-black rounded uppercase">AI Derived</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  {getRecommendedAgents(selected.readiness).map((agent, i) => (
                    <div key={i} className={`p-4 rounded-2xl border border-${agent.color}-100 bg-${agent.color}-50/30 flex items-center gap-4`}>
                       <div className={`w-10 h-10 rounded-xl bg-${agent.color}-500 text-white flex items-center justify-center text-xl shadow-lg shadow-${agent.color}-500/20`}>
                         {agent.name === "Software Agent" ? "💻" : agent.name === "Marketing Agent" ? "📢" : agent.name === "Audit Agent" ? "🛡️" : "🤝"}
                       </div>
                       <div>
                          <p className="text-xs font-black text-gray-900">{agent.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{agent.role}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Deep Audit Data */}
            <div className="space-y-6 bg-gray-50 p-8 rounded-[40px] border border-gray-100">
               <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Manual Bottlenecks</p>
                  <div className="grid gap-4">
                    <AuditDetailRow label="Primary Frustration" value={selected.readiness.biggestFrustration} />
                    <AuditDetailRow label="Records Kept In" value={selected.readiness.customerRecording.join(', ')} />
                    <AuditDetailRow label="Search Latency" value={selected.readiness.searchTime || 'High/Manual'} />
                    <AuditDetailRow label="Growth Blocker" value={selected.readiness.blockerToGrowth.join(', ') || 'Process Scarcity'} />
                  </div>
               </div>
               
               <div className="pt-4 border-t border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Client's Automation Priority</p>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
                     <span className="text-2xl">⚡</span>
                     <p className="text-sm font-black text-emerald-900 italic leading-relaxed">
                       "{selected.readiness.autoWish || 'Streamlining daily sales'}"
                     </p>
                  </div>
               </div>
            </div>

            {/* Status Management */}
            <div className="space-y-8 pt-4">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Set Project Phase</label>
                  <select 
                    className="w-full p-5 bg-white border-2 border-gray-100 rounded-3xl font-bold text-sm outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
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
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Progress Tracker ({progressDraft}%)</label>
                  <div className="pt-4">
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      className="w-full accent-emerald-500 h-2 bg-gray-100 rounded-full cursor-pointer"
                      value={progressDraft}
                      onChange={e => setProgressDraft(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between mt-2 px-1">
                      <span className="text-[8px] font-black text-gray-300">0%</span>
                      <span className="text-[8px] font-black text-emerald-500">DEPLOYED</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Engineering Internal Log</label>
                <textarea 
                  className="w-full text-sm p-6 bg-white border-2 border-gray-100 rounded-3xl focus:border-emerald-500 outline-none h-32 font-medium"
                  placeholder="Record specific deployment notes, API keys, or staff training progress here..."
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                />
              </div>

              <button 
                onClick={handleSave}
                className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <span>Sync Updates to Pipeline</span>
                <span className="text-xl">🚀</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 h-full min-h-[600px] rounded-[60px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-16 animate-pulse">
            <div className="text-6xl mb-8">📁</div>
            <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Case Selection Required</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto mt-4 font-medium">Select a business from the left to view the full technical audit and begin agent configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AuditDetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-start border-b border-gray-100 pb-2 last:border-0 last:pb-0">
    <p className="text-[9px] font-black text-gray-400 uppercase shrink-0">{label}:</p>
    <p className="text-[11px] font-bold text-gray-900 text-right">{value || 'N/A'}</p>
  </div>
);

export default AdminPanel;
