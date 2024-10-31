"use client"
import React, { forwardRef, useEffect } from "react";

const Canvas = forwardRef(({ draw, ...props }, canvasRef) => {

    useEffect(()=>{
        if (!canvasRef) return;
        const canvas = canvasRef.current;
        if(!canvas) return;
        
        const context = canvas.getContext("2d");
        if(!context) return;

        draw(context);
        return () =>  context.clearRect(0, 0, window.innerWidth, 400)
    },[draw, canvasRef])

    if (!canvasRef) return null;

      return (
        <canvas
          width={300}
          height={150}
          ref={canvasRef}
          className="border-[10px] w-[800px] h-[400px]"
          {...props}
        ></canvas>
      );
});

Canvas.displayName = "Canvas";

export default Canvas;
