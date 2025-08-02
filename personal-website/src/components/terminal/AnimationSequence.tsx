import React from 'react';
import TypewriterText from '../TypewriterText';
import { ANIMATION_PHASES, TYPEWRITER_SETTINGS, AnimationPhase } from '../../utils/constants';

interface AnimationSequenceProps {
  animationPhase: AnimationPhase;
  onTypingComplete: () => void;
  showSkipHint: boolean;
}

const AnimationSequence: React.FC<AnimationSequenceProps> = ({
  animationPhase,
  onTypingComplete,
  showSkipHint
}) => {
  return (
    <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 space-y-2">
      {/* Initial welcome header */}
      <div className="pb-2 border-b border-gray-700">
        <p className="text-green-400">Welcome to Feraldy's Terminal Portfolio v1.0.0</p>
        <p className="text-gray-400 text-xs mt-1">Type 'help' for available commands</p>
      </div>
      
      {/* Initial prompt with blinking cursor */}
      {animationPhase === ANIMATION_PHASES.INITIAL && (
        <div className="flex items-center">
          <span className="text-cyan-400">feraldy@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="terminal-cursor text-yellow-400 font-bold ml-2">|</span>
        </div>
      )}
      
      {/* whoami command */}
      {(animationPhase === ANIMATION_PHASES.WHOAMI_TYPING || 
        animationPhase === ANIMATION_PHASES.WHOAMI_ENTER || 
        animationPhase === ANIMATION_PHASES.WHOAMI_RESPONSE || 
        animationPhase === ANIMATION_PHASES.WELCOME_TEXT || 
        animationPhase === ANIMATION_PHASES.ABOUT_TYPING || 
        animationPhase === ANIMATION_PHASES.ABOUT_ENTER || 
        animationPhase === ANIMATION_PHASES.ABOUT_RESPONSE || 
        animationPhase === ANIMATION_PHASES.NAVIGATION) && (
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="text-cyan-400">feraldy@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="ml-2">
              {animationPhase === ANIMATION_PHASES.WHOAMI_TYPING ? (
                <TypewriterText 
                  texts={['whoami']}
                  delay={TYPEWRITER_SETTINGS.DELAY}
                  typeOnce={TYPEWRITER_SETTINGS.TYPE_ONCE}
                  onComplete={onTypingComplete}
                />
              ) : (
                <span className="text-gray-100">whoami</span>
              )}
              {animationPhase === ANIMATION_PHASES.WHOAMI_ENTER && (
                <span className="text-green-400 ml-2 animate-pulse">↵</span>
              )}
            </span>
          </div>
          
          {/* whoami response */}
          {(animationPhase === ANIMATION_PHASES.WHOAMI_RESPONSE || 
            animationPhase === ANIMATION_PHASES.WELCOME_TEXT || 
            animationPhase === ANIMATION_PHASES.ABOUT_TYPING || 
            animationPhase === ANIMATION_PHASES.ABOUT_ENTER || 
            animationPhase === ANIMATION_PHASES.ABOUT_RESPONSE || 
            animationPhase === ANIMATION_PHASES.NAVIGATION) && (
            <div className="-mt-1 space-y-1 text-gray-200">feraldy - Test Engineer & Project Manager</div>
          )}
        </div>
      )}
      
      {/* Welcome text display */}
      {(animationPhase === ANIMATION_PHASES.WELCOME_TEXT || 
        animationPhase === ANIMATION_PHASES.ABOUT_TYPING || 
        animationPhase === ANIMATION_PHASES.ABOUT_ENTER || 
        animationPhase === ANIMATION_PHASES.ABOUT_RESPONSE || 
        animationPhase === ANIMATION_PHASES.NAVIGATION) && (
        <div className="-mt-1 space-y-1 pl-3 sm:pl-4 border-l-2 border-yellow-400">
          <p className="text-yellow-300">Hi, I'm Feraldy Nathanael!</p>
          <p className="text-yellow-300">Welcome to My Terminal Portfolio v1.0.0</p>
          <p className="text-yellow-300">Thanks for visiting and let's connect!</p>
        </div>
      )}

      {/* cat about.txt command */}
      {(animationPhase === ANIMATION_PHASES.ABOUT_TYPING || 
        animationPhase === ANIMATION_PHASES.ABOUT_ENTER || 
        animationPhase === ANIMATION_PHASES.ABOUT_RESPONSE || 
        animationPhase === ANIMATION_PHASES.NAVIGATION) && (
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="text-cyan-400">feraldy@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="ml-2">
              {animationPhase === ANIMATION_PHASES.ABOUT_TYPING ? (
                <TypewriterText 
                  texts={['cat about.txt']}
                  delay={TYPEWRITER_SETTINGS.DELAY}
                  typeOnce={TYPEWRITER_SETTINGS.TYPE_ONCE}
                  onComplete={onTypingComplete}
                />
              ) : (
                <span className="text-gray-100">cat about.txt</span>
              )}
              {animationPhase === ANIMATION_PHASES.ABOUT_ENTER && (
                <span className="text-green-400 ml-2 animate-pulse">↵</span>
              )}
            </span>
          </div>
          
          {/* about.txt response */}
          {(animationPhase === ANIMATION_PHASES.ABOUT_RESPONSE || 
            animationPhase === ANIMATION_PHASES.NAVIGATION) && (
            <div className="ml-0 font-mono text-gray-200">
              Hi, I am a passionate Test Engineer and Project Manager with over 3 years of experience in quality assurance and product development. I specialize in implementing effective QA processes, maintaining comprehensive test coverage with tools like Playwright and Qase.io, and managing product documentation to bridge the gap between technical and product teams.
            </div>
          )}
        </div>
      )}
      
      {/* Skip Animation Hint */}
      {showSkipHint && animationPhase !== ANIMATION_PHASES.NAVIGATION && (
        <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 shadow-lg animate-pulse">
          <p className="text-yellow-400 text-sm font-mono">
            Press <span className="bg-gray-700 px-2 py-1 rounded text-white">Enter</span> or <span className="bg-gray-700 px-2 py-1 rounded text-white">Click</span> to skip
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimationSequence;