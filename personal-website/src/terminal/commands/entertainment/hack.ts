import { Command, CommandResult } from '../../types';

export const hack: Command = {
  name: 'hack',
  description: 'Simulate hacking sequence',
  category: 'entertainment',
  usage: 'hack',
  execute: (): CommandResult => ({
    output: `<span class="text-green-400">Initializing hack sequence...</span>

<span class="text-red-400">WARNING: UNAUTHORIZED ACCESS DETECTED</span>
<span class="text-yellow-400">Bypassing firewall...</span> ████████████ 100%
<span class="text-yellow-400">Cracking encryption...</span> ████████████ 100%
<span class="text-yellow-400">Accessing mainframe...</span> ████████████ 100%

<span class="text-green-400">ACCESS GRANTED</span>

<span class="text-cyan-400">SYSTEM COMPROMISED</span>
<span class="text-gray-400">01001000 01100001 01100011 01101011 01100101 01100100</span>

<span class="text-red-400">Just kidding! 😄</span>
<span class="text-white">This is just a fun simulation. No actual hacking here!</span>

<span class="text-yellow-400">Fun fact:</span> Real cybersecurity is about protection, not intrusion!`
  })
};