'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Round, Opponent } from '@/lib/game/types';
import { Label } from '../ui/label';

interface GameStatsProps {
  totalPoints: { my: number; opponent: number };
  lastResult: Round | null;
  currentOpponent: Opponent | null;
  currentRound: number;
  totalRounds: number;
}

export function GameStats({
  totalPoints,
  lastResult,
  currentOpponent,
  currentRound,
  totalRounds,
}: GameStatsProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300">Scoreboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            Round {currentRound}/{totalRounds}
          </Badge>
          <TrendingUpIcon className="text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
        <div className="text-center p-4 bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-300">
            {currentOpponent
              ? `${currentOpponent.name}'s Score`
              : 'Opponent Score'}
          </div>
          <div className="text-3xl font-bold text-purple-400">
            {totalPoints.opponent}
          </div>
        </div>
        <AnimatePresence>
          {lastResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Badge className="text-lg bg-gray-700 text-white">
                {lastResult.description}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
