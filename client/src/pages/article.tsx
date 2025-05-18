import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME } from '@/lib/constants';
import { allNewsArticles } from '@/lib/articles';
import { topicalArticles } from '@/lib/topicalArticles';
import { trackEvent } from '@/lib/analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialShareButtons from '@/components/articles/SocialShareButtons';

const ArticlePage = () => {
  const [, params] = useRoute('/news/:slug');
  const slug = params?.slug;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Check if it's a numeric ID or a string slug
      const isNumeric = /^\d+$/.test(slug);
      
      let foundArticle;
      if (isNumeric) {
        const id = parseInt(slug);
        foundArticle = allNewsArticles.find(a => a.id === id) || topicalArticles.find(a => a.id === id);
      } else {
        foundArticle = allNewsArticles.find(a => a.slug === slug) || topicalArticles.find(a => a.slug === slug);
      }
      
      if (foundArticle) {
        setArticle(foundArticle);
        // Track article view
        trackEvent('article_view', 'content', foundArticle.title);
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-primary animate-spin">
            <FontAwesomeIcon icon="circle-notch" size="3x" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">We couldn't find the article you're looking for.</p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/news">Return to News</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Function to render content based on its type
  const renderContent = (contentItem: any, index: number) => {
    switch (contentItem.type) {
      case 'paragraph':
        return <p key={index} className="text-gray-700 mb-6">{contentItem.content}</p>;
      case 'heading':
        return <h3 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">{contentItem.content}</h3>;
      case 'subheading':
        return <h4 key={index} className="text-xl font-semibold text-primary mt-6 mb-3">{contentItem.content}</h4>;
      case 'list':
        return (
          <ul key={index} className="list-disc pl-6 space-y-2 mb-6">
            {contentItem.items.map((item: string, i: number) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
      case 'callout':
        return (
          <div key={index} className="bg-primary/10 border-l-4 border-primary p-4 mb-6">
            {contentItem.title && <h4 className="font-bold text-primary mb-2">{contentItem.title}</h4>}
            <p className="text-gray-700">{contentItem.content}</p>
          </div>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-6">
            <p className="mb-2">{contentItem.content}</p>
            {contentItem.author && <cite className="text-sm">— {contentItem.author}</cite>}
          </blockquote>
        );
      case 'image':
        return (
          <figure key={index} className="mb-6">
            <img 
              src={contentItem.src} 
              alt={contentItem.alt} 
              className="w-full rounded-lg"
            />
            {contentItem.caption && (
              <figcaption className="text-sm text-gray-500 mt-2 text-center">{contentItem.caption}</figcaption>
            )}
          </figure>
        );
      case 'cta':
        return (
          <div key={index} className="bg-gray-100 p-6 rounded-lg mb-8">
            {contentItem.title && <h4 className="text-xl font-bold text-primary mb-2">{contentItem.title}</h4>}
            <p className="text-gray-700 mb-4">{contentItem.content}</p>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open(contentItem.buttonLink, "_blank")}
            >
              {contentItem.buttonText}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const relatedArticles = allNewsArticles
    .concat(topicalArticles)
    .filter(a => a.id !== article.id)
    .filter(a => a.tags && article.tags && a.tags.some((tag: string) => article.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{article.title} | {SITE_NAME}</title>
        <meta name="description" content={article.excerpt} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={`https://blackpooladvice.org/news/${article.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:section" content={article.category} />
        {article.tags && article.tags.map((tag: string) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        
        {/* Additional SEO tags */}
        <meta name="keywords" content={article.tags ? article.tags.join(', ') : ''} />
        <link rel="canonical" href={`https://blackpooladvice.org/news/${article.id}`} />
      </Helmet>
      
      {/* Article Hero */}
      <section className="bg-primary text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {article.category && (
              <div className="inline-block mb-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex items-center text-sm mt-4">
              <div className="flex items-center">
                {article.author && (
                  <>
                    <img 
                      src={article.author.avatar} 
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{article.author.name}</p>
                      <p className="text-white/70">{article.author.title}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="ml-auto flex items-center">
                <span className="mr-2">
                  <FontAwesomeIcon icon="calendar" />
                </span>
                <span className="mr-6">{article.date}</span>
                <span className="mr-2">
                  <FontAwesomeIcon icon="clock" />
                </span>
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img 
                src={article.image} 
                alt={article.imageAlt} 
                className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-6"
              />
              
              {/* Social Share Buttons */}
              <div className="flex justify-between items-center mb-8">
                <SocialShareButtons 
                  url={`https://blackpooladvice.org/news/${article.id}`} 
                  title={article.title}
                  description={article.excerpt}
                />
                <div className="text-sm text-gray-500">
                  <span className="mr-2">
                    <FontAwesomeIcon icon="eye" className="mr-1" />
                    {Math.floor(Math.random() * 100) + 50} views
                  </span>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                {article.content && article.content.map(renderContent)}
              </div>
              
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="text-lg font-bold mb-3">Related Topics</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag: string) => (
                      <Link href={`/news/tag/${tag}`} key={tag}>
                        <span className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
                          #{tag.replace(/-/g, ' ')}
                        </span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Social Share Buttons (at the end of article) */}
                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h4 className="text-base font-semibold mb-3">Found this helpful? Share with others</h4>
                    <SocialShareButtons 
                      url={`https://blackpooladvice.org/news/${article.id}`} 
                      title={article.title}
                      description={article.excerpt}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-primary mb-4">Need Help?</h3>
                <p className="text-gray-700 mb-4">
                  Our advisors can provide personalised guidance on this topic and help you access the support you need.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.open("https://api.gohighlevel.uk/widget/booking/s2PtVdEMTKFWXNPEaRNI", "_blank")}
                  >
                    Book an Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-primary text-white p-4">
                    <h3 className="font-bold text-lg">Related Articles</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {relatedArticles.map((relatedArticle) => (
                      <div key={relatedArticle.id} className="p-4">
                        <Link href={`/news/${relatedArticle.id}`}>
                          <div className="block hover:opacity-80">
                            <div className="text-sm text-gray-600 mb-1">{relatedArticle.category}</div>
                            <h4 className="font-bold text-primary mb-1">{relatedArticle.title}</h4>
                            <p className="text-sm text-gray-700">{relatedArticle.excerpt.substring(0, 100)}...</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticlePage;