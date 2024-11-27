'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getBadgeColor } from "@/lib/game/utils";
import type { Round } from '@/lib/game/types';
import { cn } from '../../lib/utils';

interface TournamentCrosstableProps {
  rounds: Round[];
  players: string[];
}

export function TournamentCrosstable({
  rounds,
  players,
}: TournamentCrosstableProps) {
  const getMatchResult = (player1: string, player2: string) => {
    if (player1 === player2) return null;

    // Group rounds by round number
    const matchesByRound = new Map<number, Round>();
    rounds.forEach(round => {
      if ((round.opponentName === player1 && round.opponent2Name === player2) ||
          (round.opponentName === player2 && round.opponent2Name === player1)) {
        matchesByRound.set(round.roundNumber, round);
      }
    });

    if (matchesByRound.size === 0) return null;

    // Convert to array and sort by round number
    return Array.from(matchesByRound.values()).map(match => {
      const isPlayer1First = match.opponentName === player1;
      return {
        points1: isPlayer1First ? match.opponentPoints : match.opponent2Points,
        points2: isPlayer1First ? match.opponent2Points : match.opponentPoints,
        round: match.roundNumber
      };
    }).sort((a, b) => a.round - b.round);
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">
          Tournament Crosstable
        </h2>
        <Badge variant="secondary">{players.length} Players</Badge>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Player</TableHead>
              {players.map((player) => (
                <TableHead key={player} className="text-gray-300 text-center">
                  {player}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player1) => (
              <TableRow key={player1}>
                <TableCell className="font-medium text-gray-300">
                  {player1}
                </TableCell>
                {players.map((player2) => {
                  const results = getMatchResult(player1, player2);
                  return (
                    <TableCell key={player2} className="text-center p-2">
                      {player1 === player2 ? (
                        <span className="text-gray-500">-</span>
                      ) : (
                        <div className="grid gap-1 grid-cols-2">
                          {results?.map(({ points1, points2, round }) => (
                            <Badge
                              key={round}
                              className={cn(getBadgeColor(points1, points2), "flex items-center gap-2 px-3 w-full")}
                            >
                              <span className="font-bold">R{round}:</span>
                              <div className="flex items-center gap-1 mx-auto">
                                <span className="font-bold py-0.5 px-1 rounded bg-black/20 text-center w-[20px]">{points1}</span>
                                <span className="font-medium">-</span>
                                <span className="font-bold py-0.5 px-1 rounded bg-black/20 text-center w-[20px]">{points2}</span>
                              </div>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}