import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { featuredGrants } from '../../lib/constants';
import MultiStepForm from '../../components/shared/MultiStepForm';
import { ServiceType } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeaturedGrants = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | undefined>(undefined);

  // No badge colors needed for our current implementation

  const openForm = (serviceId: ServiceType) => {
    setSelectedService(serviceId);
    setIsFormOpen(true);
  };

  return (
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">FEATURED GRANTS & SUPPORT</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            These popular support schemes are currently available to eligible residents and businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGrants.map((grant) => (
            <div key={grant.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={grant.icon} className="text-primary text-xl" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{grant.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{grant.description}</p>
                <div className="flex justify-between items-center mb-5">
                  <span className="font-semibold text-lg">{grant.amount}</span>
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => openForm("family-support" as ServiceType)}
                >
                  Check eligibility
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        initialService={selectedService}
      />
    </section>
  );
};

export default FeaturedGrants;
