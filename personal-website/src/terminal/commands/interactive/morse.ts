import { Command, CommandResult } from '../../types';

export const morse: Command = {
  name: 'morse',
  description: 'Convert text to Morse code',
  category: 'utilities',
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
};