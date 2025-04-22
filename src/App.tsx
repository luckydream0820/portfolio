import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';
import './styles/animations.css';

function App() {
  const [currentPage, setCurrentPage] = useState('/');

  useEffect(() => {
    // Update the page title based on the current page
    const getPageTitle = () => {
      switch (currentPage) {
        case '/':
          return 'Creative Portfolio | Home';
        case '/projects':
          return 'Creative Portfolio | Projects';
        case '/about':
          return 'Creative Portfolio | About';
        case '/services':
          return 'Creative Portfolio | Services';
        case '/contact':
          return 'Creative Portfolio | Contact';
        default:
          return 'Creative Portfolio';
      }
    };

    document.title = getPageTitle();

    // Listen for navigation events
    const handleNavigation = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
    };

    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [currentPage]);

  // Simple client-side routing
  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <Home />;
      case '/projects':
        return <Projects />;
      case '/about':
        return <About />;
      case '/services':
        return <Services />;
      case '/contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        {renderPage()}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;