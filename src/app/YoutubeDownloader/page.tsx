// src/app/YoutubeDownloader/page.tsx
"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const YoutubeDownloader = () => {
	const [url, setUrl] = useState('');
  
	const handleSubmit = async (type: 'video' | 'audio') => {
	  try {
		// Construct the download URL
		const downloadUrl = `https://catblik.tech/YoutubeDownloader?type=${type}&url=${encodeURIComponent(url)}`;
  
		// Open the download URL in a new tab
		window.open(downloadUrl, '_blank');
  
		toast.success(`${type === 'video' ? 'Video' : 'Audio'} download started`, { theme: 'colored' });
	  } catch (error) {
		console.error('Error:', error);
		toast.error('An error occurred', { theme: 'colored' });
	  }
	};
  
	return (
	  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
		<div style={{ color: 'white', textAlign: 'center' }}>
		  <h1 style={{ textAlign: 'center', marginBottom: '0px', fontSize: '48px' }}>YouTube Downloader</h1>
		  <input
			type="text"
			value={url}
			onChange={(e) => setUrl(e.target.value)}
			placeholder="Enter YouTube URL"
			style={{ color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none' }}
		  />
		</div>
		<div style={{ display: 'flex', gap: '10px' }}>
		  <button className="purpleButton" onClick={() => handleSubmit('video')} style={{ marginRight: '10px' }}>
			Download Video
		  </button>
		  <button className="purpleButton" onClick={() => handleSubmit('audio')}>
			Download MP3
		  </button>
		</div>
	  </div>
	);
  };
  
  export default YoutubeDownloader;