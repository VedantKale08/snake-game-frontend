export const SEGMENT_SIZE = 5;

const draw = ({ ctx, snakeBody, foodPosition }) => {
  if (foodPosition) {
    ctx.fillStyle = "blue";
    ctx.fillRect(foodPosition?.x, foodPosition?.y, SEGMENT_SIZE, SEGMENT_SIZE);
  }

  ctx.fillStyle = "red";

  snakeBody.forEach((segment) =>
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  );
};

export default draw;
