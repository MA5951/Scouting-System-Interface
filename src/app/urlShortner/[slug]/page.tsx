'use client'

import { useEffect } from 'react'
import { getOriginalUrl } from '../server';

type Props = {
  params: {
    slug: string
  }
}

const page = ({params}: Props) => {

  useEffect(() => {
    const shortenedUrl = `https://catblik/urlShortner/${params.slug}`
    console.log("shortenedUrl:", shortenedUrl)
  
    console.log(getOriginalUrl(shortenedUrl))
  }, [])

  return (
    <div>{params.slug}</div>
  )
}

export default page