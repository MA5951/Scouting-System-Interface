'use client'

import { useEffect } from 'react'
import { getOriginalUrl } from '../server';
import { useRouter } from 'next/navigation';

type Props = {
  params: {
    slug: string
  }
}

const page = ({params}: Props) => {

  const baseUrl = 'https://catblik.tech/urlShortner/';
  const router = useRouter();

  async function handler(shortenedUrl: string) {
    const res = await getOriginalUrl(shortenedUrl)
    console.log("res:", res)
    
    if (res !== null){
      router.replace(res);
    } else {
      //TODO: Redirect to 404 page\
    }
  }
  
  useEffect(() => {
    const shortenedUrl = `${baseUrl}${params.slug}`
    console.log("shortenedUrl:", shortenedUrl)

    handler(shortenedUrl)
  }, [])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h1 style={{color: 'white', fontWeight: 'bold', fontSize: '2rem'}}>redirecting</h1>
    </div>
  )
}

export default page