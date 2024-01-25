"use client";

import { useRef } from 'react';

const HomePage = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div ref={divRef} className="content">
          <h1 className="heading" style={{ textAlign: 'center', marginBottom: '5px', fontSize: '48px', color: "white "}}>Main Page</h1>
          <iframe width="560" height="315" src="https://raw.githubusercontent.com/MA5951/.github/main/pictures/logo.png" title="rick role" allowFullScreen={true}></iframe>
        </div>
      </div>
    </>
  );
};

export default HomePage;