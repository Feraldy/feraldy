import { GoogleGenerativeAI } from '@google/generative-ai';

interface TarotCard {
  name: string;
  meaning: string;
}

interface TarotRequest {
  question: string;
  cards: TarotCard[];
}

interface VercelRequest {
  method?: string;
  body: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { question, cards }: TarotRequest = req.body;

    if (!question || !cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = buildPrompt(question, cards);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reading = response.text();

    return res.status(200).json({ reading });
  } catch (error) {
    console.error('Failed to generate AI reading:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ 
      error: 'Failed to generate reading',
      details: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}

function buildPrompt(question: string, cards: TarotCard[]): string {
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
5. Keeps the reading between 150-300 words

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