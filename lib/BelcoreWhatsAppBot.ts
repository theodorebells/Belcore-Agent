
import { WhatsAppSession } from '../types';
import { GoogleGenAI } from "@google/genai";

export class BelcoreWhatsAppBot {
  private sessions: Map<string, WhatsAppSession> = new Map();

  constructor() {
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
    // Note: We no longer push the user message here because it is handled in the UI component 
    // to prevent the "double message" bug while ensuring immediate UI feedback.
    
    let responseText = "";
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const historySummary = session.history.slice(-10).map(m => 
        `${m.role === 'user' ? 'Customer' : 'Bella'}: ${m.text}`
      ).join('\n');

      const systemPrompt = `
You are Bella, the professional AI Assistant for Oma's Gourmet Bakery in Nigeria. 

CRITICAL CHECK:
Before responding, analyze if the user is asking about:
- DISCOUNTS / PROMOS: (Answer: No active discounts, but free delivery over ₦30k in Abuja).
- PRICES: (Red Velvet ₦15k, Chocolate ₦12.5k, Vanilla ₦10k).
- GREETINGS: (Respond warmly).
- STATUS: (Ask for Order ID).

ORDER FLOW (ONLY if they want to buy):
- Stage 0: Main Menu.
- Stage 1: Readiness check.
- Stage 2: Flavor selection.
- Stage 3: Location.
- Stage 4: Time & Bank Details (Wema Bank, 0123456789).

INSTRUCTIONS:
1. If the user asks a dynamic question (like about discounts), answer it IMMEDIATELY and CLEARLY.
2. After answering, if they were in an order flow, gently ask if they want to continue.
3. If they are moving forward with an order, append [STAGE_UPDATE: X] to your message.
4. Speak professionally, plain text, NO BOLD, max 2-3 sentences. Use Naira ₦.

CURRENT STAGE: ${session.stage}
CONVERSATION HISTORY:
${historySummary}

CUSTOMER MESSAGE: ${message}
      `.trim();

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: systemPrompt,
      });

      let rawResponse = result.text || "I'm checking that for you now...";
      
      const stageMatch = rawResponse.match(/\[STAGE_UPDATE: (\d+)\]/);
      if (stageMatch) {
        session.stage = parseInt(stageMatch[1]);
        rawResponse = rawResponse.replace(/\[STAGE_UPDATE: \d+\]/g, '').trim();
      }
      
      responseText = rawResponse;

    } catch (error) {
      console.error("Bella AI Error:", error);
      responseText = "Checking the kitchen for you... one moment!";
    }

    session.history.push({ role: 'bot', text: responseText, timestamp: new Date().toISOString() });
    this.saveSessions();
    return responseText;
  }
}
