"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Strategy } from "@/lib/game/types";

interface PlayerInfoProps {
	myPoints: number;
	selectedStrategy: Strategy;
	strategies: Strategy[];
	onStrategyChangeAction: (strategy: Strategy) => void;
}

export function PlayerInfo({
	myPoints,
	selectedStrategy,
	strategies,
	onStrategyChangeAction: onStrategyChange,
}: PlayerInfoProps) {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-300">Your Info</h2>
				<div className="flex items-center justify-between rounded-lg bg-gray-700/50 px-3 py-1">
					<div className="text-sm text-gray-300">Points</div>
					<Badge variant={"default"} className="ml-2 rounded-md bg-blue-900 px-2.5 py-1 text-base font-medium">
						{myPoints}
					</Badge>
				</div>
			</div>
			<div className="mb-2 flex items-center justify-between">
				<Label className="text-gray-300">Strategy</Label>
			</div>
			<div className="flex flex-col flex-wrap justify-between gap-1 sm:gap-2 rounded-lg bg-gray-700/50 px-2 py-2 sm:px-2 sm:py-1.5 text-center text-xs font-medium text-blue-300/80 sm:flex-row">
				<Select
					value={selectedStrategy.id}
					onValueChange={(id) => onStrategyChange(strategies.find((s) => s.id === id)!)}
				>
					<SelectTrigger className="w-auto border-gray-600 bg-black/20 sm:w-[230px]">
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
				<div className="flex flex-1 items-center justify-center px-4">
					<p className="text-sm text-gray-400">{selectedStrategy.description}</p>
				</div>
			</div>
		</div>
	);
}
