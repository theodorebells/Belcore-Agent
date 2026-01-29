
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Welcome to BELCORE! I'm your Digital Automation Consultant. How can I help optimize your business today?" }
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are the BELCORE Strategic Assistant. BELCORE CAPITAL LTD is a Nigerian ICT firm (RC: 9165301).
        We specialize in:
        1. WhatsApp Sales Bots
        2. Automated Debt Reminders
        3. Smart Inventory Sync
        4. Digital Invoicing (PDF Engine)

        PERSONA:
        - Professional, encouraging, and highly efficient.
        - Use Nigerian business context (Naira, PH, Lagos, WhatsApp).
        - Focus on the high cost of manual errors and paper record-keeping.
        - Encourage them to initiate a "Strategic Business Audit" tool on our site.
        - Keep answers professional and short (max 2-3 sentences).

        User Query: ${userMsg}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I'm having a bit of trouble connecting. Please try again or reach out to our Port Harcourt office!" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm offline for a moment. But don't worry, our engineering team is ready to help on WhatsApp!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button - Professional Icon */}
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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-[90vw] sm:w-[400px] h-[500px] bg-white rounded-[40px] shadow-3xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-gray-900 p-6 text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black">B</div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest">Belcore Expert</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Strategist Online</p>
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
                placeholder="Ask our experts..."
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
