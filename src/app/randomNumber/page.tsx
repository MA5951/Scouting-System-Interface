"use client"

import React, { useState } from 'react';
import { makeRandomNumber } from "./server";

const UrlShortener = () => {
  const [MinNumber, setMinNumber] = useState('');
  const [MaxNumber, setMaxNumber] = useState('');

  const [res, setRes] = useState<string | null>(null);

  const handleClick = async (minS: number, maxS: number) => {
    const response = await makeRandomNumber(minS, maxS)
    setRes(response);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0px', fontSize: '48px' }}>Random Number Generator</h1>
        <div style={{ textAlign: 'center' }}>
          <input
            type="number"
            value={MinNumber}
            onChange={(e) => setMinNumber(e.target.value)}
            placeholder="Minimum Number"
            style={{ color: 'black', marginRight: '10px', marginBottom: '10px'}}
          />
          <input 
            type="number"
            value={MaxNumber} 
            onChange={(e) => setMaxNumber(e.target.value)}
            placeholder="Maximum Number"
            style={{ color: 'black', marginRight: '10px', marginBottom: '10px'}}
          />
        </div>
      </div>
      <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginBottom: '5px' }} onClick={() => handleClick(Number(MinNumber), Number(MaxNumber))}>Gimmi Random</button>
      {res && <p>{res}</p>}
    </div>
  );
};

export default UrlShortener;