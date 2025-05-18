import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const announcements = [
  {
    text: "EXCLUSIVE: Website Development Grants – up to 80% funding available through our partnership with Blackpool Small Business Support Service! Visit www.blackpoolbusiness.org",
    link: "/services/business-support"
  },
  {
    text: "Cost-of-living payments: Applications for the Household Support Fund now available through Blackpool, Fylde & Wyre councils",
    link: "/services/family-support"
  },
  {
    text: "Free debt management plans through StepChange partnership - book your confidential consultation with Citizens Advice today",
    link: "/services/debt-support"
  },
  {
    text: "PIP and Attendance Allowance claims support - get help with disability benefit applications from our specialist advisors",
    link: "/services/health-disability"
  },
  {
    text: "Winter Fuel Payment applications now open for pensioners - get help staying warm this winter with support worth up to £300",
    link: "/services/elderly-support"
  },
  {
    text: "Council Tax Support available for low-income households - check your eligibility for up to 100% reduction",
    link: "/services/family-support"
  },
  {
    text: "Free employment rights advice for Blackpool residents - workplace issues, contracts, redundancy and unfair dismissal",
    link: "/services/family-support"
  },
  {
    text: "NHS Low Income Scheme can help with healthcare costs including prescriptions, dental and eye care - find out if you qualify",
    link: "/services/health-disability"
  }
];

const Announcements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const current = announcements[currentIndex];

  return (
    <section className="bg-yellow-300 border-t border-b border-yellow-500">
      <div className="w-full py-4 px-0">
        <div className="flex items-center pl-4">
          <div className="bg-black py-2 px-4 rounded-r-full mr-4">
            <FontAwesomeIcon icon="bullhorn" className="text-yellow-300 text-xl" aria-hidden="true" />
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="ticker-wrapper whitespace-nowrap">
              <p className="font-bold text-black inline-block animate-marquee">
                {current.text}{' '}
                <Link href={current.link} className="text-black underline hover:text-primary hover:no-underline focus-visible font-bold">
                  Learn More
                </Link>
                <span className="mx-16">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
