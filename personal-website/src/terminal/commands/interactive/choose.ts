import { Command, CommandResult } from '../../types';

export const choose: Command = {
  name: 'choose',
  description: 'Pick randomly from options',
  category: 'utilities',
  usage: 'choose [option1] [option2]',
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
};