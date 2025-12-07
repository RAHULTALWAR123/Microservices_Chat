import React, { useRef, useEffect } from 'react';
import { MoreVertical, Phone, Video, ChevronLeft } from 'lucide-react';
// import { Conversation, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
  email?: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO string or formatted time
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, messages, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on load
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full relative bg-slate-900/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="h-18 px-4 md:px-6 flex items-center justify-between border-b border-white/5 bg-slate-900/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="relative cursor-pointer group">
            <img 
              src={conversation.user.avatar} 
              alt={conversation.user.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-500/50 transition-all" 
            />
            {conversation.user.status === 'online' && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
            )}
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-semibold text-slate-100 flex items-center gap-2">
              {conversation.user.name}
              {conversation.user.status === 'online' && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              )}
            </h3>
            <span className="text-xs text-slate-400">
              {conversation.user.status === 'online' ? 'Active now' : `Last seen ${conversation.user.lastSeen || 'recently'}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3 text-slate-400">
          <button className="p-2 hover:bg-white/5 hover:text-purple-400 rounded-full transition-colors hidden sm:block">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-white/5 hover:text-purple-400 rounded-full transition-colors hidden sm:block">
            <Video size={20} />
          </button>
          <button className="p-2 hover:bg-white/5 hover:text-white rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Date Divider Example */}
          <div className="flex justify-center my-4">
            <span className="px-3 py-1 text-[10px] font-medium text-slate-500 bg-slate-900/50 border border-white/5 rounded-full">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isMe={msg.senderId === 'me'} 
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput />
    </div>
  );
};