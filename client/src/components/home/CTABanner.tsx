import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MultiStepForm from '@/components/shared/MultiStepForm';

const CTABanner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-6 md:mb-0 md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Not Sure What Help You Need?</h2>
            <p className="text-lg">Our team can check all available support options for your situation in one quick consultation.</p>
          </div>
          <div className="md:w-1/3 md:text-right">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => setIsFormOpen(true)}
            >
              Get a Free Assessment
            </Button>
          </div>
        </div>
      </div>

      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  );
};

export default CTABanner;
