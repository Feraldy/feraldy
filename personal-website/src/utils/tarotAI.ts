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
  async generateReading(question: string, cards: TarotCard[]): Promise<string> {
    try {
      const response = await fetch('/api/tarot-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, cards }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to generate reading');
      }

      const data = await response.json();
      return data.reading;
    } catch (error) {
      console.error('Failed to generate AI reading:', error);
      throw new Error('Failed to connect to Oracle Please try again later.');
    }
  }

  isAvailable(): boolean {
    return true;
  }
}

export const tarotAI = new TarotAIService();
export type { TarotCard, TarotReading };