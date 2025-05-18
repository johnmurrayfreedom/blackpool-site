import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Checkbox } from '@/components/ui/checkbox';
import { storeUserEmail } from '@/lib/tracking';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  toolName: string;
}

const UserRegistrationModal = ({ isOpen, onClose, onSuccess, toolName }: UserRegistrationModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'email' | 'details'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [postcode, setPostcode] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    
    try {
      // This would normally redirect to the OAuth provider
      // For now, we'll simulate a successful login
      setTimeout(() => {
        const mockUserData = {
          id: Math.floor(Math.random() * 10000),
          email: 'user@example.com',
          fullName: 'Demo User',
          provider
        };
        
        storeUserEmail(mockUserData.email);
        toast({
          title: "Logged in successfully",
          description: `Welcome to ${toolName}!`,
        });
        
        onSuccess(mockUserData);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was a problem with your login. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  const handleEmailContinue = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setStep('details');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !postcode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Register the user with our API
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          fullName,
          postcode,
          marketingConsent
        }),
      });
      
      storeUserEmail(email);
      
      toast({
        title: "Account created successfully",
        description: `Welcome to ${toolName}!`,
      });
      
      onSuccess(response);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setStep('email');
    setEmail('');
    setFullName('');
    setPostcode('');
    setMarketingConsent(false);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary">
            {step === 'email' ? 'Access the ' + toolName : 'Complete your profile'}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {step === 'email' 
              ? 'Create a free account to save your results and access all our tools.'
              : 'Please provide a few more details to personalize your experience.'}
          </DialogDescription>
        </DialogHeader>
        
        {step === 'email' ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              
              <div className="relative flex items-center justify-center text-xs uppercase my-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400">or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={['fab', 'google']} className="h-4 w-4" />
                  <span>Continue with Google</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={['fab', 'facebook']} className="h-4 w-4" />
                  <span>Continue with Facebook</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={['fab', 'apple']} className="h-4 w-4" />
                  <span>Continue with Apple</span>
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                className="w-full bg-primary" 
                onClick={handleEmailContinue}
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : 'Continue with Email'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-medium">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postcode" className="font-medium">Postcode</Label>
                <Input
                  id="postcode"
                  placeholder="FY1 1AA"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">We use this to provide local support information</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={marketingConsent}
                  onCheckedChange={(checked) => setMarketingConsent(checked === true)}
                  disabled={isLoading}
                />
                <label
                  htmlFor="marketing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Send me helpful resources & updates (optional)
                </label>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md mb-4 text-xs text-blue-700">
              Your information is protected under our <a href="/privacy-policy" className="underline">Privacy Policy</a> and will only be used to personalize your experience.
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep('email')}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationModal;