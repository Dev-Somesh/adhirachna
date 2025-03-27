
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Our Projects | Adhirachna Engineering Solutions</title>
        <meta name="description" content="View our portfolio of successful engineering and infrastructure projects delivered by Adhirachna Engineering Solutions." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-6">Our Projects</h1>
            <p className="text-lg text-adhirachna-gray mb-8">
              Welcome to the Projects page. This is a placeholder for the Projects content.
            </p>
            
            {/* You can add more content here */}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Projects;
