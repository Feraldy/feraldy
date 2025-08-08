import { Command, CommandResult } from '../../types';

export const ls: Command = {
  name: 'ls',
  description: 'List files and directories',
  category: 'system',
  usage: 'ls',
  execute: (): CommandResult => ({
    output: `drwxr-xr-x  <span class="text-yellow-400">projects/</span>
drwxr-xr-x  <span class="text-yellow-400">resume/</span>
drwxr-xr-x  <span class="text-yellow-400">blog/</span>
-rwxr-xr-x  <span class="text-yellow-400">contact.sh</span>`
  })
};