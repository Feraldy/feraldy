export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  status: 'Active' | 'In Development' | 'Completed' | 'Archived';
  image: string;
  storySlug: string;
}