
import { WhatsAppSession, SMESubmission } from '../types';

export class BelcoreWhatsAppBot {
  private sessions: Map<string, WhatsAppSession> = new Map();

  constructor() {
    // Load existing sessions from localStorage if needed
    const saved = localStorage.getItem('belcore_wa_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.entries(parsed).forEach(([key, value]) => {
        this.sessions.set(key, value as WhatsAppSession);
      });
    }
  }

  private saveSessions() {
    const obj = Object.fromEntries(this.sessions);
    localStorage.setItem('belcore_wa_sessions', JSON.stringify(obj));
  }

  public getSession(phoneNumber: string): WhatsAppSession {
    if (!this.sessions.has(phoneNumber)) {
      this.sessions.set(phoneNumber, {
        phoneNumber,
        stage: 0,
        history: []
      });
    }
    return this.sessions.get(phoneNumber)!;
  }

  public async handleIncomingMessage(phoneNumber: string, message: string): Promise<string> {
    const session = this.getSession(phoneNumber);
    session.history.push({ role: 'user', text: message, timestamp: new Date().toISOString() });
    
    let response = "";
    const stage = session.stage;

    switch (stage) {
      case 0: // Greeting -> Ask Name
        response = "👋 Hello! I'm Bella from BELCORE CAPITAL. We help Nigerian businesses automate operations and stop losing money to manual processes. I can help you identify exactly how much your business is losing right now and show you how to fix it. What's your business name?";
        session.stage = 1;
        break;

      case 1: // Get Name -> Ask Industry
        session.businessName = message;
        response = `Great to meet you, ${message}! 🎉 What industry are you in?\n1️⃣ Restaurant / Food Services\n2️⃣ Retail / Boutique / Provisions\n3️⃣ Logistics / Transport\n4️⃣ Education / Schools\n5️⃣ Health / Pharmacy\n6️⃣ Professional Services\n7️⃣ Other\nJust reply with the number (e.g., '1' for Restaurant)`;
        session.stage = 2;
        break;

      case 2: // Get Industry -> Ask Pain Point
        const industries = ["Restaurant / Food Services", "Retail / Boutique / Provisions", "Logistics / Transport", "Education / Schools", "Health / Pharmacy", "Professional Services", "Other"];
        const indIdx = parseInt(message) - 1;
        session.industry = industries[indIdx] || message;
        response = "Perfect! Now let me understand your pain points... What's your BIGGEST frustration right now?\n1️⃣ Lost customer orders / data\n2️⃣ Customers owing money (debt collection)\n3️⃣ Inventory disappearing / theft\n4️⃣ Too much time on manual bookkeeping\n5️⃣ WhatsApp chaos (can't find messages)\n6️⃣ Staff accountability issues\n7️⃣ Other\nReply with the number or describe your challenge";
        session.stage = 3;
        break;

      case 3: // Get Pain Point -> Ask Loss
        const challenges = ["Lost customer orders", "Debt collection", "Inventory theft", "Manual bookkeeping", "WhatsApp chaos", "Staff accountability", "Other"];
        const chalIdx = parseInt(message) - 1;
        session.challenge = challenges[chalIdx] || message;
        response = `I hear you - '${session.challenge}' is costing you money every single day. 😰 How much do you estimate you're losing monthly?\n1️⃣ ₦50k - ₦100k\n2️⃣ ₦100k - ₦200k\n3️⃣ ₦200k - ₦500k\n4️⃣ ₦500k - ₦1M\n5️⃣ Over ₦1M\n6️⃣ Not sure / Need help calculating`;
        session.stage = 4;
        break;

      case 4: // Get Loss -> Urgency Response
        session.monthlyLoss = message;
        session.urgency = this.calculateUrgency(message);
        const annual = this.estimateAnnualLoss(message);
        
        if (session.urgency === 'high') {
          response = `🚨 CRITICAL ALERT 🚨\n${session.businessName}, you're on track to lose ${annual} this year!\nBut here's the good news: BELCORE can automate this problem and recover 60-70% of those losses.\nI'm flagging your case as HIGH PRIORITY.\nOur Port Harcourt automation team needs to speak with you TODAY.\nWhen can you take a 15-minute strategy call?\n1️⃣ Now (I'll connect you immediately)\n2️⃣ Today afternoon (2-5pm)\n3️⃣ Tomorrow morning (9-12pm)\n4️⃣ Tomorrow afternoon (2-5pm)`;
        } else if (session.urgency === 'medium') {
          response = `💰 Here's what I found:\nYour business is losing approximately ${annual} annually.\nGood news: This is EXACTLY the type of problem BELCORE specializes in automating.\nBased on your ${session.industry} and your challenge with '${session.challenge}', we can likely recover 60-70% of those losses.\nNext steps:\n1️⃣ Book free 15-min strategy call\n2️⃣ Get instant pricing estimate\n3️⃣ See case studies (similar businesses)\n4️⃣ Talk to our team now`;
        } else {
          response = `Thank you for sharing, ${session.businessName}!\nBased on your situation, I recommend:\nOption 1: Free Business Audit - Complete our digital audit tool (takes 5 minutes)\nOption 2: Case Studies - See how we helped businesses like yours\nOption 3: Talk to Our Team - Schedule a free consultation\nWhat would you like to do? Reply 1, 2, or 3`;
        }
        session.stage = 5;
        break;

      case 5: // Get Appointment -> Confirmation
        const times = ["Now", "Today afternoon (2-5pm)", "Tomorrow morning (9-12pm)", "Tomorrow afternoon (2-5pm)"];
        const tIdx = parseInt(message) - 1;
        session.appointmentTime = times[tIdx] || message;
        const code = Math.random().toString(36).substr(2, 6).toUpperCase();
        
        response = `✅ APPOINTMENT CONFIRMED\nBusiness: ${session.businessName}\nTime Slot: ${session.appointmentTime}\nCase ID: PH-${code}\n\nWhat happens next:\n1️⃣ You'll receive a confirmation SMS shortly\n2️⃣ Our team will call you at the scheduled time\n3️⃣ We'll conduct a 15-min audit & show you solutions\n4️⃣ You'll receive a custom automation proposal\n\nSave this number! We'll send you appointment reminders, your custom proposal, and implementation updates. Questions before your call? Just reply here - I'm available 24/7!\n— Bella 🤖\nBELCORE CAPITAL | RC 9165301`;
        
        await this.saveLead(session);
        this.notifyTeam(session, session.urgency === 'high' ? 'URGENT' : 'NORMAL');
        session.stage = 6; // Finished
        break;

      default:
        response = "Thank you! Our team will be in touch shortly. If you have more questions, feel free to ask.";
    }

    session.history.push({ role: 'bot', text: response, timestamp: new Date().toISOString() });
    this.saveSessions();
    return response;
  }

  public calculateUrgency(monthlyLoss: string): 'high' | 'medium' | 'low' {
    const choice = parseInt(monthlyLoss);
    if (choice >= 3 && choice <= 5) return 'high';
    if (choice === 2) return 'medium';
    return 'low';
  }

  public estimateAnnualLoss(monthlyLoss: string): string {
    const choices: Record<number, number> = { 1: 75000, 2: 150000, 3: 350000, 4: 750000, 5: 1500000, 6: 0 };
    const val = choices[parseInt(monthlyLoss)] || 0;
    const annual = val * 12;
    if (annual >= 1000000) return `₦${(annual / 1000000).toFixed(1)}M`;
    return `₦${(annual / 1000).toFixed(0)}k`;
  }

  public async saveLead(session: WhatsAppSession): Promise<void> {
    // Correcting the storage key to match App.tsx's v3 version
    const storageKey = 'belcore_ph_official_v3';
    const existingLeads = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newLead: SMESubmission = {
      id: `wa-${Math.random().toString(36).substr(2, 9)}`,
      businessName: session.businessName || 'WhatsApp Lead',
      industry: session.industry || 'Unknown',
      contactPerson: 'WhatsApp Prospect',
      phoneNumber: session.phoneNumber,
      challenge: session.challenge || 'WhatsApp Query',
      status: 'New Lead',
      source: 'whatsapp_bot',
      urgency: session.urgency,
      appointmentTime: session.appointmentTime,
      implementationProgress: 0,
      createdAt: new Date().toISOString(),
      readiness: {
        location: 'WhatsApp Discovery',
        customerRecording: [],
        storageMethod: [],
        lostLeadsCount: session.monthlyLoss || 'Unknown',
        followUpMethod: [],
        paymentReminders: [],
        repetitiveTasks: '',
        orderProcess: [],
        inventoryMethod: [],
        searchTime: '',
        teamComm: [],
        digitalTools: [],
        primaryDevice: 'Smartphone',
        invoicingMethod: [],
        errorSource: [],
        biggestFrustration: session.challenge || '',
        breakPoint: [],
        blockerToGrowth: [],
        autoWish: '',
        monthlyLoss: session.monthlyLoss || '',
        investmentLevel: ''
      }
    };
    
    localStorage.setItem(storageKey, JSON.stringify([newLead, ...existingLeads]));
    // Also broadcast a custom event so App can refresh state if needed
    window.dispatchEvent(new CustomEvent('belcore_lead_added'));
  }

  public notifyTeam(session: WhatsAppSession, priority: 'URGENT' | 'NORMAL'): void {
    console.log(`[BELCORE NOTIFICATION] ${priority} LEAD: ${session.businessName} (${session.phoneNumber}) has booked an appointment for ${session.appointmentTime}.`);
  }
}
