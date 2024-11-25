import type { Choice, Opponent, Round, StandardOutcomes, Strategy, Trait } from "./types";
import { strategies } from "./strategies";

export const standardOutcomes: StandardOutcomes = {
  cooperate: {
    cooperate: { myPoints: 3, opponentPoints: 3, description: "Mutual Cooperation" },
    refuse: { myPoints: 0, opponentPoints: 5, description: "Betrayed" },
  },
  refuse: {
    cooperate: { myPoints: 5, opponentPoints: 0, description: "Successful Betrayal" },
    refuse: { myPoints: 1, opponentPoints: 1, description: "Mutual Betrayal" },
  },
};

// Function to get a random strategy
function getRandomStrategy(): Strategy {
  return strategies[Math.floor(Math.random() * strategies.length)];
}

// Function to derive personality and description based on strategy
function deriveOpponentTraits(strategy: Strategy): Trait {
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
    grudger: {
      personality: "Resentful",
      description: "Starts cooperatively but holds grudges and never forgives betrayal.",
    },
    pavlov: {
      personality: "Conditional",
      description:
        "Adjusts their choice based on the outcome of the previous round, favoring cooperation when outcomes align.",
    },
  };

  return (
    traits[strategy.id] || {
      personality: "Unpredictable",
      description: "A wildcard opponent with an unexpected approach to decisions.",
    }
  );
}

const randomNames = [
  "Alex",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Quinn",
  "Avery",
  "Jamie",
  "Drew",
  "Bailey",
  "Harper",
  "Reese",
  "Cameron",
  "Charlie",
  "Emerson",
  "Logan",
  "Peyton",
  "Sawyer",
  "Skyler",
  "Stas",
  "Olya",
  "Nox",
  "Yura",
  "Max",
  "Inka",
];

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export interface IPlayerInfo {
  id: string;
  name: string;
  description: string;
  personality: string;
  strategy: Strategy;
}

export const createPlayer = ({ id, name, description, personality, strategy }: IPlayerInfo): Opponent => {
  return {
    id,
    name,
    description,
    personality,
    strategy,
    outcomes: standardOutcomes,
    getChoice: function (rounds: Round[]): Choice {
      return this.strategy.getChoice(rounds);
    },
  };
};

// Generate random opponents
export function generateRandomOpponents(count: number): Opponent[] {
  const uniqueNames = shuffleArray([...randomNames]); // Shuffle and ensure names are unique
  const randomOpponents: Opponent[] = [];

  for (let i = 0; i < count; i++) {
    if (i >= uniqueNames.length) {
      throw new Error("Not enough unique names for opponents.");
    }

    const randomName = uniqueNames[i];
    const randomStrategy = getRandomStrategy();
    const { personality, description } = deriveOpponentTraits(randomStrategy);

    randomOpponents.push(
      createPlayer({
        id: `opponent-${i + 1}`,
        name: randomName,
        description: description,
        personality: personality,
        strategy: randomStrategy,
      })
    );
  }

  return randomOpponents;
}
