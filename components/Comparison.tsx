
import React from 'react';
import { WORKFLOW_COMPARISON } from '../constants';

const Comparison: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-900">Efficiency Transformation</h2>
        <p className="text-gray-500 max-w-2xl mx-auto italic">How BELCORE moves your business from slow manual logs to instant digital flows.</p>
      </div>

      <div className="grid gap-6">
        {WORKFLOW_COMPARISON.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm grid md:grid-cols-3 items-center gap-8">
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-1">{item.task}</h3>
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-md uppercase tracking-widest">{item.benefit}</span>
            </div>

            <div className="bg-red-50/30 p-4 rounded-2xl border border-red-50">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">MANUAL (Paper/Excel)</p>
              <p className="text-sm font-bold text-red-900">{item.manual.process}</p>
              <p className="text-xs text-red-500 mt-1">🕒 Time: {item.manual.time}</p>
            </div>

            <div className="bg-emerald-50/30 p-4 rounded-2xl border border-emerald-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rotate-45 translate-x-6 -translate-y-6"></div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">AUTOMATED (Belcore)</p>
              <p className="text-sm font-bold text-emerald-900">{item.automated.process}</p>
              <p className="text-xs text-emerald-600 mt-1">⚡ Time: {item.automated.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={onNext}
          className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          See Live Workflow Logic →
        </button>
      </div>
    </div>
  );
};

export default Comparison;
