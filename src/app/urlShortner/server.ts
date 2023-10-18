// src/app/urlShortener/server.ts
"use server"

import fs from 'fs';
import url from 'url';

export async function makeShortnedUrl(OriginalUrl:string, ShortnedUrl:string) {
    let newLink = "";
    let error = "";
    const dbPath = 'src/app/urlShortner/db.json';
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Check if OriginalUrl is a valid URL
    if (!url.parse(OriginalUrl).protocol || !url.parse(OriginalUrl).hostname) {
        error = "Error: Invalid Target URL";
    } else if (ShortnedUrl == "") {
        newLink = "https://catblik.tech/urlShortner/" + Math.random().toString(36).substring(2, 7);
    } else if (dbData["https://catblik.tech/urlShortner/" + ShortnedUrl]) {
        error = "Error: Shortened URL already exists";
    } else {
        newLink = "https://catblik.tech/urlShortner/" + ShortnedUrl;
    }

    if (error == "") {
        console.log("New link: " + newLink);
        dbData[newLink] = OriginalUrl;
        fs.writeFileSync(dbPath, JSON.stringify(dbData));

        return newLink;
    } else {
        console.log(error);
        return error;
    }
}

export async function getOriginalUrl(ShortnedUrl: string) {
  const dbPath = 'src/app/urlShortener/db.json';
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return dbData[ShortnedUrl];
}
