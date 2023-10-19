// src/app/urlShortener/server.ts
"use server"

import { promises as fs } from 'fs';
import url from 'url';
import {RedirectType, redirect} from 'next/navigation';
import { prisma } from '@/src/db';

const dbPath = process.cwd() + '/src/app/urlShortner/allRedirects.json';

export async function makeShortnedUrl(OriginalUrl:string, ShortnedUrl:string) {
    let newLink = "";
    let error = "";

    const file = await fs.readFile(dbPath, 'utf8');
    const dbData = JSON.parse(file);

    // Check if OriginalUrl is a valid URL
    if (!url.parse(OriginalUrl).protocol || !url.parse(OriginalUrl).hostname) {
        error = "Error: Invalid Target URL";
    } else if (/[^a-zA-Z0-9]/.test(ShortnedUrl)) {
        error = "Error: Shortened URL contains special characters";
    } else if (ShortnedUrl == "") {
        newLink = "https://catblik.tech/urlShortner/" + Math.random().toString(36).substring(2, 7);
    } else {
        const uniqueUrl = await prisma.urlMap.findMany({where: { shortenedUrl: "https://catblik.tech/urlShortner/" + ShortnedUrl }});

        console.log("uniquwUrl ", uniqueUrl);

        if (uniqueUrl) {
            error = "Error: Shortened URL already exists";
        } else {
            newLink = "https://catblik.tech/urlShortner/" + ShortnedUrl;
        }
    }

    if (error == "") {
        console.log("New link: " + newLink);

        prisma.urlMap.create({data: {originalUrl: OriginalUrl, shortenedUrl: newLink}});

        return newLink;
    } else {
        console.log(error);
        return error;
    }
}

export async function getOriginalUrl(ShortnedUrl: string) {
    const originalUrl = await prisma.urlMap.findUnique({where: {shortenedUrl: ShortnedUrl, id: undefined}, select: {originalUrl: true}});

    return originalUrl?.originalUrl;
}

export async function redirectToOriginalUrl(ShortnedUrl: string) {
    const originalUrl = await prisma.urlMap.findUnique({where: {shortenedUrl: ShortnedUrl, id: undefined}, select: {originalUrl: true}});

    if (!originalUrl) {
        return await redirect("/urlShortner/404", RedirectType.replace);
    }
    return await redirect(originalUrl.originalUrl, RedirectType.replace);
}