import { useState, useEffect } from 'react';
import { ANIMATION_PHASES, ANIMATION_TIMINGS, LOCAL_STORAGE_KEYS, AnimationPhase, AppAnimationStage, APP_ANIMATION_STAGES } from '../utils/constants';

export const useAnimationSequence = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(ANIMATION_PHASES.INITIAL);
  const [appAnimationStage, setAppAnimationStage] = useState<AppAnimationStage>(APP_ANIMATION_STAGES.TINY);
  const [animationSkipped, setAnimationSkipped] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_SEEN_ANIMATION) === 'true';
    
    // Start the smooth opening animation after a brief delay
    setTimeout(() => {
      setAppAnimationStage(APP_ANIMATION_STAGES.OPENED);
    }, ANIMATION_TIMINGS.APP_OPENING_DELAY);
    
    // Content ready, start typing after animation completes
    setTimeout(() => {
      setShowTypewriter(true);
      
      // If user has seen animation before, skip directly to navigation
      if (hasSeenAnimation) {
        setAnimationPhase(ANIMATION_PHASES.NAVIGATION);
        setAnimationSkipped(true);
      } else {
        // Show skip hint after a brief delay
        setTimeout(() => {
          setShowSkipHint(true);
        }, ANIMATION_TIMINGS.SKIP_HINT_DELAY);
      }
    }, ANIMATION_TIMINGS.TYPEWRITER_START_DELAY);
  }, []);

  // Handle animation sequence
  useEffect(() => {
    if (!showTypewriter || animationSkipped) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Start with whoami command
    if (animationPhase === ANIMATION_PHASES.INITIAL) {
      const timer = setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.WHOAMI_TYPING);
      }, ANIMATION_TIMINGS.WHOAMI_START_DELAY);
      timers.push(timer);
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [showTypewriter, animationPhase, animationSkipped]);

  // Handle phase transitions
  useEffect(() => {
    if (animationSkipped) return;

    if (animationPhase === ANIMATION_PHASES.WHOAMI_ENTER) {
      const timer = setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.WHOAMI_RESPONSE);
      }, ANIMATION_TIMINGS.WHOAMI_ENTER_DELAY);
      return () => clearTimeout(timer);
    } else if (animationPhase === ANIMATION_PHASES.WHOAMI_RESPONSE) {
      const timer = setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.WELCOME_TEXT);
      }, ANIMATION_TIMINGS.WELCOME_TEXT_DELAY);
      return () => clearTimeout(timer);
    } else if (animationPhase === ANIMATION_PHASES.WELCOME_TEXT) {
      const timer = setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.ABOUT_TYPING);
      }, ANIMATION_TIMINGS.ABOUT_TYPING_DELAY);
      return () => clearTimeout(timer);
    } else if (animationPhase === ANIMATION_PHASES.ABOUT_ENTER) {
      const timer = setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.ABOUT_RESPONSE);
      }, ANIMATION_TIMINGS.ABOUT_ENTER_DELAY);
      return () => clearTimeout(timer);
    } else if (animationPhase === ANIMATION_PHASES.ABOUT_RESPONSE) {
      const timer = setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.NAVIGATION);
        setShowSkipHint(false);
        localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_SEEN_ANIMATION, 'true');
      }, ANIMATION_TIMINGS.ABOUT_RESPONSE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [animationPhase, animationSkipped]);

  const skipAnimation = () => {
    if (animationPhase !== ANIMATION_PHASES.NAVIGATION) {
      setAnimationPhase(ANIMATION_PHASES.NAVIGATION);
      setAnimationSkipped(true);
      setShowSkipHint(false);
      localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_SEEN_ANIMATION, 'true');
    }
  };

  const handleTypingComplete = () => {
    if (animationPhase === ANIMATION_PHASES.WHOAMI_TYPING) {
      setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.WHOAMI_ENTER);
      }, ANIMATION_TIMINGS.WHOAMI_ENTER_DELAY);
    } else if (animationPhase === ANIMATION_PHASES.ABOUT_TYPING) {
      setTimeout(() => {
        setAnimationPhase(ANIMATION_PHASES.ABOUT_ENTER);
      }, ANIMATION_TIMINGS.WHOAMI_ENTER_DELAY);
    }
  };

  // Handle keyboard events for skipping
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && animationPhase !== ANIMATION_PHASES.NAVIGATION) {
        skipAnimation();
      }
    };

    const handleClick = () => {
      if (animationPhase !== ANIMATION_PHASES.NAVIGATION) {
        skipAnimation();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [animationPhase]);

  return {
    showTypewriter,
    animationPhase,
    appAnimationStage,
    animationSkipped,
    showSkipHint,
    skipAnimation,
    handleTypingComplete
  };
};