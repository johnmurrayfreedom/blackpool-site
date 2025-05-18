export type ServiceType = 
  | 'health-disability'
  | 'elderly-support'
  | 'family-support'
  | 'education-training'
  | 'debt-support'
  | 'business-support';

export interface FormData {
  fullName?: string;
  email: string;
  postcode: string;
  phone?: string;
  message?: string;
  serviceInterest?: ServiceType;
}