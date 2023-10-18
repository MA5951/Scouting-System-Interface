// pages/index.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Link href="/urlShortner">
        URL Shortener
      </Link>
      <Link href="/randomNumber">
        Random Number Generator
      </Link>
    </div>
  );
};

export default Home;
