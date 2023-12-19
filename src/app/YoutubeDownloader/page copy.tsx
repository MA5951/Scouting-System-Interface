// src/app/YoutubeDownloader/page.tsx
"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as ytdl from 'ytdl-core';

const YoutubeDownloader = () => {
  const [url, setUrl] = useState('');

	const downloadVideo = async () => {
		try {
		const videoInfo = await ytdl.getBasicInfo(url);
		const title = videoInfo.videoDetails.title;

		const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
		const videoUrl = format.url;

		const a = document.createElement('a');
		a.href = videoUrl;
		a.download = `${title}.mp4`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		toast.success('Video successfully downloaded', { theme: 'colored' });
		} catch (error) {
		console.error('Error:', error);
		toast.error('Error downloading video', { theme: 'colored' });
		}
	};

	const downloadSound = async () => {
		try {
		const videoInfo = await ytdl.getBasicInfo(url);
		const title = videoInfo.videoDetails.title;

		const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });
		const audioUrl = format.url;

		const a = document.createElement('a');
		a.href = audioUrl;
		a.download = `${title}.mp3`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		toast.success('Audio successfully downloaded', { theme: 'colored' });
		} catch (error) {
		console.error('Error:', error);
		toast.error('Error downloading audio', { theme: 'colored' });
		}
	};

  const handleDownloadResponse = async (response: Response, fileType: string) => {
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const a = document.createElement('a');
      a.href = url;
      a.download = `file.${fileType === 'video' ? 'mp4' : 'mp3'}`;
      a.style.display = 'none';

      // Append the link to the body and simulate a click
      document.body.appendChild(a);
      a.click();

      // Clean up
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
		  style={{color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none'}}
		/>
	  </div>
	  <div style={{ display: 'flex', gap: '10px' }}> {/* Added div for buttons */}
		<button className="purpleButton" onClick={downloadVideo} style={{ marginRight: '10px' }}>
		  Download Video
		</button>
		<button className="purpleButton" onClick={downloadSound}>
		  Download MP3
		</button>
	  </div>
	</div>
  );
};

export default YoutubeDownloader;
