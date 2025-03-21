
import { ArrowDown } from 'lucide-react';
import { useInView } from './ui/motion';

const Hero = () => {
  const { ref, isInView } = useInView();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-adhirachna-darkblue overflow-hidden"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-adhirachna-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-spin"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-adhirachna-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-spin animation-delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Building the <span className="text-adhirachna-blue">Future</span> Together
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12">
            Innovative engineering solutions for infrastructure development, delivering excellence in every project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="btn-primary">
              Our Services
            </a>
            <a href="#projects" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
              View Projects
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ArrowDown className="h-6 w-6" />
      </div>
    </section>
  );
};

export default Hero;
