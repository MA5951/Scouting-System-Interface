// pages/index.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <Link href="/urlShortner">
          URL Shortener
        </Link>
      </div>
      <div>
        <Link href="/randomNumber">
          Random Number Generator
        </Link>
      </div>
    </div>
  );
};

export default Home;
