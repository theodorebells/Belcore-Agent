
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

export const AUTOMATION_SOLUTIONS = [
  {
    title: "WhatsApp Sales Bot",
    desc: "Auto-share prices, collect orders, and send bank details 24/7 without manual typing.",
    icon: "💬",
    tag: "Customer Growth"
  },
  {
    title: "Debt Recovery Agent",
    desc: "Automated 'Gentle Reminders' sent via SMS/WhatsApp until payment is confirmed.",
    icon: "💳",
    tag: "Cash Flow"
  },
  {
    title: "Smart Inventory Sync",
    desc: "Real-time stock tracking that alerts you before items finish and catches staff theft.",
    icon: "📦",
    tag: "Security"
  },
  {
    title: "Digital Receipting",
    desc: "Auto-generate professional PDF invoices and send them to clients instantly after a sale.",
    icon: "📑",
    tag: "Efficiency"
  },
  {
    title: "Staff Performance Hub",
    desc: "Digitally track every action your staff takes. Know who is working and who is slacking.",
    icon: "👨‍💼",
    tag: "Management"
  },
  {
    title: "Revenue Leak Detection",
    desc: "AI-powered audits that flag missing funds or suspicious discounts in your daily records.",
    icon: "🔍",
    tag: "Security"
  },
  {
    title: "Customer CRM",
    desc: "Store every phone number and purchase history automatically. Never lose a lead again.",
    icon: "🗂️",
    tag: "Sales"
  },
  {
    title: "Auto-Procurement",
    desc: "System automatically emails suppliers when stock hits a critical level. Zero downtime.",
    icon: "🚚",
    tag: "Supply Chain"
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
    automated: { process: "Auto-generated PDF via Paystack/Belcore", time: "30 Secs" },
    benefit: "Zero math errors"
  },
  {
    task: "Debt Follow-up",
    manual: { process: "Calling one-by-one based on memory", time: "4 Hours/Week" },
    automated: { process: "Automated WhatsApp & Email Reminders", time: "0 Mins" },
    benefit: "Improved cash flow"
  }
];
