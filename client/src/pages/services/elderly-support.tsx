import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, services, CONTACT_INFO } from '@/lib/constants';
import MultiStepForm from '@/components/shared/MultiStepForm';

const ElderlySupport = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceData = services.find(s => s.id === 'elderly-support');

  if (!serviceData) return null;

  return (
    <>
      <Helmet>
        <title>Elderly Support | {SITE_NAME}</title>
        <meta name="description" content="Make later life safer, warmer and more affordable with our dedicated elderly services including winter fuel payments, power of attorney guidance and care arrangement assistance." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl py-6">
            <div className="inline-block mb-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {serviceData.pageData.eyebrow}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {serviceData.pageData.title}
            </h1>
            <p className="text-lg md:text-xl mb-8">
              {serviceData.pageData.lead}
            </p>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 transition-all duration-200 shadow-md"
              onClick={() => setIsFormOpen(true)}
            >
              {serviceData.pageData.cta}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main content section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:gap-12">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                How We Support Older Residents
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our elderly support services help Blackpool, Fylde & Wyre residents access the financial assistance, care arrangements, and practical support that makes later life comfortable, warm, and dignified.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Financial Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Winter Fuel Payment assistance
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Pension Credit applications
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Attendance Allowance claims
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Council Tax Reduction
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Care & Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Finding suitable care
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Home adaptation grants
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Support for carers
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Community transport services
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">Legal & Future Planning</h3>
              <p className="text-lg text-gray-700 mb-6">
                We provide guidance and practical help with:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Setting up Lasting Power of Attorney</li>
                <li>Will writing assistance and referrals</li>
                <li>Advance care planning</li>
                <li>Funeral planning advice</li>
                <li>Estate planning considerations</li>
              </ul>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">Success Story</h3>
                <blockquote className="italic text-gray-700 mb-4">
                  "After my husband passed away, I was struggling with bills and didn't know what help was available. The team helped me claim Pension Credit and Winter Fuel Payment, which made a huge difference. They also helped set up Power of Attorney so my daughter can help manage my affairs as I get older."
                </blockquote>
                <p className="font-medium">— Margaret from Fylde</p>
              </div>
              
              <Button 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setIsFormOpen(true)}
              >
                See what support you can claim
              </Button>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://www.gov.uk/winter-fuel-payment" rel="noopener noreferrer" className="text-primary hover:underline">
                      Winter Fuel Payment (GOV.UK)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gov.uk/power-of-attorney" rel="noopener noreferrer" className="text-primary hover:underline">
                      Lasting Power of Attorney (GOV.UK)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ageuk.org.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Age UK - Resources for older people
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nhs.uk/conditions/social-care-and-support-guide/" rel="noopener noreferrer" className="text-primary hover:underline">
                      NHS - Care and support guide
                    </a>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold mb-2">Need immediate help?</h4>
                  <p className="mb-4">Our advisors are available Monday to Friday, 9am to 5pm.</p>
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-2">📞</span>
                    <span>{CONTACT_INFO.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-2">📧</span>
                    <a href="mailto:help@blackpoolciab.org.uk" className="text-primary hover:underline">
                      help@blackpoolciab.org.uk
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
        initialService="elderly-support"
      />
    </>
  );
};

export default ElderlySupport;
