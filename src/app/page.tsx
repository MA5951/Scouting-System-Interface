import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="content">
        <h1 className="heading" style={{ color: "white", textAlign: "center"}}>Main Page</h1>
        <div className="buttonContainer">
          <Link legacyBehavior href="/urlShortner">
            <a className="purpleButton" style={{ marginRight: "10px", textDecoration: "none" }}>URL Shortener</a>
          </Link>
          <Link legacyBehavior href="/randomNumber">
            <a className="purpleButton" style={{ marginRight: "10px", textDecoration: "none" }}>Random Number Generator</a>
          </Link>
          <Link legacyBehavior href="/YoutubeDownloader">
            <a className="purpleButton" style={{ marginRight: "10px", textDecoration: "none" }}>Youtube Downloader</a>
          </Link>
          <Link legacyBehavior href="/sortingAlgorithms">
            <a className="purpleButton" style={{ marginRight: "10px", textDecoration: "none" }}>Sorting Algorithms</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;