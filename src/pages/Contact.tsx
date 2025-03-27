
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Adhirachna Engineering Solutions</title>
        <meta name="description" content="Get in touch with Adhirachna Engineering Solutions for inquiries, quotes, or to discuss your engineering project needs." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-6">Contact Us</h1>
            <p className="text-lg text-adhirachna-gray mb-8">
              Welcome to the Contact page. This is a placeholder for the Contact content.
            </p>
            
            {/* You can add more content here */}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
