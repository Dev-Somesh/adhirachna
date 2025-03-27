
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-90 backdrop-blur-lg shadow-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4c3bdf49-51a1-4395-979c-df13ea291dc1.png" 
              alt="Adhirachna Engineering Solutions" 
              className="h-16 md:h-20" 
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-adhirachna-darkblue" />
            ) : (
              <Menu className="h-6 w-6 text-adhirachna-darkblue" />
            )}
          </button>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`font-medium text-black hover:text-adhirachna-green transition-colors ${
                    location.pathname === item.path ? 'text-adhirachna-green' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/contact" 
                className="btn-primary py-2 px-4 bg-adhirachna-green hover:bg-adhirachna-darkgreen"
              >
                Get In Touch
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col pt-16">
              <ul className="flex flex-col items-center space-y-6 text-xl mt-12">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`font-medium text-black hover:text-adhirachna-green transition-colors ${
                        location.pathname === item.path ? 'text-adhirachna-green' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-6">
                  <Link 
                    to="/contact" 
                    className="btn-primary py-2 px-4 bg-adhirachna-green hover:bg-adhirachna-darkgreen"
                  >
                    Get In Touch
                  </Link>
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
