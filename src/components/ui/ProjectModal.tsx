import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { X } from 'lucide-react';
import Button from './Button';
import './index.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);


  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));

  useEffect(() => {
    if (!fullscreenImage) return;
  
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Now allowed
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      setZoom((z) => {
        const newZoom = Math.min(Math.max(z + delta, 0.5), 3);
        if (newZoom === 1) setPosition({ x: 0, y: 0 });
        return newZoom;
      });
    };
  
    const container = document.getElementById("fullscreen-image-container");
    container?.addEventListener("wheel", handleWheel, { passive: false });
  
    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, [fullscreenImage]);

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // const handleWheel = (e: React.WheelEvent) => {
  //   e.preventDefault();
  //   const delta = e.deltaY < 0 ? 0.1 : -0.1;
  //   setZoom((z) => Math.min(Math.max(z + delta, 0.5), 3));
  // };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="relative">
          <div className="w-full h-72 sm:h-96 overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-6 py-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-blue-600 text-white rounded-full">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-300 mb-2">Client: {project.client}</p>
            <p className="text-gray-300">Completed: {project.date}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            Project Overview
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8 transition-colors duration-300">
            {project.description}
          </p>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            Project Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {project.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={image}
                  alt={`${project.title} image ${index + 1}`}
                  className="w-full h-60 object-cover object-center hover:scale-105 transition-transform duration-500"
                  onClick={() => {
                    setFullscreenImage(image);
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="primary" onClick={onClose}>
              Close Project
            </Button>
          </div>
        </div>
      </div>
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto flex justify-center items-start p-4 fullscreen-container"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-screen-lg w-full">
            {/* Zoom Controls */}
            <div className="absolute top-2 right-2 flex gap-2 z-10 fixed-right">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="bg-blue-600 bg-opacity-60 hover:bg-opacity-40 text-white px-3 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="bg-blue-600 bg-opacity-60 hover:bg-opacity-40 text-white px-3 py-1 rounded"
              >
                −
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                className="bg-blue-600 bg-opacity-60 hover:bg-opacity-40 text-white px-3 py-1 rounded"
              >
                Reset
              </button>
            </div>

            <img
              src={fullscreenImage}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center top",
                transition: "transform 0.2s ease",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              // onWheel={handleWheel}
              className="w-full object-contain fullscreen-image"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectModal;