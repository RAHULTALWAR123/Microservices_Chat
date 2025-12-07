import React, { useState } from 'react';
import { Search, Settings, LogOut, Plus } from 'lucide-react';
import { CURRENT_USER, MOCK_CONVERSATIONS } from '@/constants';
// import { MOCK_CONVERSATIONS, CURRENT_USER } from '../constants';
// import { Conversation } from '../types';

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

interface SidebarProps {
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeConversationId, 
  onSelectConversation, 
  isOpenMobile, 
  onCloseMobile 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = MOCK_CONVERSATIONS.filter(c => 
    c.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`
      absolute md:relative z-40 w-full md:w-80 h-full flex flex-col 
      bg-slate-900/60 backdrop-blur-2xl border-r border-white/5
      transition-transform duration-300 ease-in-out
      ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src={CURRENT_USER.avatar} alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-purple-500/50" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-slate-100 text-sm">Chats</h2>
            <p className="text-xs text-purple-400">{CURRENT_USER.status}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
            placeholder="Search messages..."
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {filteredConversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => {
              onSelectConversation(chat.id);
              onCloseMobile();
            }}
            className={`
              w-full flex items-center p-3 rounded-xl transition-all duration-200
              ${activeConversationId === chat.id 
                ? 'bg-purple-600/10 border border-purple-500/20 shadow-sm shadow-purple-500/10' 
                : 'hover:bg-white/5 border border-transparent'}
            `}
          >
            <div className="relative shrink-0">
              <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full object-cover" />
              {chat.user.status === 'online' && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
              )}
            </div>
            <div className="ml-3 flex-1 text-left overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-semibold truncate ${activeConversationId === chat.id ? 'text-purple-300' : 'text-slate-200'}`}>
                  {chat.user.name}
                </span>
                <span className="text-xs text-slate-500 shrink-0">{chat.lastMessageTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400 truncate max-w-[140px] opacity-80">
                  {chat.lastMessage}
                </p>
                {chat.unreadCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 bg-purple-600 text-[10px] font-bold text-white rounded-full">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
        
        {/* New Chat Floating Button (Mobile styled, but inside sidebar) */}
        <div className="sticky bottom-4 w-full flex justify-end px-4 pointer-events-none">
          <button className="pointer-events-auto w-12 h-12 bg-linear-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
            <Plus size={24} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Bottom User Area */}
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all group">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};