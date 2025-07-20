import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../components/TypewriterText';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const LandingPage: React.FC = () => {

  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'whoami-typing' | 'whoami-enter' | 'whoami-response' | 'welcome-text' | 'about-typing' | 'about-enter' | 'about-response' | 'navigation'>('initial');
  const [appAnimationStage, setAppAnimationStage] = useState<'tiny' | 'opened'>('tiny');
  const [processingCommand, setProcessingCommand] = useState(false);
  const [currentProcessingCommand, setCurrentProcessingCommand] = useState('');

  useEffect(() => {
    // Start the smooth opening animation after a brief delay
    setTimeout(() => {
      setAppAnimationStage('opened');
    }, 500);
    
    // Content ready, start typing after animation completes
    setTimeout(() => {
      setShowTypewriter(true);
    }, 2500);
  }, []);

  // Welcome text lines
  const welcomeLines = [
    "Hi, I'm Feraldy Nathanael!",
    "Welcome to My Terminal Portfolio v1.0.0",
    "Thanks for visiting and let's connect!"
  ];

  // Handle animation sequence
  useEffect(() => {
    if (!showTypewriter) return;

    const timers: NodeJS.Timeout[] = [];

    // Start with whoami command
    if (animationPhase === 'initial') {
      const timer = setTimeout(() => {
        setAnimationPhase('whoami-typing');
      }, 800);
      timers.push(timer);
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [showTypewriter, animationPhase]);

  // Handle typewriter completion
  const handleTypingComplete = () => {
    if (animationPhase === 'whoami-typing') {
      // Show Enter key press after typing completes
      setTimeout(() => {
        setAnimationPhase('whoami-enter');
      }, 1);
    } else if (animationPhase === 'about-typing') {
      // Show Enter key press after typing completes
      setTimeout(() => {
        setAnimationPhase('about-enter');
      }, 1);
    }
  };

  // Handle phase transitions
  useEffect(() => {
    if (animationPhase === 'whoami-enter') {
      // Show response after Enter key press
      const timer = setTimeout(() => {
        setAnimationPhase('whoami-response');
      }, 1);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'whoami-response') {
      // Show welcome text after whoami response
      const timer = setTimeout(() => {
        setAnimationPhase('welcome-text');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'welcome-text') {
      // Continue to about.txt command after welcome text
      const timer = setTimeout(() => {
        setAnimationPhase('about-typing');
      }, 3000);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'about-enter') {
      // Show response after Enter key press
      const timer = setTimeout(() => {
        setAnimationPhase('about-response');
      }, 300);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'about-response') {
      // Show navigation after about response
      const timer = setTimeout(() => {
        setAnimationPhase('navigation');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  // Handle command processing animation
  const handleCommandClick = (command: string, path: string) => {
    setProcessingCommand(true);
    setCurrentProcessingCommand(command);
    
    // Simulate command processing
    setTimeout(() => {
      setProcessingCommand(false);
      navigate(path);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Using Formspree for form handling (free service)
      const response = await fetch('https://formspree.io/f/mldldoqa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New contact from ${formData.name} - Portfolio Website`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowContactForm(false);
          setSubmitStatus('');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <SEO 
        title="Feraldy - Developer, Designer, Creator"
        description="Personal website of Feraldy, a passionate developer creating beautiful, functional, and user-friendly digital experiences."
      />
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 pt-16 md:pt-20">
        <div className="flex items-center justify-center w-full">
          {/* Terminal Window */}
          <div 
            className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl w-full max-w-4xl mx-auto transition-all duration-1000 ease-out ${
              appAnimationStage === 'tiny' 
                ? 'scale-0 opacity-0' 
                : 'scale-100 opacity-100'
            }`}
            style={{
              transformOrigin: 'center center',
              height: 'clamp(400px, 70vh, 600px)',
              filter: appAnimationStage === 'opened'
                ? 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))' 
                : 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))',
              willChange: 'transform, opacity, filter'
            }}
          >
            {/* Terminal Header */}
            {appAnimationStage !== 'tiny' && (
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">feraldy@portfolio ~ </div>
                <div className="w-4"></div>
              </div>
            )}
            
            {/* Terminal Content */}
            {appAnimationStage === 'opened' && (
              <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm md:text-base text-gray-300 overflow-hidden flex flex-col" style={{ height: 'calc(100% - 60px)' }}>
              {showTypewriter && (
                <div className="space-y-2 flex-1 flex flex-col">
                  {/* Initial welcome header */}
                  <div className="pb-2 border-b border-gray-700">
                    <p className="text-green-400">Welcome to Feraldy's Terminal Portfolio v1.0.0</p>
                    <p className="text-gray-400 text-xs mt-1">Type 'help' for available commands</p>
                  </div>
                  
                  {/* Initial prompt with blinking cursor */}
                  {animationPhase === 'initial' && (
                    <div className="flex">
                      <span className="text-blue-400 mr-2">$</span>
                      <span className="animate-pulse text-yellow-400 font-bold">|</span>
                    </div>
                  )}
                  
                  {/* whoami command */}
                  {(animationPhase === 'whoami-typing' || animationPhase === 'whoami-enter' || animationPhase === 'whoami-response' || animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="text-blue-400 mr-2">$</span>
                        <span>
                          {animationPhase === 'whoami-typing' ? (
                            <TypewriterText 
                              texts={['whoami']}
                              delay={80}
                              typeOnce={true}
                              onComplete={handleTypingComplete}
                            />
                          ) : (
                            'whoami'
                          )}
                          {animationPhase === 'whoami-enter' && (
                            <span className="text-green-400 ml-2 animate-pulse">↵</span>
                          )}
                        </span>
                      </div>
                      
                       {/* whoami response */}
                       {(animationPhase === 'whoami-response' || animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                         <div className="pl-3 sm:pl-4">
                           
                         </div>
                       )}                    </div>
                  )}
                  
                  {/* Welcome text display */}
                  {(animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                     <div className="-mt-1 space-y-1 pl-3 sm:pl-4 border-l-2 border-yellow-400">
                       {welcomeLines.map((line, index) => (
                        <p key={index} className="text-yellow-300">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {/* cat about.txt command */}
                  {(animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="text-blue-400 mr-2">$</span>
                        <span>
                          {animationPhase === 'about-typing' ? (
                            <TypewriterText 
                              texts={['cat about.txt']}
                              delay={80}
                              typeOnce={true}
                              onComplete={handleTypingComplete}
                            />
                          ) : (
                            'cat about.txt'
                          )}
                          {animationPhase === 'about-enter' && (
                            <span className="text-green-400 ml-2 animate-pulse">↵</span>
                          )}
                        </span>
                      </div>
                      
                       {/* about.txt response */}
                       {(animationPhase === 'about-response' || animationPhase === 'navigation') && (
                         <div className="pl-3 sm:pl-4">
                           Hi, I am a dedicated Software QA Engineer with nearly 3 years of experience specializing in both manual and automation testing using tools like Playwright, TypeScript, and Python. I excel in designing and executing comprehensive test cases, improving test processes, and fostering collaboration between development and product teams to ensure high-quality software delivery.
                         </div>
                       )}                    </div>
                  )}
                  
                  {/* Navigation prompt */}
                  {animationPhase === 'navigation' && !processingCommand && (
                    <div>
                      <div className="flex">
                        <span className="text-blue-400 mr-2">$</span>
                        <span className="relative">
                          explore
                          <span className="animate-pulse text-yellow-400 ml-1 font-bold">|</span>
                        </span>
                      </div>
                      
                      {/* Navigation links */}
                      <div className="mt-3 sm:mt-4 pl-2 sm:pl-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <button 
                          onClick={() => handleCommandClick('cd ./projects', '/projects')}
                          className="text-left px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
                          disabled={processingCommand}
                        >
                          <span className="text-yellow-400">cd</span> <span className="text-blue-400">./projects</span>
                        </button>
                        
                        <button 
                          onClick={() => handleCommandClick('cd ./resume', '/resume')}
                          className="text-left px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
                          disabled={processingCommand}
                        >
                          <span className="text-yellow-400">cd</span> <span className="text-blue-400">./resume</span>
                        </button>
                        
                        <button 
                          onClick={() => handleCommandClick('cd ./photography', '/photography')}
                          className="text-left px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
                          disabled={processingCommand}
                        >
                          <span className="text-yellow-400">cd</span> <span className="text-blue-400">./photography</span>
                        </button>
                        
                        <button 
                          onClick={() => handleCommandClick('cd ./blog', '/blog')}
                          className="text-left px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
                          disabled={processingCommand}
                        >
                          <span className="text-yellow-400">cd</span> <span className="text-blue-400">./blog</span>
                        </button>
                        
                        <button 
                          onClick={() => setShowContactForm(true)}
                          className="text-left px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200 col-span-1 sm:col-span-2 disabled:opacity-50 text-sm sm:text-base"
                          disabled={processingCommand}
                        >
                          <span className="text-yellow-400">run</span> <span className="text-blue-400">./contact.sh</span>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Command processing animation */}
                  {processingCommand && (
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="text-blue-400 mr-2">$</span>
                        <span>{currentProcessingCommand}</span>
                        <span className="text-green-400 ml-2">↵</span>
                      </div>
                      <div className="pl-4 flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-gray-400">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div id="contact" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Form header */}
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="text-green-400 text-sm text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-400 text-sm text-center">
                  Failed to send message. Please try again or email me directly at fn.archived@gmail.com
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;