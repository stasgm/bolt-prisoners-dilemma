"use client";

import { Card } from "@/components/ui/card";
import type { Opponent } from "@/lib/game/types";
import { cn } from "@/lib/utils";

interface CircleVisualizationProps {
	opponents: Opponent[];
	currentPlayers: [string, string];
	size?: number;
}

export function CircleVisualization({ opponents, currentPlayers, size = 300 }: CircleVisualizationProps) {
	const radius = size * 0.4;
	const center = size / 2;

	// Calculate positions for each opponent
	const getPosition = (index: number, total: number) => {
		const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
		return {
			x: center + radius * Math.cos(angle),
			y: center + radius * Math.sin(angle),
		};
	};

	return (
		<Card className="border-gray-700 bg-gray-800">
			<div className="flex justify-center">
				<svg width={size} height={size} className="-rotate-90 transform">
					{/* Connection lines */}
					{opponents.map((opponent1, i) =>
						opponents.slice(i + 1).map((opponent2, j) => {
							const pos1 = getPosition(i, opponents.length);
							const pos2 = getPosition(i + j + 1, opponents.length);
							const isActive = currentPlayers.includes(opponent1.id) && currentPlayers.includes(opponent2.id);

							return (
								<line
									key={`${opponent1.id}-${opponent2.id}`}
									x1={pos1.x}
									y1={pos1.y}
									x2={pos2.x}
									y2={pos2.y}
									stroke={isActive ? "#60A5FA" : "#374151"}
									strokeWidth={isActive ? 3 : 1}
									className="transition-all duration-300"
								/>
							);
						}),
					)}

					{/* Opponent points */}
					{opponents.map((opponent, index) => {
						const { x, y } = getPosition(index, opponents.length);
						const isActive = currentPlayers.includes(opponent.id);

						return (
							<g key={opponent.id} transform={`translate(${x},${y})`} className="transition-all duration-300">
								<circle
									r={isActive ? 24 : 20}
									className={cn(
										"transition-all duration-300",
										isActive ? "fill-blue-500 stroke-blue-300" : "fill-gray-700 stroke-gray-600",
									)}
									strokeWidth="2"
								/>
								<text
									className="pointer-events-none select-none text-xs font-semibold"
									fill={isActive ? "white" : "#9CA3AF"}
									textAnchor="middle"
									dy="0.5em"
									transform="rotate(90)"
								>
									{opponent.name}
								</text>
							</g>
						);
					})}
				</svg>
			</div>
		</Card>
	);
}
