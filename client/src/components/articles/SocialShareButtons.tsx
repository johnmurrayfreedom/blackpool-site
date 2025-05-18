import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const SocialShareButtons = ({ url, title, description, className = '' }: SocialShareButtonsProps) => {
  // Prepare sharing URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';
  
  // Share functions
  const shareOnFacebook = () => {
    trackEvent('social_share', 'article', 'facebook');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };
  
  const shareOnTwitter = () => {
    trackEvent('social_share', 'article', 'twitter');
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    trackEvent('social_share', 'article', 'linkedin');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };
  
  const shareByEmail = () => {
    trackEvent('social_share', 'article', 'email');
    window.open(`mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`, '_blank');
  };
  
  const shareOnWhatsApp = () => {
    trackEvent('social_share', 'article', 'whatsapp');
    window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, '_blank');
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="rounded-full w-8 h-8 p-0 flex items-center justify-center" 
        onClick={shareOnFacebook}
        aria-label="Share on Facebook"
      >
        <FontAwesomeIcon icon={['fab', 'facebook-f']} className="h-4 w-4 text-[#1877F2]" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="rounded-full w-8 h-8 p-0 flex items-center justify-center" 
        onClick={shareOnTwitter}
        aria-label="Share on Twitter"
      >
        <FontAwesomeIcon icon={['fab', 'twitter']} className="h-4 w-4 text-[#1DA1F2]" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="rounded-full w-8 h-8 p-0 flex items-center justify-center" 
        onClick={shareOnLinkedIn}
        aria-label="Share on LinkedIn"
      >
        <FontAwesomeIcon icon={['fab', 'linkedin-in']} className="h-4 w-4 text-[#0A66C2]" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="rounded-full w-8 h-8 p-0 flex items-center justify-center" 
        onClick={shareOnWhatsApp}
        aria-label="Share on WhatsApp"
      >
        <FontAwesomeIcon icon={['fab', 'whatsapp']} className="h-4 w-4 text-[#25D366]" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="rounded-full w-8 h-8 p-0 flex items-center justify-center" 
        onClick={shareByEmail}
        aria-label="Share by Email"
      >
        <FontAwesomeIcon icon="envelope" className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
};

export default SocialShareButtons;