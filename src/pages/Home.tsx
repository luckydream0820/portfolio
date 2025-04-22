import React from 'react';
import Hero from '../components/sections/Hero';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';
import { projects } from '../data/projects';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedProjects projects={projects} />
      <About />
      <Services />
      <Contact />
    </main>
  );
};

export default Home;