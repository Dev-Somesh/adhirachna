import { useInView } from './ui/motion';
import { MapPin, Phone, Mail, Clock, X, Instagram, Linkedin, BookOpen, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="py-16 px-4 md:px-6" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-adhirachna-darkblue">
          Get In Touch
          <div className="h-1 w-16 bg-adhirachna-blue mt-3"></div>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-adhirachna-darkblue">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-5">
                <div className="bg-adhirachna-light p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-adhirachna-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Location</h3>
                  <p className="text-gray-600">
                    Villa No. 04, Aditi Villas<br />
                    Jagatpura, Jaipur<br />
                    Rajasthan, 302017<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-adhirachna-light p-3 rounded-full">
                  <Mail className="h-6 w-6 text-adhirachna-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <a href="mailto:info@adhirachna.com" className="text-gray-600 hover:text-adhirachna-blue transition-colors">
                    info@adhirachna.com
                  </a>
                  <br />
                  <a href="mailto:projects@adhirachna.com" className="text-gray-600 hover:text-adhirachna-blue transition-colors">
                    projects@adhirachna.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-adhirachna-light p-3 rounded-full">
                  <Phone className="h-6 w-6 text-adhirachna-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <a href="tel:+919602443346" className="text-gray-600 hover:text-adhirachna-blue transition-colors">
                    +91 9602443346
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-adhirachna-light p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-adhirachna-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">WhatsApp</h3>
                  <a 
                    href="https://wa.me/919602443346" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-adhirachna-blue transition-colors"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-adhirachna-light p-3 rounded-full">
                  <Clock className="h-6 w-6 text-adhirachna-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Working Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-adhirachna-darkblue">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-adhirachna-light flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                  aria-label="X (formerly Twitter)"
                >
                  <X className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-adhirachna-light flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-adhirachna-light flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="/blog" 
                  className="h-10 w-10 rounded-full bg-adhirachna-light flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                  aria-label="Blog"
                >
                  <BookOpen className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-adhirachna-darkblue">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
