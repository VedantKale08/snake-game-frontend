"use client";
import React, { useState, useEffect } from "react";

const SEGMENT_SIZE = 15;

const getRandomDirection = () => {
  const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  return directions[Math.floor(Math.random() * directions.length)];
};

function HomePage() {
  const getRandomPosition = (max) => Math.floor(Math.random() * max);

  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

   const [snakes, setSnakes] = useState(() =>
     Array.from({ length: 9 }).map(() => ({
       x: getRandomPosition(screenDimensions.width),
       y: getRandomPosition(screenDimensions.height),
       direction: getRandomDirection(),
     }))
   );

  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnakes((prevSnakes) =>
        prevSnakes.map((snake) => {
          let { x, y, direction } = snake;

          if (Math.random() < 0.1) {
            direction = getRandomDirection();
          }

          switch (direction) {
            case "UP":
              y = y - SEGMENT_SIZE < 0 ? screenDimensions.height : y - SEGMENT_SIZE;
              break;
            case "DOWN":
              y = y + SEGMENT_SIZE > screenDimensions.height ? 0 : y + SEGMENT_SIZE;
              break;
            case "LEFT":
              x = x - SEGMENT_SIZE < 0 ? screenDimensions.width : x - SEGMENT_SIZE;
              break;
            case "RIGHT":
              x = x + SEGMENT_SIZE > screenDimensions.width ? 0 : x + SEGMENT_SIZE;
              break;
            default:
              break;
          }

          return { x, y, direction };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg relative">
      <div className="absolute inset-0">
        {snakes.map((snake, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              position: "absolute",
              width: `${SEGMENT_SIZE}px`,
              height: `${SEGMENT_SIZE}px`,
              backgroundColor:
                index === 0
                  ? "white"
                  : index === 1 || index === 9
                  ? "yellow"
                  : index === 2
                  ? "green"
                  : index === 3
                  ? "blue"
                  : index === 4 || index === 8
                  ? "cyan"
                  : "orange",
              top: `${snake.y}px`,
              left: `${snake.x}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="flex flex-col gap-3 items-center z-10 ">
        <p className="game-font text-white text-5xl mb-6 bg-[#0a0a0a]">
          Snake Game
        </p>
        {[
          { title: "Single Player", link: "/game" },
          { title: "Computer", link: "" },
          { title: "MultiPlayer", link: "" },
          { title: "Options", link: "" },
          { title: "Exit", link: "" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="bg-[#337357] px-8 py-2 w-[220px] text-center text-white rounded hover:bg-[#205c4d] hover:scale-105 transition "
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
