'use client'

import { useEffect } from 'react'
import { getOriginalUrl } from '../server';

type Props = {
  params: {
    slug: string
  }
}

const page = ({params}: Props) => {

  async function handler(shortenedUrl: string) {
    const res = await getOriginalUrl(shortenedUrl)
    console.log("res:", res)
  }
  
  useEffect(() => {
    const shortenedUrl = `https://catblik/urlShortner/${params.slug}`
    console.log("shortenedUrl:", shortenedUrl)

    handler(shortenedUrl)
  }, [])

  return (
    <div>{params.slug}</div>
  )
}

export default page