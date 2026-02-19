
import React, { useState } from 'react';
import { SMESubmission } from '../types';

interface PaymentProps {
  submission: SMESubmission | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const Payment: React.FC<PaymentProps> = ({ submission, onSuccess, onCancel }) => {
  const [method, setMethod] = useState<'card' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment connection and standby
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  if (isPaid) {
    return (
      <div className="max-w-4xl mx-auto py-20 sm:py-24 text-center space-y-12 animate-in zoom-in-95 px-4">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-emerald-600 text-white rounded-full flex items-center justify-center text-6xl sm:text-8xl mx-auto shadow-2xl animate-bounce">
          ✓
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">TRANSACTION VERIFIED</p>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none">Commitment Received.</h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed font-bold">
            Your payment was successful. Our engineering team will contact you within <span className="text-emerald-600">1-3 business days</span> to finalize your implementation.
          </p>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 max-w-lg mx-auto">
             <p className="text-sm font-bold text-emerald-800">
               Check your email! We've sent your login credentials so you can track your project's progress in real-time on your dashboard.
             </p>
          </div>
        </div>
        <div className="pt-6 flex flex-col items-center gap-6">
           <button 
             onClick={onSuccess} 
             className="w-full sm:w-auto px-12 sm:px-16 py-6 sm:py-7 bg-gray-900 text-white rounded-2xl sm:rounded-3xl font-black shadow-2xl hover:bg-black transition-all text-base sm:text-lg hover:scale-105 active:scale-95"
           >
             Return to Homepage
           </button>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Ref: BC-PAY-{submission?.id.toUpperCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-6">
      <div className="text-center space-y-4 mb-12">
        <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">BELCORE CAPITAL • VERIFICATION</p>
        <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter">Commitment Deposit.</h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">To finalize your engineering briefing and assign a lead consultant, a commitment fee of ₦10,000 is required.</p>
      </div>

      <div className="bg-white rounded-[60px] border border-gray-100 shadow-3xl overflow-hidden grid lg:grid-cols-2">
        <div className="p-12 sm:p-16 bg-gray-900 text-white space-y-10">
           <div className="space-y-2">
             <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest opacity-50">Recipient Node</p>
             <h3 className="text-2xl font-black uppercase tracking-tighter">BELCORE CAPITAL LTD</h3>
           </div>
           
           <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                 <span className="text-gray-400 font-bold uppercase text-[10px]">Service Unit</span>
                 <span className="font-black text-sm uppercase">{submission?.recommendedPackage || 'Digital Workforce'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                 <span className="text-gray-400 font-bold uppercase text-[10px]">Reference ID</span>
                 <span className="font-black text-sm uppercase">BC-PAY-{submission?.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                 <span className="text-emerald-400 font-black uppercase text-xl">Total Due</span>
                 <span className="font-black text-4xl tracking-tighter">₦10,000.00</span>
              </div>
           </div>

           <div className="p-6 bg-white/5 rounded-3xl border border-white/10 italic text-[11px] text-gray-400 leading-relaxed">
             "This deposit is credited towards your final implementation cost and serves as a verification of intent for our engineering team."
           </div>
        </div>

        <div className="p-12 sm:p-16 space-y-10">
           <div className="flex gap-4">
              <button onClick={() => setMethod('card')} className={`flex-grow py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${method === 'card' ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200'}`}>Card Payment</button>
              <button onClick={() => setMethod('transfer')} className={`flex-grow py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${method === 'transfer' ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200'}`}>Bank Transfer</button>
           </div>

           {method === 'card' ? (
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Card Number</label>
                  <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold" placeholder="5399 •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry</label>
                     <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold" placeholder="MM/YY" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV</label>
                     <input className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold" placeholder="•••" />
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 text-center space-y-4">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Transfer Details</p>
                <div className="space-y-1">
                   <p className="text-gray-500 font-bold uppercase text-[10px]">Bank Name</p>
                   <p className="text-xl font-black text-gray-900 uppercase">WEMA BANK / ALAT</p>
                </div>
                <div className="space-y-1">
                   <p className="text-gray-500 font-bold uppercase text-[10px]">Account Number</p>
                   <p className="text-3xl font-black text-emerald-700 tracking-tighter">0123456789</p>
                </div>
                <p className="text-[10px] font-bold text-emerald-600 italic">"Please wait for verification after sending."</p>
             </div>
           )}

           <div className="space-y-4 pt-6">
              <button onClick={handlePay} disabled={isProcessing} className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-4">
                 {isProcessing ? (
                   <><span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span> Verifying...</>
                 ) : (
                   `Authorize ₦10,000 →`
                 )}
              </button>
              <button onClick={onCancel} className="w-full py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors">Cancel Transaction</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
