import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { newsItems } from '@/lib/constants';

const NewsUpdates = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">NEWS & UPDATES</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Stay informed about the latest support schemes and community news.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img 
                src={item.image} 
                alt={item.imageAlt} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-gray-700">{item.date}</span>
                <h3 className="text-xl font-bold text-primary my-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.excerpt}</p>
                <Link href={`/news/${item.id}`} className="text-primary font-medium hover:underline focus-visible">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/5"
            asChild
          >
            <Link href="/news">
              View all news
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
