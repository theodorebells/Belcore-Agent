
export type SMEStatus = 'New Lead' | 'Discovery' | 'Assessment' | 'Proposal Sent' | 'Implementation' | 'Completed';

export interface ReadinessAnswers {
  location: string;
  customerRecording: string[];
  storageMethod: string[];
  lostLeadsCount: string;
  followUpMethod: string[];
  paymentReminders: string[];
  repetitiveTasks: string;
  orderProcess: string[];
  inventoryMethod: string[];
  searchTime: string;
  teamComm: string[];
  digitalTools: string[];
  primaryDevice: string;
  invoicingMethod: string[];
  errorSource: string[];
  biggestFrustration: string;
  breakPoint: string[];
  blockerToGrowth: string[];
  autoWish: string;
  monthlyLoss: string;
  investmentLevel: string;
}

export interface SMESubmission {
  id: string;
  businessName: string;
  industry: string;
  contactPerson: string;
  phoneNumber: string;
  challenge: string;
  status: SMEStatus;
  readiness: ReadinessAnswers;
  createdAt: string;
  implementationProgress: number;
  adminNotes?: string;
  aiStrategy?: string; 
  recommendedPackage?: string;
  source?: 'audit' | 'whatsapp_bot';
  urgency?: 'high' | 'medium' | 'low';
  appointmentTime?: string;
}

// Added missing WhatsAppSession interface to support the WhatsApp bot logic
export interface WhatsAppSession {
  phoneNumber: string;
  stage: number;
  history: { role: 'user' | 'bot'; text: string; timestamp: string }[];
  businessName?: string;
  industry?: string;
  challenge?: string;
  monthlyLoss?: string;
  urgency?: 'high' | 'medium' | 'low';
  appointmentTime?: string;
}

export enum AppSection {
  HOME = 'home',
  READINESS = 'readiness',
  ASSESSMENT_RESULT = 'assessment_result',
  SERVICES = 'services',
  AGENTS = 'agents',
  ERROR_PROOFING = 'error_proofing',
  COMPARISON = 'comparison',
  WORKFLOWS = 'workflows',
  DASHBOARD = 'dashboard',
  ADMIN = 'admin',
  ROADMAP = 'roadmap',
  CONTACT = 'contact'
}
