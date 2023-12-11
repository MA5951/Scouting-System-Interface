"use client";

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';
import Galgol from '../components/galgol';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isGalGolOpen, setIsGalGolOpen] = useState(false);

  function closePopup() {
    setIsGalGolOpen(false);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <button className='purpleButton' onClick={() => setIsGalGolOpen(true)} style={{ marginTop: '50px' }}>
          Open Popup
        </button>
        <Galgol stateToSet={isGalGolOpen} handleClose={closePopup}/>
        {children}
      </body>
    </html>
  );
}