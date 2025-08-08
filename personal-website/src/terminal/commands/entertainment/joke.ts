import { Command, CommandResult } from '../../types';

export const joke: Command = {
  name: 'joke',
  description: 'Programming and dad jokes',
  category: 'entertainment',
  usage: 'joke [type]',
  examples: ['joke', 'joke code', 'joke dad'],
  execute: (args: string[]): CommandResult => {
    const type = args[0]?.toLowerCase() || 'random';
    
    const programmingJokes = [
      `Why do programmers prefer dark mode?\n\n<span class="text-yellow-400">Because light attracts bugs! 🐛</span>`,
      `How many programmers does it take to change a light bulb?\n\n<span class="text-yellow-400">None. That's a hardware problem! 💡</span>`,
      `Why do Java developers wear glasses?\n\n<span class="text-yellow-400">Because they can't C#! 👓</span>`,
      `What's a programmer's favorite hangout place?\n\n<span class="text-yellow-400">Foo Bar! 🍺</span>`,
      `Why did the programmer quit his job?\n\n<span class="text-yellow-400">He didn't get arrays! 📊</span>`,
      `What do you call a programmer from Finland?\n\n<span class="text-yellow-400">Nerdic! 🇫🇮</span>`,
      `Why do programmers hate nature?\n\n<span class="text-yellow-400">It has too many bugs! 🌿</span>`,
      `What's the object-oriented way to become wealthy?\n\n<span class="text-yellow-400">Inheritance! 💰</span>`
    ];

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

    let selectedJokes;
    let prefix;
    
    if (type === 'code' || type === 'programming' || type === 'tech') {
      selectedJokes = programmingJokes;
      prefix = '💻 <span class="text-cyan-400">Programming Joke:</span>\n\n';
    } else if (type === 'dad' || type === 'classic') {
      selectedJokes = dadJokes;
      prefix = '👨 <span class="text-blue-400">Dad Joke:</span>\n\n';
    } else {
      // Random from both collections
      selectedJokes = [...programmingJokes, ...dadJokes];
      prefix = '😄 <span class="text-green-400">Random Joke:</span>\n\n';
    }

    const selectedJoke = selectedJokes[Math.floor(Math.random() * selectedJokes.length)];
    
    return { 
      output: `${prefix}${selectedJoke}

<span class="text-gray-400">Try: joke [code|dad] for specific types</span>` 
    };
  }
};