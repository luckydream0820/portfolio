import React from 'react';
import { Service } from '../../types';
import * as LucideIcons from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  // Access Lucide icons dynamically
  const Icon = () => {
    const LucideIcon = (LucideIcons as any)[service.icon];
    return LucideIcon ? <LucideIcon size={32} /> : null;
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 transition-colors duration-300">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;