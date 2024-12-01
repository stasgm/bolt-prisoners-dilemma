"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import type { Opponent, Round, Strategy } from "@/lib/game/types";
import { Slider } from "@/components/ui/slider";
import { OpponentsList } from "./OpponentsList";
import { CircleVisualization } from "@/components/game/CircleVisualization";
import { useWindowSize } from "@/hooks/useWindowSize";

interface GameControlsProps {
	numberOfOpponents: number;
	strategies: Strategy[];
	selectedStrategy: Strategy;
	isAnimating: boolean;
	isGameComplete: boolean;
	gameDelay: number;
	opponents: Opponent[];
	rounds: Round[];
	currentPlayers: [string, string];
	totalPoints: {
		my: number;
		opponent: number;
	};
	onStrategyChangeAction: (strategy: Strategy) => void;
	onPlayAllRoundsAction: () => void;
	onResetAction: () => void;
	onNumberOfOpponentsChangeAction: (rounds: number) => void;
	onDelayChangeAction: (delay: number) => void;
	onRandomizeOpponentsAction: () => void;
}

export function GameControls({
	numberOfOpponents,
	strategies,
	selectedStrategy,
	onStrategyChangeAction: onStrategyChange,
	onPlayAllRoundsAction: onPlayAllRounds,
	onResetAction: onReset,
	isAnimating,
	isGameComplete,
	currentPlayers,
	onNumberOfOpponentsChangeAction,
	gameDelay,
	onDelayChangeAction,
	opponents,
	rounds,
	onRandomizeOpponentsAction,
	totalPoints,
}: GameControlsProps) {
	const windowWidth = useWindowSize();

	return (
		<Card className="border-gray-700 bg-gray-800 p-6">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,1fr]">
				<div className="space-y-6">
					<OpponentsList
						opponents={opponents}
						rounds={rounds}
						isAnimating={isAnimating}
						onRandomizeOpponentsAction={onRandomizeOpponentsAction}
						strategies={strategies}
						selectedStrategy={selectedStrategy}
						onStrategyChangeAction={onStrategyChange}
						totalPoints={totalPoints}
						numberOfOpponents={numberOfOpponents}
						onNumberOfOpponentsChangeAction={onNumberOfOpponentsChangeAction}
					/>
				</div>
				<div className="space-y-6">
					<CircleVisualization
						opponents={opponents}
						currentPlayers={currentPlayers}
						size={windowWidth < 768 ? 250 : 450}
					/>
					<div className="flex items-center space-x-4">
						<div className="grid flex-1 grid-cols-2 gap-4">
							<div>
								<Label className="text-gray-300">Delay ({gameDelay} ms)</Label>
								<Slider
									value={[gameDelay]}
									onValueChange={(value) => onDelayChangeAction(value[0])}
									max={1000}
									min={0}
									step={100}
									className="my-4 [&_[role=slider]]:cursor-grab"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-end space-x-4">
						<Button
							onClick={onReset}
							variant="outline"
							size="lg"
							className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
							disabled={isAnimating}
						>
							<RotateCcwIcon className="mr-2 h-4 w-4" />
							Reset
						</Button>
						<Button
							onClick={onPlayAllRounds}
							variant="default"
							size="lg"
							className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
							disabled={isAnimating || isGameComplete}
						>
							<PlayIcon className="mr-2 h-4 w-4" />
							Play All Rounds
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
