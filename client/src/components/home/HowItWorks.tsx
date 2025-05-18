import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MultiStepForm from '@/components/shared/MultiStepForm';

const HowItWorks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Get in Touch",
      description: "Complete our simple form to tell us about your situation, or book a 15-minute consultation with an advisor."
    },
    {
      number: 2,
      title: "Personalised Assessment",
      description: "Our experts will review your details and identify all the support, grants and benefits you may be eligible for."
    },
    {
      number: 3,
      title: "Guided Support",
      description: "We'll help you complete any applications, provide advice on next steps, and support you throughout the entire process."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">How We Help</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our simple process makes accessing support and advice straightforward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsFormOpen(true)}
          >
            Start Your Application
          </Button>
        </div>
      </div>

      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  );
};

export default HowItWorks;
