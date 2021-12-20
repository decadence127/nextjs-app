import Head from 'next/head';
import React from 'react';
import Link from 'next/link'
import { publicRoutes } from '../../Utils/publicRoutes';
import styles from './Header.module.scss'
import { useEffect } from 'react';


const Header = () => {

  const stickyHeader = () => {
    const header = document.querySelector('#header');
    const scrollTop = window.scrollY;
    scrollTop >= 250 ? header.classList.add(styles.sticky) : header.classList.remove(styles.sticky)

  }


  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);
    console.log('called');
    return () => {
      window.removeEventListener('scroll', stickyHeader)
    }
  })

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test NextJS app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav id="header" className={styles.header}>
        <h1 className={styles.appTitle}>Next App</h1>
        <ul>
          {publicRoutes.map((value, index) => (<Link key={index} href={value.path}><li key={index}><a>{value.title}</a></li></Link>))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;