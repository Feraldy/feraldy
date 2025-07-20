import React from 'react';
import ContactList from './ContactList';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-700 py-4 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-left mb-4 md:mb-0">
            <a href="/" className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-2 inline-block">
              Feraldy
            </a>
            <div>
              <p className="text-gray-400 text-sm">
                © {currentYear} Feraldy. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
          
          <div>
            <ContactList iconSize="small" showLabels={false} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;