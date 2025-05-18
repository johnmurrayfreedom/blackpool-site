import { useState } from 'react';
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, HelpCircle, PoundSterling, Banknote, Calculator } from 'lucide-react';

// Define form schema with the ZOD validator
const debtFormSchema = z.object({
  monthlyIncome: z.coerce.number()
    .min(0, { message: 'Income cannot be negative' })
    .optional()
    .or(z.literal('')),
  housingCosts: z.coerce.number()
    .min(0, { message: 'Housing costs cannot be negative' })
    .optional()
    .or(z.literal('')),
  utilityCosts: z.coerce.number()
    .min(0, { message: 'Utility costs cannot be negative' })
    .optional()
    .or(z.literal('')),
  foodCosts: z.coerce.number()
    .min(0, { message: 'Food costs cannot be negative' })
    .optional()
    .or(z.literal('')),
  transportCosts: z.coerce.number()
    .min(0, { message: 'Transport costs cannot be negative' })
    .optional()
    .or(z.literal('')),
  otherEssentials: z.coerce.number()
    .min(0, { message: 'Other essential costs cannot be negative' })
    .optional()
    .or(z.literal('')),
  creditCardDebt: z.coerce.number()
    .min(0, { message: 'Credit card debt cannot be negative' })
    .optional()
    .or(z.literal('')),
  personalLoans: z.coerce.number()
    .min(0, { message: 'Personal loans amount cannot be negative' })
    .optional()
    .or(z.literal('')),
  storeCardDebt: z.coerce.number()
    .min(0, { message: 'Store card debt cannot be negative' })
    .optional()
    .or(z.literal('')),
  overdraftAmount: z.coerce.number()
    .min(0, { message: 'Overdraft amount cannot be negative' })
    .optional()
    .or(z.literal('')),
  otherDebts: z.coerce.number()
    .min(0, { message: 'Other debts cannot be negative' })
    .optional()
    .or(z.literal('')),
});

type DebtFormValues = z.infer<typeof debtFormSchema>;

