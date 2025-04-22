import React from 'react';
import ProjectsGrid from '../components/sections/ProjectsGrid';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  return (
    <main className="pt-24">
      <ProjectsGrid projects={projects} />
    </main>
  );
};

export default Projects;