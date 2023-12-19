"use client";

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import router from 'next/router';
import { Navbar } from '@/src/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {!router.pathname.includes('urlShortner/') && <Navbar />}
        {children}
      </body>
    </html>
  );
}