import React, { useEffect, useRef } from 'react';

interface EmbeddedFormProps {
  title?: string;
  description?: string;
  formHtml: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Component to embed HTML form code from external providers like Go High Level
 * 
 * Usage example:
 * <EmbeddedForm
 *   title="Contact Us"
 *   description="Please fill out this form and we'll get back to you."
 *   formHtml={`
 *     <!-- Go High Level Form Embed Code -->
 *     <iframe src="https://link.gohighlevel.com/widget/form/XYZ123" frameborder="0" scrolling="no" width="100%" height="600"></iframe>
 *     <script src="https://link.gohighlevel.com/widget/form/XYZ123.js"></script>
 *   `}
 * />
 */
export default function EmbeddedForm({
  title,
  description,
  formHtml,
  className = 'w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md',
  containerClassName = 'p-6'
}: EmbeddedFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formContainerRef.current || !formHtml) return;

    // Set the HTML content of the form container
    formContainerRef.current.innerHTML = formHtml;

    // Find any script tags and execute them
    const scriptTags = formContainerRef.current.querySelectorAll('script');
    scriptTags.forEach(oldScript => {
      const newScript = document.createElement('script');
      
      // Copy all attributes from old script to new script
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Copy the content of the script if it's an inline script
      newScript.text = oldScript.text;
      
      // Replace old script with new one
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    };
  }, [formHtml]);

  return (
    <div className={className}>
      <div className={containerClassName}>
        {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        <div ref={formContainerRef} className="form-container">
          {/* Form will be inserted here */}
        </div>
      </div>
    </div>
  );
}