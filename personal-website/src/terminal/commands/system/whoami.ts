import { Command, CommandResult } from '../../types';

export const whoami: Command = {
  name: 'whoami',
  description: 'Show current user info',
  category: 'system',
  usage: 'whoami',
  execute: (): CommandResult => ({
    output: 'feraldy - Test Engineer & Project Manager'
  })
};