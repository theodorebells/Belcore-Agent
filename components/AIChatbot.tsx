
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! 👋 I'm Bella, BELCORE's AI strategist. I help Nigerian business owners stop losing money to manual operations. Ask me anything about your business, or try one of the quick options below!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickReplies = [
    "How can I recover customer debts automatically?",
    "My inventory keeps disappearing — what do I do?",
    "How much does BELCORE cost?",
    "I run a restaurant — how can you help me?"
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setBadgeVisible(false);
  };

  const handleSend = async (customMsg?: string) => {
    const msgToSend = customMsg || input;
    if (!msgToSend.trim()) return;

    setHasInteracted(true);
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msgToSend }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("Connection Surge");

      const ai = new GoogleGenAI({ apiKey });
      
      // Build conversation history (last 6 messages)
      const historySummary = messages.slice(-6).map(m => 
        `${m.role === 'user' ? 'User' : 'Bella'}: ${m.text}`
      ).join('\n');

      const systemPrompt = `
You are Bella, the AI Business Strategist for BELCORE CAPITAL LTD (RC: 9165301), a Nigerian ICT and business automation firm based in Port Harcourt with branches in Lagos and Abuja.

YOUR PERSONALITY:
- Warm, professional, and deeply knowledgeable about Nigerian business
- You speak like a smart Nigerian consultant — confident, direct, no fluff
- You use Nigerian context naturally (mention NEPA, WhatsApp commerce, POS terminals, naira, Abuja/Lagos/PH, etc. when relevant)
- You never say "As an AI" — you are Bella, BELCORE's strategist

YOUR KNOWLEDGE BASE:
BELCORE's core services:
1. WhatsApp Sales Bot — automates orders, price replies, and customer capture 24/7
2. Debt Recovery Agent — sends automatic payment reminders until debts are cleared
3. Smart Inventory System — real-time stock tracking with theft detection alerts
4. Digital Receipting — auto-generates branded PDF invoices via WhatsApp
5. Staff Auditor — tracks clock-in, sales reporting, and daily accountability
6. Customer CRM — saves all customer data for future marketing and follow-ups
7. Multi-Location Sync — manages multiple branches from one dashboard
8. Automated Follow-up System — re-engages leads who haven't responded to quotes

BELCORE PRICING:
- Core Automation Setup: ₦75,000 per module (single workflow fix)
- Full Digital Workforce Suite: ₦350,000 (complete ecosystem)
- Monthly Maintenance: ₦30,000/month (server + support included)
- Custom Enterprise Deployment: pricing on consultation

BELCORE'S TARGET CLIENTS:
Nigerian SMEs in: Retail/Boutiques, Restaurants/Food, Logistics/Transport, Education/Schools, Health/Pharmacy, Professional Services, Agribusiness, Laundry & Dry Cleaning, Hospitality

RESPONSE RULES:
- Keep responses SHORT — maximum 3 sentences or a small bullet list
- Always end with either a question to learn more OR a clear call to action
- If someone asks about pricing, give the exact naira figures above
- If someone describes a problem, identify which BELCORE service solves it and explain how in one sentence using a Nigerian business example
- If the query is not business-related, gently redirect to business topics
- Never use markdown bold (**text**) — plain text only
- If you don't know something specific, say "Let me connect you with our Port Harcourt engineering desk for that — they can give you exact details."

CONVERSATION HISTORY (last 6 messages):
${historySummary}

CURRENT USER MESSAGE: ${msgToSend}
      `.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: systemPrompt,
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Let me connect you with our Port Harcourt engineering desk for that — they can give you exact details." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a brief connection issue right now. In the meantime — what's your biggest business challenge? Our Port Harcourt team reads every chat and will follow up with you directly! 🙌" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border-4 border-white"
      >
        {isOpen ? (
          <span className="text-2xl font-black">✕</span>
        ) : (
          <>
            <span className="text-3xl">🎧</span>
            {badgeVisible && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                1
              </div>
            )}
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-[90vw] sm:w-[400px] h-[550px] bg-white rounded-[40px] shadow-3xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-gray-900 p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">B</div>
            <div>
              <p className="font-black text-sm uppercase tracking-[0.2em]">Bella • BELCORE</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">AI Strategist Online</p>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 no-scrollbar bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className="space-y-4">
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[2.5rem] text-xs sm:text-sm font-bold leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
                    {m.text}
                  </div>
                </div>
                
                {/* Suggestions Show only after first bot message */}
                {i === 0 && !hasInteracted && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {quickReplies.map((q, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black rounded-full px-4 py-2 hover:bg-emerald-100 transition-all active:scale-95 shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-5 py-4 rounded-[2rem] rounded-bl-none shadow-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Area */}
          <div className="p-5 bg-white border-t">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask Bella about your business..."
                className="flex-grow px-6 py-4 bg-gray-50 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm text-gray-900 placeholder:text-gray-300 transition-all"
              />
              <button 
                onClick={() => handleSend()}
                className="w-14 h-14 bg-emerald-600 text-white rounded-[1.5rem] flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all shadow-xl shadow-emerald-900/10"
              >
                <span className="text-xl">➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
