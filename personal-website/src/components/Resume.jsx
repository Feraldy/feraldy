import { useState, useEffect } from 'react';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experience = [
    {
      id: 1,
      company: "Tech Company",
      position: "QA Engineer",
      period: "2022 - Present",
      description: "Led quality assurance initiatives, developed testing frameworks, and improved deployment processes.",
      achievements: [
        "Reduced bug reports by 60% through comprehensive testing strategies",
        "Implemented automated testing pipelines",
        "Mentored junior QA team members"
      ]
    },
    {
      id: 2,
      company: "Previous Company",
      position: "Frontend Developer",
      period: "2020 - 2022",
      description: "Developed responsive web applications and collaborated with design teams.",
      achievements: [
        "Built user-friendly interfaces with React and TypeScript",
        "Improved application performance by 40%",
        "Collaborated with cross-functional teams"
      ]
    }
  ];

  const skills = {
    "Quality Assurance": ["Test Planning", "Automation Testing", "Bug Tracking", "Process Improvement"],
    "Frontend Development": ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
    "Testing Tools": ["Selenium", "Jest", "Cypress", "Postman"],
    "Other": ["Git", "Docker", "CI/CD", "Agile/Scrum"]
  };

  const handleDownloadCV = () => {
    // You'll need to add your CV PDF to the public folder
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Add your CV PDF to public/cv.pdf
    link.download = 'Feraldy_CV.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm z-40 border-b border-neutral-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Feraldy
          </a>
          <nav className="flex gap-3 md:gap-6">
            <a href="/" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
              Home
            </a>
            <a href="/resume" className="text-sm md:text-base text-yellow-400 font-semibold">
              Resume
            </a>
            <a href="/projects" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
              Projects
            </a>
            <a href="/blog" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
              Blog
            </a>
          </nav>
        </div>
      </header>

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
              Resume
            </h1>
            <p 
              className={`text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-6 md:mb-8 px-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              Quality Assurance Engineer & Frontend Developer with a passion for creating reliable, user-friendly applications.
            </p>
            
            {/* Download CV Button */}
            <button
              onClick={handleDownloadCV}
              className={`px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              Download CV (PDF)
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Experience Section */}
            <div className="lg:col-span-2">
              <h2 
                className={`text-3xl font-bold text-white mb-8 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '0.6s' }}
              >
                Professional Experience
              </h2>
              
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div
                    key={job.id}
                    className={`bg-neutral-800 rounded-lg p-6 transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${0.8 + index * 0.2}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{job.position}</h3>
                        <p className="text-yellow-400 font-semibold">{job.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded">
                        {job.period}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                      <ul className="text-gray-300 space-y-1">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 
                className={`text-3xl font-bold text-white mb-8 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '0.6s' }}
              >
                Skills
              </h2>
              
              <div className="space-y-6">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div
                    key={category}
                    className={`bg-neutral-800 rounded-lg p-6 transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${1.0 + index * 0.1}s` }}
                  >
                    <h3 className="text-lg font-bold text-white mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div 
                className={`bg-neutral-800 rounded-lg p-6 mt-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '1.4s' }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center">
                    <span className="text-yellow-400 mr-2">📧</span>
                    fn.archived@gmail.com
                  </p>
                  <p className="flex items-center">
                    <span className="text-yellow-400 mr-2">🌐</span>
                    <a href="https://linkedin.com/in/your-profile" className="hover:text-white transition-colors">
                      LinkedIn Profile
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-yellow-400 mr-2">💻</span>
                    <a href="https://github.com/your-username" className="hover:text-white transition-colors">
                      GitHub Profile
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;