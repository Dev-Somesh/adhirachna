
import { useState } from 'react';
import { useInView } from './ui/motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally send the data to a server
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-adhirachna-light" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="section-container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">
          Have a project in mind or need expert engineering consultation? Get in touch with our team.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div 
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold text-adhirachna-darkblue mb-6">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-adhirachna-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-adhirachna-darkblue mb-1">Our Location</h4>
                    <p className="text-adhirachna-gray">
                      123 Engineering Plaza, Tech Park<br />
                      Bangalore, Karnataka 560001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-adhirachna-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-adhirachna-darkblue mb-1">Email Us</h4>
                    <p className="text-adhirachna-gray">
                      info@adhirachna.com<br />
                      projects@adhirachna.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-adhirachna-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-adhirachna-darkblue mb-1">Call Us</h4>
                    <p className="text-adhirachna-gray">
                      +91 123 456 7890<br />
                      +91 987 654 3210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-adhirachna-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-adhirachna-darkblue mb-1">Working Hours</h4>
                    <p className="text-adhirachna-gray">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-6 rounded-xl shadow-soft">
                <h4 className="font-medium text-adhirachna-darkblue mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                    <a 
                      key={platform} 
                      href="#" 
                      className="h-10 w-10 rounded-full bg-adhirachna-lightgray flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                    >
                      <span className="sr-only">{platform}</span>
                      <i className={`fab fa-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-1000 delay-300 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-adhirachna-darkblue mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-adhirachna-darkblue mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-adhirachna-darkblue mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-adhirachna-darkblue mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                      placeholder="Your phone"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-adhirachna-darkblue mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Consultation">Project Consultation</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Career">Career</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-adhirachna-darkblue mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
