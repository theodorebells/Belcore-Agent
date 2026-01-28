
import React, { useState, useEffect } from 'react';
import { AppSection, SMESubmission, SMEStatus } from './types';
import Header from './components/Header';
import Home from './components/Home';
import ReadinessForm from './components/ReadinessForm';
import AssessmentResult from './components/AssessmentResult';
import Comparison from './components/Comparison';
import WorkflowDemo from './components/WorkflowDemo';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Roadmap from './components/Roadmap';
import Services from './components/Services';
import Contact from './components/Contact';
import AIAgents from './components/AIAgents';
import ErrorProofing from './components/ErrorProofing';

const STORAGE_KEY = 'belcore_ph_official_v2';

const INITIAL_SME: SMESubmission[] = [
  {
    id: 'ph-demo-1',
    businessName: "Garden City Logistics",
    industry: "Logistics & Transport",
    contactPerson: "Tamuno George",
    phoneNumber: "08030001111",
    challenge: "Waybill tracking chaos",
    status: "Implementation",
    implementationProgress: 45,
    readiness: {
      location: 'Port Harcourt',
      customerRecording: ['WhatsApp Messages'],
      storageMethod: ['Notebooks', 'Excel'],
      lostLeadsCount: '11-30 (Critical)',
      followUpMethod: ['Scrolling through WhatsApp'],
      paymentReminders: ['Manual calls'],
      repetitiveTasks: 'Manual driver dispatch',
      orderProcess: ['WhatsApp screenshots'],
      inventoryMethod: ['Physical Ledger'],
      searchTime: 'Very High',
      teamComm: ['WhatsApp Group'],
      digitalTools: ['WhatsApp Business'],
      primaryDevice: 'Smartphone',
      invoicingMethod: ['Handwritten'],
      errorSource: ['Typing waybills manually'],
      biggestFrustration: 'Items get lost and drivers argue about payments',
      breakPoint: ['Accountability'],
      blockerToGrowth: ['Process lack'],
      autoWish: 'Digital Waybill System',
      monthlyLoss: '₦120k / 20 hrs',
      investmentLevel: 'Growth (Medium investment)'
    },
    createdAt: new Date().toISOString(),
    adminNotes: "Client wants to stop using carbonized paper for waybills.",
    aiStrategy: "1. PROBLEM: Waybills are on paper and get lost. 2. FIX: Move all waybills to a simple WhatsApp-linked digital form. 3. BENEFIT: No more lost items and faster payments for drivers."
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [submissions, setSubmissions] = useState<SMESubmission[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<SMESubmission | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : INITIAL_SME;
    setSubmissions(data);
    if (data.length > 0) setCurrentSubmission(data[0]);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const handleReadinessSubmit = (entry: any) => {
    const submission: SMESubmission = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New Lead',
      implementationProgress: 0,
      createdAt: new Date().toISOString(),
    };
    setSubmissions([submission, ...submissions]);
    setCurrentSubmission(submission);
    setActiveSection(AppSection.ASSESSMENT_RESULT);
  };

  const updateSubmissionWithAi = (id: string, aiStrategy: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, aiStrategy } : s));
  };

  const updateStatus = (id: string, status: SMEStatus, progress: number, notes?: string) => {
    setSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, status, implementationProgress: progress, adminNotes: notes ?? s.adminNotes } : s
    ));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-['Inter'] selection:bg-emerald-100 selection:text-emerald-900">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {activeSection === AppSection.HOME && <Home onStart={() => setActiveSection(AppSection.READINESS)} />}
        
        {activeSection === AppSection.READINESS && (
          <ReadinessForm 
            onSubmit={handleReadinessSubmit} 
            onCancel={() => setActiveSection(AppSection.HOME)} 
          />
        )}
        
        {activeSection === AppSection.ASSESSMENT_RESULT && currentSubmission && (
          <AssessmentResult 
            submission={currentSubmission} 
            onNext={() => setActiveSection(AppSection.AGENTS)} 
            onBook={() => setActiveSection(AppSection.CONTACT)}
            onAiUpdate={updateSubmissionWithAi}
          />
        )}
        
        {activeSection === AppSection.AGENTS && <AIAgents onNext={() => setActiveSection(AppSection.ERROR_PROOFING)} />}
        {activeSection === AppSection.ERROR_PROOFING && <ErrorProofing onNext={() => setActiveSection(AppSection.SERVICES)} />}
        {activeSection === AppSection.SERVICES && <Services onContact={() => setActiveSection(AppSection.CONTACT)} onWorkflow={() => setActiveSection(AppSection.COMPARISON)} />}
        {activeSection === AppSection.COMPARISON && <Comparison onNext={() => setActiveSection(AppSection.WORKFLOWS)} />}
        {activeSection === AppSection.WORKFLOWS && <WorkflowDemo onNext={() => setActiveSection(AppSection.DASHBOARD)} />}
        {activeSection === AppSection.DASHBOARD && <Dashboard submissions={submissions} />}
        {activeSection === AppSection.ADMIN && <AdminPanel submissions={submissions} onUpdate={updateStatus} />}
        {activeSection === AppSection.ROADMAP && <Roadmap />}
        
        {activeSection === AppSection.CONTACT && (
          <Contact 
            prefillData={currentSubmission} 
            onHome={() => setActiveSection(AppSection.HOME)} 
          />
        )}
      </main>

      <footer className="bg-white border-t py-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left space-y-3">
            <p className="font-black text-gray-900 uppercase tracking-tighter text-3xl">BELCORE <span className="text-emerald-600">CAPITAL</span></p>
            <div className="space-y-1">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Registration RC: 9165301</p>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Regional Branches: Lagos | PH | Abuja | Bayelsa</p>
            </div>
          </div>
          <div className="text-center md:text-right text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] leading-relaxed">
            Software Development • Business Automation • Intranet Design<br/>Helping 400+ Nigerian SMEs Scale Securely.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
