import { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GoHighLevelFormProps {
  isOpen: boolean;
  onClose: () => void;
  formId?: string;
  title?: string;
}

const GoHighLevelForm: React.FC<GoHighLevelFormProps> = ({ 
  isOpen, 
  onClose, 
  formId = "fwy23eRvplw8LOZvmHzA", // Default form ID
  title = "Contact Citizens Information & Advice Bureau"
}) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // Load the GoHighLevel script when the component mounts
  useEffect(() => {
    if (isOpen) {
      // Only create and append the script if it doesn't already exist
      if (!document.querySelector('script[src*="gohighlevel.uk/js/form_embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://api.gohighlevel.uk/js/form_embed.js';
        script.async = true;
        document.body.appendChild(script);
        scriptRef.current = script;
      }
      
      // Initialize the form when the iframe container is available
      if (iframeContainerRef.current) {
        // Clear any existing content
        iframeContainerRef.current.innerHTML = '';
        
        // Create the iframe element with proper attributes
        const iframe = document.createElement('iframe');
        iframe.src = `https://api.gohighlevel.uk/widget/form/${formId}`;
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '3px';
        iframe.id = `inline-${formId}`;
        iframe.setAttribute('data-layout', "{'id':'INLINE'}");
        iframe.setAttribute('data-trigger-type', 'alwaysShow');
        iframe.setAttribute('data-activation-type', 'alwaysActivated');
        iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
        iframe.setAttribute('data-form-name', 'CIAB - Contact Form');
        iframe.setAttribute('data-height', '600');
        iframe.setAttribute('data-layout-iframe-id', `inline-${formId}`);
        iframe.setAttribute('data-form-id', formId);
        iframe.title = title;
        
        // Append the iframe to the container
        iframeContainerRef.current.appendChild(iframe);
        
        // Trigger any initialization the script might need
        setTimeout(() => {
          if (window.GHLSignupForm && typeof window.GHLSignupForm.init === 'function') {
            window.GHLSignupForm.init();
          }
        }, 200);
      }
    }
    
    return () => {
      // We don't remove the script on unmount as it may be needed for other forms
      // If we need to clean up specific form instances, we could do that here
    };
  }, [isOpen, formId, title]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-auto max-h-[90vh]" aria-describedby="contact-form-description">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4" aria-label="Close">
              ✕
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="text-center p-4">
          <p className="text-sm text-gray-500 mb-2">
            <strong>Citizens Information & Advice Bureau</strong><br />
            Free advice for Blackpool, Fylde & Wyre residents
          </p>
        </div>
        
        <div ref={iframeContainerRef} className="px-1 py-2 h-[600px] overflow-y-auto bg-white rounded-md">
          {/* The iframe will be dynamically inserted here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add TypeScript interface for the global GHLSignupForm
declare global {
  interface Window {
    GHLSignupForm?: {
      init: () => void;
    };
  }
}

export default GoHighLevelForm;