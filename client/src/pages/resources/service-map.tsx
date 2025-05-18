import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SITE_NAME } from '@/lib/constants';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Blackpool center coordinates - specified as tuple for type safety
const BLACKPOOL_CENTER: [number, number] = [53.8142, -3.0503];

// Define service location types
type ServiceCategory = 
  | 'advice' 
  | 'health' 
  | 'community' 
  | 'education' 
  | 'employment' 
  | 'housing'
  | 'financial';

interface ServiceLocation {
  id: number;
  name: string;
  description: string;
  address: string;
  category: ServiceCategory;
  coordinates: [number, number]; // [latitude, longitude]
  website?: string;
  phone?: string;
  hours?: string;
}

// Service locations data - real Blackpool locations
const serviceLocations: ServiceLocation[] = [
  {
    id: 1,
    name: "Citizens Information & Advice Bureau",
    description: "Free, confidential guidance on benefits, housing, debt, healthcare, family support and more. Our specialist advisors can help with a wide range of issues.",
    address: "27 St Anne's Road, Blackpool, Lancs, FY4 2AP",
    category: "advice",
    coordinates: [53.8145, -3.0394],
    website: "https://www.blackpoolciab.org.uk",
    phone: "01253 477 775",
    hours: "Mon-Fri: 9am-5pm"
  },
  {
    id: 2,
    name: "Blackpool Victoria Hospital",
    description: "Main hospital serving Blackpool and the Fylde coast.",
    address: "Whinney Heys Rd, Blackpool FY3 8NR",
    category: "health",
    coordinates: [53.8238, -3.0326],
    website: "https://www.bfwh.nhs.uk/",
    phone: "01253 300000"
  },
  {
    id: 3,
    name: "Blackpool Council",
    description: "Local government offices providing public services.",
    address: "Corporation St, Blackpool FY1 1LZ",
    category: "community",
    coordinates: [53.8160, -3.0556],
    website: "https://www.blackpool.gov.uk/",
    phone: "01253 477477",
    hours: "Mon-Fri: 9am-5pm"
  },
  {
    id: 4,
    name: "Blackpool Central Library",
    description: "Public library offering books, internet access and community services.",
    address: "Queen St, Blackpool FY1 1PX",
    category: "education",
    coordinates: [53.8181, -3.0550],
    website: "https://www.blackpool.gov.uk/Residents/Libraries-arts-and-heritage/Libraries/Libraries.aspx",
    phone: "01253 478080",
    hours: "Mon-Sat: 9am-5pm, Sun: Closed"
  },
  {
    id: 5,
    name: "JobCentre Plus",
    description: "Government service helping people find employment and claim benefits.",
    address: "43 Queen St, Blackpool FY1 1LH",
    category: "employment",
    coordinates: [53.8178, -3.0537],
    phone: "0800 169 0190",
    hours: "Mon-Fri: 9am-5pm"
  },
  {
    id: 6,
    name: "Blackpool Housing Company",
    description: "Provides quality rental accommodation in Blackpool.",
    address: "10-14 Clifton St, Blackpool FY1 1JW",
    category: "housing",
    coordinates: [53.8175, -3.0535],
    website: "https://www.bch.co.uk/",
    phone: "01253 477900",
    hours: "Mon-Fri: 9am-5pm"
  },
  {
    id: 7,
    name: "The Salvation Army Blackpool",
    description: "Support services including food bank, homelessness assistance and community programs.",
    address: "Raikes Parade, Blackpool FY1 4EL",
    category: "community",
    coordinates: [53.8210, -3.0461],
    website: "https://www.salvationarmy.org.uk/blackpool-citadel",
    phone: "01253 626114"
  },
  {
    id: 8,
    name: "Blackpool Coastal Housing",
    description: "Manages council housing and provides housing support services.",
    address: "Coastal House, 17-19 Abingdon St, Blackpool FY1 1DG",
    category: "housing",
    coordinates: [53.8169, -3.0545],
    website: "https://www.bch.co.uk/",
    phone: "01253 477900",
    hours: "Mon-Fri: 9am-5pm"
  },
  {
    id: 9,
    name: "Blackpool and The Fylde College",
    description: "Further and higher education institution.",
    address: "Park Rd, Blackpool FY1 4ES",
    category: "education",
    coordinates: [53.8237, -3.0399],
    website: "https://www.blackpool.ac.uk/",
    phone: "01253 352352"
  },
  {
    id: 10,
    name: "Lancashire Credit Union",
    description: "Financial cooperative providing savings accounts and loans.",
    address: "Birley Street, Blackpool FY1 1DU",
    category: "financial",
    coordinates: [53.8164, -3.0551],
    website: "https://www.lancashirecreditunion.co.uk/",
    phone: "01253 478827",
    hours: "Mon, Wed, Fri: 10am-2pm"
  }
];

