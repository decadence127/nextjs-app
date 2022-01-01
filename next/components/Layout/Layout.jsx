import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '100vh', padding: 0, margin: 0 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;