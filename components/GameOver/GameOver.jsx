import Link from 'next/link';
import React from 'react'

function GameOver({ score }) {
  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex flex-col items-center gap-10">
      <div className="text-center flex flex-col gap-5 text-xl">
        <p className="game-font text-5xl mt-72 ">GAME OVER</p>
        <p>You scored {score * 10} points!</p>
      </div>
      <Link
        href="/"
        className="border bg-[#2C7865] px-8 py-2 w-[250px] text-center text-white rounded hover:bg-[#205c4d] hover:scale-105 transition "
      >
        Home
      </Link>
    </div>
  );
}

export default GameOver