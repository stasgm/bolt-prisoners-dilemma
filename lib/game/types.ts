export interface Round {
  myChoice: string;
  opponentChoice: string;
  myPoints: number;
  opponentPoints: number;
  description: string;
  opponentName: string;
  opponentStrategy: string;
  roundNumber: number;
}

export interface Outcome {
  myPoints: number;
  opponentPoints: number;
  description: string;
}

export interface Outcomes {
  [key: string]: {
    [key: string]: Outcome;
  };
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  getChoice: (rounds: Round[]) => string;
}

export interface Opponent {
  id: string;
  name: string;
  description: string;
  personality: string;
  strategy: Strategy;
  outcomes: Outcomes;
  getChoice: (rounds: Round[]) => string;
}