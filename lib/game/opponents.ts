import type { Choice, Opponent, Round, StandardOutcomes, Strategy, Trait } from "./types";
import { strategies } from "./strategies";

export const standardOutcomes: StandardOutcomes = {
	cooperate: {
		cooperate: {
			opponentPoints: 3,
			opponent2Points: 3,
			description: "Mutual Cooperation",
		},
		refuse: {
			opponentPoints: 0,
			opponent2Points: 5,
			description: "Betrayed",
		},
	},
	refuse: {
		cooperate: {
			opponentPoints: 5,
			opponent2Points: 0,
			description: "Successful Betrayal",
		},
		refuse: {
			opponentPoints: 1,
			opponent2Points: 1,
			description: "Mutual Betrayal",
		},
	},
};

// Function to get a random strategy
function getRandomStrategy(): Strategy {
	return strategies[Math.floor(Math.random() * strategies.length)];
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

let uniqueNames = shuffleArray([...randomNames]);

function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

let opponentCounter = 0;

export interface IPlayerInfo {
	id: string;
	name: string;
	strategy: Strategy;
}

export const createPlayer = ({ id, name, strategy }: IPlayerInfo): Opponent => {
	return {
		id,
		name,
		strategy,
		getChoice: function (rounds: Round[]): Choice {
			return this.strategy.getChoice(rounds);
		},
	};
};

// Generate random opponents
export function generateRandomOpponents(count: number, recreate: boolean = false): Opponent[] {
	const randomOpponents: Opponent[] = [];

	// If recreating or we need more names, refresh the names array
	if (recreate) {
		uniqueNames = shuffleArray([...randomNames]);
		opponentCounter = 0; // Reset counter only when recreating
	}

	// Calculate how many guest names we need
	const availableCount = uniqueNames.length;
	const guestCount = Math.max(0, count - availableCount);

	// Get names from the pool first
	const regularNames = uniqueNames.splice(0, Math.min(count, availableCount));

	// Add guest names if needed
	const allNames = [
		...regularNames,
		...Array.from({ length: guestCount }, (_, i) => `guest-${opponentCounter + i + 1}`),
	];

	// Create opponents for each name
	allNames.forEach((name) => {
		const randomStrategy = getRandomStrategy();
		opponentCounter++; // Increment counter before using it
		randomOpponents.push(
			createPlayer({
				id: `opponent-${opponentCounter}`,
				name,
				strategy: randomStrategy,
			}),
		);
	});

	return randomOpponents;
}
