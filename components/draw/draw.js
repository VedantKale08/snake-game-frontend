export const SEGMENT_SIZE = 10;

const appleImage = new Image();
appleImage.src = "/apple.png";

const draw = ({ ctx, snakeBody, foodPosition }) => {
  if (foodPosition) {
    ctx.drawImage(
      appleImage,
      foodPosition.x,
      foodPosition.y,
      SEGMENT_SIZE,
      SEGMENT_SIZE
    );
  }

  ctx.fillStyle = "blue";

  snakeBody.forEach((segment) =>
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  );
};

export default draw;
