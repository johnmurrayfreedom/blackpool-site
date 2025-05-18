import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ServiceType } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

// Define schema for data collection
const userDataSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullName: z.string().optional(),
  postcode: z.string().optional(),
  interests: z.array(z.string()).optional(),
  consentMarketing: z.boolean().default(false),
});

type UserDataFormValues = z.infer<typeof userDataSchema>;

interface DataCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: UserDataFormValues) => void;
  title: string;
  description: string;
  resourceType: string;
  resourceName: string;
  collectName?: boolean;
  collectPostcode?: boolean;
  collectInterests?: boolean;
  interestOptions?: {
    value: string;
    label: string;
  }[];
  resourceCategory?: ServiceType | string;
}

export default function DataCollectionModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
  resourceType,
  resourceName,
  collectName = false,
  collectPostcode = false,
  collectInterests = false,
  interestOptions = [],
  resourceCategory
}: DataCollectionModalProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize form with default values
  const form = useForm<UserDataFormValues>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      email: '',
      fullName: '',
      postcode: '',
      interests: [],
      consentMarketing: false,
    }
  });

  // Define the mutation for submitting user data
  const mutation = useMutation({
    mutationFn: (data: UserDataFormValues & { resourceType: string, resourceName: string, resourceCategory?: string }) => {
      return apiRequest('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setSubmitSuccess(true);
      // Wait a short time before closing modal to show success message
      setTimeout(() => {
        onSuccess(form.getValues());
      }, 1000);
    },
    onError: (error) => {
      console.error('Error submitting user data:', error);
      // Even if the server request fails, still let the user access the resource
      onSuccess(form.getValues());
    },
  });

  // Handle form submission
  const onSubmit = (data: UserDataFormValues) => {
    // Add resource information to the submission
    mutation.mutate({ 
      ...data, 
      resourceType, 
      resourceName,
      resourceCategory: resourceCategory || 'general'
    });
  };

  // Close handler with confirmation if form has been partially filled
  const handleClose = () => {
    const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;
    
    // If form is dirty and not submitted successfully, ask for confirmation
    if (isFormDirty && !submitSuccess) {
      const confirmed = window.confirm(
        "You haven't completed the form. If you close now, you'll still be able to access the resource, but we won't be able to personalize your experience. Continue?"
      );
      if (confirmed) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        {!submitSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email field - always required */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="you@example.com" 
                        {...field} 
                        autoFocus 
                      />
                    </FormControl>
                    <FormDescription>
                      We'll send you a copy of this resource.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Name field - optional */}
              {collectName && (
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {/* Postcode field - optional */}
              {collectPostcode && (
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. FY1 1AA" {...field} />
                      </FormControl>
                      <FormDescription>
                        Helps us provide location-specific advice.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {/* Interest selection - optional */}
              {collectInterests && interestOptions.length > 0 && (
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>
                          I'm interested in advice about (optional):
                        </FormLabel>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {interestOptions.map((option) => (
                          <FormField
                            key={option.value}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentInterests = field.value || [];
                                        return checked
                                          ? field.onChange([...currentInterests, option.value])
                                          : field.onChange(
                                              currentInterests.filter(
                                                (value) => value !== option.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {/* Marketing consent */}
              <FormField
                control={form.control}
                name="consentMarketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Send me helpful advice, resources and updates (optional)
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onSuccess(form.getValues())}
                >
                  Skip
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75 12.75L10 15.25L16.25 8.75"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p className="text-center text-gray-500 mb-4">
              Your resource is being prepared. You'll also receive a copy in your inbox.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}