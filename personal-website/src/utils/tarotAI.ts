import { GoogleGenerativeAI } from '@google/generative-ai';

interface TarotCard {
  name: string;
  meaning: string;
}

interface TarotReading {
  question: string;
  cards: TarotCard[];
  aiReading?: string;
  error?: string;
}

class TarotAIService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initializeAI();
  }

  private initializeAI(): void {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log('Initializing AI with key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
    
    if (!apiKey || apiKey === 'your-gemini-api-key') {
      console.warn('Gemini API key not configured. AI readings will be unavailable.');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      console.log('Gemini AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  async generateReading(question: string, cards: TarotCard[]): Promise<string> {
    if (!this.model) {
      throw new Error('AI service not available. Please configure your Gemini API key.');
    }

    const prompt = this.buildPrompt(question, cards);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Failed to generate AI reading:', error);
      throw new Error('Failed to connect to AI service. Please try again later.');
    }
  }

  private buildPrompt(question: string, cards: TarotCard[]): string {
    const cardDescriptions = cards.map((card, index) => 
      `Card ${index + 1}: ${card.name} - ${card.meaning}`
    ).join('\n');

    return `You are a wise and intuitive tarot reader with deep knowledge of tarot symbolism and meanings. A person has asked you a question and drawn ${cards.length} card${cards.length > 1 ? 's' : ''} from the Major Arcana.

Question: "${question}"

Cards drawn:
${cardDescriptions}

Please provide a thoughtful, insightful tarot reading that:
1. Addresses their specific question directly
2. Interprets how each card relates to their situation
3. Explains the connection between the cards and their question
4. Offers guidance and perspective based on the cards' meanings
5. Maintains a mystical but helpful tone
6. Keeps the reading between 150-300 words

IMPORTANT FORMATTING RULES:
- DO NOT use markdown formatting like **bold** or *italic*
- DO NOT use markdown headers like # or ##
- Use plain text for the main content
- If you need to emphasize something, use HTML span tags with CSS classes like:
  - <span class="text-yellow-400">highlighted text</span> for important points
  - <span class="text-cyan-400">card names or key concepts</span>
  - <span class="text-purple-400">mystical elements</span>
  - <span class="text-green-400">positive guidance</span>
- Keep the response as flowing prose without excessive formatting

Remember to be encouraging while being honest about what the cards suggest. Focus on empowerment and personal growth rather than making definitive predictions about the future.`;
  }

  isAvailable(): boolean {
    return this.model !== null;
  }
}

export const tarotAI = new TarotAIService();
export type { TarotCard, TarotReading };