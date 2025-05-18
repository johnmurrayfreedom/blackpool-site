import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { SITE_NAME, newsItems } from '@/lib/constants';
import { allNewsArticles } from '@/lib/articles';
import { topicalArticles } from '@/lib/topicalArticles';

const News = () => {
  const allNewsItems = [
    ...newsItems,
    {
      id: 4,
      title: "Energy Support Scheme Applications Now Open",
      date: "April 20, 2025",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Home with solar panels",
      excerpt: "Local residents can now apply for support with energy costs through the new Energy Support Scheme launching across Blackpool, Fylde & Wyre."
    },
    {
      id: 5,
      title: "New Mental Health Support Service Launches",
      date: "April 15, 2025",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Support group meeting",
      excerpt: "A new mental health support service has been launched to provide free counselling and guidance to residents across the region."
    },
    {
      id: 6,
      title: "Community Volunteering Opportunities Available",
      date: "April 5, 2025",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Community volunteers working together",
      excerpt: "Join our team of community volunteers and help make a difference to people's lives across Blackpool, Fylde & Wyre."
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>News & Updates | {SITE_NAME}</title>
        <meta name="description" content="Stay informed about the latest support schemes, grants and community news from the Citizens Information & Advice Bureau serving Blackpool, Fylde & Wyre." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blackpooladvice.org/news" />
        <meta property="og:title" content={`News & Updates | ${SITE_NAME}`} />
        <meta property="og:description" content="Stay informed about the latest support schemes, grants and community news from the Citizens Information & Advice Bureau serving Blackpool, Fylde & Wyre." />
        <meta property="og:image" content="https://blackpooladvice.org/social-preview.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blackpooladvice.org/news" />
        <meta property="twitter:title" content={`News & Updates | ${SITE_NAME}`} />
        <meta property="twitter:description" content="Stay informed about the latest support schemes, grants and community news from the Citizens Information & Advice Bureau serving Blackpool, Fylde & Wyre." />
        <meta property="twitter:image" content="https://blackpooladvice.org/social-preview.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="keywords" content="Blackpool news, community updates, grants, support schemes, Fylde news, Wyre advice, cost of living, local support" />
        <link rel="canonical" href="https://blackpooladvice.org/news" />
      </Helmet>
      
      {/* Hero section */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              Latest Updates
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              News & Announcements
            </h1>
            <p className="text-lg md:text-xl">
              Stay informed about the latest support schemes, grants, and community news from across Blackpool, Fylde & Wyre.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured News */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Featured Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img 
                src={allNewsItems[0].image} 
                alt={allNewsItems[0].imageAlt} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-gray-700">{allNewsItems[0].date}</span>
                <h3 className="text-2xl font-bold text-primary my-2">{allNewsItems[0].title}</h3>
                <p className="text-gray-700 mb-4">{allNewsItems[0].excerpt}</p>
                <p className="text-gray-700 mb-6">
                  The government has announced a new comprehensive package of support measures aimed at helping households struggling with rising costs. The package includes direct payments to vulnerable households, expanded eligibility for existing support schemes, and new funding for local authorities to provide targeted assistance.
                </p>
                <p className="text-gray-700 mb-6">
                  Our advisors are ready to help residents understand what they might be eligible for and assist with applications. Contact us to check your eligibility and get support with the application process.
                </p>
                <Button 
                  className="text-primary"
                  variant="link"
                  asChild
                >
                  <Link href={`/news/${allNewsItems[0].id}`}>
                    Read full article
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img 
                src={allNewsItems[1].image} 
                alt={allNewsItems[1].imageAlt} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-gray-700">{allNewsItems[1].date}</span>
                <h3 className="text-2xl font-bold text-primary my-2">{allNewsItems[1].title}</h3>
                <p className="text-gray-700 mb-4">{allNewsItems[1].excerpt}</p>
                <p className="text-gray-700 mb-6">
                  In partnership with local community centers, we're launching a series of free workshops to help residents improve their digital skills. The workshops will cover essential skills like using email, online shopping, accessing government services online, and staying safe on the internet.
                </p>
                <p className="text-gray-700 mb-6">
                  The workshops are open to all ages and abilities, with special sessions dedicated to seniors and those with limited digital experience. All equipment will be provided, and no prior knowledge is required.
                </p>
                <Button 
                  className="text-primary"
                  variant="link"
                  asChild
                >
                  <Link href={`/news/${allNewsItems[1].id}`}>
                    Read full article
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Recent News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allNewsItems.slice(2).map((item) => (
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
                  <Button 
                    className="text-primary"
                    variant="link"
                    asChild
                  >
                    <Link href={`/news/${item.id}`}>
                      Read more
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comprehensive Guides Section */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Comprehensive Guides</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl">
              Our in-depth guides provide detailed information on key topics to help you navigate important services and support available in Blackpool, Fylde, and Wyre.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topicalArticles.map((article) => (
                <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
                  <img 
                    src={article.image} 
                    alt={article.imageAlt} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                        {article.category}
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">{article.title}</h3>
                      <p className="text-gray-700 mb-4">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-600">{article.readTime} min read</span>
                      <Button 
                        className="text-primary"
                        variant="link"
                        asChild
                      >
                        <Link href={`/news/${article.id}`}>
                          Read full guide
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-700 mb-8">
              Subscribe to our newsletter to receive the latest news about grants, support schemes, and community events directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <Button 
                type="submit"
                className="bg-primary text-white hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
