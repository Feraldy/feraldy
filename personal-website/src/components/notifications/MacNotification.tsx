import React, { useState, useEffect } from 'react';
import { NotificationConfig, NotificationAction } from './notificationConfig';

interface MacNotificationProps {
  notification: NotificationConfig;
  onAction: (action: NotificationAction) => void;
  onDismiss: () => void;
  isVisible: boolean;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  stackIndex?: number;
}

const MacNotification: React.FC<MacNotificationProps> = ({
  notification,
  onAction,
  onDismiss,
  isVisible,
  deviceType = 'desktop',
  stackIndex = 0,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isMobile = deviceType === 'mobile';

  // Handle entrance animation - slower and smoother
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Auto-dismiss timer (hidden from user)
  useEffect(() => {
    if (!isVisible || isPaused) return;

    // Use shorter duration on mobile for less intrusive experience
    const effectiveDuration = isMobile ? Math.min(notification.duration, 5000) : notification.duration;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (effectiveDuration / 100));
        if (newProgress <= 0) {
          onDismiss();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, isPaused, notification.duration, onDismiss, isMobile]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Handle mobile tap for primary action
  const handleMobileClick = () => {
    if (isMobile && notification.actions.length > 0) {
      onAction(notification.actions[0]);
    }
  };

  const getPriorityStyles = () => {
    // Use consistent gray border for all notifications (authentic Mac style)
    return 'border-gray-600 shadow-gray-600/20';
  };

  const getProgressColor = () => {
    switch (notification.priority) {
      case 'high':
        return 'bg-yellow-400';
      case 'medium':
        return 'bg-blue-400';
      case 'low':
        return 'bg-gray-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <div 
      className={`fixed z-50 transform transition-all duration-1000 ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      } ${isAnimating ? 'ease-out' : 'ease-in'}
      ${isMobile ? 'cursor-pointer' : ''}`}
      style={{
        top: `${1.25 + (stackIndex * (isMobile ? 3.2 : 11))}rem`, // Mobile: 3.5rem spacing, Desktop: 6.5rem spacing
        right: isMobile ? '0.5rem' : '1rem', // Standard right margins
        left: isMobile ? '0.5rem' : 'auto', // Mobile: full width with margins, Desktop: auto width
        transitionTimingFunction: isVisible 
          ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smoother ease-out
          : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', // Gentle ease-in
        transform: isVisible 
          ? 'translateX(0px) scale(1)' 
          : 'translateX(calc(100% + 1rem)) scale(0.95)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isMobile ? handleMobileClick : undefined}
    >
      <div 
        className={`bg-gray-800/95 backdrop-blur-md border shadow-2xl ${getPriorityStyles()}
        /* Desktop: Mac-style width and rounded corners */
        md:w-80 md:rounded-xl
        /* Mobile: Full width with mobile-style rounded corners and minimal height */
        w-full rounded-lg ${isMobile ? 'py-1' : ''}`}
        style={{
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
        }}
      >
        {isMobile ? (
          /* Mobile: Thin notification bar */
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-sm flex-shrink-0">{notification.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">
                  {notification.message.length > 50 
                    ? `${notification.message.substring(0, 50)}...` 
                    : notification.message}
                </p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-700/50 flex-shrink-0 ml-2"
              aria-label="Dismiss notification"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          /* Desktop: Full notification */
          <>
            {/* Notification header */}
            <div className="flex items-center justify-between md:p-3 p-2 border-b border-gray-700/50">
              <div className="flex items-center space-x-2">
                <span className="md:text-lg text-base">{notification.icon}</span>
                <div>
                  <h3 className="font-medium text-white md:text-sm text-xs">{notification.title}</h3>
                  <p className="text-xs text-gray-400 capitalize md:block hidden">{notification.type}</p>
                </div>
              </div>
              <button 
                onClick={onDismiss}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-700/50"
                aria-label="Dismiss notification"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Notification body */}
            <div className="md:p-3 p-2">
              <p className="text-gray-300 md:text-sm text-xs md:mb-3 mb-2 leading-relaxed">{notification.message}</p>
              
              {/* Action buttons */}
              {notification.actions.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-2">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => onAction(action)}
                      className={`md:px-3 px-2 md:py-1.5 py-1 md:text-xs text-xs font-medium rounded-md transition-all duration-200 flex-1 ${
                        index === 0
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Hidden progress bar for auto-dismiss - only for internal timing */}
        <div className="hidden">
          <div 
            className={`h-full transition-all duration-100 ease-linear ${getProgressColor()}`}
            style={{ 
              width: `${progress}%`,
              opacity: isPaused ? 0.5 : 1
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MacNotification;