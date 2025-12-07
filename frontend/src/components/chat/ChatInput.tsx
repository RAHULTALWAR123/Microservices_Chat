import React, { useState } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Mock send
      setMessage('');
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-900/60 backdrop-blur-md border-t border-white/5">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end gap-2 max-w-4xl mx-auto"
      >
        {/* Attachment Button */}
        <button 
          type="button"
          className="p-3 text-slate-400 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all"
        >
          <Paperclip size={20} />
        </button>

        {/* Input Container */}
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center bg-slate-950/50 border border-slate-700/50 rounded-2xl focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/30 transition-all overflow-hidden">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            <button 
              type="button"
              className="p-3 text-slate-400 hover:text-yellow-400 transition-colors"
            >
              <Smile size={20} />
            </button>
          </div>
        </div>

        {/* Send/Mic Button */}
        <button 
          type="submit"
          className={`
            p-3 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
            ${message.trim() 
              ? 'bg-purple-600 text-white shadow-purple-500/30 hover:bg-purple-500 transform hover:scale-105' 
              : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'}
          `}
        >
          {message.trim() ? <Send size={20} className="ml-0.5" /> : <Mic size={20} />}
        </button>
      </form>
    </div>
  );
};