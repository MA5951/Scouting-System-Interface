'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import Galgol from '../components/galgol';
import { useState } from "react";
import homePage from "../app/page";

enum Page {
    Home = '/',
    Scouting = '/scouting'
}

type Props = {}

export const Navbar = (props: Props) => {
    const currentPage = usePathname() as Page

    const [isGalGolOpen, setIsGalGolOpen] = useState(false);

    function closePopup() {
        setIsGalGolOpen(false);
    }

    const getButtonClassName = (page: Page) => {
        return currentPage === page ? 'disabledredButton' : 'redButton';
    };

    return (
        <nav className="buttonContainer" style={{display: "flex", backgroundColor: "rgb(30, 31, 34)", padding: '10px', width: '100%', position: 'fixed', top: '0', left: '0'}}>
            <Link className={getButtonClassName(Page.Home)} 
                href={'/'} style={{ marginRight: '10px' }}>Home Page
            </Link>
            <Link className={getButtonClassName(Page.Scouting)}
                href={'/scouting'} style={{ marginRight: '10px' }}>Scouting
            </Link>
            <button className='redButton' onClick={() => setIsGalGolOpen(true)} style={{zIndex: "999999"}}>
                Open Popup
            </button>
            <Galgol stateToSet={isGalGolOpen} handleClose={closePopup}/>
        </nav>
    )
}