const DebtAdvice = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [showResults, setShowResults] = useState(false);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(0);
  const [availableForDebtPayment, setAvailableForDebtPayment] = useState(0);
  const [debtFreeTime, setDebtFreeTime] = useState('');
  const [debtSeverity, setDebtSeverity] = useState('');
  const [priorityActions, setPriorityActions] = useState<string[]>([]);
  
  // Initialize the debt calculator form
  const debtForm = useForm<DebtFormValues>({
    resolver: zodResolver(debtFormSchema),
    defaultValues: {
      monthlyIncome: '',
      housingCosts: '',
      utilityCosts: '',
      foodCosts: '',
      transportCosts: '',
      otherEssentials: '',
      creditCardDebt: '',
      personalLoans: '',
      storeCardDebt: '',
      overdraftAmount: '',
      otherDebts: '',
    },
  });

  // Handle debt calculator form submission
  const onDebtSubmit = (data: DebtFormValues) => {
    // Calculate total monthly expenses
    const totalEssentialExpenses = 
      (Number(data.housingCosts) || 0) +
      (Number(data.utilityCosts) || 0) +
      (Number(data.foodCosts) || 0) +
      (Number(data.transportCosts) || 0) +
      (Number(data.otherEssentials) || 0);
    
    // Calculate total debt
    const totalDebt = 
      (Number(data.creditCardDebt) || 0) +
      (Number(data.personalLoans) || 0) +
      (Number(data.storeCardDebt) || 0) +
      (Number(data.overdraftAmount) || 0) +
      (Number(data.otherDebts) || 0);
    
    // Calculate monthly income and available money for debt payments
    const monthlyIncome = Number(data.monthlyIncome) || 0;
    const availableForDebt = Math.max(0, monthlyIncome - totalEssentialExpenses);
    
    // Calculate debt-to-income ratio
    const dtiRatio = monthlyIncome > 0 ? (totalDebt / monthlyIncome) : 0;
    
    // Estimate debt-free time (simplified calculation)
    let timeEstimate = '';
    if (availableForDebt <= 0 || totalDebt <= 0) {
      timeEstimate = 'Unable to calculate';
    } else {
      const monthsToDebtFree = Math.ceil(totalDebt / availableForDebt);
      const years = Math.floor(monthsToDebtFree / 12);
      const months = monthsToDebtFree % 12;
      
      if (years > 0) {
        timeEstimate = `${years} year${years !== 1 ? 's' : ''} ${months > 0 ? `and ${months} month${months !== 1 ? 's' : ''}` : ''}`;
      } else {
        timeEstimate = `${months} month${months !== 1 ? 's' : ''}`;
      }
    }
    
    // Determine debt severity
    let severity = '';
    let actions = [];
    
    if (dtiRatio >= 2) {
      severity = 'Severe';
      actions = [
        'Seek urgent debt advice from our specialists',
        'Consider legal debt solutions (e.g., Debt Relief Order, bankruptcy)',
        'Prioritize essential bills before debt payments',
        'Negotiate with creditors to freeze interest'
      ];
    } else if (dtiRatio >= 1) {
      severity = 'Significant';
      actions = [
        'Book an appointment with our debt advisors',
        'Consider a debt management plan',
        'Review all expenses for potential savings',
        'Contact creditors to negotiate payments'
      ];
    } else if (dtiRatio >= 0.5) {
      severity = 'Moderate';
      actions = [
        'Create a structured repayment plan',
        'Focus on highest interest debts first',
        'Review your budget for areas to save',
        'Consider debt consolidation options'
      ];
    } else if (dtiRatio > 0) {
      severity = 'Manageable';
      actions = [
        'Create a repayment strategy',
        'Build an emergency fund',
        'Monitor spending carefully',
        'Avoid taking on new debt'
      ];
    } else {
      severity = 'N/A';
      actions = [
        'Build an emergency fund',
        'Start planning for future financial goals',
        'Consider seeking advice on savings and investments'
      ];
    }
    
    // Set state values for display
    setDebtToIncomeRatio(dtiRatio);
    setAvailableForDebtPayment(availableForDebt);
    setDebtFreeTime(timeEstimate);
    setDebtSeverity(severity);
    setPriorityActions(actions);
    setShowResults(true);
  };

  // Reset the debt calculator form and results
  const handleReset = () => {
    debtForm.reset();
    setShowResults(false);
    setDebtToIncomeRatio(0);
    setAvailableForDebtPayment(0);
    setDebtFreeTime('');
    setDebtSeverity('');
    setPriorityActions([]);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>Debt Advice Tool | {SITE_NAME}</title>
        <meta name="description" content="Free debt advice and budgeting tools to help you manage your finances and get back on track." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Debt Advice Tool</h1>
        
        <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="calculator">
              <Calculator className="h-4 w-4 mr-2" />
              Debt Calculator
            </TabsTrigger>
            <TabsTrigger value="advice">
              <HelpCircle className="h-4 w-4 mr-2" />
              Debt Advice
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Banknote className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          {/* Debt Calculator Tab */}
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>Debt Assessment Calculator</CardTitle>
                <CardDescription>
                  Use our free calculator to assess your current debt situation and get personalised advice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Confidential Assessment</AlertTitle>
                  <AlertDescription>
                    This calculator is for your personal assessment only. Your information is not saved or shared.
                  </AlertDescription>
                </Alert>
                
                {!showResults ? (
                  <Form {...debtForm}>
                    <form onSubmit={debtForm.handleSubmit(onDebtSubmit)} className="space-y-6">
                      {/* Income Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Income</h3>
                        <FormField
                          control={debtForm.control}
                          name="monthlyIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Monthly Income (£)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                              </FormControl>
                              <FormDescription>
                                After tax, including benefits and other sources
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      {/* Essential Expenses Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Essential Monthly Expenses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={debtForm.control}
                            name="housingCosts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Housing Costs (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Rent/mortgage, council tax
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="utilityCosts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Utilities (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Energy, water, broadband
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="foodCosts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Food & Groceries (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="transportCosts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Transport (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Fuel, public transport, car costs
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="otherEssentials"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Other Essential Costs (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Phone, insurance, childcare, medicine, etc.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Debts Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Debts (Total Outstanding Amount)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={debtForm.control}
                            name="creditCardDebt"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Credit Cards (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="personalLoans"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Personal Loans (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="storeCardDebt"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Store Cards/Catalogues (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="overdraftAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Overdrafts (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={debtForm.control}
                            name="otherDebts"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Other Debts (£)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Payday loans, family loans, arrears, etc.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline" onClick={handleReset}>
                          Reset
                        </Button>
                        <Button type="submit">
                          Calculate
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-primary mb-4">Your Debt Assessment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                          <p className="text-sm text-gray-500">Debt-to-Income Ratio:</p>
                          <p className="text-2xl font-bold">{debtToIncomeRatio.toFixed(2)}x</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Severity: <span className="font-medium">{debtSeverity}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Available for Debt Repayment:</p>
                          <p className="text-2xl font-bold">£{availableForDebtPayment.toFixed(2)}/month</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Estimated time to become debt-free:</p>
                          <p className="text-xl font-semibold mt-1">{debtFreeTime}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Recommended Actions:</h3>
                      <ul className="space-y-2">
                        {priorityActions.map((action, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary font-bold mr-2">{index + 1}.</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="text-lg font-bold mb-2">Next Steps</h3>
                      <p className="mb-4">
                        This is just an initial assessment. For comprehensive debt advice tailored to your situation:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => window.location.href = '/contact'}
                        >
                          Book a Free Debt Advice Session
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                        >
                          New Calculation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Debt Advice Tab */}
          <TabsContent value="advice">
            <Card>
              <CardHeader>
                <CardTitle>Debt Management Advice</CardTitle>
                <CardDescription>
                  Strategies for managing and reducing your debts effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Understanding Your Debt</h3>
                  <p>
                    Before you can tackle your debt, it's essential to understand the different types of debt you might have:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Priority Debts</h4>
                      <p className="text-sm mb-2">
                        These have serious consequences if not paid and should be addressed first:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Mortgage or rent arrears</li>
                        <li>Council Tax arrears</li>
                        <li>Gas and electricity arrears</li>
                        <li>Court fines</li>
                        <li>TV Licence</li>
                        <li>Child maintenance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Non-Priority Debts</h4>
                      <p className="text-sm mb-2">
                        These still need to be paid, but consequences of non-payment are less severe:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Credit card debts</li>
                        <li>Store cards</li>
                        <li>Unsecured personal loans</li>
                        <li>Overdrafts</li>
                        <li>Water bills</li>
                        <li>Friends and family loans</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Effective Debt Repayment Strategies</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Snowball Method</h4>
                      <p className="text-sm">
                        Pay minimum payments on all debts, then put extra money toward your smallest debt first. 
                        Once that's paid off, add that payment to the next smallest debt, and so on.
                      </p>
                      <p className="text-sm mt-2 italic">
                        <span className="font-semibold">Best for:</span> Those who need motivation from quick wins.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Avalanche Method</h4>
                      <p className="text-sm">
                        Pay minimum payments on all debts, then put extra money toward the debt with the highest interest rate first. 
                        Once that's paid off, move to the next highest interest rate debt.
                      </p>
                      <p className="text-sm mt-2 italic">
                        <span className="font-semibold">Best for:</span> Those who want to minimize interest costs and pay less overall.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Debt Consolidation</h4>
                      <p className="text-sm">
                        Combine multiple debts into a single loan with a lower interest rate. This can simplify payments 
                        and potentially reduce the total amount of interest paid.
                      </p>
                      <p className="text-sm mt-2 italic">
                        <span className="font-semibold">Best for:</span> Those with good credit who can qualify for a lower interest rate.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">When to Seek Help</h3>
                  <p>
                    Consider seeking professional debt advice if you're experiencing any of the following:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You can't make your minimum payments</li>
                    <li>You're using credit to pay for essentials like food</li>
                    <li>You're getting calls or letters from creditors</li>
                    <li>You're not sure which debts to prioritize</li>
                    <li>You're considering borrowing more to pay existing debts</li>
                    <li>Your debts are causing stress, anxiety or affecting your health</li>
                  </ul>
                  
                  <div className="mt-6">
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Get Free Debt Advice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
                <CardDescription>
                  Tools, guides and organisations that can help you manage your debts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Debt Solutions</h3>
                  <p>
                    Depending on your circumstances, these formal solutions might help:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Debt Management Plan (DMP)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          An informal agreement where you make affordable monthly payments to your debts. 
                          A debt management company negotiates with creditors on your behalf.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <a 
                          href="https://www.moneyhelper.org.uk/en/debt-and-borrowing/debt-solutions/debt-management-plans" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Learn more on MoneyHelper
                        </a>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Debt Relief Order (DRO)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Freezes your debts for 12 months, after which they're written off if your situation hasn't improved. 
                          For those with debts under £30,000, low income and few assets.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <a 
                          href="https://www.gov.uk/government/publications/getting-a-debt-relief-order/getting-a-debt-relief-order" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Learn more on GOV.UK
                        </a>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Individual Voluntary Arrangement (IVA)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          A legally binding agreement between you and your creditors to pay all or part of your debts. 
                          You make regular payments to an insolvency practitioner who divides it between creditors.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <a 
                          href="https://www.gov.uk/options-for-paying-off-your-debts/individual-voluntary-arrangements" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Learn more on GOV.UK
                        </a>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Bankruptcy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          A court order that can write off most debts you can't pay. It's usually a last resort, 
                          and assets may be sold to pay off debts. Has serious implications and costs £680 to apply.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <a 
                          href="https://www.gov.uk/bankruptcy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Learn more on GOV.UK
                        </a>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Useful Organizations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">StepChange Debt Charity</h4>
                      <p className="text-sm mb-2">
                        Expert debt advice and fee-free debt management plans.
                      </p>
                      <a 
                        href="https://www.stepchange.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        www.stepchange.org
                      </a>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">National Debtline</h4>
                      <p className="text-sm mb-2">
                        Free, independent debt advice over the phone or online.
                      </p>
                      <a 
                        href="https://www.nationaldebtline.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        www.nationaldebtline.org
                      </a>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Citizens Advice</h4>
                      <p className="text-sm mb-2">
                        Free, confidential advice on dealing with debt problems.
                      </p>
                      <a 
                        href="https://www.citizensadvice.org.uk/debt-and-money/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        www.citizensadvice.org.uk
                      </a>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">Money Helper</h4>
                      <p className="text-sm mb-2">
                        Government service providing free and impartial money advice.
                      </p>
                      <a 
                        href="https://www.moneyhelper.org.uk/en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        www.moneyhelper.org.uk
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-bold mb-2">Get Personalised Help</h3>
                  <p className="mb-4">
                    Remember that you don't have to face debt problems alone. Our advisors can provide free, 
                    confidential advice tailored to your specific situation.
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Book a Free Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">About Our Debt Advice Service</h2>
          <p className="mb-4">
            Our debt advice service is free, confidential, and impartial. Our trained advisors can help you:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Work out which debts to prioritize</li>
            <li>Create a realistic budget and repayment plan</li>
            <li>Negotiate with creditors on your behalf</li>
            <li>Explore the debt solutions that might be right for you</li>
            <li>Support you throughout your journey to becoming debt-free</li>
          </ul>
          <p>
            No matter how serious your debt problem may seem, there's always a solution. The sooner you seek advice, 
            the more options you'll have available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DebtAdvice;