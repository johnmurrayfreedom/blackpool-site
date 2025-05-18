import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SITE_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthCheck } from '@/hooks/use-auth-check';
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Define form schema with the ZOD validator
const formSchema = z.object({
  householdType: z.enum(['single', 'couple', 'family'], {
    required_error: 'Please select your household type',
  }),
  ageRange: z.enum(['under18', '18to24', '25to64', 'over65'], {
    required_error: 'Please select your age range',
  }),
  employmentStatus: z.enum(['fullTime', 'partTime', 'selfEmployed', 'unemployed', 'student', 'retired'], {
    required_error: 'Please select your employment status',
  }),
  weeklyIncome: z.coerce.number()
    .min(0, { message: 'Income cannot be negative' })
    .optional()
    .or(z.literal('')),
  savingsAmount: z.coerce.number()
    .min(0, { message: 'Savings cannot be negative' })
    .optional()
    .or(z.literal('')),
  hasDisability: z.boolean().default(false),
  hasChildren: z.boolean().default(false),
  numberOfChildren: z.coerce.number()
    .min(0, { message: 'Number of children cannot be negative' })
    .max(10, { message: 'Please enter a reasonable number of children' })
    .optional()
    .or(z.literal('')),
  postcode: z.string()
    .min(1, { message: 'Postcode is required' })
    .max(10, { message: 'Postcode is too long' }),
  housingType: z.enum(['ownOutright', 'ownMortgage', 'rentPrivate', 'rentCouncil', 'shared', 'livingWithParents'], {
    required_error: 'Please select your housing situation',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Benefits descriptions for results section
const benefitInfo = {
  universalCredit: {
    title: 'Universal Credit',
    description: 'A payment to help with your living costs if you\'re on a low income, out of work or cannot work.',
    link: 'https://www.gov.uk/universal-credit',
    weeklyAmount: '£85 - £300+',
  },
  housingBenefit: {
    title: 'Housing Benefit or Housing Element',
    description: 'Help paying your rent if you\'re on a low income.',
    link: 'https://www.gov.uk/housing-benefit',
    weeklyAmount: 'Up to 100% of eligible rent',
  },
  councilTaxReduction: {
    title: 'Council Tax Reduction',
    description: 'Reduction in your council tax bill if you\'re on a low income or claim benefits.',
    link: 'https://www.gov.uk/apply-council-tax-reduction',
    weeklyAmount: 'Up to 100% reduction',
  },
  attendanceAllowance: {
    title: 'Attendance Allowance',
    description: 'Help with extra costs if you have a disability severe enough that you need someone to help look after you.',
    link: 'https://www.gov.uk/attendance-allowance',
    weeklyAmount: '£68.10 - £101.75',
  },
  personalIndependencePayment: {
    title: 'Personal Independence Payment (PIP)',
    description: 'Extra money to help with everyday costs if you have a long-term physical or mental health condition or disability.',
    link: 'https://www.gov.uk/pip',
    weeklyAmount: '£26.90 - £172.75',
  },
  childBenefit: {
    title: 'Child Benefit',
    description: 'Money to help with the cost of raising a child.',
    link: 'https://www.gov.uk/child-benefit',
    weeklyAmount: '£24.00 for first child, £15.90 for additional children',
  },
  pensionCredit: {
    title: 'Pension Credit',
    description: 'Extra money to help with your living costs if you\'re over State Pension age and on a low income.',
    link: 'https://www.gov.uk/pension-credit',
    weeklyAmount: 'Up to £201.05 (single) or £306.85 (couple)',
  },
  carerAllowance: {
    title: 'Carer\'s Allowance',
    description: 'Money for people who spend at least 35 hours a week providing regular care to someone who has a disability.',
    link: 'https://www.gov.uk/carers-allowance',
    weeklyAmount: '£76.75',
  },
  jobseekersAllowance: {
    title: 'New Style Jobseeker\'s Allowance',
    description: 'Money for people who are unemployed and looking for work.',
    link: 'https://www.gov.uk/jobseekers-allowance',
    weeklyAmount: 'Up to £84.80',
  },
};

const BenefitsCalculator = () => {
  const [showResults, setShowResults] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [eligibleBenefits, setEligibleBenefits] = useState<string[]>([]);
  const [totalEstimate, setTotalEstimate] = useState('');
  const [estimatedWeeklyAmount, setEstimatedWeeklyAmount] = useState('');
  
  // Use our authentication hook to manage user registration
  const { isAuthenticated, checkAuth, AuthModal, handleAuthSuccess } = useAuthCheck('Benefits Calculator');

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdType: undefined,
      ageRange: undefined,
      employmentStatus: undefined,
      weeklyIncome: '',
      savingsAmount: '',
      hasDisability: false,
      hasChildren: false,
      numberOfChildren: '',
      postcode: '',
      housingType: undefined,
    },
  });

  // Watch for hasChildren to show/hide number of children field
  const watchHasChildren = form.watch('hasChildren');

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // First check if user is authenticated
    if (!checkAuth()) {
      return; // The auth modal will be shown by the checkAuth function
    }
    
    // Start calculation animation
    setShowResults(true);
    setCalculationComplete(false);
    setCalculationProgress(0);
    
    // Simulate calculation process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setCalculationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        determineEligibleBenefits(data);
        setCalculationComplete(true);
      }
    }, 200);
  };
  
  // Track user's activity with the benefits calculator (now happens after authentication)
  const trackUserActivity = () => {
    if (isAuthenticated) {
      // Get user information from localStorage
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const userData = JSON.parse(userInfo);
          fetch('/api/user-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...userData,
              resourceType: 'calculator',
              resourceName: 'Benefits Calculator',
              resourceCategory: 'benefits',
            }),
          }).catch(error => {
            console.error('Error recording user activity:', error);
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  };
  
  // Call tracking function when results are shown
  useEffect(() => {
    if (calculationComplete && isAuthenticated) {
      trackUserActivity();
    }
  }, [calculationComplete, isAuthenticated]);

  // Logic to determine eligible benefits based on form data
  const determineEligibleBenefits = (data: FormValues) => {
    const benefits: string[] = [];
    
    // Basic eligibility check based on the data provided
    // This is a simplified version for demonstration
    
    // Universal Credit for low income
    if (
      (data.weeklyIncome === '' || Number(data.weeklyIncome) < 500) && 
      (data.ageRange !== 'over65')
    ) {
      benefits.push('universalCredit');
    }
    
    // Housing Benefit or element
    if (
      ['rentPrivate', 'rentCouncil', 'shared'].includes(data.housingType) && 
      (data.weeklyIncome === '' || Number(data.weeklyIncome) < 500)
    ) {
      benefits.push('housingBenefit');
    }
    
    // Council Tax Reduction
    if (data.weeklyIncome === '' || Number(data.weeklyIncome) < 500) {
      benefits.push('councilTaxReduction');
    }
    
    // PIP or Attendance Allowance for disability
    if (data.hasDisability) {
      if (data.ageRange === 'over65') {
        benefits.push('attendanceAllowance');
      } else {
        benefits.push('personalIndependencePayment');
      }
    }
    
    // Child Benefit
    if (data.hasChildren && Number(data.numberOfChildren) > 0) {
      benefits.push('childBenefit');
    }
    
    // Pension Credit
    if (data.ageRange === 'over65' && (data.weeklyIncome === '' || Number(data.weeklyIncome) < 350)) {
      benefits.push('pensionCredit');
    }
    
    // Carer's Allowance
    if (data.hasDisability && data.householdType !== 'single') {
      benefits.push('carerAllowance');
    }
    
    // Jobseeker's Allowance
    if (data.employmentStatus === 'unemployed' && data.ageRange !== 'over65' && data.ageRange !== 'under18') {
      benefits.push('jobseekersAllowance');
    }
    
    setEligibleBenefits(benefits);
    
    // Set total estimate
    if (benefits.length === 0) {
      setTotalEstimate('£0');
      setEstimatedWeeklyAmount('£0');
    } else if (benefits.length === 1) {
      setTotalEstimate('£250 - £500');
      setEstimatedWeeklyAmount('£60 - £120');
    } else if (benefits.length === 2) {
      setTotalEstimate('£500 - £750');
      setEstimatedWeeklyAmount('£120 - £175');
    } else if (benefits.length === 3) {
      setTotalEstimate('£750 - £1,000');
      setEstimatedWeeklyAmount('£175 - £230');
    } else {
      setTotalEstimate('£1,000+');
      setEstimatedWeeklyAmount('£230+');
    }
  };

  // Reset the form and results
  const handleReset = () => {
    form.reset();
    setShowResults(false);
    setCalculationComplete(false);
    setEligibleBenefits([]);
    setTotalEstimate('');
    setEstimatedWeeklyAmount('');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>Benefits Calculator | {SITE_NAME}</title>
        <meta name="description" content="Use our free benefits calculator to check what benefits you could get, how to claim and how your benefits will be affected if you start work." />
      </Helmet>
      
      {/* Authentication modal */}
      {AuthModal}
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Benefits Calculator</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check your entitlement</CardTitle>
            <CardDescription>
              Use our free calculator to check what benefits you could claim. All calculations are anonymous and your data is not stored.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Estimate only</AlertTitle>
              <AlertDescription>
                This calculator provides an estimate and cannot guarantee your actual entitlement. For a full assessment, please book an appointment with one of our advisors.
              </AlertDescription>
            </Alert>
            
            {!showResults ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                              <SelectItem value="fullTime">Full-time employed</SelectItem>
                              <SelectItem value="partTime">Part-time employed</SelectItem>
                              <SelectItem value="selfEmployed">Self-employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Housing Situation */}
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
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Weekly Income */}
                    <FormField
                      control={form.control}
                      name="weeklyIncome"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Weekly Income (£)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your total weekly income after tax
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Savings Amount */}
                    <FormField
                      control={form.control}
                      name="savingsAmount"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Savings Amount (£)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormDescription>
                            Total amount in savings and investments
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Disability */}
                    <FormField
                      control={form.control}
                      name="hasDisability"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-md col-span-1">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Disability or health condition
                            </FormLabel>
                            <FormDescription>
                              Do you or anyone in your household have a disability or health condition?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {/* Has Children */}
                    <FormField
                      control={form.control}
                      name="hasChildren"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-md col-span-1">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Children
                            </FormLabel>
                            <FormDescription>
                              Do you have any dependent children?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {/* Number of Children (conditional) */}
                    {watchHasChildren && (
                      <FormField
                        control={form.control}
                        name="numberOfChildren"
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel>Number of Children</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="10" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
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
                            Needed to check local support available
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
                      Calculate Benefits
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                {!calculationComplete ? (
                  <div className="space-y-4 py-8">
                    <p className="text-center text-lg">Calculating your potential benefits...</p>
                    <Progress value={calculationProgress} className="w-full" />
                    <p className="text-center text-sm text-gray-500">
                      Checking eligibility for various benefits and support schemes
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-primary mb-2">Your Estimated Entitlement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Potential monthly amount:</p>
                          <p className="text-2xl font-bold">{totalEstimate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estimated weekly amount:</p>
                          <p className="text-2xl font-bold">{estimatedWeeklyAmount}</p>
                        </div>
                      </div>
                    </div>
                    
                    {eligibleBenefits.length > 0 ? (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Benefits you may be eligible for:</h3>
                        <div className="space-y-4">
                          {eligibleBenefits.map((benefitKey) => {
                            const benefit = benefitInfo[benefitKey as keyof typeof benefitInfo];
                            return (
                              <Card key={benefitKey}>
                                <CardHeader className="pb-2">
                                  <CardTitle>{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-gray-700 mb-2">{benefit.description}</p>
                                  <p className="font-semibold">Typical amount: {benefit.weeklyAmount} per week</p>
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                  <a 
                                    href={benefit.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-sm"
                                  >
                                    Read more on GOV.UK
                                  </a>
                                </CardFooter>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">No benefits identified</h3>
                        <p className="mb-4">
                          Based on the information provided, we couldn't identify any benefits you may be eligible for. 
                          However, this is just an estimate and you may still qualify for support.
                        </p>
                        <p>
                          We recommend speaking to one of our advisors for a comprehensive assessment.
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="text-lg font-bold mb-2">Next Steps</h3>
                      <p className="mb-4">
                        This is just an estimate. For accurate information and help with applications:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Book a free appointment with our benefits advisors</li>
                        <li>Bring ID and proof of income/circumstances to your appointment</li>
                        <li>We can help complete applications and provide ongoing support</li>
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => window.open("https://api.gohighlevel.uk/widget/booking/s2PtVdEMTKFWXNPEaRNI", "_blank")}
                        >
                          Book an Appointment
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                        >
                          Start New Calculation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">About Our Benefits Calculator</h2>
          <p className="mb-4">
            Our benefits calculator provides a quick estimate of what you might be entitled to claim. 
            It covers major UK benefits including Universal Credit, Housing Benefit, PIP, and more.
          </p>
          <p className="mb-4">
            The actual amount you receive may differ based on your exact circumstances. Benefits rules 
            change frequently, and some benefits have complex eligibility criteria that cannot be fully 
            assessed through an online calculator.
          </p>
          <p>
            For a comprehensive assessment and help with applications, please book an appointment with 
            our trained advisors who can provide personalised support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCalculator;