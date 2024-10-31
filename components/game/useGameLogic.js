import { SEGMENT_SIZE } from "../draw/draw";
import randomPositionOnGrid from "../utils/randomePositionOnGrid";
import useInterval from "../utils/useInterval";
import createSnakeMovement, { hasSnakeEatenHimself, willSnakeHitTheFood } from "./movement";

const { useState, useEffect } = require("react");

const MOVEMENT_SPEED = 100;

const useGameLogic = ({ canvasWidth, canvasHeight, gameState, onGameOver }) => {
  const [direction, setDirection] = useState();
  const [snakeBody, setSnakeBody] = useState([
    {
      x: 0,
      y: 0,
    },
  ]);
  const [foodPosition, setFoodPosition] = useState({
    x: 0,
    y: 0,
  });

  const resetGameState = () => {
    setDirection(undefined);
    setFoodPosition({
      x: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasWidth,
      }),
      y: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasHeight,
      }),
    });

    setSnakeBody([
      {
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasWidth,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasHeight,
        }),
      },
    ]);
  }

  const snakeHeadPosition = snakeBody[snakeBody.length - 1];
  const { moveDown, moveLeft, moveRight, moveUp } = createSnakeMovement();

  useEffect(() => {
    if (!canvasHeight || !canvasWidth) return;
    setFoodPosition({
      x: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasWidth,
      }),
      y: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasHeight,
      }),
    });

    setSnakeBody([
      {
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasWidth,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasHeight,
        }),
      },
    ]);
  }, [canvasHeight, canvasWidth]);  

  const onKeyDownHandler = (event) => {    
   switch (event.code) {
     case "ArrowDown":
     case "KeyS":
       if (direction !== "UP") setDirection("DOWN");
       break;
     case "ArrowUp":
     case "KeyW":
       if (direction !== "DOWN") setDirection("UP");
       break;
     case "ArrowLeft":
     case "KeyA":
       if (direction !== "RIGHT") setDirection("LEFT");
       break;
     case "ArrowRight":
     case "KeyD":
       if (direction !== "LEFT") setDirection("RIGHT");
       break;
   }

  };
  

  const moveSnake = () => {
    let snakeBodyAfterMovement;
    switch (direction) {
      case "DOWN":
        if (canvasHeight && snakeHeadPosition.y < canvasHeight - SEGMENT_SIZE) {
          snakeBodyAfterMovement = moveDown(snakeBody);
        } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
          setDirection("LEFT");
        } else {
          setDirection("RIGHT");
        }
        break;
      case "UP":
        if (snakeHeadPosition.y > 0) {
          snakeBodyAfterMovement = moveUp(snakeBody);
        } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
          setDirection("LEFT");
        } else {
          setDirection("RIGHT");
        }
        break;
      case "LEFT":
        if (snakeHeadPosition.x > 0) {
          snakeBodyAfterMovement = moveLeft(snakeBody);
        } else if (canvasHeight && snakeHeadPosition.y > canvasHeight / 2) {
          setDirection("DOWN");
        } else {
          setDirection("UP");
        }
        break;
      case "RIGHT":
        if (canvasWidth && snakeHeadPosition.x < canvasWidth - SEGMENT_SIZE) {
          snakeBodyAfterMovement = moveRight(snakeBody);
        } else if (canvasHeight && snakeHeadPosition.y > canvasHeight / 2) {
          setDirection("DOWN");
        } else {
          setDirection("UP");
        }
        break;
    }

    if(snakeBodyAfterMovement){
      const isGameOver = hasSnakeEatenHimself(snakeBodyAfterMovement);
      if(isGameOver){
        onGameOver();
      }
    }

    if (
      direction !== undefined &&
      foodPosition &&
      willSnakeHitTheFood({ foodPosition, snakeHeadPosition, direction })
    ) {
      setSnakeBody([
        ...snakeBodyAfterMovement,
        { x: foodPosition.x, y: foodPosition.y },
      ]);
      setFoodPosition({
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasWidth,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasHeight,
        }),
      });   
    } else if (snakeBodyAfterMovement) {
      setSnakeBody(snakeBodyAfterMovement);
    }
  };

  useInterval(moveSnake, gameState === "RUNNING" ? MOVEMENT_SPEED : null);

  return {
    snakeBody,
    onKeyDownHandler,
    foodPosition,
    resetGameState,
  };
};

export default useGameLogic;
