import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="navbar">
      <Image 
        className="navbar-logo" 
        width={120} 
        height={60} 
        src="/images/logo.png" 
        alt="logo" 
      />
      <nav className="navbar__menu">
        <input className="navbar__menu-checkbox" type="checkbox" id="menu-toggle" />
        <span className="navbar__menu-button"></span>
        <Link href={'/'} className="navbar__menu-option-a navbar__menu-option">Home</Link>
        <Link href={'/project'} className="navbar__menu-option-b navbar__menu-option">Projects</Link>
        <Link href={'/contacts'} className="navbar__menu-option-c navbar__menu-option">Contacts</Link>
        <Link href={'/about'} className="navbar__menu-option-d navbar__menu-option">About</Link>
      </nav>
      <div className="navbar__lang">
        <input className="navbar__lang-button navbar__lang-button-ua" type="radio" name="lang" value="ua"/>
        <input className="navbar__lang-button navbar__lang-button-en" type="radio" name="lang" value="en"/>
      </div>
    </header>
  );
}
