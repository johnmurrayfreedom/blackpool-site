import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ServiceType } from '../types';

export const SITE_NAME = "Citizens Information & Advice Bureau";
export const SITE_TAGLINE = "Free advice for Blackpool, Fylde & Wyre residents";

// Contact information
export const CONTACT_INFO = {
  address: "27 St Anne's Road, Blackpool, Lancs, FY4 2AP",
  phone: "01253 835580",
  email: "info@blackpooladvice.org",
  website: "www.blackpooladvice.org",
  openingHours: {
    monday: "9am - 6pm",
    tuesday: "9am - 6pm",
    wednesday: "9am - 6pm",
    thursday: "9am - 6pm",
    friday: "9am - 6pm",
    saturday: "9am - 6pm",
    sunday: "9am - 6pm"
  }
};

// Footer links for navigation
export const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Health & Disability", href: "/services/health-disability" },
      { name: "Elderly Support", href: "/services/elderly-support" },
      { name: "Family Support", href: "/services/family-support" },
      { name: "Education & Training", href: "/services/education-training" },
      { name: "Debt Support", href: "/services/debt-support" },
      { name: "Business Support", href: "/services/business-support" }
    ]
  },
  {
    title: "Information",
    links: [
      { name: "About Us", href: "/about" },
      { name: "News & Updates", href: "/news" },
      { name: "Contact Us", href: "/contact" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Benefits Calculator", href: "/resources/benefits-calculator" },
      { name: "Debt Advice Tool", href: "/resources/debt-advice" },
      { name: "Grant Finder", href: "/resources/grant-finder" },
      { name: "Fact Sheets", href: "/resources/fact-sheets" },
      { name: "Service Map", href: "/resources/service-map" }
    ]
  }
];

// Service information for the different service pages and multi-step form
export const services = [
  {
    id: 'health-disability',
    name: 'Health & Disability',
    description: 'Get help claiming disability benefits, finding support services and accessing healthcare.',
    icon: 'hospital' as IconProp,
    pageData: {
      eyebrow: 'Health & Disability Support',
      title: 'Disability Benefits & Healthcare Support',
      lead: 'Get help accessing the benefits, equipment and support you need to live well with health conditions or disabilities.',
      cta: 'Check eligibility'
    }
  },
  {
    id: 'elderly-support',
    name: 'Elderly Support',
    description: 'Help with pensions, care arrangements, power of attorney and winter fuel payments.',
    icon: 'user-friends' as IconProp,
    pageData: {
      eyebrow: 'Support for Older People',
      title: 'Make Later Life More Comfortable',
      lead: 'Get help with pensions, care arrangements, staying warm and planning for the future.',
      cta: 'See what help is available'
    }
  },
  {
    id: 'family-support',
    name: 'Family & Low-Income Support',
    description: 'Support with cost-of-living payments, household support fund and child benefit.',
    icon: 'users' as IconProp,
    pageData: {
      eyebrow: 'Family & Low-Income Support',
      title: 'Extra Help for Households Under Pressure',
      lead: 'Access financial help for families and individuals on low incomes, including cost-of-living support, benefit checks and grants.',
      cta: 'Check if you qualify'
    }
  },
  {
    id: 'education-training',
    name: 'Education & Training',
    description: 'Guidance on training grants, student finance and school-related benefits.',
    icon: 'graduation-cap' as IconProp,
    pageData: {
      eyebrow: 'Education & Training Support',
      title: 'Funding for Skills and Qualifications',
      lead: 'Discover grants and funding for course fees, equipment, childcare while studying, and travel costs.',
      cta: 'Find funding options'
    }
  },
  {
    id: 'debt-support',
    name: 'Debt & Money Advice',
    description: 'Free debt management plans, budgeting help and negotiations with creditors.',
    icon: 'hand-holding-usd' as IconProp,
    pageData: {
      eyebrow: 'Debt & Money Support',
      title: 'Free, Confidential Debt Advice',
      lead: 'Get practical help with bills, arrears and loans through expert debt advice, management plans and creditor negotiation.',
      cta: 'Get debt advice'
    }
  },
  {
    id: 'business-support',
    name: 'Business Support',
    description: 'Grants for websites, digital transformation and navigating business regulations.',
    icon: 'briefcase' as IconProp,
    pageData: {
      eyebrow: 'Small Business Support',
      title: 'Grants & Support for Local Businesses',
      lead: 'Access grants, AI tools and digital support to grow your business in Blackpool, Fylde & Wyre.',
      cta: 'See available grants'
    }
  }
];

// Featured grants for the home page
export const featuredGrants = [
  {
    id: 1,
    title: "Winter Fuel Payment",
    description: "Help with heating costs during winter months for those born before 1957",
    amount: "£100 - £300",
    icon: "fire" as IconProp
  },
  {
    id: 2,
    title: "Business Website Grant",
    description: "80% off professional website development for small businesses",
    amount: "Up to £5,000",
    icon: "laptop" as IconProp
  },
  {
    id: 3,
    title: "Household Support Fund",
    description: "Emergency assistance with essentials like food and energy costs",
    amount: "£200 - £500",
    icon: "home" as IconProp
  }
];

// Testimonials for the home page
export const testimonials = [
  {
    id: 1,
    quote: "I was struggling to heat my home last winter. The advisor helped me claim Winter Fuel Payment and Warm Home Discount that I didn't know I was eligible for.",
    name: "Margaret",
    location: "Blackpool",
    initials: "MB",
    service: "Elderly Support"
  },
  {
    id: 2,
    quote: "As a small business owner, I couldn't afford a professional website. The grant covered 80% of the costs and has transformed my business.",
    name: "James",
    location: "Fylde",
    initials: "JT",
    service: "Business Support"
  },
  {
    id: 3,
    quote: "After my disability assessment was rejected, I was at a loss. The team helped me appeal the decision and I now receive the support I need.",
    name: "Sarah",
    location: "Wyre",
    initials: "SW",
    service: "Health & Disability"
  }
];

// Partners for the home page
export const partners = [
  {
    id: 1,
    name: "Blackpool Council",
    logo: "building" as IconProp
  },
  {
    id: 2,
    name: "Fylde Borough Council",
    logo: "city" as IconProp
  },
  {
    id: 3,
    name: "Wyre Council",
    logo: "landmark" as IconProp
  },
  {
    id: 4,
    name: "NHS Blackpool",
    logo: "hospital" as IconProp
  },
  {
    id: 5,
    name: "DWP",
    logo: "pound-sign" as IconProp
  },
  {
    id: 6,
    name: "Citizens Advice",
    logo: "info-circle" as IconProp
  }
];

// Featured news items for the home page and news page
export const newsItems = [
  {
    id: 1,
    title: "New Cost of Living Support Package Announced",
    date: "May 4, 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Person holding bills and calculator",
    excerpt: "The government has announced a new package of support measures to help households with rising costs, including direct payments to vulnerable households."
  },
  {
    id: 2,
    title: "Free Digital Skills Workshops Launching Next Month",
    date: "May 1, 2025",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Person using laptop at desk",
    excerpt: "Join our free workshops to improve your digital skills, from basics like email and internet safety to more advanced topics like online job searching."
  },
  {
    id: 3,
    title: "New Disability Benefits Guide Published",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1573497701240-321008586e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Person in wheelchair accessing services",
    excerpt: "Our comprehensive guide to disability benefits has been updated to reflect recent changes in eligibility criteria and application processes."
  }
];