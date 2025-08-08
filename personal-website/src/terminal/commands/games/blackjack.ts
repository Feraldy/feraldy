import { Command, TerminalContext, CommandResult } from '../../types';

interface Card {
  suit: string;
  rank: string;
  value: number;
}

interface GameState {
  playerHand: Card[];
  dealerHand: Card[];
  playerChips: number;
  currentBet: number;
  gamePhase: 'betting' | 'playing' | 'dealer' | 'finished';
  deck: Card[];
}

export const blackjack: Command = {
  name: 'blackjack',
  description: 'Play blackjack card game',
  category: 'games',
  usage: 'blackjack [hit|stand|double|bet|quit|reset]',
  examples: ['blackjack', 'blackjack hit', 'blackjack stand', 'blackjack bet 20', 'blackjack reset'],
  execute: (args: string[], context: TerminalContext): CommandResult => {
    const action = args[0]?.toLowerCase() || '';

    // Initialize or get game state
    let gameState: GameState = context.blackjackState || {
      playerHand: [],
      dealerHand: [],
      playerChips: 100,
      currentBet: 0,
      gamePhase: 'betting',
      deck: []
    };

    const createDeck = (): Card[] => {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      const deck: Card[] = [];

      for (const suit of suits) {
        for (const rank of ranks) {
          let value = parseInt(rank);
          if (rank === 'Jack' || rank === 'Queen' || rank === 'King') value = 10;
          if (rank === 'Ace') value = 11;
          deck.push({ suit, rank, value });
        }
      }

      // Shuffle deck
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      return deck;
    };

    const calculateHandValue = (hand: Card[]): number => {
      let value = 0;
      let aces = 0;

      for (const card of hand) {
        if (card.rank === 'Ace') {
          aces++;
          value += 11;
        } else {
          value += card.value;
        }
      }

      // Adjust for aces
      while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
      }

      return value;
    };

    const formatHand = (hand: Card[], hideFirst = false): string => {
      return hand.map((card, index) => {
        if (hideFirst && index === 0) {
          return '[Hidden Card]';
        }
        return `${card.rank} of ${card.suit}`;
      }).join(', ');
    };

    const dealCard = (): Card => {
      if (gameState.deck.length === 0) {
        gameState.deck = createDeck();
      }
      return gameState.deck.pop()!;
    };

    // Handle reset
    if (action === 'reset') {
      context.setBlackjackState?.({
        playerHand: [],
        dealerHand: [],
        playerChips: 100,
        currentBet: 0,
        gamePhase: 'betting',
        deck: []
      });
      return {
        output: `🃏 <span class="text-cyan-400">Blackjack Game Reset</span>

Your chips have been reset to 100. Type 'blackjack' to start a new game!`
      };
    }

    // Handle quit
    if (action === 'quit') {
      context.setBlackjackState?.(null);
      return {
        output: `🃏 <span class="text-cyan-400">Thanks for playing Blackjack!</span>

You finished with ${gameState.playerChips} chips. Come back anytime!`
      };
    }

    // Handle betting phase
    if (gameState.gamePhase === 'betting') {
      if (action === 'bet' && args[1]) {
        const betAmount = parseInt(args[1]);
        if (isNaN(betAmount) || betAmount <= 0) {
          return { output: '❌ Please enter a valid bet amount.' };
        }
        if (betAmount > gameState.playerChips) {
          return { output: '❌ You don\'t have enough chips for that bet.' };
        }

        gameState.currentBet = betAmount;
        gameState.gamePhase = 'playing';
        gameState.deck = createDeck();
        
        // Deal initial cards
        gameState.playerHand = [dealCard(), dealCard()];
        gameState.dealerHand = [dealCard(), dealCard()];

        const playerValue = calculateHandValue(gameState.playerHand);
        
        context.setBlackjackState?.(gameState);

        // Check for blackjack
        if (playerValue === 21) {
          const dealerValue = calculateHandValue(gameState.dealerHand);
          if (dealerValue === 21) {
            return {
              output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: 21) 🎉
Dealer: ${formatHand(gameState.dealerHand)} (Total: 21)

<span class="text-yellow-400">Both Blackjack! It's a push!</span>

Your chips: ${gameState.playerChips}
Type 'blackjack' to play again!`
            };
          } else {
            gameState.playerChips += Math.floor(gameState.currentBet * 1.5);
            gameState.gamePhase = 'betting';
            context.setBlackjackState?.(gameState);
            return {
              output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: 21) 🎉
Dealer: ${formatHand(gameState.dealerHand, true)}

<span class="text-green-400">BLACKJACK! You win ${Math.floor(gameState.currentBet * 1.5)} chips!</span>

Your chips: ${gameState.playerChips}
Type 'blackjack' to play again!`
            };
          }
        }

        return {
          output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${playerValue})
Dealer: ${formatHand(gameState.dealerHand, true)}

Your chips: ${gameState.playerChips - gameState.currentBet}
Current bet: ${gameState.currentBet}

<span class="text-yellow-400">Commands:</span> hit, stand, double${gameState.playerChips >= gameState.currentBet ? '' : ' (not enough chips)'}`
        };
      }

      return {
        output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your chips: ${gameState.playerChips}

<span class="text-yellow-400">Place your bet to start!</span>
Usage: blackjack bet [amount]

Example: blackjack bet 10`
      };
    }

    // Handle playing phase
    if (gameState.gamePhase === 'playing') {
      if (action === 'hit') {
        gameState.playerHand.push(dealCard());
        const playerValue = calculateHandValue(gameState.playerHand);
        
        context.setBlackjackState?.(gameState);

        if (playerValue > 21) {
          gameState.playerChips -= gameState.currentBet;
          gameState.gamePhase = 'betting';
          gameState.currentBet = 0;
          context.setBlackjackState?.(gameState);

          return {
            output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${playerValue})
Dealer: ${formatHand(gameState.dealerHand, true)}

<span class="text-red-400">BUST! You lose ${gameState.currentBet} chips.</span>

Your chips: ${gameState.playerChips}
${gameState.playerChips > 0 ? "Type 'blackjack' to play again!" : "You're out of chips! Type 'blackjack reset' to start over."}`
          };
        }

        return {
          output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${playerValue})
Dealer: ${formatHand(gameState.dealerHand, true)}

Your chips: ${gameState.playerChips - gameState.currentBet}
Current bet: ${gameState.currentBet}

<span class="text-yellow-400">Commands:</span> hit, stand, double${gameState.playerChips >= gameState.currentBet ? '' : ' (not enough chips)'}`
        };
      }

      if (action === 'stand') {
        gameState.gamePhase = 'dealer';
        
        // Dealer plays
        let dealerValue = calculateHandValue(gameState.dealerHand);
        while (dealerValue < 17) {
          gameState.dealerHand.push(dealCard());
          dealerValue = calculateHandValue(gameState.dealerHand);
        }

        const playerValue = calculateHandValue(gameState.playerHand);
        let result = '';
        
        if (dealerValue > 21) {
          gameState.playerChips += gameState.currentBet;
          result = `<span class="text-green-400">Dealer busts! You win ${gameState.currentBet} chips!</span>`;
        } else if (playerValue > dealerValue) {
          gameState.playerChips += gameState.currentBet;
          result = `<span class="text-green-400">You win ${gameState.currentBet} chips!</span>`;
        } else if (playerValue < dealerValue) {
          gameState.playerChips -= gameState.currentBet;
          result = `<span class="text-red-400">Dealer wins! You lose ${gameState.currentBet} chips.</span>`;
        } else {
          result = `<span class="text-yellow-400">It's a push! No chips lost.</span>`;
        }

        gameState.gamePhase = 'betting';
        gameState.currentBet = 0;
        context.setBlackjackState?.(gameState);

        return {
          output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${playerValue})
Dealer: ${formatHand(gameState.dealerHand)} (Total: ${dealerValue})

${result}

Your chips: ${gameState.playerChips}
${gameState.playerChips > 0 ? "Type 'blackjack' to play again!" : "You're out of chips! Type 'blackjack reset' to start over."}`
        };
      }

      if (action === 'double') {
        if (gameState.playerChips < gameState.currentBet) {
          return { output: '❌ You don\'t have enough chips to double down.' };
        }

        gameState.currentBet *= 2;
        gameState.playerHand.push(dealCard());
        const playerValue = calculateHandValue(gameState.playerHand);
        
        if (playerValue > 21) {
          gameState.playerChips -= gameState.currentBet;
          gameState.gamePhase = 'betting';
          gameState.currentBet = 0;
          context.setBlackjackState?.(gameState);

          return {
            output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${playerValue})
Dealer: ${formatHand(gameState.dealerHand, true)}

<span class="text-red-400">BUST! You lose ${gameState.currentBet} chips.</span>

Your chips: ${gameState.playerChips}
${gameState.playerChips > 0 ? "Type 'blackjack' to play again!" : "You're out of chips! Type 'blackjack reset' to start over."}`
          };
        }

        // Dealer plays
        gameState.gamePhase = 'dealer';
        let dealerValue = calculateHandValue(gameState.dealerHand);
        while (dealerValue < 17) {
          gameState.dealerHand.push(dealCard());
          dealerValue = calculateHandValue(gameState.dealerHand);
        }

        let result = '';
        if (dealerValue > 21) {
          gameState.playerChips += gameState.currentBet;
          result = `<span class="text-green-400">Dealer busts! You win ${gameState.currentBet} chips!</span>`;
        } else if (playerValue > dealerValue) {
          gameState.playerChips += gameState.currentBet;
          result = `<span class="text-green-400">You win ${gameState.currentBet} chips!</span>`;
        } else if (playerValue < dealerValue) {
          gameState.playerChips -= gameState.currentBet;
          result = `<span class="text-red-400">Dealer wins! You lose ${gameState.currentBet} chips.</span>`;
        } else {
          result = `<span class="text-yellow-400">It's a push! No chips lost.</span>`;
        }

        gameState.gamePhase = 'betting';
        gameState.currentBet = 0;
        context.setBlackjackState?.(gameState);

        return {
          output: `🃏 <span class="text-cyan-400">Blackjack Game - Double Down</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${playerValue})
Dealer: ${formatHand(gameState.dealerHand)} (Total: ${dealerValue})

${result}

Your chips: ${gameState.playerChips}
${gameState.playerChips > 0 ? "Type 'blackjack' to play again!" : "You're out of chips! Type 'blackjack reset' to start over."}`
        };
      }

      return {
        output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

Your hand: ${formatHand(gameState.playerHand)} (Total: ${calculateHandValue(gameState.playerHand)})
Dealer: ${formatHand(gameState.dealerHand, true)}

Your chips: ${gameState.playerChips - gameState.currentBet}
Current bet: ${gameState.currentBet}

<span class="text-yellow-400">Commands:</span> hit, stand, double${gameState.playerChips >= gameState.currentBet ? '' : ' (not enough chips)'}
<span class="text-gray-400">Or type 'blackjack quit' to exit</span>`
      };
    }

    // Default help
    return {
      output: `🃏 <span class="text-cyan-400">Blackjack Game</span>

<span class="text-yellow-400">How to play:</span>
• Get as close to 21 as possible without going over
• Face cards are worth 10, Aces are 11 or 1
• Dealer must hit on 16 and stand on 17

<span class="text-green-400">Commands:</span>
• blackjack - Start/continue game
• blackjack bet [amount] - Place bet
• blackjack hit - Take another card
• blackjack stand - Keep current hand
• blackjack double - Double bet and take one card
• blackjack reset - Reset chips to 100
• blackjack quit - Exit game

Your chips: ${gameState.playerChips}
Type 'blackjack bet [amount]' to start playing!`
    };
  }
};