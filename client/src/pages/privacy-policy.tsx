import { Helmet } from 'react-helmet';
import { SITE_NAME } from '@/lib/constants';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Helmet>
        <title>Privacy Policy | {SITE_NAME}</title>
        <meta name="description" content="Our privacy policy explains how we collect, use, and protect your personal information." />
      </Helmet>
      
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
        <p>
          This Privacy Policy outlines how the Citizens Information & Advice Bureau ("we", "our", or "us") collects, 
          uses, and protects personal information when you use our services or visit our website. We are committed 
          to ensuring that your privacy is protected. We may change this policy from time to time by updating this page.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Name and contact information including email address and telephone number</li>
          <li>Demographic information such as postcode</li>
          <li>Information relevant to your specific enquiry or request for services</li>
          <li>Information about your visit to our website, including the pages you view</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide and improve our services to you</li>
          <li>To communicate with you regarding your enquiries</li>
          <li>To customize our website according to your interests</li>
          <li>To send you information which we think may be of interest to you</li>
          <li>For internal record keeping and administration</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
        <p>
          We are committed to ensuring that your information is secure. In order to prevent unauthorised access or 
          disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and 
          secure the information we collect online.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
        <p>
          A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, 
          the file is added, and the cookie helps analyze web traffic or lets you know when you visit a particular site. 
          We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page 
          traffic and improve our website. We only use this information for statistical analysis purposes.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Links to Other Websites</h2>
        <p>
          Our website may contain links to other websites of interest. However, once you have used these links to leave 
          our site, you should note that we do not have any control over that other website. Therefore, we cannot be 
          responsible for the protection and privacy of any information which you provide whilst visiting such sites.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Controlling Your Personal Information</h2>
        <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
        <ul>
          <li>
            If you have previously agreed to us using your personal information for direct marketing purposes, 
            you may change your mind at any time by writing to or emailing us.
          </li>
          <li>
            You may request details of personal information which we hold about you. If you would like a copy of the 
            information held on you, please write to us.
          </li>
          <li>
            If you believe that any information we are holding on you is incorrect or incomplete, please write to or 
            email us as soon as possible. We will promptly correct any information found to be incorrect.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
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