// pages/index.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1 style={{color: 'white'}}>Main Page</h1>
      <div>
        <Link href="/urlShortner">
          <h1 style={{color: 'white'}}>URL Shortener</h1>
        </Link>
      </div>
      <div>
        <Link href="/randomNumber">
          <h1 style={{color: 'white'}}>Random Number Generator</h1>
        </Link>
      </div>
      <div>
        <Link href="/YoutubeDownloader">
          <h1 style={{color: 'white'}}>Youtube Downloader</h1>
        </Link>
      </div>
      <div>
        <Link href="/sortingAlgorithms">
          <h1 style={{color: 'white'}}>Sorting Algorithms</h1>
        </Link>
      </div>
    </div>
  );
};

export default Home;
