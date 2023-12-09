'use client';

import Link from "next/link"
import { usePathname } from 'next/navigation'

enum Page {
    Home = '/',
    UrlShortener = '/urlShortner',
    RandomNumber = '/randomNumber',
    YoutubeDownloader = '/YoutubeDownloader',
    SortingAlgorithms = '/sortingAlgorithms'
}

type Props = {}

export const Navbar = (props: Props) => {
    const currentPage = usePathname() as Page

    const getButtonClassName = (page: Page) => {
        return currentPage === page ? 'disabledPurpleButton' : 'purpleButton';
    };

    return (
        <nav className="buttonContainer" style={{ backgroundColor: "rgb(30, 31, 34)", padding: '10px', width: '100%', position: 'fixed', top: '0', left: '0'}}>
            <button className={getButtonClassName(Page.Home)} style={{ marginRight: '10px' }}>
                <Link href={'/'}>Home Page</Link>
            </button>
            <button className={getButtonClassName(Page.UrlShortener)} style={{ marginRight: '10px' }}>
                <Link href={'/urlShortner'}>URL Shortener</Link>
            </button>
            <button className={getButtonClassName(Page.RandomNumber)} style={{ marginRight: '10px' }}>
                <Link href={'/randomNumber'}>Random Number Generator</Link>
            </button>
            <button className={getButtonClassName(Page.YoutubeDownloader)} style={{ marginRight: '10px' }}>
                <Link href={'/YoutubeDownloader'}>Youtube Downloader</Link>
            </button>
            <button className={getButtonClassName(Page.SortingAlgorithms)} style={{ marginRight: '10px' }}>
                <Link href={'/sortingAlgorithms'}>Sorting Algorithms</Link>
            </button>
        </nav>
    )
}
