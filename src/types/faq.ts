export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'For Businesses' | 'For Developers' | 'Market Intelligence';
}

export interface FaqSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  question: string;
  submittedAt: string;
  status: 'New' | 'Answered' | 'Archived';
  adminNotes?: string;
}

