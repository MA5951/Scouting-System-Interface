"use client"

// src/app/urlShortener/page.tsx
import React, { useState } from 'react';
import { makeShortnedUrl } from "./server";

const UrlShortener = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleShorten = async () => {
    try {
      const response = await fetch('/urlShortner/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await response.json();
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const [res, setRes] = useState<string | null>(null);

  const handleClick = async (origin: string, added: string) => {
    const response = await makeShortnedUrl(origin, added);
    setRes(response);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ color: 'white' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '48px' }}>URL Shortener</h1>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          style={{ color: 'black', marginRight: '10px', marginBottom: '10px'}}
        />
        <input 
          type="text"
          value={shortenedUrl} 
          onChange={(e) => setShortenedUrl(e.target.value)}
          style={{ color: 'black', marginRight: '10px', marginBottom: '10px'}}
        />
      </div>
      <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginBottom: '5px' }} onClick={() => handleClick(inputUrl, shortenedUrl)}>Shorten</button>
      {res && <p>{res}</p>}
    </div>
  );
}

  export default UrlShortener;
