
import { useInView } from './ui/motion';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const { ref, isInView } = useInView();
  const { ref: refValues, isInView: isValuesInView } = useInView();

  return (
    <section id="about" className="py-24 bg-white" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative">
              <div className="bg-adhirachna-blue h-80 w-80 rounded-xl absolute -top-4 -left-4 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Engineering team" 
                className="w-full h-auto rounded-xl shadow-lg relative z-10"
              />
              <div className="glass-card p-6 absolute -bottom-10 -right-10 z-20 max-w-xs">
                <div className="text-4xl font-bold text-adhirachna-blue">15+</div>
                <div className="text-adhirachna-darkblue font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-1000 delay-300 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-adhirachna-darkblue">
              About Adhirachna Engineering Solutions
            </h2>
            <p className="text-adhirachna-gray mb-6">
              Adhirachna Engineering Solutions is a leading infrastructure development and engineering consultancy committed to delivering exceptional quality and innovative solutions across a wide range of projects.
            </p>
            <p className="text-adhirachna-gray mb-8">
              With over 15 years of industry experience, our team of expert engineers, designers, and consultants work collaboratively to bring your infrastructure projects to life, ensuring sustainable development and optimal performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                'Quality Excellence',
                'Innovative Solutions',
                'Sustainable Practices',
                'Timely Delivery',
                'Expert Consultation',
                'Client Satisfaction'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-adhirachna-blue mr-2" />
                  <span className="text-adhirachna-darkblue">{item}</span>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="btn-primary">
              Work With Us
            </a>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-32" ref={refValues as React.RefObject<HTMLDivElement>}>
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            These core values guide our approach to every project and relationship we build.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We are committed to delivering the highest quality in every aspect of our work, exceeding expectations and industry standards.',
                icon: '🌟',
              },
              {
                title: 'Innovation',
                description: 'We embrace creative thinking and cutting-edge solutions to address complex engineering challenges effectively.',
                icon: '💡',
              },
              {
                title: 'Integrity',
                description: 'We operate with transparency, honesty, and ethical standards in all our business dealings and relationships.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`glass-card p-8 text-center transition-all duration-700 delay-${index * 200} ${
                  isValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-adhirachna-darkblue">
                  {value.title}
                </h3>
                <p className="text-adhirachna-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
