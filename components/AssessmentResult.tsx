
import React, { useState, useEffect } from 'react';
import { SMESubmission } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AssessmentResultProps {
  submission: SMESubmission;
  onNext: () => void;
  onBook: () => void;
  onAiUpdate: (id: string, aiStrategy: string) => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ submission, onNext, onBook, onAiUpdate }) => {
  const [aiBlueprint, setAiBlueprint] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(true);

  const cleanText = (text: string) => {
    // Remove Markdown symbols like ###, **, and *
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
          As a friendly Business Consultant from BELCORE CAPITAL LTD, review this business's audit. 
          Speak in VERY SIMPLE, PLAIN ENGLISH. Do not use complex dictionary words. Do not use hashtags (#) or stars (*) or any code symbols. 
          
          BUSINESS INFO:
          - Business: ${submission.businessName}
          - Located in: ${submission.readiness.location}
          - Biggest Headache: ${submission.readiness.biggestFrustration}
          - Dream Fix: ${submission.readiness.autoWish}
          
          Write 3 short, clear points:
          1. THE PROBLEM (Explain simply where they are losing money or time).
          2. THE BELCORE FIX (Explain simply what tool or automation we will build for them).
          3. THE BENEFIT (Explain simply how life gets better for the owner).
          
          IMPORTANT: Use ONLY plain text. No special formatting.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        const formattedText = cleanText(response.text || "");
        setAiBlueprint(formattedText);
        
        // Sync to Admin Back Office
        onAiUpdate(submission.id, formattedText);
        
      } catch (error) {
        console.error("AI Analysis failed", error);
        setAiBlueprint("Our AI is currently busy. Don't worry, our engineers will review your audit manually and call you shortly.");
      } finally {
        setIsLoadingAi(false);
      }
    }

    getAiAnalysis();
  }, [submission]);

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-10 pb-32 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Diagnostic Check: Done
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          The <span className="text-emerald-600">Belcore</span> Fix.
        </h2>
        <p className="text-lg text-gray-500 font-medium">Business Audit for {submission.businessName} in {submission.readiness.location}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 p-10 rounded-[50px] text-white shadow-3xl relative overflow-hidden">
             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Money & Time Leaks</p>
             <div className="text-8xl font-black text-emerald-400">85%</div>
             <p className="mt-8 text-sm text-gray-400 leading-relaxed font-medium">
               This score means your business is leaking a lot of time. You are likely wasting <span className="text-white">15 hours every week</span> on manual work that a machine can do.
             </p>
             <div className="absolute -bottom-6 -right-6 text-9xl opacity-10">🛡️</div>
          </div>
          
          <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100">
             <p className="text-[10px] font-black text-emerald-600 uppercase mb-3">Next Action</p>
             <p className="text-xl font-black text-emerald-900 leading-tight">
               Fixing your "{submission.readiness.autoWish || 'Manual Records'}"
             </p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-10 md:p-14 rounded-[60px] border border-gray-100 shadow-2xl space-y-8 relative overflow-hidden">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Your Simple Fix</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full uppercase">AI Analysis</span>
           </div>

           {isLoadingAi ? (
             <div className="py-20 flex flex-col items-center gap-6">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Writing your plan...</p>
             </div>
           ) : (
             <div className="bg-gray-50 p-8 md:p-12 rounded-[40px] border border-gray-100">
                <div className="whitespace-pre-wrap font-bold text-gray-700 leading-loose text-lg sm:text-xl">
                  {aiBlueprint}
                </div>
             </div>
           )}

           <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-gray-100 rounded-3xl">
                 <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Team Assigned</p>
                 <p className="text-sm font-bold text-gray-900">3 Belcore Agents Ready</p>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-3xl">
                 <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Start Working</p>
                 <p className="text-sm font-bold text-gray-900">Within 3 Days</p>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onBook}
                className="flex-grow py-6 bg-emerald-600 text-white rounded-3xl font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all active:scale-95"
              >
                Book My Deployment →
              </button>
              <button 
                onClick={onNext}
                className="px-12 py-6 bg-gray-900 text-white rounded-3xl font-black"
              >
                Meet My Agents
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
