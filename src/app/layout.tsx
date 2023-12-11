"use client";

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';
import Popup from '../components/Popup';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <button className='purpleButton' onClick={openPopup} style={{ marginTop: '50px' }}>
          Open Popup
        </button>
        <Popup isOpen={isPopupOpen} onClose={closePopup} />
        {children}
      </body>
    </html>
  );
}