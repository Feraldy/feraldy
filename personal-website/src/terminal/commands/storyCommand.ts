import { Command, TerminalContext, CommandResult } from '../types';

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
      'a': { text: 'Focus on business development', next: 'business_success' },
      'b': { text: 'Join product development', next: 'product_success' },
      'c': { text: 'Dive into marketing and growth', next: 'marketing_success' },
      'business': { text: 'Focus on business development', next: 'business_success' },
      'product': { text: 'Join product development', next: 'product_success' },
      'marketing': { text: 'Dive into marketing and growth', next: 'marketing_success' }
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
      'a': { text: 'Pursue finance and accounting', next: 'finance_success' },
      'b': { text: 'Focus on human resources', next: 'hr_success' },
      'c': { text: 'Choose operations management', next: 'operations_success' },
      'finance': { text: 'Pursue finance and accounting', next: 'finance_success' },
      'hr': { text: 'Focus on human resources', next: 'hr_success' },
      'operations': { text: 'Choose operations management', next: 'operations_success' }
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
      'a': { text: 'Pursue a Master\'s degree', next: 'masters_success' },
      'b': { text: 'Get professional certifications', next: 'certification_success' },
      'c': { text: 'Study abroad', next: 'international_success' },
      'masters': { text: 'Pursue a Master\'s degree', next: 'masters_success' },
      'certification': { text: 'Get professional certifications', next: 'certification_success' },
      'abroad': { text: 'Study abroad', next: 'international_success' }
    }
  },

  // Success endings
  business_success: {
    title: "💼 Business Development Success",
    text: `Your natural networking abilities and strategic thinking make you excel in business development. Within two years, you've helped secure major partnerships that significantly boost company revenue.

You're promoted to Business Development Manager, leading a team and setting strategic partnership goals. Your success story becomes an inspiration for other startup employees.

<span class="text-green-400">🎉 CAREER ACHIEVED: Business Development Manager</span>
<span class="text-yellow-400">You've mastered the art of building valuable business relationships!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  product_success: {
    title: "💻 Product Development Success",
    text: `Your technical skills and user-focused mindset make you a valuable product team member. You contribute to features that significantly improve user satisfaction and product adoption.

You're promoted to Senior Product Developer, leading feature development and mentoring junior team members. Your innovative solutions become core parts of the product.

<span class="text-green-400">🎉 CAREER ACHIEVED: Senior Product Developer</span>
<span class="text-yellow-400">You create products that users love and depend on!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  marketing_success: {
    title: "📊 Marketing & Growth Success",
    text: `Your creative campaigns and data-driven approach drive significant user growth and brand awareness. Your marketing strategies become case studies for the industry.

You're promoted to Marketing Director, overseeing all growth initiatives and leading a creative team. Your campaigns reach millions and drive real business results.

<span class="text-green-400">🎉 CAREER ACHIEVED: Marketing Director</span>
<span class="text-yellow-400">Your campaigns inspire and drive business growth!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  finance_success: {
    title: "📈 Finance Career Success",
    text: `Your analytical skills and attention to detail make you excel in financial analysis and strategic planning. Your insights directly influence major business decisions.

You're promoted to Senior Financial Analyst, leading budget planning and providing strategic insights to executives. Your expertise becomes invaluable to company success.

<span class="text-green-400">🎉 CAREER ACHIEVED: Senior Financial Analyst</span>
<span class="text-yellow-400">You've mastered the art of financial strategy and analysis!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  hr_success: {
    title: "👥 HR Excellence Success",
    text: `Your people skills and passion for employee development make you a natural HR leader. You create programs that significantly improve employee satisfaction and retention.

You're promoted to HR Director, overseeing all people operations and creating positive workplace culture. Your leadership makes a real difference in people's careers.

<span class="text-green-400">🎉 CAREER ACHIEVED: HR Director</span>
<span class="text-yellow-400">You've become a champion for people and workplace culture!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  operations_success: {
    title: "🎯 Operations Management Success",
    text: `Your organizational skills and process improvement mindset make you excel in operations. You optimize workflows that significantly improve company efficiency.

You're promoted to Operations Director, overseeing all company operations and leading efficiency initiatives. Your improvements become the foundation of company success.

<span class="text-green-400">🎉 CAREER ACHIEVED: Operations Director</span>
<span class="text-yellow-400">You've mastered the art of efficient operations and leadership!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  masters_success: {
    title: "🎓 Graduate School Success",
    text: `Your dedication to advanced education pays off tremendously. You graduate with honors and deep expertise that opens doors to senior positions.

You're recruited by a top company for a leadership role, leveraging your advanced knowledge to drive innovation and strategic initiatives.

<span class="text-green-400">🎉 CAREER ACHIEVED: Industry Leader</span>
<span class="text-yellow-400">Your advanced education has opened doors to leadership!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  certification_success: {
    title: "💼 Certification Success",
    text: `Your professional certifications make you highly marketable and skilled. Employers value your practical expertise and industry-recognized credentials.

You're hired for a senior role that perfectly matches your certified skills, with excellent compensation and growth opportunities.

<span class="text-green-400">🎉 CAREER ACHIEVED: Certified Professional</span>
<span class="text-yellow-400">Your practical skills and certifications have paid off!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  },

  international_success: {
    title: "🌍 International Experience Success",
    text: `Your international experience and cultural competency make you invaluable in our global economy. You develop a unique perspective that sets you apart.

You're recruited for an international role, working with global teams and leveraging your cross-cultural skills to drive business success.

<span class="text-green-400">🎉 CAREER ACHIEVED: Global Professional</span>
<span class="text-yellow-400">Your international experience has opened global opportunities!</span>

<span class="text-gray-400">Type 'story reset' to begin a new adventure, or 'story' to restart from the beginning.</span>`,
    choices: {}
  }
};

