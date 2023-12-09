import Link from "next/link"

type Props = {}

export const Navbar = (props: Props) => {
  return (
    <nav className="buttonContainer" style={{ backgroundColor: "rgb(30, 31, 34)", padding: '10px', width: '100%', position: 'fixed', top: '0', left: '0'}}>
        <button className='purpleButton' style={{ marginRight: '10px'}}>
            <Link href={'/'}>Home Page</Link>
        </button>
        <button className='purpleButton' style={{ marginRight: '10px'}}>
            <Link href={'/urlShortner'}>URL Shortener</Link>
        </button>
        <button className='purpleButton' style={{ marginRight: '10px'}}>
            <Link href={'/randomNumber'}>Random Number Generator</Link>
        </button>
        <button className='purpleButton' style={{ marginRight: '10px'}}>
            <Link href={'/YoutubeDownloader'}>Youtube Downloader</Link>
        </button>
        <button className='purpleButton' style={{ marginRight: '10px'}}>
            <Link href={'/sortingAlgorithms'}>Sorting Algorithms</Link>
        </button>

    </nav>
  )
}
