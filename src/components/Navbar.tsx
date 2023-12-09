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
            <Link className={getButtonClassName(Page.Home)} 
                href={'/'} style={{ marginRight: '10px' }}>Home Page
            </Link>
            <Link className={getButtonClassName(Page.UrlShortener)} 
                href={'/urlShortner'} style={{ marginRight: '10px' }}>URL Shortener
            </Link>
            <Link className={getButtonClassName(Page.RandomNumber)} 
                href={'/randomNumber'} style={{ marginRight: '10px' }}>Random Number Generator
            </Link>
            <Link className={getButtonClassName(Page.YoutubeDownloader)}
                href={'/YoutubeDownloader'} style={{ marginRight: '10px' }}>Youtube Downloader
            </Link>
            <Link className={getButtonClassName(Page.SortingAlgorithms)}
                href={'/sortingAlgorithms'} style={{ marginRight: '10px' }}>Sorting Algorithms
            </Link>
        </nav>
    )
}
