
import { User, SMESubmission, Transaction, SystemLog, Role } from '../types';

const DB_KEY = 'belcore_database_v1';

interface DatabaseSchema {
  users: User[];
  submissions: SMESubmission[];
  transactions: Transaction[];
  logs: SystemLog[];
}

const SEED_DATA: DatabaseSchema = {
  users: [
    { id: 'u1', email: 'admin@belcore.com', name: 'Admin User', role: 'ADMIN' },
    { id: 'u2', email: 'client@belcore.com', name: 'Demo Client', role: 'CLIENT', businessId: 'demo-1' },
    { id: 'u3', email: 'staff@belcore.com', name: 'Michael Okoro', role: 'STAFF' }
  ],
  submissions: [
    {
      id: 'demo-1',
      businessName: "Garden City Logistics",
      industry: "Logistics & Delivery Services",
      contactPerson: "Tamuno George",
      phoneNumber: "08030001111",
      challenge: "Waybill tracking chaos",
      status: "Implementation",
      implementationProgress: 45,
      readiness: {
        location: ['Port Harcourt', 'Lagos'],
        customerRecording: ['Waybill Slips'],
        storageMethod: ['Notebooks', 'Excel'],
        lostLeadsCount: '11-30 (Critical)',
        followUpMethod: ['Scrolling through WhatsApp'],
        paymentReminders: ['Manual calls'],
        repetitiveTasks: 'Manual driver dispatch',
        orderProcess: ['Parcel booking', 'Waybill generation'],
        inventoryMethod: ['Physical Ledger'],
        searchTime: 'Very High',
        teamComm: ['WhatsApp Group'],
        digitalTools: ['WhatsApp Business'],
        primaryDevice: 'Smartphone',
        invoicingMethod: ['Manual Carbon-copy'],
        errorSource: ['Typing waybills manually'],
        biggestFrustration: 'Items get lost and drivers argue about payments',
        breakPoint: ['Accountability'],
        blockerToGrowth: ['Process lack'],
        autoWish: 'Digital Waybill System',
        monthlyLoss: '₦120k / 20 hrs',
        investmentLevel: 'Growth (System Overhaul)'
      },
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      adminNotes: "Client wants to stop using carbonized paper for waybills.",
      aiStrategy: "Revenue has increased by 12% in the last 30 days. Logistics demand is rising.",
      recommendedPackage: "Full Digital Workforce Suite"
    }
  ],
  transactions: [
    { id: 't1', businessId: 'demo-1', businessName: 'Garden City Logistics', amount: 350000, date: new Date().toISOString(), status: 'Paid', plan: 'Full Digital Workforce Suite' }
  ],
  logs: [
    { id: 'l1', timestamp: new Date().toISOString(), userId: 'u1', userName: 'Admin User', action: 'System Initialization', details: 'Database seeded with MVP data', type: 'workflow' }
  ]
};

export const storage = {
  get: (): DatabaseSchema => {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      storage.save(SEED_DATA);
      return SEED_DATA;
    }
    return JSON.parse(data);
  },

  save: (data: DatabaseSchema) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  logAction: (userId: string, userName: string, action: string, details: string, type: SystemLog['type'] = 'data') => {
    const db = storage.get();
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      action,
      details,
      type
    };
    db.logs.unshift(newLog);
    if (db.logs.length > 500) db.logs.pop(); // Cap logs
    storage.save(db);
  },

  addSubmission: (submission: SMESubmission) => {
    const db = storage.get();
    db.submissions.unshift(submission);
    storage.save(db);
  },

  updateSubmission: (id: string, updates: Partial<SMESubmission>) => {
    const db = storage.get();
    db.submissions = db.submissions.map(s => s.id === id ? { ...s, ...updates } : s);
    storage.save(db);
  },

  addTransaction: (tx: Transaction) => {
    const db = storage.get();
    db.transactions.unshift(tx);
    storage.save(db);
  }
};
