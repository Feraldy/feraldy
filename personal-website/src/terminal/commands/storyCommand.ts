import { Command, TerminalContext, CommandResult } from '../types';
import { getAllStories, getStoryById, getRandomStory, Story } from './stories';

export const storyCommand: Command = {
  name: 'story',
  description: 'Interactive horror adventures with multiple stories',
  category: 'games',
  usage: 'story',
  examples: ['story', 'story a', 'story list', 'story random', 'story midnight-library', 'story reset'],
  execute: (args: string[], context: TerminalContext): CommandResult => {
    const choice = args[0]?.toLowerCase() || '';

    if (choice === 'reset') {
      context.setCurrentStoryState(null);
      context.setCurrentStoryId(null);
      return {
        output: `<span class="text-cyan-400">🔄 Story Reset</span>

Your adventure has been reset. Type 'story' to begin a new random journey!`
      };
    }

    if (choice === 'list') {
      const stories = getAllStories();
      return {
        output: `<span class="text-cyan-400">📚 Available Stories</span>

${stories.map(story => 
  `<span class="text-yellow-400">${story.id}</span> - ${story.title}
  <span class="text-gray-400">${story.description}</span>`
).join('\n\n')}

<span class="text-green-400">Commands:</span>
• <span class="text-yellow-400">story</span> - Start a random story
• <span class="text-yellow-400">story [story-id]</span> - Start a specific story
• <span class="text-yellow-400">story random</span> - Start a random story`
      };
    }

    // Handle starting a new story
    if (!choice || choice === '' || choice === 'random') {
      const selectedStory = choice === 'random' ? getRandomStory() : 
                           getStoryById(choice) || getRandomStory();
      
      const startNode = selectedStory.nodes[selectedStory.startNode];
      context.setCurrentStoryState(selectedStory.startNode);
      context.setCurrentStoryId(selectedStory.id);
      
      return {
        output: `${startNode.title}

${startNode.text}

<span class="text-green-400">Choices:</span>
${Object.entries(startNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision (e.g., 'story a' or 'story history')</span>
<span class="text-gray-400">Currently playing: ${selectedStory.title}</span>`
      };
    }

    // Check if it's a story ID
    const storyById = getStoryById(choice);
    if (storyById) {
      const startNode = storyById.nodes[storyById.startNode];
      context.setCurrentStoryState(storyById.startNode);
      context.setCurrentStoryId(storyById.id);
      
      return {
        output: `${startNode.title}

${startNode.text}

<span class="text-green-400">Choices:</span>
${Object.entries(startNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision</span>
<span class="text-gray-400">Currently playing: ${storyById.title}</span>`
      };
    }

    // Handle choice selection - but only if story has been started
    if (!context.currentStoryState || !context.currentStoryId) {
      return {
        output: `<span class="text-red-400">No story in progress!</span> 

Type 'story' first to begin your adventure, then you can make choices like 'story a' or 'story history'.`
      };
    }

    const currentStory = getStoryById(context.currentStoryId);
    if (!currentStory) {
      return {
        output: `<span class="text-red-400">Error:</span> Current story not found. Type 'story reset' to restart.`
      };
    }

    const storyNode = currentStory.nodes[context.currentStoryState];
    if (!storyNode) {
      return {
        output: `<span class="text-red-400">Error:</span> Story state corrupted. Type 'story reset' to restart.`
      };
    }

    const selectedChoice = storyNode.choices[choice];
    if (!selectedChoice) {
      return {
        output: `<span class="text-red-400">Invalid choice:</span> "${choice}"

<span class="text-green-400">Available choices:</span>
${Object.entries(storyNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to make your decision</span>`
      };
    }

    // Move to next story node
    const nextNode = currentStory.nodes[selectedChoice.next];
    if (!nextNode) {
      return {
        output: `<span class="text-red-400">Error:</span> Story path not found. Type 'story reset' to restart.`
      };
    }

    context.setCurrentStoryState(selectedChoice.next);

    let output = `<span class="text-cyan-400">You chose:</span> ${selectedChoice.text}

${nextNode.title}

${nextNode.text}`;

    // Add choices if this isn't an ending
    if (Object.keys(nextNode.choices).length > 0) {
      output += `

<span class="text-green-400">Choices:</span>
${Object.entries(nextNode.choices).slice(0, 3).map(([key, choiceData]) => 
  `<span class="text-yellow-400">${key.toUpperCase()}</span>) ${choiceData.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [choice]' to continue your adventure</span>`;
    }

    return { output };
  }
};