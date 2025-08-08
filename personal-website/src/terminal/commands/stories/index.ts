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
import { blackwoodManorStory } from './blackwoodManor';
import { labExperimentStory } from './labExperiment';
import { forgottenMemoriesStory } from './forgottenMemories';
import { woodsWorldStory } from './woodsWorld';

// Export stories
export { blackwoodManorStory, labExperimentStory, forgottenMemoriesStory, woodsWorldStory };

export const getAllStories = (): Story[] => [
  blackwoodManorStory,
  labExperimentStory,
  forgottenMemoriesStory,
  woodsWorldStory
];

export const getStoryById = (id: string): Story | undefined => {
  return getAllStories().find(story => story.id === id);
};

export const getRandomStory = (): Story => {
  const stories = getAllStories();
  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
};