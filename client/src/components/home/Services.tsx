import { useState } from 'react';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/ui/button';
import { services } from '../../lib/constants';
import MultiStepForm from '../../components/shared/MultiStepForm';
import { ServiceType } from '../../types';

const Services = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | undefined>(undefined);

  const openForm = (serviceId: ServiceType) => {
    setSelectedService(serviceId);
    setIsFormOpen(true);
  };

  return (
    <section id="services" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">OUR SERVICES</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover the range of free support services available to residents of Blackpool, Fylde & Wyre.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={service.icon} className="text-primary text-xl" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{service.name}</h3>
                </div>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => openForm(service.id as ServiceType)}
                >
                  {service.pageData?.cta || "Get help"}
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

export default Services;
