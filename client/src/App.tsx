import { Switch, Route } from "wouter";
import { TooltipProvider } from "./components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useScrollTop } from "./hooks/use-scroll-top";
import GoogleTagManager from "./components/analytics/GoogleTagManager";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import HealthDisability from "./pages/services/health-disability";
import ElderlySupport from "./pages/services/elderly-support";
import FamilySupport from "./pages/services/family-support";
import EducationTraining from "./pages/services/education-training";
import DebtSupport from "./pages/services/debt-support";
import BusinessSupport from "./pages/services/business-support";
import About from "./pages/about";
import News from "./pages/news";
import Article from "./pages/article";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import Accessibility from "./pages/accessibility";
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Resource pages
import BenefitsCalculator from "./pages/resources/benefits-calculator";
import DebtAdvice from "./pages/resources/debt-advice";
import GrantFinder from "./pages/resources/grant-finder";
import FactSheets from "./pages/resources/fact-sheets";
import ServiceMap from "./pages/resources/service-map";

function Router() {
  // Track page views on route changes
  useAnalytics();
  
  // Scroll to top on route changes
  useScrollTop();
  
  return (
    <>
      <Switch>
        {/* Admin routes (without header/footer) */}
        <Route path="/admin/login">
          <AdminLogin />
        </Route>
        <Route path="/admin/dashboard">
          <AdminDashboard />
        </Route>
        
        {/* Public routes (with header/footer) */}
        <Route path="*">
          <>
            <Header />
            <main>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/services/health-disability" component={HealthDisability} />
                <Route path="/services/elderly-support" component={ElderlySupport} />
                <Route path="/services/family-support" component={FamilySupport} />
                <Route path="/services/education-training" component={EducationTraining} />
                <Route path="/services/debt-support" component={DebtSupport} />
                <Route path="/services/business-support" component={BusinessSupport} />
                <Route path="/about" component={About} />
                <Route path="/news" component={News} />
                <Route path="/news/:slug" component={Article} />
                <Route path="/contact" component={Contact} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms-of-service" component={TermsOfService} />
                <Route path="/accessibility" component={Accessibility} />
                
                {/* Resource routes */}
                <Route path="/resources/benefits-calculator" component={BenefitsCalculator} />
                <Route path="/resources/debt-advice" component={DebtAdvice} />
                <Route path="/resources/grant-finder" component={GrantFinder} />
                <Route path="/resources/fact-sheets" component={FactSheets} />
                <Route path="/resources/service-map" component={ServiceMap} />
                
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <TooltipProvider>
      <GoogleTagManager />
      <Router />
    </TooltipProvider>
  );
}

export default App;
