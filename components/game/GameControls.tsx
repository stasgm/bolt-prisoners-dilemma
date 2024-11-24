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
import { PlayIcon, RotateCcwIcon, ShuffleIcon } from 'lucide-react';
import type { Opponent, Strategy } from '@/lib/game/types';

interface GameControlsProps {
  currentOpponent: Opponent | null;
  remainingOpponents: number;
  strategies: Strategy[];
  selectedStrategy: Strategy;
  onStrategyChange: (strategy: Strategy) => void;
  onPlayAllRounds: () => void;
  onReset: () => void;
  onRandomizeStrategies: () => void;
  isAnimating: boolean;
  isGameComplete: boolean;
  numberOfRounds: number;
  currentRound: number;
  onRoundsChange: (rounds: number) => void;
}

export function GameControls({
  currentOpponent,
  remainingOpponents,
  strategies,
  selectedStrategy,
  onStrategyChange,
  onPlayAllRounds,
  onReset,
  onRandomizeStrategies,
  isAnimating,
  isGameComplete,
  numberOfRounds,
  currentRound,
  onRoundsChange,
}: GameControlsProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Current Opponent</Label>
            <div className="p-3 bg-gray-700 rounded-lg">
              {currentOpponent ? (
                <div className="space-y-2">
                  <div className="font-bold text-lg text-blue-400">
                    {currentOpponent.name}
                  </div>
                  <div className="text-sm text-gray-300">
                    {currentOpponent.description}
                  </div>
                  <div className="text-sm text-blue-400">
                    Using strategy: {currentOpponent.strategy.name}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">Game Complete</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Your Strategy</Label>
            <Select
              value={selectedStrategy.id}
              onValueChange={(id) =>
                onStrategyChange(strategies.find((s) => s.id === id)!)
              }
            >
              <SelectTrigger>
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
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Number of Rounds</Label>
            <Input
              type="number"
              min="1"
              value={numberOfRounds}
              onChange={(e) =>
                onRoundsChange(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="bg-gray-700 border-gray-600"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-300">Current Round</div>
              <div className="text-3xl font-bold text-blue-400">
                {currentRound}/{numberOfRounds}
              </div>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-300">Remaining Opponents</div>
              <div className="text-3xl font-bold text-blue-400">
                {remainingOpponents}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={onPlayAllRounds}
              disabled={isAnimating || isGameComplete}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              Play All Rounds
            </Button>
            <Button
              onClick={onRandomizeStrategies}
              variant="outline"
              className="flex-1"
              disabled={isAnimating}
            >
              <ShuffleIcon className="mr-2 h-4 w-4" />
              Randomize Strategies
            </Button>
          </div>

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
    </Card>
  );
}
