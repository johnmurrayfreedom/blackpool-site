import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, services, CONTACT_INFO } from '@/lib/constants';
import MultiStepForm from '@/components/shared/MultiStepForm';

const HealthDisability = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceData = services.find(s => s.id === 'health-disability');

  if (!serviceData) return null;

  return (
    <>
      <Helmet>
        <title>Health & Disability Support | {SITE_NAME}</title>
        <meta name="description" content="Get help with Blue Badges, PIP appeals, mobility aids, home adaptations and more from our Health & Disability Support service." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
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
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  UPDATED: NEW DISABILITY BENEFIT RULES FOR 2025
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Recent changes to disability benefits in the UK have affected eligibility criteria and assessment processes. Our specialist advisors are fully trained on these new rules and can help you understand how they may impact your current or future claims.
                </p>
                <Button 
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => setIsFormOpen(true)}
                >
                  SPEAK TO A SPECIALIST ADVISOR
                </Button>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                HOW WE CAN HELP
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Navigating disability benefits and support services can be complex and overwhelming. Our team of experts provide free, confidential advice and practical assistance throughout Blackpool, Fylde and Wyre. We can help with:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-3">DISABILITY BENEFITS</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Personal Independence Payment (PIP)</strong> - Help with eligibility assessment, application forms, supporting evidence, mandatory reconsiderations and appeals
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Attendance Allowance</strong> - Support for those over State Pension age with care needs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Disability Living Allowance (DLA) for children</strong> - Guidance for parents on eligibility and application process
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Employment and Support Allowance (ESA)</strong> - Support for those unable to work due to illness or disability
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Universal Credit disability elements</strong> - Ensuring you receive the correct disability premiums
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-3">PRACTICAL SUPPORT</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Blue Badge applications</strong> - Help with eligibility, forms and appeals for parking concessions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Mobility aids and equipment</strong> - Access to grants and NHS provision for mobility scooters, wheelchairs and daily living aids
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Disabled Facilities Grants</strong> - Support with applications for home adaptations through your local council (up to £30,000 available)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>NHS Continuing Healthcare</strong> - Help navigating the complex assessment process for ongoing healthcare funding
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Transport assistance</strong> - Information on Motability schemes, disabled person's railcard, and local dial-a-ride services
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-4">EXPERT GUIDANCE AND ADVOCACY</h3>
              <p className="text-lg text-gray-700 mb-6">
                Our health and disability specialists can:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Help you understand what benefits you're entitled to</li>
                <li>Support you with completing application forms accurately</li>
                <li>Prepare you for assessments and medical reviews</li>
                <li>Guide you through the appeals process if needed</li>
                <li>Connect you with specialist healthcare and support services</li>
              </ul>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">Success Story</h3>
                <blockquote className="italic text-gray-700 mb-4">
                  "After my condition worsened, I was struggling to manage at home and was turned down for PIP. The team helped me appeal the decision, gather the right medical evidence, and I was awarded the enhanced rate for both components. They also helped me apply for a Blue Badge and access home adaptations that have made a huge difference to my independence."
                </blockquote>
                <p className="font-medium">— John from Blackpool</p>
              </div>
              
              <Button 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setIsFormOpen(true)}
              >
                Get started with your application
              </Button>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://www.gov.uk/pip" rel="noopener noreferrer" className="text-primary hover:underline">
                      Personal Independence Payment (GOV.UK)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gov.uk/apply-blue-badge" rel="noopener noreferrer" className="text-primary hover:underline">
                      Blue Badge scheme (GOV.UK)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Citizens Advice - Disability benefits
                    </a>
                  </li>
                  <li>
                    <a href="https://www.scope.org.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Scope - Disability charity
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
        initialService="health-disability"
      />
    </>
  );
};

export default HealthDisability;
