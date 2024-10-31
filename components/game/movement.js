import { SEGMENT_SIZE } from "../draw/draw";

const createSnakeMovement = (gridSize = 5) => ({
  moveRight: (snakeBody) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, x: headPos.x + gridSize }];
  },
  moveLeft: (snakeBody) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, x: headPos.x - gridSize }];
  },
  moveDown: (snakeBody) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, y: headPos.y + gridSize }];
  },
  moveUp: (snakeBody) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, y: headPos.y - gridSize }];
  },
});

export const willSnakeHitTheFood = ({
  foodPosition,
  snakeHeadPosition,
  direction,
}) => {
  switch (direction) {
    case "UP":
      return (
        foodPosition.x === snakeHeadPosition.x &&
        snakeHeadPosition.y - SEGMENT_SIZE === foodPosition.y
      );
      break;
    case "DOWN":
        return (
          foodPosition.x === snakeHeadPosition.x &&
          snakeHeadPosition.y + SEGMENT_SIZE === foodPosition.y
        );
      break;
    case "LEFT":
        return (
          foodPosition.y === snakeHeadPosition.y &&
          snakeHeadPosition.x - SEGMENT_SIZE === foodPosition.x
        );
      break;
    case "RIGHT":
        return (
          foodPosition.y === snakeHeadPosition.y &&
          snakeHeadPosition.x + SEGMENT_SIZE === foodPosition.x
        );
      break;
  }
};

export const hasSnakeEatenHimself = (snakeBody) => {
  if(snakeBody.length <=1 ){
    return false;
  }

  const head = snakeBody[snakeBody.length - 1];
  const body = snakeBody.slice(0, snakeBody.length - 1);

  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}

export default createSnakeMovement;
