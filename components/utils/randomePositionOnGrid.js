const randomPositionOnGrid = ({ gridSize = 5, threshold }) =>
  Math.floor(Math.random() * (threshold / gridSize)) * gridSize;

export default randomPositionOnGrid;
