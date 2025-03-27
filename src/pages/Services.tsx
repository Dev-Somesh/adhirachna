
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { useInView } from '../components/ui/motion';
import { FileText, ClipboardList, FileBarChart, Shield, ActivitySquare, Hammer, Building, Calculator, Paintbrush, Check } from 'lucide-react';

const Services = () => {
  const { ref, isInView } = useInView();

  const services = [
    {
      title: 'Detailed Engineering Designs & Drawings',
      description: 'Comprehensive and precise engineering designs tailored for optimal functionality and safety.',
      icon: <FileText className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Structural analysis and design',
        'Civil engineering drawings',
        'Mechanical system design',
        'Electrical layout planning',
        'Plumbing and drainage designs'
      ]
    },
    {
      title: 'Planning and Project Management',
      description: 'Strategic planning and efficient project management to ensure timely delivery within budget.',
      icon: <ClipboardList className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Project scheduling',
        'Resource allocation',
        'Budget management',
        'Progress tracking',
        'Risk mitigation strategies'
      ]
    },
    {
      title: 'Detailed Project Report (DPR)',
      description: 'In-depth project reporting with thorough analysis and recommendations for success.',
      icon: <FileBarChart className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Feasibility studies',
        'Cost-benefit analysis',
        'Technical specifications',
        'Implementation plans',
        'Environmental impact assessment'
      ]
    },
    {
      title: 'Third Party Verification',
      description: 'Independent verification services to ensure compliance with standards and specifications.',
      icon: <Shield className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Quality assurance',
        'Safety compliance checking',
        'Technical specification verification',
        'Construction quality audit',
        'Material testing oversight'
      ]
    },
    {
      title: 'Structural Health Monitoring',
      description: 'Advanced monitoring solutions to assess and maintain structural integrity over time.',
      icon: <ActivitySquare className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Vibration analysis',
        'Structural integrity assessment',
        'Deterioration monitoring',
        'Predictive maintenance planning',
        'Rehabilitation recommendations'
      ]
    },
    {
      title: 'Structural Maintenance Work',
      description: 'Expert maintenance services to extend the lifespan and ensure safety of structures.',
      icon: <Hammer className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Concrete repair',
        'Steel structure reinforcement',
        'Waterproofing solutions',
        'Structural retrofitting',
        'Preventive maintenance programs'
      ]
    },
    {
      title: 'Infrastructural Development',
      description: 'Innovative solutions for developing resilient and sustainable infrastructure.',
      icon: <Building className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Urban planning integration',
        'Transportation systems',
        'Public utilities development',
        'Smart city infrastructure',
        'Sustainable design implementation'
      ]
    },
    {
      title: 'Estimation and Valuation',
      description: 'Accurate estimation and valuation services for project budgeting and financial planning.',
      icon: <Calculator className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Quantity surveying',
        'Cost estimation',
        'Property valuation',
        'ROI analysis',
        'Budget forecasting'
      ]
    },
    {
      title: 'Interior Design',
      description: 'Creative and functional interior design solutions to enhance aesthetics and usability.',
      icon: <Paintbrush className="h-10 w-10 text-adhirachna-green" />,
      features: [
        'Spatial planning',
        'Material selection',
        'Lighting design',
        'Furniture layout',
        'Decorative elements'
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Adhirachna Engineering Solutions</title>
        <meta name="description" content="Explore the comprehensive engineering and infrastructure services offered by Adhirachna Engineering Solutions." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-6">Our Services</h1>
            <p className="text-lg text-adhirachna-gray mb-12">
              We offer a comprehensive range of engineering services tailored to meet the unique needs of your infrastructure projects.
              Our team of experienced engineers and consultants brings expertise across various domains to ensure the success of your projects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" ref={ref as React.RefObject<HTMLDivElement>}>
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`glass-card transition-all duration-700 delay-${index * 100} ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="p-8 border-b border-gray-100">
                    <div className="mb-4 flex justify-center">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-adhirachna-darkblue text-center">
                      {service.title}
                    </h3>
                    <p className="text-adhirachna-gray text-center">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-medium mb-3 text-adhirachna-blue">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={18} className="text-adhirachna-green mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-adhirachna-gray text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-8 glass-card">
              <h2 className="text-2xl font-semibold mb-6 text-adhirachna-darkblue">Our Service Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Consultation', description: 'Initial meeting to understand your requirements and project scope.' },
                  { step: '02', title: 'Planning', description: 'Detailed project planning, including timelines, resources, and deliverables.' },
                  { step: '03', title: 'Execution', description: 'Implementation of the project plan with regular progress updates.' },
                  { step: '04', title: 'Delivery', description: 'Final delivery with quality assurance and client satisfaction assessment.' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-adhirachna-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-adhirachna-green">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-adhirachna-darkblue">{item.title}</h3>
                    <p className="text-adhirachna-gray text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-adhirachna-darkblue">Ready to Start Your Project?</h2>
              <p className="text-adhirachna-gray mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how our engineering services can bring your vision to life.
                Our team is ready to provide expert consultation and tailored solutions.
              </p>
              <a href="/contact" className="btn-primary bg-adhirachna-green hover:bg-adhirachna-darkgreen">
                Get In Touch
              </a>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Services;
