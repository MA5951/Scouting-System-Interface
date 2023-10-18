"use client"

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

  const handleClick = async (origin: string, added: string) => {
    const res = await makeShortnedUrl(origin, added)
    console.log(res)
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <input 
        type="text" 
        value={shortenedUrl} 
        onChange={(e) => setShortenedUrl(e.target.value)}
      />
      <button onClick={() => handleClick(inputUrl, shortenedUrl)}>Shorten</button>
    </div>
  );
};

export default UrlShortener;
