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

  const baseUrl = 'https://catblik/urlShortner/';
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
    <div>{params.slug}</div>
  )
}

export default page