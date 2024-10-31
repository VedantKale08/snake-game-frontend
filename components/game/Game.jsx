"use client";
import React, { useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import useGameLogic from "./useGameLogic";
import draw from "../draw/draw";

function Game() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("RUNNING");

  const onGameOver = () => setGameState("GAME OVER");

  const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } =
    useGameLogic({
      canvasWidth: canvasRef.current?.width,
      canvasHeight: canvasRef.current?.height,
      gameState,
      onGameOver,
    });
  const drawGame = (ctx) => {
    draw({ ctx, snakeBody, foodPosition });
  };
  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDownHandler}
      className="w-full flex items-center outline-none flex-col"
    >
      <Canvas ref={canvasRef} draw={drawGame} />
      {gameState === "GAME OVER" ? (
        <button
          onClick={() => {
            setGameState("RUNNING");
            resetGameState();
          }}
        >
          Play Again
        </button>
      ) : (
        <button
          onClick={() => {
            setGameState(gameState === "RUNNING" ? "PAUSED" : "RUNNING");
          }}
        >
          {gameState === "RUNNING" ? "Pause" : "Play"}
        </button>
      )}

      <div>Score : {(snakeBody.length - 1)*10}</div>
    </div>
  );
}

export default Game;
