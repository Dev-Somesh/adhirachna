
import { useState } from 'react';
import { useInView } from './ui/motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { ref, isInView } = useInView();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Encode data for email script
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone || 'Not provided');
      formData.append('subject', data.subject);
      formData.append('message', data.message);

      // Send to serverless function or form handling service
      const response = await fetch('https://formsubmit.co/info@adhirachna.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We will get back to you soon!",
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      Villa No. 04, Aditi Villas<br />
                      Jagatpura, Jaipur<br />
                      Rajasthan, 302017<br />
                      India
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
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-adhirachna-lightgray flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-adhirachna-lightgray flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-adhirachna-lightgray flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-adhirachna-lightgray flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-adhirachna-darkblue">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-adhirachna-darkblue">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Your email" 
                              className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-adhirachna-darkblue">Phone</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Your phone (optional)" 
                              className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-adhirachna-darkblue">Subject</FormLabel>
                          <FormControl>
                            <select
                              className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                              {...field}
                            >
                              <option value="" disabled>Select a subject</option>
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="Project Consultation">Project Consultation</option>
                              <option value="Partnership">Partnership</option>
                              <option value="Career">Career</option>
                              <option value="Other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-adhirachna-darkblue">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Your message"
                            className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <button 
                      type="submit" 
                      className="btn-primary w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
