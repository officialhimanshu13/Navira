import { DeveloperProfile, MarketplaceProject, Conversation, BusinessProposal } from '../types/marketplace';

export const FEATURED_DEVELOPERS: DeveloperProfile[] = [
  {
    id: 'dev-1',
    name: 'Arjun Mehta',
    role: 'Full Stack Web Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    location: 'Sector 35, Chandigarh',
    city: 'Chandigarh',
    experienceYears: 4,
    rating: 4.9,
    reviewCount: 120,
    hourlyRate: '₹1,500 / hr',
    completedProjects: 48,
    isVerified: true,
    isAvailable: true,
    bio: 'Specializing in fast, modern web applications, e-commerce storefronts, and automated booking systems for local businesses.',
    aboutMe: 'Passionate developer with 4+ years of experience in building modern web applications for retail, dining, and healthcare clinics across the Tricity region. I focus on clean code, mobile-first design, fast load times, and high Google search conversion.',
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'TypeScript', 'SEO'],
    responseRate: '1 hr response time',
    services: [
      {
        id: 's-1',
        title: 'Custom Business Website',
        description: 'Complete 5-page responsive website with modern UI, mobile responsiveness, fast performance, and local SEO setup.',
        startingPrice: '₹18,000',
        deliveryTime: '7 Days'
      },
      {
        id: 's-2',
        title: 'Online Ordering & Menu Portal',
        description: 'Full food ordering and digital table menu for cafes and restaurants with WhatsApp integration.',
        startingPrice: '₹28,000',
        deliveryTime: '12 Days'
      },
      {
        id: 's-3',
        title: 'Clinic Appointment System',
        description: 'Patient booking workflow with automated SMS/email alerts and doctor availability schedules.',
        startingPrice: '₹24,000',
        deliveryTime: '10 Days'
      }
    ],
    portfolio: [
      {
        id: 'p-1',
        title: 'The Coffee House — Modern Web Presence',
        category: 'Restaurants & Cafes',
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://thecoffeehouse-demo.netlify.app',
        description: 'Bespoke web portal with table booking, digital menu, and location locator for Chandigarh Sector 17.',
        tags: ['React', 'Tailwind CSS', 'Framer Motion']
      },
      {
        id: 'p-2',
        title: 'Dental Care Care Pro Portal',
        category: 'Healthcare & Clinics',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://dentalcare-demo.netlify.app',
        description: 'Appointment scheduler and procedure guide increasing monthly online patient inquiries by 140%.',
        tags: ['Next.js', 'TypeScript', 'Tailwind']
      },
      {
        id: 'p-3',
        title: 'Aura Silk Storefront',
        category: 'Fashion & Retail',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://aurasilk-demo.netlify.app',
        description: 'Boutique catalogue showcasing seasonal handloom sarees with direct WhatsApp inquiry integration.',
        tags: ['React', 'E-commerce', 'Responsive']
      }
    ],
    testimonials: [
      {
        id: 't-1',
        clientName: 'Rajesh Sharma',
        clientBusiness: 'The Roast Room Cafe',
        location: 'Sector 35, Chandigarh',
        rating: 5,
        comment: 'Arjun delivered our cafe website in under a week. Our online inquiries have doubled and customers love viewing the menu on their phones!',
        date: 'October 2026'
      },
      {
        id: 't-2',
        clientName: 'Dr. Anita Chawla',
        clientBusiness: 'Chawla Vision Centre',
        location: 'Phase 7, Mohali',
        rating: 5,
        comment: 'Exceptional professionalism. He built an appointment scheduling system that our patients find intuitive and easy to use.',
        date: 'September 2026'
      }
    ]
  },
  {
    id: 'dev-2',
    name: 'Priya Sharma',
    role: 'Frontend & UI/UX Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    location: 'Phase 7, Mohali',
    city: 'Mohali',
    experienceYears: 3,
    rating: 4.8,
    reviewCount: 95,
    hourlyRate: '₹1,200 / hr',
    completedProjects: 36,
    isVerified: true,
    isAvailable: true,
    bio: 'Crafting visually stunning, high-converting digital storefronts and responsive web applications for lifestyle and retail brands.',
    aboutMe: 'Specialized in turning brick-and-mortar brands into memorable digital experiences. From high-fashion boutiques to wellness spas in Mohali, I deliver pixel-perfect websites that look magnificent on every screen size.',
    skills: ['React', 'Vue.js', 'Figma', 'Tailwind CSS', 'UI/UX Design', 'JavaScript', 'CSS Animations'],
    responseRate: '30 min response time',
    services: [
      {
        id: 's-4',
        title: 'Boutique Fashion & Salon Website',
        description: 'Immersive visual layout highlighting services, stylist galleries, and instant booking.',
        startingPrice: '₹16,000',
        deliveryTime: '6 Days'
      },
      {
        id: 's-5',
        title: 'UI/UX Redesign & Modernization',
        description: 'Transform an outdated legacy site into a luxury experience matching 2026 international standards.',
        startingPrice: '₹12,000',
        deliveryTime: '5 Days'
      }
    ],
    portfolio: [
      {
        id: 'p-4',
        title: 'Velvet Scissors Salon & Spa',
        category: 'Beauty & Salon',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://velvetscissors-demo.netlify.app',
        description: 'Luxury salon website with price card, stylist showcase, and WhatsApp consultation booking.',
        tags: ['Figma', 'React', 'Tailwind CSS']
      },
      {
        id: 'p-5',
        title: 'Pulse Studio Fitness Portal',
        category: 'Fitness & Yoga',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://pulsestudio-demo.netlify.app',
        description: 'Class schedule display and membership sign-up interface for a high-intensity gym in Phase 8.',
        tags: ['Tailwind CSS', 'React', 'Mobile First']
      }
    ],
    testimonials: [
      {
        id: 't-3',
        clientName: 'Suman Kapoor',
        clientBusiness: 'Glamour Lounge Salon',
        location: 'Sector 22, Chandigarh',
        rating: 5,
        comment: 'Priya understood our luxury brand identity immediately. Our bookings went through the roof after launch.',
        date: 'October 2026'
      }
    ]
  },
  {
    id: 'dev-3',
    name: 'Rohan Verma',
    role: 'E-commerce & Web Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    location: 'Sector 17, Chandigarh',
    city: 'Chandigarh',
    experienceYears: 5,
    rating: 4.8,
    reviewCount: 75,
    hourlyRate: '₹1,800 / hr',
    completedProjects: 54,
    isVerified: true,
    isAvailable: true,
    bio: 'Building fast e-commerce portals, inventory sync, and digital catalogs for shops, auto centres, and retail stores.',
    aboutMe: '5 years of full-stack development experience helping local retail businesses in Chandigarh and Mohali transition to digital sales. Expert in online payment gateways (Razorpay, UPI, Stripe) and inventory catalog management.',
    skills: ['Shopify', 'React', 'Next.js', 'Node.js', 'Razorpay', 'Tailwind CSS', 'WordPress', 'SEO'],
    responseRate: '2 hr response time',
    services: [
      {
        id: 's-6',
        title: 'Full E-commerce Store with UPI/Cards',
        description: 'Product catalog, shopping cart, UPI QR code integration, and order notification bot.',
        startingPrice: '₹25,000',
        deliveryTime: '10 Days'
      },
      {
        id: 's-7',
        title: 'Auto Service Booking & Estimates',
        description: 'Vehicle service booking system with parts pricing calculator and status lookup.',
        startingPrice: '₹20,000',
        deliveryTime: '8 Days'
      }
    ],
    portfolio: [
      {
        id: 'p-6',
        title: 'Capital Auto Hub Service Portal',
        category: 'Auto Repair & Services',
        imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://capitalauto-demo.netlify.app',
        description: 'Service appointment tracker and emergency roadside assistance locator.',
        tags: ['React', 'Node.js', 'Google Maps API']
      }
    ],
    testimonials: [
      {
        id: 't-4',
        clientName: 'Gurpreet Singh',
        clientBusiness: 'Capital Car Care',
        location: 'Sector 26, Chandigarh',
        rating: 5,
        comment: 'Rohan set up our website and customer service tracker seamlessly. Our customers love having a legitimate website to book slots.',
        date: 'September 2026'
      }
    ]
  },
  {
    id: 'dev-4',
    name: 'Neha Kapoor',
    role: 'Brand Designer & Webflow Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    location: 'Sector 82 JLPL, Mohali',
    city: 'Mohali',
    experienceYears: 4,
    rating: 4.9,
    reviewCount: 64,
    hourlyRate: '₹1,400 / hr',
    completedProjects: 40,
    isVerified: true,
    isAvailable: true,
    bio: 'Designing elite digital brands, Webflow sites, and high-impact landing pages for education and professional services.',
    aboutMe: 'Passionate about typography, micro-interactions, and sleek interfaces that convey immediate credibility. I have helped coaching academies and professional consulting firms in Mohali establish commanding online authority.',
    skills: ['Webflow', 'Figma', 'HTML/CSS', 'Branding', 'Copywriting', 'SEO', 'JavaScript'],
    responseRate: '1 hr response time',
    services: [
      {
        id: 's-8',
        title: 'Executive Brand & Authority Website',
        description: 'Turnkey authority website with lead capture, course syllabus download, and testimonials.',
        startingPrice: '₹22,000',
        deliveryTime: '8 Days'
      }
    ],
    portfolio: [
      {
        id: 'p-7',
        title: 'Apex Coaching & Academy Portal',
        category: 'Education & Coaching',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://apexcoaching-demo.netlify.app',
        description: 'Comprehensive student registration portal with course schedule and faculty profiles.',
        tags: ['Webflow', 'SEO', 'Lead Gen']
      }
    ],
    testimonials: [
      {
        id: 't-5',
        clientName: 'Prof. Harish Goyal',
        clientBusiness: 'Apex Institute',
        location: 'Sector 34, Chandigarh',
        rating: 5,
        comment: 'Neha built a website that established our institute as the top choice for competitive exams in Chandigarh.',
        date: 'October 2026'
      }
    ]
  },
  {
    id: 'dev-5',
    name: 'Vikram Malhotra',
    role: 'Cloud Architect & Web Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    location: 'IT Park / Sector 8, Chandigarh',
    city: 'Chandigarh',
    experienceYears: 6,
    rating: 4.7,
    reviewCount: 52,
    hourlyRate: '₹2,000 / hr',
    completedProjects: 60,
    isVerified: true,
    isAvailable: false,
    bio: 'Building enterprise-grade portals, multi-tenant booking platforms, and high-security web systems for corporate services.',
    aboutMe: 'Full-stack software architect with 6 years experience in scalable systems, database optimization, and high-reliability cloud deployment.',
    skills: ['React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'Stripe'],
    responseRate: '3 hr response time',
    services: [
      {
        id: 's-9',
        title: 'Enterprise Multi-Branch Web App',
        description: 'Scalable web system with centralized admin, staff permissions, and analytics.',
        startingPrice: '₹45,000',
        deliveryTime: '20 Days'
      }
    ],
    portfolio: [
      {
        id: 'p-8',
        title: 'Tricity Legal & Corporate Advisors',
        category: 'Professional Services',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://tricitylegal-demo.netlify.app',
        description: 'Confidential client case intake system and legal consultation scheduler.',
        tags: ['Next.js', 'PostgreSQL', 'Security']
      }
    ],
    testimonials: [
      {
        id: 't-6',
        clientName: 'Adv. Manpreet Brar',
        clientBusiness: 'Brar Legal Chambers',
        location: 'Sector 8, Chandigarh',
        rating: 5,
        comment: 'Vikram delivered top-tier work with strict adherence to client confidentiality and speed.',
        date: 'August 2026'
      }
    ]
  },
  {
    id: 'dev-6',
    name: 'Simran Kaur',
    role: 'Mobile & Progressive Web App Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    location: 'Phase 5, Mohali',
    city: 'Mohali',
    experienceYears: 3,
    rating: 4.8,
    reviewCount: 43,
    hourlyRate: '₹1,300 / hr',
    completedProjects: 28,
    isVerified: true,
    isAvailable: true,
    bio: 'Specialized in ultra-fast installable PWAs, mobile menus, and offline-capable web solutions for stores.',
    aboutMe: 'Turning websites into mobile-app experiences without the hassle of App Store approval. Customers can install your website directly on their phone home screens with 1 tap.',
    skills: ['React', 'PWA', 'Tailwind CSS', 'Firebase', 'Service Workers', 'JavaScript', 'UI Design'],
    responseRate: '1 hr response time',
    services: [
      {
        id: 's-10',
        title: 'Installable Mobile Progressive Web App',
        description: 'Enable app-like mobile experience with push notifications and offline access for repeat shoppers.',
        startingPrice: '₹19,000',
        deliveryTime: '8 Days'
      }
    ],
    portfolio: [
      {
        id: 'p-9',
        title: 'Daily Fresh Organic Store PWA',
        category: 'Retail & Boutiques',
        imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://dailyfresh-demo.netlify.app',
        description: 'Instant mobile web grocery catalog with 1-tap WhatsApp cart checkout.',
        tags: ['PWA', 'React', 'Mobile']
      }
    ],
    testimonials: [
      {
        id: 't-7',
        clientName: 'Amanpreet Singh',
        clientBusiness: 'Organic Earth Store',
        location: 'Phase 5, Mohali',
        rating: 5,
        comment: 'Simran created an awesome mobile PWA. Our regulars in Mohali order directly through the phone shortcut every day.',
        date: 'October 2026'
      }
    ]
  }
];

