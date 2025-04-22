import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { menuItems } from '../../data/menu';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get the pathname and set active link
    const path = window.location.pathname;
    setActiveLink(path);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
          Portfolio
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                activeLink === item.path 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-gray-200" />
            ) : (
              <Moon size={18} className="text-gray-800" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-gray-200" />
            ) : (
              <Moon size={18} className="text-gray-800" />
            )}
          </button>
          <button 
            onClick={handleMenuClick}
            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col`}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Portfolio
            </a>
            <button 
              onClick={handleMenuClick}
              className="text-gray-800 dark:text-gray-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 space-y-6">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className={`text-lg font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeLink === item.path 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;