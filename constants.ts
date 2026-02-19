
import { SMEStatus } from './types';

export const NIGERIAN_INDUSTRIES = [
  "Retail (Boutiques/Provisions)",
  "Restaurant & Food Services",
  "Laundry & Dry Cleaning Services",
  "Logistics & Transport",
  "Professional Services (Law/Consulting)",
  "Hospitality (Catering/Hotels)",
  "Education (Private Schools)",
  "Agribusiness & Processing",
  "Health & Wellness"
];

export const BUSINESS_CHALLENGES = [
  "Losing track of customer orders",
  "Poor debt recovery & reminders",
  "Manual invoicing taking too long",
  "Inconsistent staff reporting",
  "Wasted time on manual WhatsApp typing",
  "Inventory mismatch & theft",
  "High customer churn due to poor follow-up",
  "Owner burnout from micromanagement"
];

export interface AutomationSolution {
  title: string;
  desc: string;
  icon: string;
  tag: string;
  example: string;
  howItWorks: string;
}

export const AUTOMATION_SOLUTIONS: AutomationSolution[] = [
  {
    title: "Automated Follow-up System",
    desc: "Never lose a lead again. Automatically pings customers who haven't responded to quotes or completed orders.",
    icon: "🔄",
    tag: "Retention",
    example: "A customer asks for a quote on Monday but doesn't buy. On Wednesday, the system sends a friendly 'We are still here for you' WhatsApp message with a tiny discount.",
    howItWorks: "We set up a 'Last Contact' timer in your database. If it hits 48 hours without a sale, a WhatsApp trigger is fired automatically."
  },
  {
    title: "WhatsApp Sales Bot",
    desc: "Auto-share prices and collect orders 24/7 without you typing a single word.",
    icon: "💬",
    tag: "Growth",
    example: "A customer chats you at 11 PM while you are sleeping. The bot sends the price list, takes their delivery address, and gives them bank details instantly.",
    howItWorks: "We connect your WhatsApp to a simple logic-brain that recognizes product names and responds with the right info."
  },
  {
    title: "Debt Recovery Agent",
    desc: "Automated 'Gentle Reminders' sent to customers who haven't paid their balance.",
    icon: "💳",
    tag: "Cash Flow",
    example: "Mr. Jude owes ₦12,000 for 2 weeks. Every Monday and Thursday at 10 AM, he gets a polite WhatsApp reminder with a payment link.",
    howItWorks: "The system checks your 'Unpaid' list every morning and sends messages automatically based on your schedule."
  },
  {
    title: "Smart Inventory Sync",
    desc: "Real-time stock tracking that catches staff theft and alerts you before items finish.",
    icon: "📦",
    tag: "Security",
    example: "If a staff sells a bag of rice but doesn't record it, the system flags the physical mismatch and pings your phone immediately.",
    howItWorks: "Every sale reduces stock count in the cloud. We compare this to physical audits for zero leakage."
  },
  {
    title: "Digital Receipting",
    desc: "Auto-generate professional PDF invoices and send them to clients via WhatsApp.",
    icon: "📑",
    tag: "Efficiency",
    example: "As soon as you type 'Sold' on your dashboard, the customer receives a branded PDF receipt. No more paper books.",
    howItWorks: "We build a PDF engine that uses your business logo to create professional documents on the fly."
  },
  {
    title: "Staff Auditor",
    desc: "Track staff clock-ins and daily sales reporting to ensure full accountability.",
    icon: "🕵️",
    tag: "Control",
    example: "Staff must submit a digital 'End of Day' report before the system closes. You get a summary of cash vs. bank transfers.",
    howItWorks: "A simple staff-facing interface that validates daily totals before the owner's dashboard syncs."
  },
  {
    title: "Customer CRM",
    desc: "Automatically save customer details for festive season marketing and birthday messages.",
    icon: "🤝",
    tag: "Retention",
    example: "Your system collects names and birthdays. Every December, 500 customers get a personalized 'Thank You' text with a discount code.",
    howItWorks: "Every order triggers a data capture into a centralized database for future marketing automation."
  },
  {
    title: "Multi-Location Sync",
    desc: "Manage multiple branches from one dashboard in Port Harcourt or anywhere in the world.",
    icon: "🌐",
    tag: "Scale",
    example: "See sales for your Port Harcourt and Lagos branches simultaneously without calling the managers every hour.",
    howItWorks: "Distributed cloud infrastructure that aggregates data from different locations into one owner's app."
  },
  {
    icon: "⚖️",
    tag: "FISCAL COMPLIANCE",
    title: "Tax & Compliance Manager",
    desc: "Real-time tax calculation engine for VAT (7.5%), PAYE (employee income tax), and WHT (5-10%) aligned with Nigeria's Tax Act. Auto-generates FIRS-ready reports — stay compliant without hiring an accountant.",
    example: "Chidi runs a boutique in Abuja with ₦8M annual turnover and 3 staff. He was terrified of FIRS audits. Now BELCORE auto-calculates: 7.5% VAT on every sale, PAYE deductions on staff salaries using CRA bands, 5% WHT on his graphic designer invoices, and 10% WHT on contractor payments. At month-end, he downloads Excel reports in FIRS format. During his first audit, the examiner said 'These are the cleanest books I've seen from an SME.' Zero penalties, zero stress.",
    howItWorks: "Every transaction is tagged with tax metadata. BELCORE's calculation engine processes: (1) VAT — 7.5% on taxable sales, tracks cumulative turnover against ₦25M registration threshold, flags when you approach it. (2) PAYE — Calculates monthly employee income tax using CRA relief (₦200k + 20% of gross) and progressive bands (7%-24%), auto-generates PAYE schedule. (3) WHT — Applies statutory rates: 5% on professional services, 10% on contracts/commissions, 5% on rent, 10% on technical services. Generates monthly remittance summaries. All reports export in FIRS-compliant Excel format. 2027 ROADMAP: Direct TaxPro-Max API integration for one-click e-filing of VAT returns, WHT remittances, and annual tax summaries."
  }
];

export const WORKFLOW_COMPARISON = [
  {
    task: "Client Onboarding",
    manual: { process: "Paper form filling + Manual typing into Excel", time: "45 Mins" },
    automated: { process: "Online Form + Auto-Sync to Database", time: "2 Mins" },
    benefit: "95% Speed Increase"
  },
  {
    task: "Lead Follow-up",
    manual: { process: "Scrolling through 100+ WhatsApp chats manually", time: "3 Hours/Day" },
    automated: { process: "Belcore Follow-up Engine (Auto-Ping)", time: "0 Mins" },
    benefit: "40% Higher Conversion"
  },
  {
    task: "Invoicing",
    manual: { process: "Handwritten receipt + WhatsApp photo", time: "15 Mins" },
    automated: { process: "Auto-generated PDF via Belcore Engine", time: "30 Secs" },
    benefit: "Zero math errors"
  }
];
