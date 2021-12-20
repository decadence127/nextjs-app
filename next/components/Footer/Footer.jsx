import React from 'react';
import styles from "./Footer.module.scss";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <strong>Cool header</strong>
      <a href="http://github.com/decadence127">Github Page</a>
    </footer>
  );
};

export default Footer;