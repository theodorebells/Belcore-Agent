
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Welcome to BELCORE! I'm Bella's digital strategist. How can I help optimize your business for 2026?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API_KEY_MISSING");
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        You are the BELCORE Strategic Assistant, working under Bella. 
        BELCORE CAPITAL LTD is a Nigerian ICT firm (RC: 9165301) specializing in:
        1. WhatsApp Sales Bots
        2. Automated Debt Reminders
        3. Smart Inventory Sync
        4. Digital Invoicing (PDF Engine)

        PERSONA:
        - Professional, expert, and encouraging.
        - Use Nigerian business context (Naira, Port Harcourt, Lagos).
        - Focus on sealing "revenue leaks" caused by manual paper logs.
        - Encourage them to use our "Strategic Business Audit" tool.
        - Keep answers short and direct (max 2 sentences).

        User Query: ${userMsg}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm having a connection issue. Please try again or visit our PH office!" }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMsg = error instanceof Error && error.message === "API_KEY_MISSING" 
        ? "I'm currently in high-security mode. Please ask the administrator to configure the API_KEY environment variable on Netlify/GitHub."
        : "I'm currently offline. Please use our Business Audit tool or reach us on WhatsApp!";
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border-4 border-white"
      >
        {isOpen ? (
          <span className="text-2xl font-bold">✕</span>
        ) : (
          <>
            <span className="text-3xl animate-pulse">🎧</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-[90vw] sm:w-[400px] h-[500px] bg-white rounded-[40px] shadow-3xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-gray-900 p-6 text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black">B</div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest">Belcore Strategist</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Online for 2026 Strategy</p>
              </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-6 overflow-y-auto space-y-4 no-scrollbar bg-gray-50/50"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm font-medium ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your industry..."
                className="flex-grow px-5 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm"
              />
              <button 
                onClick={handleSend}
                className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
