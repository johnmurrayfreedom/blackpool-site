import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import { allNewsArticles } from '@/lib/articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Create a newsletter signup component if it doesn't exist yet
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically send the email to your newsletter service
    console.log('Newsletter signup:', email);
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

export default function NewsArticle() {
  const [, params] = useRoute('/news/:id');
  const articleId = params?.id ? parseInt(params.id) : null;
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  
  useEffect(() => {
    if (articleId) {
      // Find the article in our enhanced articles database
      const foundArticle = allNewsArticles.find(a => a.id === articleId);
      
      if (foundArticle) {
        setArticle(foundArticle);
        
        // Find related articles based on tags/keywords
        const related = allNewsArticles
          .filter(a => a.id !== articleId && a.tags.some(tag => foundArticle.tags.includes(tag)))
          .slice(0, 3);
        
        setRelatedArticles(related);
      }
    }
  }, [articleId]);
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | {SITE_NAME}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} | ${SITE_NAME}`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:author" content={SITE_NAME} />
        {article.tags.map((tag: string) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>
      
      {/* Hero section with image */}
      <div className="w-full h-80 md:h-96 relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={article.image} 
          alt={article.imageAlt} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center p-4">
          <div className="max-w-3xl">
            <div className="inline-block mb-3 bg-primary px-3 py-1 rounded-full text-sm font-medium text-white">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              {article.title}
            </h1>
            <div className="text-white/90 flex items-center justify-center space-x-4">
              <span>{article.date}</span>
              <span className="w-1 h-1 bg-white/90 rounded-full"></span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Main content */}
          <div className="prose prose-lg max-w-none">
            {article.content.map((section: any, index: number) => {
              if (section.type === 'paragraph') {
                return (
                  <p key={index} className="mb-6">
                    {section.content}
                  </p>
                );
              } else if (section.type === 'heading') {
                return (
                  <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">
                    {section.content}
                  </h2>
                );
              } else if (section.type === 'list') {
                return (
                  <ul key={index} className="mb-6 list-disc pl-6 space-y-2">
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                );
              } else if (section.type === 'callout') {
                return (
                  <div 
                    key={index} 
                    className="bg-primary/10 border-l-4 border-primary p-4 my-6 rounded-r"
                  >
                    <p className="font-medium text-primary">{section.title}</p>
                    <p className="mt-2">{section.content}</p>
                  </div>
                );
              } else if (section.type === 'cta') {
                return (
                  <div key={index} className="bg-primary text-white p-6 rounded-lg my-8 text-center">
                    <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                    <p className="mb-4">{section.content}</p>
                    <Button 
                      className="bg-white text-primary hover:bg-gray-100"
                      asChild
                    >
                      <Link href={section.buttonLink}>
                        {section.buttonText}
                      </Link>
                    </Button>
                  </div>
                );
              } else if (section.type === 'quote') {
                return (
                  <blockquote 
                    key={index} 
                    className="border-l-4 border-primary pl-4 italic my-6"
                  >
                    <p>{section.content}</p>
                    {section.author && (
                      <footer className="text-gray-600 mt-2">— {section.author}</footer>
                    )}
                  </blockquote>
                );
              } else if (section.type === 'image') {
                return (
                  <figure key={index} className="my-8">
                    <img 
                      src={section.src} 
                      alt={section.alt} 
                      className="w-full rounded-lg" 
                    />
                    {section.caption && (
                      <figcaption className="text-center text-gray-600 mt-2">
                        {section.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}
          </div>
          
          {/* Author info */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img 
                  src={article.author.avatar || 'https://via.placeholder.com/100'} 
                  alt={article.author.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-gray-600">{article.author.title}</p>
              </div>
            </div>
          </div>
          
          {/* Share buttons */}
          <div className="border-t border-gray-200 py-8 mt-8">
            <p className="font-medium mb-4">Share this article</p>
            <div className="flex space-x-4">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                aria-label="Share on Facebook"
              >
                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                aria-label="Share on Twitter"
              >
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.excerpt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A66C2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                aria-label="Share on LinkedIn"
              >
                <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
              </a>
              <a 
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`I thought you might be interested in this article: ${window.location.href}`)}`}
                className="bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                aria-label="Share via Email"
              >
                <FontAwesomeIcon icon="envelope" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter signup */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Stay Updated with Our Newsletter
            </h2>
            <NewsletterSignup />
          </div>
        </div>
      </section>
      
      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary mb-8">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div 
                  key={relatedArticle.id} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.imageAlt} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-sm text-gray-700">{relatedArticle.date}</span>
                    <h3 className="text-xl font-bold text-primary my-2">{relatedArticle.title}</h3>
                    <p className="text-gray-700 mb-4">{relatedArticle.excerpt}</p>
                    <Button 
                      variant="link"
                      className="text-primary p-0"
                      asChild
                    >
                      <Link href={`/news/${relatedArticle.id}`}>
                        Read more
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Get help CTA */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help or Advice?
            </h2>
            <p className="text-lg mb-8">
              Our advisors are ready to assist you with any questions about {article.tags.slice(0, 3).join(', ')}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-white text-primary hover:bg-gray-100"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <a href={`tel:${CONTACT_INFO.phone}`}>
                  <FontAwesomeIcon icon="phone" className="mr-2" />
                  Call {CONTACT_INFO.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}