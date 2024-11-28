"use client";

import { Card } from "@/components/ui/card";
import { type Choice } from "@/lib/game/types";

interface PayoffMatrixProps {
	player1Choice?: Choice;
	player2Choice?: Choice;
}

export function PayoffMatrix({ player1Choice, player2Choice }: PayoffMatrixProps) {
	const matrix = {
		cooperate: {
			cooperate: { p1: 3, p2: 3 },
			refuse: { p1: 0, p2: 5 },
		},
		refuse: {
			cooperate: { p1: 5, p2: 0 },
			refuse: { p1: 1, p2: 1 },
		},
	};

	const isActive = (p1: Choice, p2: Choice) => player1Choice === p1 && player2Choice === p2;

	return (
		<Card className="border-gray-700 bg-gray-800 p-6">
			<div className="flex items-center justify-center space-x-4">
				{/* Player 1 */}
				<div className="flex flex-col items-center">
					<svg width="60" height="60" viewBox="0 0 60 60">
						<circle cx="30" cy="30" r="25" fill="#374151" stroke="#4B5563" strokeWidth="2" />
						<text x="30" y="35" textAnchor="middle" fill="#9CA3AF" className="text-sm">
							P1
						</text>
					</svg>
				</div>

				{/* Matrix */}
				<svg width="300" height="300" viewBox="0 0 300 300">
					<g transform="translate(150, 150)">
						{/* Background rectangle */}
						<rect x="-120" y="-120" width="240" height="240" fill="#1F2937" stroke="#4B5563" strokeWidth="2" />

						{/* Diamond shapes */}
						{/* Top diamond (Cooperate-Cooperate) */}
						<g transform="translate(0, -60)">
							{/* Left half */}
							<path
								d="M 0 -40 L -40 0 L 0 40 L 0 0 Z"
								fill={isActive("cooperate", "cooperate") ? "#3B82F6" : "#374151"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							{/* Right half */}
							<path
								d="M 0 -40 L 40 0 L 0 40 L 0 0 Z"
								fill={isActive("cooperate", "cooperate") ? "#2563EB" : "#1F2937"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							<text x="-15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								+3
							</text>
							<text x="15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								+3
							</text>
						</g>

						{/* Right diamond (Cooperate-Refuse) */}
						<g transform="translate(60, 0)">
							{/* Left half */}
							<path
								d="M 0 -40 L -40 0 L 0 40 L 0 0 Z"
								fill={isActive("cooperate", "refuse") ? "#3B82F6" : "#374151"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							{/* Right half */}
							<path
								d="M 0 -40 L 40 0 L 0 40 L 0 0 Z"
								fill={isActive("cooperate", "refuse") ? "#2563EB" : "#1F2937"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							<text x="-15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								0
							</text>
							<text x="15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								+5
							</text>
						</g>

						{/* Left diamond (Refuse-Cooperate) */}
						<g transform="translate(-60, 0)">
							{/* Left half */}
							<path
								d="M 0 -40 L -40 0 L 0 40 L 0 0 Z"
								fill={isActive("refuse", "cooperate") ? "#3B82F6" : "#374151"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							{/* Right half */}
							<path
								d="M 0 -40 L 40 0 L 0 40 L 0 0 Z"
								fill={isActive("refuse", "cooperate") ? "#2563EB" : "#1F2937"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							<text x="-15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								+5
							</text>
							<text x="15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								0
							</text>
						</g>

						{/* Bottom diamond (Refuse-Refuse) */}
						<g transform="translate(0, 60)">
							{/* Left half */}
							<path
								d="M 0 -40 L -40 0 L 0 40 L 0 0 Z"
								fill={isActive("refuse", "refuse") ? "#3B82F6" : "#374151"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							{/* Right half */}
							<path
								d="M 0 -40 L 40 0 L 0 40 L 0 0 Z"
								fill={isActive("refuse", "refuse") ? "#2563EB" : "#1F2937"}
								stroke="#4B5563"
								strokeWidth="2"
							/>
							<text x="-15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								+1
							</text>
							<text x="15" y="0" textAnchor="middle" fill="#D1D5DB" className="text-sm">
								+1
							</text>
						</g>

						{/* Labels */}
						<text x="0" y="-130" textAnchor="middle" fill="#9CA3AF" className="text-sm">
							Cooperate
						</text>
						<text x="0" y="140" textAnchor="middle" fill="#9CA3AF" className="text-sm">
							Refuse
						</text>
					</g>
				</svg>

				{/* Player 2 */}
				<div className="flex flex-col items-center">
					<svg width="60" height="60" viewBox="0 0 60 60">
						<circle cx="30" cy="30" r="25" fill="#374151" stroke="#4B5563" strokeWidth="2" />
						<text x="30" y="35" textAnchor="middle" fill="#9CA3AF" className="text-sm">
							P2
						</text>
					</svg>
				</div>
			</div>
		</Card>
	);
}
