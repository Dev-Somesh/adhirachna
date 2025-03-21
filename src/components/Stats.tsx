
import { useInView } from './ui/motion';

const stats = [
  { value: '100+', label: 'Projects Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Expert Engineers' },
  { value: '25+', label: 'Industry Awards' },
];

const Stats = () => {
  const { ref, isInView } = useInView();

  return (
    <section className="bg-adhirachna-light py-16" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 delay-${index * 100} ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-4xl md:text-5xl font-bold text-adhirachna-green mb-2">
                {stat.value}
              </div>
              <div className="text-adhirachna-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
