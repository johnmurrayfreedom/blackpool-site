import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, services, CONTACT_INFO } from '@/lib/constants';
import MultiStepForm from '@/components/shared/MultiStepForm';

const DebtSupport = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceData = services.find(s => s.id === 'debt-support');

  if (!serviceData) return null;

  return (
    <>
      <Helmet>
        <title>Debt & Money Advice | {SITE_NAME}</title>
        <meta name="description" content="Get confidential, practical and judgment-free advice to tackle bills, arrears and loans with debt management plans, budget support and creditor negotiation." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
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
                Free, Confidential Debt Advice
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Financial worries can affect anyone. Our expert advisors provide free, confidential advice to help you tackle money problems, manage debts and regain control of your finances.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Debt Solutions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Debt management plans
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Individual Voluntary Arrangements (IVAs)
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Debt Relief Orders (DROs)
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Bankruptcy advice
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Immediate Help</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Priority debt management
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Creditor negotiation
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Stopping bailiff action
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Emergency payment arrangements
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">Our Approach</h3>
              <p className="text-lg text-gray-700 mb-6">
                When you come to us for debt advice, we will:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Provide a safe, non-judgmental space to discuss your situation</li>
                <li>Conduct a full review of your finances</li>
                <li>Help you identify priority and non-priority debts</li>
                <li>Develop a realistic budget and repayment plan</li>
                <li>Negotiate with creditors on your behalf where appropriate</li>
                <li>Explore all available debt solutions and recommend the best option for your circumstances</li>
              </ul>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-primary mb-3">Success Story</h3>
                <blockquote className="italic text-gray-700 mb-4">
                  "After losing my job, I fell behind on payments and was receiving threatening letters. I was too scared to open my post. The advisor helped me make a list of all my debts, contacted my creditors to stop further action, and helped set up affordable repayment plans. For the first time in months, I can sleep without worrying."
                </blockquote>
                <p className="font-medium">— David from Blackpool</p>
              </div>
              
              <Button 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setIsFormOpen(true)}
              >
                Talk to an advisor today
              </Button>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-primary mb-4">Warning Signs of Problem Debt</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Borrowing to pay bills or other debts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Making only minimum payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Missing payments on essential bills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Ignoring bills or creditor contact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Feeling stressed or anxious about money</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold mb-2">Need immediate help?</h4>
                  <p className="mb-4">Our debt advisors are available Monday to Friday, 9am to 5pm.</p>
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-2">📞</span>
                    <span>{CONTACT_INFO.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-2">📧</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary hover:underline">
                      {CONTACT_INFO.email}
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
        initialService="debt-support"
      />
    </>
  );
};

export default DebtSupport;
