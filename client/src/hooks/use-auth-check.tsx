import { useState, useCallback } from 'react';
import UserRegistrationModal from '@/components/auth/UserRegistrationModal';

/**
 * Hook that helps enforce user registration before accessing protected tools
 * @param toolName The name of the tool being accessed (displayed in the registration modal)
 * @returns Object containing functions and state to handle authentication flow
 */
export function useAuthCheck(toolName: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check local storage for existing user session
  useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.email) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user info from localStorage', error);
        localStorage.removeItem('userInfo');
      }
    }
  });
  
  // Function to check if user is authenticated before allowing access to a tool
  const checkAuth = useCallback(() => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return false;
    }
    return true;
  }, [isAuthenticated]);
  
  // Handle successful authentication
  const handleAuthSuccess = useCallback((userData: any) => {
    setIsAuthenticated(true);
    setIsModalOpen(false);
    
    // Store user data in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userData));
  }, []);
  
  return {
    isAuthenticated,
    checkAuth,
    isModalOpen,
    setIsModalOpen,
    handleAuthSuccess,
    AuthModal: (
      <UserRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
        toolName={toolName}
      />
    ),
  };
}