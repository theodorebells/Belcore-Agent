
import React, { useState, useEffect, useRef } from 'react';
import { SMESubmission } from '../types';
import { GoogleGenAI } from "@google/genai";
import { AUTOMATION_SOLUTIONS } from '../constants';

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
    "BELCORE CONSULTANTS: Initiating sector-specific scan...",
    "Scanning " + submission.industry + " for operational leaks...",
    "Analyzing frustration: '" + (submission.readiness.biggestFrustration || "General Friction") + "'",
    "Calculating ROI for 2026 digital workforce...",
    "Finalizing the Executive Diagnostic Brief..."
  ];

  const getFormalDate = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
    // Remove markdown bolding (**) and other markers as requested
    return text.replace(/\*\*/g, '').replace(/[#*`]/g, '').replace(/PACKAGE_RECOMMENDATION:.*$/s, '').trim();
  };

  useEffect(() => {
    let timer: number;
    if (loadingPhase < loadingMessages.length) {
      timer = window.setTimeout(() => setLoadingPhase(p => p + 1), 1000);
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
        if (!apiKey) throw new Error("Connection Surge");

        const ai = new GoogleGenAI({ apiKey });
        const availableModules = AUTOMATION_SOLUTIONS.map(s => s.title).join(", ");
        
        const prompt = `
          You are the BELCORE CONSULTANTS Strategic Engine.
          Analyze ${submission.businessName} in the ${submission.industry} sector for BELCORE CAPITAL LTD (RC: 9165301).
          
          STRUCTURE:
          1. INTRODUCTION: Start with a professional 1-sentence welcome from the BELCORE Engineering Team regarding this diagnostic review for 2026.
          2. THE DIAGNOSIS: Explain how manual tracking (${submission.readiness.customerRecording.join(', ')}) causes "${submission.readiness.biggestFrustration}".
          3. SYSTEM RECOMMENDATION: Pick 2 or more Belcore modules [${availableModules}] that solve the problem.
          4. THE ACTION RUNDOWN: Give a 3-step action plan for deployment.
          5. THE 2026 OUTLOOK: Expected efficiency gains.
          
          Rules: DO NOT USE BOLD MARKERS (like **). Use plain professional text only.
          End with: PACKAGE_RECOMMENDATION: [Full Digital Workforce Suite or Core Automation Setup]
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        const rawText = response.text || "";
        let packageRec = "Full Digital Workforce Suite";
        
        // If the AI recommended more than 1 module/core plan, or uses "multiple", suggest the Full Suite
        if (rawText.toLowerCase().includes("multiple") || rawText.split(',').length > 3) {
            packageRec = "Full Digital Workforce Suite";
        }

        if (rawText.includes("PACKAGE_RECOMMENDATION:")) {
          packageRec = rawText.split("PACKAGE_RECOMMENDATION:")[1].trim().split('\n')[0];
        }
        
        const strategyText = cleanText(rawText);
        setAiBlueprint(strategyText);
        setRecommendedPlan(packageRec);
        onAiUpdate(submission.id, strategyText, packageRec);
      } catch (error) {
        const fallback = `The BELCORE Engineering Team welcomes you to this strategic review. Our engineers identify that manual record-keeping is the primary friction point for ${submission.businessName}. We recommend deploying the Full Digital Workforce Suite immediately to seal revenue leaks and modernize your operations for 2026.`;
        setAiBlueprint(fallback);
        onAiUpdate(submission.id, fallback, "Full Digital Workforce Suite");
      }
    }
    getAiAnalysis();
  }, [submission.id]);

  if (!isSimulationDone) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center space-y-12 animate-in fade-in duration-500 px-4">
         <div className="relative w-24 h-24 mx-auto">
           <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin duration-700"></div>
           <div className="absolute inset-0 flex items-center justify-center text-3xl">📡</div>
         </div>
         <div className="space-y-4">
           <h2 className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">BELCORE CONSULTANTS • Engineering Scan</h2>
           <p className="text-gray-900 text-2xl sm:text-4xl font-black tracking-tighter leading-tight min-h-[4rem]">
             {loadingMessages[loadingPhase] || "Audit Finalized."}
           </p>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16 py-6 sm:py-10 pb-32 animate-in fade-in zoom-in-95 duration-1000 px-4">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gray-900 text-emerald-400 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest uppercase border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          BELCORE CONSULTANTS: Verification Complete
        </div>
        <h2 className="text-4xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          Diagnostic <span className="text-emerald-600">Brief.</span>
        </h2>
      </div>

      <div className="bg-white border-4 sm:border-[12px] border-gray-900 rounded-[30px] sm:rounded-[60px] shadow-3xl overflow-hidden relative">
        <div className="bg-gray-900 p-8 sm:p-14 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
           <div className="space-y-2 relative z-10">
              <p className="text-[9px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Confidential Case ID: BC-PH-2026-{submission.id.toUpperCase()}</p>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">Engineering Strategy Letter</h3>
           </div>
           <div className="relative z-10 text-right w-full sm:w-auto">
              <p className="text-sm sm:text-lg font-mono font-bold text-emerald-400 tracking-tight">{getFormalDate()}</p>
           </div>
        </div>

        <div className="p-6 sm:p-20 space-y-12 sm:space-y-20">
          <div className="whitespace-pre-wrap font-bold text-gray-700 leading-relaxed text-lg sm:text-2xl font-['Inter'] tracking-tight">
            {aiBlueprint || "Compiling strategic analysis..."}
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 pt-10 sm:pt-16 border-t-4 border-gray-900">
            <div className="bg-emerald-50 p-8 sm:p-12 rounded-[30px] sm:rounded-[50px] border-2 border-emerald-100 space-y-4">
               <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Recommended Deployment Tier</p>
               <p className="text-2xl sm:text-4xl font-black text-emerald-900 tracking-tighter leading-none">{recommendedPlan || "Full Digital Workforce Suite"}</p>
            </div>
            
            <div className="bg-gray-900 p-8 sm:p-12 rounded-[30px] sm:rounded-[50px] text-white flex flex-col justify-between gap-8 sm:gap-10">
               <div className="space-y-2 sm:space-y-3">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Consultancy Phase</p>
                 <h4 className="text-2xl sm:text-3xl font-black leading-tight">Proceed to Implementation</h4>
               </div>
               <button onClick={onNext} className="w-full py-6 sm:py-7 bg-emerald-600 text-white rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl hover:bg-emerald-500 transition-all active:scale-95 shadow-2xl">
                 Continue to Reservation →
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
