import { useInView } from './ui/motion';
import { MapPin, Phone, Mail, Clock, X, Instagram, Linkedin, BookOpen, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { contactFormSchema } from '@/lib/validations/contact';
import type { ContactFormValues } from '@/types/contact';


const Contact = () => {
  const { ref } = useInView();
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

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Submit form using fetch with the right headers and encoding
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...data
        })
      });

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We will get back to you soon!",
        });
        form.reset();
      } else {
        console.error('Form submission response:', response);
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

            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
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
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                            {...field} 
                            name="name"
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
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                            {...field} 
                            name="email"
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
                            placeholder="Your phone number" 
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                            {...field} 
                            name="phone"
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
                          <Input 
                            placeholder="Message subject" 
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue" 
                            {...field} 
                            name="subject"
                          />
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
                        <textarea 
                          placeholder="Your message" 
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue min-h-[150px]" 
                          {...field} 
                          name="message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-adhirachna-blue text-white py-3 rounded-lg font-medium hover:bg-adhirachna-darkblue transition-colors duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* This hidden form helps Netlify detect your form */}
      <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
        <input type="text" name="bot-field" />
      </form>
    </section>
  );
};

export default Contact;
