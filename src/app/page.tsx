"use client";
import { useState, useRef, useEffect, ElementRef } from 'react';

import Link from 'next/link';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div ref={divRef} className="content">
          <h1 className="heading" style={{ textAlign: 'center', marginBottom: '5px', fontSize: '48px', color: "white "}}>Main Page</h1>
          <video ref={videoRef} width="320" height="240" controls>
          <source ref={sourceRef} src="../rickrole.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
        </div>
      </div>
    </>
  );
};

export default HomePage;