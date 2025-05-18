import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SITE_NAME, featuredGrants } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import DataCollectionModal from '@/components/shared/DataCollectionModal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MultiStepForm from '@/components/shared/MultiStepForm';

// Define form schema with ZOD validator
const formSchema = z.object({
  ageRange: z.enum(['under18', '18to24', '25to64', 'over65'], {
    required_error: 'Please select your age range',
  }),
  householdType: z.enum(['single', 'couple', 'family', 'other'], {
    required_error: 'Please select your household type',
  }),
  employmentStatus: z.enum(['employed', 'selfEmployed', 'unemployed', 'student', 'retired', 'unable'], {
    required_error: 'Please select your employment status',
  }),
  housingType: z.enum(['ownOutright', 'ownMortgage', 'rentPrivate', 'rentCouncil', 'shared', 'livingWithParents', 'other'], {
    required_error: 'Please select your housing situation',
  }),
  hasDisability: z.boolean().default(false),
  hasChildren: z.boolean().default(false),
  postcode: z.string()
    .min(1, { message: 'Postcode is required' })
    .max(10, { message: 'Postcode is too long' }),
  incomeBelow16K: z.boolean().default(false),
  categories: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Grant categories
const categories = [
  { id: 'housing', label: 'Housing & Utilities' },
  { id: 'health', label: 'Health & Disability' },
  { id: 'education', label: 'Education & Training' },
  { id: 'business', label: 'Business & Self-Employment' },
  { id: 'emergency', label: 'Emergency Support' },
  { id: 'children', label: 'Children & Families' },
  { id: 'energy', label: 'Energy Efficiency' },
  { id: 'community', label: 'Community Projects' },
];

// Available grants for matching
const availableGrants = [
  {
    id: 'winterFuel',
    title: 'Winter Fuel Payment',
    description: 'Help with heating costs during winter months for those born before 1957.',
    eligibility: 'You may get Winter Fuel Payment if you were born before September 25, 1957.',
    amount: '£100 - £300',
    category: 'energy',
    icon: 'fire' as IconProp,
    url: 'https://www.gov.uk/winter-fuel-payment',
    requirements: ['over65']
  },
  {
    id: 'warmHome',
    title: 'Warm Home Discount',
    description: 'One-off discount on your electricity bill for winter months.',
    eligibility: 'Available to pensioners and those on a low income receiving certain means-tested benefits.',
    amount: '£150',
    category: 'energy',
    icon: 'temperature-high' as IconProp,
    url: 'https://www.gov.uk/the-warm-home-discount-scheme',
    requirements: ['incomeBelow16K']
  },
  {
    id: 'householdSupport',
    title: 'Household Support Fund',
    description: 'Emergency assistance with essentials like food and energy costs.',
    eligibility: 'For vulnerable households struggling with the cost of essentials.',
    amount: '£200 - £500',
    category: 'emergency',
    icon: 'home' as IconProp,
    url: 'https://www.blackpool.gov.uk/Residents/Benefits/Household-Support-Fund.aspx',
    requirements: ['incomeBelow16K']
  },
  {
    id: 'businessWebsite',
    title: 'Business Website Grant',
    description: '80% off professional website development for small businesses.',
    eligibility: 'Small businesses in Blackpool, Fylde & Wyre looking to enhance their online presence.',
    amount: 'Up to £5,000',
    category: 'business',
    icon: 'laptop' as IconProp,
    url: 'https://www.blackpool.gov.uk/Business/Business-support-and-advice/Business-support.aspx',
    requirements: ['selfEmployed']
  },
  {
    id: 'digitalSkills',
    title: 'Digital Skills Grant',
    description: 'Funding for digital skills training and equipment.',
    eligibility: 'For residents looking to improve their digital skills for employment.',
    amount: 'Up to £1,000',
    category: 'education',
    icon: 'laptop-code' as IconProp,
    url: 'https://www.gov.uk/guidance/find-a-skills-boot-camp',
    requirements: ['unemployed', 'selfEmployed']
  },
  {
    id: 'attendanceAllowance',
    title: 'Attendance Allowance',
    description: 'Help with personal care if you have a physical or mental disability.',
    eligibility: 'For people of State Pension age who need help with personal care due to illness or disability.',
    amount: '£68.10 - £101.75 per week',
    category: 'health',
    icon: 'hand-holding-heart' as IconProp,
    url: 'https://www.gov.uk/attendance-allowance',
    requirements: ['over65', 'hasDisability']
  },
  {
    id: 'disabledFacilities',
    title: 'Disabled Facilities Grant',
    description: 'Funding for adaptations to make your home accessible.',
    eligibility: 'For people with disabilities who need to make adaptations to their home.',
    amount: 'Up to £30,000',
    category: 'housing',
    icon: 'wheelchair' as IconProp,
    url: 'https://www.gov.uk/disabled-facilities-grants',
    requirements: ['hasDisability']
  },
  {
    id: 'childcareBursary',
    title: 'Childcare Bursary',
    description: 'Help with childcare costs while studying or training.',
    eligibility: 'For parents in further education or training.',
    amount: 'Up to £160 per child per week',
    category: 'education',
    icon: 'child' as IconProp,
    url: 'https://www.gov.uk/care-to-learn',
    requirements: ['hasChildren', 'student']
  },
  {
    id: 'healthyStart',
    title: 'Healthy Start Scheme',
    description: 'Prepaid card for milk, fruit, vegetables and vitamins for pregnant women and young children.',
    eligibility: 'For pregnant women and parents of children under 4 on certain benefits.',
    amount: '£4.25 per week per child',
    category: 'children',
    icon: 'carrot' as IconProp,
    url: 'https://www.healthystart.nhs.uk/',
    requirements: ['hasChildren', 'incomeBelow16K']
  },
  {
    id: 'localWelfare',
    title: 'Local Welfare Assistance',
    description: 'Emergency support for essential items and urgent living costs.',
    eligibility: 'For residents facing financial crisis or emergency.',
    amount: 'Varies',
    category: 'emergency',
    icon: 'hand-holding-usd' as IconProp,
    url: 'https://www.lancashire.gov.uk/health-and-social-care/benefits-and-financial-help/crisis-support-scheme/',
    requirements: []
  },
  {
    id: 'schoolUniform',
    title: 'School Uniform Grant',
    description: 'Help with the cost of school uniforms.',
    eligibility: 'For low-income families with school-age children.',
    amount: 'Up to £150 per child',
    category: 'children',
    icon: 'tshirt' as IconProp,
    url: 'https://www.blackpool.gov.uk/Residents/Education-and-schools/School-uniform-assistance.aspx',
    requirements: ['hasChildren', 'incomeBelow16K']
  },
  {
    id: 'communityRenewable',
    title: 'Community Renewable Energy Grant',
    description: 'Funding for community-led renewable energy projects.',
    eligibility: 'For community groups and organizations in Blackpool, Fylde & Wyre.',
    amount: 'Up to £10,000',
    category: 'community',
    icon: 'solar-panel' as IconProp,
    url: 'https://www.gov.uk/government/collections/community-energy',
    requirements: []
  }
];

const GrantFinder = () => {
  const [matchedGrants, setMatchedGrants] = useState<typeof availableGrants>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showDataCollection, setShowDataCollection] = useState(false);
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageRange: undefined,
      householdType: undefined,
      employmentStatus: undefined,
      housingType: undefined,
      hasDisability: false,
      hasChildren: false,
      postcode: '',
      incomeBelow16K: false,
      categories: [],
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // Find matching grants based on form data
    const userRequirements: string[] = [];
    
    // Add requirements based on form data
    if (data.ageRange) userRequirements.push(data.ageRange);
    if (data.employmentStatus) userRequirements.push(data.employmentStatus);
    if (data.hasDisability) userRequirements.push('hasDisability');
    if (data.hasChildren) userRequirements.push('hasChildren');
    if (data.incomeBelow16K) userRequirements.push('incomeBelow16K');
    
    // Filter grants based on user requirements and categories
    let filteredGrants = availableGrants.filter(grant => {
      // If no specific requirements, include grant
      if (grant.requirements.length === 0) return true;
      
      // Check if any of the grant requirements match user requirements
      return grant.requirements.some(req => userRequirements.includes(req));
    });
    
    // Further filter by selected categories if any
    if (data.categories && data.categories.length > 0) {
      filteredGrants = filteredGrants.filter(grant => 
        data.categories?.includes(grant.category)
      );
    }
    
    setMatchedGrants(filteredGrants);
    setShowResults(true);
    
    // If we found grants, show the data collection modal after a short delay
    if (filteredGrants.length > 0) {
      setTimeout(() => {
        setShowDataCollection(true);
      }, 1500);
    }
  };
  
  // Handle user data submission
  const handleDataSubmission = (userData: any) => {
    // Track the user's activity with the grant finder
    fetch('/api/user-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        resourceType: 'finder',
        resourceName: 'Grant Finder',
        resourceCategory: 'grants',
      }),
    }).catch(error => {
      console.error('Error recording user activity:', error);
    });
    
    // Close the data collection modal
    setShowDataCollection(false);
  };

  // Reset the form and results
  const handleReset = () => {
    form.reset();
    setShowResults(false);
    setMatchedGrants([]);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>Grant Finder | {SITE_NAME}</title>
        <meta name="description" content="Use our Grant Finder tool to discover what grants, funding and financial support you might be eligible for." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Grant Finder</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Grants & Financial Support</CardTitle>
            <CardDescription>
              Answer a few questions to discover what grants and financial support you might be eligible for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age Range */}
                    <FormField
                      control={form.control}
                      name="ageRange"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Your Age Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your age range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under18">Under 18</SelectItem>
                              <SelectItem value="18to24">18 to 24</SelectItem>
                              <SelectItem value="25to64">25 to 64</SelectItem>
                              <SelectItem value="over65">65 and over</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Household Type */}
                    <FormField
                      control={form.control}
                      name="householdType"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Household Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your household type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="single">Single Adult</SelectItem>
                              <SelectItem value="couple">Couple</SelectItem>
                              <SelectItem value="family">Family with Children</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Employment Status */}
                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Employment Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your employment status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employed">Employed</SelectItem>
                              <SelectItem value="selfEmployed">Self-employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                              <SelectItem value="unable">Unable to work</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Housing Type */}
                    <FormField
                      control={form.control}
                      name="housingType"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Housing Situation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your housing situation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ownOutright">Own home outright</SelectItem>
                              <SelectItem value="ownMortgage">Own home with mortgage</SelectItem>
                              <SelectItem value="rentPrivate">Rent privately</SelectItem>
                              <SelectItem value="rentCouncil">Rent from council/housing association</SelectItem>
                              <SelectItem value="shared">Shared accommodation</SelectItem>
                              <SelectItem value="livingWithParents">Living with parents</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Categories */}
                    <FormField
                      control={form.control}
                      name="categories"
                      render={() => (
                        <FormItem className="col-span-2">
                          <div className="mb-4">
                            <FormLabel>Grant Categories (Optional)</FormLabel>
                            <FormDescription>
                              Select the categories you're interested in
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {categories.map((category) => (
                              <FormField
                                key={category.id}
                                control={form.control}
                                name="categories"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={category.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(category.id)}
                                          onCheckedChange={(checked) => {
                                            const categories = field.value || [];
                                            return checked
                                              ? field.onChange([...categories, category.id])
                                              : field.onChange(
                                                  categories.filter((value) => value !== category.id)
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {category.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Additional Criteria */}
                    <div className="col-span-2 space-y-4">
                      <FormField
                        control={form.control}
                        name="hasDisability"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I have a disability or long-term health condition
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hasChildren"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I have dependent children under 18
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="incomeBelow16K"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                My household income is below £16,000 per year
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Postcode */}
                    <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Postcode</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. FY1 1AA" {...field} />
                          </FormControl>
                          <FormDescription>
                            Used to check local grants and support
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button type="submit">
                      Find Grants
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-4">Your Grant Matches</h3>
                  <p className="mb-4">
                    Based on your answers, we've found {matchedGrants.length} potential grants and support schemes:
                  </p>
                </div>
                
                {matchedGrants.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {matchedGrants.map((grant) => (
                      <Card key={grant.id} className="h-full flex flex-col">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <FontAwesomeIcon icon={grant.icon} className="text-primary h-4 w-4" />
                            </div>
                            <CardTitle className="text-lg">{grant.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm mb-2">{grant.description}</p>
                          <p className="text-sm text-gray-500 mb-2">
                            <span className="font-semibold">Eligibility: </span>
                            {grant.eligibility}
                          </p>
                          <p className="font-semibold">
                            Amount: {grant.amount}
                          </p>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-between">
                          <a 
                            href={grant.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            More information
                          </a>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setIsFormOpen(true)}
                          >
                            Get help applying
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">No exact matches found</h3>
                    <p className="mb-4">
                      We couldn't find any specific grants matching your criteria. However, there might still be support available.
                    </p>
                    <p className="mb-4">
                      Try modifying your search or speak to one of our advisors for a personalized assessment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Speak to an advisor
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleReset}
                      >
                        Try again
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">Next Steps</h3>
                  <p className="mb-4">
                    This tool provides an indication of grants you may be eligible for, but isn't comprehensive. 
                    For personalized support:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Book a free appointment with our grants advisor</li>
                    <li>We can help check your eligibility and complete applications</li>
                    <li>We may also find additional grants not listed here</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => window.open("https://api.gohighlevel.uk/widget/booking/s2PtVdEMTKFWXNPEaRNI", "_blank")}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Book an Appointment
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                    >
                      New Search
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Featured Grants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGrants.map((grant) => (
              <Card key={grant.id} className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FontAwesomeIcon icon={grant.icon} className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-lg">{grant.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-2">{grant.description}</p>
                  <p className="font-semibold">
                    Amount: {grant.amount}
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsFormOpen(true)}
                  >
                    Check eligibility
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">About Our Grant Finding Service</h2>
          <p className="mb-4">
            Our grant finding service helps residents of Blackpool, Fylde & Wyre discover and access the financial 
            support they're entitled to. We can help with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Identifying suitable grants and support schemes</li>
            <li>Checking eligibility criteria</li>
            <li>Completing application forms</li>
            <li>Gathering required documentation</li>
            <li>Following up on applications</li>
          </ul>
          <p>
            Last year, we helped local residents secure over £1.2 million in grants and financial support. 
            Book an appointment with our team to see how we can help you.
          </p>
        </div>
      </div>
      
      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
      />
      
      {/* Data Collection Modal */}
      <DataCollectionModal
        isOpen={showDataCollection}
        onClose={() => setShowDataCollection(false)}
        onSuccess={handleDataSubmission}
        title="Save Your Grant Matches"
        description="Please provide a few details to save your matched grants and receive personalized funding updates."
        resourceType="finder"
        resourceName="Grant Finder"
        resourceCategory="grants"
        collectName={true}
        collectPostcode={true}
        interestOptions={[
          { value: "housing", label: "Housing & Utilities" },
          { value: "health", label: "Health & Disability" },
          { value: "education", label: "Education & Training" },
          { value: "business", label: "Business Support" },
          { value: "emergency", label: "Emergency Assistance" },
          { value: "children", label: "Children & Families" }
        ]}
        collectInterests={true}
      />
    </div>
  );
};

export default GrantFinder;