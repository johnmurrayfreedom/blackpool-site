import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { services } from '@/lib/constants';
import { ServiceType, FormData } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
}

// Schema for first step - name, email, phone and postcode
const step1Schema = z.object({
  fullName: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }).optional(),
  postcode: z.string().min(5, { message: "Please enter a valid postcode" }).max(10)
});

// Schema for second step - service selection
const step2Schema = z.object({
  serviceInterest: z.string().min(1, { message: "Please select a service" })
});

// Combined schema for the entire form
const formSchema = step1Schema.merge(step2Schema);

const MultiStepForm: React.FC<MultiStepFormProps> = ({ isOpen, onClose, initialService }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      postcode: '',
      serviceInterest: initialService
    }
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return apiRequest('/api/residents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      // Move to the success step
      setStep(3);
    },
    onError: (error) => {
      toast({
        title: "Submission Error",
        description: error.message || "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleNext = () => {
    if (step === 1) {
      form.trigger(['fullName', 'email', 'postcode']).then((isValid) => {
        if (isValid) setStep(2);
      });
    } else if (step === 2) {
      form.trigger('serviceInterest').then((isValid) => {
        if (isValid) {
          const data = form.getValues();
          mutation.mutate(data);
        }
      });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const openCalendar = () => {
    // Open the GoHighLevel booking widget
    window.open("https://api.gohighlevel.uk/widget/booking/s2PtVdEMTKFWXNPEaRNI", "_blank");
  };

  const handleClose = () => {
    // Reset form and close modal
    form.reset();
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Check Your Eligibility</DialogTitle>
        </DialogHeader>
        
        <div className="px-1 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <p className="mb-4">Just a few quick details to find the right support for you.</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your name"
                    {...form.register('fullName')}
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    {...form.register('phone')}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    placeholder="Your postcode"
                    {...form.register('postcode')}
                  />
                  {form.formState.errors.postcode && (
                    <p className="text-sm text-red-500">{form.formState.errors.postcode.message}</p>
                  )}
                </div>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={handleNext}
                disabled={mutation.isPending}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="mb-4">What support are you most interested in?</p>
              
              <RadioGroup 
                defaultValue={form.getValues().serviceInterest}
                onValueChange={(value) => form.setValue('serviceInterest', value as ServiceType)}
                className="space-y-3"
              >
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={service.id} id={`service-${service.id}`} />
                    <Label htmlFor={`service-${service.id}`} className="text-gray-700">
                      {service.name}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="service-other" />
                  <Label htmlFor="service-other" className="text-gray-700">
                    Not sure / Multiple needs
                  </Label>
                </div>
              </RadioGroup>
              {form.formState.errors.serviceInterest && (
                <p className="text-sm text-red-500">{form.formState.errors.serviceInterest.message}</p>
              )}
              
              <div className="flex space-x-3 pt-2">
                <Button
                  variant="outline" 
                  className="w-1/3 border-primary text-primary hover:bg-primary/5"
                  onClick={handleBack}
                  disabled={mutation.isPending}
                >
                  Back
                </Button>
                <Button 
                  className="w-2/3 bg-primary hover:bg-primary/90" 
                  onClick={handleNext}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Submitting...' : 'Continue'}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-2xl mb-4">
                  <FontAwesomeIcon icon="check" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Thank you!</h4>
                <p className="text-gray-700">We've received your details and will check what support is available for you.</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Book a free consultation</h5>
                <p className="text-sm text-gray-700 mb-4">Get personalised advice from our experts in a 15-minute call or in-person meeting.</p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={openCalendar}
                >
                  Select a time
                </Button>
              </div>
              
              <DialogClose asChild>
                <Button 
                  variant="ghost" 
                  className="text-primary hover:underline"
                  onClick={handleClose}
                >
                  I'll book later
                </Button>
              </DialogClose>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepForm;