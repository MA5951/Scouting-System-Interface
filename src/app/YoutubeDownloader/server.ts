// src/app/YoutubeDownloader/server.ts
"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';

const downloadByUrl = async (url: string, type: string, res: NextApiResponse) => {
	try {
		const info = await ytdl.getInfo(url);
		const title = info.videoDetails.title;

		let format;
		if (type === 'video') {
			format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
			res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
		} else if (type === 'sound') {
			format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
			res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
		} else {
			throw new Error('Invalid type');
		}

		const stream = ytdl(url, { format });

		if (type === 'sound') {
			// Pipe through ffmpeg for audio
			ffmpeg(stream)
				.format('mp3')
				.audioBitrate(128)
				.pipe(res, { end: true });
		} else {
			stream.pipe(res);
		}
	} catch (error) {
		res.status(500).json({ error: `Error downloading ${type}` });
	}
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { url, type } = req.body;

	if (!url || !type) {
		res.status(400).json({ error: 'Missing URL or type' });
		return;
	}

	await downloadByUrl(url, type, res);
};
