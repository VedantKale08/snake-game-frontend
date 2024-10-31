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
        snakeHeadPosition.y - 5 === foodPosition.y
      );
      break;
    case "DOWN":
        return (
          foodPosition.x === snakeHeadPosition.x &&
          snakeHeadPosition.y + 5 === foodPosition.y
        );
      break;
    case "LEFT":
        return (
          foodPosition.y === snakeHeadPosition.y &&
          snakeHeadPosition.x - 5 === foodPosition.x
        );
      break;
    case "RIGHT":
        return (
          foodPosition.y === snakeHeadPosition.y &&
          snakeHeadPosition.x + 5 === foodPosition.x
        );
      break;
  }
};

export default createSnakeMovement;
