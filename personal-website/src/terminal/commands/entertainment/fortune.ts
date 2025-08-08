import { Command, CommandResult } from '../../types';

export const fortune: Command = {
  name: 'fortune',
  description: 'Get programming quotes and wisdom',
  category: 'entertainment',
  usage: 'fortune [type]',
  examples: ['fortune', 'fortune code', 'fortune wisdom'],
  execute: (args: string[]): CommandResult => {
    const type = args[0]?.toLowerCase() || 'random';
    
    const programmingQuotes = [
      "The best way to predict the future is to implement it. - Alan Kay",
      "Code is like humor. When you have to explain it, it's bad. - Cory House",
      "First, solve the problem. Then, write the code. - John Johnson",
      "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
      "Java is to JavaScript what car is to Carpet. - Chris Heilmann",
      "The most important property of a program is whether it accomplishes the intention of its user. - C.A.R. Hoare",
      "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
      "It's not a bug – it's an undocumented feature. - Anonymous",
      "There are only two hard things in Computer Science: cache invalidation and naming things. - Phil Karlton",
      "Walking on water and developing software from a specification are easy if both are frozen. - Edward V. Berard"
    ];

    const wisdomQuotes = [
      "Your future is created by what you do today, not tomorrow.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "A bug in the code is worth two in the documentation.",
      "You will find the answer in the last place you look... because you stop looking after you find it.",
      "Your next commit will be bug-free... probably.",
      "A wise programmer once said nothing. They were debugging.",
      "Success is 1% inspiration, 99% Stack Overflow.",
      "The code you write today will confuse you in 6 months.",
      "In order to be irreplaceable, one must always be different. - Coco Chanel"
    ];

    let selectedQuotes;
    let prefix;
    
    if (type === 'code' || type === 'programming') {
      selectedQuotes = programmingQuotes;
      prefix = '💻 <span class="text-cyan-400">Programming Wisdom:</span>\n\n';
    } else if (type === 'wisdom' || type === 'cookie') {
      selectedQuotes = wisdomQuotes;
      prefix = '🥠 <span class="text-yellow-400">Fortune Cookie:</span>\n\n';
    } else {
      // Random from both collections
      selectedQuotes = [...programmingQuotes, ...wisdomQuotes];
      prefix = '🔮 <span class="text-purple-400">Fortune:</span>\n\n';
    }

    const selectedFortune = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
    
    return { 
      output: `${prefix}"${selectedFortune}"

<span class="text-gray-400">Try: fortune [code|wisdom] for specific types</span>` 
    };
  }
};