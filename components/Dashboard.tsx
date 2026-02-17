
import React from 'react';
import { SMESubmission } from '../types';

const Dashboard: React.FC<{ submissions: SMESubmission[] }> = ({ submissions }) => {
  const latest = submissions[0];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Operational View</p>
          <h2 className="text-4xl font-black text-gray-900">{latest?.businessName || 'Business'} Dashboard</h2>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black text-gray-400 uppercase">Automation Health</p>
          <div className="flex gap-1 justify-end mt-1">
            {[1,2,3,4,5].map(i => <div key={i} className={`w-3 h-1 rounded-full ${i < 5 ? 'bg-emerald-500' : 'bg-gray-200'}`} />)}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase mb-4">Live Leads</p>
          <p className="text-4xl font-black text-gray-900">{submissions.length}</p>
          <p className="text-[10px] text-emerald-600 font-bold mt-2">↑ 12% vs last week</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase mb-4">Pending Follow-ups</p>
          <p className="text-4xl font-black text-emerald-600">08</p>
          <p className="text-[10px] text-gray-400 font-bold mt-2">Auto-triggers scheduled</p>
        </div>
        <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-100">
          <p className="text-[10px] font-black opacity-60 uppercase mb-4 text-white">Time Saved / Month</p>
          <p className="text-4xl font-black">18.5 <span className="text-lg">hrs</span></p>
          <p className="text-[10px] font-bold mt-2">Manual tasks eliminated</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-3xl text-white shadow-xl">
          <p className="text-[10px] font-black opacity-60 uppercase mb-4 text-white">Conversion ROI</p>
          <p className="text-4xl font-black">32%</p>
          <p className="text-[10px] font-bold mt-2 text-emerald-400">Via Automated Follow-up</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b flex justify-between items-center">
              <h3 className="font-black text-gray-900">Recent Automation Activity</h3>
              <button className="text-xs font-bold text-emerald-600">View All Logs</button>
            </div>
            <div className="divide-y">
              <div className="px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">🔄</div>
                  <div>
                    <p className="font-bold text-gray-900">Follow-up: Emeka (Laundry Quote)</p>
                    <p className="text-xs text-gray-400">Re-engagement WhatsApp dispatched at 48h mark.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-emerald-600 uppercase">Triggered</p>
                  <p className="text-xs text-gray-400">Just now</p>
                </div>
              </div>
              {[1,2].map(i => (
                <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">C{i}</div>
                    <div>
                      <p className="font-bold text-gray-900">Customer {i} Onboarding</p>
                      <p className="text-xs text-gray-400">Captured via Belcore WebHook</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-emerald-600 uppercase">Automated</p>
                    <p className="text-xs text-gray-400">{i * 5} mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-black text-gray-900">System Integrity</h3>
          <div className="space-y-4">
             <div>
               <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                 <span>Sync Success</span>
                 <span className="text-emerald-600">100%</span>
               </div>
               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-full" />
               </div>
             </div>
             <div>
               <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                 <span>Re-engagement Score</span>
                 <span className="text-emerald-600">92%</span>
               </div>
               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[92%]" />
               </div>
             </div>
          </div>
          <div className="pt-4 border-t">
             <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
               <p className="text-xs font-bold text-emerald-900 mb-1">Weekly Insight:</p>
               <p className="text-[11px] text-emerald-700 leading-relaxed italic">"The Automated Follow-up System recovered ₦45,000 in 'forgotten' orders this week alone."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
