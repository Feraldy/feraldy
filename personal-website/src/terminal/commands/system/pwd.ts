import { Command, CommandResult } from '../../types';

export const pwd: Command = {
  name: 'pwd',
  description: 'Print working directory',
  category: 'system',
  usage: 'pwd',
  execute: (): CommandResult => ({
    output: '/home/feraldy/portfolio'
  })
};