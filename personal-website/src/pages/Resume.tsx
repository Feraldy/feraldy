import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TerminalLayout from '../components/TerminalLayout';
import AgateImage from '../assets/Agate.jpeg';
import EnboqImage from '../assets/Enboq.png';
import NiceDayImage from '../assets/NiceDay.jpeg';
import ProfileImage from '../assets/Profile.jpeg';
import CV from '../assets/CV_Feraldy_June_2025_compressed.pdf';

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
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);

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
    "company": "RiddleStory / Enboq",
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
    "period": "Sep 2022 - Dec 2023",
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
    "Testing Tools": ["Playwright", "Selenium", "Postman", "Qase.io", "Jenkins", "Appium", "Pytest", "Xcode", "Android Studio", "Swagger"],
    "Programming": ["JavaScript", "TypeScript", "Python", "Node.js"],
    "Other": ["Git", "ClickUp", "Gantt Charts", "CI/CD", "Agile/Scrum"]
  };

  const education = [
    {
      "institution": "Sepuluh Nopember Institute of Technology",
      "degree": "Bachelor of Computer Science",
      "field": "Graphics, Interactions, Gim and Analytic Laboratory",
      "period": "Aug 2018 - Jul 2022",
      "location": "Surabaya, Indonesia",
      "achievements": [
        "GPA: 3.64/4.00",
        "Thesis: User Interface and User Experience Development for Listen Application as A Means of Realizing Inclusive Education for The Deaf",
      ]
    },
    {
      "institution": "SMA Trinitas",
      "degree": "High School Diploma",
      "field": "Science",
      "period": "Jul 2015 - Jun 2018",
      "location": "Bandung, Indonesia",
      "achievements": [
        "Head of Journalistic Design Club",
      ]
    }
  ];

  const languages = [
    {
      "language": "English",
      "proficiency": "Professional",
      "level": 80
    },
    {
      "language": "Indonesian",
      "proficiency": "Native",
      "level": 100
    }
  ];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV;
    link.download = 'Feraldy_CV.pdf';
    link.click();
  };

  return (
    <>
      <Navbar />
      
      <TerminalLayout title="Resume" command="cat ./resume.pdf">
        {/* Terminal command simulation */}
        <div className="mb-6 font-mono text-sm">
          <div className="flex items-center mb-2">
            <span className="text-blue-400 mr-2">$</span>
            <span className="text-gray-300">whoami</span>
            <span className="text-green-400 ml-2">✓</span>
          </div>
          <div className="pl-4 text-gray-300 mb-4">
            Test Engineer & Project Manager with expertise in QA automation and product development
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={handleDownloadCV}
            className="text-left w-full max-w-xs px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200"
          >
            <span className="text-yellow-400">download</span> <span className="text-blue-400">./CV_Feraldy.pdf</span>
          </button>
        </div>
        
        {/* About Me Section */}
        <div className="mb-12">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Photo */}
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 flex-shrink-0 shadow-lg">
                <img 
                  src={ProfileImage} 
                  alt="Feraldy" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* About Me Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">About Me</h2>
                <div className="text-gray-300 space-y-4">
                  <p>
                    I'm a passionate Test Engineer and Project Manager with over 3 years of experience in quality assurance and product development. 
                  </p>
                  <p>
                    With a strong background in both manual and automated testing across web and mobile platforms, I've helped teams deliver high-quality software products by implementing effective QA processes and maintaining comprehensive test coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Experience Section */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-white mb-8 pb-2 border-b border-gray-700">
              Work Experiences
            </h2>
            
            <div className="space-y-4">
              {experience.map((company) => (
                <div key={company.id} className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
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
            
            {/* Education Section */}
            <h2 className="text-2xl font-bold text-white mb-8 mt-12 pb-2 border-b border-gray-700">
              Education
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200 p-5">
                  <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                  <p className="text-yellow-400 text-sm mt-1">{edu.degree}, {edu.field}</p>
                  <div className="flex justify-between items-center mt-2 mb-3">
                    <span className="text-gray-400 text-sm">{edu.period}</span>
                    <span className="text-gray-400 text-sm">{edu.location}</span>
                  </div>
                  
                  {edu.achievements.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300 flex items-start text-sm leading-relaxed">
                          <span className="text-yellow-400 mr-2 mt-1 text-xs flex-shrink-0">●</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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

            {/* Languages */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                Languages
              </h2>
              
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{lang.language}</span>
                      <span className="text-gray-400 text-xs">{lang.proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full" 
                        style={{ width: `${lang.level}%` }}
                      ></div>
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
              
              <div className="flex flex-col gap-4">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/feraldy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span>linkedin.com/in/feraldy</span>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/Feraldy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span>github.com/Feraldy</span>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/6285156865396" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                  </div>
                  <span>+62 851-5686-5396</span>
                </a>

                {/* Email */}
                <a 
                  href="mailto:fn.archived@gmail.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>fn.archived@gmail.com</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/feraldy99" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span>@feraldy99</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </TerminalLayout>
    </>
  );
};

export default Resume;