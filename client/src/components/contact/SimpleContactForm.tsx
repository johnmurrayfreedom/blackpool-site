import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_INFO } from '@/lib/constants';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
  serviceInterest?: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  message?: string;
}

const SimpleContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isPostcodeValid, setIsPostcodeValid] = useState<boolean | null>(null);
  const [isValidatingPostcode, setIsValidatingPostcode] = useState(false);
  const [postcodeMessage, setPostcodeMessage] = useState<string>('');
  
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
    serviceInterest: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear errors when field is edited
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear postcode validation when postcode changes
    if (name === 'postcode') {
      setIsPostcodeValid(null);
      setPostcodeMessage('');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validatePostcode = async (postcode: string) => {
    if (!postcode) return;
    
    setIsValidatingPostcode(true);
    
    // Format and validate postcode
    const formattedPostcode = postcode.toUpperCase().replace(/\s/g, '');
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/;
    
    if (!postcodeRegex.test(formattedPostcode)) {
      setIsPostcodeValid(false);
      setPostcodeMessage('Please enter a valid UK postcode');
      setIsValidatingPostcode(false);
      return false;
    }
    
    // Simple check for Blackpool, Fylde and Wyre areas
    const blackpoolFyldeWyrePrefixes = ['FY1', 'FY2', 'FY3', 'FY4', 'FY5', 'FY6', 'FY7', 'FY8', 'PR3', 'PR4'];
    const prefix = formattedPostcode.substring(0, 3);
    
    // Simulate API delay
    setTimeout(() => {
      if (blackpoolFyldeWyrePrefixes.includes(prefix)) {
        setIsPostcodeValid(true);
        setPostcodeMessage('Postcode is within our service area');
      } else {
        setIsPostcodeValid(false);
        setPostcodeMessage('This postcode appears to be outside our primary service area (Blackpool, Fylde & Wyre). We may refer you to services in your local area.');
      }
      setIsValidatingPostcode(false);
    }, 800);
    
    return true;
  };
  
  useEffect(() => {
    // Debounce postcode validation
    const handler = setTimeout(() => {
      if (formData.postcode && formData.postcode.length >= 5) {
        validatePostcode(formData.postcode);
      }
    }, 1000);
    
    return () => {
      clearTimeout(handler);
    };
  }, [formData.postcode]);
  
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^(?:(?:\+44\s?|0)(?:1[23456789]\d{8,9}|7[1345789]\d{9}))$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid UK phone number';
    }
    
    // Postcode validation
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    } else if (isPostcodeValid === false) {
      // We'll still allow form submission but keep the warning message
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us how we can help you';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isValidatingPostcode) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format postcode properly (with space)
      const formattedPostcode = formData.postcode.toUpperCase().replace(/\s/g, '');
      const formattedFormData = {
        ...formData,
        postcode: formattedPostcode.length > 3 
          ? `${formattedPostcode.slice(0, -3)} ${formattedPostcode.slice(-3)}`
          : formattedPostcode
      };
      
      // Send form data to the API
      await apiRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedFormData),
      });
      
      // Show success message
      setFormSubmitted(true);
      toast({
        title: "Message Sent Successfully",
        description: "We've received your enquiry and will be in touch shortly.",
        variant: "default"
      });
    } catch (error) {
      // Show error message
      toast({
        title: "Error Submitting Form",
        description: "There was a problem sending your message. Please try again or contact us directly on 01253 835580.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReset = () => {
    setFormSubmitted(false);
    setErrors({});
    setIsPostcodeValid(null);
    setPostcodeMessage('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      postcode: '',
      message: '',
      serviceInterest: ''
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 md:p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-primary mb-2">Get In Touch</h2>
      <p className="text-gray-600 mb-6">Complete the form below and we'll respond within 1-2 working days</p>
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm text-blue-800">
          Your information is protected under our <a href="/privacy-policy" className="font-medium underline">Privacy Policy</a> and will only be used to respond to your enquiry.
        </AlertDescription>
      </Alert>
      
      {formSubmitted ? (
        <div className="py-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold text-green-800">Thank you for contacting us!</h3>
            </div>
            <p className="text-green-700 mb-4">
              We've received your enquiry and will get back to you as soon as possible, usually within 1-2 business days.
            </p>
            <div className="bg-white p-4 rounded border border-green-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">What happens next?</span>
              </div>
              <ul className="ml-6 list-disc text-sm text-gray-700 space-y-1">
                <li>Our specialist team will review your enquiry</li>
                <li>You'll receive a confirmation email shortly</li>
                <li>We'll contact you within 1-2 working days to discuss how we can help</li>
              </ul>
            </div>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="mt-2"
            >
              Send another enquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="fullName" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full transition-colors ${errors.fullName ? 'border-red-500 focus-visible:ring-red-300' : 'focus-visible:ring-primary/25'}`}
                aria-invalid={errors.fullName ? 'true' : 'false'}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`w-full transition-colors ${errors.email ? 'border-red-500 focus-visible:ring-red-300' : 'focus-visible:ring-primary/25'}`}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">We'll send you a confirmation email</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone Number <span className="text-gray-400 text-sm">(Optional)</span>
              </Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07123 456789"
                className={`w-full transition-colors ${errors.phone ? 'border-red-500 focus-visible:ring-red-300' : 'focus-visible:ring-primary/25'}`}
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="postcode" className="block text-gray-700 font-medium mb-1">
                Postcode <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input 
                  id="postcode" 
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="e.g. FY1 1AA"
                  className={`w-full pr-10 transition-colors ${errors.postcode ? 'border-red-500 focus-visible:ring-red-300' : isPostcodeValid === false ? 'border-amber-500 focus-visible:ring-amber-300' : 'focus-visible:ring-primary/25'}`}
                  aria-invalid={errors.postcode ? 'true' : 'false'}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValidatingPostcode && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                  {isPostcodeValid === true && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {isPostcodeValid === false && <AlertCircle className="h-4 w-4 text-amber-500" />}
                </div>
              </div>
              {errors.postcode && (
                <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
              )}
              {isPostcodeValid === false && postcodeMessage && !errors.postcode && (
                <p className="text-amber-600 text-sm mt-1">{postcodeMessage}</p>
              )}
              {isPostcodeValid === true && postcodeMessage && (
                <p className="text-green-600 text-sm mt-1">{postcodeMessage}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="serviceInterest" className="block text-gray-700 font-medium mb-1">
              Service of Interest <span className="text-gray-400 text-sm">(Optional)</span>
            </Label>
            <select
              id="serviceInterest"
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary"
            >
              <option value="">Please select if applicable</option>
              <option value="health-disability">Health & Disability Support</option>
              <option value="elderly-support">Elderly Support</option>
              <option value="family-support">Family Support</option>
              <option value="education-training">Education & Training</option>
              <option value="debt-support">Debt Support</option>
              <option value="business-support">Business Support</option>
            </select>
            <p className="text-gray-500 text-xs mt-1">This helps us direct your enquiry to the right specialist</p>
          </div>
          
          <div>
            <Label htmlFor="message" className="block text-gray-700 font-medium mb-1">
              How Can We Help? <span className="text-red-500">*</span>
            </Label>
            <Textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4} 
              placeholder="Please describe your situation and what support you're looking for..."
              className={`w-full transition-colors ${errors.message ? 'border-red-500 focus-visible:ring-red-300' : 'focus-visible:ring-primary/25'}`}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              The more details you provide, the better we can prepare for your consultation
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm">
            <p className="text-gray-700">
              By submitting this form, you consent to our processing of your personal data in accordance with our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>. 
              We will use your information only to respond to your enquiry and provide relevant support services.
            </p>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white transition-colors"
            size="lg"
            disabled={isSubmitting || isValidatingPostcode}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Submitting...
              </span>
            ) : (
              'Submit Enquiry'
            )}
          </Button>
        </form>
      )}
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Other ways to contact us:</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={['fas', 'phone']} className="text-primary w-4 h-4 mr-2" />
              <span className="font-medium">Telephone</span>
            </div>
            <a href={`tel:${CONTACT_INFO.phone}`} className="text-primary hover:underline block mb-1">{CONTACT_INFO.phone}</a>
            <p className="text-gray-500 text-sm">Monday to Friday, 9am to 5pm</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={['fas', 'envelope']} className="text-primary w-4 h-4 mr-2" />
              <span className="font-medium">Email</span>
            </div>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary hover:underline block mb-1 break-words">{CONTACT_INFO.email}</a>
            <p className="text-gray-500 text-sm">We aim to respond within 1-2 working days</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={['fas', 'location-dot']} className="text-primary w-4 h-4 mr-2" />
              <span className="font-medium">Visit Us</span>
            </div>
            <address className="not-italic text-gray-700 mb-1">
              {CONTACT_INFO.address}
            </address>
            <a href="https://www.blackpooladvice.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">www.blackpooladvice.org</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleContactForm;