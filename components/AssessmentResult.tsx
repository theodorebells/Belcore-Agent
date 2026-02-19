
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
    return text
      .replace(/\*\*/g, '')
      .replace(/[#*`]/g, '')
      .replace(/^\d+\.\s+(INTRODUCTION|DIAGNOSIS|SOLUTION|STRATEGY):?/gi, '')
      .replace(/^\d+\.\s+/gm, '') 
      .replace(/^INTRODUCTION:?/gi, '')
      .replace(/PACKAGE_RECOMMENDATION:.*$/s, '')
      .trim();
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
          Analyze ${submission.businessName} in the ${submission.industry} sector.
          
          MANDATORY STRUCTURE:
          - START IMMEDIATELY with the sentence: "The BELCORE Engineering Team welcomes you to this strategic review..."
          - DO NOT USE ANY NUMBERING (e.g., No 1., 2., 3., etc).
          - DO NOT USE SECTION HEADERS like "INTRODUCTION", "DIAGNOSIS", or "CONCLUSION".
          - Focus on their primary pain: "${submission.readiness.biggestFrustration}".
          - Propose a blend of these modules: [${availableModules}].
          - Speak professionally in plain text paragraphs.
          - End with exactly: PACKAGE_RECOMMENDATION: [Full Digital Workforce Suite]
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
        onAiUpdate(submission.id, strategyText, packageRec);
      } catch (error) {
        const fallback = `The BELCORE Engineering Team welcomes you to this strategic review. Our diagnostic indicates that manual processes at ${submission.businessName} are currently limiting scale. We recommend an immediate transition to a cloud-synchronized digital ledger to unify your operations and recover lost time.`;
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

        <div className="p-6 sm:p-20 space-y-12">
          <div className="whitespace-pre-wrap font-bold text-gray-700 leading-relaxed text-lg sm:text-2xl font-['Inter'] tracking-tight">
            {aiBlueprint || "Compiling strategic analysis..."}
          </div>

          <div className="pt-10 border-t-4 border-gray-900 flex justify-end">
             <button onClick={onNext} className="px-12 py-6 bg-emerald-600 text-white rounded-2xl font-black text-xl hover:bg-emerald-500 transition-all active:scale-95 shadow-2xl">
               Proceed to Investment Plans →
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
