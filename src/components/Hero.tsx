
import { ArrowDown } from 'lucide-react';
import { useInView } from './ui/motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { ref, isInView } = useInView();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-blue-100 overflow-hidden"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {/* Light blue background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-adhirachna-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-spin"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-adhirachna-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-spin animation-delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-adhirachna-darkblue mb-6">
            Building the <span className="text-adhirachna-green">Future</span> Together
          </h1>
          <p className="text-xl md:text-2xl text-adhirachna-darkblue/80 max-w-3xl mx-auto mb-12">
            Specialized in Architectural Engineering, Management Consulting, and Technical Services since 2023.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-adhirachna-green hover:bg-adhirachna-darkgreen text-white h-10 px-4 py-2">
              Our Services
            </Link>
            <Link to="/projects" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/50 text-adhirachna-darkblue border border-adhirachna-darkblue hover:bg-white/70 h-10 px-4 py-2">
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-adhirachna-darkblue animate-bounce">
        <ArrowDown className="h-6 w-6" />
      </div>
    </section>
  );
};

export default Hero;
