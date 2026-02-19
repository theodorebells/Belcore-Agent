
import React, { useState, useEffect, useRef } from 'react';
import { BelcoreWhatsAppBot } from '../lib/BelcoreWhatsAppBot';
import { WhatsAppSession } from '../types';

const botLogic = new BelcoreWhatsAppBot();

const WhatsAppBotDemo: React.FC = () => {
  const [phoneNumber] = useState("080-USER-DEMO");
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [session, setSession] = useState<WhatsAppSession>(botLogic.getSession(phoneNumber));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session.history.length === 0) {
      const initialWelcome = "Hi! I'm Bella, the digital assistant for Oma's Gourmet Bakery. 🍰\n\nI handle orders and questions 24/7 so the bakers can focus on the oven!\n\nWhat can I do for you today? (Try asking about prices or promos!)";
      session.history.push({ role: 'bot', text: initialWelcome, timestamp: new Date().toISOString() });
      setSession({ ...session });
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.history, isTyping]);

  const handleBotResponse = async (userMsg: string) => {
    // 1. Snappy Reading Phase (Reduced from 1200ms to 400ms)
    await new Promise(resolve => setTimeout(resolve, 400));

    setIsTyping(true);
    
    try {
      // Call logic which handles the AI response
      const response = await botLogic.handleIncomingMessage(phoneNumber, userMsg);
      
      // 2. Faster Typing Phase (Max 1200ms)
      const typingTime = Math.min(1200, Math.max(600, response.length * 8));
      
      setTimeout(() => {
        setSession({ ...botLogic.getSession(phoneNumber) });
        setIsTyping(false);
      }, typingTime);
      
    } catch (err) {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    
    // PUSH ONCE HERE (Component is responsible for User Messages)
    const currentSession = botLogic.getSession(phoneNumber);
    currentSession.history.push({ 
      role: 'user', 
      text: userMsg, 
      timestamp: new Date().toISOString() 
    });
    
    // Update local state immediately for snappy feel
    setSession({ ...currentSession });
    
    // Trigger AI
    handleBotResponse(userMsg);
  };

  return (
    <div className="max-w-md mx-auto h-[550px] sm:h-[700px] bg-[#E5DDD5] flex flex-col rounded-[32px] overflow-hidden shadow-3xl border-4 sm:border-8 border-gray-900 relative">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] p-3 sm:p-4 text-white flex items-center gap-3 relative z-10">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-inner overflow-hidden border border-white/20">
          <img 
            src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&auto=format&fit=crop" 
            alt="Bella" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <p className="font-bold text-xs sm:text-sm tracking-tight">Bella (Oma's Bakery Bot)</p>
          <p className="text-[8px] sm:text-[10px] opacity-70 font-medium">{isTyping ? 'typing...' : 'online'}</p>
        </div>
        <div className="flex gap-3 sm:gap-4 opacity-70">
          <span className="text-sm">📞</span>
          <span className="text-sm font-black">⋮</span>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 no-scrollbar pb-10 bg-fixed relative" style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")'}}>
        <div className="text-center my-4">
          <span className="bg-[#d1eafe] text-[8px] sm:text-[10px] font-bold text-gray-600 px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm">Today</span>
        </div>
        
        {session.history.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[11px] sm:text-sm shadow-sm relative ${
              m.role === 'user' 
                ? 'bg-[#DCF8C6] text-gray-800 rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border-l-4 border-emerald-500'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed font-bold">{m.text}</p>
              <p className="text-[7px] sm:text-[8px] text-gray-400 text-right mt-1.5 font-bold">
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center border-l-4 border-gray-200">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-3 bg-[#F0F0F0] flex gap-2 items-center relative z-10 border-t border-gray-200">
        <div className="bg-white flex-grow rounded-full px-4 py-2 sm:py-3 flex items-center gap-2 shadow-sm border border-gray-100">
          <span className="text-lg opacity-40 cursor-default">😊</span>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
            placeholder={isTyping ? "Bella is reading..." : "Ask for prices, promos, orders..."}
            className="flex-grow bg-transparent outline-none text-[12px] sm:text-sm font-bold placeholder:text-gray-300 disabled:opacity-50"
          />
          <span className="text-lg opacity-40 cursor-default">📎</span>
        </div>
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className={`w-10 h-10 sm:w-12 sm:h-12 text-white rounded-full flex items-center justify-center shadow-lg transition-all shrink-0 ${input.trim() && !isTyping ? 'bg-[#075E54] hover:scale-105 active:scale-95' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {input.trim() ? <span className="text-xl">➔</span> : <span className="text-lg">🎙️</span>}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppBotDemo;
