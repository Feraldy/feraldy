import { Command, TerminalContext, CommandResult } from '../types';
import { getAllCommands } from './commandUtils';

export const systemCommands: Command[] = [
  {
    name: 'debug',
    description: 'Debug command registry',
    category: 'system',
    usage: 'debug',
    execute: (): CommandResult => {
      const allCommands = getAllCommands();
      const commands = allCommands.map(cmd => cmd.name).sort();
      const newCommands = ['coffee-order', 'playlist', 'bucket-list', 'typing-test', 'performance', 'base64'];
      const foundCommands = newCommands.filter(cmd => commands.includes(cmd));
      const missingCommands = newCommands.filter(cmd => !commands.includes(cmd));
      return { 
        output: `Available commands (${commands.length}):\n${commands.join(', ')}\n\nNew commands found (${foundCommands.length}/${newCommands.length}):\n${foundCommands.join(', ')}\n\nMissing commands (${missingCommands.length}):\n${missingCommands.join(', ')}` 
      };
    }
  },
  {
    name: 'clear',
    description: 'Clear the terminal screen',
    category: 'system',
    usage: 'clear',
    execute: (args: string[], context: TerminalContext): CommandResult => {
      context.setCommandHistory([]);
      return { output: '', shouldAddToHistory: false };
    }
  },
  {
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
  },
  {
    name: 'pwd',
    description: 'Print working directory',
    category: 'system',
    usage: 'pwd',
    execute: (): CommandResult => ({
      output: '/home/feraldy/portfolio'
    })
  },
  {
    name: 'whoami',
    description: 'Show current user info',
    category: 'system',
    usage: 'whoami',
    execute: (): CommandResult => ({
      output: 'feraldy - Test Engineer & Project Manager'
    })
  },
  {
    name: 'version',
    description: 'Show version information',
    category: 'system',
    usage: 'version',
    execute: (): CommandResult => ({
      output: '1.0.0'
    })
  },
  {
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
  },
  {
    name: 'uptime',
    description: 'Show system uptime',
    category: 'system',
    usage: 'uptime',
    execute: (): CommandResult => {
      const startDate = new Date('2022-01-01');
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      
      return {
        output: `System uptime: ${years} years, ${remainingDays} days
Load average: High motivation, Steady learning, Continuous improvement`
      };
    }
  },
  {
    name: 'ps',
    description: 'Show running processes',
    category: 'system',
    usage: 'ps',
    execute: (): CommandResult => ({
      output: `PID  COMMAND                 STATUS    CPU%  MEM%
1001 qa-automation.exe         Running   25%   15%
1002 web-development.js        Running   30%   20%
1003 problem-solving.py        Running   20%   10%
1004 continuous-learning.sh    Running   15%   8%
1005 team-collaboration.exe    Running   10%   7%`
    })
  },
  {
    name: 'df',
    description: 'Show filesystem usage',
    category: 'system',
    usage: 'df [-h]',
    aliases: ['df -h', 'df h'],
    execute: (): CommandResult => ({
      output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/skills     100G   85G   15G  85% /expertise
/dev/experience 100G   75G   25G  75% /career
/dev/motivation 100G   95G    5G  95% /passion
/dev/learning   100G   60G   40G  60% /growth
/dev/coffee     10G    9G    1G   90% /productivity

Note: High usage indicates strong proficiency!`
    })
  },
  {
    name: 'cal',
    description: 'Show calendar',
    category: 'system',
    usage: 'cal',
    execute: (): CommandResult => {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      let calendar = `${monthName}<br>`;
      calendar += `Su&nbsp;Mo&nbsp;Tu&nbsp;We&nbsp;Th&nbsp;Fr&nbsp;Sa<br>`;

      let day = 1;
      for (let i = 0; i < 6; i++) {
        let week = '';
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            week += '&nbsp;&nbsp;&nbsp;';
          } else if (day > daysInMonth) {
            break;
          } else {
            const isWeekend = j === 0 || j === 6;
            const dayStr = day < 10 ? `&nbsp;${day}` : `${day}`;
            if (isWeekend) {
              week += `<span class="text-red-400">${dayStr}</span>&nbsp;`;
            } else {
              week += `${dayStr}&nbsp;`;
            }
            day++;
          }
        }
        calendar += week.trimEnd() + '<br>';
        if (day > daysInMonth) {
          break;
        }
      }
      
      return {
        output: `${calendar}
📅 Highlighted Dates:
• <span class="text-yellow-400">Every day:</span> Learning something new
• <span class="text-yellow-400">Weekdays:</span> Professional QA work
• <span class="text-yellow-400">Weekends:</span> Personal projects & growth`
      };
    }
  },
  {
    name: 'ping',
    description: 'Show social links',
    category: 'system',
    usage: 'ping',
    execute: (): CommandResult => ({
      output: `PING social-media-profiles:
linkedin.com/in/feraldy     64 bytes  time=1ms   Connected
github.com/feraldy          64 bytes  time=2ms   Connected
portfolio.feraldy.dev       64 bytes  time=1ms   Connected

--- Social Network Statistics ---
3 packets transmitted, 3 received, 0% packet loss`
    })
  }
];