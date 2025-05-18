import { Helmet } from 'react-helmet';
import { SITE_NAME } from '@/lib/constants';

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Helmet>
        <title>Terms of Service | {SITE_NAME}</title>
        <meta name="description" content="Terms and conditions for using our website and services." />
      </Helmet>
      
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
        <p>
          These terms and conditions govern your use of the Citizens Information & Advice Bureau website and 
          services. By using our website and services, you accept these terms and conditions in full. If you 
          disagree with any part of these terms and conditions, you must not use our website or services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Service Description</h2>
        <p>
          The Citizens Information & Advice Bureau provides free information and advice to residents of Blackpool, 
          Fylde, and Wyre on a variety of topics including but not limited to health and disability services, 
          elderly support, family services, education and training, debt support, and business assistance.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Advice and Information</h2>
        <p>
          While we strive to ensure that the advice and information we provide is accurate and up-to-date, we make 
          no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
          suitability, or availability of the information, products, services, or related graphics contained on the website.
        </p>
        <p>
          Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable 
          for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or 
          damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Accessibility</h2>
        <p>
          We are committed to ensuring that our website is accessible to all users. If you experience any difficulties 
          using our website, please contact us for assistance.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">User Conduct</h2>
        <p>When using our website and services, you agree to:</p>
        <ul>
          <li>Provide accurate personal information where necessary</li>
          <li>Not engage in any activity that may disrupt the services or website</li>
          <li>Not attempt to gain unauthorized access to any part of our services</li>
          <li>Use our services only for lawful purposes</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
        <p>
          The content of this website is owned by the Citizens Information & Advice Bureau and is protected by copyright 
          laws. Unauthorized use, reproduction, or distribution of any content from this website may violate copyright, 
          trademark, and other laws.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">External Links</h2>
        <p>
          Our website may contain links to external websites that are not operated by us. We have no control over, and 
          assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to Terms</h2>
        <p>
          We may revise these terms of service at any time without notice. By using this website, you are agreeing 
          to be bound by the current version of these terms of service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, 
          and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the 
          courts of the United Kingdom.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <address className="not-italic mt-2">
          <strong>Citizens Information & Advice Bureau</strong><br />
          27 St Anne's Road<br />
          Blackpool<br />
          Lancs FY4 2AP<br />
          Email: info@ciab-blackpool.org.uk
        </address>
      </div>
    </div>
  );
}