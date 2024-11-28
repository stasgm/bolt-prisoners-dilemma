"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getBadgeColor } from "@/lib/game/utils";
import { choiceNames, type Opponent, type Round } from "@/lib/game/types";
import { CircleVisualization } from "./CircleVisualization";
import { PayoffMatrix } from "./PayoffMatrix";

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
	rounds: Round[];
	currentPlayers: [string, string];
	childRef: React.Ref<HTMLDivElement>;
}

export function GameProgress({
	totalPoints,
	totalGames,
	playedGames,
	currentRound,
	numberOfRounds,
	opponents,
	rounds,
	currentPlayers,
	childRef,
}: GameProgressProps) {
	const windowWidth = useWindowSize();

	const opponent1 = opponents.find((opp) => currentPlayers[0].includes(opp.id)) || null;
	const opponent2 = opponents.find((opp) => currentPlayers[1].includes(opp.id)) || null;

	// Get the latest round for current players
	const currentRoundData = rounds.length > 0 ? rounds[rounds.length - 1] : null;
	const isCurrentGame =
		currentRoundData?.opponentName === opponent1?.name && currentRoundData?.opponent2Name === opponent2?.name;

	return (
		<Card className="scroll-my-4 border-gray-700 bg-gray-800 p-6" ref={childRef}>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-200">Game Progress</h2>
				<Badge variant="secondary">
					Round {currentRound} of {numberOfRounds}
				</Badge>
			</div>

			<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="flex items-center justify-between rounded-lg bg-gray-700 p-4 sm:block">
							<div className="text-sm text-gray-300">Your Points</div>
							<div className="text-2xl font-bold text-blue-400 md:text-3xl">{totalPoints.my}</div>
						</div>
						<div className="flex items-center justify-between rounded-lg bg-gray-700 p-4 sm:block">
							<div className="text-sm text-gray-300">Games Progress</div>
							<div className="text-2xl font-bold text-purple-400 md:text-3xl">
								{playedGames}/{totalGames}
							</div>
						</div>
						<div className="flex items-center justify-between rounded-lg bg-gray-700 p-4 sm:block">
							<div className="text-sm text-gray-300">Games per Round</div>
							<div className="text-2xl font-bold text-purple-400 md:text-3xl">
								{(opponents.length * (opponents.length - 1)) / 2}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{opponent1 && (
							<div className="rounded-lg bg-gray-700 p-4">
								<h3 className="mb-2 text-lg font-semibold text-blue-400">{opponent1.name}</h3>
								<div className="space-y-2">
									<div>
										<span className="text-sm text-purple-300 text-opacity-80">
											<span className="rounded bg-primary/20 px-2 py-1 font-semibold">{opponent1.strategy.name}</span>
										</span>
									</div>
									{isCurrentGame && currentRoundData && (
										<div>
											<Badge
												className={cn(
													getBadgeColor(currentRoundData.opponentChoice, currentRoundData.opponent2Choice),
													"flex w-full items-center gap-2 px-3 py-0.5",
												)}
											>
												<span className="w-[25px] rounded bg-primary/20 px-2 py-0.5 text-center font-bold">
													{currentRoundData.opponentPoints}
												</span>
												<span className="ml-auto w-[90px] rounded bg-primary/20 px-2 py-0.5 text-center">
													{choiceNames[currentRoundData.opponentChoice]}
												</span>
											</Badge>
										</div>
									)}
								</div>
							</div>
						)}

						{opponent2 && (
							<div className="rounded-lg bg-gray-700 p-4">
								<h3 className="mb-2 text-lg font-semibold text-blue-400">{opponent2.name}</h3>
								<div className="space-y-2">
									<div>
										<span className="text-sm text-purple-300 text-opacity-80">
											<span className="rounded bg-primary/20 px-2 py-1 font-semibold">{opponent2.strategy.name}</span>
										</span>
									</div>
									{isCurrentGame && currentRoundData && (
										<div>
											<Badge
												variant={"secondary"}
												className={cn(
													getBadgeColor(currentRoundData.opponent2Choice, currentRoundData.opponentChoice),
													"flex w-full items-center gap-2 px-3 py-0.5",
												)}
											>
												<span className="w-[25px] rounded bg-primary/20 px-2 py-0.5 text-center font-bold">
													{currentRoundData.opponent2Points}
												</span>
												<span className="ml-auto w-[90px] rounded bg-primary/20 px-2 py-0.5 text-center">
													{choiceNames[currentRoundData.opponent2Choice]}
												</span>
											</Badge>
										</div>
									)}
								</div>
							</div>
						)}
					</div>

					{opponent1 && opponent2 && currentRoundData && (
						<PayoffMatrix
							player1Choice={currentRoundData.opponentChoice}
							player2Choice={currentRoundData.opponent2Choice}
						/>
					)}
				</div>

				<CircleVisualization
					opponents={opponents}
					currentPlayers={currentPlayers}
					size={windowWidth < 768 ? 250 : 450}
				/>
			</div>
		</Card>
	);
}
