import React from 'react';
import { Skill } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 transition-colors duration-300">
        <div 
          className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;