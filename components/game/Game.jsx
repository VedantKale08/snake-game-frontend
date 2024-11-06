"use client";
import React, { useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import useGameLogic from "./useGameLogic";
import draw from "../draw/draw";
import GameOver from "../GameOver/GameOver";

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
      className="w-full flex items-center outline-none flex-col gap-6 mt-6"
    >
      <p className="game-font text-xl">Single Player</p>
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
          className="bg-[#2C7865] px-8 py-2 w-[150 cpx] text-center text-white rounded hover:bg-[#205c4d] hover:scale-105 transition "
          onClick={() => {
            setGameState(gameState === "RUNNING" ? "PAUSED" : "RUNNING");
          }}
        >
          {gameState === "RUNNING" ? "Pause" : "Play"}
        </button>
      )}

      <div className="game-font">Score : {(snakeBody.length - 1) * 10}</div>
      {gameState === "GAME OVER" && <GameOver score={(snakeBody.length - 1)}/>}
    </div>
  );
}

export default Game;
