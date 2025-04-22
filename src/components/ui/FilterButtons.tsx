import React from 'react';

interface FilterButtonsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  categories,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === category
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;