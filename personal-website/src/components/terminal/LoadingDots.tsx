import React from 'react';

interface LoadingDotsProps {
  text?: string;
  className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ 
  text = "Loading", 
  className = "text-purple-400" 
}) => {
  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">
        <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
      </span>
    </span>
  );
};

export default LoadingDots;