// pages/api/download.ts
"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

export default async function downloadHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (for testing only)

  if (req.method === 'GET') {
    // If it's a GET request, render a dummy page or provide an informative message
    res.status(200).send('This is a download endpoint. Use POST requests to initiate downloads.');
  } else if (req.method === 'POST') {
    // If it's a POST request, handle the download logic
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
  } else {
    // If it's neither GET nor POST, return Method Not Allowed
    res.status(405).end();
  }
}