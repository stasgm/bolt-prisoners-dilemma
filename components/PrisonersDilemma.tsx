"use client";

import { useState, useEffect } from "react";
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
  const [currentOpponentIndex, setCurrentOpponentIndex] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(strategies[0]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

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
    
    const numberOfOpponents = opponents.length;

    console.log(numberOfOpponents);
    console.log(currentOpponentIndex);

    while (currentRound <= numberOfRounds) {
      for (let i = currentOpponentIndex; i < numberOfOpponents; i++) {
        if (currentOpponentIndex === numberOfOpponents - 1) {
          if (currentRound < numberOfRounds) {
            setCurrentRound(prev => prev + 1);
            setCurrentOpponentIndex(0);
          }
        } else {
          setCurrentOpponentIndex(prev => {
            console.log(prev);
            return prev + 1;
          });
          console.log(currentOpponentIndex);
        }
        await playRound();
      }
      if (currentRound === numberOfRounds) break;
    }
  };

  const resetGame = () => {
    setRounds([]);
    setTotalPoints({ my: 0, opponent: 0 });
    setLastResult(null);
    setCurrentOpponentIndex(0);
    setCurrentRound(1);
    randomizeOpponentStrategies();
  };

  const currentOpponent = currentOpponentIndex < opponents.length ? opponents[currentOpponentIndex] : null;
  const isGameComplete = currentRound === numberOfRounds && currentOpponentIndex >= opponents.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GameHeader />
      
      <GameControls
        currentOpponent={currentOpponent}
        remainingOpponents={opponents.length - currentOpponentIndex}
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

      <OpponentsList opponents={opponents} currentOpponentIndex={currentOpponentIndex} />

      <RoundHistory rounds={rounds} />
    </div>
  );
}