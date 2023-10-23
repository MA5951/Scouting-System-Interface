"use client"

import React, { useState } from 'react';
import { makeRandomNumber } from "./server";
import Link from 'next/link';

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
    <Link href="/">
      <a style={{color: 'white', position: 'absolute', top: '10px', left: '10px'}}>Home</a>
      </Link>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0px', fontSize: '48px' }}>Random Number Generator</h1>
        <div style={{ textAlign: 'center' }}>
          <input
            type="number"
            value={MinNumber}
            onChange={(e) => setMinNumber(e.target.value)}
            placeholder="Minimum Number"
            style={{color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none'}}
          />
          <input 
            type="number"
            value={MaxNumber} 
            onChange={(e) => setMaxNumber(e.target.value)}
            placeholder="Maximum Number"
            style={{color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none'}}
          />
        </div>
      </div>
      <button className='purpleButton' onClick={() => handleClick(Number(MinNumber), Number(MaxNumber))}>Gimmi Random</button>
      {res && <p>{res}</p>}
    </div>
  );
};

export default UrlShortener;