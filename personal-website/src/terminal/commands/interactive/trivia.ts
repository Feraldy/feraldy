import { Command, CommandResult } from '../../types';

export const trivia: Command = {
  name: 'trivia',
  description: 'Tech quiz questions',
  category: 'games',
  usage: 'trivia',
  execute: (): CommandResult => {
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
    return {
      output: `🧠 <span class="text-cyan-400">Tech Trivia Time!</span>

<span class="text-yellow-400">Question:</span> ${randomTrivia.q}

<span class="text-green-400">Options:</span>
${randomTrivia.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')}

<span class="text-gray-400">Think you know the answer? The correct answer is:</span>
<span class="text-yellow-400">${randomTrivia.a}</span> ✅`
    };
  }
};