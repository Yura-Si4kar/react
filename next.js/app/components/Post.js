import React from 'react'
import Link from 'next/link'

export default function Post({post}) {
  return (
    <div>
      <Link href={'/'}>Назад</Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <strong>Author ID: { post.userId }</strong>
    </div>
  )
}
