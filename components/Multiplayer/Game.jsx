"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import { SEGMENT_SIZE } from "../draw/draw";
import { io } from "socket.io-client";
import GameOver from "../GameOver/GameOver";

function Game() {
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState({});
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("right");
  const [mySocket, setMySocket] = useState(null);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setMySocket(socket);

    socket.on("initialize", ({ players, food }) => {
      setPlayers(players);
      setFood(food);
    });

    socket.on("player-joined", ({ id, player }) => {
      setPlayers((prev) => ({ ...prev, [id]: player }));
    });

    socket.on("food-update", (newFood) => {
      setFood(newFood);
    });

    socket.on("state-update", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on("game-over", ({reason}) => {
      setGameOver(true);
    });

    socket.on("player-left", (id) => {
      setPlayers((prev) => {
        const newPlayers = { ...prev };
        if (id === socket.id) {
          setScore(newPlayers[id].score);
        }
        delete newPlayers[id];
        return newPlayers;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const newDirection = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }[event.key];
      if (newDirection) {
        mySocket.emit("move", newDirection);
        setDirection(newDirection);
      }
    },
    [mySocket]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const draw = useCallback(
    (context) => {
      const appleImage = new Image();
      appleImage.src = "/apple.png";
      context.drawImage(appleImage, food.x, food.y, SEGMENT_SIZE, SEGMENT_SIZE);
      
      Object.values(players).forEach((player) => {
        context.fillStyle = player.id === mySocket.id ? "red" : "blue";
        player.segments.forEach((segment) => {
          context.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE);
        });
      });
    },
    [players, food, mySocket]
  );

  return (
    <div
      tabIndex={0}
      className="w-full flex items-center outline-none flex-col gap-6 mt-6"
    >
      <p className="game-font text-xl">MultiPlayer</p>
      <div className="flex flex-col gap-6">
        <Canvas ref={canvasRef} draw={draw} />
        <div className="flex justify-between">
          <div>
            <div className="flex gap-3 items-center">
              <p className="w-[15px] h-[15px] bg-red-500"></p>
              <p>You</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="w-[15px] h-[15px] bg-blue-500"></p>
              <p>Enemy</p>
            </div>
          </div>
          <div className="game-font">
            Score : {(players[mySocket?.id]?.score ?? 0) * 10}
          </div>
        </div>
      </div>
      {isGameOver && (
        <GameOver score={score} />
      )}
    </div>
  );
}

export default Game;
