import { Command, TerminalContext, CommandResult } from '../types';

export const funCommands: Command[] = [
  {
    name: 'fortune',
    description: 'Get programming quotes',
    category: 'fun',
    usage: 'fortune',
    execute: (): CommandResult => {
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
      return { output: selectedFortune };
    }
  },
  {
    name: 'weather',
    description: 'Show weather conditions',
    category: 'fun',
    usage: 'weather',
    execute: (): CommandResult => {
      const weatherConditions = [
        "Sunny with a chance of coding - 72°F",
        "Rainy day, perfect for indoor development - 65°F",
        "Partly cloudy with scattered commits - 68°F",
        "Clear skies ahead for your projects - 75°F",
        "Rainbow after the storm (debugging session) - 70°F",
        "Cool and crisp, ideal for hot code - 45°F"
      ];
      return {
        output: `Current weather in Developer Land:
${weatherConditions[Math.floor(Math.random() * weatherConditions.length)]}

Forecast: High productivity with occasional coffee breaks`
      };
    }
  },
  {
    name: 'matrix',
    description: 'Enter the Matrix',
    category: 'fun',
    usage: 'matrix',
    execute: (): CommandResult => ({
      output: `Wake up, Neo...
The Matrix has you...
Follow the white rabbit

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100

You take the blue pill - the story ends.
You take the red pill - you stay in Wonderland.`
    })
  },
  {
    name: 'hack',
    description: 'Simulate hacking sequence',
    category: 'fun',
    usage: 'hack',
    execute: (): CommandResult => ({
      output: `<span class="text-green-400">Initializing hack sequence...</span>

<span class="text-red-400">WARNING: UNAUTHORIZED ACCESS DETECTED</span>
<span class="text-yellow-400">Bypassing firewall...</span> ████████████ 100%
<span class="text-yellow-400">Cracking encryption...</span> ████████████ 100%
<span class="text-yellow-400">Accessing mainframe...</span> ████████████ 100%

<span class="text-green-400">ACCESS GRANTED</span>

<span class="text-cyan-400">SYSTEM COMPROMISED</span>
<span class="text-gray-400">01001000 01100001 01100011 01101011 01100101 01100100</span>

<span class="text-red-400">Just kidding! 😄</span>
<span class="text-white">This is just a fun simulation. No actual hacking here!</span>

<span class="text-yellow-400">Fun fact:</span> Real cybersecurity is about protection, not intrusion!`
    })
  },
  {
    name: 'secret',
    description: 'Find hidden surprises',
    category: 'fun',
    usage: 'secret',
    execute: (): CommandResult => {
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
      return {
        output: secrets[Math.floor(Math.random() * secrets.length)]
      };
    }
  },
  {
    name: 'joke',
    description: 'Random programming jokes',
    category: 'fun',
    usage: 'joke',
    execute: (): CommandResult => {
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
      return {
        output: jokes[Math.floor(Math.random() * jokes.length)]
      };
    }
  },
  {
    name: 'dadjoke',
    description: 'Classic dad humor',
    category: 'fun',
    usage: 'dadjoke',
    execute: (): CommandResult => {
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
      return {
        output: dadJokes[Math.floor(Math.random() * dadJokes.length)]
      };
    }
  },
  {
    name: 'compliment',
    description: 'Get a positive message',
    category: 'fun',
    usage: 'compliment',
    execute: (): CommandResult => {
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
      return {
        output: compliments[Math.floor(Math.random() * compliments.length)]
      };
    }
  },
  {
    name: 'insult',
    description: 'Playful roasts',
    category: 'fun',
    usage: 'insult',
    execute: (): CommandResult => {
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
      return {
        output: `<span class="text-red-400">Playful Roast Mode Activated! 🔥</span>

${playfulInsults[Math.floor(Math.random() * playfulInsults.length)]}

<span class="text-green-400">Just kidding! You're actually pretty great! 😄</span>`
      };
    }
  },
  {
    name: 'fortunecookie',
    description: 'Fortune cookie wisdom',
    category: 'fun',
    usage: 'fortunecookie',
    execute: (): CommandResult => {
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
      return {
        output: fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)]
      };
    }
  }
];