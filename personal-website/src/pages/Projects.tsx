import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WellBalanceImage from '../assets/WellBalance.png';
import CoffeeWithDyImage from '../assets/CoffeeWIthDy.png';

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Your personal projects
  const projects = [
    {
      id: 1,
      title: "Well Balance",
      description: "A comprehensive wellness and balance tracking application to help users maintain a healthy lifestyle with intuitive dashboard and progress tracking.",
      category: "Web App",
      technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
      liveUrl: "https://well-balance.vercel.app",
      githubUrl: "#", // Add your GitHub URL when available
      status: "Active",
      image: WellBalanceImage
    },
    {
      id: 2,
      title: "Coffee with Dy",
      description: "A personalized coffee brewing guide featuring custom recipes and the famous 4:6 method by Tetsu Kasuya. Perfect your coffee brewing with different water ratios and weights.",
      category: "Web App",
      technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
      liveUrl: "https://coffeewith-dy.vercel.app",
      githubUrl: "#", // Add your GitHub URL when available
      status: "Active",
      image: CoffeeWithDyImage
    }
    // Add more tools here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16 md:pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16 pt-8 md:pt-12">
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              My Projects
            </h1>
            <p 
              className={`text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              A collection of personal projects and tools I've built to solve problems and explore new technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-neutral-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${0.4 + index * 0.2}s` }}
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
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-center py-2 rounded font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                    >
                      View Live
                    </a>
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
          <div 
            className={`text-center pb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Have an idea for a project?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always looking for new challenges and interesting problems to solve. Let's collaborate!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-full hover:from-blue-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;