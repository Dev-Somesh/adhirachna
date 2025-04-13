import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { useInView } from '../components/ui/motion';
import { MapPin, Phone, Mail, Clock, X, Instagram, Linkedin, BookOpen, MessageSquare } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../components/ui/use-toast";

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
      const formData = new FormData();
      formData.append("form-name", "contact");
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // Submit form using fetch
      const response = await fetch("/", {
        method: "POST",
        body: formData,
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
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Adhirachna Engineering Solutions</title>
        <meta name="description" content="Get in touch with Adhirachna Engineering Solutions for inquiries, quotes, or to discuss your engineering project needs." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-6">Contact Us</h1>
            <p className="text-lg text-adhirachna-gray mb-12">
              Have a project in mind or need expert engineering consultation? Get in touch with our team.
              We look forward to discussing how we can help bring your vision to life.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" ref={ref as React.RefObject<HTMLDivElement>}>
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
                          +91 9602443346
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquare className="h-6 w-6 text-adhirachna-blue mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-adhirachna-darkblue mb-1">WhatsApp</h4>
                        <p className="text-adhirachna-gray">
                          <a 
                            href="https://wa.me/919602443346" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-adhirachna-green transition-colors"
                          >
                            Chat with us on WhatsApp
                          </a>
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
                        aria-label="X (formerly Twitter)"
                      >
                        <X className="h-5 w-5" />
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
                      <a 
                        href="/blog" 
                        className="h-10 w-10 rounded-full bg-adhirachna-lightgray flex items-center justify-center hover:bg-adhirachna-blue hover:text-white transition-colors duration-300"
                        aria-label="Blog"
                      >
                        <BookOpen className="h-5 w-5" />
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
                    <form 
                      name="contact"
                      method="POST"
                      className="space-y-6"
                      onSubmit={form.handleSubmit(onSubmit)}
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                    >
                      {/* Hidden Netlify form fields */}
                      <input type="hidden" name="form-name" value="contact" />
                      <div hidden>
                        <input name="bot-field" />
                      </div>
                      
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

            {/* Google Map */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-adhirachna-darkblue mb-6">Our Location</h2>
              <div className="h-96 w-full rounded-xl overflow-hidden glass-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.933742973341!2d75.86171287533955!3d26.8403452771985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5f3b5eac2c7%3A0xa4a02c78a32ba252!2sJagatpura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1689854321234!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Adhirachna Engineering Solutions Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
