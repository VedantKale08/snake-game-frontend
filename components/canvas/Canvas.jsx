"use client"
import React, { forwardRef, useEffect } from "react";
import { SEGMENT_SIZE } from "../draw/draw";

const Canvas = forwardRef(({ draw, ...props }, canvasRef) => {

    useEffect(()=>{
        if (!canvasRef) return;
        const canvas = canvasRef.current;
        if(!canvas) return;
        
        const context = canvas.getContext("2d");
        if(!context) return;

        context.fillStyle = "#90D26D";
        context.fillRect(0, 0, canvas.width, canvas.height);

          const gridSize = 10;
          context.strokeStyle = "#365E32";
          context.lineWidth = 0.08;

          for (let x = gridSize; x < canvas.width; x += gridSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
          }

          for (let y = gridSize; y < canvas.height; y += gridSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
          }

        draw(context);
        return () =>  context.clearRect(0, 0, window.innerWidth, 400)
    },[draw, canvasRef])

    if (!canvasRef) return null;

      return (
        <canvas
          width={400}
          height={200}
          ref={canvasRef}
          className="border-[14px] border-[#365E32] w-[1000px] h-[500px]"
          {...props}
        ></canvas>
      );
});

Canvas.displayName = "Canvas";

export default Canvas;
