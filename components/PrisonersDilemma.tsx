"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GameHeader } from "./game/GameHeader";
import { GameControls } from "./game/GameControls";
import { RoundHistory } from "./game/RoundHistory";
import { OpponentsList } from "./game/OpponentsList";
import { createPlayer, generateRandomOpponents } from "@/lib/game/opponents";
import { strategies } from "@/lib/game/strategies";
import type { Opponent, Round, Strategy } from "@/lib/game/types";

export default function PrisonersDilemma() {
  const [numberOfOpponents, setNumberOfOpponents] = useState(3);
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [totalPoints, setTotalPoints] = useState({ my: 0, opponent: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(strategies[0]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [gameDelay, setGameDelay] = useState(200);
  const [isInitialized, setIsInitialized] = useState(false);
  const currentRoundRef = useRef(1);
  const currentPlayersRef = useRef<[string, string]>(["", ""]);
  const childRef = useRef<HTMLDivElement>(null);

  const humanPlayer: Opponent = createPlayer({
    id: 'human',
    name: 'You',
    description: selectedStrategy.description,
    personality: 'Human',
    strategy: selectedStrategy
  });

  const scrollToChild = async () => {
    if (childRef.current) {
      await smoothScrollToElement(childRef.current);
    }
  };

  const smoothScrollToElement = (element: HTMLElement): Promise<void> => {
    return new Promise((resolve) => {
      const onScroll = () => {
        const elementTop = element.getBoundingClientRect().top;
        if (Math.abs(elementTop) < 1) {
          window.removeEventListener("scroll", onScroll);
          resolve();
        }
      };

      window.addEventListener("scroll", onScroll);
      element.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        window.removeEventListener("scroll", onScroll);
        resolve();
      }, 1000);
    });
  };

  useEffect(() => {
    if (!isInitialized) return;

    setOpponents(prev => {
      const diff = numberOfOpponents - prev.length;
      if (diff > 0) {
        return [...prev, ...generateRandomOpponents(diff)];
      }
      return prev.slice(0, numberOfOpponents);
    });
  }, [numberOfOpponents, isInitialized]);

  const randomizeOpponentList = useCallback(() => {
    setOpponents(generateRandomOpponents(numberOfOpponents));
  }, [numberOfOpponents]);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const playMatch = async (opponent1: Opponent, opponent2: Opponent, roundNumber: number) => {
    const choice1 = opponent1.strategy.getChoice(rounds.filter(r =>
      (r.opponentName === opponent1.name && r.opponent2Name === opponent2.name) ||
      (r.opponentName === opponent2.name && r.opponent2Name === opponent1.name)
    ));
    const choice2 = opponent2.strategy.getChoice(rounds.filter(r =>
      (r.opponentName === opponent2.name && r.opponent2Name === opponent1.name) ||
      (r.opponentName === opponent1.name && r.opponent2Name === opponent2.name)
    ));

    const result = opponent1.outcomes[choice1][choice2];

    const roundResult: Round = {
      myChoice: choice1,
      opponentChoice: choice2,
      myPoints: result.myPoints,
      opponentPoints: result.opponentPoints,
      description: result.description,
      opponentName: opponent1.name,
      opponent2Name: opponent2.name,
      opponentStrategy: opponent1.strategy.name,
      opponent2Strategy: opponent2.strategy.name,
      roundNumber
    };

    setRounds(prev => [...prev, roundResult]);
    setTotalPoints(prev => ({
      my: prev.my + (opponent1 === humanPlayer ? result.myPoints : (opponent2 === humanPlayer ? result.opponentPoints : 0)),
      opponent: prev.opponent + (opponent1 === humanPlayer ? result.opponentPoints : (opponent2 === humanPlayer ? result.myPoints : 0)),
    }));

    await new Promise(resolve => setTimeout(resolve, gameDelay));
  };

  const playAllRounds = async () => {
    if (isAnimating) return;
    await scrollToChild();

    setIsAnimating(true);

    const allPlayers = [humanPlayer, ...opponents];

    for (let round = 1; round <= numberOfRounds; round++) {
      currentRoundRef.current = round;

      for (let i = 0; i < allPlayers.length; i++) {
        for (let j = i + 1; j < allPlayers.length; j++) {
          currentPlayersRef.current = [allPlayers[i].id, allPlayers[j].id];
          await playMatch(allPlayers[i], allPlayers[j], round);
        }
      }
    }

    setIsAnimating(false);
  };

  const resetGame = () => {
    currentPlayersRef.current = ["", ""];
    setRounds([]);
    setTotalPoints({ my: 0, opponent: 0 });
    currentRoundRef.current = 1;
    randomizeOpponentList();
  };

  const currentRound = currentRoundRef.current;
  const allPlayers = [humanPlayer, ...opponents];
  const totalGamesPerRound = (allPlayers.length * (allPlayers.length - 1)) / 2;
  const totalGames = totalGamesPerRound * numberOfRounds;
  const playedGames = rounds.length;
  const isGameComplete = playedGames >= totalGames;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8">
      <GameHeader />

      <GameControls
        totalPoints={totalPoints}
        totalGames={totalGames}
        playedGames={playedGames}
        numberOfOpponents={numberOfOpponents}
        strategies={strategies}
        selectedStrategy={selectedStrategy}
        onStrategyChange={setSelectedStrategy}
        onPlayAllRounds={playAllRounds}
        onReset={resetGame}
        isAnimating={isAnimating}
        isGameComplete={isGameComplete}
        numberOfRounds={numberOfRounds}
        currentRound={currentRound}
        onRoundsChange={setNumberOfRounds}
        onNumberOfOpponentsChange={setNumberOfOpponents}
        gameDelay={gameDelay}
        onDelayChange={setGameDelay}
      />

      <OpponentsList
        opponents={allPlayers}
        rounds={rounds}
        onRandomizeOpponents={randomizeOpponentList}
        isAnimating={isAnimating}
        currentPlayers={currentPlayersRef.current}
      />

      <div>
        <RoundHistory rounds={rounds} ref={childRef} />
      </div>
    </div>
  );
}