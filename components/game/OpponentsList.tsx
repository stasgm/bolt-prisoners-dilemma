'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShuffleIcon } from 'lucide-react';
import type { Opponent, Round } from '@/lib/game/types';
import { cn } from '@/lib/utils';

interface OpponentsListProps {
  opponents: Opponent[];
  currentPlayers: [string, string];
  rounds: Round[];
  onRandomizeOpponents: () => void;
  isAnimating: boolean;
}

export function OpponentsList({
  opponents,
  currentPlayers,
  rounds,
  onRandomizeOpponents,
  isAnimating,
}: OpponentsListProps) {
  // Calculate total points for each opponent
  const opponentPoints = opponents.reduce((acc, opponent) => {
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
  }, {} as Record<string, number>);

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300">Opponents</h2>
        <Button
          onClick={onRandomizeOpponents}
          variant="outline"
          size="sm"
          className="text-gray-950"
          disabled={isAnimating}
        >
          <ShuffleIcon className="mr-2 h-4 w-4" />
          Randomize
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {opponents.map((opponent, index) => (
          <div
            key={`${opponent.id}-${index}`}
            className={cn(
              'p-4 rounded-lg transition-all duration-200',
              currentPlayers.indexOf(opponent.id) > -1
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : 'bg-gray-700'
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <h3
                className={cn(
                  'font-semibold',
                  currentPlayers.indexOf(opponent.id) > -1
                    ? 'text-white'
                    : 'text-blue-300'
                )}
              >
                {opponent.name}
              </h3>
              <Badge
                variant={currentPlayers.indexOf(opponent.id) > -1 ? 'secondary' : 'default'}
                className="ml-2"
              >
                {opponentPoints[opponent.id] || 0} pts
              </Badge>
            </div>
            <p className="text-sm text-gray-300 mb-2">{opponent.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                <span className="text-blue-400">Strategy:</span>{' '}
                <span className="text-gray-200">{opponent.strategy.name}</span>
              </span>
              <Badge
                variant={
                  currentPlayers.indexOf(opponent.id) > -1 ? 'secondary' : 'outline'
                }
                className={cn(currentPlayers.indexOf(opponent.id) > -1 ? 'text-black' : 'text-white', 'text-xs')}
              >
                {currentPlayers.indexOf(opponent.id) > -1 ? 'Current' : 'Done'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}