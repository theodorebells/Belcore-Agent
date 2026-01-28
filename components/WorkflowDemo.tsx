
import React, { useState, useEffect, useRef } from 'react';

const WorkflowDemo: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const scenario = {
    businessType: "Oma's Gourmet Bakery (Abuja)",
    description: "Scenario: A customer wants to order 500 cupcakes for a wedding. Manual handling would take 2 hours of chat and notebook entries. Watch Belcore do it in seconds."
  };

  const steps = [
    { 
      title: "Digital Trigger", 
      icon: "📱", 
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
      desc: "The customer scans Oma's QR code on Instagram. They fill a beautiful, simple order form that captures flavor, quantity, and delivery date.", 
      logic: "Frontend Validation Layer -> Device Responsive Form -> Payload Encryption", 
      status: "Order Received",
      detail: "Instead of a messy 'Hello, how much?' chat, the data is captured in a structured format instantly."
    },
    { 
      title: "Cloud Ingestion", 
      icon: "🌩️", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      desc: "Belcore's Engine flys the data into Oma's secure database. It automatically calculates the total price based on today's ingredient costs.", 
      logic: "Airtable Webhook -> Python Serverless Logic -> Price Calculation Script", 
      status: "Data Synchronized",
      detail: "Zero spreadsheets. Oma doesn't have to worry about 'typing into Excel' and making math mistakes."
    },
    { 
      title: "Auto-Communication", 
      icon: "💬", 
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
      desc: "The system triggers a WhatsApp message to the customer with a professional PDF invoice and Oma's bank details for payment.", 
      logic: "WhatsApp Business API -> PDF Generation Engine -> Cloud Storage Link", 
      status: "WhatsApp Dispatched",
      detail: "The customer feels Oma is a world-class brand. The system does the follow-up so Oma can keep baking."
    },
    { 
      title: "Admin Fulfillment", 
      icon: "👨‍🍳", 
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
      desc: "Oma's iPad in the kitchen pings. The baking team sees exactly what to make, when it's due, and where it goes.", 
      logic: "Real-time Dashboard Update -> SSE (Server-Sent Events) -> Task Assignment", 
      status: "Production Started",
      detail: "From a phone click to a baking tray. This is how 1 person can handle 1,000 orders without stress."
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setActiveStep(current => (current + 1) % steps.length);
            return 0;
          }
          return prev + 5;
        });
      }, 150); // Slightly slower for readability
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Live Demo Context</p>
          <h2 className="text-3xl font-black text-gray-900">{scenario.businessType}</h2>
          <p className="text-gray-500 max-w-xl font-medium">{scenario.description}</p>
        </div>
        <button 
          onClick={togglePlay}
          className={`px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 transition-all ${isPlaying ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200 hover:scale-105'}`}
        >
          {isPlaying ? (
            <><span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" /> Stop Simulation</>
          ) : (
            <><span className="text-xl">▶</span> Launch Simulation</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
            className={`p-6 rounded-[32px] text-left border-2 transition-all relative overflow-hidden ${activeStep === idx ? 'bg-white border-emerald-500 shadow-xl scale-105 ring-8 ring-emerald-50' : 'bg-gray-50 border-transparent opacity-60'}`}
          >
            {activeStep === idx && isPlaying && (
              <div 
                className="absolute bottom-0 left-0 h-1.5 bg-emerald-500 transition-all duration-150" 
                style={{ width: `${progress}%` }}
              />
            )}
            <div className="text-4xl mb-4">{s.icon}</div>
            <h4 className="font-black text-xs text-gray-900 uppercase tracking-widest">{s.title}</h4>
            <div className={`mt-2 h-1 rounded-full bg-emerald-100 transition-all ${activeStep === idx && !isPlaying ? 'w-full bg-emerald-500' : 'w-0'}`} />
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="bg-white border border-gray-100 rounded-[50px] overflow-hidden shadow-2xl flex flex-col">
          <div className="h-72 w-full overflow-hidden relative">
             <img 
               src={steps[activeStep].image} 
               alt={steps[activeStep].title} 
               className="w-full h-full object-cover transition-transform duration-1000 scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Step {activeStep + 1} of 4</span>
             </div>
          </div>
          <div className="p-10 space-y-6 flex-grow">
            <h3 className="text-3xl font-black text-gray-900">{steps[activeStep].title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{steps[activeStep].desc}</p>
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
               <p className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-1">Human Outcome</p>
               <p className="text-emerald-900 font-bold leading-relaxed italic">"{steps[activeStep].detail}"</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 flex flex-col">
          <div className="bg-gray-900 text-white p-10 rounded-[50px] shadow-2xl flex-grow relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
               <span className="text-9xl font-black">{steps[activeStep].icon}</span>
             </div>
             <div className="relative z-10 space-y-6">
                <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Technical Logic Execution</p>
                <div className="font-mono text-emerald-100 bg-white/5 p-6 rounded-2xl border border-white/10 text-sm leading-relaxed">
                  <span className="text-gray-500 block mb-4">// Belcore CloudNode Processing...</span>
                  <p className="text-white font-bold">{steps[activeStep].logic}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Service Healthy</span>
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">🚀</div>
                   <div>
                     <p className="text-xs font-black text-gray-400 uppercase">System Status</p>
                     <p className="text-lg font-black text-emerald-400">{steps[activeStep].status}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-emerald-600 p-10 rounded-[50px] text-white flex items-center justify-between">
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Efficiency Gain</p>
               <p className="text-2xl font-black">98% Reduction</p>
               <p className="text-xs font-bold opacity-70 italic">in manual order logging time</p>
             </div>
             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">📈</span>
             </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-10">
        <button 
          onClick={onNext} 
          className="text-gray-900 font-black flex items-center gap-3 mx-auto hover:gap-6 transition-all text-2xl group"
        >
          Check out the Results Dashboard <span className="text-4xl group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default WorkflowDemo;
