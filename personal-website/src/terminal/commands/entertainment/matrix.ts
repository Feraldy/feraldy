import { Command, CommandResult } from '../../types';

export const matrix: Command = {
  name: 'matrix',
  description: 'Enter the Matrix',
  category: 'entertainment',
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
};