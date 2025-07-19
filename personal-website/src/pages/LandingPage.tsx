import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';
import TypewriterText from '../components/TypewriterText';
import Navbar from '../components/Navbar';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    // Start typewriter after initial fade-in
    setTimeout(() => {
      setShowTypewriter(true);
    }, 1500);
  }, []);

  const roles = ['Developer', 'Designer', 'Creator'];
  const randomWords = ['Coder', 'Builder', 'Maker', 'Thinker', 'Artist', 'Dreamer', 'Innovator', 'Visionary', 'Engineer', 'Architect'];
  
  const [currentRole, setCurrentRole] = useState(0);
  const [displayWord, setDisplayWord] = useState('');
  const [isChanging, setIsChanging] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);

  const startAnimation = () => {
    setIsChanging(true);
    
    // Fast random word changing phase
    let changeCount = 0;
    const fastChange = setInterval(() => {
      setDisplayWord(randomWords[Math.floor(Math.random() * randomWords.length)]);
      changeCount++;
      
      if (changeCount >= 8) { // Change 8 times quickly
        clearInterval(fastChange);
        // Settle on the target word
        setTimeout(() => {
          setDisplayWord(roles[currentRole]);
          setIsChanging(false);
        }, 100);
      }
    }, 80); // Very fast changes (80ms)
  };

  useEffect(() => {
    // Start animation immediately on page load
    const initialTimeout = setTimeout(() => {
      startAnimation();
    }, 1000); // Start after 1 second

    // Then continue with regular intervals
    const interval = setInterval(() => {
      const nextRole = (currentRole + 1) % roles.length;
      setCurrentRole(nextRole);
      
      setTimeout(() => {
        startAnimation();
      }, 100);
    }, 4000); // Start new cycle every 4 seconds
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [currentRole]);

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
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 pt-16 md:pt-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main heading with typewriter animation */}
        <div className="mb-4 py-4 md:py-6">
          <div className="min-h-[200px] md:min-h-[300px] flex flex-col justify-center">
            {showTypewriter && (
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-2 md:mb-4">
                <TypewriterText 
                  texts={[
                    "Hello, I'm Feraldy!",
                    "Welcome to my persnoal website!",
                    "Welcome to my personal website!",
                    "Thanks for vistiing! lets connect!",
                    "Thanks for visiting! lets connect!"
                  ]}
                  delay={100}
                  deleteDelay={50}
                  pauseTime={4000}
                  typeOnce={false}
                />
              </h1>
            )}
          </div>
        </div>

        {/* Rotating role text */}
        <div className="mb-8 md:mb-12 h-16 md:h-24 flex items-center justify-center py-2 md:py-4">
          <p 
            className={`text-lg sm:text-xl md:text-2xl lg:text-4xl text-gray-300 transition-all duration-1000 px-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            I'm a{' '}
            <span className="relative inline-block w-28 sm:w-32 md:w-36 lg:w-44 text-center" style={{ lineHeight: '1.4' }}>
              <span 
                className={`absolute inset-0 text-center text-transparent font-semibold transition-all duration-75 ${
                  isChanging 
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text' 
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text'
                }`}
                style={{ lineHeight: '1.4' }}
              >
                {displayWord}
              </span>
              <span className="text-transparent select-none" style={{ lineHeight: '1.4' }}>
                Innovator
              </span>
            </span>
          </p>
        </div>

        {/* Description */}
        <div 
          className={`mb-8 md:mb-12 px-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating beautiful, functional, and user-friendly digital experiences.
            Let's build something amazing together.
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          <button 
            onClick={() => navigate('/projects')}
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            View My Projects
          </button>
          <button 
            onClick={() => setShowContactForm(true)}
            className="px-6 md:px-8 py-3 md:py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-blue-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
          >
            Get In Touch
          </button>
        </div>

        {/* Social Media Icons */}
        <div 
          className={`flex gap-4 md:gap-6 justify-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/feraldy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/Feraldy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/6285156865396" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </a>

          {/* Email */}
          <a 
            href="mailto:fn.archived@gmail.com" 
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-300 hover:text-gray-900 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/feraldy99" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        {/* Minimal particles for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
          <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse" style={{ top: '20%', left: '15%', animationDuration: '3s' }}></div>
          <div className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-25 animate-pulse" style={{ bottom: '30%', right: '20%', animationDuration: '4s' }}></div>
        </div>

        {/* Minimal particles for desktop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          
          {/* Key accent particles only */}
          <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{ top: '20%', left: '20%', animationDuration: '3s' }}></div>
          <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-35 animate-pulse" style={{ top: '25%', right: '25%', animationDuration: '4s' }}></div>
          <div className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" style={{ bottom: '30%', left: '25%', animationDuration: '5s' }}></div>
          <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 animate-pulse" style={{ bottom: '35%', right: '30%', animationDuration: '3.5s' }}></div>

          {/* Very subtle corner accents */}
          <div className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20 animate-pulse" style={{ top: '15%', left: '10%', animationDuration: '6s' }}></div>
          <div className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20 animate-pulse" style={{ top: '15%', right: '10%', animationDuration: '7s' }}></div>
          <div className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20 animate-pulse" style={{ bottom: '20%', left: '15%', animationDuration: '5.5s' }}></div>
          <div className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20 animate-pulse" style={{ bottom: '20%', right: '15%', animationDuration: '4.5s' }}></div>

        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
      </div>
    </div>
  );
};

export default LandingPage;