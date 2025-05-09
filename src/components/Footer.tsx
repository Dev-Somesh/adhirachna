import { X, Linkedin, Instagram, BookOpen, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer className={`bg-adhirachna-darkblue text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="mb-6">
              <Link to="/">
                <img 
                  src="/adhirachna-uploads/1bb22713-e329-4324-8be6-ed1a3a73cc9d.png" 
                  alt="Adhirachna Logo" 
                  className="h-20 w-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                    console.error('Failed to load logo image');
                  }}
                />
              </Link>
            </div>
            <p className="text-white/70 mb-6">
              Leading infrastructure development and engineering consultancy committed to delivering exceptional quality and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="X (formerly Twitter)"
              >
                <X className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <Link
                to="/blog" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-adhirachna-green transition-colors duration-300"
                aria-label="Blog"
              >
                <BookOpen className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Projects', href: '/projects' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-white/70 hover:text-adhirachna-green flex items-center transition-colors duration-300"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Detailed Engineering Designs & Drawings',
                'Planning and Project Management',
                'Detailed Project Report (DPR)',
                'Third Party Verification',
                'Structural Health Monitoring',
                'Structural Maintenance Work',
                'Infrastructural Development',
                'Estimation and Valuation',
                'Interior Design',
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services" 
                    className="text-white/70 hover:text-adhirachna-green flex items-center transition-colors duration-300"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-adhirachna-green mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/70">
                  Villa No. 04, Aditi Villas<br />
                  Jagatpura, Jaipur<br />
                  Rajasthan, 302017
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-adhirachna-green mr-3 flex-shrink-0" />
                <a href="tel:+919602443346" className="text-white/70 hover:text-adhirachna-green transition-colors">
                  +91 9602443346
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-adhirachna-green mr-3 flex-shrink-0" />
                <a href="mailto:info@adhirachna.com" className="text-white/70 hover:text-adhirachna-green transition-colors">
                  info@adhirachna.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-xl font-medium mb-4">Newsletter</h4>
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
            </div>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Adhirachna Engineering Solutions. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms-of-service' },
              { label: 'Cookie Policy', href: '/cookie-policy' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/50 hover:text-adhirachna-green text-sm transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
