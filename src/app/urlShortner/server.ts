// src/app/urlShortener/server.ts
"use server"

import { promises as fs } from 'fs';
import url from 'url';
import {RedirectType, redirect} from 'next/navigation';
import { json } from 'stream/consumers';

export async function makeShortnedUrl(OriginalUrl:string, ShortnedUrl:string) {
    let newLink = "";
    let error = "";
    
    const file = await fs.readFile(process.cwd() + '/allRedirects.json', 'utf8');
    const dbData = JSON.parse(file);

    // Check if OriginalUrl is a valid URL
    if (!url.parse(OriginalUrl).protocol || !url.parse(OriginalUrl).hostname) {
        error = "Error: Invalid Target URL";
    } else if (/[^a-zA-Z0-9]/.test(ShortnedUrl)) {
        error = "Error: Shortened URL contains special characters";
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
        await fs.writeFile(process.cwd() + '/allRedirects.json', JSON.stringify(dbData));

        return newLink;
    } else {
        console.log(error);
        return error;
    }
}

export async function getOriginalUrl(ShortnedUrl: string) {
    const file = await fs.readFile(process.cwd() + '/allRedirects.json', 'utf8');
    const dbData = JSON.parse(file);
    return dbData[ShortnedUrl];
}

export async function redirectToOriginalUrl(ShortnedUrl: string) {
    const file = await fs.readFile(process.cwd() + '/allRedirects.json', 'utf8');
    const dbData = JSON.parse(file);
    const OriginalUrl = await dbData[ShortnedUrl];

    await redirect(OriginalUrl, RedirectType.replace);
}