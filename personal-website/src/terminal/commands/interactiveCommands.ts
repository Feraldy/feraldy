import { Command, CommandResult, TerminalContext } from '../types';
import { tarotAI } from '../../utils/tarotAI';
import { tarotRateLimiter } from '../../utils/rateLimiter';



interface DiceRoll {
  numDice: number;
  numSides: number;
  rolls: number[];
  total: number;
}

interface ParsedExpression {
  diceRolls: DiceRoll[];
  modifiers: number[];
  total: number;
  hasD20: boolean;
}

function getDiceFace(_sides: number, value: number): string {
  return `${value}`;
}

function getRandomDiceFace(sides: number): string {
  // Generate a random number within the dice range for animation
  const randomValue = Math.floor(Math.random() * sides) + 1;
  return `${randomValue}`;
}

function rollDice(numDice: number, numSides: number): DiceRoll {
  const rolls = [];
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    const roll = Math.floor(Math.random() * numSides) + 1;
    rolls.push(roll);
    total += roll;
  }
  return { numDice, numSides, rolls, total };
}

function parseDiceExpression(expression: string, hasAdvantage: boolean, hasDisadvantage: boolean, context?: TerminalContext): CommandResult {
  if (!expression) {
    throw new Error('Empty expression');
  }

  // Handle advantage/disadvantage for d20 rolls
  if ((hasAdvantage || hasDisadvantage) && expression.includes('d20')) {
    return handleAdvantageDisadvantage(expression, hasAdvantage, context);
  }

  // Parse the expression into dice and modifiers
  const parsed = parseExpression(expression);
  
  // Generate initial output with rolling animation
  let output = `🎲 Rolling: <span class="text-cyan-400">${expression}</span>\n\n`;
  
  // Show rolling animation for each dice group
  parsed.diceRolls.forEach((dice) => {
    const animatedDice = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
    output += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${animatedDice.join(', ')}] = Rolling...\n`;
  });
  
  output += `\n<span class="text-gray-400">🎲 Rolling dice...</span>`;
  
  const updateId = `dice-${Date.now()}`;
  
  // Animate the dice rolling with multiple frames
  if (context?.updateCommandOutput) {
    const animationFrames = 15; // Number of animation frames
    const baseFrameInterval = 120; // Base interval in ms
    
    let currentFrame = 0;
    
    const animateFrame = () => {
      if (currentFrame < animationFrames) {
        // Generate animated frame
        let frameOutput = `🎲 Rolling: <span class="text-cyan-400">${expression}</span>\n\n`;
        
        parsed.diceRolls.forEach((dice) => {
          const animatedDice = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
          frameOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${animatedDice.join(', ')}] = Rolling...\n`;
        });
        
        // Add visual feedback based on animation progress
        const animProgress = currentFrame / animationFrames;
        let statusMessage = "🎲 Rolling dice";
        if (animProgress > 0.8) {
          statusMessage += "... slowing down";
        } else if (animProgress > 0.5) {
          statusMessage += "... tumbling";
        } else {
          statusMessage += "... spinning fast";
        }
        
        frameOutput += `\n<span class="text-gray-400">${statusMessage}</span>`;
        
        if (context.updateCommandOutput) {
          context.updateCommandOutput(updateId, frameOutput);
        }
        currentFrame++;
        
        // Calculate next frame interval - slow down as we approach the end
        const progress = currentFrame / animationFrames;
        const nextInterval = baseFrameInterval + (progress * baseFrameInterval * 2); // Gradually slow down
        setTimeout(animateFrame, nextInterval);
      } else {
        // Show final results
        let finalOutput = `🎲 Rolling: <span class="text-cyan-400">${expression}</span>\n\n`;
        
        // Show individual dice rolls with final results
        parsed.diceRolls.forEach((dice) => {
          const criticalInfo = getCriticalInfo(dice);
          const diceWithFaces = dice.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
          finalOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${diceWithFaces.join(', ')}] = ${dice.total}${criticalInfo}\n`;
        });
        
        // Show modifiers if any
        if (parsed.modifiers.length > 0) {
          const modifierSum = parsed.modifiers.reduce((sum, mod) => sum + mod, 0);
          const modifierStr = parsed.modifiers.map(m => m >= 0 ? `+${m}` : `${m}`).join(' ');
          finalOutput += `<span class="text-gray-400">Modifiers:</span> ${modifierStr} = ${modifierSum}\n`;
        }
        
        finalOutput += `\n<span class="text-green-400">Total: ${parsed.total}</span>\n\n`;
        
        // Add flavor text
        finalOutput += getFlavorText(parsed);
        
        if (context.updateCommandOutput) {
          context.updateCommandOutput(updateId, finalOutput);
        }
      }
    };
    
    // Start animation after initial display
    setTimeout(animateFrame, baseFrameInterval);
    
    return {
      output,
      isUpdating: true,
      updateId
    };
  } else {
    // Fallback for when context is not available - show final result immediately
    let finalOutput = `🎲 Rolling: <span class="text-cyan-400">${expression}</span>\n\n`;
    
    parsed.diceRolls.forEach((dice) => {
      const criticalInfo = getCriticalInfo(dice);
      const diceWithFaces = dice.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
      finalOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${diceWithFaces.join(', ')}] = ${dice.total}${criticalInfo}\n`;
    });
    
    if (parsed.modifiers.length > 0) {
      const modifierSum = parsed.modifiers.reduce((sum, mod) => sum + mod, 0);
      const modifierStr = parsed.modifiers.map(m => m >= 0 ? `+${m}` : `${m}`).join(' ');
      finalOutput += `<span class="text-gray-400">Modifiers:</span> ${modifierStr} = ${modifierSum}\n`;
    }
    
    finalOutput += `\n<span class="text-green-400">Total: ${parsed.total}</span>\n\n`;
    finalOutput += getFlavorText(parsed);
    
    return { output: finalOutput };
  }
}

