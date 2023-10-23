"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';

const downloadVideoByUrl = async (url: string, res: NextApiResponse) => {
  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);

    ytdl(url, { format }).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading video' });
  }
};

const downloadSoundByUrl = async (url: string, res: NextApiResponse) => {
  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);

    ytdl(url, { format })
      .pipe(ffmpeg().input('pipe:0').outputFormat('mp3').pipe(res));
  } catch (error) {
    res.status(500).json({ error: 'Error downloading audio' });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, type } = req.body;

  if (!url || !type) {
    res.status(400).json({ error: 'Missing URL or type' });
    return;
  }

  if (type === 'video') {
    await downloadVideoByUrl(url, res);
  } else if (type === 'sound') {
    await downloadSoundByUrl(url, res);
  } else {
    res.status(400).json({ error: 'Invalid type' });
  }
};
