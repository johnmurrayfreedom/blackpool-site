import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, services } from '@/lib/constants';
import MultiStepForm from '@/components/shared/MultiStepForm';

const BusinessSupport = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceData = services.find(s => s.id === 'business-support');

  if (!serviceData) return null;

  return (
    <>
      <Helmet>
        <title>Business Support & Digital Grants | {SITE_NAME}</title>
        <meta name="description" content="Grow smarter with grants, R&D relief and AI tools for your business in Blackpool, Fylde & Wyre. Up to 80% off website development and digital transformation." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl py-6">
            <div className="inline-block mb-3 bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-bold">
              EXCLUSIVE PARTNERSHIP
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              WEBSITE DEVELOPMENT GRANTS
            </h1>
            <p className="text-lg md:text-xl mb-4">
              We've partnered with <span className="font-bold">Blackpool Small Business Support Service</span> to offer exclusive grants covering up to 80% of website development costs for qualifying local businesses.
            </p>
            <p className="text-lg md:text-xl mb-8">
              Our expert advisors will guide you through the application process, help you find the right developer, and ensure your business gets online with a professional website that drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-yellow-300 text-black hover:bg-yellow-400 transition-all duration-200 shadow-md"
                onClick={() => setIsFormOpen(true)}
              >
                CHECK IF YOU QUALIFY
              </Button>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 transition-all duration-200 shadow-md"
                onClick={() => window.open('https://www.blackpoolbusiness.org', '_blank')}
              >
                VISIT BLACKPOOL BUSINESS
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:gap-12">
            <div className="md:w-2/3">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  EXCLUSIVE: 80% WEBSITE DEVELOPMENT FUNDING
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Through our exclusive partnership with <strong>Blackpool Small Business Support Service</strong>, we're offering local businesses unprecedented access to grants covering up to 80% of professional website development costs.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  This funding opportunity is available exclusively through our bureau and is designed to help Blackpool, Fylde, and Wyre businesses establish a strong online presence, reach more customers, and increase revenue in today's digital economy.
                </p>
                <p className="mb-4">
                  <a 
                    href="https://www.blackpoolbusiness.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline"
                  >
                    Visit www.blackpoolbusiness.org
                  </a> for more information, or <button onClick={() => setIsFormOpen(true)} className="text-primary font-bold hover:underline">contact us directly</button> to check your eligibility.
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Comprehensive Business Support for Local Entrepreneurs
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're a sole trader, small business owner, or growing enterprise, we provide expert guidance to help your business thrive in Blackpool, Fylde & Wyre. Our advisors offer practical, jargon-free advice on grants, digital transformation, and business optimisation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-3">WEBSITE & DIGITAL GRANTS</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>80% funding for professional websites</strong> - Typical grant value £1,500-£5,000
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>E-commerce platform development</strong> - Get your products online with full payment integration
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Booking system implementation</strong> - Automated appointment scheduling for service businesses
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Digital marketing packages</strong> - Ensure your new website gets found with SEO and local business setup
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-3">BUSINESS GROWTH SUPPORT</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>AI implementation consultation</strong> - Identify opportunities for automation and efficiency
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Business rates relief guidance</strong> - Ensure you're not paying more than necessary
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>R&D tax relief assistance</strong> - Claim back up to 33% of development costs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Energy efficiency grants</strong> - Reduce costs and improve sustainability
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">WHO CAN APPLY FOR WEBSITE GRANTS?</h3>
              <p className="text-lg text-gray-700 mb-6">
                Our website grant scheme is available to businesses that meet the following criteria:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Registered business address in <strong>Blackpool, Fylde or Wyre</strong></li>
                <li>Trading for at least 6 months</li>
                <li>Fewer than 250 employees</li>
                <li>Turnover less than £5 million</li>
                <li>Commitment to maintaining the website for at least 12 months</li>
                <li>Not previously received a digital transformation grant in the last 24 months</li>
              </ul>
              
              <h3 className="text-xl font-bold text-primary mb-3">THE APPLICATION PROCESS</h3>
              <p className="text-lg text-gray-700 mb-4">
                Our streamlined application process makes it easy to access website development funding:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <h4 className="font-bold mb-2 mt-1">Initial Consultation</h4>
                  <p>Book a free 30-minute call with our business advisor to discuss your website needs and eligibility.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <h4 className="font-bold mb-2 mt-1">Application Support</h4>
                  <p>We'll help you complete the grant application form and gather the required documentation.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <h4 className="font-bold mb-2 mt-1">Developer Matching</h4>
                  <p>We'll connect you with vetted web developers who specialise in your business sector.</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4 border-primary">
                <h3 className="text-xl font-bold text-primary mb-3">SUCCESS STORY</h3>
                <blockquote className="italic text-gray-700 mb-4">
                  "As a small café owner in Blackpool, I couldn't afford a professional website with online ordering capabilities. The Citizens Information & Advice Bureau helped me apply for the website grant, which covered 80% of the development costs. They connected me with a local developer who built a beautiful site with an integrated booking system. Our online orders now account for 35% of our business, and we've been able to reduce staffing costs through the automated system."
                </blockquote>
                <p className="font-medium">— Lisa Thompson, Seaside Café, Blackpool</p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-8 border border-yellow-300">
                <h3 className="text-xl font-bold text-primary mb-3">GRANT FUNDING EXPIRES SOON</h3>
                <p className="mb-4">The current round of website development funding is limited and applications close on 30th June 2025. Don't miss this opportunity to transform your business with a professional online presence.</p>
                <Button 
                  size="lg"
                  className="bg-yellow-300 text-black hover:bg-yellow-400 transition-all duration-200 shadow-md"
                  onClick={() => setIsFormOpen(true)}
                >
                  APPLY NOW
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <div className="bg-yellow-300 text-black p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-2">EXCLUSIVE WEBSITE GRANT</h3>
                  <p className="font-medium mb-3">Available only through our partnership with Blackpool Small Business Support Service</p>
                  <a 
                    href="https://www.blackpoolbusiness.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary underline font-bold hover:no-underline block mb-2"
                  >
                    www.blackpoolbusiness.org
                  </a>
                </div>

                <h3 className="text-xl font-bold text-primary mb-4">WHAT YOU CAN GET</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-3 py-1">
                    <h4 className="font-bold mb-1">Basic Business Website</h4>
                    <p className="text-sm mb-2">5-page professional website with contact form</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Your cost:</span>
                      <span className="font-medium">Only £300-£600</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Grant covers:</span>
                      <span className="font-medium">£1,200-£2,400</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-3 py-1">
                    <h4 className="font-bold mb-1">E-commerce Website</h4>
                    <p className="text-sm mb-2">Online shop with payment processing</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Your cost:</span>
                      <span className="font-medium">Only £600-£1,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Grant covers:</span>
                      <span className="font-medium">£2,400-£4,000</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-3 py-1">
                    <h4 className="font-bold mb-1">Booking System Website</h4>
                    <p className="text-sm mb-2">With integrated calendar and payments</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Your cost:</span>
                      <span className="font-medium">Only £500-£900</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Grant covers:</span>
                      <span className="font-medium">£2,000-£3,600</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold mb-2">SPEAK TO AN ADVISOR TODAY</h4>
                  <p className="mb-4">Our business grant specialists are available Monday to Friday, 9am to 5pm.</p>
                  <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90 mb-3"
                    onClick={() => setIsFormOpen(true)}
                  >
                    CHECK MY ELIGIBILITY
                  </Button>
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-2">📞</span>
                    <span>01253 477 775</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-2">📧</span>
                    <a href="mailto:business@blackpoolciab.org.uk" className="text-primary hover:underline">
                      business@blackpoolciab.org.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        initialService="business-support"
      />
    </>
  );
};

export default BusinessSupport;
