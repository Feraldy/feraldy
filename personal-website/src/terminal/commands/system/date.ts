import { Command, CommandResult } from '../../types';

export const date: Command = {
  name: 'date',
  description: 'Show current date and time',
  category: 'system',
  usage: 'date',
  execute: (): CommandResult => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
    return {
      output: now.toLocaleDateString('en-US', options)
    };
  }
};