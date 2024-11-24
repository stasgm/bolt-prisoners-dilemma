import type { Choice, Opponent, Round, StandardOutcomes, Strategy, Trait } from "./types";
import { strategies } from "./strategies";

const standardOutcomes: StandardOutcomes = {
  cooperate: {
    cooperate: { myPoints: 3, opponentPoints: 3, description: "Mutual Cooperation" },
    refuse: { myPoints: 0, opponentPoints: 5, description: "Betrayed" },
  },
  refuse: {
    cooperate: { myPoints: 5, opponentPoints: 0, description: "Successful Betrayal" },
    refuse: { myPoints: 1, opponentPoints: 1, description: "Mutual Betrayal" },
  },
};



// Set initial strategy to first strategy for consistent hydration
// const initialStrategy = strategies[0];

// Function to get a random strategy
function getRandomStrategy(): Strategy {
  return strategies[Math.floor(Math.random() * strategies.length)];
}

// Function to derive personality and description based on strategy
function deriveOpponentTraits(strategy: Strategy): { personality: string; description: string } {
  const traits: Record<string, Trait> = {
    "always-cooperate": {
      personality: "Optimistic",
      description: "Believes in cooperation above all else and always chooses to cooperate.",
    },
    "always-betray": {
      personality: "Cynical",
      description: "Trusts no one and always chooses betrayal as the best course of action.",
    },
    "tit-for-tat": {
      personality: "Reciprocal",
      description: "Reflects your previous move, cooperating if you cooperate, and betraying if you betray.",
    },
    "grudger": {
      personality: "Resentful",
      description: "Starts cooperatively but holds grudges and never forgives betrayal.",
    },
    "pavlov": {
      personality: "Conditional",
      description: "Adjusts their choice based on the outcome of the previous round, favoring cooperation when outcomes align.",
    },
  };

  return traits[strategy.id] || {
    personality: "Unpredictable",
    description: "A wildcard opponent with an unexpected approach to decisions.",
  };
}

// Generate random opponents
export function generateRandomOpponents(count: number): Opponent[] {
  const randomOpponents: Opponent[] = [];
  for (let i = 1; i <= count; i++) {
    const randomStrategy = getRandomStrategy();
    const { personality, description } = deriveOpponentTraits(randomStrategy);

    randomOpponents.push({
      id: `opponent-${i}`,
      name: `Opponent ${i}`,
      description: description,
      personality: personality,
      strategy: randomStrategy,
      outcomes: standardOutcomes,
      getChoice: function (rounds: Round[]): Choice {
        return this.strategy.getChoice(rounds);
      },
    });
  }
  return randomOpponents;
}

// Initial set of opponents
// const opponents: Opponent[] = [];

// Add 30 random opponents
// const additionalOpponents = generateRandomOpponents(30);
// opponents.push(...additionalOpponents);
