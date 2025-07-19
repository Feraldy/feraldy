import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AgateImage from '../assets/Agate.jpeg';
import EnboqImage from '../assets/Enboq.png';
import NiceDayImage from '../assets/NiceDay.jpeg';

interface Role {
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Company {
  id: number;
  company: string;
  logo: string;
  period: string;
  location: string;
  roles: Role[];
}

const Resume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleCompany = (companyId: number) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  // Helper function to calculate duration between two dates
  const calculateDuration = (startDate: string, endDate: string): string => {
    const parseDate = (dateStr: string): Date => {
      if (dateStr.toLowerCase() === 'now' || dateStr.toLowerCase() === 'present') {
        return new Date();
      }
      
      // Parse "Jan 2024" format
      const [month, year] = dateStr.split(' ');
      const monthMap: { [key: string]: number } = {
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
      };
      
      return new Date(parseInt(year), monthMap[month.toLowerCase()]);
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (years === 0 && months === 0) {
      return '1 mo';
    }
    
    let result = '';
    if (years > 0) {
      result += `${years} yr${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (result) result += ' ';
      result += `${months} mo${months > 1 ? 's' : ''}`;
    }
    
    return result || '1 mo';
  };

  // Helper function to parse period string and calculate duration
  const getPeriodDuration = (period: string): string => {
    const parts = period.split(' - ');
    if (parts.length === 2) {
      return calculateDuration(parts[0], parts[1]);
    }
    return '';
  };

  const experience: Company[] = [
  {
    "id": 1,
    "company": "RiddleStory",
    "logo": EnboqImage,
    "period": "Jan 2024 - Now",
    "location": "Netherlands - Remote",
    "roles": [
      {
        "position": "Test Engineer",
        "period": "Jan 2024 - Now",
        "description": "Established and implemented QA processes, including test strategies, workflows, and bug reporting systems.",
        "achievements": [
          "Created and maintained 796+ test cases using Qase.io with 90% coverage",
          "Identified, documented, and reported bugs in ClickUp; performed bug verification to confirm fixes",
          "Performed acceptance, smoke, exploratory, and regression testing, both manually and through automation",
          "Developed and maintained 441+ automated end-to-end (E2E) tests for web and mobile applications using Playwright, TypeScript, and Node.js, leading to a 50% reduction in regression testing time",
          "Performed API testing using Postman and test scripts",
          "Contributed to improvement of testing process by adding necessary IDs and test IDs in the front-end and back-end codebase"
        ]
      },
      {
        "position": "Project Manager",
        "period": "May 2024 - Now",
        "description": "Managed product development with detailed documentation and facilitated communication between technical and product teams.",
        "achievements": [
          "Created and maintained 45+ detailed Product Requirements Documents (PRDs)",
          "Facilitated clear communication and understanding between developers and the product team",
          "Provided constructive feedback to design (UI/UX) and product teams regarding features, contributing to product improvement and user experience",
          "Estimated priorities for user stories and determined project deadlines and timelines using Gantt charts",
          "Assisted the CTO and developers in creating technical documentation based on PRDs, bridging the gap between product vision and technical implementation"
        ]
      }
    ]
  },
  {
    "id": 2,
    "company": "NiceDay Nederland",
    "logo": NiceDayImage,
    "period": "Dec 2022 - Dec 2023",
    "location": "Netherlands - Hybrid",
    "roles": [
      {
        "position": "QA Automation Team",
        "period": "Dec 2022 - Dec 2023",
        "description": "Developed and maintained automated test scripts and managed CI/CD pipeline for multi-platform testing.",
        "achievements": [
          "Developed 200+ new test scripts across Android, iOS, and web platforms using Appium, Pytest, Xcode, Android Studio, Playwright, and Selenium",
          "Maintained and updated 700+ existing automation test scripts, ensuring compatibility with latest releases",
          "Performed automated daily, smoke, regression testing integrated with Qase.io for test run management and reporting",
          "Conducted automated testing across Android, iOS, and web browsers including Chrome, Firefox, Safari spanning multiple OS versions",
          "Managed automation CI/CD pipeline using Jenkins, ensuring scheduled and efficient test execution",
          "Identified, documented, and reported bugs in GitHub"
        ]
      },
      {
        "position": "QA Manual Team",
        "period": "Sep 2022 - Nov 2022",
        "description": "Performed manual testing and maintained test case repositories, collaborating with team and stakeholders.",
        "achievements": [
          "Created 200+ test cases and maintained a repository of 2000+ test cases using Qase.io",
          "Performed manual daily, acceptance, smoke, exploratory, and regression testing",
          "Conducted testing across Android, iOS, and web browsers including Chrome, Firefox, Safari with various OS versions",
          "Identified, documented, and reported bugs in GitHub",
          "Actively participated in team discussions to create test plans, prioritize testing efforts based on release notes, and effectively communicate testing results and progress to developers and stakeholders"
        ]
      }
    ]
  },
  {
    "id": 3,
    "company": "Agate International",
    "logo": AgateImage,
    "period": "Aug 2021 - Jan 2022",
    "location": "Indonesia - Remote",
    "roles": [
      {
        "position": "Game Tester Intern",
        "period": "Aug 2021 - Jan 2022",
        "description": "Performed QA for gamification projects and acted as QA PIC on key client projects.",
        "achievements": [
          "Created and maintained 500+ test cases across multiple projects using Qase.io and MS Excel",
          "Identified, documented, and reported bugs in ClickUp; performed bug verification to confirm fixes",
          "Performed compatibility testing across browsers and devices using Google DevTools, BrowserStack, and SauceLabs",
          "Conducted API testing using Swagger",
          "Served as QA Person In Charge (PIC) for BCA and Accenture projects"
        ]
      }
    ]
  }
]

  const skills = {
    "Quality Assurance": ["Test Planning", "Automation Testing", "Bug Tracking", "Process Improvement", "Manual Testing", "API Testing"],
    "Testing Tools": ["Playwright", "Selenium", "Cypress", "Postman", "Qase.io", "Jenkins", "Appium"],
    "Programming": ["JavaScript", "TypeScript", "Python", "Node.js"],
    "Other": ["Git", "ClickUp", "Gantt Charts", "CI/CD", "Agile/Scrum"]
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
      <Navbar />

      {/* Main Content */}
      <main className="pt-16 md:pt-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 pt-8 md:pt-12">
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Resume
            </h1>
            <p 
              className={`text-lg text-gray-400 max-w-2xl mx-auto mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              Test Engineer & Project Manager with expertise in QA automation and product development
            </p>
            
            <button
              onClick={handleDownloadCV}
              className={`px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              Download CV
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Experience Section */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-white mb-8 pb-2 border-b border-gray-700">
                Work Experiences
              </h2>
              
              <div className="space-y-4">
                {experience.map((company) => (
                  <div key={company.id} className="bg-neutral-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200">
                    {/* LinkedIn-style Experience Card */}
                    <div 
                      className="cursor-pointer p-4"
                      onClick={() => toggleCompany(company.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Company Logo */}
                        <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={company.logo} 
                            alt={`${company.company} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // Fallback to initial if logo fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <span 
                            className="text-white font-bold text-sm w-full h-full items-center justify-center" 
                            style={{ display: 'none' }}
                          >
                            {company.company.charAt(0)}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-semibold text-white truncate">{company.company}</h3>
                            <div className="text-right ml-2 flex-shrink-0">
                              <span className="text-sm text-gray-400 block">{company.period}</span>
                              <span className="text-xs text-gray-500">
                                {getPeriodDuration(company.period)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Roles */}
                          <div className="mb-2">
                            {company.roles.map((role, idx) => (
                              <div key={idx} className="text-gray-300">
                                <span className="font-medium">{role.position}</span>
                                {company.roles.length > 1 && (
                                  <span className="text-gray-400 text-sm ml-2">
                                    ({role.period} · {getPeriodDuration(role.period)})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-2">{company.location}</p>
                          
                          {/* Summary */}
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {company.id === 1 && "Led QA automation initiatives, created 796+ test cases, developed 441+ E2E tests, and managed product documentation with 45+ PRDs across dual engineering and project management roles."}
                            {company.id === 2 && "Developed and maintained 900+ automated test scripts across multiple platforms, managed CI/CD pipelines with Jenkins, and created comprehensive test strategies for mobile and web applications."}
                            {company.id === 3 && "Created 500+ test cases for gamification projects, performed cross-platform compatibility testing, and served as QA lead for major client projects including BCA and Accenture."}
                          </p>
                          
                          {/* Show more/less */}
                          <div className="flex items-center mt-3 text-gray-400 hover:text-gray-300">
                            <span className="text-sm font-medium">
                              {expandedCompany === company.id ? 'Show less' : 'Show more'}
                            </span>
                            <svg 
                              className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                                expandedCompany === company.id ? 'rotate-180' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Detailed Content - Only show when expanded */}
                    {expandedCompany === company.id && (
                      <div className="px-4 pb-4 border-t border-gray-700">
                        <div className="pt-6 space-y-8">
                          {company.roles.map((role, roleIndex) => (
                            <div key={roleIndex} className="ml-4 pl-6 pr-4">
                              <div className="flex justify-between items-start mb-3 mr-4">
                                <h4 className="text-lg font-semibold text-yellow-400 flex-1 min-w-0 pr-4">{role.position}</h4>
                                <div className="text-right flex-shrink-0">
                                  <span className="text-sm text-gray-400 block">{role.period}</span>
                                  <span className="text-xs text-gray-500">
                                    {getPeriodDuration(role.period)}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-gray-300 mb-4 leading-relaxed text-sm mr-4">
                                {role.description}
                              </p>
                              
                              <ul className="space-y-2 mr-4">
                                {role.achievements.map((achievement, i) => (
                                  <li key={i} className="text-gray-300 flex items-start text-sm leading-relaxed">
                                    <span className="text-yellow-400 mr-3 mt-1.5 text-xs flex-shrink-0">●</span>
                                    <span className="flex-1">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                  Skills
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h3 className="text-white font-semibold mb-3">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                  Contact
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Email</p>
                    <a href="mailto:fn.archived@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      fn.archived@gmail.com
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/feraldy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      linkedin.com/in/feraldy
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">GitHub</p>
                    <a href="https://github.com/Feraldy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      github.com/Feraldy
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">WhatsApp</p>
                    <a href="https://wa.me/6285156865396" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      +62 851-5686-5396
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Instagram</p>
                    <a href="https://www.instagram.com/feraldy99" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      @feraldy99
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom spacing */}
        <div className="pb-16"></div>
      </main>
    </div>
  );
};

export default Resume;