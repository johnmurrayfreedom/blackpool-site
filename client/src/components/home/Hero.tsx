import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import MultiStepForm from '@/components/shared/MultiStepForm';

const Hero = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative text-white overflow-hidden" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            Supporting Our Community
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Get the Help, Advice and Support You're Entitled To</h2>
          <p className="text-lg md:text-xl mb-8">Free, confidential guidance on benefits, housing, debt, healthcare, family support and more.</p>
          <div className="flex flex-col sm:flex-row">
            <Button 
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-white hover:shadow-md transition-all duration-200"
              onClick={() => setIsFormOpen(true)}
            >
              Check What I Qualify For
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

export default Hero;
