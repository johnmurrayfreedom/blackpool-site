import { Helmet } from 'react-helmet';
import { SITE_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

export default function ErrorPage({
  statusCode = 500,
  title = "Something went wrong",
  message = "We're sorry, but we're having trouble processing your request right now. Please try again in a few moments."
}: ErrorPageProps) {
  return (
    <div className="container mx-auto py-16 px-4">
      <Helmet>
        <title>Error {statusCode} | {SITE_NAME}</title>
      </Helmet>

      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">
            {statusCode}
          </h1>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>
            If you continue to experience issues, please contact our support team at{' '}
            <a href="mailto:help@blackpooladvice.org" className="text-primary hover:underline">
              help@blackpooladvice.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}