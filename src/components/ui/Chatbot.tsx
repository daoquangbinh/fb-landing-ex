"use client";
import { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { X, RefreshCw, MessageCircle, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Xin chào! Tôi là trợ lý AI của chuyên gia. Tôi có thể giúp gì cho bạn hôm nay?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setMessages([]);
    setTimeout(() => {
      setMessages([{ role: "assistant", content: "Xin chào! Tôi là trợ lý AI của chuyên gia. Tôi có thể giúp gì cho bạn hôm nay?" }]);
      setIsRefreshing(false);
    }, 500);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setMessages([...newMessages, data]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Xin lỗi, hiện tại tôi không thể phản hồi." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const createMarkup = (text: string) => {
    const rawMarkup = marked.parse(text) as string;
    return { __html: DOMPurify.sanitize(rawMarkup) };
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#0A1D37] text-white shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window: Glassmorphism effect */}
      <div 
        className={`fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white/70 dark:bg-[#00030a]/70 backdrop-blur-xl border border-[#0A1D37]/10 dark:border-white/10 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-black/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#775A19] to-[#fed488] flex items-center justify-center text-white font-bold text-lg">AI</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-[#0A1D37] dark:text-white leading-tight">Trợ Lý Ảo AI</h3>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Đang hoạt động</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <button 
              onClick={handleRefresh} 
              className={`p-2 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-full transition-colors`}
              title="Làm mới"
            >
              <RefreshCw size={18} className={`${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-full transition-colors"
              title="Đóng"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-[#0A1D37] text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-gray-800 text-[#171717] dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm rounded-tl-sm chat-markdown'
                }`}
                dangerouslySetInnerHTML={msg.role === 'assistant' ? createMarkup(msg.content) : { __html: msg.content }}
              >
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                 <p className="text-xs text-gray-400 mb-2">Đang nhập...</p>
                 <div className="flex gap-1">
                   <div className="w-2 h-2 bg-[#775A19] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-2 h-2 bg-[#775A19] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-2 h-2 bg-[#775A19] rounded-full animate-bounce"></div>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-black/80">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi của bạn..." 
              className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-full py-3 pl-5 pr-12 text-sm focus:ring-2 focus:ring-[#775A19] dark:text-white"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-2 p-2 bg-[#775A19] text-white rounded-full hover:bg-[#5d4201] transition-colors disabled:opacity-50 disabled:hover:bg-[#775A19]"
            >
              <Send size={16} className="ml-[2px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
