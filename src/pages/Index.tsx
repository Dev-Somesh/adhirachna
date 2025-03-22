
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContext';

const Index = () => {
  const { siteContent } = useSiteContent();

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
  }, []);

  // Conditionally render sections based on their enabled status
  return (
    <div className="min-h-screen">
      <Navbar />
      {siteContent.hero.enabled && <Hero />}
      <Stats />
      {siteContent.about.enabled && <About />}
      {siteContent.services.enabled && <Services />}
      <Projects />
      {siteContent.contact.enabled && <Contact />}
      <Footer />
    </div>
  );
};

export default Index;
