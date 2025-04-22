import React from 'react';
import { skills } from '../../data/skills';
import SkillBar from '../ui/SkillBar';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const About: React.FC = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={aboutRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ${
              aboutVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mb-6 transition-colors duration-300"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
              I'm a passionate designer with over 8 years of experience creating meaningful, impactful designs for brands and businesses. My approach combines creative thinking with strategic problem-solving to deliver designs that not only look beautiful but also achieve their intended purpose.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
              With a background in both digital and print design, I bring a versatile skill set to every project. I believe in close collaboration with clients to understand their vision and goals, ensuring that the final product exceeds expectations.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Skills & Expertise
            </h3>
            
            <div className="mb-8">
              {skills.map((skill) => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </div>
            
            <Button 
              variant="primary"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get In Touch
            </Button>
          </div>
          
          <div 
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 delay-300 ${
              imageVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-lg transition-colors duration-300"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-lg transition-colors duration-300"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Designer at work"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg mt-8 transition-colors duration-300">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Education & Certifications
              </h4>
              <ul className="space-y-3">
                <li className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  ✓ BFA in Graphic Design, Art Institute of Design
                </li>
                <li className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  ✓ UX/UI Design Certification, Design Academy
                </li>
                <li className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  ✓ Adobe Certified Expert
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;