"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleVisualization } from "./CircleVisualization";
import type { Opponent } from "@/lib/game/types";

interface GameProgressProps {
	totalPoints: {
		my: number;
		opponent: number;
	};
	totalGames: number;
	playedGames: number;
	currentRound: number;
	numberOfRounds: number;
	opponents: Opponent[];
	currentPlayers: [string, string];
	selectedOpponent: Opponent | null;
	childRef: React.Ref<HTMLDivElement>;
}

export function GameProgress({
	totalPoints,
	totalGames,
	playedGames,
	currentRound,
	numberOfRounds,
	opponents,
	currentPlayers,
	selectedOpponent,
	childRef,
}: GameProgressProps) {
	return (
		<Card className="scroll-my-4 border-gray-700 bg-gray-800 p-6" ref={childRef}>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-200">Game Progress</h2>
				<Badge variant="secondary">
					Round {currentRound}/{numberOfRounds}
				</Badge>
			</div>

			<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div className="grid grid-cols-3 gap-4">
						<div className="rounded-lg bg-gray-700 p-4 text-center">
							<div className="text-sm text-gray-300">Your Points</div>
							<div className="text-2xl md:text-3xl font-bold text-blue-400">{totalPoints.my}</div>
						</div>
						<div className="rounded-lg bg-gray-700 p-4 text-center">
							<div className="text-sm text-gray-300">Games Progress</div>
							<div className="text-2xl md:text-3xl font-bold text-purple-400">
								{playedGames}/{totalGames}
							</div>
						</div>
						<div className="rounded-lg bg-gray-700 p-4 text-center">
							<div className="text-sm text-gray-300">Games per Round</div>
							<div className="text-2xl md:text-3xl font-bold text-purple-400">
								{(opponents.length * (opponents.length - 1)) / 2}
							</div>
						</div>
					</div>

					{selectedOpponent && (
						<div className="rounded-lg bg-gray-700 p-4">
							<h3 className="mb-2 text-lg font-semibold text-blue-400">Current Opponent</h3>
							<p className="mt-2 text-sm text-blue-400">Strategy: {selectedOpponent.strategy.name}</p>
						</div>
					)}
				</div>

				<CircleVisualization opponents={opponents} currentPlayers={currentPlayers} size={250} />
			</div>
		</Card>
	);
}
