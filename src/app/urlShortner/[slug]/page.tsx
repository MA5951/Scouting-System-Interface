import React from 'react'
import { redirectToOriginalUrl } from '../server';

type Props = {
  params: {
    slug: string
  }
}

const page = ({params}: Props) => {
  const shortenedUrl = `https://catblik/urlShortner/${params.slug}`

  console.log(redirectToOriginalUrl(shortenedUrl))

  return (
    <div>{params.slug}</div>
  )
}

export default page