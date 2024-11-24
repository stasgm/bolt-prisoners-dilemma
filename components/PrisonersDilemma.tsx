"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GameHeader } from "./game/GameHeader";
import { GameControls } from "./game/GameControls";
import { RoundHistory } from "./game/RoundHistory";
import { OpponentsList } from "./game/OpponentsList";
import { generateRandomOpponents } from "@/lib/game/opponents";
import { strategies } from "@/lib/game/strategies";
import type { Opponent, Round, Strategy } from "@/lib/game/types";

export default function PrisonersDilemma() {
  const [numberOfOpponents, setNumberOfOpponents] = useState(8);
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [totalPoints, setTotalPoints] = useState({ my: 0, opponent: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(strategies[0]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [gameDelay, setGameDelay] = useState(300);
  const [isInitialized, setIsInitialized] = useState(false);
  const currentOpponentRef = useRef(0);
  const currentRoundRef = useRef(1);

  useEffect(() => {
    if (!isInitialized) return;

    setOpponents(prev => {
      const diff = numberOfOpponents - prev.length;
      if (diff > 0) {
        return [...prev, ...generateRandomOpponents(diff)];
      }
      return prev.slice(0, diff);
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

  const playRound = async () => {
    if (isAnimating || currentOpponentRef.current >= numberOfOpponents) return;
    setIsAnimating(true);

    const currentOpponentIndex = currentOpponentRef.current;
    const currentRound = currentRoundRef.current;

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

    // setLastResult(roundResult);
    setRounds(prev => [...prev, roundResult]);
    setTotalPoints(prev => ({
      my: prev.my + result.myPoints,
      opponent: prev.opponent + result.opponentPoints,
    }));

    await new Promise(resolve => setTimeout(resolve, gameDelay));
    setIsAnimating(false);
  }

  const playAllRounds = async () => {
    if (isAnimating) return;

    currentOpponentRef.current = 0;

    while (currentRoundRef.current <= numberOfRounds) {
      for (let i = 0; i <= numberOfOpponents; i++) {
        currentOpponentRef.current = i;
        if (i === numberOfOpponents) {
          if (currentRoundRef.current === numberOfRounds) {
            return;
          }
          currentRoundRef.current += 1;
          break;
        } else {
          await playRound();
        }
      }
    }
  }

  const resetGame = () => {
    setNumberOfOpponents(12);
    setRounds([]);
    setTotalPoints({ my: 0, opponent: 0 });
    // setLastResult(null);
    currentOpponentRef.current = 0
    currentRoundRef.current = 1;
    randomizeOpponentList();
  };

  const currentRound = currentRoundRef.current;
    const isGameComplete = currentRound === numberOfRounds && currentOpponentRef.current >= numberOfOpponents;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8">
      <GameHeader />

      <GameControls
        totalPoints={totalPoints}
        remainingOpponents={numberOfOpponents - currentOpponentRef.current}
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
        opponents={opponents} 
        currentOpponentIndex={currentOpponentRef.current}
        rounds={rounds}
        onRandomizeOpponents={randomizeOpponentList}
        isAnimating={isAnimating}
      />

      <div>
        {/* <GameStats
          totalPoints={totalPoints}
          lastResult={lastResult}
          currentOpponent={currentOpponent}
          currentRound={currentRound}
          totalRounds={numberOfRounds}
        /> */}
        <RoundHistory rounds={rounds} />
      </div>
    </div>
  );
}