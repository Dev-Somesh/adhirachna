
import { useInView } from './ui/motion';
import { FileText, Planning, Report, Verification, Health, Maintenance, Development, Estimation, Interior } from 'lucide-react';

const services = [
  {
    title: 'Detailed Engineering Designs & Drawings',
    description: 'Comprehensive and precise engineering designs tailored for optimal functionality and safety.',
    icon: <FileText className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Planning and Project Management',
    description: 'Strategic planning and efficient project management to ensure timely delivery within budget.',
    icon: <Planning className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Detailed Project Report (DPR)',
    description: 'In-depth project reporting with thorough analysis and recommendations for success.',
    icon: <Report className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Third Party Verification',
    description: 'Independent verification services to ensure compliance with standards and specifications.',
    icon: <Verification className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Structural Health Monitoring',
    description: 'Advanced monitoring solutions to assess and maintain structural integrity over time.',
    icon: <Health className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Structural Maintenance Work',
    description: 'Expert maintenance services to extend the lifespan and ensure safety of structures.',
    icon: <Maintenance className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Infrastructural Development',
    description: 'Innovative solutions for developing resilient and sustainable infrastructure.',
    icon: <Development className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Estimation and Valuation',
    description: 'Accurate estimation and valuation services for project budgeting and financial planning.',
    icon: <Estimation className="h-10 w-10 text-adhirachna-green" />,
  },
  {
    title: 'Interior Design',
    description: 'Creative and functional interior design solutions to enhance aesthetics and usability.',
    icon: <Interior className="h-10 w-10 text-adhirachna-green" />,
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
      </div>
    </section>
  );
};

export default Services;
