import { Command, TerminalContext, CommandResult } from '../../types';

interface HangmanState {
  currentWord: string;
  category: string;
  guessedLetters: string[];
  wrongGuesses: string[];
  maxWrongGuesses: number;
  hint?: string;
  isGameOver: boolean;
  isWon: boolean;
}

export const hangman: Command = {
  name: 'hangman',
  description: 'Word guessing game with programming terms',
  category: 'games',
  usage: 'hangman [letter|hint|reset|quit]',
  examples: ['hangman', 'hangman a', 'hangman hint', 'hangman reset'],
  execute: (args: string[], context: TerminalContext): CommandResult => {
    const action = args[0]?.toLowerCase() || '';

    const wordCategories = {
      'Programming Languages': [
        { word: 'JAVASCRIPT', hint: 'Popular web scripting language' },
        { word: 'PYTHON', hint: 'Created by Guido van Rossum' },
        { word: 'TYPESCRIPT', hint: 'JavaScript with static typing' },
        { word: 'RUST', hint: 'Systems programming language focused on safety' },
        { word: 'GOLANG', hint: 'Google\'s programming language' },
        { word: 'KOTLIN', hint: 'JetBrains language for Android development' },
        { word: 'SWIFT', hint: 'Apple\'s programming language' },
        { word: 'CSHARP', hint: 'Microsoft\'s object-oriented language' }
      ],
      'Web Technologies': [
        { word: 'REACT', hint: 'Facebook\'s UI library' },
        { word: 'ANGULAR', hint: 'Google\'s web framework' },
        { word: 'NODEJS', hint: 'JavaScript runtime for servers' },
        { word: 'WEBPACK', hint: 'Module bundler for JavaScript' },
        { word: 'GRAPHQL', hint: 'Query language for APIs' },
        { word: 'MONGODB', hint: 'NoSQL document database' },
        { word: 'POSTGRESQL', hint: 'Advanced open source database' },
        { word: 'DOCKER', hint: 'Containerization platform' }
      ],
      'Tech Companies': [
        { word: 'MICROSOFT', hint: 'Windows and Office creator' },
        { word: 'GOOGLE', hint: 'Search engine giant' },
        { word: 'FACEBOOK', hint: 'Social media platform (now Meta)' },
        { word: 'AMAZON', hint: 'E-commerce and cloud computing' },
        { word: 'NETFLIX', hint: 'Streaming service company' },
        { word: 'SPOTIFY', hint: 'Music streaming platform' },
        { word: 'GITHUB', hint: 'Code hosting platform' },
        { word: 'STACKOVERFLOW', hint: 'Programming Q&A community' }
      ]
    };

    const getRandomWord = () => {
      const categories = Object.keys(wordCategories);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const categoryWords = wordCategories[randomCategory as keyof typeof wordCategories];
      const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
      
      return {
        word: randomWord.word,
        category: randomCategory,
        hint: randomWord.hint
      };
    };

    // Initialize or get game state
    let gameState: HangmanState = context.hangmanState;

    // Handle reset
    if (action === 'reset' || !gameState) {
      const { word, category, hint } = getRandomWord();
      gameState = {
        currentWord: word,
        category,
        guessedLetters: [],
        wrongGuesses: [],
        maxWrongGuesses: 6,
        hint,
        isGameOver: false,
        isWon: false
      };
      context.setHangmanState?.(gameState);

      return {
        output: `🎯 <span class="text-cyan-400">Hangman - New Game Started!</span>

Word: ${gameState.currentWord.split('').map(() => '_').join(' ')} (${gameState.currentWord.length} letters)
Category: <span class="text-yellow-400">${gameState.category}</span>

Wrong guesses: 0/${gameState.maxWrongGuesses}
Guessed letters: none

<span class="text-green-400">Commands:</span>
• hangman [letter] - Guess a letter
• hangman hint - Get a hint
• hangman reset - Start new game
• hangman quit - Exit game

<span class="text-gray-400">Guess a letter to start!</span>`
      };
    }

    // Handle quit
    if (action === 'quit') {
      context.setHangmanState?.(null);
      return {
        output: `🎯 <span class="text-cyan-400">Thanks for playing Hangman!</span>

Come back anytime to test your word skills!`
      };
    }

    // Handle hint
    if (action === 'hint') {
      return {
        output: `🎯 <span class="text-cyan-400">Hangman - Hint</span>

Word: ${gameState.currentWord.split('').map(letter => 
          gameState.guessedLetters.includes(letter) ? letter : '_'
        ).join(' ')} (${gameState.currentWord.length} letters)
Category: <span class="text-yellow-400">${gameState.category}</span>

<span class="text-purple-400">💡 Hint:</span> ${gameState.hint}

Wrong guesses: ${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses}
Guessed letters: ${gameState.guessedLetters.length > 0 ? gameState.guessedLetters.join(', ') : 'none'}

<span class="text-gray-400">Continue guessing letters!</span>`
      };
    }

    // Handle letter guess
    if (action && action.length === 1 && /[a-z]/i.test(action)) {
      const letter = action.toUpperCase();
      
      if (gameState.isGameOver) {
        return {
          output: `🎯 <span class="text-cyan-400">Game Over!</span>

The game has ended. Type 'hangman reset' to start a new game!`
        };
      }

      if (gameState.guessedLetters.includes(letter)) {
        return {
          output: `🎯 <span class="text-cyan-400">Hangman</span>

You already guessed the letter '${letter}'. Try a different letter!

Word: ${gameState.currentWord.split('').map(char => 
          gameState.guessedLetters.includes(char) ? char : '_'
        ).join(' ')}
Wrong guesses: ${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses}
Guessed letters: ${gameState.guessedLetters.join(', ')}`
        };
      }

      gameState.guessedLetters.push(letter);

      if (gameState.currentWord.includes(letter)) {
        // Correct guess
        const wordDisplay = gameState.currentWord.split('').map(char => 
          gameState.guessedLetters.includes(char) ? char : '_'
        ).join(' ');

        // Check if word is complete
        if (!wordDisplay.includes('_')) {
          gameState.isGameOver = true;
          gameState.isWon = true;
          context.setHangmanState?.(gameState);

          return {
            output: `🎯 <span class="text-cyan-400">Hangman</span>

Word: <span class="text-green-400">${gameState.currentWord}</span> ✅
Category: ${gameState.category}

<span class="text-green-400">🎉 CONGRATULATIONS! You won!</span>

Wrong guesses: ${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses}
Total guesses: ${gameState.guessedLetters.length}

<span class="text-yellow-400">Type 'hangman reset' to play again!</span>`
          };
        }

        context.setHangmanState?.(gameState);

        return {
          output: `🎯 <span class="text-cyan-400">Hangman</span>

<span class="text-green-400">Good guess! '${letter}' is in the word.</span>

Word: ${wordDisplay}
Category: ${gameState.category}

Wrong guesses: ${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses}
Guessed letters: ${gameState.guessedLetters.join(', ')}

<span class="text-gray-400">Keep guessing!</span>`
        };
      } else {
        // Wrong guess
        gameState.wrongGuesses.push(letter);

        if (gameState.wrongGuesses.length >= gameState.maxWrongGuesses) {
          gameState.isGameOver = true;
          gameState.isWon = false;
          context.setHangmanState?.(gameState);

          return {
            output: `🎯 <span class="text-cyan-400">Hangman</span>

<span class="text-red-400">Wrong guess! '${letter}' is not in the word.</span>

Word: ${gameState.currentWord.split('').map(char => 
              gameState.guessedLetters.includes(char) ? char : '_'
            ).join(' ')}

<span class="text-red-400">💀 GAME OVER! You've run out of guesses.</span>
The word was: <span class="text-yellow-400">${gameState.currentWord}</span>

Wrong guesses: ${gameState.wrongGuesses.join(', ')} (${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses})

<span class="text-yellow-400">Type 'hangman reset' to try again!</span>`
          };
        }

        context.setHangmanState?.(gameState);

        return {
          output: `🎯 <span class="text-cyan-400">Hangman</span>

<span class="text-red-400">Wrong guess! '${letter}' is not in the word.</span>

Word: ${gameState.currentWord.split('').map(char => 
          gameState.guessedLetters.includes(char) ? char : '_'
        ).join(' ')}
Category: ${gameState.category}

Wrong guesses: ${gameState.wrongGuesses.join(', ')} (${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses})
Guessed letters: ${gameState.guessedLetters.join(', ')}

<span class="text-gray-400">${gameState.maxWrongGuesses - gameState.wrongGuesses.length} wrong guesses remaining!</span>`
        };
      }
    }

    // Show current game state or start new game
    if (!gameState || gameState.isGameOver) {
      const { word, category, hint } = getRandomWord();
      gameState = {
        currentWord: word,
        category,
        guessedLetters: [],
        wrongGuesses: [],
        maxWrongGuesses: 6,
        hint,
        isGameOver: false,
        isWon: false
      };
      context.setHangmanState?.(gameState);
    }

    return {
      output: `🎯 <span class="text-cyan-400">Hangman Game</span>

Word: ${gameState.currentWord.split('').map(char => 
        gameState.guessedLetters.includes(char) ? char : '_'
      ).join(' ')} (${gameState.currentWord.length} letters)
Category: <span class="text-yellow-400">${gameState.category}</span>

Wrong guesses: ${gameState.wrongGuesses.length}/${gameState.maxWrongGuesses}
${gameState.wrongGuesses.length > 0 ? `Wrong letters: ${gameState.wrongGuesses.join(', ')}` : ''}
${gameState.guessedLetters.length > 0 ? `Guessed letters: ${gameState.guessedLetters.join(', ')}` : 'Guessed letters: none'}

<span class="text-green-400">Commands:</span>
• hangman [letter] - Guess a letter (a-z)
• hangman hint - Get a hint about the word
• hangman reset - Start a new game
• hangman quit - Exit the game

<span class="text-gray-400">Guess a letter!</span>`
    };
  }
};