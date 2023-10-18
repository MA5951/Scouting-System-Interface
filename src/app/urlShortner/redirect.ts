// src/app/urlShortener/redirect.ts
"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import { getOriginalUrl } from './server';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (Array.isArray(slug)) {
    const shortenedUrl = 'https://catblik.tech/urlShortner/' + slug.join('');
    const originalUrl = await getOriginalUrl(shortenedUrl);
    console.log(slug);

    if (originalUrl) {
      res.writeHead(302, { Location: originalUrl });
      res.end();
      return;
    }
  }

  res.status(404).json({ error: 'URL not found' });
};
