
import React, { useState, useEffect } from 'react';
import { AppSection, SMESubmission, SMEStatus, User } from './types';
import { storage } from './services/db';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import ReadinessForm from './components/ReadinessForm';
import AssessmentResult from './components/AssessmentResult';
import AIAgents from './components/AIAgents';
import Services from './components/Services';
import Payment from './components/Payment';
import Comparison from './components/Comparison';
import WorkflowDemo from './components/WorkflowDemo';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Roadmap from './components/Roadmap';
import Contact from './components/Contact';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<SMESubmission[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<SMESubmission | null>(null);

  // Global Scroll to Top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  useEffect(() => {
    const db = storage.get();
    setSubmissions(db.submissions);
    
    const savedUser = localStorage.getItem('belcore_session');
    if (savedUser) setUser(JSON.parse(savedUser));

    const refreshData = () => {
      const updatedDb = storage.get();
      setSubmissions(updatedDb.submissions);
    };
    window.addEventListener('belcore_lead_added', refreshData);
    return () => window.removeEventListener('belcore_lead_added', refreshData);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('belcore_session', JSON.stringify(u));
    
    // Role-based routing
    if (u.role === 'ADMIN') {
      setActiveSection(AppSection.ADMIN);
    } else if (u.role === 'STAFF') {
      setActiveSection(AppSection.DASHBOARD);
    } else {
      setActiveSection(AppSection.DASHBOARD);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('belcore_session');
    setUser(null);
    setActiveSection(AppSection.HOME);
  };

  const handleReadinessSubmit = (entry: any) => {
    const submission: SMESubmission = {
      ...entry,
      id: Math.random().toString(36).substr(2, 6),
      status: 'New Lead',
      source: 'audit',
      implementationProgress: 0,
      createdAt: new Date().toISOString(),
      depositPaid: false,
    };
    storage.addSubmission(submission);
    setSubmissions(storage.get().submissions);
    setCurrentSubmission(submission);
    // Explicit sequence: Audit -> Agents
    setActiveSection(AppSection.AGENTS);
  };

  const handleAgentsNext = () => {
    if (currentSubmission) {
      setActiveSection(AppSection.ASSESSMENT_RESULT);
    } else {
      setActiveSection(AppSection.READINESS);
    }
  };

  const handlePaymentSuccess = () => {
    if (currentSubmission) {
      storage.updateSubmission(currentSubmission.id, { depositPaid: true, status: 'Assessment' });
      storage.addTransaction({
        id: `TX-${Date.now()}`,
        businessId: currentSubmission.id,
        businessName: currentSubmission.businessName,
        amount: 10000,
        date: new Date().toISOString(),
        status: 'Paid',
        plan: 'Commitment Deposit'
      });
      setSubmissions(storage.get().submissions);
      setActiveSection(AppSection.HOME);
    }
  };

  const updateSubmissionWithAi = (id: string, aiStrategy: string, recommendedPackage?: string) => {
    storage.updateSubmission(id, { aiStrategy, recommendedPackage });
    setSubmissions(storage.get().submissions);
    const sub = storage.get().submissions.find(s => s.id === id);
    if (sub) setCurrentSubmission(sub);
  };

  const updateStatus = (id: string, status: SMEStatus, progress: number, notes?: string) => {
    storage.updateSubmission(id, { status, implementationProgress: progress, adminNotes: notes });
    setSubmissions(storage.get().submissions);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-['Inter'] selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <Header activeSection={activeSection} onNavigate={setActiveSection} user={user} onLogout={handleLogout} />

      {/* Padding top accounts for the fixed header */}
      <main className="flex-grow container mx-auto px-4 pb-12 pt-24 sm:pt-32 max-w-6xl relative">
        {activeSection === AppSection.HOME && (
          <Home 
            onStart={() => setActiveSection(AppSection.READINESS)} 
            onAgents={() => setActiveSection(AppSection.AGENTS)} 
          />
        )}
        {activeSection === AppSection.LOGIN && <LoginPage onLogin={handleLogin} />}
        {activeSection === AppSection.READINESS && <ReadinessForm onSubmit={handleReadinessSubmit} onCancel={() => setActiveSection(AppSection.HOME)} />}
        {activeSection === AppSection.AGENTS && <AIAgents submission={currentSubmission} onNext={handleAgentsNext} />}
        {activeSection === AppSection.ASSESSMENT_RESULT && currentSubmission && <AssessmentResult submission={currentSubmission} onNext={() => setActiveSection(AppSection.SERVICES)} onAiUpdate={updateSubmissionWithAi} />}
        {activeSection === AppSection.SERVICES && <Services submission={currentSubmission} onWorkflow={() => setActiveSection(AppSection.COMPARISON)} onContact={() => setActiveSection(AppSection.PAYMENT)} />}
        {activeSection === AppSection.PAYMENT && <Payment submission={currentSubmission} onSuccess={handlePaymentSuccess} onCancel={() => setActiveSection(AppSection.SERVICES)} />}
        {activeSection === AppSection.COMPARISON && <Comparison onNext={() => setActiveSection(AppSection.WORKFLOWS)} />}
        {activeSection === AppSection.WORKFLOWS && <WorkflowDemo onNext={() => setActiveSection(AppSection.DASHBOARD)} />}
        {activeSection === AppSection.DASHBOARD && <Dashboard submissions={submissions} user={user} />}
        {activeSection === AppSection.ADMIN && <AdminPanel submissions={submissions} onUpdate={updateStatus} user={user} />}
        {activeSection === AppSection.ROADMAP && <Roadmap />}
        {activeSection === AppSection.CONTACT && <Contact prefillData={currentSubmission} onHome={() => setActiveSection(AppSection.HOME)} />}
      </main>

      <AIChatbot />
    </div>
  );
};

export default App;