// Category colors for the map
const categoryColors: Record<ServiceCategory, string> = {
  advice: '#1e88e5',      // Blue
  health: '#d32f2f',      // Red 
  community: '#388e3c',   // Green
  education: '#f57c00',   // Orange
  employment: '#7b1fa2',  // Purple
  housing: '#0097a7',     // Teal
  financial: '#fbc02d'    // Yellow
};

// Customize marker icons based on category
const createCategoryIcon = (category: ServiceCategory) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${categoryColors[category]}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

export default function ServiceMap() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter locations based on category and search term
  const filteredLocations = serviceLocations.filter(location => {
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    const matchesSearch = 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blackpool Service Map | {SITE_NAME}</title>
        <meta name="description" content="Interactive map of support services and important locations in Blackpool, Fylde and Wyre. Find local advice centers, healthcare, housing support, education, and community services." />
        <meta name="keywords" content="Blackpool map, local services, support centers, community resources, Blackpool help, Fylde services, Wyre support" />
        <link rel="canonical" href="https://blackpooladvice.org/resources/service-map" />
      </Helmet>
      
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blackpool Service Map</h1>
          <p className="text-lg max-w-3xl">
            Find local support services and important locations around Blackpool, Fylde and Wyre. Use the filters to narrow down services by category or search for specific locations.
          </p>
        </div>
      </section>
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search locations
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name, description or address"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by category
              </label>
              <select
                id="category"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
              >
                <option value="all">All Categories</option>
                <option value="advice">Advice Services</option>
                <option value="health">Healthcare</option>
                <option value="community">Community Support</option>
                <option value="education">Education</option>
                <option value="employment">Employment Support</option>
                <option value="housing">Housing Services</option>
                <option value="financial">Financial Services</option>
              </select>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-[600px] relative">
              <MapContainer 
                center={BLACKPOOL_CENTER} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {filteredLocations.map((location) => (
                  <Marker 
                    key={location.id} 
                    position={location.coordinates}
                    icon={createCategoryIcon(location.category)}
                  >
                    <Popup>
                      <div className="popup-content">
                        <h3 className="font-bold text-lg">{location.name}</h3>
                        <p className="text-sm mb-2">{location.description}</p>
                        <div className="text-xs text-gray-600 mb-1">
                          <strong>Address:</strong> {location.address}
                        </div>
                        {location.phone && (
                          <div className="text-xs text-gray-600 mb-1">
                            <strong>Phone:</strong> {location.phone}
                          </div>
                        )}
                        {location.hours && (
                          <div className="text-xs text-gray-600 mb-1">
                            <strong>Hours:</strong> {location.hours}
                          </div>
                        )}
                        {location.website && (
                          <a 
                            href={location.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline block mt-2"
                          >
                            Visit Website
                          </a>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Locations ({filteredLocations.length})</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {filteredLocations.map(location => (
                <div key={location.id} className="border rounded-md p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div 
                      className="w-4 h-4 rounded-full mt-1 mr-3 flex-shrink-0" 
                      style={{ backgroundColor: categoryColors[location.category] }}
                    ></div>
                    <div>
                      <h3 className="font-bold text-lg">{location.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                      <p className="text-sm mb-1"><strong>Address:</strong> {location.address}</p>
                      {location.phone && <p className="text-sm mb-1"><strong>Phone:</strong> {location.phone}</p>}
                      {location.hours && <p className="text-sm mb-1"><strong>Hours:</strong> {location.hours}</p>}
                      {location.website && (
                        <a 
                          href={location.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline block mt-1"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredLocations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No locations found matching your search criteria. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Need More Help?</h2>
            <p className="mb-6">
              If you can't find what you're looking for, our advisors can help point you in the right direction. Contact us for personalized guidance.
            </p>
            <a href="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
              Contact an Advisor
            </a>
          </div>
        </div>
      </section>
    </>
  );
}