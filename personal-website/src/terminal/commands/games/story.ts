import { Command, TerminalContext, CommandResult } from '../../types';
import { getAllStories, getStoryById, getRandomStory } from '../stories';

export const story: Command = {
  name: 'story',
  description: 'Interactive horror adventures with multiple stories',
  category: 'games',
  usage: 'story',
  examples: ['story', 'story a', 'story list', 'story random', 'story midnight-library', 'story reset'],
  execute: (args: string[], context: TerminalContext): CommandResult => {
    const choice = args[0]?.toLowerCase() || '';

    if (choice === 'reset') {
      context.setCurrentStoryState?.(null);
      context.setCurrentStoryId?.(null);
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
      context.setCurrentStoryState?.(selectedStory.startNode);
      context.setCurrentStoryId?.(selectedStory.id);
      
      const choiceEntries = Object.entries(startNode.choices);
      
      return {
        output: `${startNode.title}

${startNode.text}

${choiceEntries.map(([, choiceObj], index) => 
  `<span class="text-yellow-400">${String.fromCharCode(97 + index)}</span>) ${choiceObj.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [letter]' to make your choice</span>`
      };
    }

    // Handle story progression
    if (context.currentStoryState && context.currentStoryId) {
      const currentStory = getStoryById(context.currentStoryId);
      if (!currentStory) {
        return { output: 'Story not found. Type "story reset" to start over.' };
      }

      const currentNode = currentStory.nodes[context.currentStoryState];
      if (!currentNode) {
        return { output: 'Invalid story state. Type "story reset" to start over.' };
      }

      const choiceEntries = Object.entries(currentNode.choices);
      const choiceIndex = choice.charCodeAt(0) - 97; // Convert 'a' to 0, 'b' to 1, etc.
      
      if (choiceIndex < 0 || choiceIndex >= choiceEntries.length) {
        return {
          output: `Invalid choice. Please choose from:
${choiceEntries.map(([, choiceObj], index) => 
  `<span class="text-yellow-400">${String.fromCharCode(97 + index)}</span>) ${choiceObj.text}`
).join('\n')}`
        };
      }

      const [, selectedChoice] = choiceEntries[choiceIndex];
      const nextNode = currentStory.nodes[selectedChoice.next];
      
      if (!nextNode) {
        return { output: 'Story path not found. Type "story reset" to start over.' };
      }

      context.setCurrentStoryState?.(selectedChoice.next);

      let output = `${nextNode.title}

${nextNode.text}`;

      const nextChoiceEntries = Object.entries(nextNode.choices);
      if (nextChoiceEntries.length > 0) {
        output += `

${nextChoiceEntries.map(([, choiceObj], index) => 
  `<span class="text-yellow-400">${String.fromCharCode(97 + index)}</span>) ${choiceObj.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [letter]' to make your choice</span>`;
      } else {
        // End of story
        output += `

<span class="text-green-400">🎭 The End</span>

<span class="text-cyan-400">Thanks for playing! Type 'story' to start a new adventure.</span>`;
        context.setCurrentStoryState?.(null);
        context.setCurrentStoryId?.(null);
      }

      return { output };
    }

    // Try to start a specific story by ID
    const selectedStory = getStoryById(choice);
    if (selectedStory) {
      const startNode = selectedStory.nodes[selectedStory.startNode];
      context.setCurrentStoryState?.(selectedStory.startNode);
      context.setCurrentStoryId?.(selectedStory.id);
      
      const choiceEntries = Object.entries(startNode.choices);
      
      return {
        output: `${startNode.title}

${startNode.text}

${choiceEntries.map(([, choiceObj], index) => 
  `<span class="text-yellow-400">${String.fromCharCode(97 + index)}</span>) ${choiceObj.text}`
).join('\n')}

<span class="text-gray-400">Type 'story [letter]' to make your choice</span>`
      };
    }

    return {
      output: `Unknown command or story: "${choice}"

<span class="text-yellow-400">Available commands:</span>
• story - Start a random story
• story list - Show available stories
• story [story-id] - Start a specific story
• story reset - Reset current story`
    };
  }
};