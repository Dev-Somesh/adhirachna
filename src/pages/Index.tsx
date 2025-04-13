import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
<<<<<<< Updated upstream
import { useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContext';
import { useLocation, Link } from 'react-router-dom';
import { useInView } from '@/components/ui/motion';
=======
import { useEffect, useState, useRef } from 'react';
import { useSiteContent } from '@/context/SiteContext';
import { useLocation } from 'react-router-dom';
import { useInView } from 'framer-motion';
>>>>>>> Stashed changes
import { ArrowRight, FileText, Building, Shield, Paintbrush } from 'lucide-react';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const Index = () => {
  const { siteContent } = useSiteContent();
  const location = useLocation();
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const isServicesInView = useInView(servicesRef);
  const isProjectsInView = useInView(projectsRef);
  const isAboutInView = useInView(aboutRef);
  
  // Featured services for homepage
  const featuredServices = [
    {
      title: 'Detailed Engineering Designs',
      description: 'Comprehensive and precise engineering designs tailored for optimal functionality and safety.',
      icon: <FileText className="h-10 w-10 text-adhirachna-green" />,
    },
    {
      title: 'Infrastructure Development',
      description: 'Innovative solutions for developing resilient and sustainable infrastructure.',
      icon: <Building className="h-10 w-10 text-adhirachna-green" />,
    },
    {
      title: 'Third Party Verification',
      description: 'Independent verification services to ensure compliance with standards and specifications.',
      icon: <Shield className="h-10 w-10 text-adhirachna-green" />,
    },
    {
      title: 'Interior Design',
      description: 'Creative and functional interior design solutions to enhance aesthetics and usability.',
      icon: <Paintbrush className="h-10 w-10 text-adhirachna-green" />,
    },
  ];
  
  // Featured projects for homepage
  const featuredProjects = [
    {
      id: 1,
      title: 'Highway Expansion Project',
      category: 'Infrastructure',
      description: 'A comprehensive 120km highway expansion project including bridges and toll systems.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Urban Transit System',
      category: 'Transportation',
      description: 'Design and implementation of a modern urban transit system for a growing metropolitan area.',
      image: 'https://images.unsplash.com/photo-1569262587487-b81bfef763b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  useEffect(() => {
    // Smooth scroll implementation for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Scroll to section if hash is present in URL
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
    
    // Increment visit count in stats
    const incrementVisits = () => {
      const currentStats = JSON.parse(localStorage.getItem('adhirachna_site_content') || '{}')?.stats;
      if (currentStats) {
        currentStats.totalVisits += 1;
        const updatedContent = JSON.parse(localStorage.getItem('adhirachna_site_content') || '{}');
        updatedContent.stats = currentStats;
        localStorage.setItem('adhirachna_site_content', JSON.stringify(updatedContent));
      }
    };
    
    // Only increment once per session
    const hasVisited = sessionStorage.getItem('adhirachna_visited');
    if (!hasVisited) {
      incrementVisits();
      sessionStorage.setItem('adhirachna_visited', 'true');
    }
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Adhirachna Engineering Solutions | Engineering & Infrastructure Development</title>
        <meta name="description" content="Adhirachna Engineering Solutions provides comprehensive engineering and infrastructure development services with a focus on quality, innovation, and sustainability." />
      </Helmet>
    
      <div className="min-h-screen">
        <Navbar />
        {siteContent.hero.enabled && <Hero />}
        <Stats />
        
        {/* About Section (Preview) */}
        {siteContent.about.enabled && (
          <section id="about" className="py-24 bg-white" ref={aboutRef as React.RefObject<HTMLDivElement>}>
            <div className="section-container">
              <h2 className="section-title">About Us</h2>
              <p className="section-subtitle">
                Founded in August 2023, Adhirachna Engineering Solutions is a growing infrastructure development 
                and engineering consultancy committed to delivering exceptional quality.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div 
                  className={`transition-all duration-1000 ${
                    isAboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                >
                  <div className="relative">
                    <div className="bg-adhirachna-blue h-60 w-60 rounded-xl absolute -top-4 -left-4 z-0"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Engineering team" 
                      className="w-full h-auto rounded-xl shadow-lg relative z-10"
                    />
                  </div>
                </div>
                
                <div 
                  className={`transition-all duration-1000 delay-300 ${
                    isAboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                >
                  <p className="text-adhirachna-gray mb-6">
                    Our team of expert engineers, designers, and consultants work collaboratively to bring your infrastructure 
                    projects to life, ensuring sustainable development and optimal performance.
                  </p>
                  
                  <div className="mt-8">
                    <Link to="/about" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white border border-adhirachna-gray text-adhirachna-darkblue hover:bg-adhirachna-light h-10 px-4 py-2">
                      Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Services Section (Preview) */}
        {siteContent.services.enabled && (
          <section id="services" className="py-24 bg-adhirachna-light" ref={servicesRef as React.RefObject<HTMLDivElement>}>
            <div className="section-container">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                We offer a comprehensive range of engineering services tailored to meet the unique needs of your infrastructure projects.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredServices.map((service, index) => (
                  <div
                    key={index}
                    className={`glass-card p-8 transition-all duration-700 delay-${index * 100} ${
                      isServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <div className="mb-4 flex justify-center">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-adhirachna-darkblue text-center">
                      {service.title}
                    </h3>
                    <p className="text-adhirachna-gray text-center">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link to="/services" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-adhirachna-green hover:bg-adhirachna-darkgreen text-white h-10 px-4 py-2">
                  View All Services
                </Link>
              </div>
            </div>
          </section>
        )}
        
        {/* Projects Section (Preview) */}
        <section id="projects" className="py-24 bg-white" ref={projectsRef as React.RefObject<HTMLDivElement>}>
          <div className="section-container">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Explore some of our recent engineering and infrastructure projects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`glass-card overflow-hidden transition-all duration-700 delay-${index * 150} ${
                    isProjectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <div className="text-sm font-medium mb-2">{project.category}</div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-adhirachna-gray mb-4">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/projects" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white border border-adhirachna-gray text-adhirachna-darkblue hover:bg-adhirachna-light h-10 px-4 py-2">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        {siteContent.contact.enabled && (
          <section className="py-24 bg-adhirachna-light">
            <div className="section-container">
              <div className="glass-card p-12 text-center">
                <h2 className="text-3xl font-semibold mb-6 text-adhirachna-darkblue">Ready to Start Your Project?</h2>
                <p className="text-adhirachna-gray mb-8 max-w-2xl mx-auto">
                  Contact us today to discuss how our engineering services can bring your vision to life.
                  Our team is ready to provide expert consultation and tailored solutions.
                </p>
                <Link to="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-adhirachna-green hover:bg-adhirachna-darkgreen text-white h-10 px-4 py-2">
                  Get In Touch
                </Link>
              </div>
            </div>
          </section>
        )}
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
