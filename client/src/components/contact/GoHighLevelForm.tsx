import { useEffect, useRef } from 'react';

interface GoHighLevelFormProps {
  formId?: string;
  containerId?: string;
  className?: string;
}

export default function GoHighLevelForm({ 
  formId = 'your-form-id-here', 
  containerId = 'go-high-level-form-container',
  className = 'w-full min-h-[500px]'
}: GoHighLevelFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  
  useEffect(() => {
    // Only load the script once
    if (scriptLoaded.current) return;
    
    // Create a container for the form if it doesn't exist
    if (!document.getElementById(containerId) && containerRef.current) {
      containerRef.current.id = containerId;
    }
    
    // Add the Go High Level script
    const script = document.createElement('script');
    script.src = `https://link.gohighlevel.com/widget/form/${formId}.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    scriptLoaded.current = true;
    
    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [formId, containerId]);
  
  return (
    <div 
      ref={containerRef} 
      id={containerId}
      className={className}
    >
      <p className="text-center py-4">Loading form...</p>
    </div>
  );
}