export const Choice = {
	cooperate: "cooperate",
	refuse: "refuse",
};

export type Choice = "cooperate" | "refuse";

export const choiceNames = {
	[Choice.cooperate]: "Cooperated",
	[Choice.refuse]: "Betrayed",
};

export interface Trait {
	personality: string;
	description: string;
}

export interface Round {
	opponentChoice: Choice;
	opponent2Choice: Choice;
	opponentPoints: number;
	opponent2Points: number;
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
	opponentPoints: number;
	opponent2Points: number;
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
	strategy: Strategy;
	getChoice: (rounds: Round[]) => Choice;
}
