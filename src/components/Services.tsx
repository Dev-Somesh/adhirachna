
import { useInView } from './ui/motion';

const services = [
  {
    title: 'Infrastructure Development',
    description: 'Comprehensive solutions for roads, highways, and urban infrastructure projects with a focus on durability and sustainability.',
    icon: '🏗️',
  },
  {
    title: 'Structural Design Engineering',
    description: 'Expert design services for resilient and efficient structures that meet the highest safety and quality standards.',
    icon: '🏢',
  },
  {
    title: 'Project Management',
    description: 'End-to-end project planning, execution, and management services ensuring timely delivery within budget constraints.',
    icon: '📊',
  },
  {
    title: 'Geotechnical Investigations',
    description: 'Detailed soil testing and analysis services to determine the optimal foundation design for your structures.',
    icon: '🧪',
  },
  {
    title: 'Environmental Services',
    description: 'Comprehensive environmental impact assessments and sustainable engineering practices for eco-friendly projects.',
    icon: '🌱',
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous quality control and assurance protocols to maintain the highest standards in all our projects.',
    icon: '✓',
  },
];

const Services = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="services" className="py-24 bg-white" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="section-container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer a comprehensive range of engineering services tailored to meet the unique needs of your infrastructure projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass-card p-8 transition-all duration-700 delay-${index * 100} ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-adhirachna-darkblue">
                {service.title}
              </h3>
              <p className="text-adhirachna-gray">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
