import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Round } from "@/lib/game/types";

interface RoundHistoryProps {
  rounds: Round[];
}

export function RoundHistory({ rounds }: RoundHistoryProps) {
  const roundsGrouped = rounds.reduce((acc, round) => {
    if (!acc[round.roundNumber]) {
      acc[round.roundNumber] = [];
    }
    acc[round.roundNumber].push(round);
    return acc;
  }, {} as Record<number, Round[]>);

  return (
    <>
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Round History</h2>
          <Badge variant="secondary">{rounds.length} Games</Badge>
        </div>
        <div className="space-y-6 overflow-y-auto">
          {Object.entries(roundsGrouped).map(([roundNumber, roundGames]) => (
            <div key={roundNumber} className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">
                Round {roundNumber}
              </h3>
              <div className="grid gap-2">
                {roundGames.map((round, gameIndex) => (
                  <div
                    key={`${round.roundNumber}-${gameIndex}`}
                    className="flex flex-col p-3 bg-gray-700 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300">Game {gameIndex + 1}:</span>
                        <span className="text-sm font-medium text-purple-400">
                          {round.opponentName} vs {round.opponent2Name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-300">
                        {round.opponentPoints} - {round.opponent2Points} pts
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 p-0 md:p-1">
                      <Badge className={round.opponentChoice === "cooperate" ? "bg-blue-600" : "bg-red-600"}>
                        {round.opponentName} ({round.opponentStrategy}): {round.opponentChoice === "cooperate" ? "Cooperated" : "Betrayed"}
                      </Badge>
                      <Badge className={round.opponent2Choice === "cooperate" ? "bg-green-600" : "bg-red-600"}>
                        {round.opponent2Name} ({round.opponent2Strategy}): {round.opponent2Choice === "cooperate" ? "Cooperated" : "Betrayed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* <div ref={ref}></div> */}
    </>
  );
}