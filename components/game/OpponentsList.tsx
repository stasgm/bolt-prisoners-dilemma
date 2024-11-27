"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShuffleIcon } from "lucide-react";
import type { Opponent, Round } from "@/lib/game/types";

interface OpponentsListProps {
	opponents: Opponent[];
	rounds: Round[];
	isAnimating: boolean;
	onRandomizeOpponentsAction: () => void;
}

export function OpponentsList({
	opponents,
	rounds,
	isAnimating,
	onRandomizeOpponentsAction,
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

	return (
		<Card className="border-gray-700 bg-gray-800 p-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-300">Opponents</h2>
				<Button
					onClick={onRandomizeOpponentsAction}
					variant="default"
					size="sm"
					className="bg-blue-600 hover:bg-blue-700 text-white"
					disabled={isAnimating}
				>
					<ShuffleIcon className="mr-2 h-4 w-4" />
					Randomize
				</Button>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
				{opponents.map((opponent, index) => (
					<div key={`${opponent.id}-${index}`} className="rounded-lg bg-gray-700 p-4">
						<div className="mb-2 flex items-start justify-between">
							<h3 className="font-semibold text-white text-opacity-80">{opponent.name}</h3>
							<Badge variant={"default"} className="ml-2">
								{opponentPoints[opponent.id] || 0} pts
							</Badge>
						</div>
						<div className="flex items-center justify-start">
							<span className="text-sm text-purple-300 text-opacity-80">
								<span className="font-semibold rounded bg-black/20 px-2 py-1">{opponent.strategy.name}</span>
							</span>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
