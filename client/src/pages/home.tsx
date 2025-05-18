import { Helmet } from 'react-helmet';
import Hero from '../components/home/Hero';
import Announcements from '../components/home/Announcements';
import Services from '../components/home/Services';
import CTABanner from '../components/home/CTABanner';
import FeaturedGrants from '../components/home/FeaturedGrants';
import Testimonials from '../components/home/Testimonials';
import HowItWorks from '../components/home/HowItWorks';
import NewsUpdates from '../components/home/NewsUpdates';
import TrustedPartners from '../components/home/TrustedPartners';
import Contact from '../components/home/Contact';
import { SITE_NAME, SITE_TAGLINE } from '../lib/constants';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} – {SITE_TAGLINE}</title>
        <meta name="description" content="Free, confidential guidance on benefits, housing, debt, healthcare, family support and more for residents of Blackpool, Fylde & Wyre." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blackpooladvice.org/" />
        <meta property="og:title" content={`${SITE_NAME} – ${SITE_TAGLINE}`} />
        <meta property="og:description" content="Free, confidential guidance on benefits, housing, debt, healthcare, family support and more for residents of Blackpool, Fylde & Wyre." />
        <meta property="og:image" content="https://blackpooladvice.org/social-preview.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blackpooladvice.org/" />
        <meta property="twitter:title" content={`${SITE_NAME} – ${SITE_TAGLINE}`} />
        <meta property="twitter:description" content="Free, confidential guidance on benefits, housing, debt, healthcare, family support and more for residents of Blackpool, Fylde & Wyre." />
        <meta property="twitter:image" content="https://blackpooladvice.org/social-preview.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="keywords" content="benefits advice, debt support, housing help, Blackpool advice, Fylde support, Wyre community, financial assistance, free advice" />
        <meta name="author" content="Citizens Information & Advice Bureau" />
        <link rel="canonical" href="https://blackpooladvice.org/" />
      </Helmet>
      
      <Hero />
      <Announcements />
      <Services />
      <CTABanner />
      <FeaturedGrants />
      <Testimonials />
      <HowItWorks />
      <NewsUpdates />
      <TrustedPartners />
      <Contact />
    </>
  );
};

export default Home;
