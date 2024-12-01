"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShuffleIcon, PlusIcon, MinusIcon } from "lucide-react";
import type { Opponent, Round, Strategy } from "@/lib/game/types";
import { PlayerInfo } from "./PlayerInfo";

interface OpponentsListProps {
	opponents: Opponent[];
	rounds: Round[];
	isAnimating: boolean;
	onRandomizeOpponentsAction: () => void;
	strategies: Strategy[];
	selectedStrategy: Strategy;
	onStrategyChangeAction: (strategy: Strategy) => void;
	totalPoints: {
		my: number;
		opponent: number;
	};
	numberOfOpponents: number;
	onNumberOfOpponentsChangeAction: (value: number) => void;
}

export function OpponentsList({
	opponents,
	rounds,
	isAnimating,
	onRandomizeOpponentsAction,
	strategies,
	selectedStrategy,
	onStrategyChangeAction,
	totalPoints,
	numberOfOpponents,
	onNumberOfOpponentsChangeAction,
}: OpponentsListProps) {
	// Calculate total points for each opponent
	const opponentPoints = opponents.reduce(
		(acc, opponent) => {
			// Calculate points from both roles (opponentName and opponent2Name)
			const pointsAsOpponent = rounds
				.filter((round) => round.opponentName === opponent.name)
				.reduce((sum, round) => sum + round.opponentPoints, 0);

			const pointsAsOpponent2 = rounds
				.filter((round) => round.opponent2Name === opponent.name)
				.reduce((sum, round) => sum + round.opponent2Points, 0);

			// Combine points from both roles
			acc[opponent.id] = pointsAsOpponent + pointsAsOpponent2;
			return acc;
		},
		{} as Record<string, number>,
	);

	// Filter out the "My" player
	const filteredOpponents = opponents.filter((opponent) => !opponent.name.toLowerCase().includes("you"));

	return (
		<div className="space-y-4">
			<PlayerInfo
				myPoints={totalPoints.my}
				selectedStrategy={selectedStrategy}
				strategies={strategies}
				onStrategyChangeAction={onStrategyChangeAction}
			/>

			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-300">Opponents ({numberOfOpponents})</h2>
				<div className="flex items-center justify-between gap-2">
					<Button
						onClick={() => onNumberOfOpponentsChangeAction(Math.min(numberOfOpponents + 1, 9))}
						variant="default"
						size="sm"
						className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 sm:flex sm:flex-row sm:items-center"
					>
						<PlusIcon className="h-4 w-4" />
					</Button>
					<Button
						onClick={() => onNumberOfOpponentsChangeAction(Math.max(numberOfOpponents - 1, 2))}
						variant="default"
						size="sm"
						className="w-10 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 sm:flex sm:flex-row sm:items-center"
					>
						<MinusIcon className="h-4 w-4" />
					</Button>
					<Button
						onClick={onRandomizeOpponentsAction}
						variant="default"
						size="sm"
						className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 sm:flex sm:flex-row sm:items-center"
						disabled={isAnimating}
					>
						<ShuffleIcon className="h-4 w-4 sm:mr-2" />
						<span className="hidden sm:inline">Randomize</span>
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
				{filteredOpponents.map((opponent, index) => (
					<div
						key={`${opponent.id}-${index}`}
						className="flex items-center justify-between rounded-lg bg-gray-700/50 px-3 py-2"
					>
						<div className="flex grow flex-row items-center gap-1 sm:flex-col sm:items-start">
							<span className="font-medium text-white text-opacity-80">{opponent.name}</span>
							<div className="w-full justify-center text-right sm:flex sm:flex-1 sm:justify-start sm:text-left">
								<span className="rounded bg-black/20 px-1.5 py-0.5 text-xs font-medium text-blue-300/80">
									{opponent.strategy.name}
								</span>
							</div>
						</div>
						<Badge variant={"default"} className="ml-2 rounded-md bg-blue-900 px-2.5 py-1 text-base font-medium">
							{opponentPoints[opponent.id] || 0}
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
}
