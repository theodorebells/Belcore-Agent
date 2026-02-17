
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
    // Initial greeting if history is empty
    if (session.history.length === 0) {
      handleBotResponse("init");
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.history, isTyping]);

  const handleBotResponse = async (msg: string) => {
    setIsTyping(true);
    // Simulate network delay
    setTimeout(async () => {
      await botLogic.handleIncomingMessage(phoneNumber, msg);
      setSession({ ...botLogic.getSession(phoneNumber) });
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    
    // Update local state immediately for UX
    const updatedSession = botLogic.getSession(phoneNumber);
    setSession({ ...updatedSession });
    
    handleBotResponse(userMsg);
  };

  return (
    <div className="max-w-md mx-auto h-[700px] bg-[#E5DDD5] flex flex-col rounded-[32px] overflow-hidden shadow-3xl border-8 border-gray-900 relative">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">👩‍💻</div>
        <div className="flex-grow">
          <p className="font-bold text-sm">Bella (Belcore AI)</p>
          <p className="text-[10px] opacity-70">online</p>
        </div>
        <div className="flex gap-4">
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 no-scrollbar pb-10">
        {session.history.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-sm relative ${
              m.role === 'user' 
                ? 'bg-[#DCF8C6] text-gray-800 rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
              <p className="text-[8px] text-gray-400 text-right mt-1">
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
              <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#F0F0F0] flex gap-2 items-center">
        <div className="bg-white flex-grow rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm">
          <span className="text-xl grayscale opacity-50">😊</span>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message"
            className="flex-grow bg-transparent outline-none text-sm font-medium"
          />
          <span className="text-xl grayscale opacity-50">📎</span>
        </div>
        <button 
          onClick={handleSend}
          className="w-12 h-12 bg-[#075E54] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          {input.trim() ? "➔" : "🎙️"}
        </button>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <p className="text-[40px] font-black text-emerald-900 tracking-tighter">BELCORE</p>
      </div>
    </div>
  );
};

export default WhatsAppBotDemo;
