import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@/components/ui/button";
import { SITE_NAME, SITE_TAGLINE, services, CONTACT_INFO } from '@/lib/constants';
import MobileMenu from './MobileMenu';
import GoHighLevelForm from '@/components/shared/GoHighLevelForm';
import LanguageSelector from '@/components/shared/LanguageSelector';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  return (
    <header className={`bg-primary text-white border-b border-white/30 ${scrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
      {/* Top banner with contact info and accessibility - more structured like gov.uk */}
      <div className="bg-black py-2 text-white text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="mb-2 sm:mb-0 flex items-center">
              <FontAwesomeIcon icon={['fas', 'location-dot']} className="mr-2 h-3 w-3" />
              <span>Serving Blackpool, Fylde & Wyre communities</span>
            </p>
            <div className="flex items-center space-x-4">
              <a href={`tel:${CONTACT_INFO.phone}`} className="hover:underline flex items-center">
                <FontAwesomeIcon icon={['fas', 'phone']} className="mr-1 h-3 w-3" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a 
                href={`https://${CONTACT_INFO.website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline hidden sm:flex items-center"
              >
                <FontAwesomeIcon icon={['fas', 'globe']} className="mr-1 h-3 w-3" />
                <span>{CONTACT_INFO.website}</span>
              </a>
              <div className="border-l border-white/30 pl-3 ml-1">
                <div className="flex items-center" title="Translate this page">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary nav - like on gov.uk sites with accessibility and account links */}
      <div className="bg-blue-800 py-1.5 border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center text-sm">
            <Link href="/accessibility" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 px-3 py-1">
              Accessibility
            </Link>
            <div className="border-l border-white/30 h-4"></div>
            <Link href="/contact" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 px-3 py-1">
              Contact us
            </Link>
            <div className="border-l border-white/30 h-4"></div>
            <Link href="/admin/login" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 px-3 py-1 flex items-center">
              <FontAwesomeIcon icon={['fas', 'user']} className="mr-1.5 h-3 w-3" />
              Sign in
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main header with logo and navigation */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and site name */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="rounded-full bg-white flex items-center justify-center w-11 h-11 mr-3 shadow-sm">
              <FontAwesomeIcon icon="info-circle" className="text-primary text-2xl" aria-hidden="true" />
            </div>
            <div>
              <Link href="/">
                <h1 className="text-xl md:text-2xl font-bold leading-tight">{SITE_NAME}</h1>
                <p className="text-sm md:text-base text-white/90">{SITE_TAGLINE}</p>
              </Link>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden bg-white/10 p-2 rounded" 
              aria-label="Open menu" 
              onClick={toggleMobileMenu}
            >
              <FontAwesomeIcon icon="bars" />
            </Button>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-white px-3 py-2 hover:bg-white/10 rounded transition-colors">
                Home
              </Link>
              
              {/* Services dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button 
                  className="text-white px-3 py-2 hover:bg-white/10 rounded transition-colors flex items-center"
                  onClick={toggleServicesDropdown}
                  aria-expanded={isServicesDropdownOpen}
                  aria-haspopup="true"
                  type="button"
                >
                  Services
                  <FontAwesomeIcon 
                    icon={isServicesDropdownOpen ? "chevron-up" : "chevron-down"} 
                    className="ml-1.5 h-3 w-3 transition-transform" 
                  />
                </button>
                
                {isServicesDropdownOpen && (
                  <div className="absolute z-20 mt-1 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {services.map((service) => (
                        <Link 
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          role="menuitem"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={service.icon} className="mr-2.5 h-4 w-4 text-primary" />
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                      <a 
                        href="/services" 
                        className="text-primary text-sm font-medium flex items-center"
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        View all services
                        <FontAwesomeIcon icon="arrow-right" className="ml-1.5 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/about" className="text-white px-3 py-2 hover:bg-white/10 rounded transition-colors">
                About Us
              </Link>
              
              <Link href="/news" className="text-white px-3 py-2 hover:bg-white/10 rounded transition-colors">
                News
              </Link>
              
              <Button 
                className="bg-yellow-300 text-black hover:bg-yellow-400 ml-3 font-medium transition-colors shadow-sm flex gap-2 items-center"
                onClick={() => setIsContactFormOpen(true)}
              >
                <FontAwesomeIcon icon="headset" className="h-4 w-4" />
                Get Help Now
              </Button>
            </div>
          </nav>
        </div>
      </div>
      
      {/* White separator line for better visual distinction */}
      <div className="h-0.5 bg-white/90 shadow-sm"></div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Contact Form */}
      <GoHighLevelForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </header>
  );
};

export default Header;
