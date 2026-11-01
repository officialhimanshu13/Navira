import React, { useState } from 'react';
import { Conversation, ChatMessage } from '../../types/marketplace';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile, 
  Search, 
  CheckCheck, 
  Clock, 
  User, 
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

interface MessagingViewProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  conversations,
  onSendMessage,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false);

  const selectedConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.businessOrTitle.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConv) return;
    onSendMessage(selectedConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#19BDF0]" />
          <span>Direct Client & Developer Messages</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Discuss website scope, review wireframes, and coordinate launch timelines.
        </p>
      </div>

      {/* Messaging Container */}
      <div className="rounded-3xl bg-[#0B1B33]/90 border border-white/[0.08] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[680px]">
        
        {/* Left Column (4 cols): Conversations List */}
        <div
          className={`md:col-span-4 border-r border-white/[0.08] bg-[#07172C]/70 flex flex-col ${
            isMobileConversationOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search conversations */}
          <div className="p-3.5 border-b border-white/[0.08]">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#050B18] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#19BDF0]"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConvId(conv.id);
                    setIsMobileConversationOpen(true);
                  }}
                  className={`p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1B33] border-l-4 border-l-[#19BDF0]'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-11 h-11 rounded-full object-cover border border-white/10"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#07172C]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-white truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-slate-500 shrink-0">
                        {conv.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#19BDF0] truncate font-medium">
                      {conv.businessOrTitle}
                    </p>

                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#19BDF0] text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Chat Window */}
        {selectedConv ? (
          <div
            className={`md:col-span-8 flex flex-col bg-[#0B1B33]/50 ${
              !isMobileConversationOpen ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/[0.08] bg-[#07172C]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileConversationOpen(false)}
                  className="md:hidden p-1.5 rounded-lg bg-white/5 text-slate-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={selectedConv.participantAvatar}
                    alt={selectedConv.participantName}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  {selectedConv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#07172C]" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedConv.participantName}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{selectedConv.participantRole}</span>
                    <span>•</span>
                    <span className="text-[#19BDF0]">{selectedConv.businessOrTitle}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Direct Channel</span>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {selectedConv.messages.map((msg) => {
                const isMe = msg.senderRole === 'client' || msg.senderId === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-1 px-1">
                      {msg.senderName} • {msg.timestamp}
                    </div>
                    <div
                      className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] text-slate-950 font-medium rounded-tr-none shadow-md shadow-[#19BDF0]/15'
                          : 'bg-[#07172C] text-slate-100 border border-white/10 rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSend} className="p-3.5 border-t border-white/[0.08] bg-[#07172C]/70 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to collaborate..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#050B18] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#19BDF0]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#19BDF0] hover:bg-[#14a7d4] text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 flex items-center justify-center text-xs text-slate-400">
            Select a conversation to begin chatting.
          </div>
        )}

      </div>

    </div>
  );
};

