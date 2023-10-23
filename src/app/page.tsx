// pages/index.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <Link href="/urlShortner">
          <a style={{color: 'white'}}>URL Shortener</a>
        </Link>
      </div>
      <div>
        <Link href="/randomNumber">
          <a style={{color: 'white'}}>Random Number Generator</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
