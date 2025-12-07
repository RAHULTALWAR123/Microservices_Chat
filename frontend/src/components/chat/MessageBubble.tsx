import React from 'react';
// import { Message } from '../types';
import { Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO string or formatted time
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  return (
    <div className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-[85%] sm:max-w-[70%] group`}>
        
        {/* Bubble */}
        <div className={`
          relative px-5 py-3 text-sm leading-relaxed shadow-sm
          ${isMe 
            ? 'bg-linear-to-br from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm' 
            : 'bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm'}
        `}>
          {message.content}
          
          {/* Time & Status */}
          <div className={`
            flex items-center justify-end gap-1 mt-1 text-[10px]
            ${isMe ? 'text-purple-200/70' : 'text-slate-400'}
          `}>
            <span>{message.timestamp}</span>
            {isMe && (
              <span className="ml-1">
                {message.status === 'sent' && <Check size={12} className="opacity-70" />}
                {message.status === 'delivered' && <CheckCheck size={12} className="opacity-70" />}
                {message.status === 'read' && <CheckCheck size={12} className="text-blue-300" />}
              </span>
            )}
          </div>
        </div>

        {/* Decorative Glow for 'Me' messages */}
        {isMe && (
          <div className="absolute inset-0 bg-purple-500 rounded-2xl blur-lg opacity-20 -z-10 group-hover:opacity-30 transition-opacity"></div>
        )}
      </div>
    </div>
  );
};