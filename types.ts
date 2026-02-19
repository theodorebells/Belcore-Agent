
export type Role = 'ADMIN' | 'CLIENT' | 'STAFF';

export type SMEStatus = 'New Lead' | 'Discovery' | 'Assessment' | 'Proposal Sent' | 'Implementation' | 'Completed';

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: Role;
  businessId?: string; 
}

export interface Transaction {
  id: string;
  businessId: string;
  businessName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  plan: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  type: 'auth' | 'data' | 'workflow' | 'error';
}

export interface ReadinessAnswers {
  location: string[];
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
  depositPaid?: boolean;
}

// Added missing WhatsApp message structure
export interface WhatsAppMessage {
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

// Added missing WhatsApp session state structure to resolve import errors
export interface WhatsAppSession {
  phoneNumber: string;
  stage: number;
  history: WhatsAppMessage[];
  businessName?: string;
  industry?: string;
  challenge?: string;
  monthlyLoss?: string;
  urgency?: 'high' | 'medium' | 'low';
  appointmentTime?: string;
}

export enum AppSection {
  HOME = 'home',
  LOGIN = 'login',
  READINESS = 'readiness',
  ASSESSMENT_RESULT = 'assessment_result',
  AGENTS = 'agents',
  SERVICES = 'services',
  PAYMENT = 'payment',
  DASHBOARD = 'dashboard',
  ADMIN = 'admin',
  ROADMAP = 'roadmap',
  CONTACT = 'contact',
  COMPARISON = 'comparison',
  WORKFLOWS = 'workflows'
}
