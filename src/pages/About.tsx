
import React from 'react';
import { Helmet } from 'react-helmet';
import { useInView } from '../components/ui/motion';
import { CheckCircle } from 'lucide-react';
import { useSiteContent, TeamMember } from '@/context/SiteContext';

const About = () => {
  const { ref, isInView } = useInView();
  const { ref: refValues, isInView: isValuesInView } = useInView();
  const { siteContent } = useSiteContent();

  // Filter team members that should show on the website
  const visibleTeamMembers = siteContent.teamMembers.filter((member: TeamMember) => 
    member.showOnWebsite !== false
  );

  return (
    <>
      <Helmet>
        <title>About Us | Adhirachna Engineering Solutions</title>
        <meta name="description" content="Learn about Adhirachna Engineering Solutions - our history, mission, values, and team." />
      </Helmet>
      
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-6">About Us</h1>
          
          <section className="py-12" ref={ref as React.RefObject<HTMLDivElement>}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div 
                className={`transition-all duration-1000 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <div className="relative">
                  <div className="bg-adhirachna-blue h-80 w-80 rounded-xl absolute -top-4 -left-4 z-0"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Engineering team" 
                    className="w-full h-auto rounded-xl shadow-lg relative z-10"
                  />
                  <div className="glass-card p-6 absolute -bottom-10 -right-10 z-20 max-w-xs">
                    <div className="text-4xl font-bold text-adhirachna-blue">Since</div>
                    <div className="text-adhirachna-darkblue font-medium">August 2023</div>
                  </div>
                </div>
              </div>

              <div 
                className={`transition-all duration-1000 delay-300 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-adhirachna-darkblue">
                  About Adhirachna Engineering Solutions
                </h2>
                <p className="text-adhirachna-gray mb-6">
                  Founded in August 2023 by co-founder Anurag Pareek, Adhirachna Engineering Solutions is a growing infrastructure development and engineering consultancy committed to delivering exceptional quality and innovative solutions across a wide range of projects.
                </p>
                <p className="text-adhirachna-gray mb-8">
                  Our team of expert engineers, designers, and consultants work collaboratively to bring your infrastructure projects to life, ensuring sustainable development and optimal performance.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Architectural Engineering',
                    'Management Consulting',
                    'Technical Services',
                    'Building Maintenance',
                    'Scientific Services',
                    'Infrastructure Development'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-adhirachna-blue mr-2" />
                      <span className="text-adhirachna-darkblue">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mt-16 mb-12" ref={refValues as React.RefObject<HTMLDivElement>}>
            <h2 className="text-3xl font-semibold mb-8 text-adhirachna-darkblue">Our Values</h2>
            <p className="text-lg text-adhirachna-gray mb-12">
              These core values guide our approach to every project and relationship we build.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Excellence',
                  description: 'We are committed to delivering the highest quality in every aspect of our work, exceeding expectations and industry standards.',
                  icon: '🌟',
                },
                {
                  title: 'Innovation',
                  description: 'We embrace creative thinking and cutting-edge solutions to address complex engineering challenges effectively.',
                  icon: '💡',
                },
                {
                  title: 'Integrity',
                  description: 'We operate with transparency, honesty, and ethical standards in all our business dealings and relationships.',
                  icon: '🤝',
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className={`glass-card p-8 text-center transition-all duration-700 delay-${index * 200} ${
                    isValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-adhirachna-darkblue">
                    {value.title}
                  </h3>
                  <p className="text-adhirachna-gray">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Team */}
          {visibleTeamMembers.length > 0 && (
            <section className="mt-16 mb-12">
              <h2 className="text-3xl font-semibold mb-8 text-adhirachna-darkblue">Our Team</h2>
              <p className="text-lg text-adhirachna-gray mb-12">
                Meet the dedicated professionals behind Adhirachna Engineering Solutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleTeamMembers.map((member: TeamMember) => (
                  <div key={member.id} className="glass-card p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1 text-adhirachna-darkblue">{member.name}</h3>
                    <p className="text-adhirachna-blue mb-3">{member.position}</p>
                    <p className="text-adhirachna-gray mb-4">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
