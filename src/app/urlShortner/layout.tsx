"use client";

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Navbar } from '@/src/components/Navbar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {!pathname.includes('urlShortner/') && <Navbar />}
        {children}
      </body>
    </html>
  );
}