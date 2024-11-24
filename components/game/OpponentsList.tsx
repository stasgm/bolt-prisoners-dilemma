'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Opponent } from '@/lib/game/types';
import { cn } from '@/lib/utils';

interface OpponentsListProps {
  opponents: Opponent[];
  currentOpponentIndex: number;
}

export function OpponentsList({
  opponents,
  currentOpponentIndex,
}: OpponentsListProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Opponents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opponents.map((opponent, index) => (
          <div
            key={opponent.id}
            className={`p-4 rounded-lg ${
              index === currentOpponentIndex
                ? 'bg-blue-600 text-white'
                : index < currentOpponentIndex
                ? 'bg-gray-600'
                : 'bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3
                className={cn(
                  'font-semibold',
                  index === currentOpponentIndex
                    ? 'text-black-0'
                    : 'text-blue-300'
                )}
              >
                {opponent.name}
              </h3>
              <Badge
                variant={
                  index === currentOpponentIndex ? 'secondary' : 'default'
                }
              >
                {index === currentOpponentIndex
                  ? 'Current'
                  : index < currentOpponentIndex
                  ? 'Completed'
                  : 'Waiting'}
              </Badge>
            </div>
            <p className="text-sm text-gray-300 mb-2">{opponent.description}</p>
            <p className="text-sm">
              <span className="text-blue-400">Strategy:</span>{' '}
              <span className="text-gray-200">{opponent.strategy.name}</span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
