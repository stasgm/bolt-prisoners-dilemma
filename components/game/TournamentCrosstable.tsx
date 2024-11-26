'use client';

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Round } from "@/lib/game/types";

interface TournamentCrosstableProps {
  rounds: Round[];
  players: string[];
}

export function TournamentCrosstable({ rounds, players }: TournamentCrosstableProps) {
  const getMatchResult = (player1: string, player2: string) => {
    if (player1 === player2) return null;

    const matches = rounds.filter(
      r => (r.opponentName === player1 && r.opponent2Name === player2) ||
        (r.opponentName === player2 && r.opponent2Name === player1)
    );

    if (matches.length === 0) return null;

    const results = matches.map(match => {
      const isPlayer1First = match.opponentName === player1;
      const points1 = isPlayer1First ? match.opponentPoints : match.opponent2Points;
      const points2 = isPlayer1First ? match.opponent2Points : match.opponentPoints;
      return { points1, points2, round: match.roundNumber };
    });

    return results;
  };

  const getBadgeColor = (points1: number, points2: number) => {
    if (points1 > points2) return "bg-green-600";
    if (points1 < points2) return "bg-red-600";
    return "bg-blue-600";
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Tournament Matrix</h2>
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
                <TableCell className="font-medium text-gray-300">{player1}</TableCell>
                {players.map((player2) => {
                  const results = getMatchResult(player1, player2);
                  return (
                    <TableCell key={player2} className="text-center p-2">
                      {player1 === player2 ? (
                        <span className="text-gray-500">-</span>
                      ) : (
                        <div className="grid gap-1">
                          {results?.map(({ points1, points2, round }) => (
                            <Badge
                              key={round}
                              className={getBadgeColor(points1, points2)}
                            >
                              R{round}: {points1}-{points2}
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