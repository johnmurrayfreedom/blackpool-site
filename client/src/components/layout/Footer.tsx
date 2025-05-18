import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { footerLinks, SITE_NAME, SITE_TAGLINE, CONTACT_INFO, partners } from '../../lib/constants';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-primary to-blue-900 text-white pt-14 pb-8">
      {/* Service information banner - like on gov.uk sites */}
      <div className="border-t border-b border-white/20 bg-blue-800 py-4 mb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <FontAwesomeIcon icon="clock" className="mr-3 h-6 w-6 text-yellow-300" />
              <div>
                <h3 className="font-bold text-lg">Opening Hours</h3>
                <p className="text-sm text-white/90">
                  Monday to Friday: {CONTACT_INFO.openingHours.monday} | 
                  Saturday: {CONTACT_INFO.openingHours.saturday} | 
                  Sunday: {CONTACT_INFO.openingHours.sunday}
                </p>
              </div>
            </div>
            <div className="flex">
              <a 
                href={`tel:${CONTACT_INFO.phone}`} 
                className="bg-yellow-300 text-primary hover:bg-yellow-400 px-4 py-2 rounded font-medium transition-colors mr-3 flex items-center"
              >
                <FontAwesomeIcon icon="phone" className="mr-2" />
                {CONTACT_INFO.phone}
              </a>
              <a 
                href="/contact" 
                className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded font-medium transition-colors flex items-center"
              >
                <FontAwesomeIcon icon="envelope" className="mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-white flex items-center justify-center w-10 h-10 mr-3">
                <FontAwesomeIcon icon="info-circle" className="text-primary text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold">{SITE_NAME}</h3>
            </div>
            <p className="mb-5 text-white/90">{SITE_TAGLINE}</p>
            
            <div className="bg-blue-800/50 rounded-lg p-4 border border-white/10 mb-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <FontAwesomeIcon icon="location-dot" className="mr-2 text-yellow-300" />
                Our Location
              </h4>
              <address className="not-italic text-sm text-white/90 mb-2">
                {CONTACT_INFO.address}
              </address>
              <a 
                href="https://maps.google.com?q=27+St+Anne's+Road,+Blackpool,+FY4+2AP" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-xs text-yellow-300 hover:underline flex items-center"
              >
                <FontAwesomeIcon icon="map" className="mr-1" />
                View on map
              </a>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <FontAwesomeIcon icon="globe" className="w-4 h-4 text-yellow-300 mr-2" />
                <a href={`https://${CONTACT_INFO.website}`} className="hover:underline text-white/90" target="_blank" rel="noopener noreferrer">
                  {CONTACT_INFO.website}
                </a>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon="envelope" className="w-4 h-4 text-yellow-300 mr-2" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline text-white/90">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
            
            <p className="text-xs text-white/70 mt-4 border-l-2 border-yellow-300 pl-2">
              Registered Charity No. 123456789
            </p>
          </div>
          
          {/* Navigation links */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="font-bold mb-4 border-b border-white/20 pb-2">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="hover:underline focus:outline-none focus:text-yellow-300 flex items-center text-white/90"
                    >
                      <span className="text-yellow-300 mr-1.5">›</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Partners section */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <h4 className="text-center font-bold mb-6">Our Partners and Trusted Sources</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-items-center">
            {partners.map((partner, index) => (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-lg w-full flex items-center justify-center h-16 transition-transform hover:scale-105"
                aria-label={partner.name}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright and social media */}
        <div className="border-t border-white/20 pt-6 pb-2">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/80">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <p className="text-sm mb-1">
                © {year} Citizens Information & Advice Bureau. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start text-xs space-x-4 mt-2">
                <Link href="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:underline hover:text-white">Terms of Service</Link>
                <Link href="/accessibility" className="hover:underline hover:text-white">Accessibility Statement</Link>
                <Link href="/admin/login" className="hover:underline hover:text-white">Staff Portal</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-xs mr-2">Follow us:</span>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors" 
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={['fab', 'facebook-f']} className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors" 
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={['fab', 'twitter']} className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors" 
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={['fab', 'instagram']} className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors" 
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={['fab', 'linkedin-in']} className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-white/60">
              This website is operated by Citizens Information & Advice Bureau to provide free, confidential advice to residents of Blackpool, Fylde & Wyre.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
