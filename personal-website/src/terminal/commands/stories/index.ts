// Story System Types
export interface StoryChoice {
  text: string;
  next: string;
}

export interface StoryNode {
  title: string;
  text: string;
  choices: Record<string, StoryChoice>;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  theme: string;
  nodes: Record<string, StoryNode>;
  startNode: string;
}

// Import all stories
import { midnightLibraryStory } from './midnightLibrary';
import { hauntedMansionStory } from './hauntedMansion';
import { cursedForestStory } from './cursedForest';

// Export stories
export { midnightLibraryStory, hauntedMansionStory, cursedForestStory };

export const getAllStories = (): Story[] => [
  midnightLibraryStory,
  hauntedMansionStory,
  cursedForestStory
];

export const getStoryById = (id: string): Story | undefined => {
  return getAllStories().find(story => story.id === id);
};

export const getRandomStory = (): Story => {
  const stories = getAllStories();
  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
};