// import { Conversation, Message, User } from './types';
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
  email?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO string or formatted time
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/id/64/200/200',
  status: 'online',
  email: 'alex@example.com'
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Chen',
      avatar: 'https://picsum.photos/id/65/200/200',
      status: 'online',
    },
    lastMessage: 'Did you see the new design updates?',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Marcus Stroman',
      avatar: 'https://picsum.photos/id/91/200/200',
      status: 'offline',
      lastSeen: '2h ago'
    },
    lastMessage: 'The meeting is rescheduled to Friday.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Emma Wilson',
      avatar: 'https://picsum.photos/id/129/200/200',
      status: 'busy',
    },
    lastMessage: 'Sure, I will send the files shortly.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'David Kim',
      avatar: 'https://picsum.photos/id/177/200/200',
      status: 'online',
    },
    lastMessage: 'Can we hop on a quick call?',
    lastMessageTime: 'Mon',
    unreadCount: 5,
  },
  {
    id: '5',
    user: {
      id: 'u5',
      name: 'Jessica Lee',
      avatar: 'https://picsum.photos/id/338/200/200',
      status: 'offline',
    },
    lastMessage: 'Thanks for the help!',
    lastMessageTime: 'Mon',
    unreadCount: 0,
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'u1',
    content: 'Hey Alex! How is the project coming along?',
    timestamp: '10:30 AM',
    type: 'text',
    status: 'read'
  },
  {
    id: 'm2',
    senderId: 'me',
    content: 'Hi Sarah! It is going great. Just finishing up the authentication flow.',
    timestamp: '10:32 AM',
    type: 'text',
    status: 'read'
  },
  {
    id: 'm3',
    senderId: 'u1',
    content: 'That sounds awesome. Did you see the new design updates I sent over?',
    timestamp: '10:42 AM',
    type: 'text',
    status: 'read'
  },
  {
    id: 'm4',
    senderId: 'me',
    content: 'Not yet, let me check them out right now.',
    timestamp: '10:45 AM',
    type: 'text',
    status: 'delivered'
  },
  {
    id: 'm5',
    senderId: 'me',
    content: 'Wow, these gradients are stunning! 🔥',
    timestamp: '10:46 AM',
    type: 'text',
    status: 'sent'
  }
];