export const INITIAL_PROJECTS: MarketplaceProject[] = [
  {
    id: 'proj-1',
    title: 'The Coffee House — Modern Web Presence & Table Booking',
    businessName: 'The Coffee House',
    businessCategory: 'Restaurants, Cafes & Bakeries',
    businessCity: 'Chandigarh',
    businessLocality: 'Sector 17',
    clientName: 'Sunil Duggal (Owner)',
    developerId: 'dev-1',
    developerName: 'Arjun Mehta',
    developerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'Development',
    progressPercentage: 65,
    budget: '₹22,000',
    deadline: 'Nov 12, 2026',
    lastUpdate: '2 hours ago',
    milestones: [
      { id: 'm-1', title: 'Brand discovery & layout wireframes', completed: true, dueDate: 'Oct 20, 2026' },
      { id: 'm-2', title: 'UI design approval & menu digital assets', completed: true, dueDate: 'Oct 26, 2026' },
      { id: 'm-3', title: 'Frontend coding with mobile responsiveness', completed: false, dueDate: 'Nov 05, 2026' },
      { id: 'm-4', title: 'Online booking table test & Google Maps sync', completed: false, dueDate: 'Nov 09, 2026' },
      { id: 'm-5', title: 'Domain configuration & official launch', completed: false, dueDate: 'Nov 12, 2026' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Sharma Dental Clinic — Patient Portal & Online Appointment System',
    businessName: 'Sharma Dental & Orthodontic Clinic',
    businessCategory: 'Healthcare & Dental Clinics',
    businessCity: 'Chandigarh',
    businessLocality: 'Sector 35',
    clientName: 'Dr. Vivek Sharma',
    developerId: 'dev-1',
    developerName: 'Arjun Mehta',
    developerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'Client Review',
    progressPercentage: 88,
    budget: '₹26,000',
    deadline: 'Nov 06, 2026',
    lastUpdate: 'Yesterday',
    milestones: [
      { id: 'm-6', title: 'Requirements & clinic workflow specification', completed: true, dueDate: 'Oct 15, 2026' },
      { id: 'm-7', title: 'Doctor schedule & appointment slots logic', completed: true, dueDate: 'Oct 24, 2026' },
      { id: 'm-8', title: 'Patient SMS notification integration', completed: true, dueDate: 'Oct 30, 2026' },
      { id: 'm-9', title: 'Final clinic staff review and feedback', completed: false, dueDate: 'Nov 04, 2026' },
      { id: 'm-10', title: 'Live deployment on sharmadentalclinic.in', completed: false, dueDate: 'Nov 06, 2026' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Velvet Scissors Unisex Salon — Booking & Price Card Website',
    businessName: 'Velvet Scissors Unisex Salon',
    businessCategory: 'Salons & Spas',
    businessCity: 'Mohali',
    businessLocality: 'Phase 7',
    clientName: 'Kavita Chhabra',
    developerId: 'dev-2',
    developerName: 'Priya Sharma',
    developerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    status: 'Design & Wireframes',
    progressPercentage: 40,
    budget: '₹18,000',
    deadline: 'Nov 18, 2026',
    lastUpdate: '3 days ago',
    milestones: [
      { id: 'm-11', title: 'Color palette & luxury salon moodboard', completed: true, dueDate: 'Oct 28, 2026' },
      { id: 'm-12', title: 'Figma interactive prototype review', completed: false, dueDate: 'Nov 04, 2026' },
      { id: 'm-13', title: 'Responsive web development', completed: false, dueDate: 'Nov 12, 2026' },
      { id: 'm-14', title: 'Stylist portfolio & Instagram feed hook', completed: false, dueDate: 'Nov 15, 2026' },
      { id: 'm-15', title: 'Go live on custom domain', completed: false, dueDate: 'Nov 18, 2026' }
    ]
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'dev-1',
    participantName: 'Arjun Mehta',
    participantRole: 'Full Stack Web Developer',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    businessOrTitle: 'The Coffee House Website Project',
    lastMessage: 'I have updated the interactive table reservation preview. Let me know your thoughts on the mobile layout!',
    timestamp: '10:42 AM',
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: 'msg-1',
        senderId: 'dev-1',
        senderName: 'Arjun Mehta',
        senderRole: 'developer',
        text: 'Hello Mr. Sunil! Thank you for connecting on NAVIRA. I reviewed your current Google Maps listing in Sector 17.',
        timestamp: 'Yesterday 3:15 PM'
      },
      {
        id: 'msg-2',
        senderId: 'user',
        senderName: 'Sunil Duggal',
        senderRole: 'client',
        text: 'Hi Arjun! Yes, we have hundreds of 5-star reviews on Google Maps, but customers keep asking for our menu and private party bookings online.',
        timestamp: 'Yesterday 3:20 PM'
      },
      {
        id: 'msg-3',
        senderId: 'dev-1',
        senderName: 'Arjun Mehta',
        senderRole: 'developer',
        text: 'That is exactly where the opportunity is. We will create a high-speed mobile-first site with an instant digital menu and direct WhatsApp table reservation.',
        timestamp: 'Yesterday 3:25 PM'
      },
      {
        id: 'msg-4',
        senderId: 'user',
        senderName: 'Sunil Duggal',
        senderRole: 'client',
        text: 'That sounds perfect. How soon can we see the initial prototype?',
        timestamp: 'Yesterday 4:00 PM'
      },
      {
        id: 'msg-5',
        senderId: 'dev-1',
        senderName: 'Arjun Mehta',
        senderRole: 'developer',
        text: 'I have updated the interactive table reservation preview. Let me know your thoughts on the mobile layout!',
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    participantId: 'dev-2',
    participantName: 'Priya Sharma',
    participantRole: 'Frontend & UI/UX Specialist',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    businessOrTitle: 'Velvet Scissors Salon Website',
    lastMessage: 'The new color palette and service price card wireframes are ready for your review.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'msg-6',
        senderId: 'dev-2',
        senderName: 'Priya Sharma',
        senderRole: 'developer',
        text: 'Hi Kavita! Excited to collaborate on the Velvet Scissors web presence.',
        timestamp: 'Oct 28 2:10 PM'
      },
      {
        id: 'msg-7',
        senderId: 'user',
        senderName: 'Kavita Chhabra',
        senderRole: 'client',
        text: 'Hi Priya! We want the website to feel as luxurious as our Phase 7 salon.',
        timestamp: 'Oct 28 2:15 PM'
      },
      {
        id: 'msg-8',
        senderId: 'dev-2',
        senderName: 'Priya Sharma',
        senderRole: 'developer',
        text: 'The new color palette and service price card wireframes are ready for your review.',
        timestamp: 'Yesterday 11:30 AM'
      }
    ]
  },
  {
    id: 'conv-3',
    participantId: 'dev-3',
    participantName: 'Rohan Verma',
    participantRole: 'E-commerce & Web Developer',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    businessOrTitle: 'Capital Car Care Inquiry',
    lastMessage: 'Sent you the proposal for the auto service booking flow with parts price list.',
    timestamp: 'Oct 29',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 'msg-9',
        senderId: 'dev-3',
        senderName: 'Rohan Verma',
        senderRole: 'developer',
        text: 'Sent you the proposal for the auto service booking flow with parts price list.',
        timestamp: 'Oct 29 4:20 PM'
      }
    ]
  }
];

