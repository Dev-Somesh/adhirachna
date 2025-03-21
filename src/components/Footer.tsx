
import { ChevronRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-adhirachna-darkblue text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/e5559050-11f2-4d4f-be39-8be20cf2dc48.png" 
                alt="Adhirachna Engineering Solutions" 
                className="h-20 mb-4"
              />
            </div>
            <p className="text-white/70 mb-6">
              Leading infrastructure development and engineering consultancy committed to delivering exceptional quality and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-adhirachna-green flex items-center transition-colors duration-300"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Infrastructure Development',
                'Structural Design',
                'Project Management',
                'Geotechnical Investigations',
                'Environmental Services',
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="text-white/70 hover:text-adhirachna-green flex items-center transition-colors duration-300"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter to receive updates on our latest projects and insights.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 bg-white/10 rounded-l-lg focus:outline-none focus:bg-white/20 flex-grow"
                />
                <button
                  type="submit"
                  className="bg-adhirachna-green px-4 py-3 rounded-r-lg hover:bg-adhirachna-darkgreen transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-white/50 text-sm">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Adhirachna Engineering Solutions. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {[
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Cookie Policy', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-adhirachna-green text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
