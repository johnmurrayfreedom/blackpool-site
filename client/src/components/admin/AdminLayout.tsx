import { useState } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { LogOut, Home, Users, MessageSquare, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import AdminGuard from './AdminGuard';
import { SITE_NAME } from '@/lib/constants';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const [isOnDashboard] = useRoute('/admin/dashboard');
  
  const handleLogout = async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST'
      });
      
      // Clear all queries from the cache to prevent stale data when logging back in
      queryClient.clear();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/admin/dashboard" className="text-primary font-bold text-xl">
                  {SITE_NAME} Admin
                </Link>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/" className="text-gray-600 hover:text-primary">
                  <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    View Website
                  </Button>
                </Link>
                
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="px-3 py-2 rounded hover:bg-gray-100">
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    View Website
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-left rounded hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            
            {/* If we're on the dashboard, show navigation buttons to different sections */}
            {isOnDashboard && (
              <div className="hidden md:flex space-x-2">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Submissions
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Inquiries
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            )}
          </div>
          
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}