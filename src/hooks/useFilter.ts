import { useState, useMemo } from 'react';

export function useFilter<T>(items: T[], getCategory: (item: T) => string) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add('All');
    items.forEach((item) => {
      uniqueCategories.add(getCategory(item));
    });
    return Array.from(uniqueCategories);
  }, [items, getCategory]);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return items;
    }
    return items.filter((item) => getCategory(item) === activeFilter);
  }, [items, activeFilter, getCategory]);

  return { filteredItems, categories, activeFilter, setActiveFilter };
}