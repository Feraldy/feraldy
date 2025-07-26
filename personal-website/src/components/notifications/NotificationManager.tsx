import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MacNotification from './MacNotification';
import { 
  NotificationConfig, 
  NotificationAction, 
  NotificationTriggerContext,
  getTriggeredNotifications 
} from './notificationConfig';

interface NotificationManagerProps {
  onExecuteCommand?: (command: string) => void;
  onOpenContact?: () => void;
  commandsTyped: number;
  invalidCommands: number;
  exploredCommands: Set<string>;
  isTypingAnimationComplete: boolean;
}

interface NotificationState {
  shown: Set<string>;
  lastShown: Map<string, number>;
  showCount: Map<string, number>;
}

interface ActiveNotification {
  id: string;
  notification: NotificationConfig;
  isVisible: boolean;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({
  onExecuteCommand,
  onOpenContact,
  commandsTyped,
  invalidCommands,
  exploredCommands,
  isTypingAnimationComplete
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeNotifications, setActiveNotifications] = useState<ActiveNotification[]>([]);
  const [notificationState, setNotificationState] = useState<NotificationState>({
    shown: new Set(),
    lastShown: new Map(),
    showCount: new Map()
  });
  
  const [context, setContext] = useState<NotificationTriggerContext>({
    timeOnPage: 0,
    commandsTyped: 0,
    invalidCommands: 0,
    lastActivity: Date.now(),
    hasSeenWelcome: false,
    deviceType: 'desktop',
    exploredCommands: new Set(),
    currentPath: location.pathname
  });

  // Detect device type
  useEffect(() => {
    const detectDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    setContext(prev => ({
      ...prev,
      deviceType: detectDeviceType()
    }));

    const handleResize = () => {
      setContext(prev => ({
        ...prev,
        deviceType: detectDeviceType()
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update context with props
  useEffect(() => {
    setContext(prev => ({
      ...prev,
      commandsTyped,
      invalidCommands,
      exploredCommands,
      currentPath: location.pathname
    }));
  }, [commandsTyped, invalidCommands, exploredCommands, location.pathname]);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setContext(prev => ({
        ...prev,
        timeOnPage: Date.now() - startTime
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update last activity
  const updateActivity = useCallback(() => {
    setContext(prev => ({
      ...prev,
      lastActivity: Date.now()
    }));
  }, []);

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, [updateActivity]);

  // Check for triggered notifications
  useEffect(() => {
    if (!isTypingAnimationComplete) return; // Don't show notifications until typing animation is complete

    const triggeredNotifications = getTriggeredNotifications(context);
    
    for (const trigger of triggeredNotifications) {
      const { id, notification, cooldown = 0, maxShows = Infinity } = trigger;
      
      // Check if already active
      if (activeNotifications.some(active => active.id === id)) continue;
      
      // Check if already shown too many times
      const showCount = notificationState.showCount.get(id) || 0;
      if (showCount >= maxShows) continue;
      
      // Check cooldown
      const lastShown = notificationState.lastShown.get(id) || 0;
      if (Date.now() - lastShown < cooldown) continue;
      
      // Add notification to active list
      const newNotification: ActiveNotification = {
        id,
        notification,
        isVisible: true
      };
      
      setActiveNotifications(prev => [...prev, newNotification]);
      
      // Update state
      setNotificationState(prev => ({
        shown: new Set([...prev.shown, id]),
        lastShown: new Map([...prev.lastShown, [id, Date.now()]]),
        showCount: new Map([...prev.showCount, [id, showCount + 1]])
      }));
      
      // Mark welcome as seen if this is the welcome notification
      if (id === 'welcome') {
        setContext(prev => ({ ...prev, hasSeenWelcome: true }));
      }
      
      // Limit to 3 notifications max to avoid overwhelming
      if (activeNotifications.length >= 2) break;
    }
  }, [context, activeNotifications, notificationState, isTypingAnimationComplete]);

  const handleAction = (notificationId: string, action: NotificationAction) => {
    switch (action.type) {
      case 'command':
        onExecuteCommand?.(action.value);
        break;
      case 'route':
        navigate(action.value);
        break;
      case 'action':
        handleCustomAction(action.value);
        break;
    }
    
    // Dismiss notification after action
    handleDismiss(notificationId);
  };

  const handleCustomAction = (actionValue: string) => {
    switch (actionValue) {
      case 'openContact':
        onOpenContact?.();
        break;
      case 'downloadResume':
        // Trigger resume download
        window.open('/resume', '_blank');
        break;
      case 'startTour':
        // Could implement a guided tour
        onExecuteCommand?.('help');
        break;
      case 'showMobileMenu':
        // Could show a mobile-friendly navigation
        navigate('/projects');
        break;
      case 'dismiss':
        // Just dismiss
        break;
      default:
        console.log('Unknown action:', actionValue);
    }
  };

  const handleDismiss = (notificationId: string) => {
    // First hide the notification
    setActiveNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isVisible: false }
          : notification
      )
    );
    
    // Then remove it after animation completes
    setTimeout(() => {
      setActiveNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );
    }, 1000); // Wait for animation to complete
  };

  if (activeNotifications.length === 0) return null;

  return (
    <>
      {activeNotifications.map((activeNotification, index) => (
        <MacNotification
          key={activeNotification.id}
          notification={activeNotification.notification}
          onAction={(action) => handleAction(activeNotification.id, action)}
          onDismiss={() => handleDismiss(activeNotification.id)}
          isVisible={activeNotification.isVisible}
          stackIndex={index}
        />
      ))}
    </>
  );
};

export default NotificationManager;