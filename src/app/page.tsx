"use client";
import { useState, useRef, useEffect, ElementRef } from 'react';

import Link from 'next/link';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (videoRef.current && sourceRef.current && divRef.current) {
  //     divRef.current.click();
  //     setTimeout(() => {
  //       videoRef.current?.play();
  //       sourceRef.current?.click();
  //     }, 1000);
  //   }
  // }, []);

  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div ref={divRef} className="content">
          <h1 className="heading" style={{ textAlign: 'center', marginBottom: '5px', fontSize: '48px', color: "white "}}>Main Page</h1>
          {/* iframe for this video "https://www.youtube.com/watch?v=dQw4w9WgXcQ" */}
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