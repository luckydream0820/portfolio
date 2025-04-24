import React from 'react';
import Button from '../ui/Button';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="min-h-screen flex items-center relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-600 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-purple-300 dark:bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-teal-300 dark:bg-teal-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="animate-fadeIn space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300 ">
                <span className="block">My Craft</span>
                <span className="block pt-3"> My Passion</span>
                <span className="block text-blue-600 dark:text-blue-400 transition-colors duration-300 pt-3"> Your Vision</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg transition-colors duration-300">
              Bringing your ideas to life with passion and care, creating work that truly stands out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('projects');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                   My Works
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Hey, Say!
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/6423446/pexels-photo-6423446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Creative Portfolio" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
            </div>
          </div> */}
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={handleScrollDown}
            className="p-2 rounded-full bg-white/30 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;