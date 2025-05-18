import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";

interface AuthStatusResponse {
  authenticated: boolean;
  user?: {
    id: number;
    username: string;
    isAdmin: boolean;
  };
}

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Check if user is authenticated and is admin
  const { data: authStatus, isLoading } = useQuery<AuthStatusResponse>({
    queryKey: ['/api/auth/status'],
    retry: false,
    refetchOnWindowFocus: true
  });

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!authStatus?.authenticated || !authStatus?.user?.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You must be logged in as an admin to view this page",
        variant: "destructive"
      });
      navigate('/admin/login');
    }
  }, [authStatus, isLoading, navigate, toast]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, nothing will be shown (redirect effect will trigger)
  if (!authStatus?.authenticated || !authStatus?.user?.isAdmin) {
    return null;
  }

  // If authenticated as admin, render children
  return <>{children}</>;
}