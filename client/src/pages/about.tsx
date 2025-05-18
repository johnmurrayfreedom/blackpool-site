import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | {SITE_NAME}</title>
        <meta name="description" content="Learn about the Citizens Information & Advice Bureau serving the communities of Blackpool, Fylde & Wyre with free, impartial advice and support." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blackpooladvice.org/about" />
        <meta property="og:title" content={`About Us | ${SITE_NAME}`} />
        <meta property="og:description" content="Learn about the Citizens Information & Advice Bureau serving the communities of Blackpool, Fylde & Wyre with free, impartial advice and support." />
        <meta property="og:image" content="https://blackpooladvice.org/social-preview.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blackpooladvice.org/about" />
        <meta property="twitter:title" content={`About Us | ${SITE_NAME}`} />
        <meta property="twitter:description" content="Learn about the Citizens Information & Advice Bureau serving the communities of Blackpool, Fylde & Wyre with free, impartial advice and support." />
        <meta property="twitter:image" content="https://blackpooladvice.org/social-preview.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="keywords" content="Blackpool advice, about us, advice bureau, Fylde support, Wyre advice, community support, free advice" />
        <link rel="canonical" href="https://blackpooladvice.org/about" />
      </Helmet>
      
      {/* Hero section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              About Our Organisation
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Who We Are & What We Do
            </h1>
            <p className="text-lg md:text-xl mb-8">
              We provide free, impartial advice and support to help residents of Blackpool, Fylde & Wyre access the services, benefits and grants they're entitled to.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Mission section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden h-80">
                {/* Replace with actual image in production */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl text-primary">
                  <FontAwesomeIcon icon="info-circle" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                The Citizens Information & Advice Bureau is dedicated to ensuring that every resident in Blackpool, Fylde & Wyre has access to the support, benefits, and services they are entitled to, regardless of their circumstances.
              </p>
              <p className="text-lg text-gray-700">
                We believe in empowering individuals and families through free, impartial advice and practical assistance that helps them navigate complex systems, overcome challenges, and improve their quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-lg text-gray-700">
              These core principles guide everything we do and ensure we deliver the highest standard of service to our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon="handshake" className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Impartiality</h3>
              <p className="text-gray-700">
                We provide unbiased advice without judgment, ensuring everyone receives fair and equal support regardless of their background or circumstances.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon="lock" className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Confidentiality</h3>
              <p className="text-gray-700">
                We respect your privacy and maintain strict confidentiality, creating a safe space where you can discuss personal matters openly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon="users" className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Community Focus</h3>
              <p className="text-gray-700">
                We are deeply rooted in the local communities of Blackpool, Fylde & Wyre, with services tailored to address regional needs and challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Trusted Sources section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-12 text-center">Trusted Sources</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            <a 
              href="https://www.gov.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center h-24 transition-transform hover:scale-105 hover:shadow-md"
              aria-label="Visit GOV.UK website"
            >
              <img 
                src="/partners/uk-government.png" 
                alt="GOV.UK logo" 
                className="max-h-16 w-auto object-contain"
              />
            </a>
            
            <a 
              href="https://www.citizensadvice.org.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center h-24 transition-transform hover:scale-105 hover:shadow-md"
              aria-label="Visit Citizens Advice website"
            >
              <img 
                src="/partners/government-digital.png" 
                alt="Citizens Advice logo" 
                className="max-h-16 w-auto object-contain"
              />
            </a>
            
            <a 
              href="https://www.ageuk.org.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center h-24 transition-transform hover:scale-105 hover:shadow-md"
              aria-label="Visit Age UK website"
            >
              <img 
                src="/partners/age-uk.png" 
                alt="Age UK logo" 
                className="max-h-16 w-auto object-contain"
              />
            </a>
            
            <a 
              href="https://www.fsb.org.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center h-24 transition-transform hover:scale-105 hover:shadow-md"
              aria-label="Visit Federation of Small Businesses website"
            >
              <div className="font-bold text-lg">FSB</div>
            </a>
            
            <a 
              href="https://www.blackpool.gov.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center h-24 transition-transform hover:scale-105 hover:shadow-md"
              aria-label="Visit Blackpool Council website"
            >
              <img 
                src="/partners/blackpool-council.png" 
                alt="Blackpool Council logo" 
                className="max-h-16 w-auto object-contain"
              />
            </a>
            
            <a 
              href="https://new.fylde.gov.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center h-24 transition-transform hover:scale-105 hover:shadow-md"
              aria-label="Visit Fylde Council website"
            >
              <div className="font-bold text-lg">Fylde Council</div>
            </a>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We refer to these authoritative sources to ensure we provide accurate and up-to-date information to our community.
            </p>
          </div>
        </div>
      </section>
      

    </>
  );
};

export default About;
