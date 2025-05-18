import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { services } from '@/lib/constants';
import GoHighLevelForm from '@/components/shared/GoHighLevelForm';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="bg-white text-primary px-4 pb-4 md:hidden">
      <nav className="flex flex-col space-y-2 pt-3">
        <Link href="/" onClick={onClose} className="py-2 px-3 hover:bg-gray-100 rounded focus-visible">
          Home
        </Link>
        
        {/* Services dropdown */}
        <div className="border-b border-gray-100 pb-2">
          <button 
            onClick={() => setIsServicesExpanded(!isServicesExpanded)}
            className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-100 rounded focus-visible"
          >
            <span>Services</span>
            <FontAwesomeIcon 
              icon={isServicesExpanded ? "chevron-up" : "chevron-down"} 
              className="ml-1 h-3 w-3 transition-transform" 
            />
          </button>
          
          {isServicesExpanded && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-2">
              {services.map((service) => (
                <Link 
                  key={service.id}
                  href={`/services/${service.id}`}
                  onClick={onClose}
                  className="block py-2 px-3 hover:bg-gray-100 rounded text-sm"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={service.icon} className="mr-2 h-4 w-4 text-primary" />
                    <span>{service.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <Link href="/about" onClick={onClose} className="py-2 px-3 hover:bg-gray-100 rounded focus-visible">
          About Us
        </Link>
        <Link href="/news" onClick={onClose} className="py-2 px-3 hover:bg-gray-100 rounded focus-visible">
          News
        </Link>
        <Button 
          className="bg-primary text-white hover:bg-primary/90 mt-2 focus-visible"
          onClick={() => {
            setIsContactFormOpen(true);
            onClose();
          }}
        >
          Get Help Now
        </Button>
      </nav>
      
      {/* Contact Form */}
      <GoHighLevelForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </div>
  );
};

export default MobileMenu;
