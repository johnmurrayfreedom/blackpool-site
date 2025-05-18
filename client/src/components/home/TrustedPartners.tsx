const partnerLogos = [
  {
    name: "Blackpool Council",
    logo: "/partners/blackpool-council.png",
    alt: "Blackpool Council logo",
    url: "https://www.blackpool.gov.uk/"
  },
  {
    name: "NHS Blackpool Teaching Hospitals",
    logo: "/partners/nhs-blackpool.png",
    alt: "NHS Blackpool Teaching Hospitals logo",
    url: "https://www.bfwh.nhs.uk/"
  },
  {
    name: "UK Government",
    logo: "/partners/uk-government.png",
    alt: "UK Government logo",
    url: "https://www.gov.uk/"
  },
  {
    name: "Government Digital Service",
    logo: "/partners/government-digital.png",
    alt: "Government Digital Service logo",
    url: "https://www.gov.uk/government/organisations/government-digital-service"
  },
  {
    name: "Age UK",
    logo: "/partners/age-uk.png",
    alt: "Age UK logo",
    url: "https://www.ageuk.org.uk/"
  },
  {
    name: "Lancashire and Blackpool Tourist Board",
    logo: "/partners/lancashire-blackpool.png",
    alt: "Lancashire and Blackpool Tourist Board logo",
    url: "https://www.visitlancashire.com/"
  },
  {
    name: "Blackpool BID",
    logo: "/partners/blackpool-bid.png",
    alt: "Blackpool BID logo",
    url: "https://www.blackpoolbid.org/"
  }
];

const TrustedPartners = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">OUR TRUSTED PARTNERS</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We work with these organisations to provide comprehensive support to our community.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {partnerLogos.map((partner, index) => (
            <a 
              key={index} 
              href={partner.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-32 transition-transform hover:scale-105 hover:shadow-md"
              aria-label={`Visit ${partner.name} website`}
            >
              <img 
                src={partner.logo} 
                alt={partner.alt} 
                className="max-h-24 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;