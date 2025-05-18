import { Helmet } from 'react-helmet';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';

export default function Accessibility() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Helmet>
        <title>Accessibility Statement | {SITE_NAME}</title>
        <meta name="description" content="Our commitment to making our website accessible to all users." />
      </Helmet>
      
      <h1 className="text-4xl font-bold mb-8 text-center">Accessibility Statement</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Commitment to Accessibility</h2>
        <p>
          The Citizens Information & Advice Bureau is committed to ensuring digital accessibility for people with 
          disabilities. We are continually improving the user experience for everyone and applying the relevant 
          accessibility standards.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Accessible Features We Use</h2>
        <ul>
          <li>Semantic HTML: We use semantic HTML to ensure that content is organised in a way that maintains its meaning when read by assistive technologies.</li>
          <li>Alt Text: Images on our website include appropriate alt text to ensure that screen reader users understand the content and context of images.</li>
          <li>Colour Contrast: We ensure there is adequate colour contrast between text and background elements.</li>
          <li>Responsive Design: Our website is responsive and works on various devices, including mobile phones and tablets.</li>
          <li>Navigation: We provide clear and consistent navigation options to help users find content quickly.</li>
          <li>Form Labels: Form fields are properly labelled to help users understand what information they need to provide.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Technical Specifications</h2>
        <p>
          Accessibility of our website relies on the following technologies to work with the particular combination of web 
          browser and any assistive technologies or plugins installed on your computer:
        </p>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility 
          barriers:
        </p>
        <ul>
          <li>Email: {CONTACT_INFO.email}</li>
          <li>Visit: {CONTACT_INFO.address}</li>
        </ul>
        <p>
          We try to respond to feedback within 5 business days.
        </p>
      </div>
    </div>
  );
}