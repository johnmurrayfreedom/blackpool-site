import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_INFO } from '@/lib/constants';

const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }).optional(),
  postcode: z.string().min(5, { message: "Please enter a valid postcode" }).max(10),
  message: z.string().min(10, { message: "Please tell us how we can help" })
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      postcode: '',
      message: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return apiRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      setIsSubmitting(false);
      reset();
      toast({
        title: "Message sent",
        description: "Thanks for reaching out. We'll be in touch shortly.",
      });
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        title: "Submission Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white rounded-lg overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">GET IN TOUCH</h2>
              <p className="text-lg mb-6">Our team is here to help you access the support you need. Contact us by phone, visit our office, or fill in the form to get started.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <FontAwesomeIcon icon="map-marker-alt" className="mt-1 mr-3" />
                  <p>{CONTACT_INFO.address}</p>
                </div>
                <div className="flex items-start">
                  <FontAwesomeIcon icon="envelope" className="mt-1 mr-3" />
                  <p>{CONTACT_INFO.email}</p>
                </div>
                <div className="flex items-start">
                  <FontAwesomeIcon icon="clock" className="mt-1 mr-3" />
                  <p>Monday to Friday: {CONTACT_INFO.openingHours.monday}<br />
                     Saturday: {CONTACT_INFO.openingHours.saturday}<br />
                     Sunday: {CONTACT_INFO.openingHours.sunday}</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="https://facebook.com" rel="noopener noreferrer" className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/30 focus-visible" aria-label="Facebook">
                  <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                </a>
                <a href="https://twitter.com" rel="noopener noreferrer" className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/30 focus-visible" aria-label="Twitter">
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href="https://instagram.com" rel="noopener noreferrer" className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/30 focus-visible" aria-label="Instagram">
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white p-8 md:p-12">
              <h3 className="text-xl font-bold text-primary mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="Your name"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="email" className="block text-gray-700 mb-2">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="postcode" className="block text-gray-700 mb-2">Postcode</Label>
                  <Input 
                    id="postcode" 
                    type="text" 
                    placeholder="Your postcode"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    {...register('postcode')}
                  />
                  {errors.postcode && (
                    <p className="text-sm text-red-500 mt-1">{errors.postcode.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message" className="block text-gray-700 mb-2">How can we help?</Label>
                  <Textarea 
                    id="message" 
                    rows={4} 
                    placeholder="Tell us about your situation"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
