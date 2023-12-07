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
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <div className="buttonContainer" style={{ backgroundColor: "rgb(30, 31, 34)", padding: '10px', width: '100%', position: 'fixed', top: '0', left: '0'}}>
          <Link legacyBehavior href="/">
            <button className='purpleButton' style={{ marginRight: '10px'}}>Home Page</button>
          </Link>
          <Link legacyBehavior href="/urlShortner">
            <button className='purpleButton' style={{ marginRight: '10px' }}>URL Shortener</button>
          </Link>
          <Link legacyBehavior href="/YoutubeDownloader">
            <button className='purpleButton' style={{ marginRight: '10px' }}>Youtube Downloader</button>
          </Link>
          <Link legacyBehavior href="/sortingAlgorithms">
            <button className='purpleButton' style={{ marginRight: '10px' }}>Sorting Algorithms</button>
          </Link>
        </div>
      </div>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0px', fontSize: '48px' }}>Random Number Generator</h1>
        <div style={{ textAlign: 'center' }}>
          <input
            type="number"
            value={MinNumber}
            onChange={(e) => setMinNumber(e.target.value)}
            placeholder="Minimum Number"
            style={{ color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <input
            type="number"
            value={MaxNumber}
            onChange={(e) => setMaxNumber(e.target.value)}
            placeholder="Maximum Number"
            style={{ color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none' }}
          />
        </div>
      </div>
      <button className='purpleButton' onClick={() => handleClick(Number(MinNumber), Number(MaxNumber))}>Gimmi Random</button>
      {res && <p style={{ color: 'white' }}>{res}</p>}
    </div>
  );
};

export default UrlShortener;