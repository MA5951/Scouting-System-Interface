import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="buttonContainer" style={{ backgroundColor: "rgb(30, 31, 34)", padding: '10px', width: '100%', position: 'fixed', top: '0', left: '0'}}>
          <Link legacyBehavior href="/">
              <button className='purpleButton' style={{ marginRight: '10px'}}>Home Page</button>
          </Link>
          <Link legacyBehavior href="/urlShortner">
              <button className='purpleButton' style={{ marginRight: '10px' }}>URL Shortener</button>
          </Link>
          <Link legacyBehavior href="/urlShortner">
              <button className='purpleButton' style={{ marginRight: '10px' }}>URL Shortener</button>
          </Link>
          <Link legacyBehavior href="/randomNumber">
              <button className='purpleButton' style={{ marginRight: '10px' }}>Random Number Generator</button>
          </Link>
          <Link legacyBehavior href="/YoutubeDownloader">
              <button className='purpleButton' style={{ marginRight: '10px' }}>Youtube Downloader</button>
          </Link>
          <Link legacyBehavior href="/sortingAlgorithms">
              <button className='purpleButton' style={{ marginRight: '10px' }}>Sorting Algorithms</button>
          </Link>
      </div>
      <div className="content">
        <h1 className="heading" style={{ textAlign: 'center', marginBottom: '5px', fontSize: '48px', color: "white "}}>Main Page</h1>
        {/* iframe for this video "https://www.youtube.com/watch?v=dQw4w9WgXcQ" */}
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{marginBottom: '5px'}}></iframe>
      </div>
    </div>
  );
};

export default HomePage;