function handleAdvantageDisadvantage(expression: string, hasAdvantage: boolean, context?: TerminalContext): CommandResult {
  const type = hasAdvantage ? 'Advantage' : 'Disadvantage';
  const emoji = hasAdvantage ? '⬆️' : '⬇️';
  
  // Parse the base expression
  const parsed = parseExpression(expression);
  
  // Pre-roll the dice to get final results
  const finalRolls: { [key: number]: { roll1: DiceRoll, roll2: DiceRoll, chosen: DiceRoll } } = {};
  
  parsed.diceRolls.forEach((dice, index) => {
    if (dice.numSides === 20) {
      // Roll twice for advantage/disadvantage
      const roll1 = rollDice(dice.numDice, dice.numSides);
      const roll2 = rollDice(dice.numDice, dice.numSides);
      
      const chosen = hasAdvantage ? 
        (roll1.total >= roll2.total ? roll1 : roll2) :
        (roll1.total <= roll2.total ? roll1 : roll2);
      
      finalRolls[index] = { roll1, roll2, chosen };
      
      // Update the dice roll with the chosen result
      dice.rolls = chosen.rolls;
      dice.total = chosen.total;
    }
  });
  
  // Generate initial animated output
  let output = `🎲 Rolling with <span class="text-cyan-400">${type}</span> ${emoji}: ${expression}\n\n`;
  
  parsed.diceRolls.forEach((dice) => {
    if (dice.numSides === 20) {
      const animatedDice1 = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
      const animatedDice2 = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
      
      output += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span>\n`;
      output += `  Roll 1: [${animatedDice1.join(', ')}] = Rolling...\n`;
      output += `  Roll 2: [${animatedDice2.join(', ')}] = Rolling...\n`;
      output += `  <span class="text-gray-400">Taking ${hasAdvantage ? 'higher' : 'lower'}...</span>\n`;
    } else {
      // Regular roll for non-d20 dice
      const animatedDice = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
      output += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${animatedDice.join(', ')}] = Rolling...\n`;
    }
  });
  
  output += `\n<span class="text-gray-400">🎲 Rolling dice... spinning fast</span>`;
  
  const updateId = `dice-adv-${Date.now()}`;
  
  // Animate the dice rolling with multiple frames
  if (context?.updateCommandOutput) {
    const animationFrames = 15; // Number of animation frames
    const baseFrameInterval = 120; // Base interval in ms
    
    let currentFrame = 0;
    
    const animateFrame = () => {
      if (currentFrame < animationFrames) {
        // Generate animated frame
        let frameOutput = `🎲 Rolling with <span class="text-cyan-400">${type}</span> ${emoji}: ${expression}\n\n`;
        
        parsed.diceRolls.forEach((dice) => {
          if (dice.numSides === 20) {
            const animatedDice1 = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
            const animatedDice2 = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
            
            frameOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span>\n`;
            frameOutput += `  Roll 1: [${animatedDice1.join(', ')}] = Rolling...\n`;
            frameOutput += `  Roll 2: [${animatedDice2.join(', ')}] = Rolling...\n`;
            frameOutput += `  <span class="text-gray-400">Taking ${hasAdvantage ? 'higher' : 'lower'}...</span>\n`;
          } else {
            const animatedDice = Array(dice.numDice).fill(0).map(() => getRandomDiceFace(dice.numSides));
            frameOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${animatedDice.join(', ')}] = Rolling...\n`;
          }
        });
        
        // Add visual feedback based on animation progress
        const animProgress = currentFrame / animationFrames;
        let statusMessage = "🎲 Rolling dice";
        if (animProgress > 0.8) {
          statusMessage += "... slowing down";
        } else if (animProgress > 0.5) {
          statusMessage += "... tumbling";
        } else {
          statusMessage += "... spinning fast";
        }
        
        frameOutput += `\n<span class="text-gray-400">${statusMessage}</span>`;
        
        if (context.updateCommandOutput) {
          context.updateCommandOutput(updateId, frameOutput);
        }
        currentFrame++;
        
        // Calculate next frame interval - slow down as we approach the end
        const progress = currentFrame / animationFrames;
        const nextInterval = baseFrameInterval + (progress * baseFrameInterval * 2); // Gradually slow down
        setTimeout(animateFrame, nextInterval);
      } else {
        // Show final results
        let finalOutput = `🎲 Rolling with <span class="text-cyan-400">${type}</span> ${emoji}: ${expression}\n\n`;
        
        parsed.diceRolls.forEach((dice, index) => {
          if (dice.numSides === 20 && finalRolls[index]) {
            const { roll1, roll2, chosen } = finalRolls[index];
            const diceWithFaces1 = roll1.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
            const diceWithFaces2 = roll2.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
            
            finalOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span>\n`;
            finalOutput += `  Roll 1: [${diceWithFaces1.join(', ')}] = ${roll1.total}\n`;
            finalOutput += `  Roll 2: [${diceWithFaces2.join(', ')}] = ${roll2.total}\n`;
            finalOutput += `  <span class="text-green-400">Taking ${hasAdvantage ? 'higher' : 'lower'}: ${chosen.total}</span>${getCriticalInfo(chosen)}\n`;
          } else {
            // Regular roll for non-d20 dice
            const criticalInfo = getCriticalInfo(dice);
            const diceWithFaces = dice.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
            finalOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${diceWithFaces.join(', ')}] = ${dice.total}${criticalInfo}\n`;
          }
        });
        
        // Recalculate total
        const total = parsed.diceRolls.reduce((sum, dice) => sum + dice.total, 0) + 
                      parsed.modifiers.reduce((sum, mod) => sum + mod, 0);
        
        // Show modifiers if any
        if (parsed.modifiers.length > 0) {
          const modifierSum = parsed.modifiers.reduce((sum, mod) => sum + mod, 0);
          const modifierStr = parsed.modifiers.map(m => m >= 0 ? `+${m}` : `${m}`).join(' ');
          finalOutput += `<span class="text-gray-400">Modifiers:</span> ${modifierStr} = ${modifierSum}\n`;
        }
        
        finalOutput += `\n<span class="text-green-400">Final Total: ${total}</span>\n\n`;
        finalOutput += getFlavorText({ ...parsed, total });
        
        if (context.updateCommandOutput) {
          context.updateCommandOutput(updateId, finalOutput);
        }
      }
    };
    
    // Start animation after initial display
    setTimeout(animateFrame, baseFrameInterval);
    
    return {
      output,
      isUpdating: true,
      updateId
    };
  } else {
    // Fallback for when context is not available - show final result immediately
    let finalOutput = `🎲 Rolling with <span class="text-cyan-400">${type}</span> ${emoji}: ${expression}\n\n`;
    
    parsed.diceRolls.forEach((dice, index) => {
      if (dice.numSides === 20 && finalRolls[index]) {
        const { roll1, roll2, chosen } = finalRolls[index];
        const diceWithFaces1 = roll1.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
        const diceWithFaces2 = roll2.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
        
        finalOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span>\n`;
        finalOutput += `  Roll 1: [${diceWithFaces1.join(', ')}] = ${roll1.total}\n`;
        finalOutput += `  Roll 2: [${diceWithFaces2.join(', ')}] = ${roll2.total}\n`;
        finalOutput += `  <span class="text-green-400">Taking ${hasAdvantage ? 'higher' : 'lower'}: ${chosen.total}</span>${getCriticalInfo(chosen)}\n`;
      } else {
        // Regular roll for non-d20 dice
        const criticalInfo = getCriticalInfo(dice);
        const diceWithFaces = dice.rolls.map(roll => `${getDiceFace(dice.numSides, roll)}`);
        finalOutput += `<span class="text-yellow-400">${dice.numDice}d${dice.numSides}:</span> [${diceWithFaces.join(', ')}] = ${dice.total}${criticalInfo}\n`;
      }
    });
    
    // Recalculate total
    const total = parsed.diceRolls.reduce((sum, dice) => sum + dice.total, 0) + 
                  parsed.modifiers.reduce((sum, mod) => sum + mod, 0);
    
    // Show modifiers if any
    if (parsed.modifiers.length > 0) {
      const modifierSum = parsed.modifiers.reduce((sum, mod) => sum + mod, 0);
      const modifierStr = parsed.modifiers.map(m => m >= 0 ? `+${m}` : `${m}`).join(' ');
      finalOutput += `<span class="text-gray-400">Modifiers:</span> ${modifierStr} = ${modifierSum}\n`;
    }
    
    finalOutput += `\n<span class="text-green-400">Final Total: ${total}</span>\n\n`;
    finalOutput += getFlavorText({ ...parsed, total });
    
    return { output: finalOutput };
  }
}

function parseExpression(expression: string): ParsedExpression {
  const diceRolls: DiceRoll[] = [];
  const modifiers: number[] = [];
  let hasD20 = false;
  
  // Split by + and - while keeping the operators
  const parts = expression.split(/([+-])/).filter(part => part.trim() !== '');
  
  let currentSign = 1;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    
    if (part === '+') {
      currentSign = 1;
    } else if (part === '-') {
      currentSign = -1;
    } else {
      // Check if it's a dice expression
      const diceMatch = part.match(/^(\d+)d(\d+)$/);
      if (diceMatch) {
        const numDice = parseInt(diceMatch[1]);
        const numSides = parseInt(diceMatch[2]);
        
        if (numDice <= 0 || numDice > 20 || numSides <= 0 || numSides > 100) {
          throw new Error(`Invalid dice: ${part}`);
        }
        
        if (numSides === 20) hasD20 = true;
        
        const roll = rollDice(numDice, numSides);
        if (currentSign === -1) {
          roll.total = -roll.total;
        }
        diceRolls.push(roll);
      } else {
        // It's a modifier
        const modifier = parseInt(part);
        if (isNaN(modifier)) {
          throw new Error(`Invalid modifier: ${part}`);
        }
        modifiers.push(modifier * currentSign);
      }
      currentSign = 1; // Reset for next iteration
    }
  }
  
  if (diceRolls.length === 0) {
    throw new Error('No dice found in expression');
  }
  
  const total = diceRolls.reduce((sum, dice) => sum + Math.abs(dice.total), 0) + 
                modifiers.reduce((sum, mod) => sum + mod, 0);
  
  return { diceRolls, modifiers, total, hasD20 };
}

function getCriticalInfo(dice: DiceRoll): string {
  if (dice.numSides === 20 && dice.numDice === 1) {
    const roll = dice.rolls[0];
    if (roll === 20) return ' 🎉 <span class="text-yellow-400">CRITICAL HIT!</span>';
    if (roll === 1) return ' 💀 <span class="text-red-400">CRITICAL FUMBLE!</span>';
  }
  return '';
}

function getFlavorText(parsed: ParsedExpression): string {
  const { total, hasD20 } = parsed;
  
  if (hasD20) {
    if (total >= 25) return '🌟 <span class="text-yellow-400">Legendary success!</span>';
    if (total >= 20) return '✨ <span class="text-green-400">Excellent result!</span>';
    if (total >= 15) return '👍 <span class="text-blue-400">Good roll!</span>';
    if (total >= 10) return '😐 <span class="text-gray-400">Average result.</span>';
    if (total >= 5) return '😬 <span class="text-orange-400">Could be better...</span>';
    return '💀 <span class="text-red-400">Ouch! That hurt.</span>';
  } else {
    if (total >= 20) return '🎉 <span class="text-yellow-400">Amazing damage!</span>';
    if (total >= 15) return '⚔️ <span class="text-green-400">Solid hit!</span>';
    if (total >= 10) return '👊 <span class="text-blue-400">Good damage!</span>';
    if (total >= 5) return '😐 <span class="text-gray-400">Decent result.</span>';
    return '😅 <span class="text-orange-400">Just a scratch...</span>';
  }
}

export const interactiveCommands: Command[] = [
  {
    name: 'roll',
    description: 'Roll virtual dice with D&D support',
    category: 'interactive',
    usage: 'roll [expression] [adv|dis]',
    examples: ['roll 2d6', 'roll 1d20+5', 'roll 1d20 adv', 'roll 2d6+1d4+3', 'roll 1d20-1 dis'],
    execute: (args: string[], context: TerminalContext): CommandResult => {
      if (args.length === 0) {
        return {
          output: `🎲 <span class="text-cyan-400">Dice Roller</span>

<span class="text-yellow-400">Usage:</span>
• roll 2d6                    - Basic dice roll
• roll 1d20+5                 - Roll with modifier
• roll 1d20 adv               - Roll with advantage
• roll 1d20-2 dis             - Roll with disadvantage
• roll 2d6+1d4+3              - Multiple dice + modifier
• roll 1d8+2+1d6              - Complex expressions

<span class="text-green-400">Advantage/Disadvantage:</span>
• adv = roll twice, take higher
• dis = roll twice, take lower`
        };
      }

      const input = args.join(' ');
      
      // Check for advantage/disadvantage
      const hasAdvantage = /\b(adv|advantage)\b/i.test(input);
      const hasDisadvantage = /\b(dis|disadvantage)\b/i.test(input);
      
      // Remove advantage/disadvantage keywords from expression
      const expression = input.replace(/\b(adv|advantage|dis|disadvantage)\b/gi, '').trim();
      
      try {
        return parseDiceExpression(expression, hasAdvantage, hasDisadvantage, context);
      } catch (error) {
        return {
          output: `❌ Invalid dice expression: "${expression}"

<span class="text-yellow-400">Valid formats:</span>
• XdY (e.g., 2d6, 1d20)
• XdY+Z (e.g., 1d20+5)
• XdY+XdY+Z (e.g., 2d6+1d4+3)
• Add "adv" or "dis" for advantage/disadvantage`
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
            const updatedOutput = tarotReading + `<span class="text-yellow-400">💡 AI readings are temporarily unavailable.</span>

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