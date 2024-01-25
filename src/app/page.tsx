"use client";

import { useRef } from 'react';
import Image from 'next/image';

const HomePage = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div ref={divRef} className="content">
          <h1 className="heading" style={{ textAlign: 'center', marginBottom: '5px', fontSize: '48px', color: "white "}}>Makers Assemble</h1>
          <Image style={{ borderRadius: '10px'}} src="/malogo.png" alt="Makers Assemble" width={350} height={350}/>
        </div>
      </div>
    </>
  );
};

export default HomePage;