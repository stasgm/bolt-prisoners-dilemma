"use client";

import { useState, useEffect, useRef } from "react";
import { GameHeader } from "./game/GameHeader";
import { GameControls } from "./game/GameControls";
import { GameStats } from "./game/GameStats";
import { RoundHistory } from "./game/RoundHistory";
import { OpponentsList } from "./game/OpponentsList";
import { opponents } from "@/lib/game/opponents";
import { strategies } from "@/lib/game/strategies";
import type { Round, Strategy } from "@/lib/game/types";

export default function PrisonersDilemma() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [totalPoints, setTotalPoints] = useState({ my: 0, opponent: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastResult, setLastResult] = useState<Round | null>(null);
  // const [currentOpponentIndex, setCurrentOpponentIndex] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(strategies[0]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  // const [currentRound, setCurrentRound] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const currentOpponentRef = useRef(0);
  const currentRoundRef = useRef(1);

  const randomizeOpponentStrategies = () => {
    opponents.forEach(opponent => {
      const randomStrategy = strategies[Math.floor(Math.random() * strategies.length)];
      opponent.strategy = randomStrategy;
    });
  };

  useEffect(() => {
    if (!isInitialized) {
      randomizeOpponentStrategies();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const playRound = async () => {
    const currentOpponentIndex = currentOpponentRef.current;
    const currentRound = currentRoundRef.current;

    if (isAnimating || currentOpponentIndex >= opponents.length) return;
    setIsAnimating(true);

    const currentOpponent = opponents[currentOpponentIndex];
    const myChoice = selectedStrategy.getChoice(rounds);
    const opponentChoice = currentOpponent.strategy.getChoice(rounds);
    const result = currentOpponent.outcomes[myChoice][opponentChoice];

    const roundResult: Round = {
      myChoice,
      opponentChoice,
      myPoints: result.myPoints,
      opponentPoints: result.opponentPoints,
      description: result.description,
      opponentName: currentOpponent.name,
      opponentStrategy: currentOpponent.strategy.name,
      roundNumber: currentRound
    };

    setLastResult(roundResult);
    setRounds(prev => [...prev, roundResult]);
    setTotalPoints(prev => ({
      my: prev.my + result.myPoints,
      opponent: prev.opponent + result.opponentPoints,
    }));

    // await new Promise(resolve => setTimeout(resolve, 500));
    setIsAnimating(false);
  };

  const playAllRounds = async () => {
    if (isAnimating) return;

    currentOpponentRef.current = 0;

    const numberOfOpponents = opponents.length;

    while (currentRoundRef.current <= numberOfRounds) {
      for (let i = 0; i <= numberOfOpponents; i++) {
        currentOpponentRef.current = i;
        if (i === numberOfOpponents) {
          if (currentRoundRef.current === numberOfRounds) {
            // Break out of the while loop
            return;
          }
          currentRoundRef.current += 1;
          break;
        } else {
          await playRound(); // Play the round
        }
      }
    }
  }

  const resetGame = () => {
    setRounds([]);
    setTotalPoints({ my: 0, opponent: 0 });
    setLastResult(null);
    currentOpponentRef.current = 0
    // setCurrentOpponentIndex(0);
    currentRoundRef.current = 1;
    randomizeOpponentStrategies();
  };

  const currentRound = currentRoundRef.current;

  const currentOpponent = currentOpponentRef.current < opponents.length ? opponents[currentOpponentRef.current] : null;
  const isGameComplete = currentRound === numberOfRounds && currentOpponentRef.current >= opponents.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GameHeader />

      <GameControls
        currentOpponent={currentOpponent}
        remainingOpponents={opponents.length - currentOpponentRef.current}
        strategies={strategies}
        selectedStrategy={selectedStrategy}
        onStrategyChange={setSelectedStrategy}
        onPlayAllRounds={playAllRounds}
        onReset={resetGame}
        onRandomizeStrategies={randomizeOpponentStrategies}
        isAnimating={isAnimating}
        isGameComplete={isGameComplete}
        numberOfRounds={numberOfRounds}
        currentRound={currentRound}
        onRoundsChange={setNumberOfRounds}
      />

      <GameStats
        totalPoints={totalPoints}
        lastResult={lastResult}
        currentOpponent={currentOpponent}
        currentRound={currentRound}
        totalRounds={numberOfRounds}
      />

      <OpponentsList opponents={opponents} currentOpponentIndex={currentOpponentRef.current} />

      <RoundHistory rounds={rounds} />
    </div>
  );
}