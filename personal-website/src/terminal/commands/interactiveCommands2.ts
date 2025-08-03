import { Command, CommandResult } from '../types';

export const interactiveCommands2: Command[] = [
  {
    name: 'typing-test',
    description: 'Test your typing speed with code',
    category: 'utilities',
    usage: 'typing-test [difficulty]',
    examples: ['typing-test', 'typing-test easy', 'typing-test hard'],
    execute: (args: string[]): CommandResult => {
      const difficulty = args[0]?.toLowerCase() || 'medium';
      
      const texts = {
        easy: [
          "function hello() { return 'Hello World'; }",
          "const name = 'developer'; console.log(name);",
          "if (true) { alert('Success!'); }"
        ],
        medium: [
          "const fetchData = async (url) => { const response = await fetch(url); return response.json(); }",
          "class Component extends React.Component { render() { return <div>Hello</div>; } }",
          "const users = data.filter(user => user.active).map(user => user.name);"
        ],
        hard: [
          "const debounce = (func, delay) => { let timeoutId; return (...args) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(this, args), delay); }; };",
          "interface User { id: number; name: string; email?: string; } const validateUser = (user: User): boolean => { return user.id > 0 && user.name.length > 0; };",
          "const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key); }; };"
        ]
      };

      const selectedTexts = texts[difficulty as keyof typeof texts] || texts.medium;
      const randomText = selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
      const wpm = Math.floor(Math.random() * 40) + 60; // Simulate 60-100 WPM
      const accuracy = Math.floor(Math.random() * 10) + 90; // Simulate 90-100% accuracy

      return {
        output: `⌨️ <span class="text-cyan-400">Typing Speed Test - ${difficulty.toUpperCase()} Mode</span>

<span class="text-yellow-400">Sample Text:</span>
<span class="text-gray-300 bg-gray-800 p-2 rounded">${randomText}</span>

<span class="text-green-400">🎯 Simulated Results:</span>
• WPM (Words Per Minute): <span class="text-yellow-400">${wpm}</span>
• Accuracy: <span class="text-yellow-400">${accuracy}%</span>
• Characters: ${randomText.length}
• Difficulty: ${difficulty}

<span class="text-blue-400">💡 Tips for Better Typing:</span>
• Keep your wrists straight and relaxed
• Use all 10 fingers (touch typing)
• Practice coding-specific symbols: {}[]();
• Focus on accuracy over speed initially

<span class="text-purple-400">Fun Fact:</span> Average developer types 40-70 WPM!
<span class="text-gray-400">Try: typing-test [easy|medium|hard]</span>`
      };
    }
  }
];