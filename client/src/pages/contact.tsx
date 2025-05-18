import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { Button } from '../components/ui/button';
import { SITE_NAME, CONTACT_INFO } from '../lib/constants';
import MultiStepForm from '../components/shared/MultiStepForm';
import LocationMap from '../components/contact/LocationMap';
import EmbeddedForm from '../components/shared/EmbeddedForm';
import SimpleContactForm from '../components/contact/SimpleContactForm';

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Contact Us | {SITE_NAME}</title>
        <meta name="description" content="Get in touch with the Citizens Information & Advice Bureau serving Blackpool, Fylde & Wyre. Our team is here to help you access the support you need." />
      </Helmet>
      
      {/* Hero section */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              Get In Touch
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              We're Here to Help
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Our team is ready to assist you with any questions about grants, benefits, or support services available in Blackpool, Fylde & Wyre.
            </p>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => setIsFormOpen(true)}
            >
              Check what support you qualify for
            </Button>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">Send Us a Message</h2>
              <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                Our team is here to help you access the support you need. Fill in the form below and we'll get back to you as soon as possible.
              </p>
              
              {/* Enhanced Contact Form with Micro-interactions */}
              <div className="max-w-3xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="col-span-1 md:col-span-2">
                    <SimpleContactForm />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Your information is secure and will not be shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map & Contact Info Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Visit Us</h2>
            <p className="text-lg text-gray-700">
              We're conveniently located in central Blackpool, easily accessible by public transport.
            </p>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
            <div className="h-96 bg-gray-200">
              <LocationMap />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Contact Information</h3>
                  
                  <div className="flex items-start">
                    <FontAwesomeIcon icon="map-marker-alt" className="mt-1 mr-4 text-xl text-primary" />
                    <div>
                      <h4 className="font-bold mb-1">Address</h4>
                      <p className="text-gray-700">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FontAwesomeIcon icon="envelope" className="mt-1 mr-4 text-xl text-primary" />
                    <div>
                      <h4 className="font-bold mb-1">Email Us</h4>
                      <p className="text-gray-700">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FontAwesomeIcon icon="clock" className="mt-1 mr-4 text-xl text-primary" />
                    <div>
                      <h4 className="font-bold mb-1">Opening Hours</h4>
                      <p className="text-gray-700">
                        Monday to Friday: {CONTACT_INFO.openingHours.monday}<br />
                        Saturday: {CONTACT_INFO.openingHours.saturday}<br />
                        Sunday: {CONTACT_INFO.openingHours.sunday}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com" rel="noopener noreferrer" className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary/20 text-primary" aria-label="Facebook">
                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                      </a>
                      <a href="https://twitter.com" rel="noopener noreferrer" className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary/20 text-primary" aria-label="Twitter">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                      </a>
                      <a href="https://instagram.com" rel="noopener noreferrer" className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary/20 text-primary" aria-label="Instagram">
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Directions */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Directions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-primary mb-2">By Bus</h4>
                      <p className="text-gray-700">Routes 5, 7, and 11 stop directly outside our building. The bus station is also just a 5-minute walk away.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-primary mb-2">By Tram</h4>
                      <p className="text-gray-700">We're a 10-minute walk from the Central Pier tram stop. Follow the promenade north and turn right onto Bank Street.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-primary mb-2">By Car</h4>
                      <p className="text-gray-700">Limited street parking is available. The nearest car park is on Chapel Street, just a 3-minute walk away.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Do I need to make an appointment?</h3>
                <p className="text-gray-700">While drop-ins are welcome, we recommend booking an appointment to ensure an advisor is available to help you. You can book by phone, email, or through our online form.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Is your advice really free?</h3>
                <p className="text-gray-700">Yes, all our advice and support services are completely free. We're a registered charity funded through grants and donations to provide support to our community.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">What should I bring to my appointment?</h3>
                <p className="text-gray-700">If possible, bring any relevant documents such as benefit letters, bills, or correspondence related to your query. Also bring proof of identity and address if you're visiting us for the first time.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Can you help with filling in forms?</h3>
                <p className="text-gray-700">Yes, our advisors can help you complete forms for benefits, grants, and other applications. This is one of our most popular services, especially for complex applications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
};

export default Contact;
