import React from 'react';
import { Project } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-blue-600 text-white rounded-full">
              {project.category}
            </span>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 transition-colors duration-300">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;