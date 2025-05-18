import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_INFO } from '@/lib/constants';
import { EnhancedForm } from '@/components/ui/enhanced-form';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';

// Define the contact form schema with Zod
const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }).optional(),
  postcode: z.string().min(5, { message: "Please enter a valid postcode" }).max(10),
  message: z.string().min(10, { message: "Please tell us how we can help (minimum 10 characters)" })
});

// Infer the type from the schema
type ContactFormData = z.infer<typeof contactSchema>;

const EnhancedContactForm = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Set up the mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setFormSubmitted(true);
    },
    onError: (error) => {
      console.error('Form submission error:', error);
    }
  });

  // Handle form submission
  const handleSubmit = async (data: ContactFormData) => {
    await mutation.mutateAsync(data as FormData);
  };

  // Reset the form after submission
  const handleReset = () => {
    setFormSubmitted(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Get in touch</h2>
      
      {formSubmitted ? (
        <div className="text-center py-8">
          <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you for contacting us!</h3>
            <p className="text-green-700 mb-4">
              We've received your message and will get back to you as soon as possible, usually within 1-2 business days.
            </p>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="mt-2"
            >
              Send another message
            </Button>
          </div>
        </div>
      ) : (
        <EnhancedForm
          schema={contactSchema}
          onSubmit={handleSubmit}
          defaultValues={{
            fullName: '',
            email: '',
            phone: '',
            postcode: '',
            message: ''
          }}
          successMessage="Your message has been sent successfully! We'll be in touch soon."
          className="space-y-6"
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</Label>
              <FormInput 
                id="fullName" 
                name="fullName"
                placeholder="Your full name"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="block text-gray-700 mb-2">Email Address</Label>
              <FormInput 
                id="email" 
                name="email"
                type="email" 
                placeholder="Your email address"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number (optional)</Label>
              <FormInput 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="Your phone number"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="postcode" className="block text-gray-700 mb-2">Postcode</Label>
              <FormInput 
                id="postcode" 
                name="postcode"
                placeholder="Your postcode"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="block text-gray-700 mb-2">How can we help?</Label>
              <FormTextarea 
                id="message" 
                name="message"
                rows={4} 
                placeholder="Tell us about your situation"
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Send Message
            </Button>
          </div>
        </EnhancedForm>
      )}
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-3">Other ways to contact us:</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={['fas', 'phone']} className="text-primary w-4 h-4 mr-2" />
            <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-700 hover:text-primary">{CONTACT_INFO.phone}</a>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={['fas', 'envelope']} className="text-primary w-4 h-4 mr-2" />
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-700 hover:text-primary">{CONTACT_INFO.email}</a>
          </div>
          <div className="flex items-start">
            <FontAwesomeIcon icon={['fas', 'location-dot']} className="text-primary w-4 h-4 mr-2 mt-1" />
            <address className="not-italic text-gray-700">
              {CONTACT_INFO.address}
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedContactForm;