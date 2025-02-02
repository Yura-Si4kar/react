import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header>
      <Link href={'/'}>
        <strong>YS</strong>
      </Link>
      <nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
      </nav>
    </header>
  )
}