export const storyCommand: Command = {
  name: 'story',
  description: 'Interactive career journey',
  category: 'interactive',
  usage: 'story [choice]',
  examples: ['story', 'story a', 'story startup', 'story reset'],
  execute: (args: string[], context: TerminalContext): CommandResult => {
    const choice = args[0]?.toLowerCase() || '';

    if (choice === 'reset') {
      context.setCurrentStoryState(null);
      return {
        output: `<span class="text-cyan-400">🔄 Story Reset</span>

Your adventure has been reset. Type 'story' to begin a new journey!`
      };
    }

    if (!choice || choice === '') {
      // Start new story
      const startStory = storyData.start;
      context.setCurrentStoryState('start');
      return {
        output: `${startStory.title}

${startStory.text}

<span class="text-green-400">Choices:</span>
${Object.entries(startStory.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision (e.g., 'story a' or 'story startup')</span>`
      };
    }

    // Handle choice selection - but only if story has been started
    if (!context.currentStoryState) {
      return {
        output: `<span class="text-red-400">No story in progress!</span> 

Type 'story' first to begin your adventure, then you can make choices like 'story a' or 'story startup'.`
      };
    }

    const storyNode = storyData[context.currentStoryState as keyof typeof storyData];
    
    if (!storyNode) {
      return {
        output: `<span class="text-red-400">Error:</span> Story state corrupted. Type 'story reset' to restart.`
      };
    }

    const selectedChoice = storyNode.choices[choice as keyof typeof storyNode.choices];
    if (!selectedChoice) {
      return {
        output: `<span class="text-red-400">Invalid choice:</span> "${choice}"

<span class="text-green-400">Available choices:</span>
${Object.entries(storyNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision</span>`
      };
    }

    // Move to next story node
    const nextNode = storyData[selectedChoice.next as keyof typeof storyData];
    if (!nextNode) {
      return {
        output: `<span class="text-red-400">Error:</span> Story path not found. Type 'story reset' to restart.`
      };
    }

    context.setCurrentStoryState(selectedChoice.next);

    let output = `<span class="text-cyan-400">You chose:</span> ${selectedChoice.text}

${nextNode.title}

${nextNode.text}`;

    // Add choices if this isn't an ending
    if (Object.keys(nextNode.choices).length > 0) {
      output += `

<span class="text-green-400">Choices:</span>
${Object.entries(nextNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to continue your adventure</span>`;
    }

    return { output };
  }
};