"use client";
import React, { useRef } from "react";
import Canvas from "../canvas/Canvas";
import useGameLogic from "./useGameLogic";
import draw from "../draw/draw";

function Game() {
  const canvasRef = useRef(null);

  const { snakeBody, onKeyDownHandler, foodPosition } = useGameLogic({
    canvasWidth: canvasRef.current?.width,
    canvasHeight: canvasRef.current?.height,
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
    </div>
  );
}

export default Game;
