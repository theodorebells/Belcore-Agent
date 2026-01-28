
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

const STORAGE_KEY = 'belcore_v3_data';

const INITIAL_SME: SMESubmission[] = [
  {
    id: 'demo-1',
    businessName: "Lagos Trend Boutique",
    industry: "Retail (Boutiques/Provisions)",
    contactPerson: "Ifeoma Okafor",
    phoneNumber: "08012345678",
    challenge: "Losing track of customer orders",
    status: "Implementation",
    implementationProgress: 35,
    readiness: {
      customerRecording: ['Paper/Notebook'],
      storageMethod: ['Notebooks'],
      lostLeadsCount: '5-20 (Worrisome)',
      followUpMethod: ['Scrolling through WhatsApp'],
      paymentReminders: ['Manual calls'],
      repetitiveTasks: 'Daily sales balancing',
      orderProcess: ['Writing in book'],
      inventoryMethod: ['Physical Count'],
      searchTime: 'High',
      teamComm: ['WhatsApp'],
      digitalTools: [],
      primaryDevice: 'Smartphone',
      invoicingMethod: ['Handwritten'],
      errorSource: ['Staff typing info'],
      biggestFrustration: 'Losing track of customer orders',
      breakPoint: ['Customer service'],
      blockerToGrowth: ['Manual bookkeeping'],
      autoWish: 'Automated receipts',
      monthlyLoss: '₦50k-₦200k / 15 hrs',
      investmentLevel: 'Medium (Willing to scale)'
    },
    createdAt: new Date().toISOString(),
    adminNotes: "Client currently uses 3 different physical notebooks for sales. High priority for digital sync."
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

      <footer className="bg-white border-t py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="text-center md:text-left">
            <p className="font-black text-gray-900 uppercase tracking-tighter text-lg">BELCORE <span className="text-emerald-600">CAPITAL</span></p>
            <p className="text-[10px] font-bold">Reg RC: 1883654 • Abuja & Lagos, Nigeria</p>
          </div>
          <div className="text-center md:text-right text-[10px] font-bold text-gray-400">
            Proudly supporting 400+ Nigerian Entrepreneurs
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
