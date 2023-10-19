'use client'
import React from 'react'
import { redirectToOriginalUrl } from '../server';

type Props = {
  params: {
    slug: string
  }
}

const page = ({params}: Props) => {
  const shortenedUrl = `https://catblik/urlShortner/${params.slug}`
  console.log("shortenedUrl:", shortenedUrl)

  const getOriginalUrl = async () => {
    const originalUrl: any = await redirectToOriginalUrl(shortenedUrl)
    console.log(originalUrl?.originalUrl)
    return originalUrl
  }

  return (
    <div>{params.slug}</div>
  )
}

export default page