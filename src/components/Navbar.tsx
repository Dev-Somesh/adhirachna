
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-90 backdrop-blur-lg shadow-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-xl font-bold text-adhirachna-darkblue">
              Adhirachna
              <span className="text-adhirachna-blue font-light">Engineering</span>
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-adhirachna-darkblue" />
            ) : (
              <Menu className="h-6 w-6 text-adhirachna-darkblue" />
            )}
          </button>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium hover:text-adhirachna-blue transition-colors ${
                    isScrolled ? 'text-adhirachna-darkblue' : 'text-white'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#contact" 
                className="btn-primary py-2 px-4"
              >
                Get In Touch
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col pt-16">
              <ul className="flex flex-col items-center space-y-6 text-xl mt-12">
                {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="font-medium text-adhirachna-darkblue hover:text-adhirachna-blue transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="pt-6">
                  <a 
                    href="#contact" 
                    className="btn-primary py-2 px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get In Touch
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
