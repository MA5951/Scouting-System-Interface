// src/app/urlShortener/server.ts
"use server"

import url from 'url';
import {RedirectType, redirect} from 'next/navigation';
import { prisma } from '@/src/db';

const baseUrl = 'https://catblik.tech/urlShortner/';

export async function makeShortnedUrl(OriginalUrl:string, ShortnedUrl:string) {
    let newLink = "";
    let error = "";


    // Check if OriginalUrl is a valid URL
    if (!url.parse(OriginalUrl).protocol || !url.parse(OriginalUrl).hostname) {
        error = "Error: Invalid Target URL";
    } else if (/[^a-zA-Z0-9]/.test(ShortnedUrl)) {
        error = "Error: Shortened URL contains special characters";
    } else if (ShortnedUrl == "") {
        newLink = baseUrl + Math.random().toString(36).substring(2, 7);
    } else {
        const uniqueUrl = await prisma.urlMap.findMany({where: { shortenedUrl: baseUrl + ShortnedUrl }});

        console.log("uniquwUrl ", uniqueUrl);

        if (uniqueUrl.length > 0) {
            error = "Error: Shortened URL already exists";
        } else {
            newLink = baseUrl + ShortnedUrl;
        }
    }

    if (error == "") {
        console.log("New link: " + newLink);

        const url = await prisma.urlMap.create({data: {originalUrl: OriginalUrl, shortenedUrl: newLink}});

        console.log(url);

        return newLink;
    } else {
        console.log(error);
        return error;
    }
}

export async function getOriginalUrl(ShortnedUrl: string) { 
    console.log("ShortnedUrl: ", ShortnedUrl)
    const originalUrl = await prisma.urlMap.findMany({where: {shortenedUrl: ShortnedUrl}});

    console.log(originalUrl)

    return originalUrl.length > 0 ? originalUrl[0].originalUrl : null;
}