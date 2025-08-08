import { Command, CommandResult } from '../../types';

export const weather: Command = {
  name: 'weather',
  description: 'Show weather conditions',
  category: 'entertainment',
  usage: 'weather',
  execute: (): CommandResult => {
    const weatherConditions = [
      "Sunny with a chance of coding - 72°F",
      "Rainy day, perfect for indoor development - 65°F",
      "Partly cloudy with scattered commits - 68°F",
      "Clear skies ahead for your projects - 75°F",
      "Rainbow after the storm (debugging session) - 70°F",
      "Cool and crisp, ideal for hot code - 45°F"
    ];
    return {
      output: `Current weather in Developer Land:
${weatherConditions[Math.floor(Math.random() * weatherConditions.length)]}

Forecast: High productivity with occasional coffee breaks`
    };
  }
};