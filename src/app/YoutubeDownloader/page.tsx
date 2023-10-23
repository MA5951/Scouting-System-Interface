import React, { useState } from 'react';

const YoutubeDownloader = () => {
  const [url, setUrl] = useState('');

  const downloadVideo = async () => {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        type: 'video',
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error downloading video');
    }
  };

  const downloadSound = async () => {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        type: 'sound',
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audio.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error downloading audio');
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
          className="BlackInputBox"
          style={{ margin: '10px' }}
        />
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
