import { Command, CommandResult, TerminalContext } from '../../types';
import { tarotAI } from '../../../utils/tarotAI';
import { tarotRateLimiter } from '../../../utils/rateLimiter';

export const tarot: Command = {
  name: 'tarot',
  description: 'Mystical card reading - ask a question!',
  category: 'games',
  usage: 'tarot [question]',
  execute: (args: string[], context: TerminalContext): CommandResult => {
    const tarotCards = [
      // Major Arcana
      { name: "The Fool", meaning: "New beginnings, innocence, spontaneity, and free spirit await you" },
      { name: "The Magician", meaning: "Manifestation, resourcefulness, power, and inspired action" },
      { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine, and subconscious mind" },
      { name: "The Empress", meaning: "Femininity, beauty, nature, nurturing, and abundance" },
      { name: "The Emperor", meaning: "Authority, establishment, structure, and father figure guidance" },
      { name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs, conformity, and tradition" },
      { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment, and choices" },
      { name: "The Chariot", meaning: "Control, willpower, success, determination, and direction" },
      { name: "Strength", meaning: "Inner strength, bravery, compassion, focus, and influence" },
      { name: "The Hermit", meaning: "Soul searching, introspection, inner guidance, and seeking truth" },
      { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny, and turning point" },
      { name: "Justice", meaning: "Justice, fairness, truth, cause and effect, and law" },
      { name: "The Hanged Man", meaning: "Suspension, restriction, letting go, and sacrifice" },
      { name: "Death", meaning: "Endings, beginnings, change, transformation, and transition" },
      { name: "Temperance", meaning: "Balance, moderation, patience, purpose, and meaning" },
      { name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction, and sexuality" },
      { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation, and awakening" },
      { name: "The Star", meaning: "Hope, faith, purpose, renewal, and spirituality" },
      { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, and intuition" },
      { name: "The Sun", meaning: "Positivity, fun, warmth, success, and vitality" },
      { name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution, and reflection" },
      { name: "The World", meaning: "Completion, accomplishment, travel, and fulfillment" }
    ];

    if (!args || args.length === 0) {
      return {
        output: `🔮 <span class="text-purple-400">Mystical Tarot Reading</span>

<span class="text-yellow-400">Please ask a question to receive guidance from the cards.</span>

<span class="text-gray-300">Usage: tarot [your question]</span>
<span class="text-gray-300">Example: tarot should I change my career?</span>

<span class="text-purple-400">✨ The cards await your question ✨</span>`
      };
    }

    const question = args.join(' ');
    const numCards = Math.floor(Math.random() * 3) + 1; // 1-3 cards
    const selectedCards: Array<{name: string, meaning: string}> = [];
    const usedIndices = new Set<number>();
    
    for (let i = 0; i < numCards; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tarotCards.length);
      } while (usedIndices.has(randomIndex));
      usedIndices.add(randomIndex);
      selectedCards.push(tarotCards[randomIndex]);
    }

    let tarotReading = `🔮 <span class="text-purple-400">Mystical Tarot Reading</span>

<span class="text-yellow-400">Question: "${question}"</span>

<span class="text-cyan-400">The cards have spoken... You drew ${numCards} card${numCards > 1 ? 's' : ''}:</span>

`;
    
    selectedCards.forEach((card, index) => {
      tarotReading += `<span class="text-cyan-400">Card ${index + 1}: ${card.name}</span>
<span class="text-gray-300">${card.meaning}</span>

`;
    });

    const updateId = `tarot-${Date.now()}`;
    
    // Handle AI reading asynchronously using inline updates
    const handleAIReading = async () => {
      try {
        
        if (tarotAI.isAvailable() && tarotRateLimiter.canMakeRequest()) {
          tarotRateLimiter.recordRequest();
          const aiReading = await tarotAI.generateReading(question, selectedCards);
          
          const updatedOutput = tarotReading + `<span class="text-green-400">✨ The Oracle's Interpretation:</span>
<span class="text-gray-300">${aiReading}</span>

<span class="text-yellow-400">Readings remaining: ${tarotRateLimiter.getRemainingRequests()}/3 per hour</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
          
          context.updateCommandOutput?.(updateId, updatedOutput);
        } else if (tarotAI.isAvailable() && !tarotRateLimiter.canMakeRequest()) {
          const timeUntilReset = Math.ceil(tarotRateLimiter.getTimeUntilReset() / (1000 * 60));
          const updatedOutput = tarotReading + `<span class="text-yellow-400">⏰ Reading limit reached. Try again in ${timeUntilReset} minutes.</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
          
          context.updateCommandOutput?.(updateId, updatedOutput);
        } else {
          const updatedOutput = tarotReading + `<span class="text-yellow-400">💡 AI readings are temporarily unavailable.</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
          
          context.updateCommandOutput?.(updateId, updatedOutput);
        }
      } catch (error) {
        console.error('Reading failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const updatedOutput = tarotReading + `<span class="text-red-400">⚠️ The Oracle is currently unavailable.</span>
<span class="text-gray-400">Error: ${errorMessage}</span>

<span class="text-purple-400">✨ May the cards guide your path forward ✨</span>`;
        
        context.updateCommandOutput?.(updateId, updatedOutput);
      }
    };

    // Start reading process
    setTimeout(handleAIReading, 1500);
    
    return { 
      output: tarotReading,
      isUpdating: true,
      updateId
    };
  }
};