export const INITIAL_PROPOSALS: BusinessProposal[] = [
  {
    id: 'prop-1',
    businessId: 'CHD-001',
    businessName: 'The Coffee House',
    businessCategory: 'Restaurants, Cafes & Bakeries',
    businessLocality: 'Sector 17',
    businessCity: 'Chandigarh',
    developerId: 'dev-1',
    developerName: 'Arjun Mehta',
    developerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    proposedBudget: '₹22,000',
    estimatedDelivery: '10 Days',
    pitchSummary: 'Build an elegant, high-speed web presence with an interactive visual menu and instant table booking integration.',
    featuresOffered: ['Mobile-first design', 'Digital QR Menu', 'Google Maps SEO Optimization', 'Fast load (< 1.2s)', 'WhatsApp direct reservation'],
    status: 'In Discussion',
    sentDate: 'Oct 25, 2026'
  },
  {
    id: 'prop-2',
    businessId: 'CHD-002',
    businessName: 'Gopal Sweets & Restaurant',
    businessCategory: 'Restaurants, Cafes & Bakeries',
    businessLocality: 'Sector 35',
    businessCity: 'Chandigarh',
    developerId: 'dev-3',
    developerName: 'Rohan Verma',
    developerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    proposedBudget: '₹35,000',
    estimatedDelivery: '14 Days',
    pitchSummary: 'Full festive gift box online ordering system with UPI payment and bulk corporate order forms.',
    featuresOffered: ['Festive hampers catalog', 'Automated invoice generator', 'UPI/Credit Card integration', 'Store branch locator'],
    status: 'Sent',
    sentDate: 'Oct 27, 2026'
  },
  {
    id: 'prop-3',
    businessId: 'MOH-012',
    businessName: 'Velvet Scissors Unisex Salon',
    businessCategory: 'Salons & Spas',
    businessLocality: 'Phase 7',
    businessCity: 'Mohali',
    developerId: 'dev-2',
    developerName: 'Priya Sharma',
    developerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    proposedBudget: '₹18,000',
    estimatedDelivery: '8 Days',
    pitchSummary: 'Boutique beauty portal highlighting services, stylist portfolio, and online appointment slots.',
    featuresOffered: ['Luxury visual branding', 'Service rate card', 'Stylist portfolio showcase', 'Google Reviews live embed'],
    status: 'Proposal Accepted',
    sentDate: 'Oct 26, 2026'
  }
];

