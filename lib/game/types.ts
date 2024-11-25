export type Choice = "cooperate" | "refuse";

export interface Trait {
  personality: string;
  description: string;
}

export interface Round {
  myChoice: Choice;
  opponentChoice: Choice;
  myPoints: number;
  opponentPoints: number;
  description: string;
  opponentName: string;
  opponent2Name: string;
  opponentStrategy: string;
  opponent2Strategy: string;
  roundNumber: number;
}

export interface StandardOutcomes {
  cooperate: {
    cooperate: Outcome;
    refuse: Outcome;
  };
  refuse: {
    cooperate: Outcome;
    refuse: Outcome;
  };
}

export interface Outcome {
  myPoints: number;
  opponentPoints: number;
  description: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  getChoice: (rounds: Round[]) => Choice;
}

export interface Opponent {
  id: string;
  name: string;
  description: string;
  personality: string;
  strategy: Strategy;
  outcomes: StandardOutcomes;
  getChoice: (rounds: Round[]) => Choice;
}