
import React, { useState, useEffect } from 'react';

const ErrorProofing: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [errorSim, setErrorSim] = useState('idle'); // idle, typing, error, fixed

  useEffect(() => {
    let timeout: number;
    if (errorSim === 'idle') {
      timeout = window.setTimeout(() => setErrorSim('typing'), 2000);
    } else if (errorSim === 'typing') {
      timeout = window.setTimeout(() => setErrorSim('error'), 3000);
    } else if (errorSim === 'error') {
      timeout = window.setTimeout(() => setErrorSim('fixed'), 4000);
    } else if (errorSim === 'fixed') {
      timeout = window.setTimeout(() => setErrorSim('idle'), 5000);
    }
    return () => clearTimeout(timeout);
  }, [errorSim]);

  return (
    <div className="space-y-16 py-10 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-[10px] font-black rounded-full uppercase tracking-widest">Security & Accuracy</div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Zero-Error Operations</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Staff make mistakes. Machines don't. We build "Guardrails" into your business to catch errors before they cost you money.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Why Manual Systems Fail</h3>
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 font-bold text-xs">1</div>
                    <p className="text-gray-500 text-sm font-medium">Staff miscounts inventory in the notebook.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 font-bold text-xs">2</div>
                    <p className="text-gray-500 text-sm font-medium">Wrong price sent to customer on WhatsApp.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 font-bold text-xs">3</div>
                    <p className="text-gray-500 text-sm font-medium">Forgotten customer orders leads to refund losses.</p>
                 </div>
              </div>
           </div>

           <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 space-y-4">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">The Belcore Fix</p>
              <p className="text-emerald-900 font-bold leading-relaxed">
                Our Logic Agents cross-check every entry. If a staff member enters an impossible number (like ₦5 for a ₦5,000 item), the system blocks the entry and pings the owner.
              </p>
           </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-[60px] border border-gray-200 shadow-inner min-h-[400px] flex flex-col justify-center">
           <div className="bg-white p-8 rounded-[40px] shadow-2xl space-y-6 border border-gray-100 relative overflow-hidden transition-all duration-500">
              {errorSim === 'error' && <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>}
              
              <div className="flex justify-between items-center border-b pb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">🛒</div>
                   <p className="font-black text-gray-900">Staff Sales Entry</p>
                 </div>
                 <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase transition-all ${errorSim === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                    {errorSim === 'idle' && 'Waiting...'}
                    {errorSim === 'typing' && 'Processing...'}
                    {errorSim === 'error' && 'Mistake Detected'}
                    {errorSim === 'fixed' && 'System Corrected'}
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Product: 20-Litre Water Jar</p>
                    <div className="h-14 bg-gray-50 rounded-2xl flex items-center px-6 font-mono font-bold text-lg text-gray-900">
                      {errorSim === 'idle' && ''}
                      {errorSim === 'typing' && 'Typing amount...'}
                      {errorSim === 'error' && <span className="text-red-500">₦2.00</span>}
                      {errorSim === 'fixed' && <span className="text-emerald-600">₦2,000.00</span>}
                    </div>
                 </div>

                 <div className={`p-5 rounded-2xl border transition-all duration-500 ${errorSim === 'error' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                    {errorSim === 'error' ? (
                       <div className="flex gap-4 items-center animate-bounce">
                          <span className="text-2xl">⚠️</span>
                          <div>
                            <p className="text-[10px] font-black text-red-700 uppercase">Belcore Guardrail</p>
                            <p className="text-xs font-bold text-red-900">Entry blocked: Price is 99% below average.</p>
                          </div>
                       </div>
                    ) : errorSim === 'fixed' ? (
                       <div className="flex gap-4 items-center">
                          <span className="text-2xl">🛡️</span>
                          <div>
                            <p className="text-[10px] font-black text-emerald-700 uppercase">Smart Correct</p>
                            <p className="text-xs font-bold text-emerald-900">Corrected to standard price (₦2,000).</p>
                          </div>
                       </div>
                    ) : (
                       <p className="text-xs text-gray-400 font-medium italic">Logic engine monitoring input for anomalies...</p>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <button 
          onClick={onNext}
          className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
        >
          See Pricing & Plans →
        </button>
      </div>
    </div>
  );
};

export default ErrorProofing;
