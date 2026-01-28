
import { SMEStatus } from './types';

export const NIGERIAN_INDUSTRIES = [
  "Retail (Boutiques/Provisions)",
  "Restaurant & Food Services",
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
    example: "Mr. Jude owes ₦12,000 for 2 weeks. Every Monday and Thursday at 10 AM, he gets a polite WhatsApp reminder with a payment link. You don't have to call him and feel awkward.",
    howItWorks: "The system checks your 'Unpaid' list every morning and sends messages automatically based on your preferred schedule."
  },
  {
    title: "Smart Inventory Sync",
    desc: "Real-time stock tracking that catches staff theft and alerts you before items finish.",
    icon: "📦",
    tag: "Security",
    example: "If a staff sells a bag of rice but doesn't record it, the physical count won't match the system. The system flags this 'Mismatch' and pings your phone immediately.",
    howItWorks: "Every sale reduces stock count in the cloud. We compare this to your physical stock audits to ensure zero leakage."
  },
  {
    title: "Digital Receipting",
    desc: "Auto-generate professional PDF invoices and send them to clients via WhatsApp.",
    icon: "📑",
    tag: "Efficiency",
    example: "As soon as you type 'Sold' on your dashboard, the customer receives a branded PDF receipt. No more searching for a pen or carbonized paper books.",
    howItWorks: "We build a PDF engine that uses your business logo to create professional documents on the fly."
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
    task: "Invoicing",
    manual: { process: "Handwritten receipt + WhatsApp photo", time: "15 Mins" },
    automated: { process: "Auto-generated PDF via Belcore Engine", time: "30 Secs" },
    benefit: "Zero math errors"
  },
  {
    task: "Debt Follow-up",
    manual: { process: "Calling one-by-one based on memory", time: "4 Hours/Week" },
    automated: { process: "Automated WhatsApp & Email Reminders", time: "0 Mins" },
    benefit: "Improved cash flow"
  }
];
