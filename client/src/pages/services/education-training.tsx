import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, services } from '@/lib/constants';
import MultiStepForm from '@/components/shared/MultiStepForm';

const EducationTraining = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceData = services.find(s => s.id === 'education-training');

  if (!serviceData) return null;

  return (
    <>
      <Helmet>
        <title>Education & Training Support | {SITE_NAME}</title>
        <meta name="description" content="Train, upskill and achieve your goals without the hidden costs through grants and funding for course fees, travel, equipment and childcare while studying." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
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
                Education & Skills Support
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We help residents of Blackpool, Fylde & Wyre access education and training opportunities by connecting you with financial support, grants and funding to cover costs that might otherwise be barriers to learning.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Course Funding</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Advanced Learner Loans
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Adult Education Budget funding
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Skills Bootcamp access
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Professional & Career Development Loans
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Additional Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Travel subsidies
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Equipment and materials grants
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Childcare funding
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Digital access support
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">Course Types & Opportunities</h3>
              <p className="text-lg text-gray-700 mb-6">
                Funding is available for a wide range of learning opportunities:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Vocational qualifications and NVQs</li>
                <li>Professional skills and certifications</li>
                <li>Digital skills training</li>
                <li>College and university courses</li>
                <li>Apprenticeships and traineeships</li>
                <li>English, maths and ESOL courses</li>
              </ul>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">Success Story</h3>
                <blockquote className="italic text-gray-700 mb-4">
                  "I always wanted to retrain in healthcare but couldn't afford the course fees or manage childcare. The team helped me access funding that covered my course costs and contributed to childcare. I'm now qualified and working in a job I love, with much better prospects for the future."
                </blockquote>
                <p className="font-medium">— Sarah from Wyre</p>
              </div>
              
              <Button 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setIsFormOpen(true)}
              >
                Find courses and grants
              </Button>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://www.gov.uk/advanced-learner-loan" rel="noopener noreferrer" className="text-primary hover:underline">
                      Advanced Learner Loans (GOV.UK)
                    </a>
                  </li>
                  <li>
                    <a href="https://skillsforlife.campaign.gov.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Skills for Life campaign
                    </a>
                  </li>
                  <li>
                    <a href="https://blackpool.ac.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      Blackpool and The Fylde College
                    </a>
                  </li>
                  <li>
                    <a href="https://nationalcareers.service.gov.uk/" rel="noopener noreferrer" className="text-primary hover:underline">
                      National Careers Service
                    </a>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold mb-2">Need immediate help?</h4>
                  <p className="mb-4">Our advisors are available Monday to Friday, 9am to 5pm.</p>
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-2">📞</span>
                    <span>01253 477 775</span>
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
        initialService="education-training"
      />
    </>
  );
};

export default EducationTraining;
