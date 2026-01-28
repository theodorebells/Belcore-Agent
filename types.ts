
export type SMEStatus = 'New Lead' | 'Discovery' | 'Assessment' | 'Proposal Sent' | 'Implementation' | 'Completed';

export interface ReadinessAnswers {
  // Customer & Sales
  customerRecording: string[];
  storageMethod: string[];
  lostLeadsCount: string;
  followUpMethod: string[];
  paymentReminders: string[];
  
  // Operations
  repetitiveTasks: string;
  orderProcess: string[];
  inventoryMethod: string[];
  searchTime: string;
  teamComm: string[];

  // Tech & Finance
  digitalTools: string[];
  primaryDevice: string;
  invoicingMethod: string[];

  // Pain Points & Strategy
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
