import { Command, CommandResult } from '../../types';

export const roast: Command = {
  name: 'roast',
  description: 'Get roasted or complimented',
  category: 'entertainment',
  usage: 'roast [mode]',
  examples: ['roast', 'roast nice', 'roast mean'],
  execute: (args: string[]): CommandResult => {
    const mode = args[0]?.toLowerCase() || 'random';
    
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

    if (mode === 'nice' || mode === 'compliment' || mode === 'positive') {
      const selectedCompliment = compliments[Math.floor(Math.random() * compliments.length)];
      return {
        output: `💖 <span class="text-green-400">Compliment Mode:</span>

${selectedCompliment}

<span class="text-gray-400">Try: roast [nice|mean] for specific modes</span>`
      };
    } else if (mode === 'mean' || mode === 'insult' || mode === 'roast') {
      const selectedInsult = playfulInsults[Math.floor(Math.random() * playfulInsults.length)];
      return {
        output: `🔥 <span class="text-red-400">Playful Roast Mode:</span>

${selectedInsult}

<span class="text-green-400">Just kidding! You're actually pretty great! 😄</span>

<span class="text-gray-400">Try: roast [nice|mean] for specific modes</span>`
      };
    } else {
      // Random mode - 50/50 chance
      const isNice = Math.random() < 0.5;
      if (isNice) {
        const selectedCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        return {
          output: `💖 <span class="text-green-400">Random Compliment:</span>

${selectedCompliment}

<span class="text-gray-400">Try: roast [nice|mean] for specific modes</span>`
        };
      } else {
        const selectedInsult = playfulInsults[Math.floor(Math.random() * playfulInsults.length)];
        return {
          output: `🔥 <span class="text-red-400">Random Roast:</span>

${selectedInsult}

<span class="text-green-400">Just kidding! You're actually pretty great! 😄</span>

<span class="text-gray-400">Try: roast [nice|mean] for specific modes</span>`
        };
      }
    }
  }
};