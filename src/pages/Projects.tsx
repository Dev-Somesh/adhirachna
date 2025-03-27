
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { useInView, useLazyLoadImage } from '../components/ui/motion';
import { ArrowRight } from 'lucide-react';

// Project data
const projects = [
  {
    id: 1,
    title: 'Highway Expansion Project',
    category: 'Infrastructure',
    location: 'Jaipur-Delhi Highway',
    year: '2023',
    description: 'A comprehensive 120km highway expansion project including bridges and toll systems.',
    detailedDescription: 'This project involved expanding a two-lane highway to a six-lane expressway with enhanced safety features, modern toll systems, and intelligent traffic management infrastructure. The project was completed ahead of schedule with exceptional quality standards.',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    client: 'National Highways Authority',
  },
  {
    id: 2,
    title: 'Urban Transit System',
    category: 'Transportation',
    location: 'Bangalore Metro',
    year: '2023',
    description: 'Design and implementation of a modern urban transit system for a growing metropolitan area.',
    detailedDescription: 'Our team provided comprehensive engineering solutions for this urban transit project, covering structural design, electrical systems, ventilation, and safety mechanisms. The system now serves over 500,000 commuters daily.',
    image: 'https://images.unsplash.com/photo-1569262587487-b81bfef763b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    client: 'Bangalore Metro Rail Corporation',
  },
  {
    id: 3,
    title: 'Riverside Commercial Complex',
    category: 'Commercial',
    location: 'Ahmedabad, Gujarat',
    year: '2023',
    description: 'A multi-use commercial complex with advanced structural design for flood resistance.',
    detailedDescription: 'This state-of-the-art commercial complex features innovative flood-resistant foundations, energy-efficient building systems, and a sustainable design approach. The complex includes retail spaces, offices, and recreational areas spanning 250,000 sq. ft.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    client: 'Riverside Developers Ltd.',
  },
  {
    id: 4,
    title: 'Sustainable Residential Township',
    category: 'Residential',
    location: 'Mysore, Karnataka',
    year: '2023',
    description: 'An eco-friendly residential township with integrated water conservation systems.',
    detailedDescription: 'This township project spans 100 acres and incorporates rainwater harvesting, wastewater recycling, solar energy integration, and green building practices. The project received a Platinum LEED certification for its sustainable approach.',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    client: 'EcoHomes Developers',
  },
  {
    id: 5,
    title: 'Smart City Infrastructure',
    category: 'Infrastructure',
    location: 'Indore, Madhya Pradesh',
    year: '2023',
    description: 'Development of intelligent urban infrastructure systems for a growing smart city.',
    detailedDescription: 'This project involved the implementation of smart traffic management systems, energy-efficient street lighting, environmental monitoring stations, and an integrated command center for city management.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    client: 'Indore Municipal Corporation',
  },
  {
    id: 6,
    title: 'Industrial Plant Expansion',
    category: 'Industrial',
    location: 'Vadodara, Gujarat',
    year: '2023',
    description: 'Expansion and modernization of a manufacturing facility with advanced automation.',
    detailedDescription: 'Our team provided engineering solutions for expanding this manufacturing plant, including structural design, process engineering, electrical systems, and automation infrastructure. The expansion doubled the production capacity while improving energy efficiency by 30%.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    client: 'Precision Manufacturing Ltd.',
  },
];

// Categories for filtering
const categories = ['All', 'Infrastructure', 'Transportation', 'Commercial', 'Residential', 'Industrial'];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const { imageSrc, setImageRef } = useLazyLoadImage(project.image, 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U2ZTZlNiIvPjwvc3ZnPg==');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-card overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          ref={setImageRef}
          src={imageSrc}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-adhirachna-darkblue bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center">
            <div className="text-white text-sm mb-2">{project.location}</div>
            <div className="text-white text-sm mb-4">Completed: {project.year}</div>
            <button className="btn-primary">View Details</button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-adhirachna-blue font-medium mb-2">{project.category}</div>
        <h3 className="text-xl font-semibold mb-2 text-adhirachna-darkblue">{project.title}</h3>
        <p className="text-adhirachna-gray mb-4">{project.description}</p>
        <div className="text-sm text-adhirachna-gray">Client: {project.client}</div>
      </div>
    </div>
  );
};

const ProjectDetail = ({ project, onClose }: { project: typeof projects[0], onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-adhirachna-darkblue hover:bg-adhirachna-light"
          >
            &times;
          </button>
        </div>
        <div className="p-8">
          <span className="text-sm text-adhirachna-blue font-medium">{project.category}</span>
          <h2 className="text-2xl font-semibold my-2 text-adhirachna-darkblue">{project.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-adhirachna-darkblue">Project Details</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2">
                  <span className="text-adhirachna-gray">Location:</span>
                  <span className="font-medium">{project.location}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-adhirachna-gray">Year:</span>
                  <span className="font-medium">{project.year}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-adhirachna-gray">Client:</span>
                  <span className="font-medium">{project.client}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-adhirachna-darkblue">Project Scope</h3>
              <p className="text-adhirachna-gray">{project.detailedDescription}</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={onClose}
              className="btn-primary"
            >
              Close Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, isInView } = useInView();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

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
            <p className="text-lg text-adhirachna-gray mb-12">
              Explore our portfolio of completed and ongoing engineering projects across various sectors.
              Each project demonstrates our commitment to excellence, innovation, and sustainable development.
            </p>

            <div className="flex flex-wrap justify-center mb-12 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-adhirachna-blue text-white'
                      : 'bg-white text-adhirachna-gray hover:bg-adhirachna-lightgray'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref as React.RefObject<HTMLDivElement>}>
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-700 delay-${index * 150} ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-adhirachna-gray text-lg">No projects found in this category.</p>
              </div>
            )}

            <div className="mt-16 glass-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-adhirachna-darkblue">Have a Project in Mind?</h2>
                  <p className="text-adhirachna-gray mb-6">
                    We would love to hear about your next engineering project. Our team is ready to provide innovative solutions tailored to your specific needs.
                  </p>
                  <a href="/contact" className="btn-primary inline-flex items-center">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-adhirachna-light p-6 rounded-lg">
                    <div className="text-4xl font-bold text-adhirachna-green mb-2">100+</div>
                    <div className="text-adhirachna-darkblue">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
};

export default Projects;
