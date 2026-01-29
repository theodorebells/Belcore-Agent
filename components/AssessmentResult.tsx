
import React, { useState, useEffect, useRef } from 'react';
import { SMESubmission } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AssessmentResultProps {
  submission: SMESubmission;
  onNext: () => void;
  onAiUpdate: (id: string, aiStrategy: string, recommendedPackage?: string) => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ submission, onNext, onAiUpdate }) => {
  const [loadingPhase, setLoadingPhase] = useState(0); 
  const [isSimulationDone, setIsSimulationDone] = useState(false);
  const [aiBlueprint, setAiBlueprint] = useState<string>(submission.aiStrategy || '');
  const [recommendedPlan, setRecommendedPlan] = useState<string>(submission.recommendedPackage || '');
  const hasFetched = useRef(false);

  const loadingMessages = [
    "Analyzing your operational friction points...",
    "Tracing revenue leaks in your recording process...",
    "Mapping custom automation architecture...",
    "Calculating efficiency ROI for 2026 market...",
    "Signing Executive Diagnostic Brief..."
  ];

  // Logic to show a 2026 date as requested
  const getFormalDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = "January"; // Fixed to Jan as requested
    const year = "2026"; // Fixed to 2026 as requested
    
    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  const cleanText = (text: string) => {
    return text
      .replace(/[#*`]/g, '')
      .replace(/\n\n/g, '\n')
      .trim();
  };

  useEffect(() => {
    let timer: number;
    if (loadingPhase < loadingMessages.length) {
      timer = window.setTimeout(() => setLoadingPhase(p => p + 1), 1600);
    } else {
      setIsSimulationDone(true);
    }
    return () => clearTimeout(timer);
  }, [loadingPhase]);

  useEffect(() => {
    if (submission.aiStrategy || hasFetched.current) return;

    async function getAiAnalysis() {
      try {
        hasFetched.current = true;
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
          Write a formal, VERY EASY TO UNDERSTAND Executive Diagnostic Report FROM: BELCORE CAPITAL LTD (Engineering) TO: ${submission.businessName}.
          
          SUBJECT: Operational Recovery Strategy for ${submission.industry}.
          
          CONTEXT:
          - Location: ${submission.readiness.location}
          - Pain Point: ${submission.readiness.biggestFrustration}
          - Current Manual Method: ${submission.readiness.customerRecording.join(', ')}
          - Their Goal: ${submission.readiness.autoWish}

          INSTRUCTIONS:
          Use plain, bold, professional English. Avoid technical jargon.
          Format the report with these exact headers:
          
          1. THE PROBLEM: Tell them exactly why their current "${submission.readiness.customerRecording[0]}" process is costing them money and causing "${submission.readiness.biggestFrustration}".
          2. THE BELCORE SOLUTION: Name 2 specific softwares we will build for them (e.g. "Auto-WhatsApp Sales Bot" or "Cloud Finance Ledger"). Explain how it solves their pain.
          3. YOUR NEW BUSINESS: Describe how much easier their life will be once this is live. Mention 24/7 accountability.

          END WITH:
          PACKAGE_RECOMMENDATION: [One of: "Core Automation Setup (₦75k)", "Full Digital Workforce Suite", "Custom Enterprise Development"]
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        const rawText = response.text || "";
        let packageRec = "Full Digital Workforce Suite";
        if (rawText.includes("PACKAGE_RECOMMENDATION:")) {
          packageRec = rawText.split("PACKAGE_RECOMMENDATION:")[1].trim().split('\n')[0];
        }
        
        const strategyText = cleanText(rawText.split("PACKAGE_RECOMMENDATION:")[0]);
        setAiBlueprint(strategyText);
        setRecommendedPlan(packageRec);
        // This ensures the brief is sent to the admin panel
        onAiUpdate(submission.id, strategyText, packageRec);
      } catch (error) {
        console.error("AI Analysis failed", error);
        setAiBlueprint(`Diagnostic finalized. We identified that your manual tracking is causing significant revenue leaks. We recommend immediate transition to a Digital Ledger.`);
      }
    }

    getAiAnalysis();
  }, [submission.id]);

  if (!isSimulationDone) {
    return (
      <div className="fixed inset-0 z-[200] bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-xl w-full space-y-12">
           <div className="relative w-32 h-32 mx-auto">
             <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin duration-700"></div>
             <div className="absolute inset-0 flex items-center justify-center text-5xl">📋</div>
           </div>
           
           <div className="space-y-4">
             <h2 className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Belcore Analysis Node</h2>
             <p className="text-white text-2xl sm:text-4xl font-black tracking-tighter leading-tight min-h-[4rem]">
               {loadingMessages[loadingPhase] || "Analysis Finalized."}
             </p>
           </div>

           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-emerald-500 transition-all duration-700 ease-out" 
               style={{ width: `${(loadingPhase / loadingMessages.length) * 100}%` }}
             />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-10 pb-32 animate-in fade-in zoom-in-95 duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gray-900 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Audit Transmission: Verified
        </div>
        <h2 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          Diagnostic <span className="text-emerald-600">Brief.</span>
        </h2>
      </div>

      <div className="bg-white border-y-[12px] sm:border-[12px] border-gray-900 rounded-[40px] sm:rounded-[60px] shadow-3xl overflow-hidden relative">
        {/* Letter Head */}
        <div className="bg-gray-900 p-10 sm:p-14 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="space-y-2 relative z-10">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Confidential Diagnostic</p>
              <h3 className="text-3xl font-black tracking-tighter">LETTER OF STRATEGY</h3>
           </div>
           <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Issue Date</p>
              <p className="text-lg font-mono font-bold text-emerald-400">{getFormalDate()}</p>
           </div>
        </div>

        <div className="p-8 sm:p-16 md:p-20 space-y-20">
          {/* Address Block */}
          <div className="grid md:grid-cols-2 gap-12 border-b border-gray-100 pb-16">
             <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sent From:</p>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-gray-900">BELCORE CAPITAL LTD</p>
                  <p className="text-sm font-medium text-gray-500">Engineering Desk • {submission.readiness.location} Region</p>
                </div>
             </div>
             <div className="space-y-4 text-left md:text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prepared For:</p>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-gray-900">{submission.businessName}</p>
                  <p className="text-sm font-medium text-gray-500">{submission.industry.split(' (')[0]} Excellence Program</p>
                </div>
             </div>
          </div>

          {/* AI Content - Styled for "Easy to Understand" */}
          <div className="space-y-16">
             {!aiBlueprint ? (
               <div className="flex flex-col items-center gap-6 py-20 text-center">
                 <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Finalizing Recommendation...</p>
               </div>
             ) : (
               <div className="prose prose-2xl max-w-none">
                 <div className="whitespace-pre-wrap font-bold text-gray-700 leading-relaxed sm:leading-loose text-xl sm:text-3xl font-['Inter'] tracking-tight">
                   {aiBlueprint}
                 </div>
               </div>
             )}

             <div className="grid md:grid-cols-2 gap-8 pt-16 border-t-4 border-gray-900">
                <div className="bg-emerald-50 p-12 rounded-[50px] border-2 border-emerald-100 space-y-6">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Official Tier Recommendation</p>
                   <div className="space-y-2">
                     <p className="text-4xl font-black text-emerald-900 tracking-tighter">{recommendedPlan}</p>
                     <p className="text-xs text-emerald-600 font-bold italic">Strategy optimized for ${submission.readiness.location} operations.</p>
                   </div>
                </div>
                
                <div className="bg-gray-900 p-12 rounded-[50px] text-white flex flex-col justify-between gap-10 group">
                   <div className="space-y-3">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phase 02</p>
                     <h4 className="text-3xl font-black leading-none">Review Your New <br/>Digital Team</h4>
                   </div>
                   <button 
                     onClick={onNext}
                     className="w-full py-7 bg-emerald-600 text-white rounded-3xl font-black text-xl hover:bg-emerald-500 transition-all active:scale-95 shadow-2xl"
                   >
                     Meet Your Agents →
                   </button>
                </div>
             </div>
          </div>
          
          <div className="pt-12 flex justify-between items-center opacity-40">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-2xl border border-gray-200">B</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Verified Strategic Brief</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">BELCORE CAPITAL RC: 9165301</p>
                </div>
             </div>
             <p className="text-[10px] font-mono font-bold">REF: BC-{submission.id.substring(0,6).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