export const CATEGORY_SHOWCASE = [
  {
    id: 'cat-restaurants',
    title: 'Restaurants & Cafes',
    queryCategory: 'Restaurants, Cafes & Bakeries',
    description: 'Digital menus, table booking, and customer review showcases for dining establishments.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '48 Opportunities in Tricity',
    popularFeatures: ['Online Menu', 'Table Booking', 'Google Reviews']
  },
  {
    id: 'cat-fashion',
    title: 'Fashion & Clothing',
    queryCategory: 'Retail & Boutiques',
    description: 'Lookbooks, designer collections, and seasonal catalog showcase websites.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '34 Opportunities in Tricity',
    popularFeatures: ['Digital Catalog', 'WhatsApp Checkout', 'Instagram Feed']
  },
  {
    id: 'cat-beauty',
    title: 'Beauty & Salon',
    queryCategory: 'Salons & Spas',
    description: 'Stylist portfolios, service rate cards, and instant appointment booking.',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '39 Opportunities in Tricity',
    popularFeatures: ['Service Card', 'Stylist Gallery', 'Direct Booking']
  },
  {
    id: 'cat-retail',
    title: 'Retail & Shopping',
    queryCategory: 'Retail & Boutiques',
    description: 'Store locator, product catalogs, and local home delivery portals.',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '42 Opportunities in Tricity',
    popularFeatures: ['Inventory Catalog', 'Local SEO', 'Store Hours']
  },
  {
    id: 'cat-healthcare',
    title: 'Healthcare & Clinics',
    queryCategory: 'Healthcare & Dental Clinics',
    description: 'Doctor profiles, clinic services, treatment guides, and appointment booking.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '35 Opportunities in Tricity',
    popularFeatures: ['Doctor Bios', 'Appointment Slots', 'Patient FAQ']
  },
  {
    id: 'cat-education',
    title: 'Education & Coaching',
    queryCategory: 'Education & Coaching Institutes',
    description: 'Course timetables, faculty credentials, syllabus downloads, and student registration.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '28 Opportunities in Tricity',
    popularFeatures: ['Course Timetable', 'Enrollment Form', 'Results Showcase']
  },
  {
    id: 'cat-fitness',
    title: 'Fitness & Gyms',
    queryCategory: 'Fitness Centres & Yoga Studios',
    description: 'Trainer profiles, class schedules, membership pricing, and workout trials.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '24 Opportunities in Tricity',
    popularFeatures: ['Class Timetable', 'Trainer Bios', 'Trial Passes']
  },
  {
    id: 'cat-services',
    title: 'Professional Services',
    queryCategory: 'Home & Professional Services',
    description: 'Authority portfolios, client consultation intake, and trust-building websites.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    opportunitiesCount: '31 Opportunities in Tricity',
    popularFeatures: ['Client Intake', 'Case Studies', 'Consultation Request']
  }
];

