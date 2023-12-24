"use client"

// src/app/urlShortener/page.tsx
import React, { useState } from 'react';
import { makeShortnedUrl } from "./server";
import url from 'url';
import '@/src/app/globals.css'
import { toast } from 'react-toastify';

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
			toast.error('Error shortening URL', {theme: 'colored'});
		}
	};

	const [res, setRes] = useState<string | null>(null);

	const handleClick = async (origin: string, added: string) => {
		let response: React.SetStateAction<string | null> | string[];
		let resolveByResponse = new Promise(resolve => {response != null});
		toast.promise(
			resolveByResponse,
			{
			pending: 'Generating shortned URL...',
			success: 'Shortned URL successfully generated! 👌',
			error: 'Error shortening URL 🤯'
			}
		)


		// const id = toast.loading("Generating shortned URL...", {theme: 'dark'});
		response = await makeShortnedUrl(origin, added);
		if (response.includes('catblik') || response.includes('Catblik')) {
			resolveByResponse = Promise.resolve();
			setRes(response);
			// toast.update(id, {render: "Shortned URL successfully generated!", type: "success", autoClose: 2000, theme: 'colored'});
		} else {
			setRes(response);
			resolveByResponse = Promise.reject();
			// toast.update(id, {render: "Error shortening URL", type: "error", autoClose: 2000, theme: 'colored'});
		}
	};
	
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
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
				{res != null && <p style={{color: 'white', backgroundColor: 'rgb(43, 45, 49)', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}>{res}</p>}
				{res != null && (url.parse(res)?.protocol || url.parse(res)?.hostname) && <button className='purpleButton' onClick={() => {navigator.clipboard.writeText(res)}}>{'📋'}</button>}
			</div>
		</div>
	);
}

	export default UrlShortener;
