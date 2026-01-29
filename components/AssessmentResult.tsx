
import React, { useState, useEffect } from 'react';
import { SMESubmission } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AssessmentResultProps {
  submission: SMESubmission;
  onNext: () => void;
  onBook: () => void;
  onAiUpdate: (id: string, aiStrategy: string, recommendedPackage?: string) => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ submission, onNext, onBook, onAiUpdate }) => {
  const [aiBlueprint, setAiBlueprint] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const [recommendedPlan, setRecommendedPlan] = useState<string>('');

  const cleanText = (text: string) => {
    return text
      .replace(/[#*`]/g, '')
      .replace(/\n\n/g, '\n')
      .trim();
  };

  useEffect(() => {
    async function getAiAnalysis() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
          Analyze this SME business audit for BELCORE CAPITAL LTD (Nigeria). 
          Perform a professional diagnostic assessment based on the user's specific answers.
          
          BUSINESS PROFILE:
          - Business Name: ${submission.businessName}
          - Economic Sector: ${submission.industry}
          - Operational Location: ${submission.readiness.location}
          - Reported Monthly Loss: ${submission.readiness.monthlyLoss}
          - Current Record Method: ${submission.readiness.customerRecording.join(', ')}
          - Biggest Operational Pain: ${submission.readiness.biggestFrustration}
          - Specific Automation Wish: ${submission.readiness.autoWish}
          - Main Error Source: ${submission.readiness.errorSource.join(', ')}
          - Existing Tools: ${submission.readiness.digitalTools.join(', ')}
          - Investment Level: ${submission.readiness.investmentLevel}

          Speak in a professional, decisive tone.
          
          You MUST provide 3 clear sections:
          1. THE DIAGNOSIS: Explain exactly why their current manual or semi-digital system is failing and costing them money. Mention their specific frustration.
          2. THE RECOMMENDED FIX: Describe the custom BELCORE automation logic needed (e.g., "We will deploy a WhatsApp-integrated sales engine that eliminates paper tickets").
          3. ECONOMIC IMPACT: Estimate time and Naira savings based on their current monthly loss.
          
          FINALLY, you must recommend exactly ONE of these three packages based on their complexity and investment level:
          - "Core Automation Setup (₦75k)"
          - "Full Digital Workforce Suite"
          - "Custom Enterprise Development"

          Format your entire response like this:
          [Diagnosis text]
          [Plan text]
          [Impact text]
          PACKAGE_RECOMMENDATION: [One of the three names above]
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        const rawText = response.text || "";
        
        // Extract Package Recommendation
        let packageRec = "";
        if (rawText.includes("PACKAGE_RECOMMENDATION:")) {
          packageRec = rawText.split("PACKAGE_RECOMMENDATION:")[1].trim().split('\n')[0];
        } else {
          // Fallback logic if AI fails to format correctly
          if (submission.readiness.investmentLevel.includes("High") || submission.industry.includes("Logistics")) {
            packageRec = "Custom Enterprise Development";
          } else if (submission.readiness.investmentLevel.includes("Strategic")) {
            packageRec = "Core Automation Setup (₦75k)";
          } else {
            packageRec = "Full Digital Workforce Suite";
          }
        }
        
        const strategyText = cleanText(rawText.split("PACKAGE_RECOMMENDATION:")[0]);
        
        setAiBlueprint(strategyText);
        setRecommendedPlan(packageRec);
        
        // Persist the analysis to the main application state
        onAiUpdate(submission.id, strategyText, packageRec);
        
      } catch (error) {
        console.error("AI Analysis failed", error);
        setAiBlueprint(`Our specialized engineers are reviewing the audit for ${submission.businessName}. We have identified critical leaks in your ${submission.industry} workflow, specifically regarding ${submission.readiness.biggestFrustration}. We will proceed with a digital transformation plan.`);
        setRecommendedPlan("Full Digital Workforce Suite");
      } finally {
        setIsLoadingAi(false);
      }
    }

    getAiAnalysis();
  }, [submission]);

  return (
    <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 py-10 pb-32 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Audit Intelligence: Active Analysis
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] sm:leading-none">
          Audit <span className="text-emerald-600">Results.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          BELCORE AI has processed the operational data for <span className="text-gray-900 font-bold">{submission.businessName}</span>.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 p-8 sm:p-10 rounded-[40px] sm:rounded-[50px] text-white shadow-3xl relative overflow-hidden">
             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Integrity Loss Index</p>
             <div className="text-6xl sm:text-8xl font-black text-emerald-400">
               {submission.readiness.lostLeadsCount.includes('Critical') || submission.readiness.lostLeadsCount.includes('10-30') ? '92%' : '65%'}
             </div>
             <p className="mt-8 text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
               Your business is currently operating with <span className="text-white">significant friction</span>. Manual processing of <span className="text-emerald-400">{submission.readiness.autoWish || 'sales'}</span> is your primary bottleneck.
             </p>
          </div>
          
          <div className="bg-emerald-50 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border border-emerald-100">
             <p className="text-[10px] font-black text-emerald-600 uppercase mb-3">Priority Goal</p>
             <p className="text-lg sm:text-xl font-black text-emerald-900 leading-tight">
               "{submission.readiness.autoWish || 'Eliminate manual records'}"
             </p>
          </div>

          {!isLoadingAi && recommendedPlan && (
            <div className="bg-emerald-600 p-8 rounded-[35px] text-white shadow-xl animate-in zoom-in-95 border-b-8 border-emerald-800">
               <p className="text-[10px] font-black opacity-60 uppercase mb-2">Belcore Recommendation</p>
               <p className="text-xl sm:text-2xl font-black">{recommendedPlan}</p>
               <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-bold opacity-60 italic">
                 Recommended based on {submission.industry} profile.
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-8 bg-white p-8 sm:p-12 md:p-14 rounded-[40px] sm:rounded-[60px] border border-gray-100 shadow-2xl space-y-8 relative overflow-hidden">
           <div className="flex justify-between items-center">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter">Diagnostic Analysis</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded-full uppercase">Engineering Spec v1.0</span>
           </div>

           {isLoadingAi ? (
             <div className="py-24 flex flex-col items-center gap-8">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse">Running Diagnostic Scenarios...</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium italic">Calculating ROI and process reclaim for {submission.businessName}</p>
                </div>
             </div>
           ) : (
             <div className="bg-gray-50 p-6 sm:p-10 md:p-12 rounded-[30px] sm:rounded-[40px] border border-gray-100">
                <div className="whitespace-pre-wrap font-bold text-gray-700 leading-relaxed sm:leading-loose text-base sm:text-lg lg:text-xl font-['Inter']">
                  {aiBlueprint}
                </div>
             </div>
           )}

           <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={onNext}
                className="flex-grow py-5 sm:py-7 bg-gray-900 text-white rounded-[1.5rem] sm:rounded-3xl font-black text-lg sm:text-xl shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Accept Analysis & Choose Agents <span className="text-2xl">→</span>
              </button>
           </div>
           <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">Powered by Belcore Strategic Intelligence Engine</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
