import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

const page = ({params}: Props) => {
  return (
    <div>{params.slug}</div>
  )
}

export default page