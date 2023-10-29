"use client"

// src/app/urlShortener/page.tsx
import React, { useState } from 'react';
import { makeShortnedUrl } from "./server";
import url from 'url';
import '@/src/app/globals.css'
import Link from 'next/link';

const UrlShortener = () => {
	const [inputUrl, setInputUrl] = useState('');
	const [shortenedUrl, setShortenedUrl] = useState('');

	const handleShorten = async () => {
		try {
			const response = await fetch('/urlShortner/api/shorten', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url: inputUrl }),
			});

			const data = await response.json();
			setShortenedUrl(data.shortUrl);
		} catch (error) {
			console.error('Error shortening URL:', error);
		}
	};

	const [res, setRes] = useState<string | null>(null);

	const handleClick = async (origin: string, added: string) => {
		const response = await makeShortnedUrl(origin, added);
		setRes(response);
	};
	
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
		<Link href="/">
			<h1 style={{color: 'white', position: 'absolute', top: '10px', left: '10px'}}>Home</h1>
			</Link>
			<div style={{ color: 'white' }}>
				<h1 style={{ textAlign: 'center', marginBottom: '0px', fontSize: '48px' }}>URL Shortener</h1>
				<input
					type="text"
					value={inputUrl}
					placeholder="Target URL"
					onChange={(e) => setInputUrl(e.target.value)}
					style={{color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none'}}
				/>
				<input 
					type="text"
					value={shortenedUrl} 
					placeholder="Ending of URL (optional)"
					onChange={(e) => setShortenedUrl(e.target.value)}
					style={{color: 'white', marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(30, 31, 34)', padding: '10px', borderRadius: '5px', border: 'none'}}
				/>
			</div>
			<button className='purpleButton' onClick={() => handleClick(inputUrl, shortenedUrl)}>Shorten</button>
			<div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px'}}>
				{res && <p style={{color: 'white', backgroundColor: 'rgb(43, 45, 49)', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}>{res}</p>}
				{res && (url.parse(res)?.protocol || url.parse(res)?.hostname) && <button className='purpleButton' onClick={() => {navigator.clipboard.writeText(res)}}>{'📋'}</button>}
			</div>
		</div>
	);
}

	export default UrlShortener;
