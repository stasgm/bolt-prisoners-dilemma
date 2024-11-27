import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@/lib/game/utils";
import { Choice, type Round } from "@/lib/game/types";
import { cn } from "../../lib/utils";

interface RoundHistoryProps {
  rounds: Round[];
}
const choiceNames = {
  [Choice.cooperate]: "Cooperated",
  [Choice.refuse]: "Betrayed"
}

const GameBadge = ({ round, player }: { round: Round, player: number }) => {
  const { name, points, choice, badgeColor } = (() => {
    if (player === 1) {
      const name = round.opponentName;
      const points = round.opponentPoints
      const choice = choiceNames[round.opponentChoice];
      const badgeColor = getBadgeColor(round.opponentPoints, round.opponent2Points);

      return { name, points, choice, badgeColor };
    }

    const name = round.opponent2Name;
    const points = round.opponent2Points
    const choice = choiceNames[round.opponent2Choice];
    const badgeColor = getBadgeColor(round.opponent2Points, round.opponentPoints);

    return { name, points, choice, badgeColor };
  })();

  return (
    <Badge className={cn(badgeColor, "flex items-center gap-2 px-3 py-0.5 w-full")} >
      <span className="font-bold py-0.5 px-2 rounded bg-black/20 text-center w-[25px]">{points}</span>
      <span className="font-bold">{name}</span>
      <span className="px-2 py-0.5 rounded bg-black/20 text-center ml-auto w-[90px]">{choice}</span>
    </Badge>
  );
};

export function RoundHistory({ rounds }: RoundHistoryProps) {
  const roundsGrouped = rounds.reduce((acc, round) => {
    if (!acc[round.roundNumber]) {
      acc[round.roundNumber] = [];
    }
    acc[round.roundNumber].push(round);
    return acc;
  }, {} as Record<number, Round[]>);

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Round History</h2>
        <Badge variant="secondary">{rounds.length} Games</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {Object.entries(roundsGrouped).map(([roundNumber, roundGames]) => (
          <div key={roundNumber} className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-400 mb-3 sticky top-0 bg-gray-800 py-2">
              Round {roundNumber}
            </h3>
            <div className="grid gap-2">
              {roundGames.map((round, gameIndex) => (
                <div
                  key={`${round.roundNumber}-${gameIndex}`}
                  className="flex flex-col gap-2 p-3 bg-gray-700 rounded-lg"
                >
                  <GameBadge round={round} player={1} />
                  <GameBadge round={round} player={2} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}