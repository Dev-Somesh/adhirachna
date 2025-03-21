
import { useState } from 'react';
import { useInView, useLazyLoadImage } from './ui/motion';

// Placeholder projects data
const projects = [
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
  {
    id: 3,
    title: 'Riverside Commercial Complex',
    category: 'Commercial',
    description: 'A multi-use commercial complex with advanced structural design for flood resistance.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Sustainable Residential Township',
    category: 'Residential',
    description: 'An eco-friendly residential township with integrated water conservation systems.',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

// Categories for filtering
const categories = ['All', 'Infrastructure', 'Transportation', 'Commercial', 'Residential'];

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
          <a href="#" className="btn-primary">View Project</a>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-adhirachna-blue font-medium mb-2">{project.category}</div>
        <h3 className="text-xl font-semibold mb-2 text-adhirachna-darkblue">{project.title}</h3>
        <p className="text-adhirachna-gray">{project.description}</p>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, isInView } = useInView();

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-adhirachna-light" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="section-container">
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle">
          Explore our portfolio of completed and ongoing engineering projects across various sectors.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 delay-${index * 150} ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="btn-secondary">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
