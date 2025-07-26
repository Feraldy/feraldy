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
  const [commandHistory, setCommandHistory] = useState<Array<{command: string, output: string}>>([]);
  const [animationSkipped, setAnimationSkipped] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [currentStoryState, setCurrentStoryState] = useState<string | null>(null);


  useEffect(() => {
    // Check if user has seen animation before
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation') === 'true';
    
    // Start the smooth opening animation after a brief delay
    setTimeout(() => {
      setAppAnimationStage('opened');
    }, 500);
    
    // Content ready, start typing after animation completes
    setTimeout(() => {
      setShowTypewriter(true);
      
      // If user has seen animation before, skip directly to navigation
      if (hasSeenAnimation) {
        setAnimationPhase('navigation');
        setAnimationSkipped(true);
      } else {
        // Show skip hint after a brief delay
        setTimeout(() => {
          setShowSkipHint(true);
        }, 1000);
      }
    }, 2500);
  }, []);

  // Welcome text lines
  const welcomeLines = [
    "Hi, I'm Feraldy Nathanael!",
    "Welcome to My Terminal Portfolio v1.0.0",
    "Thanks for visiting and let's connect!"
  ];

  // Skip animation function
  const skipAnimation = () => {
    if (animationPhase !== 'navigation') {
      setAnimationPhase('navigation');
      setAnimationSkipped(true);
      setShowSkipHint(false);
      // Remember user preference
      localStorage.setItem('hasSeenAnimation', 'true');
    }
  };

  // Handle keyboard events for skipping
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && animationPhase !== 'navigation') {
        skipAnimation();
      }
    };

    const handleClick = () => {
      if (animationPhase !== 'navigation') {
        skipAnimation();
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [animationPhase]);

  // Handle animation sequence
  useEffect(() => {
    if (!showTypewriter || animationSkipped) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Start with whoami command
    if (animationPhase === 'initial') {
      const timer = setTimeout(() => {
        setAnimationPhase('whoami-typing');
      }, 800);
      timers.push(timer);
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [showTypewriter, animationPhase, animationSkipped]);

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
    if (animationSkipped) return;

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
        setShowSkipHint(false);
        // Mark animation as seen when it completes naturally
        localStorage.setItem('hasSeenAnimation', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [animationPhase, animationSkipped]);

  // Story System Types
  interface StoryChoice {
    text: string;
    next: string;
  }

  interface StoryNode {
    title: string;
    text: string;
    choices: Record<string, StoryChoice>;
  }

  const storyData: Record<string, StoryNode> = {
    start: {
      title: "🎓 Life After Graduation",
      text: `You've just graduated from university and are standing at a crossroads in your life. The world is full of possibilities, and you need to decide which direction to take your career and future...

Your <span class="text-yellow-400">business professor</span> has offered you an internship at a startup company - risky but potentially rewarding.
A <span class="text-red-400">family friend</span> works at a large corporation and can get you an interview for a stable entry-level position.
Your <span class="text-blue-400">university advisor</span> suggests continuing your education with graduate school or specialized training.

<span class="text-cyan-400">What path do you choose for your future?</span>`,
      choices: {
        'a': { text: 'Take the startup internship opportunity', next: 'startup_path' },
        'b': { text: 'Apply for the corporate position', next: 'corporate_path' },
        'c': { text: 'Continue your education', next: 'education_path' },
        'startup': { text: 'Take the startup internship opportunity', next: 'startup_path' },
        'corporate': { text: 'Apply for the corporate position', next: 'corporate_path' },
        'education': { text: 'Continue your education', next: 'education_path' }
      }
    },
    
    startup_path: {
      title: "🚀 The Startup Journey",
      text: `You decide to take the leap and join the startup. The office is a converted warehouse with ping pong tables, standing desks, and a coffee machine that never stops brewing. The energy is infectious, but the uncertainty is real.

After a few weeks, you're presented with three different opportunities within the company:
💼 Join the business development team - networking, sales, and client relationships
💻 Work with the product development team - building and improving the core product
📊 Help with marketing and growth - social media, analytics, and user acquisition

Each role offers different experiences and potential career paths...

<span class="text-cyan-400">Which area interests you most?</span>`,
      choices: {
        'a': { text: 'Focus on business development', next: 'business_adventure' },
        'b': { text: 'Join product development', next: 'product_quest' },
        'c': { text: 'Dive into marketing and growth', next: 'marketing_mystery' },
        'business': { text: 'Focus on business development', next: 'business_adventure' },
        'product': { text: 'Join product development', next: 'product_quest' },
        'marketing': { text: 'Dive into marketing and growth', next: 'marketing_mystery' }
      }
    },

    corporate_path: {
      title: "🏢 The Corporate Ladder",
      text: `You accept the position at the large corporation. The office building is impressive with its glass facade and modern amenities. You have a steady salary, health benefits, and a clear career progression path.

After your orientation period, you're given the opportunity to choose which department to focus on:
📈 Finance and accounting - managing budgets, financial analysis, and strategic planning
👥 Human resources - recruiting, employee development, and company culture
🎯 Operations and project management - coordinating teams and ensuring efficient workflows

Each department offers stability but different growth opportunities...

<span class="text-cyan-400">Which department aligns with your interests?</span>`,
      choices: {
        'a': { text: 'Pursue finance and accounting', next: 'finance_career' },
        'b': { text: 'Focus on human resources', next: 'hr_development' },
        'c': { text: 'Choose operations management', next: 'operations_path' },
        'finance': { text: 'Pursue finance and accounting', next: 'finance_career' },
        'hr': { text: 'Focus on human resources', next: 'hr_development' },
        'operations': { text: 'Choose operations management', next: 'operations_path' }
      }
    },

    education_path: {
      title: "📚 The Academic Journey",
      text: `You decide to continue your education and invest in your future knowledge and skills. The university campus feels familiar, but now you're here with a clearer purpose and direction.

You have several educational paths to consider:
🎓 Pursue a Master's degree in your field - deepening your expertise and opening doors to specialized careers
💼 Enroll in a professional certification program - gaining practical skills that employers value immediately
🌍 Apply for a study abroad program - experiencing different cultures while earning credits

Each option requires different commitments and offers unique benefits...

<span class="text-cyan-400">Which educational path appeals to you?</span>`,
      choices: {
        'a': { text: 'Pursue a Master\'s degree', next: 'masters_journey' },
        'b': { text: 'Get professional certifications', next: 'certification_path' },
        'c': { text: 'Study abroad', next: 'international_experience' },
        'masters': { text: 'Pursue a Master\'s degree', next: 'masters_journey' },
        'certification': { text: 'Get professional certifications', next: 'certification_path' },
        'abroad': { text: 'Study abroad', next: 'international_experience' }
      }
    },

    // Startup Path Adventures
    business_adventure: {
      title: "💼 Business Development Track",
      text: `You dive into the business development role, learning to build relationships with potential clients and partners. Your days are filled with networking events, client meetings, and strategic planning sessions.

After six months of solid performance, you're presented with three advancement opportunities:
💰 Lead a major client acquisition project - high pressure but potentially high reward
🤝 Manage strategic partnerships with other companies - building long-term relationships
📊 Head up market research and competitive analysis - becoming the company's industry expert

Each path could significantly shape your career trajectory...

<span class="text-cyan-400">Which opportunity excites you most?</span>`,
      choices: {
        'a': { text: 'Lead the client acquisition project', next: 'sales_success' },
        'b': { text: 'Manage strategic partnerships', next: 'partnership_leader' },
        'c': { text: 'Focus on market research', next: 'industry_expert' },
        'acquisition': { text: 'Lead the client acquisition project', next: 'sales_success' },
        'partnerships': { text: 'Manage strategic partnerships', next: 'partnership_leader' },
        'research': { text: 'Focus on market research', next: 'industry_expert' }
      }
    },

    product_quest: {
      title: "💻 Product Development Journey",
      text: `You join the product development team and immerse yourself in the world of user experience, feature planning, and technical implementation. You work closely with designers, engineers, and user researchers.

After proving yourself on several smaller projects, you're offered three specialization paths:
📱 User Experience (UX) Design - focusing on how users interact with the product
⚙️ Product Management - coordinating between teams and defining product strategy
🔧 Technical Implementation - working directly with engineers on feature development

Each specialization offers different challenges and career growth opportunities...

<span class="text-cyan-400">Which area matches your interests and strengths?</span>`,
      choices: {
        'a': { text: 'Specialize in UX Design', next: 'ux_designer' },
        'b': { text: 'Become a Product Manager', next: 'product_manager' },
        'c': { text: 'Focus on Technical Implementation', next: 'tech_specialist' },
        'ux': { text: 'Specialize in UX Design', next: 'ux_designer' },
        'pm': { text: 'Become a Product Manager', next: 'product_manager' },
        'technical': { text: 'Focus on Technical Implementation', next: 'tech_specialist' }
      }
    },

    island_mystery: {
      title: "🏝️ The Floating Island",
      text: `You cross the shimmering rainbow bridge to reach the floating island suspended in the clouds. Ancient magic keeps this mystical place aloft, and everything here seems touched by wonder.

Three magical locations await your exploration:
🌸 The Garden of Eternal Spring - where flowers bloom with healing magic
📚 The Library of Lost Knowledge - containing books from forgotten civilizations
🌙 The Moonwell - a pool that reflects not the sky, but other worlds

A graceful fairy appears: "Greetings, traveler. Each place holds ancient magic, but only those with pure intentions may claim its gifts..."

<span class="text-cyan-400">Where does your curiosity lead you?</span>`,
      choices: {
        'a': { text: 'Tend the magical garden', next: 'garden_ending' },
        'b': { text: 'Study in the ancient library', next: 'library_ending' },
        'c': { text: 'Gaze into the Moonwell', next: 'moonwell_ending' },
        'garden': { text: 'Tend the magical garden', next: 'garden_ending' },
        'library': { text: 'Study in the ancient library', next: 'library_ending' },
        'moonwell': { text: 'Gaze into the Moonwell', next: 'moonwell_ending' }
      }
    },

    // Corporate Path Adventures
    finance_career: {
      title: "📈 Finance and Strategic Planning",
      text: `You excel in the finance department, learning to analyze market trends, manage budgets, and provide strategic insights that drive business decisions. Your analytical skills and attention to detail are highly valued.

After two years of strong performance, you're offered three advancement opportunities:
💼 Senior Financial Analyst - leading major budget planning and financial forecasting
🏦 Investment Relations - working with investors and managing company funding
📊 Business Strategy Consultant - advising executives on major business decisions

Each role offers significant responsibility and career growth potential...

<span class="text-cyan-400">Which direction aligns with your career goals?</span>`,
      choices: {
        'a': { text: 'Become a Senior Financial Analyst', next: 'financial_expert' },
        'b': { text: 'Focus on Investment Relations', next: 'investment_specialist' },
        'c': { text: 'Pursue Business Strategy Consulting', next: 'strategy_consultant' },
        'analyst': { text: 'Become a Senior Financial Analyst', next: 'financial_expert' },
        'investment': { text: 'Focus on Investment Relations', next: 'investment_specialist' },
        'strategy': { text: 'Pursue Business Strategy Consulting', next: 'strategy_consultant' }
      }
    },

    hr_development: {
      title: "👥 Human Resources Excellence",
      text: `You thrive in the HR department, developing skills in recruitment, employee development, and organizational culture. You enjoy helping people grow in their careers and creating positive workplace environments.

After building a strong reputation, you're presented with three leadership opportunities:
🎯 Talent Acquisition Manager - leading recruitment and hiring strategies
📚 Learning and Development Director - designing training programs and career paths
🤝 Employee Relations Specialist - handling workplace culture and conflict resolution

Each path allows you to make a significant impact on people's professional lives...

<span class="text-cyan-400">Which HR specialization interests you most?</span>`,
      choices: {
        'a': { text: 'Lead Talent Acquisition', next: 'talent_leader' },
        'b': { text: 'Direct Learning and Development', next: 'learning_director' },
        'c': { text: 'Specialize in Employee Relations', next: 'culture_champion' },
        'talent': { text: 'Lead Talent Acquisition', next: 'talent_leader' },
        'learning': { text: 'Direct Learning and Development', next: 'learning_director' },
        'relations': { text: 'Specialize in Employee Relations', next: 'culture_champion' }
      }
    },

    operations_path: {
      title: "🎯 Operations and Project Management",
      text: `You excel in operations, learning to coordinate complex projects, optimize workflows, and ensure teams work efficiently together. Your organizational skills and leadership abilities shine through.

After successfully managing several major projects, you're offered three senior positions:
🚀 Operations Director - overseeing all company operations and efficiency initiatives
📋 Senior Project Manager - leading the most critical and high-visibility projects
⚙️ Process Improvement Specialist - analyzing and optimizing business processes

Each role offers the opportunity to make a significant impact on company success...

<span class="text-cyan-400">Which operations role excites you most?</span>`,
      choices: {
        'a': { text: 'Become Operations Director', next: 'operations_leader' },
        'b': { text: 'Lead as Senior Project Manager', next: 'project_expert' },
        'c': { text: 'Focus on Process Improvement', next: 'efficiency_expert' },
        'director': { text: 'Become Operations Director', next: 'operations_leader' },
        'project': { text: 'Lead as Senior Project Manager', next: 'project_expert' },
        'process': { text: 'Focus on Process Improvement', next: 'efficiency_expert' }
      }
    },

    // Education Path Adventures
    masters_journey: {
      title: "🎓 Graduate School Excellence",
      text: `You pursue your Master's degree with dedication and passion. The advanced coursework challenges you intellectually, and you develop deep expertise in your chosen field while building valuable relationships with professors and peers.

As you near graduation, three exciting opportunities present themselves:
🔬 Research and Academia - pursuing a PhD and potentially becoming a professor
🏢 Industry Leadership - joining a company in a senior role with your advanced degree
💼 Entrepreneurship - starting your own business using your specialized knowledge

Each path leverages your education in different ways...

<span class="text-cyan-400">How do you want to apply your advanced education?</span>`,
      choices: {
        'a': { text: 'Pursue Research and Academia', next: 'academic_researcher' },
        'b': { text: 'Enter Industry Leadership', next: 'industry_leader' },
        'c': { text: 'Start Your Own Business', next: 'entrepreneur' },
        'research': { text: 'Pursue Research and Academia', next: 'academic_researcher' },
        'industry': { text: 'Enter Industry Leadership', next: 'industry_leader' },
        'business': { text: 'Start Your Own Business', next: 'entrepreneur' }
      }
    },

    certification_path: {
      title: "💼 Professional Certification Success",
      text: `You complete several valuable professional certifications that make you highly marketable to employers. Your practical skills and industry-recognized credentials open many doors.

With your new qualifications, you receive three attractive job offers:
🏥 Healthcare Technology - working with cutting-edge medical systems and patient care
🏭 Manufacturing and Engineering - optimizing production processes and quality control
💻 Technology Consulting - helping businesses implement and optimize their tech solutions

Each industry offers different challenges and growth opportunities...

<span class="text-cyan-400">Which industry appeals to your interests and skills?</span>`,
      choices: {
        'a': { text: 'Enter Healthcare Technology', next: 'healthcare_specialist' },
        'b': { text: 'Join Manufacturing and Engineering', next: 'manufacturing_expert' },
        'c': { text: 'Pursue Technology Consulting', next: 'tech_consultant' },
        'healthcare': { text: 'Enter Healthcare Technology', next: 'healthcare_specialist' },
        'manufacturing': { text: 'Join Manufacturing and Engineering', next: 'manufacturing_expert' },
        'consulting': { text: 'Pursue Technology Consulting', next: 'tech_consultant' }
      }
    },

    international_experience: {
      title: "🌍 Study Abroad Adventure",
      text: `You spend a transformative year studying abroad, immersing yourself in a different culture while earning academic credits. You develop language skills, cultural awareness, and a global perspective that sets you apart.

Upon returning, you're presented with three unique opportunities that value your international experience:
🌐 International Business - working with global companies and cross-cultural teams
🎓 Cultural Education - teaching or working in international education programs
🤝 Diplomatic Services - working with government agencies or international organizations

Each path leverages your global perspective and cultural competency...

<span class="text-cyan-400">How do you want to use your international experience?</span>`,
      choices: {
        'a': { text: 'Pursue International Business', next: 'global_business' },
        'b': { text: 'Work in Cultural Education', next: 'education_specialist' },
        'c': { text: 'Join Diplomatic Services', next: 'diplomat' },
        'global': { text: 'Pursue International Business', next: 'global_business' },
        'education': { text: 'Work in Cultural Education', next: 'education_specialist' },
        'diplomatic': { text: 'Join Diplomatic Services', next: 'diplomat' }
      }
    },

    // Endings
    sales_success: {
      title: "💰 Sales Director",
      text: `Your client acquisition project exceeds all expectations, bringing in major contracts that significantly boost company revenue. Your natural ability to build relationships and close deals gets noticed by senior leadership.

Within three years, you're promoted to Sales Director, leading a team of account managers and setting strategic sales goals. You earn a six-figure salary plus performance bonuses, and you're recognized as one of the company's top performers.

You've built a successful career in sales and business development, with opportunities to eventually become VP of Sales or even start your own consulting firm!

<span class="text-green-400">🎉 CAREER ACHIEVED: Sales Director</span>
<span class="text-yellow-400">You've mastered the art of business relationships and revenue generation!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    throne_ending: {
      title: "👑 The Rightful Ruler",
      text: `You approach the magnificent throne carved from a single piece of enchanted crystal. As you sit upon it, the castle's magic recognizes you as the rightful heir!

Suddenly, you can sense the needs of all the kingdom's people. The land flourishes under your wise rule, crops grow abundant, and peace spreads throughout the realm.

You have become the Rightful Ruler, beloved sovereign of a prosperous kingdom!

<span class="text-green-400">🎉 ENDING ACHIEVED: Rightful Ruler</span>
<span class="text-yellow-400">You now reign over a kingdom of peace and prosperity!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    lab_ending: {
      title: "🧪 The Master Alchemist",
      text: `Behind the hidden tapestry, you discover a secret chamber filled with bubbling potions, ancient tomes, and mystical apparatus.

In the center sits an ancient cauldron containing the "Elixir of Creation" - a magical substance that can transform any material into any other. You realize you can reshape reality itself with this power!

You spend days learning the deepest secrets of alchemy and magic. You have become the Master Alchemist, capable of transmuting any substance and creating wonders beyond imagination!

<span class="text-green-400">🎉 ENDING ACHIEVED: Master Alchemist</span>
<span class="text-yellow-400">You can now reshape the physical world at will!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    // More endings for other paths...
    dragon_fight: {
      title: "🐉 The Dragon Tamer",
      text: `You face the massive Fire Dragon, its scales shimmering like molten gold. Each breath it takes creates swirling flames that dance around its mighty form!

Using your courage and wisdom, you speak the ancient words of friendship. Slowly, the dragon's fierce eyes soften, and it recognizes your pure heart. The great beast bows its head, accepting you as its companion.

The forest celebrates your victory! You have become the legendary Dragon Tamer!

<span class="text-green-400">🎉 ENDING ACHIEVED: Dragon Tamer</span>
<span class="text-yellow-400">You now have a mighty dragon as your loyal companion!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    quantum_realm: {
      title: "🌌 The Star Whisperer",
      text: `You climb to the Starlight Observatory where ancient telescopes point toward the cosmos. Here, the secrets of the universe reveal themselves to those with pure intentions.

By learning to read the language of the stars, you master the art of cosmic wisdom. You can now understand the past, present, and future by gazing into the celestial tapestry above.

You have transcended mortal knowledge to become the Star Whisperer!

<span class="text-green-400">🎉 ENDING ACHIEVED: Star Whisperer</span>
<span class="text-yellow-400">The stars themselves share their secrets with you!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    // Additional endings for volcano and island paths
    heart_ending: {
      title: "💎 The Earth Guardian",
      text: `You approach the massive Crystal Heart that pulses with the mountain's life force. As you place your hands upon its surface, you feel the heartbeat of the earth itself.

The crystal accepts you as its guardian, granting you the power to heal the land, grow forests instantly, and communicate with all creatures of the earth.

You have become the Earth Guardian, protector of all natural life!

<span class="text-green-400">🎉 ENDING ACHIEVED: Earth Guardian</span>
<span class="text-yellow-400">You can now heal and protect all of nature!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    forge_ending: {
      title: "⚔️ The Legendary Weaponsmith",
      text: `You enter the Forge of Elements where fire, earth, air, and water dance together in perfect harmony. The ancient tools recognize your worthy spirit and teach you their secrets.

You learn to craft weapons and tools of incredible power, each one perfectly suited to its wielder's heart and purpose.

You have become the Legendary Weaponsmith, creator of artifacts that will be sung about for generations!

<span class="text-green-400">🎉 ENDING ACHIEVED: Legendary Weaponsmith</span>
<span class="text-yellow-400">Your creations will become the stuff of legends!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    lightning_ending: {
      title: "⚡ The Storm Caller",
      text: `You brave the Lightning Crystal Cave where pure magical energy crackles through the air. The lightning recognizes your courage and grants you dominion over the storms.

You can now summon thunder and lightning, control the winds, and bring rain to drought-stricken lands.

You have become the Storm Caller, master of the tempest and friend to sailors everywhere!

<span class="text-green-400">🎉 ENDING ACHIEVED: Storm Caller</span>
<span class="text-yellow-400">The very storms obey your command!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    garden_ending: {
      title: "🌸 The Life Bringer",
      text: `You tend the Garden of Eternal Spring where every flower blooms with healing magic. The plants recognize your gentle spirit and share their ancient wisdom with you.

You gain the power to heal any wound, cure any illness, and bring life to barren lands with just a touch.

You have become the Life Bringer, beloved healer whose very presence brings hope and renewal!

<span class="text-green-400">🎉 ENDING ACHIEVED: Life Bringer</span>
<span class="text-yellow-400">Your touch brings healing and new life!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    library_ending: {
      title: "📚 The Keeper of All Knowledge",
      text: `You study in the Library of Lost Knowledge where books from every civilization throughout history rest on endless shelves. The ancient tomes recognize your thirst for wisdom and open their secrets to you.

You absorb the knowledge of ages past, learning every language, every science, every art that has ever existed.

You have become the Keeper of All Knowledge, the living repository of everything that was, is, and could be!

<span class="text-green-400">🎉 ENDING ACHIEVED: Keeper of All Knowledge</span>
<span class="text-yellow-400">All the wisdom of the ages flows through you!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    // Additional realistic career endings
    partnership_leader: {
      title: "🤝 Strategic Partnerships Director",
      text: `Your work in managing strategic partnerships proves invaluable to the company's growth. You successfully negotiate deals with major industry players and create mutually beneficial relationships that drive long-term success.

You're promoted to Strategic Partnerships Director, overseeing all external business relationships and alliance strategies. Your network becomes one of your greatest professional assets, and you're frequently invited to industry conferences as a speaker.

You've become a respected leader in business development and strategic planning!

<span class="text-green-400">🎉 CAREER ACHIEVED: Strategic Partnerships Director</span>
<span class="text-yellow-400">You've mastered the art of building valuable business relationships!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    industry_expert: {
      title: "📊 Market Research Director",
      text: `Your deep dive into market research and competitive analysis makes you the go-to expert for industry insights. Your reports and recommendations directly influence major business decisions and strategic direction.

You're promoted to Market Research Director, leading a team of analysts and providing critical intelligence that keeps the company ahead of competitors. You're frequently quoted in industry publications and consulted by other companies.

You've become a recognized thought leader and industry expert!

<span class="text-green-400">🎉 CAREER ACHIEVED: Market Research Director</span>
<span class="text-yellow-400">You're now the industry expert everyone turns to for insights!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    ux_designer: {
      title: "📱 Senior UX Designer",
      text: `Your focus on user experience design pays off tremendously. Your intuitive designs and user-centered approach significantly improve customer satisfaction and product adoption rates.

You're promoted to Senior UX Designer, leading design projects for major product features and mentoring junior designers. Your portfolio becomes a showcase of innovative, user-friendly designs that set industry standards.

You've built a successful career in design and user experience!

<span class="text-green-400">🎉 CAREER ACHIEVED: Senior UX Designer</span>
<span class="text-yellow-400">You create digital experiences that users love!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    product_manager: {
      title: "💼 Senior Product Manager",
      text: `Your product management skills prove exceptional. You successfully coordinate between engineering, design, and business teams to deliver products that meet both user needs and business objectives.

You're promoted to Senior Product Manager, overseeing multiple product lines and strategic product decisions. Your ability to balance technical feasibility with market demands makes you invaluable to the company's success.

You've become a key driver of product innovation and business growth!

<span class="text-green-400">🎉 CAREER ACHIEVED: Senior Product Manager</span>
<span class="text-yellow-400">You shape products that make a real impact!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    digital_marketer: {
      title: "📱 Digital Marketing Director",
      text: `Your digital marketing campaigns consistently exceed performance targets, driving significant user growth and brand awareness. Your creative campaigns and data-driven approach set new standards for the marketing team.

You're promoted to Digital Marketing Director, overseeing all online marketing efforts and leading a team of specialists. Your campaigns are studied as case studies, and you're invited to speak at marketing conferences.

You've mastered the art of digital marketing and brand building!

<span class="text-green-400">🎉 CAREER ACHIEVED: Digital Marketing Director</span>
<span class="text-yellow-400">Your campaigns reach millions and drive real business results!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    },

    entrepreneur: {
      title: "🚀 Successful Entrepreneur",
      text: `Using your advanced education and business knowledge, you launch your own startup. After initial challenges, your innovative approach and deep expertise help you build a thriving business.

Within five years, your company has grown to 50+ employees and secured significant funding. You're recognized as a rising entrepreneur in your industry, and your success story inspires other graduates to pursue their own ventures.

You've achieved the ultimate goal of building something from nothing!

<span class="text-green-400">🎉 CAREER ACHIEVED: Successful Entrepreneur</span>
<span class="text-yellow-400">You've built a thriving business from your vision and expertise!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
      choices: {}
    }
  };

  const handleStoryChoice = (choice: string, historyItem: {command: string, output: string}) => {
    if (choice === 'reset') {
      setCurrentStoryState(null);
      historyItem.output = `<span class="text-cyan-400">🔄 Story Reset</span>

Your adventure has been reset. Type 'story' to begin a new journey!`;
      return;
    }

    if (!choice || choice === '') {
      // Start new story
      const startStory = storyData.start;
      setCurrentStoryState('start');
      historyItem.output = `${startStory.title}

${startStory.text}

<span class="text-green-400">Choices:</span>
${Object.entries(startStory.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision (e.g., 'story a' or 'story golden')</span>`;
      return;
    }

    // Handle choice selection - but only if story has been started
    if (!currentStoryState) {
      historyItem.output = `<span class="text-red-400">No story in progress!</span> 

Type 'story' first to begin your adventure, then you can make choices like 'story a' or 'story left'.`;
      return;
    }

    const storyNode = storyData[currentStoryState as keyof typeof storyData];
    
    if (!storyNode) {
      historyItem.output = `<span class="text-red-400">Error:</span> Story state corrupted. Type 'story reset' to restart.`;
      return;
    }

    const selectedChoice = storyNode.choices[choice as keyof typeof storyNode.choices];
    if (!selectedChoice) {
      historyItem.output = `<span class="text-red-400">Invalid choice:</span> "${choice}"

<span class="text-green-400">Available choices:</span>
${Object.entries(storyNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision</span>`;
      return;
    }

    // Move to next story node
    const nextNode = storyData[selectedChoice.next as keyof typeof storyData];
    if (!nextNode) {
      historyItem.output = `<span class="text-red-400">Error:</span> Story path not found. Type 'story reset' to restart.`;
      return;
    }

    setCurrentStoryState(selectedChoice.next);

    historyItem.output = `<span class="text-cyan-400">You chose:</span> ${selectedChoice.text}

${nextNode.title}

${nextNode.text}`;

    // Add choices if this isn't an ending
    if (Object.keys(nextNode.choices).length > 0) {
      historyItem.output += `

<span class="text-green-400">Choices:</span>
${Object.entries(nextNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to continue your adventure</span>`;
    }
  };

  // Handle interactive commands
  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    
    
    // Remove the / prefix for processing
    const actualCmd = cmd;
    
    // Add command to history
    const newHistoryItem = { command: cmd, output: '' };
    
    // Handle story command with choices
    if (actualCmd.startsWith('story ')) {
      const choice = actualCmd.substring(6).trim().toLowerCase();
      handleStoryChoice(choice, newHistoryItem);
      setCommandHistory(prev => [...prev, newHistoryItem]);
      return;
    }

    // Handle special commands with parameters
    if (actualCmd.startsWith('roll ')) {
      const diceMatch = actualCmd.match(/^roll (\d+)d(\d+)$/);
      if (diceMatch) {
        const numDice = parseInt(diceMatch[1]);
        const numSides = parseInt(diceMatch[2]);
        if (numDice > 0 && numDice <= 20 && numSides > 0 && numSides <= 100) {
          const rolls = [];
          let total = 0;
          for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            rolls.push(roll);
            total += roll;
          }
          newHistoryItem.output = `🎲 Rolling ${numDice}d${numSides}...

Individual rolls: [${rolls.join(', ')}]
Total: <span class="text-yellow-400">${total}</span>

${total === numDice * numSides ? '🎉 MAXIMUM ROLL! CRITICAL SUCCESS!' : 
  total === numDice ? '💀 MINIMUM ROLL! CRITICAL FAILURE!' : 
  total >= (numDice * numSides * 0.8) ? '✨ Excellent roll!' : 
  total >= (numDice * numSides * 0.6) ? '👍 Good roll!' : 
  total >= (numDice * numSides * 0.4) ? '😐 Average roll.' : '😬 Could be better...'}`;
        } else {
          newHistoryItem.output = 'Invalid dice format. Use: roll [1-20]d[1-100] (e.g., "roll 2d6")';
        }
      } else {
        newHistoryItem.output = 'Invalid dice format. Use: roll [number]d[number] (e.g., "roll 2d6", "roll 1d20")';
      }
      setCommandHistory(prev => [...prev, newHistoryItem]);
      return;
    }

    if (actualCmd.startsWith('choose ')) {
      const options = actualCmd.substring(7).split(' ').filter(opt => opt.trim().length > 0);
      if (options.length >= 2) {
        const chosen = options[Math.floor(Math.random() * options.length)];
        newHistoryItem.output = `🎯 Making a choice from: [${options.join(', ')}]

🎲 The universe has decided...

<span class="text-yellow-400">✨ ${chosen} ✨</span>

Sometimes the best decisions are the ones we don't have to make ourselves!`;
      } else {
        newHistoryItem.output = 'Please provide at least 2 options. Usage: choose option1 option2 option3...';
      }
      setCommandHistory(prev => [...prev, newHistoryItem]);
      return;
    }

    if (actualCmd.startsWith('morse ')) {
      const text = actualCmd.substring(6);
      const morseCode = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
        'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
        'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
        's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
        'y': '-.--', 'z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/'
      };
      
      const converted = text.toLowerCase().split('').map(char => morseCode[char as keyof typeof morseCode] || char).join(' ');
      newHistoryItem.output = `📡 Morse Code Translator

Input:  "${text}"
Output: <span class="text-yellow-400">${converted}</span>

Fun fact: Morse code was invented in the 1830s and is still used today!`;
      setCommandHistory(prev => [...prev, newHistoryItem]);
      return;
    }
    
    switch (actualCmd) {
      case 'help':
        newHistoryItem.output = `General: >
  <span class="text-yellow-400">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the terminal screen
  <span class="text-yellow-400">dy</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show personal info menu
  <span class="text-yellow-400">help</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show this help message
  <span class="text-yellow-400">ls</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List files and directories
  <span class="text-yellow-400">manual</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show user manual
  <span class="text-yellow-400">pwd</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Print working directory
  <span class="text-yellow-400">version</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show version
  <span class="text-yellow-400">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current user info

System: >
  <span class="text-yellow-400">cal</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show calendar
  <span class="text-yellow-400">date</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current date and time
  <span class="text-yellow-400">df</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show filesystem usage
  <span class="text-yellow-400">ping</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show social links
  <span class="text-yellow-400">ps</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show running processes
  <span class="text-yellow-400">uptime</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show system uptime

Fun & Interactive: >
  <span class="text-yellow-400">choose [opts]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Pick randomly from options
  <span class="text-yellow-400">compliment</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get a positive message
  <span class="text-yellow-400">dadjoke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Classic dad humor
  <span class="text-yellow-400">fortune</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Programming quotes
  <span class="text-yellow-400">fortunecookie</span>&nbsp;&nbsp;&nbsp;&nbsp;- Fortune cookie wisdom
  <span class="text-yellow-400">git log</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show git history
  <span class="text-yellow-400">hack</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Simulate hacking sequence
  <span class="text-yellow-400">insult</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Playful roasts
  <span class="text-yellow-400">joke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Random programming jokes
  <span class="text-yellow-400">matrix</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Enter the Matrix
  <span class="text-yellow-400">mood</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current mood
  <span class="text-yellow-400">morse [text]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Convert to Morse code
  <span class="text-yellow-400">roll [X]d[Y]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Roll virtual dice
  <span class="text-yellow-400">secret</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Find hidden surprises
  <span class="text-yellow-400">story</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Interactive story
  <span class="text-yellow-400">tarot</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Mystical card reading
  <span class="text-yellow-400">trivia</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Tech quiz questions
  <span class="text-yellow-400">weather</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show weather conditions

Navigation: >
  <span class="text-yellow-400">blog</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to blog page
  <span class="text-yellow-400">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Open contact form
  <span class="text-yellow-400">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to projects page
  <span class="text-yellow-400">resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to resume page


<span class="text-green-400">💡 Tip:</span> Try "hack", "secret", or "roll 2d6" for some fun!
  `;
        break;
        
      case 'dy':
        newHistoryItem.output = `Running Version 1.1.0

Usage: >
  <span class="text-yellow-400">dy --history</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's history
  <span class="text-yellow-400">dy --tree</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's skill tree                  
  <span class="text-yellow-400">dy --skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's skills & expertise
  <span class="text-yellow-400">dy --achievements</span>&nbsp;&nbsp;- Show feraldy's achievements
  <span class="text-yellow-400">dy --top</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show top skills & projects
  `;
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      case 'version':
        newHistoryItem.output = '1.0.0';
        break;
      case 'ls':
        newHistoryItem.output = `drwxr-xr-x  <span class="text-yellow-400">projects/</span>
drwxr-xr-x  <span class="text-yellow-400">resume/</span>
drwxr-xr-x  <span class="text-yellow-400">blog/</span>
-rwxr-xr-x  <span class="text-yellow-400">contact.sh</span>`;
        break;
        
      case 'pwd':
        newHistoryItem.output = '/home/feraldy/portfolio';
        break;
        
      case 'whoami':
        newHistoryItem.output = 'feraldy - Test Engineer & Project Manager';
        break;

      case 'fortune':
        const fortunes = [
          "The best way to predict the future is to implement it. - Alan Kay",
          "Code is like humor. When you have to explain it, it's bad. - Cory House",
          "First, solve the problem. Then, write the code. - John Johnson",
          "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
          "In order to be irreplaceable, one must always be different. - Coco Chanel",
          "Java is to JavaScript what car is to Carpet. - Chris Heilmann",
          "The most important property of a program is whether it accomplishes the intention of its user. - C.A.R. Hoare",
          "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
          "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
          "It's not a bug – it's an undocumented feature. - Anonymous",
          "There are only two hard things in Computer Science: cache invalidation and naming things. - Phil Karlton",
          "Walking on water and developing software from a specification are easy if both are frozen. - Edward V. Berard"
        ];
        const selectedFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        newHistoryItem.output = selectedFortune;
        break;

      case 'weather':
        const weatherConditions = [
          "Sunny with a chance of coding - 72°F",
          "Rainy day, perfect for indoor development - 65°F",
          "Partly cloudy with scattered commits - 68°F",
          "Clear skies ahead for your projects - 75°F",
          "Rainbow after the storm (debugging session) - 70°F",
          "Cool and crisp, ideal for hot code - 45°F"
        ];
        newHistoryItem.output = `Current weather in Developer Land:
${weatherConditions[Math.floor(Math.random() * weatherConditions.length)]}

Forecast: High productivity with occasional coffee breaks`;
        break;

      case 'date':
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        };
        newHistoryItem.output = now.toLocaleDateString('en-US', options);
        break;

      case 'uptime':
        const startDate = new Date('2022-01-01'); // Adjust to when you started your career
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const remainingDays = diffDays % 365;
        newHistoryItem.output = `System uptime: ${years} years, ${remainingDays} days
Load average: High motivation, Steady learning, Continuous improvement`;
        break;

      case 'ps':
        newHistoryItem.output = `PID  COMMAND                 STATUS    CPU%  MEM%
1001 qa-automation.exe         Running   25%   15%
1002 web-development.js        Running   30%   20%
1003 problem-solving.py        Running   20%   10%
1004 continuous-learning.sh    Running   15%   8%
1005 team-collaboration.exe    Running   10%   7%`;
        break;

      case 'dy --history':
        newHistoryItem.output = `Career Timeline:
2024-Present  Test Engineer & Project Manager
              • RiddleStory / Enboq
              • QA Process, E2E Testing, PRDs

2022-2023     QA Automation Engineer
              • NiceDay Nederland
              • Appium, Pytest, CI/CD

2021-2022     Game Tester Intern
              • Agate International
              • Manual Testing, Test Cases

Education:
              • B.Sc. Computer Science - ITS (2018-2022)`;
        break;

      case 'dy --tree':
        newHistoryItem.output = `Skills Tree:
├── Quality Assurance
│   ├── Test Planning & Strategy
│   ├── Automation (Playwright, Selenium, Appium)
│   ├── Manual & Exploratory Testing
│   └── API Testing (Postman)
├── Project Management
│   ├── Product Requirement Docs (PRDs)
│   ├── Gantt Charts & Timelines
│   └── Agile/Scrum Methodologies
├── Programming Languages
│   ├── TypeScript
│   ├── Python
│   └── JavaScript
└── Tools & Technologies
    ├── Qase.io, ClickUp
    ├── Git/GitHub, Jenkins
    └── CI/CD, Node.js`;
        break;

      case 'ping':
        newHistoryItem.output = `PING social-media-profiles:
linkedin.com/in/feraldy     64 bytes  time=1ms   Connected
github.com/feraldy          64 bytes  time=2ms   Connected
portfolio.feraldy.dev       64 bytes  time=1ms   Connected

--- Social Network Statistics ---
3 packets transmitted, 3 received, 0% packet loss`;
        break;


      case 'matrix':
        newHistoryItem.output = `Wake up, Neo...
The Matrix has you...
Follow the white rabbit

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100

You take the blue pill - the story ends.
You take the red pill - you stay in Wonderland.`;
        break;

      case 'dy --skills':
        newHistoryItem.output = `Technical Skills:

Quality Assurance:
   • Test Automation      ███████████  Advanced
   • Manual Testing       ████████████ Expert
   • API Testing          █████████    Intermediate
   • Process Improvement  ██████████   Advanced

Programming:
   • TypeScript           ██████████   Advanced
   • Python               █████████    Intermediate
   • JavaScript           ████████     Intermediate

Tools:
   • Playwright           ███████████  Advanced
   • Qase.io              ████████████ Expert
   • ClickUp              ██████████   Advanced
   • Jenkins              ████████     Intermediate`;
        break;

      case 'dy --achievements':
        newHistoryItem.output = `Achievements Unlocked:

Test Engineer (2021-Present)
   3+ years of professional experience

Project Manager (2024-Present)
   Managing product dev with 45+ PRDs

Automation Expert
   Developed 441+ E2E tests (Playwright)

Process Improver
   Established QA processes from scratch

Team Player
   Strong collaboration with dev & product teams

Next Achievement: Senior Test Engineer`;
        break;

      case 'git':
      case 'git log':
      case 'git log --oneline':
      case 'git log oneline':
        newHistoryItem.output = `a1b2c3d (HEAD -> main) feat: Enhanced terminal portfolio with new commands
e4f5g6h feat: Improved responsive design for mobile devices
i7j8k9l fix: Resolved contact form validation issues
m1n2o3p feat: Added dark theme support
q4r5s6t docs: Updated README with deployment instructions
u7v8w9x feat: Implemented TypeScript for better type safety`;
        break;

      case 'dy --top':
        newHistoryItem.output = `Top Skills & Projects:

Hot Skills:
1. QA Automation          ███████████  90%
2. Project Management     █████████    80%
3. E2E Testing            ██████████   85%
4. Process Improvement    ████████████ 95%

Active Projects:
1. Enboq Platform         (Test Engineering)
2. RiddleStory App        (Project Management)
3. This Portfolio         (Personal Project)

Focus Areas:
• QA Process Implementation
• E2E & API Automation
• Product Requirement Docs`;
        break;

      case 'manual':
        newHistoryItem.output = `FERALDY(1)                    User Manual                    FERALDY(1)

NAME
     feraldy - Test Engineer and Project Manager

SYNOPSIS
     feraldy [--role=test-engineer|project-manager] [--coffee=required]

DESCRIPTION
     Feraldy is a dedicated Test Engineer and Project Manager with over 3 years
     of experience in quality assurance and product development.

OPTIONS
     --experience    3+ years in QA and Product Development
     --skills        Playwright, TypeScript, Python, Qase.io, ClickUp
     --passion       QA automation, process improvement, product management
     --location      Netherlands - Remote

EXAMPLES
     feraldy --role=test-engineer   # Professional QA mode
     feraldy --role=project-manager # Efficient PM mode

SEE ALSO
     /projects, /resume, /contact

AUTHOR
     Feraldy Nathanael <fn.archived@gmail.com>`;
        break;

      case 'mood':
        const moods = [
          "Optimistic and ready to tackle new challenges!",
          "Motivated and focused on continuous improvement",
          "Creative and solution-oriented",
          "Determined to deliver quality results",
          "Caffeinated and productive",
          "Enthusiastic about learning new technologies"
        ];
        newHistoryItem.output = moods[Math.floor(Math.random() * moods.length)];
        break;

      case 'cal':
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        let calendar = `${monthName}<br>`;
        calendar += `Su&nbsp;Mo&nbsp;Tu&nbsp;We&nbsp;Th&nbsp;Fr&nbsp;Sa<br>`;

        let day = 1;
        for (let i = 0; i < 6; i++) {
          let week = '';
          for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
              week += '&nbsp;&nbsp;&nbsp;';
            } else if (day > daysInMonth) {
              break;
            } else {
              const isWeekend = j === 0 || j === 6;
              const dayStr = day < 10 ? `&nbsp;${day}` : `${day}`;
              if (isWeekend) {
                week += `<span class="text-red-400">${dayStr}</span>&nbsp;`;
              } else {
                week += `${dayStr}&nbsp;`;
              }
              day++;
            }
          }
          calendar += week.trimEnd() + '<br>';
          if (day > daysInMonth) {
            break;
          }
        }
        
        newHistoryItem.output = `${calendar}
📅 Highlighted Dates:
• <span class="text-yellow-400">Every day:</span> Learning something new
• <span class="text-yellow-400">Weekdays:</span> Professional QA work
• <span class="text-yellow-400">Weekends:</span> Personal projects & growth`;
        break;

      case 'df':
      case 'df -h':
      case 'df h':
        newHistoryItem.output = `Filesystem      Size  Used Avail Use% Mounted on
/dev/skills     100G   85G   15G  85% /expertise
/dev/experience 100G   75G   25G  75% /career
/dev/motivation 100G   95G    5G  95% /passion
/dev/learning   100G   60G   40G  60% /growth
/dev/coffee     10G    9G    1G   90% /productivity

Note: High usage indicates strong proficiency!`;
        break;

      case 'hack':
        newHistoryItem.output = `<span class="text-green-400">Initializing hack sequence...</span>

<span class="text-red-400">WARNING: UNAUTHORIZED ACCESS DETECTED</span>
<span class="text-yellow-400">Bypassing firewall...</span> ████████████ 100%
<span class="text-yellow-400">Cracking encryption...</span> ████████████ 100%
<span class="text-yellow-400">Accessing mainframe...</span> ████████████ 100%

<span class="text-green-400">ACCESS GRANTED</span>

<span class="text-cyan-400">SYSTEM COMPROMISED</span>
<span class="text-gray-400">01001000 01100001 01100011 01101011 01100101 01100100</span>

<span class="text-red-400">Just kidding! 😄</span>
<span class="text-white">This is just a fun simulation. No actual hacking here!</span>

<span class="text-yellow-400">Fun fact:</span> Real cybersecurity is about protection, not intrusion!`;
        break;

      case 'secret':
        const secrets = [
          `🔍 <span class="text-yellow-400">Secret #1:</span> This portfolio was built with React + TypeScript + Tailwind CSS!`,
          `🎮 <span class="text-yellow-400">Secret #2:</span> I'm a huge fan of retro gaming and pixel art!`,
          `☕ <span class="text-yellow-400">Secret #3:</span> I consume approximately 4.7 cups of coffee per day while coding.`,
          `🐛 <span class="text-yellow-400">Secret #4:</span> My first bug was a missing semicolon that took me 3 hours to find.`,
          `🌙 <span class="text-yellow-400">Secret #5:</span> I do my best coding between 10 PM and 2 AM.`,
          `🎵 <span class="text-yellow-400">Secret #6:</span> I listen to lo-fi hip hop while coding (like every other developer).`,
          `🔧 <span class="text-yellow-400">Secret #7:</span> My favorite debugging technique is explaining the problem to a rubber duck.`,
          `📚 <span class="text-yellow-400">Secret #8:</span> I have over 50 programming books but still Google basic syntax.`
        ];
        newHistoryItem.output = secrets[Math.floor(Math.random() * secrets.length)];
        break;

      case 'joke':
        const jokes = [
          `Why do programmers prefer dark mode?\n\n<span class="text-yellow-400">Because light attracts bugs! 🐛</span>`,
          `How many programmers does it take to change a light bulb?\n\n<span class="text-yellow-400">None. That's a hardware problem! 💡</span>`,
          `Why do Java developers wear glasses?\n\n<span class="text-yellow-400">Because they can't C#! 👓</span>`,
          `What's a programmer's favorite hangout place?\n\n<span class="text-yellow-400">Foo Bar! 🍺</span>`,
          `Why did the programmer quit his job?\n\n<span class="text-yellow-400">He didn't get arrays! 📊</span>`,
          `What do you call a programmer from Finland?\n\n<span class="text-yellow-400">Nerdic! 🇫🇮</span>`,
          `Why do programmers hate nature?\n\n<span class="text-yellow-400">It has too many bugs! 🌿</span>`,
          `What's the object-oriented way to become wealthy?\n\n<span class="text-yellow-400">Inheritance! 💰</span>`
        ];
        newHistoryItem.output = jokes[Math.floor(Math.random() * jokes.length)];
        break;

      case 'dadjoke':
        const dadJokes = [
          `Why don't scientists trust atoms?\n\n<span class="text-yellow-400">Because they make up everything! ⚛️</span>`,
          `I invented a new word: Plagiarism!\n\n<span class="text-yellow-400">...wait 🤔</span>`,
          `Why don't skeletons fight each other?\n\n<span class="text-yellow-400">They don't have the guts! 💀</span>`,
          `What do you call a fake noodle?\n\n<span class="text-yellow-400">An impasta! 🍝</span>`,
          `Why did the scarecrow win an award?\n\n<span class="text-yellow-400">He was outstanding in his field! 🌾</span>`,
          `What do you call a bear with no teeth?\n\n<span class="text-yellow-400">A gummy bear! 🐻</span>`,
          `Why don't eggs tell jokes?\n\n<span class="text-yellow-400">They'd crack each other up! 🥚</span>`,
          `What's the best thing about Switzerland?\n\n<span class="text-yellow-400">I don't know, but the flag is a big plus! 🇨🇭</span>`
        ];
        newHistoryItem.output = dadJokes[Math.floor(Math.random() * dadJokes.length)];
        break;

      case 'trivia':
        const triviaQuestions = [
          {
            q: "What does 'HTTP' stand for?",
            a: "HyperText Transfer Protocol",
            options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Tool Transfer Protocol"]
          },
          {
            q: "Which programming language was created by Guido van Rossum?",
            a: "Python",
            options: ["Python", "Java", "JavaScript"]
          },
          {
            q: "What does 'API' stand for?",
            a: "Application Programming Interface",
            options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface"]
          },
          {
            q: "Which company created TypeScript?",
            a: "Microsoft",
            options: ["Microsoft", "Google", "Facebook"]
          },
          {
            q: "What does 'CSS' stand for?",
            a: "Cascading Style Sheets",
            options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Solutions"]
          }
        ];
        const randomTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        newHistoryItem.output = `🧠 <span class="text-cyan-400">Tech Trivia Time!</span>

<span class="text-yellow-400">Question:</span> ${randomTrivia.q}

<span class="text-green-400">Options:</span>
${randomTrivia.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

<span class="text-gray-400">Think you know the answer? The correct answer is:</span>
<span class="text-yellow-400">${randomTrivia.a}</span> ✅`;
        break;

      case 'story':
        handleStoryChoice('', newHistoryItem);
        break;

      case 'compliment':
        const compliments = [
          `✨ You're absolutely crushing it today! Your curiosity about exploring this terminal shows great initiative!`,
          `🌟 You have excellent taste in portfolios! Thanks for taking the time to explore all these features.`,
          `🚀 Your willingness to try new commands shows you're a natural problem-solver. Keep being awesome!`,
          `💎 You're the kind of person who makes the tech community better just by being in it!`,
          `🎯 Your attention to detail in exploring this terminal is impressive. You'd make a great QA engineer!`,
          `🌈 You bring positive energy wherever you go. Thanks for brightening my day!`,
          `⚡ Your curiosity and exploration skills are top-notch. Never stop learning!`,
          `🏆 You're doing amazing things, and this is just the beginning of your journey!`
        ];
        newHistoryItem.output = compliments[Math.floor(Math.random() * compliments.length)];
        break;

      case 'insult':
        const playfulInsults = [
          `😏 You're about as useful as a semicolon in Python... but we still love you!`,
          `🤪 I've seen more organized code in a spaghetti factory, but hey, at least you're trying!`,
          `😜 You're like Internet Explorer - slow to start, but eventually you get there!`,
          `🙃 Your coding style is so unique, it could be modern art... abstract modern art.`,
          `😝 You're like a missing semicolon - small, but capable of breaking everything!`,
          `🤭 I'd explain it to you, but I left my crayons at home. Just kidding, you're awesome!`,
          `😆 You're like a recursive function without a base case - endless, but entertaining!`,
          `🤨 Your logic is like CSS - nobody really understands it, but somehow it works!`
        ];
        newHistoryItem.output = `<span class="text-red-400">Playful Roast Mode Activated! 🔥</span>

${playfulInsults[Math.floor(Math.random() * playfulInsults.length)]}

<span class="text-green-400">Just kidding! You're actually pretty great! 😄</span>`;
        break;

      case 'fortunecookie':
        const fortuneCookies = [
          `🥠 <span class="text-yellow-400">"Your future is created by what you do today, not tomorrow."</span>`,
          `🥠 <span class="text-yellow-400">"The best time to plant a tree was 20 years ago. The second best time is now."</span>`,
          `🥠 <span class="text-yellow-400">"A bug in the code is worth two in the documentation."</span>`,
          `🥠 <span class="text-yellow-400">"You will find the answer in the last place you look... because you stop looking after you find it."</span>`,
          `🥠 <span class="text-yellow-400">"Your next commit will be bug-free... probably."</span>`,
          `🥠 <span class="text-yellow-400">"A wise programmer once said nothing. They were debugging."</span>`,
          `🥠 <span class="text-yellow-400">"Success is 1% inspiration, 99% Stack Overflow."</span>`,
          `🥠 <span class="text-yellow-400">"The code you write today will confuse you in 6 months."</span>`
        ];
        newHistoryItem.output = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
        break;

      case 'tarot':
        const tarotCards = [
          // Major Arcana
          { name: "The Fool", meaning: "New beginnings, innocence, spontaneity, and free spirit await you" },
          { name: "The Magician", meaning: "Manifestation, resourcefulness, power, and inspired action" },
          { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine, and subconscious mind" },
          { name: "The Empress", meaning: "Femininity, beauty, nature, nurturing, and abundance" },
          { name: "The Emperor", meaning: "Authority, establishment, structure, and father figure guidance" },
          { name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs, conformity, and tradition" },
          { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment, and choices" },
          { name: "The Chariot", meaning: "Control, willpower, success, determination, and direction" },
          { name: "Strength", meaning: "Inner strength, bravery, compassion, focus, and influence" },
          { name: "The Hermit", meaning: "Soul searching, introspection, inner guidance, and seeking truth" },
          { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny, and turning point" },
          { name: "Justice", meaning: "Justice, fairness, truth, cause and effect, and law" },
          { name: "The Hanged Man", meaning: "Suspension, restriction, letting go, and sacrifice" },
          { name: "Death", meaning: "Endings, beginnings, change, transformation, and transition" },
          { name: "Temperance", meaning: "Balance, moderation, patience, purpose, and meaning" },
          { name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction, and sexuality" },
          { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation, and awakening" },
          { name: "The Star", meaning: "Hope, faith, purpose, renewal, and spirituality" },
          { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, and intuition" },
          { name: "The Sun", meaning: "Positivity, fun, warmth, success, and vitality" },
          { name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution, and reflection" },
          { name: "The World", meaning: "Completion, accomplishment, travel, and fulfillment" },
          
          // Minor Arcana - Cups (Emotions)
          { name: "Ace of Cups", meaning: "New relationships, compassion, creativity, and emotional awakening" },
          { name: "Two of Cups", meaning: "Unified love, partnership, mutual attraction, and relationships" },
          { name: "Three of Cups", meaning: "Celebration, friendship, creativity, and community" },
          { name: "Four of Cups", meaning: "Meditation, contemplation, apathy, and reevaluation" },
          { name: "Five of Cups", meaning: "Regret, failure, disappointment, and pessimism" },
          { name: "Six of Cups", meaning: "Revisiting the past, childhood memories, innocence, and joy" },
          { name: "Seven of Cups", meaning: "Opportunities, choices, wishful thinking, and illusion" },
          { name: "Eight of Cups", meaning: "Disappointment, abandonment, withdrawal, and escapism" },
          { name: "Nine of Cups", meaning: "Contentment, satisfaction, gratitude, and wish fulfillment" },
          { name: "Ten of Cups", meaning: "Divine love, blissful relationships, harmony, and alignment" },
          
          // Minor Arcana - Pentacles (Material)
          { name: "Ace of Pentacles", meaning: "A new financial or career opportunity, manifestation, and abundance" },
          { name: "Two of Pentacles", meaning: "Multiple priorities, time management, prioritization, and adaptability" },
          { name: "Three of Pentacles", meaning: "Teamwork, collaboration, learning, and implementation" },
          { name: "Four of Pentacles", meaning: "Saving money, security, conservatism, and scarcity" },
          { name: "Five of Pentacles", meaning: "Financial loss, poverty, lack mindset, and isolation" },
          { name: "Six of Pentacles", meaning: "Giving, receiving, sharing wealth, and generosity" },
          { name: "Seven of Pentacles", meaning: "Long-term view, sustainable results, perseverance, and investment" },
          { name: "Eight of Pentacles", meaning: "Apprenticeship, repetitive tasks, mastery, and skill development" },
          { name: "Nine of Pentacles", meaning: "Abundance, luxury, self-reliance, and financial independence" },
          { name: "Ten of Pentacles", meaning: "Wealth, financial security, family, and long-term success" },
          
          // Minor Arcana - Swords (Thoughts)
          { name: "Ace of Swords", meaning: "New ideas, mental clarity, breakthrough, and intellectual power" },
          { name: "Two of Swords", meaning: "Difficult decisions, weighing options, indecision, and stalemate" },
          { name: "Three of Swords", meaning: "Heartbreak, emotional pain, sorrow, and grief" },
          { name: "Four of Swords", meaning: "Rest, relaxation, meditation, and contemplation" },
          { name: "Five of Swords", meaning: "Conflict, disagreements, competition, and defeat" },
          { name: "Six of Swords", meaning: "Transition, change, rite of passage, and moving forward" },
          { name: "Seven of Swords", meaning: "Betrayal, deception, getting away with something, and strategic action" },
          { name: "Eight of Swords", meaning: "Negative thoughts, self-imposed restriction, and victim mentality" },
          { name: "Nine of Swords", meaning: "Anxiety, worry, fear, depression, and nightmares" },
          { name: "Ten of Swords", meaning: "Painful endings, deep wounds, betrayal, and rock bottom" },
          
          // Minor Arcana - Wands (Passion/Action)
          { name: "Ace of Wands", meaning: "Inspiration, new opportunities, growth, and creative potential" },
          { name: "Two of Wands", meaning: "Future planning, making decisions, leaving comfort zone, and personal power" },
          { name: "Three of Wands", meaning: "Progress, expansion, foresight, and overseas opportunities" },
          { name: "Four of Wands", meaning: "Celebration, joy, harmony, relaxation, and homecoming" },
          { name: "Five of Wands", meaning: "Conflict, disagreements, competition, and tension" },
          { name: "Six of Wands", meaning: "Success, public recognition, progress, and self-confidence" },
          { name: "Seven of Wands", meaning: "Challenge, competition, protection, and perseverance" },
          { name: "Eight of Wands", meaning: "Speed, swift action, rapid results, and movement" },
          { name: "Nine of Wands", meaning: "Resilience, courage, persistence, and test of faith" },
          { name: "Ten of Wands", meaning: "Burden, extra responsibility, hard work, and completion" }
        ];
        
        const numCards = Math.floor(Math.random() * 4) + 1; // 1-4 cards
        const selectedCards = [];
        const usedIndices = new Set();
        
        for (let i = 0; i < numCards; i++) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * tarotCards.length);
          } while (usedIndices.has(randomIndex));
          usedIndices.add(randomIndex);
          selectedCards.push(tarotCards[randomIndex]);
        }
        
        let tarotReading = `🔮 <span class="text-purple-400">Mystical Tarot Reading</span>

<span class="text-yellow-400">The cards have spoken... You drew ${numCards} card${numCards > 1 ? 's' : ''}:</span>

`;
        selectedCards.forEach((card, index) => {
          tarotReading += `<span class="text-cyan-400">Card ${index + 1}: ${card.name}</span>
<span class="text-gray-300">${card.meaning}</span>

`;
        });
        
        tarotReading += `<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
        newHistoryItem.output = tarotReading;
        break;

      case 'projects':
      case 'cd ./projects':
      case 'cd projects':
        handleCommandClick('cd ./projects', '/projects');
        return;
        
      case 'resume':
      case 'cd ./resume':
      case 'cd resume':
        handleCommandClick('cd ./resume', '/resume');
        return;
        
      case 'blog':
      case 'cd ./blog':
      case 'cd blog':
        handleCommandClick('cd ./blog', '/blog');
        return;
        
      case 'contact':
      case './contact.sh':
        setShowContactForm(true);
        return;
        
      default:
        newHistoryItem.output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    setCommandHistory(prev => [...prev, newHistoryItem]);
  };

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
            className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl w-full max-w-6xl mx-auto transition-all duration-1000 ease-out ${
              appAnimationStage === 'tiny' 
                ? 'scale-0 opacity-0' 
                : 'scale-100 opacity-100'
            }`}
            style={{
              transformOrigin: 'center center',
              height: 'clamp(600px, 85vh, 1000px)',
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
              <div className="flex flex-col h-full" style={{ height: 'calc(100% - 60px)' }}>
                {showTypewriter && (
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 space-y-2">
                      {/* Initial welcome header */}
                      <div className="pb-2 border-b border-gray-700">
                        <p className="text-green-400">Welcome to Feraldy's Terminal Portfolio v1.0.0</p>
                        <p className="text-gray-400 text-xs mt-1">Type 'help' for available commands</p>
                      </div>
                      
                      {/* Initial prompt with blinking cursor */}
                      {animationPhase === 'initial' && (
                        <div className="flex items-center">
                          <span className="text-cyan-400">feraldy@portfolio</span>
                          <span className="text-white">:</span>
                          <span className="text-blue-400">~</span>
                          <span className="text-white">$</span>
                          <span className="terminal-cursor text-yellow-400 font-bold ml-2">|</span>
                        </div>
                      )}
                      
                      {/* whoami command */}
                      {(animationPhase === 'whoami-typing' || animationPhase === 'whoami-enter' || animationPhase === 'whoami-response' || animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="ml-2">
                              {animationPhase === 'whoami-typing' ? (
                                <TypewriterText 
                                  texts={['whoami']}
                                  delay={80}
                                  typeOnce={true}
                                  onComplete={handleTypingComplete}
                                />
                              ) : (
                                <span className="text-gray-100">whoami</span>
                              )}
                              {animationPhase === 'whoami-enter' && (
                                <span className="text-green-400 ml-2 animate-pulse">↵</span>
                              )}
                            </span>
                          </div>
                          
                          {/* whoami response */}
                          {(animationPhase === 'whoami-response' || animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                            <div className="-mt-1 space-y-1 text-gray-200"></div>
                          )}
                        </div>
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
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="ml-2">
                              {animationPhase === 'about-typing' ? (
                                <TypewriterText 
                                  texts={['cat about.txt']}
                                  delay={80}
                                  typeOnce={true}
                                  onComplete={handleTypingComplete}
                                />
                              ) : (
                                <span className="text-gray-100">cat about.txt</span>
                              )}
                              {animationPhase === 'about-enter' && (
                                <span className="text-green-400 ml-2 animate-pulse">↵</span>
                              )}
                            </span>
                          </div>
                          
                          {/* about.txt response */}
                          {(animationPhase === 'about-response' || animationPhase === 'navigation') && (
                            <div className="ml-0 font-mono text-gray-200">
                              Hi, I am a passionate Test Engineer and Project Manager with over 3 years of experience in quality assurance and product development. I specialize in implementing effective QA processes, maintaining comprehensive test coverage with tools like Playwright and Qase.io, and managing product documentation to bridge the gap between technical and product teams.
                            </div>
                          )}
                        </div>
                      )}
                      
                       {/* Skip Animation Hint */}
                       {showSkipHint && animationPhase !== 'navigation' && (
                         <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 shadow-lg animate-pulse">
                           <p className="text-yellow-400 text-sm font-mono">
                             Press <span className="bg-gray-700 px-2 py-1 rounded text-white">Enter</span> or <span className="bg-gray-700 px-2 py-1 rounded text-white">Click</span> to skip
                           </p>
                         </div>
                       )}

                       {/* Interactive Terminal */}
                       {animationPhase === 'navigation' && !processingCommand && (                        <div>
                          {/* Command History */}
                          {commandHistory.map((item, index) => (
                            <div key={index} className="mb-3">
                              <div className="flex items-center">
                                <span className="text-cyan-400">feraldy@portfolio</span>
                                <span className="text-white">:</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-white">$</span>
                                <span className="text-gray-100 ml-2">{item.command}</span>
                              </div>
                              {item.output && (
                                <div className="mt-1 whitespace-pre-line">
                                    <div key={index} className="font-mono text-gray-200" dangerouslySetInnerHTML={{ __html: item.output }} />
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {/* Interactive Input */}
                          <div className="flex items-center mb-4">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <input
                              type="text"
                              className="flex-1 bg-transparent text-gray-100 outline-none terminal-font terminal-input ml-2"
                              placeholder="Type a command (e.g., help, projects)..."
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const command = e.currentTarget.value.trim();
                                  if (command) {
                                    handleCommand(command);
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Command processing animation */}
                      {processingCommand && (
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="text-gray-100 ml-2">{currentProcessingCommand}</span>
                            <span className="text-cyan-400 ml-2">↵</span>
                          </div>
                          <div className=" flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-gray-400 font-mono">Processing...</span>
                          </div>
                        </div>
                      )}
                    </div>
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