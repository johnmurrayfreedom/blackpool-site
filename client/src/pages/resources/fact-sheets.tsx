import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { SITE_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFileDownload, faSearch, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import DataCollectionModal from '@/components/shared/DataCollectionModal';

// Types for user data and fact sheets
interface UserData {
  email: string;
  fullName?: string;
  postcode?: string;
  interests?: string[];
  consentMarketing: boolean;
}

interface FactSheet {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  downloadUrl: string;
  externalLink?: boolean;
  available: boolean;
}

// Fact sheet categories
const categories = [
  { id: 'benefits', name: 'Benefits' },
  { id: 'health', name: 'Health & Disability' },
  { id: 'housing', name: 'Housing' },
  { id: 'debt', name: 'Debt & Money' },
  { id: 'employment', name: 'Employment' },
  { id: 'family', name: 'Family' },
  { id: 'consumer', name: 'Consumer Rights' },
  { id: 'immigration', name: 'Immigration' },
];

// Import fact sheet documents
import universalCreditHtml from '@/assets/fact-sheets/universal-credit-guide.html?url';
import pipClaimsHtml from '@/assets/fact-sheets/pip-claims.html?url';
import debtOptionsHtml from '@/assets/fact-sheets/debt-options.html?url';

// Fact sheet data with actual links
const factSheets = [
  {
    id: 'universal-credit',
    title: 'Universal Credit: A Complete Guide',
    description: 'Learn about Universal Credit eligibility, how to apply, payment schedules, and how to manage your claim.',
    category: 'benefits',
    lastUpdated: 'May 2025',
    downloadUrl: universalCreditHtml,
    available: true
  },
  {
    id: 'pip-claims',
    title: 'Personal Independence Payment (PIP) Claims',
    description: 'A step-by-step guide to applying for PIP, including tips for completing the forms and preparing for assessments.',
    category: 'benefits',
    lastUpdated: 'May 2025',
    downloadUrl: pipClaimsHtml,
    available: true
  },
  {
    id: 'pension-credit',
    title: 'Pension Credit Explained',
    description: 'Information about Pension Credit, who can claim it, and how it affects other benefits.',
    category: 'benefits',
    lastUpdated: 'March 2025',
    downloadUrl: 'https://www.gov.uk/pension-credit',
    externalLink: true,
    available: true
  },
  {
    id: 'blue-badge',
    title: 'Applying for a Blue Badge',
    description: 'Guidance on eligibility for the Blue Badge scheme and how to complete your application successfully.',
    category: 'health',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.gov.uk/government/publications/blue-badge-can-i-get-one',
    externalLink: true,
    available: true
  },
  {
    id: 'nhs-healthcare',
    title: 'Understanding NHS Healthcare Rights',
    description: 'Information about your rights to NHS treatment, waiting times, and how to make a complaint.',
    category: 'health',
    lastUpdated: 'February 2025',
    downloadUrl: 'https://www.nhs.uk/nhs-services/visiting-or-moving-to-england/how-to-access-nhs-services-in-england/',
    externalLink: true,
    available: true
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support Services',
    description: 'A guide to mental health services in Blackpool, Fylde & Wyre, including how to access help in a crisis.',
    category: 'health',
    lastUpdated: 'May 2025',
    downloadUrl: 'https://www.lancashiremind.org.uk/pages/153-mental-health-crisis-helplines',
    externalLink: true,
    available: true
  },
  {
    id: 'housing-options',
    title: 'Housing Options in Blackpool',
    description: 'Information about different housing options, including social housing, private renting, and home ownership schemes.',
    category: 'housing',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.blackpool.gov.uk/Residents/Housing/Housing-options/Housing-options.aspx',
    externalLink: true,
    available: true
  },
  {
    id: 'tenancy-rights',
    title: 'Private Tenants: Know Your Rights',
    description: 'Information about your rights as a private tenant, including deposits, repairs, and eviction procedures.',
    category: 'housing',
    lastUpdated: 'March 2025',
    downloadUrl: 'https://www.gov.uk/private-renting',
    externalLink: true,
    available: true
  },
  {
    id: 'homelessness',
    title: 'Homelessness Prevention and Support',
    description: "Guidance on what to do if you're at risk of homelessness and the support available.",
    category: 'housing',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.blackpool.gov.uk/Residents/Housing/Housing-support/Homelessness/Homelessness.aspx',
    externalLink: true,
    available: true
  },
  {
    id: 'debt-options',
    title: 'Debt Solutions Explained',
    description: 'An overview of different debt solutions, including debt management plans, IVAs, and bankruptcy.',
    category: 'debt',
    lastUpdated: 'May 2025',
    downloadUrl: debtOptionsHtml,
    available: true
  },
  {
    id: 'dealing-creditors',
    title: 'Dealing with Creditors and Debt Collectors',
    description: 'Advice on how to communicate with creditors, respond to letters, and deal with visits from bailiffs.',
    category: 'debt',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.citizensadvice.org.uk/debt-and-money/action-your-creditor-can-take/',
    externalLink: true,
    available: true
  },
  {
    id: 'budget-planning',
    title: 'Budget Planning Worksheet',
    description: 'A practical worksheet to help you create a household budget and manage your money effectively.',
    category: 'debt',
    lastUpdated: 'March 2025',
    downloadUrl: 'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/budget-planner',
    externalLink: true,
    available: true
  },
  {
    id: 'employment-rights',
    title: 'Basic Employment Rights',
    description: 'Information about your rights at work, including contracts, pay, holidays, and sick leave.',
    category: 'employment',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.gov.uk/employment-status/worker',
    externalLink: true,
    available: true
  },
  {
    id: 'redundancy',
    title: 'Facing Redundancy',
    description: "What to expect if you're facing redundancy, including your rights, redundancy pay, and next steps.",
    category: 'employment',
    lastUpdated: 'February 2025',
    downloadUrl: 'https://www.acas.org.uk/redundancy',
    externalLink: true,
    available: true
  },
  {
    id: 'discrimination',
    title: 'Workplace Discrimination',
    description: 'Information about the different types of workplace discrimination and how to challenge them.',
    category: 'employment',
    lastUpdated: 'May 2025',
    downloadUrl: 'https://www.equalityhumanrights.com/en/advice-and-guidance/guidance-workers',
    externalLink: true,
    available: true
  },
  {
    id: 'child-maintenance',
    title: 'Child Maintenance: Your Options',
    description: 'Information about making child maintenance arrangements, including using the Child Maintenance Service.',
    category: 'family',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.gov.uk/making-child-maintenance-arrangement',
    externalLink: true,
    available: true
  },
  {
    id: 'separation-divorce',
    title: 'Separation and Divorce',
    description: 'Guidance on the legal aspects of separation and divorce, including division of assets and child arrangements.',
    category: 'family',
    lastUpdated: 'March 2025',
    downloadUrl: 'https://www.gov.uk/divorce',
    externalLink: true,
    available: true
  },
  {
    id: 'childcare',
    title: 'Childcare Options and Support',
    description: 'Information about different childcare options and the financial support available.',
    category: 'family',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.gov.uk/get-childcare',
    externalLink: true,
    available: true
  },
  {
    id: 'consumer-rights',
    title: 'Consumer Rights When Shopping',
    description: 'Information about your rights when buying goods and services, including returns and refunds.',
    category: 'consumer',
    lastUpdated: 'May 2025',
    downloadUrl: 'https://www.citizensadvice.org.uk/consumer/shopping/if-something-you-bought-is-faulty/',
    externalLink: true,
    available: true
  },
  {
    id: 'energy-rights',
    title: 'Energy Bills and Your Rights',
    description: "Information about dealing with energy suppliers, understanding your bill, and what to do if you're in arrears.",
    category: 'consumer',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.citizensadvice.org.uk/consumer/energy/energy-supply/',
    externalLink: true,
    available: true
  },
  {
    id: 'scam-awareness',
    title: 'Recognising and Avoiding Scams',
    description: 'Guidance on how to spot common scams and protect yourself from fraud.',
    category: 'consumer',
    lastUpdated: 'March 2025',
    downloadUrl: 'https://www.citizensadvice.org.uk/consumer/scams/check-if-something-might-be-a-scam/',
    externalLink: true,
    available: true
  },
  {
    id: 'eu-settlement',
    title: 'EU Settlement Scheme',
    description: 'Information about the EU Settlement Scheme and how to apply.',
    category: 'immigration',
    lastUpdated: 'April 2025',
    downloadUrl: 'https://www.gov.uk/settled-status-eu-citizens-families',
    externalLink: true,
    available: true
  },
  {
    id: 'immigration-status',
    title: 'Checking Your Immigration Status',
    description: 'Guidance on how to check your immigration status and your rights in the UK.',
    category: 'immigration',
    lastUpdated: 'February 2025',
    downloadUrl: 'https://www.gov.uk/view-prove-immigration-status',
    externalLink: true,
    available: true
  },
  {
    id: 'immigration-support',
    title: 'Immigration Support Services',
    description: 'Information about organisations that can provide advice and support on immigration issues.',
    category: 'immigration',
    lastUpdated: 'May 2025',
    downloadUrl: 'https://www.gov.uk/find-an-immigration-adviser',
    externalLink: true,
    available: true
  },
];

const FactSheets = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dataCollectionModalOpen, setDataCollectionModalOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<FactSheet | null>(null);
  
  // Filter fact sheets based on active tab and search query
  const filteredFactSheets = factSheets.filter(sheet => {
    const matchesCategory = activeTab === 'all' || sheet.category === activeTab;
    const matchesSearch = searchQuery === '' || 
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sheet.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Handle opening fact sheets with data collection
  const handleFactSheetAccess = (sheet: FactSheet) => {
    // For external links, just open directly
    if (sheet.externalLink) {
      window.open(sheet.downloadUrl, '_blank');
      return;
    }
    
    // For internal fact sheets, show data collection modal
    setSelectedSheet(sheet);
    setDataCollectionModalOpen(true);
  };
  
  // Handle data collection form submission
  const handleDataSubmission = (userData: UserData) => {
    // Track user activity
    if (selectedSheet) {
      fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          resourceType: 'fact_sheet',
          resourceName: selectedSheet.title,
          resourceCategory: selectedSheet.category,
        }),
      }).catch(error => {
        console.error('Error recording user activity:', error);
      });
      
      // Close modal and open fact sheet
      setDataCollectionModalOpen(false);
      window.open(selectedSheet.downloadUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>Fact Sheets | {SITE_NAME}</title>
        <meta name="description" content="Download free factsheets covering benefits, housing, debt, employment, and more. Essential guides to help you understand your rights and options." />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Fact Sheets</h1>
        
        <div className="mb-8">
          <p className="text-lg mb-4">
            Our fact sheets provide clear, concise information on a range of topics to help you understand 
            your rights and options. All information is up-to-date with the latest regulations and guidelines.
          </p>
          
          <div className="relative mb-6">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search fact sheets..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex flex-wrap h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredFactSheets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFactSheets.map(sheet => (
                    <Card key={sheet.id} className="h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFileAlt} className="text-primary" />
                            <CardTitle className="text-lg">{sheet.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm mb-2">{sheet.description}</p>
                        <p className="text-xs text-gray-500">
                          Last updated: {sheet.lastUpdated}
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        {sheet.available ? (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleFactSheetAccess(sheet)}
                          >
                            <FontAwesomeIcon icon={sheet.externalLink ? faExternalLinkAlt : faFileDownload} className="mr-2" />
                            {sheet.externalLink ? 'View Resource' : 'View Fact Sheet'}
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full" disabled>
                            <FontAwesomeIcon icon={faFileDownload} className="mr-2" />
                            Coming Soon
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-2">No fact sheets found</h3>
                  <p>
                    Please try a different search term or category, or <a href="/contact" className="text-primary hover:underline">contact us</a> for specific information.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-primary/10 p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-3/4">
              <h2 className="text-xl font-bold text-primary mb-2">Need help with a specific issue?</h2>
              <p className="mb-4">
                Our advisors can provide personalized guidance on your situation and help you understand 
                the information in our fact sheets.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = '/contact'}
              >
                Book an appointment
              </Button>
            </div>
            <div className="md:w-1/4 flex justify-center">
              <FontAwesomeIcon icon={faExternalLinkAlt} className="text-primary text-6xl opacity-20" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Using Our Fact Sheets</h2>
          <div className="space-y-4">
            <p>
              Our fact sheets are designed to give you helpful information about your rights and options, 
              but they are not a substitute for professional advice tailored to your specific circumstances.
            </p>
            <p>
              The information provided is accurate as of the 'last updated' date shown on each fact sheet. 
              Laws and regulations may have changed since then, so please check with an advisor for the 
              most up-to-date guidance.
            </p>
            <p>
              If you need help understanding any of the information in our fact sheets, please 
              <a href="/contact" className="text-primary hover:underline"> contact us</a> to speak with an advisor.
            </p>
          </div>
        </div>
      </div>
      
      {/* Data Collection Modal */}
      {selectedSheet && (
        <DataCollectionModal
          isOpen={dataCollectionModalOpen}
          onClose={() => setDataCollectionModalOpen(false)}
          onSuccess={handleDataSubmission}
          title="Access Fact Sheet"
          description="Please provide a few details to help us improve our services before accessing this resource."
          resourceType="fact_sheet"
          resourceName={selectedSheet.title}
          resourceCategory={selectedSheet.category}
          collectName={true}
          collectPostcode={true}
          interestOptions={[
            { value: "benefits", label: "Benefits & Welfare" },
            { value: "debt", label: "Debt & Money" },
            { value: "housing", label: "Housing" },
            { value: "employment", label: "Employment" },
            { value: "family", label: "Family Issues" },
            { value: "health", label: "Health & Disability" },
            { value: "immigration", label: "Immigration" },
            { value: "consumer", label: "Consumer Rights" }
          ]}
          collectInterests={true}
        />
      )}
    </div>
  );
};

export default FactSheets;