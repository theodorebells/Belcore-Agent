
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
    "Bella is initiating sector-specific scan...",
    "Scanning " + submission.industry + " for operational leaks...",
    "Analyzing frustration: '" + submission.readiness.biggestFrustration + "'",
    "Bella is calculating your 2026 efficiency ROI...",
    "Finalizing the Executive Diagnostic Brief..."
  ];

  // Logic to show a dynamic date but pinned in 2026
  const getFormalDate = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const year = "2026"; 
    
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
      .replace(/PACKAGE_RECOMMENDATION:.*$/s, '') // Ensure package rec isn't in main text
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
        
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
          throw new Error("API_KEY_MISSING");
        }

        const ai = new GoogleGenAI({ apiKey });
        
        const context = `
          BUSINESS: ${submission.businessName}
          SECTOR: ${submission.industry}
          LOCATION: ${submission.readiness.location}
          DATA HANDLING: ${submission.readiness.customerRecording.join(', ')} / ${submission.readiness.storageMethod.join(', ')}
          BILLING: ${submission.readiness.invoicingMethod.join(', ')}
          PRIMARY FRUSTRATION: ${submission.readiness.biggestFrustration}
          DESIRED AUTOMATION: ${submission.readiness.autoWish}
          ERRORS REPORTED: ${submission.readiness.errorSource.join(', ')}
        `;

        const prompt = `
          You are Bella, Lead Digital Architect at BELCORE CAPITAL LTD. 
          Write a deeply analytical Diagnostic Brief for ${submission.businessName} operating in the ${submission.industry} sector.
          
          REQUIRED STRUCTURE:
          - Intro: Start exactly with "Hi there, this is Bella from the Belcore Engineering Team. We've carefully analyzed the operations at ${submission.businessName} and we've identified exactly where your business is losing momentum."
          
          - SECTION 1: THE DIAGNOSIS. 
            Analyze why their specific setup (${submission.readiness.customerRecording.join(', ')}) is causing the revenue leak/frustration of "${submission.readiness.biggestFrustration}". 
            Explain how manual errors in the ${submission.industry} sector specifically lead to hidden losses.

          - SECTION 2: THE ACTION RUNDOWN. 
            Recommend a specific 3-step solution. 
            Identify which BELCORE AI Agents they need (Software Specialist, Growth Consultant, Risk Strategist, or Client Manager).
            Describe the custom software we will build for them (e.g., "A customized ${submission.industry} Digital Ledger" or "Automated Payment Chaser").

          - SECTION 3: THE 2026 OUTLOOK. 
            Describe the ROI. Tell them how much easier their management will be by late 2026 once automation is live.

          STRICT RULES:
          - Use high-impact business English. No technical jargon.
          - Be specific to the ${submission.industry} industry.
          - No markdown stars or hashtags.
          - End with exactly: PACKAGE_RECOMMENDATION: [One of: Core Automation Setup (₦75k), Full Digital Workforce Suite, or Custom Enterprise Development]
          
          Context Data:
          ${context}
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
        
        const strategyText = cleanText(rawText);
        setAiBlueprint(strategyText);
        setRecommendedPlan(packageRec);
        onAiUpdate(submission.id, strategyText, packageRec);
      } catch (error) {
        console.error("Bella Analysis Error:", error);
        const fallback = `Hi there, this is Bella from Belcore. We've analyzed ${submission.businessName} and identified that manual tracking in ${submission.industry} is your biggest bottleneck. To solve your issue with ${submission.readiness.biggestFrustration}, we recommend deploying our Software Specialist and Risk Strategist agents immediately via the Full Digital Workforce Suite. (Note: Please ensure the API_KEY environment variable is configured for full AI analysis).`;
        setAiBlueprint(fallback);
        onAiUpdate(submission.id, fallback, "Full Digital Workforce Suite");
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
             <div className="absolute inset-0 flex items-center justify-center text-5xl">👩‍💻</div>
           </div>
           
           <div className="space-y-4">
             <h2 className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Bella Engineering Mode</h2>
             <p className="text-white text-2xl sm:text-4xl font-black tracking-tighter leading-tight min-h-[4rem]">
               {loadingMessages[loadingPhase] || "Analysis Finalized."}
             </p>
           </div>

           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-emerald-500 transition-all duration-700 ease-out" 
               style={{ width: `${((loadingPhase + 1) / loadingMessages.length) * 100}%` }}
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
          Bella's Transmission: Verified
        </div>
        <h2 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          Diagnostic <span className="text-emerald-600">Brief.</span>
        </h2>
      </div>

      <div className="bg-white border-y-[12px] sm:border-[12px] border-gray-900 rounded-[40px] sm:rounded-[60px] shadow-3xl overflow-hidden relative">
        <div className="bg-gray-900 p-10 sm:p-14 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="space-y-2 relative z-10">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Confidential Engineering Analysis</p>
              <h3 className="text-3xl font-black tracking-tighter">LETTER OF STRATEGY</h3>
           </div>
           <div className="relative z-10 text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Audit Date</p>
              <p className="text-lg font-mono font-bold text-emerald-400 tracking-tight">{getFormalDate()}</p>
           </div>
        </div>

        <div className="p-8 sm:p-16 md:p-20 space-y-20">
          <div className="grid md:grid-cols-2 gap-12 border-b border-gray-100 pb-16">
             <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">From:</p>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-gray-900 underline decoration-emerald-500 underline-offset-8 decoration-4">Bella @ Belcore</p>
                  <p className="text-sm font-medium text-gray-500">Lead Engineering Desk • 2026 Strategy Cycle</p>
                </div>
             </div>
             <div className="space-y-4 text-left md:text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">To:</p>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-gray-900">{submission.businessName}</p>
                  <p className="text-sm font-medium text-gray-500">{submission.industry.split(' (')[0]} Excellence Program</p>
                </div>
             </div>
          </div>

          <div className="space-y-16">
             {!aiBlueprint ? (
               <div className="flex flex-col items-center gap-6 py-20 text-center">
                 <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Finalizing Diagnostic Brief...</p>
               </div>
             ) : (
               <div className="prose prose-2xl max-w-none">
                 <div className="whitespace-pre-wrap font-bold text-gray-700 leading-relaxed sm:leading-snug text-xl sm:text-2xl font-['Inter'] tracking-tight">
                   {aiBlueprint}
                 </div>
               </div>
             )}

             <div className="grid md:grid-cols-2 gap-8 pt-16 border-t-4 border-gray-900">
                <div className="bg-emerald-50 p-12 rounded-[50px] border-2 border-emerald-100 space-y-6">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Tier Recommendation</p>
                   <div className="space-y-2">
                     <p className="text-4xl font-black text-emerald-900 tracking-tighter">{recommendedPlan}</p>
                     <p className="text-xs text-emerald-600 font-bold italic">Based on your {submission.industry} audit.</p>
                   </div>
                </div>
                
                <div className="bg-gray-900 p-12 rounded-[50px] text-white flex flex-col justify-between gap-10">
                   <div className="space-y-3">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Step 02</p>
                     <h4 className="text-3xl font-black leading-none">Review Your <br/>Recommended Agents</h4>
                   </div>
                   <button 
                     onClick={onNext}
                     className="w-full py-7 bg-emerald-600 text-white rounded-3xl font-black text-xl hover:bg-emerald-500 transition-all active:scale-95 shadow-2xl"
                   >
                     Meet My Squad →
                   </button>
                </div>
             </div>
          </div>
          
          <div className="pt-12 flex justify-between items-center opacity-40">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-2xl border border-gray-200">B</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Certified Strategy Brief</p>
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
