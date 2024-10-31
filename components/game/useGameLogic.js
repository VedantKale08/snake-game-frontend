import { SEGMENT_SIZE } from "../draw/draw";
import randomPositionOnGrid from "../utils/randomePositionOnGrid";
import useInterval from "../utils/useInterval";
import createSnakeMovement, { willSnakeHitTheFood } from "./movement";

const { useState, useEffect } = require("react");

const MOVEMENT_SPEED = 100;

const useGameLogic = ({ canvasWidth, canvasHeight }) => {
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

  console.log(snakeBody);
  

  const onKeyDownHandler = (event) => {
    switch (event.code) {
      case "ArrowDown":
        if (direction != "UP") setDirection("DOWN");
        break;
      case "ArrowUp":
        if (direction != "DOWN") setDirection("UP");
        break;
      case "ArrowLeft":
        if (direction != "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction != "LEFT") setDirection("RIGHT");
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
    if (
      direction !== undefined &&
      foodPosition &&
      willSnakeHitTheFood({ foodPosition, snakeHeadPosition, direction })
    ) {
        console.log(foodPosition);
        console.log(snakeHeadPosition);
        
      setSnakeBody([
        ...snakeBodyAfterMovement,
        { x: foodPosition.x, y: foodPosition.y },
      ]);
    } else if (snakeBodyAfterMovement) {
      setSnakeBody(snakeBodyAfterMovement);
    }
  };

  useInterval(moveSnake, MOVEMENT_SPEED);

  return {
    snakeBody,
    onKeyDownHandler,
    foodPosition,
  };
};

export default useGameLogic;
