'use client'

import React from 'react'
import { getOriginalUrl } from '../server';

type Props = {
  params: {
    slug: string
  }
}

const page = async ({params}: Props) => {
  const shortenedUrl = `https://catblik/urlShortner/${params.slug}`
  console.log("shortenedUrl:", shortenedUrl)

  console.log(await getOriginalUrl(shortenedUrl))

  return (
    <div>{params.slug}</div>
  )
}

export default page