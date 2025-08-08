import { Command, CommandResult } from '../../types';

export const dy: Command = {
  name: 'dy',
  description: 'Show personal info menu',
  category: 'info',
  usage: 'dy [--option]',
  examples: ['dy --history', 'dy --skills', 'dy --achievements'],
  execute: (args: string[]): CommandResult => {
    const option = args[0];
    
    switch (option) {
      case '--history':
        return {
          output: `Career Timeline:
2024-Present  Test Engineer & Project Manager
              • RiddleStory / Enboq
              • QA Process, E2E Testing, PRDs

2022-2023     QA Automation Engineer
              • NiceDay Nederland
              • Appium, Pytest, CI/CD

2021-2022     Game Tester Intern
              • Agate International
              • Manual Testing, Test Cases

Education:
              • B.Sc. Computer Science - ITS (2018-2022)`
        };
        
      case '--tree':
        return {
          output: `Skills Tree:
├── Quality Assurance
│   ├── Test Planning & Strategy
│   ├── Automation (Playwright, Selenium, Appium)
│   ├── Manual & Exploratory Testing
│   └── API Testing (Postman)
├── Project Management
│   ├── Product Requirement Docs (PRDs)
│   ├── Gantt Charts & Timelines
│   └── Agile/Scrum Methodologies
├── Programming Languages
│   ├── TypeScript
│   ├── Python
│   └── JavaScript
└── Tools & Technologies
    ├── Qase.io, ClickUp
    ├── Git/GitHub, Jenkins
    └── CI/CD, Node.js`
        };
        
      case '--skills':
        return {
          output: `Technical Skills:

Quality Assurance:
   • Test Automation      ███████████  Advanced
   • Manual Testing       ████████████ Expert
   • API Testing          █████████    Intermediate
   • Process Improvement  ██████████   Advanced

Programming:
   • TypeScript           ██████████   Advanced
   • Python               █████████    Intermediate
   • JavaScript           ████████     Intermediate

Tools:
   • Playwright           ███████████  Advanced
   • Qase.io              ████████████ Expert
   • ClickUp              ██████████   Advanced
   • Jenkins              ████████     Intermediate`
        };
        
      case '--achievements':
        return {
          output: `Achievements Unlocked:

Test Engineer (2021-Present)
   3+ years of professional experience

Project Manager (2024-Present)
   Managing product dev with 45+ PRDs

Automation Expert
   Developed 441+ E2E tests (Playwright)

Process Improver
   Established QA processes from scratch

Team Player
   Strong collaboration with dev & product teams

Next Achievement: Senior Test Engineer`
        };
        
      case '--top':
        return {
          output: `Top Skills & Projects:

Hot Skills:
1. QA Automation          ███████████  90%
2. Project Management     █████████    80%
3. E2E Testing            ██████████   85%
4. Process Improvement    ████████████ 95%

Active Projects:
1. Enboq Platform         (Test Engineering)
2. RiddleStory App        (Project Management)
3. This Portfolio         (Personal Project)

Focus Areas:
• QA Process Implementation
• E2E & API Automation
• Product Requirement Docs`
        };
        
      default:
        return {
          output: `Running Version 1.1.0

Usage: >
  <span class="text-yellow-400">dy --history</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's history
  <span class="text-yellow-400">dy --tree</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's skill tree                  
  <span class="text-yellow-400">dy --skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's skills & expertise
  <span class="text-yellow-400">dy --achievements</span>&nbsp;&nbsp;- Show feraldy's achievements
  <span class="text-yellow-400">dy --top</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show top skills & projects`
        };
    }
  }
};