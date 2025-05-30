import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-adhirachna-blue to-adhirachna-darkblue text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Building Digital Excellence
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We create innovative web solutions that drive your business forward with cutting-edge technology and exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center px-8 py-3 bg-adhirachna-green text-white rounded-lg font-semibold hover:bg-adhirachna-green/90 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="/projects" 
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-adhirachna-blue transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="/adhirachna-uploads/AdhirachnaVector.png"
              alt="Adhirachna Digital Solutions"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
