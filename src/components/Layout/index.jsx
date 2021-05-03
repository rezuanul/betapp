import Head from 'next/head';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <Navbar />
      <div className="container mb-3 mt-3">{children}</div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
