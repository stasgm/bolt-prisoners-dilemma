import type { Strategy } from "./types";

export const strategies: Strategy[] = [
  {
    id: "always-cooperate",
    name: "Always Cooperate",
    description: "Always choose to cooperate",
    getChoice: () => "cooperate",
  },
  {
    id: "always-betray",
    name: "Always Betray",
    description: "Always choose to betray",
    getChoice: () => "refuse",
  },
  {
    id: "tit-for-tat",
    name: "Tit for Tat",
    description: "Copy opponent's last move",
    getChoice: (rounds) =>
      rounds.length === 0 ? "cooperate" : rounds[rounds.length - 1].opponentChoice,
  },
  {
    id: "grudger",
    name: "Grudger",
    description: "Cooperate until betrayed, then always betray",
    getChoice: (rounds) =>
      rounds.some(r => r.opponentChoice === "refuse") ? "refuse" : "cooperate",
  },
  {
    id: "pavlov",
    name: "Pavlov",
    description: "Cooperate if both players made the same choice last round",
    getChoice: (rounds) => {
      if (rounds.length === 0) return "cooperate";
      const lastRound = rounds[rounds.length - 1];
      return lastRound.myChoice === lastRound.opponentChoice ? "cooperate" : "refuse";
    },
  },
];