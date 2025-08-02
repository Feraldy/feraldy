import { Command, TerminalContext, CommandResult } from '../types';

export const infoCommands: Command[] = [
  {
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
  },
  {
    name: 'manual',
    description: 'Show user manual',
    category: 'info',
    usage: 'manual',
    execute: (): CommandResult => ({
      output: `FERALDY(1)                    User Manual                    FERALDY(1)

NAME
     feraldy - Test Engineer and Project Manager

SYNOPSIS
     feraldy [--role=test-engineer|project-manager] [--coffee=required]

DESCRIPTION
     Feraldy is a dedicated Test Engineer and Project Manager with over 3 years
     of experience in quality assurance and product development.

OPTIONS
     --experience    3+ years in QA and Product Development
     --skills        Playwright, TypeScript, Python, Qase.io, ClickUp
     --passion       QA automation, process improvement, product management
     --location      Netherlands - Remote

EXAMPLES
     feraldy --role=test-engineer   # Professional QA mode
     feraldy --role=project-manager # Efficient PM mode

SEE ALSO
     /projects, resume (terminal command), /contact

AUTHOR
     Feraldy Nathanael <fn.archived@gmail.com>`
    })
  },
  {
    name: 'mood',
    description: 'Show current mood',
    category: 'info',
    usage: 'mood',
    execute: (): CommandResult => {
      const moods = [
        "Optimistic and ready to tackle new challenges!",
        "Motivated and focused on continuous improvement",
        "Creative and solution-oriented",
        "Determined to deliver quality results",
        "Caffeinated and productive",
        "Enthusiastic about learning new technologies"
      ];
      return {
        output: moods[Math.floor(Math.random() * moods.length)]
      };
    }
  }
];