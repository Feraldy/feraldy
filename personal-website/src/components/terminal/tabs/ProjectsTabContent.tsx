import React, { useState } from 'react';
import ContactModal from '../../ContactModal';
import { projects as projectsData } from '../../../data/projects';

interface ProjectsTabContentProps {
  onBlogStoryClick?: (storySlug: string) => void;
}

const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({ onBlogStoryClick }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  const projects = projectsData;

  return (
    <div className="p-4 text-gray-300 terminal-font text-xs sm:text-sm md:text-base">
      {/* Terminal command simulation */}
      <div className="mb-6 font-mono text-sm">
        <div className="flex items-center mb-2">
          <span className="text-cyan-400">feraldy@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="text-gray-300 ml-2">ls -la ./projects</span>
          <span className="text-green-400 ml-2">✓</span>
        </div>
        <div className="pl-4 text-gray-400 mb-4">
          total {projects.length}
          <br />
          drwxr-xr-x 2 feraldy feraldy 4096 Jul 22 15:04 .
          <br />
          drwxr-xr-x 3 feraldy feraldy 4096 Jul 22 15:04 ..
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-400 mb-8">
          A collection of personal projects and tools I've built to solve problems and explore new technologies.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-yellow-400 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl text-gray-600">🚀</div>
              )}
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-yellow-400 font-semibold text-sm mb-2">
                  {project.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-center py-2 rounded font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                >
                  View Live
                </a>
                <button
                  onClick={() => onBlogStoryClick?.(project.storySlug)}
                  className="flex-1 border border-purple-400 text-purple-400 text-center py-2 rounded font-semibold hover:bg-purple-400 hover:text-gray-900 transition-all duration-300"
                >
                  Read Story
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-blue-400 text-blue-400 text-center py-2 rounded font-semibold hover:bg-blue-400 hover:text-gray-900 transition-all duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tool CTA */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Have an idea for a project?
        </h2>
        <p className="text-gray-400 mb-6">
          I'm always looking for new challenges and interesting problems to solve. Let's collaborate!
        </p>
        <button
          onClick={() => setShowContactModal(true)}
          className="text-left w-full max-w-xs px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200 terminal-font"
        >
          <span className="text-cyan-400">feraldy@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="text-gray-100 ml-2">./contact.sh</span>
        </button>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

export default ProjectsTabContent;