import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the email to your newsletter service or CRM
    console.log('Newsletter signup:', email);
    // For demo purposes, just show success state
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {submitted ? (
        <div className="text-center">
          <FontAwesomeIcon icon="check-circle" className="text-green-500 text-3xl mb-2" />
          <h3 className="text-lg font-bold mb-2">Thank You for Subscribing!</h3>
          <p className="text-gray-600">You'll now receive our latest news and updates directly to your inbox.</p>
          <Button 
            variant="link" 
            className="mt-3"
            onClick={() => setSubmitted(false)}
          >
            Subscribe another email
          </Button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-4">
            Stay updated with our latest news, grants, and support services. We promise not to spam your inbox!
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            By subscribing, you agree to receive email newsletters from us. You can unsubscribe at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default NewsletterSignup;