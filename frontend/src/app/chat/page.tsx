"use client"
import { Background } from '@/components/chat/Background';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { Sidebar } from '@/components/chat/Sidebar';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/constants';
import { useUserStore } from '@/stores/useUserStore';
import { MessageSquareDashed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function  Page() {

  const [activeConversationId, setActiveConversationId] = useState<string | null>('1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derived state
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);

  // Handlers
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setIsMobileMenuOpen(false);
  };

  const handleBackToMobileList = () => {
    setIsMobileMenuOpen(true);
  };

  const {isAuth} = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if(!isAuth) router.push("/login")
  },[isAuth,router])
  

  return (
  <div className="relative w-full h-screen flex overflow-hidden bg-slate-950 font-sans selection:bg-purple-500/30 selection:text-white">
      <Background />
      
      {/* Glass Container */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto flex md:p-6 lg:p-8">
        <div className="w-full h-full flex rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
          
          {/* Sidebar - Hidden on mobile if chat is open, toggled via CSS transforms in component */}
          <div className={`${!isMobileMenuOpen && activeConversationId ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
            <Sidebar 
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              isOpenMobile={true} // Always "open" in this flex view, controlled by parent display logic
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
          </div>

          {/* Main Chat Area */}
          <div className={`${isMobileMenuOpen ? 'hidden md:flex' : 'flex'} flex-1 h-full relative`}>
            {activeConversation ? (
              <ChatWindow 
                conversation={activeConversation}
                messages={MOCK_MESSAGES} // In a real app, filter these by conversation ID
                onBack={handleBackToMobileList}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <MessageSquareDashed size={40} className="text-purple-500/50" />
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">Select a Conversation</h3>
                <p className="max-w-xs text-sm">Choose a chat from the sidebar to start messaging your contacts.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Page
