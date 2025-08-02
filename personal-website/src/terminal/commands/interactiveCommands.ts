import { Command, CommandResult, TerminalContext } from '../types';

export const interactiveCommands: Command[] = [
  {
    name: 'roll',
    description: 'Roll virtual dice',
    category: 'interactive',
    usage: 'roll [X]d[Y]',
    examples: ['roll 2d6', 'roll 1d20', 'roll 3d8'],
    execute: (args: string[]): CommandResult => {
      if (args.length === 0) {
        return {
          output: 'Invalid dice format. Use: roll [number]d[number] (e.g., "roll 2d6", "roll 1d20")'
        };
      }

      const diceMatch = args[0].match(/^(\d+)d(\d+)$/);
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
          return {
            output: `🎲 Rolling ${numDice}d${numSides}...

Individual rolls: [${rolls.join(', ')}]
Total: <span class="text-yellow-400">${total}</span>

${total === numDice * numSides ? '🎉 MAXIMUM ROLL! CRITICAL SUCCESS!' : 
  total === numDice ? '💀 MINIMUM ROLL! CRITICAL FAILURE!' : 
  total >= (numDice * numSides * 0.8) ? '✨ Excellent roll!' : 
  total >= (numDice * numSides * 0.6) ? '👍 Good roll!' : 
  total >= (numDice * numSides * 0.4) ? '😐 Average roll.' : '😬 Could be better...'}`
          };
        } else {
          return {
            output: 'Invalid dice format. Use: roll [1-20]d[1-100] (e.g., "roll 2d6")'
          };
        }
      } else {
        return {
          output: 'Invalid dice format. Use: roll [number]d[number] (e.g., "roll 2d6", "roll 1d20")'
        };
      }
    }
  },
  {
    name: 'choose',
    description: 'Pick randomly from options',
    category: 'interactive',
    usage: 'choose [option1] [option2] [option3]...',
    examples: ['choose pizza pasta salad', 'choose yes no maybe'],
    execute: (args: string[]): CommandResult => {
      if (args.length < 2) {
        return {
          output: 'Please provide at least 2 options. Usage: choose option1 option2 option3...'
        };
      }

      const chosen = args[Math.floor(Math.random() * args.length)];
      return {
        output: `🎯 Making a choice from: [${args.join(', ')}]

🎲 The universe has decided...

<span class="text-yellow-400">✨ ${chosen} ✨</span>

Sometimes the best decisions are the ones we don't have to make ourselves!`
      };
    }
  },
  {
    name: 'morse',
    description: 'Convert text to Morse code',
    category: 'interactive',
    usage: 'morse [text]',
    examples: ['morse hello world', 'morse SOS'],
    execute: (args: string[]): CommandResult => {
      if (args.length === 0) {
        return {
          output: 'Please provide text to convert. Usage: morse [text]'
        };
      }

      const text = args.join(' ');
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
      return {
        output: `📡 Morse Code Translator

Input:  "${text}"
Output: <span class="text-yellow-400">${converted}</span>

Fun fact: Morse code was invented in the 1830s and is still used today!`
      };
    }
  },
  {
    name: 'trivia',
    description: 'Tech quiz questions',
    category: 'interactive',
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
  },
  {
    name: 'tarot',
    description: 'Mystical card reading - ask a question!',
    category: 'interactive',
    usage: 'tarot [question] - Ask the cards for guidance',
    execute: (args: string[], context: TerminalContext): CommandResult => {
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
        { name: "The World", meaning: "Completion, accomplishment, travel, and fulfillment" }
      ];

      if (!args || args.length === 0) {
        return {
          output: `🔮 <span class="text-purple-400">Mystical Tarot Reading</span>

<span class="text-yellow-400">Please ask a question to receive guidance from the cards.</span>

<span class="text-gray-300">Usage: tarot [your question]</span>
<span class="text-gray-300">Example: tarot should I change my career?</span>

<span class="text-purple-400">✨ The cards await your question ✨</span>`
        };
      }

      const question = args.join(' ');
      const numCards = Math.floor(Math.random() * 3) + 1; // 1-3 cards
      const selectedCards: Array<{name: string, meaning: string}> = [];
      const usedIndices = new Set<number>();
      
      for (let i = 0; i < numCards; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * tarotCards.length);
        } while (usedIndices.has(randomIndex));
        usedIndices.add(randomIndex);
        selectedCards.push(tarotCards[randomIndex]);
      }

      let tarotReading = `🔮 <span class="text-purple-400">Mystical Tarot Reading</span>

<span class="text-yellow-400">Question: "${question}"</span>

<span class="text-cyan-400">The cards have spoken... You drew ${numCards} card${numCards > 1 ? 's' : ''}:</span>

`;
      
      selectedCards.forEach((card, index) => {
        tarotReading += `<span class="text-cyan-400">Card ${index + 1}: ${card.name}</span>
<span class="text-gray-300">${card.meaning}</span>

`;
      });

      const updateId = `tarot-${Date.now()}`;
      
      // Handle AI reading asynchronously using inline updates
      const handleAIReading = async () => {
        try {
          const { tarotRateLimiter } = await import('../../utils/rateLimiter');
          const { tarotAI } = await import('../../utils/tarotAI');
          
          if (tarotAI.isAvailable() && tarotRateLimiter.canMakeRequest()) {
            tarotRateLimiter.recordRequest();
            const aiReading = await tarotAI.generateReading(question, selectedCards);
            
            const updatedOutput = tarotReading + `<span class="text-green-400">✨ The Oracle's Interpretation:</span>
<span class="text-gray-300">${aiReading}</span>

<span class="text-yellow-400">Readings remaining: ${tarotRateLimiter.getRemainingRequests()}/3 per hour</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
            
            context.updateCommandOutput?.(updateId, updatedOutput);
          } else if (tarotAI.isAvailable() && !tarotRateLimiter.canMakeRequest()) {
            const timeUntilReset = Math.ceil(tarotRateLimiter.getTimeUntilReset() / (1000 * 60));
            const updatedOutput = tarotReading + `<span class="text-yellow-400">⏰ Reading limit reached. Try again in ${timeUntilReset} minutes.</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
            
            context.updateCommandOutput?.(updateId, updatedOutput);
          } else {
            const updatedOutput = tarotReading + `<span class="text-yellow-400">💡 Configure VITE_GEMINI_API_KEY for enhanced readings!</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
            
            context.updateCommandOutput?.(updateId, updatedOutput);
          }
        } catch (error) {
          console.error('Reading failed:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          const updatedOutput = tarotReading + `<span class="text-red-400">⚠️ The Oracle is currently unavailable.</span>
<span class="text-gray-400">Error: ${errorMessage}</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
          
          context.updateCommandOutput?.(updateId, updatedOutput);
        }
      };

      // Start reading process
      setTimeout(handleAIReading, 1500);
      
      return { 
        output: tarotReading,
        isUpdating: true,
        updateId
      };
    }
  }
];