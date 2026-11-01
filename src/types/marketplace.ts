export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  previewUrl?: string;
  description: string;
  tags: string[];
}

export interface DeveloperTestimonial {
  id: string;
  clientName: string;
  clientBusiness: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DeveloperService {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  deliveryTime: string;
}

export interface DeveloperProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  coverUrl?: string;
  location: string;
  city: 'Chandigarh' | 'Mohali' | 'Remote';
  experienceYears: number;
  rating: number;
  reviewCount: number;
  hourlyRate: string;
  completedProjects: number;
  isVerified: boolean;
  isAvailable: boolean;
  bio: string;
  aboutMe: string;
  skills: string[];
  services: DeveloperService[];
  portfolio: PortfolioItem[];
  testimonials: DeveloperTestimonial[];
  responseRate: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface MarketplaceProject {
  id: string;
  title: string;
  businessName: string;
  businessCategory: string;
  businessCity: string;
  businessLocality: string;
  clientName: string;
  developerId: string;
  developerName: string;
  developerAvatar: string;
  status: 'Planning' | 'Design & Wireframes' | 'Development' | 'Client Review' | 'Live / Delivered';
  progressPercentage: number;
  budget: string;
  deadline: string;
  milestones: ProjectMilestone[];
  lastUpdate: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'developer';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  businessOrTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

export interface BusinessProposal {
  id: string;
  businessId: string;
  businessName: string;
  businessCategory: string;
  businessLocality: string;
  businessCity: string;
  developerId: string;
  developerName: string;
  developerAvatar: string;
  proposedBudget: string;
  estimatedDelivery: string;
  pitchSummary: string;
  projectScope?: string;
  whatsappLink?: string;
  featuresOffered: string[];
  status: 'Sent' | 'In Discussion' | 'Proposal Accepted' | 'Declined';
  sentDate: string;
}

