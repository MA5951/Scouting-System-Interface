// pages/api/download.ts
"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

export default async function downloadHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (for testing only)

  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { url, type } = req.body;

  try {
    if (!url || !type) {
      res.status(400).json({ error: 'Missing URL or type' });
      return;
    }

    const videoInfo = await ytdl.getBasicInfo(url);
    const format = type === 'video' ? ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' }) : ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });
    const videoStream = ytdl(url, { format });

    res.setHeader('Content-Disposition', `attachment; filename="${videoInfo.videoDetails.title}.${type === 'video' ? 'mp4' : 'mp3'}"`);
    res.setHeader('Content-Type', type === 'video' ? 'video/mp4' : 'audio/mp3');

    videoStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error downloading ${type === 'video' ? 'video' : 'audio'}` });
  }
}