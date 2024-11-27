"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import type { Strategy } from "@/lib/game/types";
import { Slider } from "@/components/ui/slider";

interface GameControlsProps {
	numberOfOpponents: number;
	strategies: Strategy[];
	selectedStrategy: Strategy;
	isAnimating: boolean;
	isGameComplete: boolean;
	numberOfRounds: number;
	gameDelay: number;
	onStrategyChangeAction: (strategy: Strategy) => void;
	onPlayAllRoundsAction: () => void;
	onResetAction: () => void;
	onRoundsChangeAction: (rounds: number) => void;
	onNumberOfOpponentsChangeAction: (rounds: number) => void;
	onDelayChangeAction: (delay: number) => void;
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
	numberOfRounds,
	onRoundsChangeAction,
	onNumberOfOpponentsChangeAction,
	gameDelay,
	onDelayChangeAction,
}: GameControlsProps) {
	function onDelayChange(arg0: number): void {
		throw new Error("Function not implemented.");
	}

	return (
		<Card className="border-gray-700 bg-gray-800 p-6">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-6">
					<div>
						<Label className="mb-2 block text-gray-300">Your Strategy</Label>
						<Select
							value={selectedStrategy.id}
							onValueChange={(id) => onStrategyChange(strategies.find((s) => s.id === id)!)}
						>
							<SelectTrigger className="w-full border-gray-600 bg-gray-700">
								<SelectValue placeholder="Choose strategy" />
							</SelectTrigger>
							<SelectContent>
								{strategies.map((strategy) => (
									<SelectItem key={strategy.id} value={strategy.id}>
										{strategy.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<p className="mt-2 text-sm text-gray-400">{selectedStrategy.description}</p>
					</div>

					<div className="flex items-center space-x-4">
						<div className="grid flex-1 grid-cols-3 gap-4">
							<div>
								<Label className="text-gray-300">Rounds ({numberOfRounds})</Label>
								<Slider
									value={[numberOfRounds]}
									onValueChange={(value) => onRoundsChangeAction(value[0])}
									max={5}
									min={1}
									step={1}
									className="my-4"
								/>
							</div>
							<div>
								<Label className="text-gray-300">Opponents ({numberOfOpponents})</Label>
								<Slider
									value={[numberOfOpponents]}
									onValueChange={(value) => onNumberOfOpponentsChangeAction(value[0])}
									max={9}
									min={2}
									step={1}
									className="my-4"
								/>
							</div>
							<div>
								<Label className="text-gray-300">Delay ({gameDelay} ms)</Label>
								<Slider
									value={[gameDelay]}
									onValueChange={(value) => onDelayChangeAction(value[0])}
									max={1000}
									min={0}
									step={100}
									className="my-4"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<Button
							onClick={onPlayAllRounds}
							disabled={isAnimating || isGameComplete}
							className="w-full bg-blue-600 hover:bg-blue-700"
						>
							<PlayIcon className="mr-2 h-4 w-4" />
							Play All Rounds
						</Button>

						<Button onClick={onReset} variant="outline" className="w-full" disabled={isAnimating}>
							<RotateCcwIcon className="mr-2 h-4 w-4" />
							Reset Game
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
