import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, services, CONTACT_INFO } from '@/lib/constants';
import MultiStepForm from '@/components/shared/MultiStepForm';

const FamilySupport = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceData = services.find(s => s.id === 'family-support');

  if (!serviceData) return null;

  return (
    <>
      <Helmet>
        <title>Family & Low-Income Support | {SITE_NAME}</title>
        <meta name="description" content="Unlock extra help for households under pressure with grants and support payments including cost-of-living payments, Healthy Start vouchers and single parent household support." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80')`,
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
                Support for Families & Low-Income Households
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We help families and individuals on low incomes access a wide range of financial support, grants and practical assistance to ease financial pressure and create better opportunities.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Financial Assistance</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Cost of Living Payment eligibility
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Universal Credit maximisation
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Council Tax Support
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Household Support Fund
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Family-Specific Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Healthy Start vouchers
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Free school meals applications
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      School uniform grants
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Single parent support
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">Housing & Utilities Support</h3>
              <p className="text-lg text-gray-700 mb-6">
                We can help you with:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Housing Benefit applications</li>
                <li>Discretionary Housing Payments</li>
                <li>Warm Home Discount scheme</li>
                <li>Energy bill support and grants</li>
                <li>Water bill reduction schemes</li>
                <li>Emergency housing assistance</li>
              </ul>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">Success Story</h3>
                <blockquote className="italic text-gray-700 mb-4">
                  "As a single mum of three, I was struggling to make ends meet. The advisors helped me apply for several types of support I didn't know I was eligible for, including Healthy Start vouchers and a school uniform grant. They also helped with energy bill support that made a massive difference during winter."
                </blockquote>
                <p className="font-medium">— Claire from Blackpool</p>
              </div>
              
              <Button 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setIsFormOpen(true)}
              >
                Check your eligibility now
              </Button>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://www.gov.uk/cost-of-living" rel="noopener noreferrer" className="text-primary hover:underline">
                      Cost of Living Support (GOV.UK)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.healthystart.nhs.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Healthy Start Scheme (NHS)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gov.uk/government/publications/household-support-fund-guidance-for-local-councils" rel="noopener noreferrer" className="text-primary hover:underline">
                      Household Support Fund
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gingerbread.org.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Gingerbread - Single parent support
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
        initialService="family-support"
      />
    </>
  );
};

export default FamilySupport;
