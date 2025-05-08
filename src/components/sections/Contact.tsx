import React, { useState } from 'react';
import Button from '../ui/Button';
import { socialLinks } from '../../data/socials';
import * as LucideIcons from 'lucide-react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Access Lucide icons dynamically
  const Icon = ({ iconName }: { iconName: string }) => {
    const LucideIcon = (LucideIcons as any)[iconName];
    return LucideIcon ? <LucideIcon size={20} /> : null;
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 transition-colors duration-300"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Have a project in mind or want to learn more about my services? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-24 md:grid-cols-24 gap-24">
          {/* <div 
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ${
              formVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="Subject of your message"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              {submitSuccess && (
                <div className="p-4 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 rounded-lg transition-colors duration-300">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              <Button 
                type="submit" 
                variant="primary"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div> */}
          
          <div 
            ref={infoRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 delay-300 ${
              infoVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
          >
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-md transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Contact Information
              </h3>
              
              <div className="flex mb-8" style={{justifyContent: 'space-around'}}>
                <div className="flex">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                      Email
                    </h4>
                    <p className="text-gray-900 dark:text-white transition-colors duration-300">
                     Luckydream 0821@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 transition-colors duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                      Phone
                    </h4>
                    <p className="text-gray-900 dark:text-white transition-colors duration-300">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 transition-colors duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                      Location
                    </h4>
                    <p className="text-gray-900 dark:text-white transition-colors duration-300">
                      New York, New York
                    </p>
                  </div>
                </div>
              </div>
              
              {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Connect With Me
              </h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-300"
                    aria-label={social.platform}
                  >
                    <Icon iconName={social.icon} />
                  </a>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;