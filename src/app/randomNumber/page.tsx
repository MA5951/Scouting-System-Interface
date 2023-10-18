"use client"

import React, { useState } from 'react';
import { makeRandomNumber } from "./server";

const UrlShortener = () => {
  const [MinNumber, setMinNumber] = useState('');
  const [MaxNumber, setMaxNumber] = useState('');

  const handleClick = async (minS: number, maxS: number) => {
    const res = await makeRandomNumber(minS, maxS)
    console.log(res)
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="number"
        value={MinNumber}
        onChange={(e) => setMinNumber(e.target.value)}
      />
      <input 
        type="number"
        value={MaxNumber} 
        onChange={(e) => setMaxNumber(e.target.value)}
      />
      <button onClick={() => handleClick(Number(MinNumber), Number(MaxNumber))}>Gimmi Random</button>
    </div>
  );
};

export default UrlShortener;
