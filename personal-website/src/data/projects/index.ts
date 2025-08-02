import { Project } from './types';

// Dynamically import all project files
const projectModules = import.meta.glob('./*Project.ts', { 
  eager: true,
  import: 'default' 
});

// Extract projects from modules and sort by ID
export const projects: Project[] = Object.values(projectModules)
  .filter((project): project is Project => 
    project !== null && 
    typeof project === 'object' && 
    'id' in project
  )
  .sort((a, b) => a.id - b.id);

export * from './types';