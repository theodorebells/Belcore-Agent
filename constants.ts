
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
    title: "Expense Monitor",
    desc: "Log daily expenses like fuel and repairs on your phone to see your real monthly profit.",
    icon: "📊",
    tag: "Finance",
    example: "Instead of wondering where the money went, you log '₦5,000 Fuel' and see your net profit updated in real-time.",
    howItWorks: "Expense categorization engine that reconciles with your daily sales for a true financial picture."
  },
  {
    title: "Multi-Location Sync",
    desc: "Manage multiple branches from one dashboard in Port Harcourt or anywhere in the world.",
    icon: "🌐",
    tag: "Scale",
    example: "See sales for your Port Harcourt and Lagos branches simultaneously without calling the managers every hour.",
    howItWorks: "Distributed cloud infrastructure that aggregates data from different locations into one owner's app."
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
