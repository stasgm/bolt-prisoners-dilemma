'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlayIcon, RotateCcwIcon } from 'lucide-react';
import type { Strategy } from '@/lib/game/types';

interface GameControlsProps {
  totalPoints: { my: number; opponent: number };
  remainingOpponents: number;
  numberOfOpponents: number;
  strategies: Strategy[];
  selectedStrategy: Strategy;
  onStrategyChange: (strategy: Strategy) => void;
  onPlayAllRounds: () => void;
  onReset: () => void;
  isAnimating: boolean;
  isGameComplete: boolean;
  numberOfRounds: number;
  currentRound: number;
  onRoundsChange: (rounds: number) => void;
  onNumberOfOpponentsChange: (rounds: number) => void;
  gameDelay: number;
  onDelayChange: (delay: number) => void;
}

export function GameControls({
  totalPoints,
  remainingOpponents,
  numberOfOpponents,
  strategies,
  selectedStrategy,
  onStrategyChange,
  onPlayAllRounds,
  onReset,
  isAnimating,
  isGameComplete,
  numberOfRounds,
  currentRound,
  onRoundsChange,
  onNumberOfOpponentsChange,
  gameDelay,
  onDelayChange,
}: GameControlsProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-2 block">Your Strategy</Label>
            <Select
              value={selectedStrategy.id}
              onValueChange={(id) =>
                onStrategyChange(strategies.find((s) => s.id === id)!)
              }
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600">
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
            <p className="text-sm text-gray-400 mt-2">{selectedStrategy.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="w-40">
                <Label className="text-gray-300">Rounds</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfRounds}
                  onChange={(e) =>
                    onRoundsChange(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="bg-gray-700 border-gray-600 w-full"
                />
              </div>
              <div className="w-40">
                <Label className="text-gray-300">Number of opponents</Label>
                <Input
                  type="number"
                  min="1"
                  max="24"
                  value={numberOfOpponents}
                  onChange={(e) =>
                    onNumberOfOpponentsChange(parseInt(e.target.value))
                    // onNumberOfOpponentsChange(Math.max(1, parseInt(e.target.value) || 12))
                  }
                  className="bg-gray-700 border-gray-600 w-full"
                />
              </div>
              <div className="w-40">
                <Label className="text-gray-300">Game Speed</Label>
                <Input
                  type="number"
                  min="0"
                  max="1000"
                  step={100}
                  value={gameDelay}
                  onChange={(e) =>
                    onDelayChange(Math.min(1000, parseInt(e.target.value) || 500))
                  }
                  className="bg-gray-700 border-gray-600 w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onPlayAllRounds}
              disabled={isAnimating || isGameComplete}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              Play All Rounds
            </Button>

            <Button
              onClick={onReset}
              variant="outline"
              className="w-full"
              disabled={isAnimating}
            >
              <RotateCcwIcon className="mr-2 h-4 w-4" />
              Reset Game
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg text-center">
              <div className="text-sm text-gray-300">Your Score</div>
              <div className="text-3xl font-bold text-blue-400">
                {totalPoints.my}
              </div>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg text-center">
              <div className="text-sm text-gray-300">Total Games</div>
              <div className="text-3xl font-bold text-purple-400">
                {currentRound * numberOfOpponents}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg text-center">
                <div className="text-sm text-gray-300">Current</div>
                <div className="text-3xl font-bold text-purple-400">
                  {currentRound}/{numberOfRounds}
                </div>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg text-center">
                <div className="text-sm text-gray-300">Remaining</div>
                <div className="text-3xl font-bold text-purple-400">
                  {remainingOpponents}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </Card>
  );
}