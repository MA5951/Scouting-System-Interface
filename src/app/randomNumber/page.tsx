"use client"

// request an inpu of two numbers min and max and return a random number between them

import React, { useState } from 'react';
import {makeRandomNumber} from "@/src/app/randomNumber/server"

const RandomNumber = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  const handleClick = async (minS:number, maxS:number) => {
    const res = await makeRandomNumber(min, max)
    setRandomNumber(res)
  }

  return (
    <div>
      <h1>Random Number Generator</h1>
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(Number(e.target.value))}
      />
      <input
        type="number"
        value={max}
        onChange={(e) => setMax(Number(e.target.value))}
      />
      <input 
        type="number" 
        value={randomNumber} 
        onChange={(e) => setRandomNumber(Number(e.target.value))}
      />
      <button onClick={()=> handleClick(min, max)}>Generate</button>
    </div>
  );
};