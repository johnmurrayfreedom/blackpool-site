import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { testimonials } from '@/lib/constants';

const Testimonials = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">SUCCESS STORIES</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hear from people we've helped across Blackpool, Fylde & Wyre.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg mr-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon="star" />
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center font-bold">
                  {testimonial.initials}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-700">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
