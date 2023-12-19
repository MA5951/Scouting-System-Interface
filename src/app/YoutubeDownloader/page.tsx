// src/app/YoutubeDownloader/page.tsx
"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const YoutubeDownloader = () => {
	const [url, setUrl] = useState('');

	const downloadFile = async (type: 'video' | 'audio') => {
		try {
			const response = await fetch(`https://catblik.tech/YoutubeDownloader/api/download`, {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				url,
				type,
				}),
			});
		
			handleDownloadResponse(response, type);
		} catch (error) {
			console.error('Error:', error);
			toast.error('An error occurred', { theme: 'colored' });
		}
	};

	const handleDownloadResponse = async (response: Response, fileType: string) => {
		if (response.ok) {
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `file.${fileType === 'video' ? 'mp4' : 'mp3'}`;
		a.style.display = 'none';

		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);

		toast.success(`${fileType === 'video' ? 'Video' : 'Audio'} successfully downloaded`, { theme: 'colored' });
		} else {
		toast.error(`Error downloading ${fileType === 'video' ? 'video' : 'audio'}`, { theme: 'colored' });
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
        <button className="purpleButton" onClick={() => downloadFile('video')} style={{ marginRight: '10px' }}>
          Download Video
        </button>
        <button className="purpleButton" onClick={() => downloadFile('audio')}>
          Download MP3
        </button>
      </div>
    </div>
  );
};

export default YoutubeDownloader;