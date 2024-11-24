import type { Opponent } from "./types";
import { strategies } from "./strategies";

const standardOutcomes = {
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
const initialStrategy = strategies[0];

export const opponents: Opponent[] = [
  {
    id: "trustworthy-tom",
    name: "Trustworthy Tom",
    description: "Always cooperates, believing in the good of humanity.",
    personality: "Cooperative",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "betraying-betty",
    name: "Betraying Betty",
    description: "Always betrays, trusting no one.",
    personality: "Deceptive",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "mirroring-mike",
    name: "Mirroring Mike",
    description: "Copies your last move. Starts with cooperation.",
    personality: "Adaptive",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "random-rachel",
    name: "Random Rachel",
    description: "Makes completely random choices.",
    personality: "Unpredictable",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "grudging-gary",
    name: "Grudging Gary",
    description: "Cooperates until betrayed, then never cooperates again.",
    personality: "Vengeful",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "forgiving-frank",
    name: "Forgiving Frank",
    description: "Retaliates once when betrayed, then forgives.",
    personality: "Forgiving",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "pattern-paula",
    name: "Pattern Paula",
    description: "Follows a fixed pattern: cooperate, cooperate, betray.",
    personality: "Systematic",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "majority-mary",
    name: "Majority Mary",
    description: "Does what you've done most often.",
    personality: "Statistical",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "suspicious-sam",
    name: "Suspicious Sam",
    description: "Starts with betrayal, then mirrors your moves.",
    personality: "Cautious",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "gradual-grace",
    name: "Gradual Grace",
    description: "Becomes more cooperative as the game progresses.",
    personality: "Progressive",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "analyzing-alex",
    name: "Analyzing Alex",
    description: "Studies patterns and adapts strategy.",
    personality: "Analytical",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "emotional-emma",
    name: "Emotional Emma",
    description: "Reacts strongly to recent events.",
    personality: "Emotional",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "probability-pete",
    name: "Probability Pete",
    description: "Uses probability to make decisions.",
    personality: "Mathematical",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "learning-lisa",
    name: "Learning Lisa",
    description: "Learns from successful moves.",
    personality: "Adaptive",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
  {
    id: "balanced-bob",
    name: "Balanced Bob",
    description: "Maintains equal cooperation and betrayal.",
    personality: "Balanced",
    strategy: initialStrategy,
    outcomes: standardOutcomes,
    getChoice: function(rounds) {
      return this.strategy.getChoice(rounds);
    },
  },
];